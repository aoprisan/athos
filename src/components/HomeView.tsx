import { MapView } from './MapView';
import { MONASTERIES } from '../data/monasteries';
import { SETTLEMENTS } from '../data/settlements';
import type { View } from '../types';
import { CrossFlourish, HaloMedallion } from './Ornaments';

interface Props {
  onNavigate: (view: View) => void;
}

export function HomeView({ onNavigate }: Props) {
  return (
    <div>
      <section className="home__intro">
        <p className="home__subtitle">Ἁγιον Ὄρος · the Holy Mountain</p>
        <h1 className="home__title">Athos Pilgrim</h1>
        <p className="home__lede">
          A practical guide to the twenty ruling monasteries of Mount Athos,
          the <em>Diamonitirion</em> entry permit, and the ferries that carry
          pilgrims to the easternmost finger of the Halkidiki peninsula.
        </p>
        <CrossFlourish className="home__flourish" />
      </section>

      <div className="home">
        <section className="home__map">
          <MapView onNavigate={onNavigate} />
        </section>

        <section className="home__list">
          <h2 className="home__list-title">The Twenty Ruling Monasteries</h2>
          <p className="home__list-subtitle">in canonical hierarchical order</p>
          <ol className="monastery-list">
            {MONASTERIES.map((m) => (
              <li key={m.slug}>
                <button
                  type="button"
                  className="monastery-list__item"
                  onClick={() => onNavigate({ kind: 'monastery', slug: m.slug })}
                >
                  <HaloMedallion number={m.hierarchyOrder} className="halo-medallion" />
                  <span className="monastery-list__name">
                    <strong>{m.name}</strong>
                    <span className="monastery-list__greek">{m.nameGreek}</span>
                  </span>
                  <span className="monastery-list__tradition">{m.tradition}</span>
                </button>
              </li>
            ))}
          </ol>

          <h2 className="home__list-title home__list-title--secondary">
            Sketes &amp; hermit settlements
          </h2>
          <p className="home__list-subtitle">
            dependencies of the ruling monasteries
          </p>
          <ul className="monastery-list settlement-list">
            {SETTLEMENTS.map((s) => (
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
                    <strong>{s.name}</strong>
                    <span className="monastery-list__greek">{s.nameGreek}</span>
                  </span>
                  <span className="monastery-list__tradition">
                    {s.tradition ?? 'hermitage'}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
