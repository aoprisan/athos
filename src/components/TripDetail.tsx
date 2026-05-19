import { useEffect, useMemo, useState } from 'react';
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

interface Props {
  slug: string;
  onNavigate: (view: View) => void;
}

interface PlaceLabel {
  name: string;
  nameGreek: string;
  view: View;
}

function resolvePlace(place: TripPlace): PlaceLabel | null {
  if (place.kind === 'monastery') {
    const m = findMonastery(place.slug);
    if (!m) return null;
    return {
      name: m.name,
      nameGreek: m.nameGreek,
      view: { kind: 'monastery', slug: m.slug },
    };
  }
  const s = findSettlement(place.slug);
  if (!s) return null;
  return {
    name: s.name,
    nameGreek: s.nameGreek,
    view: { kind: 'settlement', slug: s.slug },
  };
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
  const [trips, setTrips] = useState<Trip[]>(loadTrips);
  const trip = useMemo(() => findTrip(trips, slug), [trips, slug]);

  useEffect(() => {
    saveTrips(trips);
  }, [trips]);

  if (!trip) {
    return (
      <div className="detail">
        <button
          type="button"
          className="detail__back"
          onClick={() => onNavigate({ kind: 'trips' })}
        >
          ☩ All trips
        </button>
        <div className="parchment">
          <p>Trip not found.</p>
        </div>
      </div>
    );
  }

  const update = (next: Trip) => {
    setTrips((prev) => upsertTrip(prev, touch(next)));
  };

  const onRename = () => {
    const input = window.prompt('Rename trip', trip.name);
    if (input === null) return;
    const trimmed = input.trim();
    if (!trimmed || trimmed === trip.name) return;
    update({ ...trip, name: trimmed });
  };

  const onChangeStart = (value: string) => {
    const days = regenerateDays(trip.days, value, trip.endDate);
    if (days.length === 0) {
      window.alert('Start date must be on or before the end date.');
      return;
    }
    update({ ...trip, startDate: value, days });
  };

  const onChangeEnd = (value: string) => {
    const days = regenerateDays(trip.days, trip.startDate, value);
    if (days.length === 0) {
      window.alert('End date must be on or after the start date.');
      return;
    }
    update({ ...trip, endDate: value, days });
  };

  const onDeleteTrip = () => {
    if (!window.confirm(`Delete trip "${trip.name}"? This cannot be undone.`))
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
        ☩ All trips
      </button>
      <div className="parchment">
        <header className="detail__header trip-detail__header">
          <h1 className="detail__name trip-detail__name">
            {trip.name}
            <button
              type="button"
              className="trip-detail__rename"
              onClick={onRename}
              aria-label="Rename trip"
            >
              Rename
            </button>
          </h1>
          <CrossFlourish className="section-divider" />
          <div className="trip-detail__dates">
            <label className="trip-form__field">
              <span>Start</span>
              <input
                type="date"
                value={trip.startDate}
                onChange={(e) => onChangeStart(e.target.value)}
              />
            </label>
            <label className="trip-form__field">
              <span>End</span>
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
              Delete trip
            </button>
          </div>
        </header>

        <section className="trip-detail__days">
          {trip.days.map((day, dayIndex) => (
            <div key={day.date} className="trip-detail__day">
              <h2 className="trip-detail__day-title">
                Day {dayIndex + 1}
                <span className="trip-detail__day-date">
                  {formatTripDate(day.date)}
                </span>
              </h2>
              {day.places.length === 0 ? (
                <p className="trip-detail__day-empty">No places yet.</p>
              ) : (
                <ol className="trip-detail__places">
                  {day.places.map((place, placeIndex) => {
                    const label = resolvePlace(place);
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
                            {label ? label.name : `Unknown ${place.kind}`}
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
                            aria-label="Move up"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onMovePlace(dayIndex, placeIndex, 1)
                            }
                            disabled={placeIndex === day.places.length - 1}
                            aria-label="Move down"
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onRemovePlace(dayIndex, placeIndex)
                            }
                            aria-label="Remove place"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}

              <div className="trip-detail__add-place">
                <label>
                  <span className="trip-detail__add-label">Add a place</span>
                  <select
                    value=""
                    onChange={(e) => {
                      onAddPlace(dayIndex, e.target.value);
                      e.target.value = '';
                    }}
                  >
                    <option value="" disabled>
                      Pick a monastery or skete…
                    </option>
                    <optgroup label="Ruling monasteries">
                      {MONASTERIES.map((m) => (
                        <option
                          key={m.slug}
                          value={encodePlaceOption({
                            kind: 'monastery',
                            slug: m.slug,
                          })}
                        >
                          {m.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Sketes & hermitages">
                      {SETTLEMENTS.map((s) => (
                        <option
                          key={s.slug}
                          value={encodePlaceOption({
                            kind: 'settlement',
                            slug: s.slug,
                          })}
                        >
                          {s.name}
                        </option>
                      ))}
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
