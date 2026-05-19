import { FERRIES, FERRY_LINKS } from '../data/transport';
import type { View } from '../types';
import { CrossFlourish } from './Ornaments';
import { useI18n } from '../i18n';
import { FERRIES_RO, FERRY_LINKS_RO } from '../i18n/data-ro';

interface Props {
  onNavigate: (view: View) => void;
}

export function FerrySchedule({ onNavigate }: Props) {
  const { t, tr } = useI18n();
  return (
    <article className="page">
      <div className="parchment">
        <header className="page__header">
          <p className="page__eyebrow">{t('ferry.eyebrow')}</p>
          <h1>{t('ferry.title')}</h1>
          <CrossFlourish className="section-divider" />
          <p className="page__lede">{t('ferry.lede')}</p>
        </header>

        <section>
          <h2>{t('ferry.routesH2')}</h2>
          <ul className="ferry-list">
            {FERRIES.map((f) => {
              const ro = FERRIES_RO[f.id];
              return (
                <li key={f.id}>
                  <h3>
                    {tr(f.from, ro?.from)} → {tr(f.to, ro?.to)}
                  </h3>
                  <div className="ferry-list__meta">
                    {f.vessel && (
                      <span>
                        {t('ferry.vessel')}: {tr(f.vessel, ro?.vessel)}
                      </span>
                    )}
                    {f.operator && (
                      <span>
                        {t('ferry.operator')}: {tr(f.operator, ro?.operator)}
                      </span>
                    )}
                    <span>{t('ferry.duration', { min: f.durationMin })}</span>
                  </div>
                  <div className="ferry-list__departures">
                    <strong>{t('ferry.departures')}</strong>{' '}
                    {f.departures.join(' · ')}
                  </div>
                  {f.notes && (
                    <p className="ferry-list__notes">{tr(f.notes, ro?.notes)}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <CrossFlourish className="section-divider" />

        <section>
          <h2>{t('ferry.officialLinks')}</h2>
          <ul className="notes">
            {FERRY_LINKS.map((l) => {
              const ro = FERRY_LINKS_RO[l.url];
              return (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noreferrer noopener">
                    {tr(l.label, ro?.label)}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="page__actions">
          <button type="button" onClick={() => onNavigate({ kind: 'getting-there' })}>
            {t('ferry.backToGetting')}
          </button>
        </div>
      </div>
    </article>
  );
}
