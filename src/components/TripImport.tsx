import { useMemo, useState } from 'react';
import {
  decodeSharedTrip,
  sanitiseSharedPlaces,
  type ShareableTrip,
} from '../lib/tripShare';
import {
  loadTrips,
  makeTripSlug,
  saveTrips,
  touch,
  upsertTrip,
} from '../lib/trips';
import { useI18n } from '../i18n';
import type { Trip, View } from '../types';
import { CrossFlourish } from './Ornaments';

interface Props {
  blob: string;
  onNavigate: (view: View) => void;
}

export function TripImport({ blob, onNavigate }: Props) {
  const { t, lang } = useI18n();
  const shared = useMemo<ShareableTrip | null>(
    () => decodeSharedTrip(blob),
    [blob],
  );
  const [imported, setImported] = useState<Trip | null>(null);

  if (!shared) {
    return (
      <article className="detail">
        <div className="parchment">
          <h1 className="detail__name">{t('tripImport.invalidTitle')}</h1>
          <p>{t('tripImport.invalidBody')}</p>
          <button type="button" onClick={() => onNavigate({ kind: 'trips' })}>
            {t('detail.allTrips')}
          </button>
        </div>
      </article>
    );
  }

  const totalPlaces = shared.days.reduce(
    (acc, d) => acc + d.places.length,
    0,
  );

  const onConfirm = () => {
    const trip: Trip = touch({
      slug: makeTripSlug(shared.name),
      name: shared.name,
      startDate: shared.startDate,
      endDate: shared.endDate,
      days: shared.days.map((d) => ({
        date: d.date,
        places: sanitiseSharedPlaces(d.places),
      })),
      updatedAt: new Date().toISOString(),
    });
    const next = upsertTrip(loadTrips(), trip);
    saveTrips(next);
    setImported(trip);
  };

  if (imported) {
    return (
      <article className="detail">
        <div className="parchment trip-import">
          <h1 className="detail__name">{t('tripImport.savedTitle')}</h1>
          <p>
            {t('tripImport.savedBody', { name: imported.name })}
          </p>
          <CrossFlourish className="section-divider" />
          <div className="trip-import__actions">
            <button
              type="button"
              onClick={() =>
                onNavigate({ kind: 'trip', slug: imported.slug })
              }
            >
              {t('tripImport.openTrip')}
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ kind: 'trips' })}
            >
              {t('detail.allTrips')}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="detail">
      <div className="parchment trip-import">
        <h1 className="detail__name">{t('tripImport.title')}</h1>
        <p>{t('tripImport.lede', { name: shared.name })}</p>
        <ul className="trip-import__summary">
          <li>
            <strong>{t('tripImport.dates')}</strong> {shared.startDate} – {shared.endDate}
          </li>
          <li>
            <strong>{t('tripImport.places')}</strong> {totalPlaces}
          </li>
          <li>
            <strong>{t('tripImport.days')}</strong> {shared.days.length}
          </li>
        </ul>
        <CrossFlourish className="section-divider" />
        <div className="trip-import__actions">
          <button type="button" className="trip-import__confirm" onClick={onConfirm}>
            {t('tripImport.confirm')}
          </button>
          <button type="button" onClick={() => onNavigate({ kind: 'trips' })}>
            {t('tripImport.cancel')}
          </button>
        </div>
        <p className="trip-import__hint">
          {lang === 'ro'
            ? 'Pelerinajul va fi salvat doar pe acest dispozitiv.'
            : 'The trip will be saved on this device only.'}
        </p>
      </div>
    </article>
  );
}
