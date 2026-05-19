import { useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Trip, View } from '../types';
import { findMonastery } from '../data/monasteries';
import { findSettlement } from '../data/settlements';
import { useI18n } from '../i18n';
import { MONASTERIES_RO, SETTLEMENTS_RO } from '../i18n/data-ro';

/* TripItineraryMap — OSM tile view rendering the ordered places of a single
   trip. Each day gets its own coloured polyline and numbered markers labelled
   "<day>.<stop>". Lazy-loaded by TripDetail so the Leaflet bundle is only
   fetched when the user opens an actual trip. */

interface Props {
  trip: Trip;
  onNavigate: (view: View) => void;
}

interface Located {
  lat: number;
  lng: number;
  name: string;
  view: View;
}

interface DayPlot {
  dayIndex: number;
  date: string;
  colour: string;
  stops: Located[];
}

const PENINSULA_CENTRE: [number, number] = [40.255, 24.21];
const PENINSULA_ZOOM = 11;

// A palette that holds up against the gold/lapis chrome — each day picks the
// next colour, cycling if a trip runs longer than the palette.
const DAY_COLOURS = [
  '#d6ad32', // gold
  '#7b1f2c', // oxblood
  '#2c6e63', // teal
  '#3b5bdb', // lapis blue
  '#a45c2a', // burnt sienna
  '#5b3a8a', // royal purple
  '#2f7a3b', // forest
  '#b8467a', // rose
];

function resolveLocation(
  place: { kind: 'monastery' | 'settlement'; slug: string },
  lang: string,
): Located | null {
  const pick = <T,>(en: T, ro: T | undefined): T =>
    lang === 'ro' && ro !== undefined ? ro : en;
  if (place.kind === 'monastery') {
    const m = findMonastery(place.slug);
    if (!m) return null;
    const ro = MONASTERIES_RO[m.slug];
    return {
      lat: m.lat,
      lng: m.lng,
      name: pick(m.name, ro?.name),
      view: { kind: 'monastery', slug: m.slug },
    };
  }
  const s = findSettlement(place.slug);
  if (!s) return null;
  const ro = SETTLEMENTS_RO[s.slug];
  return {
    lat: s.lat,
    lng: s.lng,
    name: pick(s.name, ro?.name),
    view: { kind: 'settlement', slug: s.slug },
  };
}

function stopIcon(label: string, colour: string): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div class="trip-marker" style="--trip-marker-colour:${colour}"><span>${label}</span></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export function TripItineraryMap({ trip, onNavigate }: Props) {
  const { t, lang } = useI18n();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  const plots = useMemo<DayPlot[]>(() => {
    return trip.days.map((day, dayIndex) => ({
      dayIndex,
      date: day.date,
      colour: DAY_COLOURS[dayIndex % DAY_COLOURS.length],
      stops: day.places
        .map((p) => resolveLocation(p, lang))
        .filter((p): p is Located => p !== null),
    }));
  }, [trip, lang]);

  // One-time map init. The plots layer is rebuilt below when the trip changes.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: PENINSULA_CENTRE,
      zoom: PENINSULA_ZOOM,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  // Rebuild the itinerary layer whenever the trip's places change.
  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    const allLatLngs: L.LatLngExpression[] = [];

    for (const plot of plots) {
      if (plot.stops.length === 0) continue;

      const coords: L.LatLngExpression[] = plot.stops.map((s) => [s.lat, s.lng]);
      allLatLngs.push(...coords);

      if (coords.length > 1) {
        L.polyline(coords, {
          color: plot.colour,
          weight: 3,
          opacity: 0.85,
          dashArray: '6 6',
        }).addTo(layer);
      }

      plot.stops.forEach((stop, stopIndex) => {
        const label = `${plot.dayIndex + 1}.${stopIndex + 1}`;
        const marker = L.marker([stop.lat, stop.lng], {
          icon: stopIcon(label, plot.colour),
        }).addTo(layer);
        marker.bindTooltip(
          `${t('tripDetail.dayN', { n: plot.dayIndex + 1 })} · ${stop.name}`,
          {
            direction: 'top',
            offset: [0, -10],
          },
        );
        marker.on('click', () => onNavigate(stop.view));
      });
    }

    if (allLatLngs.length === 0) {
      map.setView(PENINSULA_CENTRE, PENINSULA_ZOOM);
      return;
    }

    if (allLatLngs.length === 1) {
      map.setView(allLatLngs[0] as L.LatLngExpression, 13);
      return;
    }

    map.fitBounds(L.latLngBounds(allLatLngs), {
      padding: [40, 40],
      maxZoom: 14,
    });
  }, [plots, onNavigate, t]);

  const hasAnyStop = plots.some((p) => p.stops.length > 0);

  return (
    <div className="trip-map">
      <div ref={containerRef} className="trip-map__canvas" />
      {!hasAnyStop && (
        <p className="trip-map__empty">{t('tripMap.empty')}</p>
      )}
      {hasAnyStop && (
        <ol className="trip-map__legend" aria-label={t('tripMap.legendAria')}>
          {plots.map((plot) =>
            plot.stops.length === 0 ? null : (
              <li key={plot.date} className="trip-map__legend-item">
                <span
                  className="trip-map__legend-swatch"
                  style={{ background: plot.colour }}
                  aria-hidden="true"
                />
                <span className="trip-map__legend-label">
                  {t('tripDetail.dayN', { n: plot.dayIndex + 1 })}
                </span>
              </li>
            ),
          )}
        </ol>
      )}
    </div>
  );
}

export default TripItineraryMap;
