import { Suspense, lazy, useEffect, useMemo, useState, type ReactElement } from 'react';
import type { Trip, TripPlace, View } from '../types';
import { MONASTERIES, findMonastery } from '../data/monasteries';
import { SETTLEMENTS, findSettlement } from '../data/settlements';
import {
  addPlace,
  findTrip,
  formatTripDate,
  loadTrips,
  movePlace,
  nextReservationStatus,
  regenerateDays,
  removePlace,
  removeTrip,
  saveTrips,
  setPlaceNotes,
  setPlaceReservation,
  touch,
  upsertTrip,
} from '../lib/trips';
import { CrossFlourish } from './Ornaments';
import { useI18n } from '../i18n';
import { MONASTERIES_RO, SAINTS_RO, SETTLEMENTS_RO } from '../i18n/data-ro';
import { openItineraryInMaps, type MapPoint } from '../lib/maps';
import { getFeastsForDate, type FeastMatch } from '../lib/feasts';
import { getFastForDate, type FastForDate } from '../lib/fasts';
import { findPath, type WalkingEdge } from '../data/paths';
import { buildShareUrl, downloadText, tripToIcal } from '../lib/tripShare';

const TripItineraryMap = lazy(() => import('./TripItineraryMap'));

interface Props {
  slug: string;
  onNavigate: (view: View) => void;
}

interface PlaceLabel {
  name: string;
  nameGreek: string;
  view: View;
}

function encodePlaceOption(place: TripPlace): string {
  return `${place.kind}:${place.slug}`;
}

function decodePlaceOption(value: string): TripPlace | null {
  const [kind, slug] = value.split(':');
  if (slug && (kind === 'monastery' || kind === 'settlement')) {
    return { kind, slug };
  }
  return null;
}

function formatHours(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${String(m).padStart(2, '0')}`;
}

function WalkingLeg({ edge }: { edge: WalkingEdge }) {
  const { t } = useI18n();
  return (
    <li className="trip-detail__leg" aria-label={t('walking.legAria')}>
      <span className="trip-detail__leg-mark" aria-hidden="true">⤳</span>
      <span className="trip-detail__leg-body">
        <span className="trip-detail__leg-distance">
          {edge.km.toFixed(1)} km · {formatHours(edge.minutes)}
        </span>
        <span
          className={`trip-detail__leg-difficulty trip-detail__leg-difficulty--${edge.difficulty}`}
        >
          {t(`walking.difficulty.${edge.difficulty}`)}
        </span>
        {edge.ascentM > 0 && (
          <span className="trip-detail__leg-ascent">
            {t('walking.ascent', { m: edge.ascentM })}
          </span>
        )}
        {edge.notes && (
          <span className="trip-detail__leg-notes">{edge.notes}</span>
        )}
      </span>
    </li>
  );
}

function FastChip({ fast }: { fast: FastForDate }) {
  const { t } = useI18n();
  const isFastFree = fast.kind === 'bright-week' || fast.kind === 'christmastide';
  const classes = [
    'trip-detail__fast',
    `trip-detail__fast--${fast.kind}`,
    isFastFree ? 'trip-detail__fast--free' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={classes}>
      <span className="trip-detail__fast-name">{t(`fast.${fast.kind}`)}</span>
      {fast.dayOfFast && fast.lengthDays && (
        <span className="trip-detail__fast-day">
          {t('fast.dayOf', { n: fast.dayOfFast, total: fast.lengthDays })}
        </span>
      )}
      {fast.fishAllowed && (
        <span className="trip-detail__fast-relax">
          {t('fast.fishAllowed')}
        </span>
      )}
    </span>
  );
}

export function TripDetail({ slug, onNavigate }: Props) {
  const { t, tr, lang } = useI18n();
  const [trips, setTrips] = useState<Trip[]>(loadTrips);
  const trip = useMemo(() => findTrip(trips, slug), [trips, slug]);

  useEffect(() => {
    saveTrips(trips);
  }, [trips]);

  const resolveFeast = (match: FeastMatch) => {
    if (match.kind === 'monastery') {
      const m = findMonastery(match.slug);
      const ro = MONASTERIES_RO[match.slug];
      return {
        name: m ? tr(m.name, ro?.name) : match.name,
        nameGreek: match.nameGreek,
        feast: m ? tr(m.patronalFeast, ro?.patronalFeast) : match.feast,
        view: { kind: 'monastery', slug: match.slug } as View,
      };
    }
    if (match.kind === 'saint') {
      const ro = SAINTS_RO[match.slug];
      return {
        name: tr(match.name, ro?.name),
        nameGreek: match.nameGreek,
        feast: tr(match.feast, ro?.feast),
        view: { kind: 'saint', slug: match.slug } as View,
      };
    }
    const s = findSettlement(match.slug);
    const ro = SETTLEMENTS_RO[match.slug];
    return {
      name: s ? tr(s.name, ro?.name) : match.name,
      nameGreek: match.nameGreek,
      feast:
        s && s.patronalFeast
          ? tr(s.patronalFeast, ro?.patronalFeast)
          : match.feast,
      view: { kind: 'settlement', slug: match.slug } as View,
    };
  };

  const resolvePlace = (place: TripPlace): PlaceLabel | null => {
    if (place.kind === 'monastery') {
      const m = findMonastery(place.slug);
      if (!m) return null;
      const ro = MONASTERIES_RO[m.slug];
      return {
        name: tr(m.name, ro?.name),
        nameGreek: m.nameGreek,
        view: { kind: 'monastery', slug: m.slug },
      };
    }
    const s = findSettlement(place.slug);
    if (!s) return null;
    const ro = SETTLEMENTS_RO[s.slug];
    return {
      name: tr(s.name, ro?.name),
      nameGreek: s.nameGreek,
      view: { kind: 'settlement', slug: s.slug },
    };
  };

  if (!trip) {
    return (
      <div className="detail">
        <button
          type="button"
          className="detail__back"
          onClick={() => onNavigate({ kind: 'trips' })}
        >
          {t('detail.allTrips')}
        </button>
        <div className="parchment">
          <p>{t('detail.notFoundTrip')}</p>
        </div>
      </div>
    );
  }

  const update = (next: Trip) => {
    setTrips((prev) => upsertTrip(prev, touch(next)));
  };

  const onRename = () => {
    const input = window.prompt(t('tripDetail.renamePrompt'), trip.name);
    if (input === null) return;
    const trimmed = input.trim();
    if (!trimmed || trimmed === trip.name) return;
    update({ ...trip, name: trimmed });
  };

  const onChangeStart = (value: string) => {
    const days = regenerateDays(trip.days, value, trip.endDate);
    if (days.length === 0) {
      window.alert(t('tripDetail.alertStartAfterEnd'));
      return;
    }
    update({ ...trip, startDate: value, days });
  };

  const onChangeEnd = (value: string) => {
    const days = regenerateDays(trip.days, trip.startDate, value);
    if (days.length === 0) {
      window.alert(t('tripDetail.alertEndBeforeStart'));
      return;
    }
    update({ ...trip, endDate: value, days });
  };

  const onDeleteTrip = () => {
    if (!window.confirm(t('trips.confirmDelete', { name: trip.name })))
      return;
    setTrips((prev) => removeTrip(prev, trip.slug));
    onNavigate({ kind: 'trips' });
  };

  const onShare = async () => {
    const baseHref = window.location.href.split('#')[0];
    const url = buildShareUrl(trip, baseHref);
    if (navigator.share) {
      try {
        await navigator.share({ title: trip.name, url });
        return;
      } catch {
        /* fall through to clipboard */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      window.alert(t('tripDetail.shareCopied'));
    } catch {
      window.prompt(t('tripDetail.sharePromptCopy'), url);
    }
  };

  const onExportIcal = () => {
    const baseHref = window.location.href.split('#')[0];
    const ical = tripToIcal(trip, buildShareUrl(trip, baseHref));
    downloadText(`${trip.slug}.ics`, ical, 'text/calendar');
  };

  const onPrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const onAddPlace = (dayIndex: number, value: string) => {
    const place = decodePlaceOption(value);
    if (!place) return;
    const nextDays = trip.days.slice();
    nextDays[dayIndex] = addPlace(nextDays[dayIndex], place);
    update({ ...trip, days: nextDays });
  };

  const onRemovePlace = (dayIndex: number, placeIndex: number) => {
    const nextDays = trip.days.slice();
    nextDays[dayIndex] = removePlace(nextDays[dayIndex], placeIndex);
    update({ ...trip, days: nextDays });
  };

  const onMovePlace = (
    dayIndex: number,
    placeIndex: number,
    direction: -1 | 1,
  ) => {
    const nextDays = trip.days.slice();
    nextDays[dayIndex] = movePlace(nextDays[dayIndex], placeIndex, direction);
    update({ ...trip, days: nextDays });
  };

  const onCycleReservation = (dayIndex: number, placeIndex: number) => {
    const current = trip.days[dayIndex].places[placeIndex].reservationStatus;
    const nextDays = trip.days.slice();
    nextDays[dayIndex] = setPlaceReservation(
      nextDays[dayIndex],
      placeIndex,
      nextReservationStatus(current),
    );
    update({ ...trip, days: nextDays });
  };

  const onEditNotes = (dayIndex: number, placeIndex: number) => {
    const current = trip.days[dayIndex].places[placeIndex].notes ?? '';
    const input = window.prompt(t('tripDetail.notesPrompt'), current);
    if (input === null) return;
    const nextDays = trip.days.slice();
    nextDays[dayIndex] = setPlaceNotes(nextDays[dayIndex], placeIndex, input);
    update({ ...trip, days: nextDays });
  };

  const itineraryPoints: MapPoint[] = trip.days.flatMap((day) =>
    day.places.flatMap((place) => {
      const located =
        place.kind === 'monastery'
          ? findMonastery(place.slug)
          : findSettlement(place.slug);
      return located ? [{ lat: located.lat, lng: located.lng }] : [];
    }),
  );
  const hasItinerary = itineraryPoints.length > 0;

  return (
    <article className="detail">
      <button
        type="button"
        className="detail__back"
        onClick={() => onNavigate({ kind: 'trips' })}
      >
        {t('detail.allTrips')}
      </button>
      <div className="parchment">
        <header className="detail__header trip-detail__header">
          <h1 className="detail__name trip-detail__name">
            {trip.name}
            <button
              type="button"
              className="trip-detail__rename"
              onClick={onRename}
              aria-label={t('tripDetail.renameAriaLabel')}
            >
              {t('tripDetail.rename')}
            </button>
          </h1>
          <CrossFlourish className="section-divider" />
          <div className="trip-detail__dates">
            <label className="trip-form__field">
              <span>{t('tripDetail.start')}</span>
              <input
                type="date"
                value={trip.startDate}
                onChange={(e) => onChangeStart(e.target.value)}
              />
            </label>
            <label className="trip-form__field">
              <span>{t('tripDetail.end')}</span>
              <input
                type="date"
                value={trip.endDate}
                onChange={(e) => onChangeEnd(e.target.value)}
              />
            </label>
            <button
              type="button"
              className="trip-detail__delete"
              onClick={onDeleteTrip}
            >
              {t('tripDetail.deleteTrip')}
            </button>
          </div>
          <div className="trip-detail__share-row">
            <button type="button" onClick={onShare} className="trip-detail__share">
              {t('tripDetail.share')}
            </button>
            <button type="button" onClick={onExportIcal} className="trip-detail__share">
              {t('tripDetail.exportIcal')}
            </button>
            <button type="button" onClick={onPrint} className="trip-detail__share">
              {t('tripDetail.print')}
            </button>
          </div>
        </header>

        <section className="trip-detail__map" aria-label={t('tripDetail.itineraryMap')}>
          <Suspense
            fallback={
              <div
                className="trip-map trip-map--loading"
                role="status"
              >
                <span>{t('tripDetail.loadingMap')}</span>
              </div>
            }
          >
            <TripItineraryMap trip={trip} onNavigate={onNavigate} />
          </Suspense>
          <div className="detail__open-maps-row">
            <button
              type="button"
              className="detail__open-maps"
              onClick={() => openItineraryInMaps(itineraryPoints, trip.name)}
              disabled={!hasItinerary}
              title={hasItinerary ? undefined : t('tripDetail.openInMapsEmpty')}
            >
              <span className="detail__open-maps-mark" aria-hidden="true">⌖</span>
              {t('tripDetail.openInMaps')}
            </button>
          </div>
        </section>

        <section className="trip-detail__days">
          {trip.days.map((day, dayIndex) => {
            const feasts = getFeastsForDate(day.date);
            const fast = getFastForDate(day.date);
            return (
            <div key={day.date} className="trip-detail__day">
              <h2 className="trip-detail__day-title">
                {t('tripDetail.dayN', { n: dayIndex + 1 })}
                <span className="trip-detail__day-date">
                  {formatTripDate(day.date, lang)}
                </span>
                {fast.kind !== 'none' && <FastChip fast={fast} />}
              </h2>
              {feasts.length > 0 && (
                <div className="trip-detail__feasts">
                  <span className="trip-detail__feasts-label" aria-hidden="true">
                    ☩
                  </span>
                  <div className="trip-detail__feasts-body">
                    <span className="trip-detail__feasts-heading">
                      {t('tripDetail.feastToday')}
                    </span>
                    <ul className="trip-detail__feasts-list">
                      {feasts.map((f) => {
                        const r = resolveFeast(f);
                        return (
                          <li key={`${f.kind}:${f.slug}`}>
                            <button
                              type="button"
                              className="trip-detail__feast-link"
                              onClick={() => onNavigate(r.view)}
                            >
                              <span className="trip-detail__feast-name">
                                {r.name}
                              </span>
                              <span className="trip-detail__feast-feast">
                                {r.feast}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
              {day.places.length === 0 ? (
                <p className="trip-detail__day-empty">{t('tripDetail.dayEmpty')}</p>
              ) : (
                <ol className="trip-detail__places">
                  {day.places.flatMap((place, placeIndex) => {
                    const label = resolvePlace(place);
                    const unknownLabel =
                      place.kind === 'monastery'
                        ? t('tripDetail.unknownMonastery')
                        : t('tripDetail.unknownSettlement');
                    const prior = placeIndex > 0 ? day.places[placeIndex - 1] : null;
                    const leg = prior ? findPath(prior.slug, place.slug) : undefined;
                    const items: ReactElement[] = [];
                    if (leg) {
                      items.push(
                        <WalkingLeg
                          key={`leg:${prior!.slug}:${place.slug}`}
                          edge={leg}
                        />,
                      );
                    }
                    items.push(
                      <li
                        key={`${place.kind}:${place.slug}`}
                        className="trip-detail__place"
                      >
                        <button
                          type="button"
                          className="trip-detail__place-link"
                          onClick={() =>
                            label && onNavigate(label.view)
                          }
                          disabled={!label}
                        >
                          <span className="trip-detail__place-name">
                            {label ? label.name : unknownLabel}
                          </span>
                          {label && (
                            <span className="trip-detail__place-greek">
                              {label.nameGreek}
                            </span>
                          )}
                        </button>
                        <div className="trip-detail__place-actions">
                          <button
                            type="button"
                            className={`trip-detail__pip trip-detail__pip--${place.reservationStatus ?? 'planned'}`}
                            onClick={() =>
                              onCycleReservation(dayIndex, placeIndex)
                            }
                            title={t(
                              `tripDetail.reservation.${place.reservationStatus ?? 'planned'}`,
                            )}
                            aria-label={t('tripDetail.cycleReservation', {
                              status: t(
                                `tripDetail.reservation.${place.reservationStatus ?? 'planned'}`,
                              ),
                            })}
                          >
                            <span className="trip-detail__pip-mark" aria-hidden="true">●</span>
                            <span className="trip-detail__pip-label">
                              {t(
                                `tripDetail.reservation.${place.reservationStatus ?? 'planned'}`,
                              )}
                            </span>
                          </button>
                          <button
                            type="button"
                            className="trip-detail__notes-btn"
                            onClick={() =>
                              onEditNotes(dayIndex, placeIndex)
                            }
                            title={place.notes || t('tripDetail.notesAdd')}
                            aria-label={t('tripDetail.notesAria')}
                          >
                            {place.notes ? '✎' : '+'}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onMovePlace(dayIndex, placeIndex, -1)
                            }
                            disabled={placeIndex === 0}
                            aria-label={t('tripDetail.moveUp')}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onMovePlace(dayIndex, placeIndex, 1)
                            }
                            disabled={placeIndex === day.places.length - 1}
                            aria-label={t('tripDetail.moveDown')}
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onRemovePlace(dayIndex, placeIndex)
                            }
                            aria-label={t('tripDetail.removePlace')}
                          >
                            {t('tripDetail.remove')}
                          </button>
                        </div>
                        {place.notes && (
                          <p className="trip-detail__place-notes">
                            {place.notes}
                          </p>
                        )}
                      </li>,
                    );
                    return items;
                  })}
                </ol>
              )}

              <div className="trip-detail__add-place">
                <label>
                  <span className="trip-detail__add-label">{t('tripDetail.addPlace')}</span>
                  <select
                    value=""
                    onChange={(e) => {
                      onAddPlace(dayIndex, e.target.value);
                      e.target.value = '';
                    }}
                  >
                    <option value="" disabled>
                      {t('tripDetail.pickPlace')}
                    </option>
                    <optgroup label={t('tripDetail.rulingMonasteries')}>
                      {MONASTERIES.map((m) => {
                        const ro = MONASTERIES_RO[m.slug];
                        return (
                          <option
                            key={m.slug}
                            value={encodePlaceOption({
                              kind: 'monastery',
                              slug: m.slug,
                            })}
                          >
                            {tr(m.name, ro?.name)}
                          </option>
                        );
                      })}
                    </optgroup>
                    <optgroup label={t('tripDetail.sketesHermitages')}>
                      {SETTLEMENTS.map((s) => {
                        const ro = SETTLEMENTS_RO[s.slug];
                        return (
                          <option
                            key={s.slug}
                            value={encodePlaceOption({
                              kind: 'settlement',
                              slug: s.slug,
                            })}
                          >
                            {tr(s.name, ro?.name)}
                          </option>
                        );
                      })}
                    </optgroup>
                  </select>
                </label>
              </div>
            </div>
            );
          })}
        </section>
      </div>
    </article>
  );
}
