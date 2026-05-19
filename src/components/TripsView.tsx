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
import { useI18n } from '../i18n';

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
  const { t, lang } = useI18n();
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
      setError(t('trips.errorName'));
      return;
    }
    const days = eachDateInRange(startDate, endDate);
    if (days.length === 0) {
      setError(t('trips.errorRange'));
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
    if (!window.confirm(t('trips.confirmDelete', { name: label }))) return;
    setTrips((prev) => removeTrip(prev, slug));
  };

  return (
    <div className="trips">
      <section className="home__intro">
        <p className="home__subtitle">{t('trips.subtitle')}</p>
        <h1 className="home__title">{t('trips.title')}</h1>
        <p className="home__lede">{t('trips.lede')}</p>
        <CrossFlourish className="home__flourish" />
      </section>

      <div className="parchment trip-form-card">
        <h2 className="trip-form-card__title">{t('trips.newTrip')}</h2>
        <form className="trip-form" onSubmit={submit}>
          <label className="trip-form__field">
            <span>{t('trips.name')}</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('trips.namePlaceholder')}
              maxLength={80}
              required
            />
          </label>
          <label className="trip-form__field">
            <span>{t('trips.startDate')}</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label className="trip-form__field">
            <span>{t('trips.endDate')}</span>
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
              {t('trips.create')}
            </button>
          </div>
        </form>
      </div>

      <div className="parchment trips-list-card">
        <h2 className="trips-list-card__title">{t('trips.yourTrips')}</h2>
        {trips.length === 0 ? (
          <p className="trips-list__empty">{t('trips.empty')}</p>
        ) : (
          <ul className="trips-list">
            {trips.map((tr) => {
              const dayCount = tr.days.length;
              const placeCount = tr.days.reduce(
                (sum, d) => sum + d.places.length,
                0,
              );
              return (
                <li key={tr.slug} className="trips-list__item">
                  <button
                    type="button"
                    className="trips-list__link"
                    onClick={() => onNavigate({ kind: 'trip', slug: tr.slug })}
                  >
                    <span className="trips-list__name">{tr.name}</span>
                    <span className="trips-list__range">
                      {formatTripRange(tr.startDate, tr.endDate, lang)}
                    </span>
                    <span className="trips-list__counts">
                      {dayCount}{' '}
                      {dayCount === 1 ? t('trips.day') : t('trips.days')} ·{' '}
                      {placeCount}{' '}
                      {placeCount === 1 ? t('trips.place') : t('trips.places')}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="trips-list__delete"
                    onClick={() => onDelete(tr.slug, tr.name)}
                    aria-label={t('trips.deleteAriaLabel', { name: tr.name })}
                  >
                    {t('trips.delete')}
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
