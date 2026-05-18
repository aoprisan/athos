import { findMonastery } from '../data/monasteries';
import { MapView } from './MapView';
import type { View } from '../types';
import { CrossFlourish, DropCap, HaloMedallion } from './Ornaments';

interface Props {
  slug: string;
  onNavigate: (view: View) => void;
}

export function MonasteryDetail({ slug, onNavigate }: Props) {
  const m = findMonastery(slug);
  if (!m) {
    return (
      <div className="detail">
        <div className="parchment">
          <p>Monastery not found.</p>
          <button type="button" onClick={() => onNavigate({ kind: 'home' })}>
            Back to map
          </button>
        </div>
      </div>
    );
  }

  const introFirst = m.intro.charAt(0);
  const introRest = m.intro.slice(1);

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
            <HaloMedallion number={m.hierarchyOrder} className="halo-medallion" active />
            <div className="detail__order-tradition">{m.tradition} tradition</div>
          </div>
          <h1 className="detail__name">{m.name}</h1>
          <div className="detail__greek">{m.nameGreek}</div>
          <CrossFlourish className="section-divider" />
          <div className="detail__meta">
            <span>
              <span className="detail__meta-label">Founded</span>
              {m.founded}
            </span>
            <span>
              <span className="detail__meta-label">Feast</span>
              {m.patronalFeast}
            </span>
          </div>
        </header>

        <p className="detail__intro">
          <DropCap>{introFirst}</DropCap>
          {introRest}
        </p>

        {m.notes && m.notes.length > 0 && (
          <section className="detail__notes">
            {m.notes.map((n, i) => (
              <p key={i}>{n}</p>
            ))}
          </section>
        )}

        <CrossFlourish className="section-divider" />

        <section className="detail__location">
          <h2>Location</h2>
          <MapView onNavigate={onNavigate} selectedSlug={m.slug} />
          <p className="detail__coords">
            {m.lat.toFixed(4)}° N · {m.lng.toFixed(4)}° E
          </p>
        </section>

        {m.links.length > 0 && (
          <section className="detail__links">
            <h2>Links</h2>
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
