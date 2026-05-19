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
  century: number;
}

function centuryOf(year: number): number {
  return Math.floor((year - 1) / 100) + 1;
}

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
        century: centuryOf(year),
      };
    })
      .filter((x): x is Placed => x !== null)
      .sort((a, b) => a.year - b.year || a.hierarchyOrder - b.hierarchyOrder);
  }, [tr]);

  const grouped = useMemo(() => {
    const map = new Map<number, Placed[]>();
    for (const p of placed) {
      const list = map.get(p.century) ?? [];
      list.push(p);
      map.set(p.century, list);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [placed]);

  return (
    <article className="timeline-view">
      <header className="timeline-view__header">
        <p className="home__subtitle">{t('timeline.subtitle')}</p>
        <h1 className="home__title">{t('timeline.title')}</h1>
        <p className="home__lede">{t('timeline.lede')}</p>
        <CrossFlourish className="home__flourish" />
      </header>

      <section className="kataloghion">
        <ol className="kataloghion__list">
          {grouped.map(([century, houses]) => (
            <li key={century} className="kataloghion__row">
              <div className="kataloghion__century">
                <span className="kataloghion__century-roman" aria-hidden="true">
                  {romanNumeral(century)}
                </span>
                <span className="kataloghion__century-label">
                  {t('timeline.centuryLabel', { n: century })}
                </span>
              </div>
              <ul className="kataloghion__houses">
                {houses.map((h) => (
                  <li key={h.slug}>
                    <button
                      type="button"
                      className="kataloghion__house"
                      onClick={() =>
                        onNavigate({ kind: 'monastery', slug: h.slug })
                      }
                      aria-label={t('timeline.pinAria', {
                        name: h.name,
                        year: h.year,
                      })}
                    >
                      <HaloMedallion
                        number={h.hierarchyOrder}
                        className="kataloghion__medallion"
                      />
                      <span className="kataloghion__house-body">
                        <span className="kataloghion__house-name">{h.name}</span>
                        <span className="kataloghion__house-greek">{h.greek}</span>
                        <span className="kataloghion__house-year">{h.founded}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="kataloghion__hint">
          {lang === 'ro'
            ? 'Atinge un medalion pentru a vedea mănăstirea.'
            : 'Tap a medallion to open the monastery.'}
        </p>
      </section>
    </article>
  );
}

const ROMAN_PAIRS: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

function romanNumeral(n: number): string {
  let value = n;
  let out = '';
  for (const [num, sym] of ROMAN_PAIRS) {
    while (value >= num) {
      out += sym;
      value -= num;
    }
  }
  return out;
}
