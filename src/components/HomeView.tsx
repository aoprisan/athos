import { MapView } from './MapView';
import { MONASTERIES } from '../data/monasteries';
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
        </section>
      </div>
    </div>
  );
}
