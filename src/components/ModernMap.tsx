import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MONASTERIES } from '../data/monasteries';
import { SETTLEMENTS } from '../data/settlements';
import { PORTS } from '../data/transport';
import type { View } from '../types';

/* ModernMap — OpenStreetMap tile view via Leaflet. Lazy-loaded by MapView,
   so the ~130KB Leaflet bundle and its CSS are only fetched when the user
   actually switches to this view. */

interface Props {
  onNavigate: (view: View) => void;
  selectedSlug?: string;
  showSettlements?: boolean;
}

const PENINSULA_CENTRE: [number, number] = [40.255, 24.21];
const PENINSULA_ZOOM = 11;

function monasteryIcon(active: boolean): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div class="athos-marker${active ? ' athos-marker--active' : ''}"></div>`,
    iconSize: active ? [24, 24] : [18, 18],
    iconAnchor: active ? [12, 12] : [9, 9],
  });
}

function portIcon(): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div class="athos-port-marker"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}


export function ModernMap({ onNavigate, selectedSlug, showSettlements = true }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const settlementLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: PENINSULA_CENTRE,
      zoom: PENINSULA_ZOOM,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    for (const m of MONASTERIES) {
      const isActive = m.slug === selectedSlug;
      const marker = L.marker([m.lat, m.lng], { icon: monasteryIcon(isActive) }).addTo(map);
      marker.bindTooltip(`${m.hierarchyOrder} · ${m.name}`, { direction: 'top', offset: [0, -6] });
      marker.on('click', () => onNavigate({ kind: 'monastery', slug: m.slug }));
    }

    for (const p of PORTS) {
      L.marker([p.lat, p.lng], { icon: portIcon(), title: p.name })
        .addTo(map)
        .bindTooltip(p.name, { direction: 'top', offset: [0, -6] });
    }

    settlementLayerRef.current = L.layerGroup();
    for (const s of SETTLEMENTS) {
      const isActive = s.slug === selectedSlug;
      const label = s.kind === 'skete' ? `Skete · ${s.name}` : `Hermitage · ${s.name}`;
      const marker = L.marker([s.lat, s.lng], { icon: monasteryIcon(isActive), title: s.name });
      marker.bindTooltip(label, { direction: 'top', offset: [0, -6] });
      marker.on('click', () => onNavigate({ kind: 'settlement', slug: s.slug }));
      settlementLayerRef.current.addLayer(marker);
    }
    if (showSettlements) {
      settlementLayerRef.current.addTo(map);
    }

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      settlementLayerRef.current = null;
    };
  }, [onNavigate, selectedSlug]);

  useEffect(() => {
    const map = mapRef.current;
    const layer = settlementLayerRef.current;
    if (!map || !layer) return;
    if (showSettlements && !map.hasLayer(layer)) {
      layer.addTo(map);
    } else if (!showSettlements && map.hasLayer(layer)) {
      map.removeLayer(layer);
    }
  }, [showSettlements]);

  return <div ref={containerRef} className="modern-map" />;
}

// Default export so React.lazy() can pick it up directly.
export default ModernMap;
