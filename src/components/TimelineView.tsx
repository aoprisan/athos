import { useMemo } from 'react';
import { MONASTERIES } from '../data/monasteries';
import { useI18n } from '../i18n';
import { MONASTERIES_RO } from '../i18n/data-ro';
import { parseFoundedYear } from '../lib/founded';
import { CrossFlourish, HaloMedallion } from './Ornaments';
import type { View } from '../types';

interface Props {
  onNavigate: (view: View) => void;
}

interface Placed {
  slug: string;
  name: string;
  greek: string;
  founded: string;
  hierarchyOrder: number;
  year: number;
}

const START_CENTURY = 9;
const END_CENTURY = 21;

export function TimelineView({ onNavigate }: Props) {
  const { t, tr, lang } = useI18n();

  const placed = useMemo<Placed[]>(() => {
    return MONASTERIES.map((m) => {
      const ro = MONASTERIES_RO[m.slug];
      const year = parseFoundedYear(m.founded);
      if (year === null) return null;
      return {
        slug: m.slug,
        name: tr(m.name, ro?.name),
        greek: m.nameGreek,
        founded: tr(m.founded, ro?.founded),
        hierarchyOrder: m.hierarchyOrder,
        year,
      };
    })
      .filter((x): x is Placed => x !== null)
      .sort((a, b) => a.year - b.year);
  }, [tr]);

  const startYear = (START_CENTURY - 1) * 100;
  const endYear = (END_CENTURY - 1) * 100;
  const span = endYear - startYear;

  const positionPercent = (year: number): number => {
    const clamped = Math.max(startYear, Math.min(endYear, year));
    return ((clamped - startYear) / span) * 100;
  };

  return (
    <article className="timeline-view">
      <header className="timeline-view__header">
        <p className="home__subtitle">{t('timeline.subtitle')}</p>
        <h1 className="home__title">{t('timeline.title')}</h1>
        <p className="home__lede">{t('timeline.lede')}</p>
        <CrossFlourish className="home__flourish" />
      </header>

      <section className="timeline">
        <div className="timeline__band" role="list">
          <div className="timeline__rule" aria-hidden="true" />
          {Array.from({ length: END_CENTURY - START_CENTURY + 1 }, (_, i) => {
            const century = START_CENTURY + i;
            const year = (century - 1) * 100;
            const left = positionPercent(year);
            return (
              <div
                key={century}
                className="timeline__century"
                style={{ left: `${left}%` }}
                aria-hidden="true"
              >
                <span className="timeline__tick" />
                <span className="timeline__century-label">
                  {t('timeline.centuryLabel', { n: century })}
                </span>
              </div>
            );
          })}
          {placed.map((p, idx) => {
            const left = positionPercent(p.year);
            const lane = idx % 2 === 0 ? 'up' : 'down';
            return (
              <button
                key={p.slug}
                type="button"
                role="listitem"
                className={`timeline__pin timeline__pin--${lane}`}
                style={{ left: `${left}%` }}
                onClick={() => onNavigate({ kind: 'monastery', slug: p.slug })}
                aria-label={t('timeline.pinAria', { name: p.name, year: p.year })}
              >
                <span className="timeline__pin-stem" aria-hidden="true" />
                <HaloMedallion
                  number={p.hierarchyOrder}
                  className="timeline__pin-halo"
                />
                <span className="timeline__pin-tick" aria-hidden="true" />
                <span className="timeline__pin-card">
                  <span className="timeline__pin-name">{p.name}</span>
                  <span className="timeline__pin-year">{p.founded}</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="timeline__hint">
          {lang === 'ro'
            ? 'Atinge un medalion pentru a vedea mănăstirea.'
            : 'Tap a medallion to open the monastery.'}
        </p>
      </section>
    </article>
  );
}
