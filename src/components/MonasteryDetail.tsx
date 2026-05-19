import { findMonastery } from '../data/monasteries';
import { MapView } from './MapView';
import type { View } from '../types';
import { CrossFlourish, DropCap, HaloMedallion } from './Ornaments';
import { useI18n } from '../i18n';
import { MONASTERIES_RO } from '../i18n/data-ro';
import { traditionLabel } from '../i18n/strings';
import { openInMaps } from '../lib/maps';

interface Props {
  slug: string;
  onNavigate: (view: View) => void;
}

export function MonasteryDetail({ slug, onNavigate }: Props) {
  const { t, tr, lang } = useI18n();
  const m = findMonastery(slug);
  if (!m) {
    return (
      <div className="detail">
        <div className="parchment">
          <p>{t('detail.notFoundMonastery')}</p>
          <button type="button" onClick={() => onNavigate({ kind: 'home' })}>
            {t('detail.backToMap')}
          </button>
        </div>
      </div>
    );
  }

  const ro = MONASTERIES_RO[m.slug];
  const name = tr(m.name, ro?.name);
  const founded = tr(m.founded, ro?.founded);
  const patronalFeast = tr(m.patronalFeast, ro?.patronalFeast);
  const intro = tr(m.intro, ro?.intro);
  const notes = tr(m.notes, ro?.notes);
  const introFirst = intro.charAt(0);
  const introRest = intro.slice(1);

  return (
    <article className="detail">
      <button
        type="button"
        className="detail__back"
        onClick={() => onNavigate({ kind: 'home' })}
      >
        {t('detail.allMonasteries')}
      </button>
      <div className="parchment">
        <header className="detail__header">
          <div className="detail__order-row">
            <HaloMedallion number={m.hierarchyOrder} className="halo-medallion" active />
            <div className="detail__order-tradition">
              {t('tradition.suffix', { trad: traditionLabel(m.tradition, lang) })}
            </div>
          </div>
          <h1 className="detail__name">{name}</h1>
          <div className="detail__greek">{m.nameGreek}</div>
          <CrossFlourish className="section-divider" />
          <div className="detail__meta">
            <span>
              <span className="detail__meta-label">{t('detail.founded')}</span>
              {founded}
            </span>
            <span>
              <span className="detail__meta-label">{t('detail.feast')}</span>
              {patronalFeast}
            </span>
          </div>
        </header>

        <p className="detail__intro">
          <DropCap>{introFirst}</DropCap>
          {introRest}
        </p>

        {notes && notes.length > 0 && (
          <section className="detail__notes">
            {notes.map((n, i) => (
              <p key={i}>{n}</p>
            ))}
          </section>
        )}

        <CrossFlourish className="section-divider" />

        <section className="detail__location">
          <h2>{t('detail.location')}</h2>
          <MapView onNavigate={onNavigate} selectedSlug={m.slug} />
          <p className="detail__coords">
            {t('detail.coords', {
              lat: m.lat.toFixed(4),
              lng: m.lng.toFixed(4),
            })}
          </p>
          <div className="detail__open-maps-row">
            <button
              type="button"
              className="detail__open-maps"
              onClick={() => openInMaps(m.lat, m.lng, name)}
            >
              <span className="detail__open-maps-mark" aria-hidden="true">⌖</span>
              {t('detail.openInMaps')}
            </button>
          </div>
        </section>

        {m.links.length > 0 && (
          <section className="detail__links">
            <h2>{t('detail.links')}</h2>
            <ul>
              {m.links.map((l) => (
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
