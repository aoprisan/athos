import { findSettlement } from '../data/settlements';
import { findMonastery } from '../data/monasteries';
import { MapView } from './MapView';
import type { View } from '../types';
import { CrossFlourish, DropCap } from './Ornaments';

interface Props {
  slug: string;
  onNavigate: (view: View) => void;
}

export function SettlementDetail({ slug, onNavigate }: Props) {
  const s = findSettlement(slug);
  if (!s) {
    return (
      <div className="detail">
        <div className="parchment">
          <p>Settlement not found.</p>
          <button type="button" onClick={() => onNavigate({ kind: 'home' })}>
            Back to map
          </button>
        </div>
      </div>
    );
  }

  const parent = s.dependsOn ? findMonastery(s.dependsOn) : undefined;
  const introFirst = s.intro.charAt(0);
  const introRest = s.intro.slice(1);
  const kindLabel = s.kind === 'skete' ? 'Skete' : 'Hermit settlement';

  return (
    <article className="detail">
      <button
        type="button"
        className="detail__back"
        onClick={() => onNavigate({ kind: 'home' })}
      >
        ☩ All monasteries
      </button>
      <div className="parchment">
        <header className="detail__header">
          <div className="detail__order-row">
            <span className="detail__kind-badge">{kindLabel}</span>
            <div className="detail__order-tradition">
              {s.tradition ? `${s.tradition} tradition` : 'Athonite hesychast tradition'}
            </div>
          </div>
          <h1 className="detail__name">{s.name}</h1>
          <div className="detail__greek">{s.nameGreek}</div>
          <CrossFlourish className="section-divider" />
          <div className="detail__meta">
            <span>
              <span className="detail__meta-label">Founded</span>
              {s.founded}
            </span>
            {s.patronalFeast && (
              <span>
                <span className="detail__meta-label">Feast</span>
                {s.patronalFeast}
              </span>
            )}
            {parent && (
              <span>
                <span className="detail__meta-label">Dependency of</span>
                <button
                  type="button"
                  className="detail__parent-link"
                  onClick={() =>
                    onNavigate({ kind: 'monastery', slug: parent.slug })
                  }
                >
                  {parent.name}
                </button>
              </span>
            )}
          </div>
        </header>

        <p className="detail__intro">
          <DropCap>{introFirst}</DropCap>
          {introRest}
        </p>

        {s.notes && s.notes.length > 0 && (
          <section className="detail__notes">
            {s.notes.map((n, i) => (
              <p key={i}>{n}</p>
            ))}
          </section>
        )}

        <CrossFlourish className="section-divider" />

        <section className="detail__location">
          <h2>Location</h2>
          <MapView onNavigate={onNavigate} selectedSlug={s.slug} />
          <p className="detail__coords">
            {s.lat.toFixed(4)}° N · {s.lng.toFixed(4)}° E
          </p>
        </section>

        {s.links.length > 0 && (
          <section className="detail__links">
            <h2>Links</h2>
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
