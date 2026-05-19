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
  tripFromTemplate,
  upsertTrip,
} from '../lib/trips';
import {
  SUGGESTED_ITINERARIES,
  type SuggestedItinerary,
} from '../data/suggested-itineraries';
import { findMonastery } from '../data/monasteries';
import { findSettlement } from '../data/settlements';
import { MONASTERIES_RO, SETTLEMENTS_RO, SUGGESTED_ITINERARIES_RO } from '../i18n/data-ro';
import { CrossFlourish, HaloMedallion } from './Ornaments';
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
  const { t, tr, lang } = useI18n();
  const [trips, setTrips] = useState<Trip[]>(loadTrips);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(todayISO);
  const [endDate, setEndDate] = useState(todayISO);
  const [error, setError] = useState<string | null>(null);
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [templateStart, setTemplateStart] = useState<string>(todayISO);

  function placeLabel(place: { kind: 'monastery' | 'settlement'; slug: string }): string {
    if (place.kind === 'monastery') {
      const m = findMonastery(place.slug);
      if (!m) return place.slug;
      const ro = MONASTERIES_RO[place.slug];
      return tr(m.name, ro?.name);
    }
    const s = findSettlement(place.slug);
    if (!s) return place.slug;
    const ro = SETTLEMENTS_RO[place.slug];
    return tr(s.name, ro?.name);
  }

  function templateStops(template: SuggestedItinerary): number {
    return template.days.reduce((sum, d) => sum + d.places.length, 0);
  }

  function createFromTemplate(template: SuggestedItinerary) {
    const ro = SUGGESTED_ITINERARIES_RO[template.id];
    const tripName = tr(template.name, ro?.name);
    const built = tripFromTemplate(template, templateStart, tripName);
    const slug = makeTripSlug(tripName);
    const trip: Trip = touch({
      ...built,
      slug,
      updatedAt: '',
    });
    setTrips((prev) => upsertTrip(prev, trip));
    setExpandedTemplate(null);
    onNavigate({ kind: 'trip', slug });
  }

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

      <div className="parchment templates-card">
        <h2 className="templates-card__title">{t('trips.templatesTitle')}</h2>
        <p className="templates-card__subtitle">
          {t('trips.templatesSubtitle')}
        </p>
        <ul className="templates-list">
          {SUGGESTED_ITINERARIES.map((template, idx) => {
            const ro = SUGGESTED_ITINERARIES_RO[template.id];
            const tplName = tr(template.name, ro?.name);
            const tplDesc = tr(template.description, ro?.description);
            const isOpen = expandedTemplate === template.id;
            return (
              <li key={template.id} className="template-card">
                <div className="template-card__head">
                  <HaloMedallion number={idx + 1} active={isOpen} />
                  <div className="template-card__heading">
                    <h3 className="template-card__name">{tplName}</h3>
                    <p className="template-card__meta">
                      <span>
                        {t('trips.templateDuration', { n: template.durationDays })}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {t('trips.templateStops', { n: templateStops(template) })}
                      </span>
                    </p>
                  </div>
                </div>
                <p className="template-card__desc">{tplDesc}</p>
                <ol className="template-card__days">
                  {template.days.map((day, dayIdx) => (
                    <li key={dayIdx} className="template-card__day">
                      <span className="template-card__day-label">
                        {t('trips.templateDay', { n: dayIdx + 1 })}
                      </span>
                      <span className="template-card__day-places">
                        {day.places.map((p) => placeLabel(p)).join(' · ')}
                      </span>
                    </li>
                  ))}
                </ol>
                {isOpen ? (
                  <div className="template-card__create">
                    <label className="template-card__date">
                      <span>{t('trips.templateStartDate')}</span>
                      <input
                        type="date"
                        value={templateStart}
                        onChange={(e) => setTemplateStart(e.target.value)}
                      />
                    </label>
                    <div className="template-card__create-actions">
                      <button
                        type="button"
                        className="template-card__confirm"
                        onClick={() => createFromTemplate(template)}
                      >
                        {t('trips.templateConfirm')}
                      </button>
                      <button
                        type="button"
                        className="template-card__cancel"
                        onClick={() => setExpandedTemplate(null)}
                      >
                        {t('trips.templateCancel')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="template-card__use"
                    onClick={() => {
                      setTemplateStart(todayISO());
                      setExpandedTemplate(template.id);
                    }}
                  >
                    {t('trips.templateUse')}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
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
