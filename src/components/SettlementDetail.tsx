import { findSettlement } from '../data/settlements';
import { findMonastery } from '../data/monasteries';
import { MapView } from './MapView';
import type { View } from '../types';
import { CrossFlourish, DropCap } from './Ornaments';
import { useI18n } from '../i18n';
import { MONASTERIES_RO, SETTLEMENTS_RO } from '../i18n/data-ro';
import { regionLabel, traditionLabel } from '../i18n/strings';
import { openInMaps } from '../lib/maps';

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
  const icons = tr(s.icons, ro?.icons);
  const legends = tr(s.legends, ro?.legends);
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
            {parent && (
              <span>
                <span className="detail__meta-label">{t('detail.region')}</span>
                {regionLabel(parent.region, lang)}
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

        {icons && icons.length > 0 && (
          <section className="detail__icons">
            <h2>{t('detail.iconsTitle')}</h2>
            <ul className="detail__icon-list">
              {icons.map((ic, i) => (
                <li
                  key={i}
                  className={`detail__icon ${ic.imageUrl ? 'has-image' : ''}`}
                >
                  {ic.imageUrl && (
                    <figure className="detail__icon-figure">
                      <img
                        className="detail__icon-image"
                        src={ic.imageUrl}
                        alt={ic.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {ic.imageCredit && (
                        <figcaption className="detail__icon-credit">
                          {ic.imageCredit}
                        </figcaption>
                      )}
                    </figure>
                  )}
                  <div className="detail__icon-body">
                    <div className="detail__icon-head">
                      <span className="detail__icon-name">{ic.name}</span>
                      {ic.nameGreek && (
                        <span className="detail__icon-greek">{ic.nameGreek}</span>
                      )}
                    </div>
                    <p className="detail__icon-desc">{ic.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {legends && legends.length > 0 && (
          <section className="detail__legends">
            <h2>{t('detail.legendsTitle')}</h2>
            <ul className="detail__legend-list">
              {legends.map((lg, i) => (
                <li key={i} className="detail__legend">
                  <h3 className="detail__legend-title">{lg.title}</h3>
                  <p className="detail__legend-desc">
                    <DropCap>{lg.description.charAt(0)}</DropCap>
                    {lg.description.slice(1)}
                  </p>
                </li>
              ))}
            </ul>
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
          <div className="detail__open-maps-row">
            <button
              type="button"
              className="detail__open-maps"
              onClick={() => openInMaps(s.lat, s.lng, name)}
            >
              <span className="detail__open-maps-mark" aria-hidden="true">⌖</span>
              {t('detail.openInMaps')}
            </button>
          </div>
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
