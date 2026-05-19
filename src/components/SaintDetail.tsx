import { findSaint } from '../data/saints';
import { findMonastery } from '../data/monasteries';
import type { View } from '../types';
import { useI18n } from '../i18n';
import { MONASTERIES_RO } from '../i18n/data-ro';
import { CrossFlourish, DropCap, SaintNimbus } from './Ornaments';

interface Props {
  slug: string;
  onNavigate: (view: View) => void;
}

export function SaintDetail({ slug, onNavigate }: Props) {
  const { t, tr } = useI18n();
  const saint = findSaint(slug);
  if (!saint) {
    return (
      <div className="detail">
        <div className="parchment">
          <p>{t('saint.notFound')}</p>
          <button type="button" onClick={() => onNavigate({ kind: 'saints' })}>
            {t('saint.allSaints')}
          </button>
        </div>
      </div>
    );
  }

  const monastery = saint.monastery ? findMonastery(saint.monastery) : undefined;
  const monasteryRo = monastery ? MONASTERIES_RO[monastery.slug] : undefined;
  const monasteryName = monastery
    ? tr(monastery.name, monasteryRo?.name)
    : undefined;
  const introFirst = saint.intro.charAt(0);
  const introRest = saint.intro.slice(1);

  return (
    <article className="detail">
      <button
        type="button"
        className="detail__back"
        onClick={() => onNavigate({ kind: 'saints' })}
      >
        {t('saint.allSaints')}
      </button>
      <div className="parchment">
        <header className="detail__header">
          <SaintNimbus className="saint__nimbus" />
          <h1 className="detail__name">{saint.name}</h1>
          {saint.nameGreek && (
            <div className="detail__greek">{saint.nameGreek}</div>
          )}
          <CrossFlourish className="section-divider" />
          <div className="detail__meta">
            <span>
              <span className="detail__meta-label">{t('saint.years')}</span>
              {saint.years}
            </span>
            <span>
              <span className="detail__meta-label">{t('saint.feast')}</span>
              {saint.feast}
            </span>
            {monastery && monasteryName && (
              <span>
                <span className="detail__meta-label">{t('saint.house')}</span>
                <button
                  type="button"
                  className="saint__house-link"
                  onClick={() =>
                    onNavigate({ kind: 'monastery', slug: monastery.slug })
                  }
                >
                  {monasteryName}
                </button>
              </span>
            )}
          </div>
        </header>

        <p className="detail__intro">
          <DropCap>{introFirst}</DropCap>
          {introRest}
        </p>

        {saint.notes && saint.notes.length > 0 && (
          <section className="detail__notes">
            {saint.notes.map((n, i) => (
              <p key={i}>{n}</p>
            ))}
          </section>
        )}

        {saint.links && saint.links.length > 0 && (
          <section className="detail__links">
            <h2>{t('detail.links')}</h2>
            <ul>
              {saint.links.map((l) => (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noreferrer noopener">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
