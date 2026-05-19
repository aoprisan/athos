import { useEffect, useMemo, useState } from 'react';
import { MapView } from './MapView';
import { MONASTERIES, findMonastery } from '../data/monasteries';
import { SETTLEMENTS } from '../data/settlements';
import type { View } from '../types';
import { CrossFlourish, HaloMedallion } from './Ornaments';
import { useI18n } from '../i18n';
import { MONASTERIES_RO, SETTLEMENTS_RO } from '../i18n/data-ro';
import { regionLabel, traditionLabel } from '../i18n/strings';
import { loadTrips } from '../lib/trips';

interface Props {
  onNavigate: (view: View) => void;
}

const REGION_STORAGE_KEY = 'athos:show-regions';

function readStoredShowRegions(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(REGION_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function HomeView({ onNavigate }: Props) {
  const { t, tr, lang } = useI18n();
  const [showRegions, setShowRegions] = useState<boolean>(readStoredShowRegions);

  useEffect(() => {
    try {
      window.localStorage.setItem(REGION_STORAGE_KEY, showRegions ? '1' : '0');
    } catch {
      /* ignore quota or privacy-mode failures */
    }
  }, [showRegions]);

  const [ledePre, ledePost = ''] = t('home.lede').split('{diamonitirion}');
  const tripCount = useMemo(() => loadTrips().length, []);

  return (
    <div>
      <section className="home__intro">
        <p className="home__subtitle">{t('home.subtitle')}</p>
        <h1 className="home__title">{t('home.title')}</h1>
        <p className="home__lede">
          {ledePre}
          <em>Diamonitirion</em>
          {ledePost}
        </p>
        {tripCount > 0 && (
          <button
            type="button"
            className="home__trips-stat"
            onClick={() => onNavigate({ kind: 'trips' })}
          >
            <span className="home__trips-stat-mark" aria-hidden="true">☩</span>
            <span className="home__trips-stat-text">
              {t(
                tripCount === 1 ? 'home.tripsOnDevice' : 'home.tripsOnDevicePlural',
                { n: tripCount },
              )}
            </span>
          </button>
        )}
        <CrossFlourish className="home__flourish" />
      </section>

      <div className="home">
        <section className="home__map">
          <MapView onNavigate={onNavigate} />
        </section>

        <section className="home__list">
          <h2 className="home__list-title">{t('home.listTitle')}</h2>
          <p className="home__list-subtitle">{t('home.listSubtitle')}</p>
          <label className="home__regions-toggle">
            <input
              type="checkbox"
              checked={showRegions}
              onChange={(e) => setShowRegions(e.target.checked)}
            />
            <span>{t('home.regionLabel')}</span>
          </label>
          <ol className="monastery-list">
            {MONASTERIES.map((m) => {
              const ro = MONASTERIES_RO[m.slug];
              return (
                <li key={m.slug}>
                  <button
                    type="button"
                    className="monastery-list__item"
                    onClick={() => onNavigate({ kind: 'monastery', slug: m.slug })}
                  >
                    <HaloMedallion number={m.hierarchyOrder} className="halo-medallion" />
                    <span className="monastery-list__name">
                      <strong>{tr(m.name, ro?.name)}</strong>
                      <span className="monastery-list__greek">{m.nameGreek}</span>
                    </span>
                    <span className="monastery-list__tags">
                      <span className="monastery-list__tradition">
                        {traditionLabel(m.tradition, lang)}
                      </span>
                      {showRegions && (
                        <span className="monastery-list__region">
                          {regionLabel(m.region, lang)}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <h2 className="home__list-title home__list-title--secondary">
            {t('home.settlementsTitle')}
          </h2>
          <p className="home__list-subtitle">{t('home.settlementsSubtitle')}</p>
          <ul className="monastery-list settlement-list">
            {SETTLEMENTS.map((s) => {
              const ro = SETTLEMENTS_RO[s.slug];
              const parent = s.dependsOn ? findMonastery(s.dependsOn) : undefined;
              return (
                <li key={s.slug}>
                  <button
                    type="button"
                    className="monastery-list__item monastery-list__item--settlement"
                    onClick={() => onNavigate({ kind: 'settlement', slug: s.slug })}
                  >
                    <span
                      className={`settlement-mark settlement-mark--${s.kind}`}
                      aria-hidden="true"
                    >
                      {s.kind === 'skete' ? '☩' : '·'}
                    </span>
                    <span className="monastery-list__name">
                      <strong>{tr(s.name, ro?.name)}</strong>
                      <span className="monastery-list__greek">{s.nameGreek}</span>
                    </span>
                    <span className="monastery-list__tags">
                      <span className="monastery-list__tradition">
                        {s.tradition
                          ? traditionLabel(s.tradition, lang)
                          : t('home.hermitageLabel')}
                      </span>
                      {showRegions && parent && (
                        <span className="monastery-list__region">
                          {regionLabel(parent.region, lang)}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
