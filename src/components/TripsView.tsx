import { useEffect, useState } from 'react';
import type { Trip, View } from '../types';
import {
  eachDateInRange,
  formatTripRange,
  loadTrips,
  makeTripSlug,
  removeTrip,
  saveTrips,
  touch,
  upsertTrip,
} from '../lib/trips';
import { CrossFlourish } from './Ornaments';

interface Props {
  onNavigate: (view: View) => void;
}

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function TripsView({ onNavigate }: Props) {
  const [trips, setTrips] = useState<Trip[]>(loadTrips);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(todayISO);
  const [endDate, setEndDate] = useState(todayISO);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    saveTrips(trips);
  }, [trips]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Give the trip a name.');
      return;
    }
    const days = eachDateInRange(startDate, endDate);
    if (days.length === 0) {
      setError('End date must be on or after the start date.');
      return;
    }
    const slug = makeTripSlug(trimmed);
    const trip: Trip = touch({
      slug,
      name: trimmed,
      startDate,
      endDate,
      days: days.map((date) => ({ date, places: [] })),
      updatedAt: '',
    });
    setTrips((prev) => upsertTrip(prev, trip));
    setName('');
    setError(null);
    onNavigate({ kind: 'trip', slug });
  };

  const onDelete = (slug: string, label: string) => {
    if (!window.confirm(`Delete trip "${label}"? This cannot be undone.`)) return;
    setTrips((prev) => removeTrip(prev, slug));
  };

  return (
    <div className="trips">
      <section className="home__intro">
        <p className="home__subtitle">Plan your pilgrimage</p>
        <h1 className="home__title">Trips</h1>
        <p className="home__lede">
          Sketch out the days of your visit and the monasteries or sketes you
          hope to call at on each. Trips are stored on this device only.
        </p>
        <CrossFlourish className="home__flourish" />
      </section>

      <div className="parchment trip-form-card">
        <h2 className="trip-form-card__title">New trip</h2>
        <form className="trip-form" onSubmit={submit}>
          <label className="trip-form__field">
            <span>Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Spring pilgrimage"
              maxLength={80}
              required
            />
          </label>
          <label className="trip-form__field">
            <span>Start date</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label className="trip-form__field">
            <span>End date</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
          {error && <p className="trip-form__error">{error}</p>}
          <div className="trip-form__actions">
            <button type="submit" className="trip-form__submit">
              Create trip
            </button>
          </div>
        </form>
      </div>

      <div className="parchment trips-list-card">
        <h2 className="trips-list-card__title">Your trips</h2>
        {trips.length === 0 ? (
          <p className="trips-list__empty">
            No trips yet. Use the form above to plan your first visit.
          </p>
        ) : (
          <ul className="trips-list">
            {trips.map((t) => {
              const dayCount = t.days.length;
              const placeCount = t.days.reduce(
                (sum, d) => sum + d.places.length,
                0,
              );
              return (
                <li key={t.slug} className="trips-list__item">
                  <button
                    type="button"
                    className="trips-list__link"
                    onClick={() => onNavigate({ kind: 'trip', slug: t.slug })}
                  >
                    <span className="trips-list__name">{t.name}</span>
                    <span className="trips-list__range">
                      {formatTripRange(t.startDate, t.endDate)}
                    </span>
                    <span className="trips-list__counts">
                      {dayCount} {dayCount === 1 ? 'day' : 'days'} ·{' '}
                      {placeCount}{' '}
                      {placeCount === 1 ? 'place' : 'places'}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="trips-list__delete"
                    onClick={() => onDelete(t.slug, t.name)}
                    aria-label={`Delete trip ${t.name}`}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
