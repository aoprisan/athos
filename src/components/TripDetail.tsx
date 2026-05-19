import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import type { Trip, TripPlace, View } from '../types';
import { MONASTERIES, findMonastery } from '../data/monasteries';
import { SETTLEMENTS, findSettlement } from '../data/settlements';
import {
  addPlace,
  findTrip,
  formatTripDate,
  loadTrips,
  movePlace,
  regenerateDays,
  removePlace,
  removeTrip,
  saveTrips,
  touch,
  upsertTrip,
} from '../lib/trips';
import { CrossFlourish } from './Ornaments';
import { useI18n } from '../i18n';
import { MONASTERIES_RO, SETTLEMENTS_RO } from '../i18n/data-ro';

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

export function TripDetail({ slug, onNavigate }: Props) {
  const { t, tr, lang } = useI18n();
  const [trips, setTrips] = useState<Trip[]>(loadTrips);
  const trip = useMemo(() => findTrip(trips, slug), [trips, slug]);

  useEffect(() => {
    saveTrips(trips);
  }, [trips]);

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
        </section>

        <section className="trip-detail__days">
          {trip.days.map((day, dayIndex) => (
            <div key={day.date} className="trip-detail__day">
              <h2 className="trip-detail__day-title">
                {t('tripDetail.dayN', { n: dayIndex + 1 })}
                <span className="trip-detail__day-date">
                  {formatTripDate(day.date, lang)}
                </span>
              </h2>
              {day.places.length === 0 ? (
                <p className="trip-detail__day-empty">{t('tripDetail.dayEmpty')}</p>
              ) : (
                <ol className="trip-detail__places">
                  {day.places.map((place, placeIndex) => {
                    const label = resolvePlace(place);
                    const unknownLabel =
                      place.kind === 'monastery'
                        ? t('tripDetail.unknownMonastery')
                        : t('tripDetail.unknownSettlement');
                    return (
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
                      </li>
                    );
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
          ))}
        </section>
      </div>
    </article>
  );
}
