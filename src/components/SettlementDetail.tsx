import { findSettlement } from '../data/settlements';
import { findMonastery } from '../data/monasteries';
import { MapView } from './MapView';
import type { View } from '../types';
import { CrossFlourish, DropCap } from './Ornaments';
import { useI18n } from '../i18n';
import { MONASTERIES_RO, SETTLEMENTS_RO } from '../i18n/data-ro';
import { traditionLabel } from '../i18n/strings';

interface Props {
  slug: string;
  onNavigate: (view: View) => void;
}

export function SettlementDetail({ slug, onNavigate }: Props) {
  const { t, tr, lang } = useI18n();
  const s = findSettlement(slug);
  if (!s) {
    return (
      <div className="detail">
        <div className="parchment">
          <p>{t('detail.notFoundSettlement')}</p>
          <button type="button" onClick={() => onNavigate({ kind: 'home' })}>
            {t('detail.backToMap')}
          </button>
        </div>
      </div>
    );
  }

  const ro = SETTLEMENTS_RO[s.slug];
  const parent = s.dependsOn ? findMonastery(s.dependsOn) : undefined;
  const parentRo = parent ? MONASTERIES_RO[parent.slug] : undefined;
  const name = tr(s.name, ro?.name);
  const founded = tr(s.founded, ro?.founded);
  const patronalFeast = tr(s.patronalFeast, ro?.patronalFeast);
  const intro = tr(s.intro, ro?.intro);
  const notes = tr(s.notes, ro?.notes);
  const introFirst = intro.charAt(0);
  const introRest = intro.slice(1);
  const kindLabel =
    s.kind === 'skete' ? t('detail.kindSkete') : t('detail.kindHermitage');
  const traditionText = s.tradition
    ? t('tradition.suffix', { trad: traditionLabel(s.tradition, lang) })
    : t('detail.fallbackTradition');

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
            <span className="detail__kind-badge">{kindLabel}</span>
            <div className="detail__order-tradition">{traditionText}</div>
          </div>
          <h1 className="detail__name">{name}</h1>
          <div className="detail__greek">{s.nameGreek}</div>
          <CrossFlourish className="section-divider" />
          <div className="detail__meta">
            <span>
              <span className="detail__meta-label">{t('detail.founded')}</span>
              {founded}
            </span>
            {patronalFeast && (
              <span>
                <span className="detail__meta-label">{t('detail.feast')}</span>
                {patronalFeast}
              </span>
            )}
            {parent && (
              <span>
                <span className="detail__meta-label">{t('detail.dependencyOf')}</span>
                <button
                  type="button"
                  className="detail__parent-link"
                  onClick={() =>
                    onNavigate({ kind: 'monastery', slug: parent.slug })
                  }
                >
                  {tr(parent.name, parentRo?.name)}
                </button>
              </span>
            )}
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
          <MapView onNavigate={onNavigate} selectedSlug={s.slug} />
          <p className="detail__coords">
            {t('detail.coords', {
              lat: s.lat.toFixed(4),
              lng: s.lng.toFixed(4),
            })}
          </p>
        </section>

        {s.links.length > 0 && (
          <section className="detail__links">
            <h2>{t('detail.links')}</h2>
            <ul>
              {s.links.map((l) => (
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
