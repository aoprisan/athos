import type { View } from '../types';
import { ByzantineCross } from './Ornaments';

interface Props {
  view: View;
  onNavigate: (view: View) => void;
}

export function Header({ view, onNavigate }: Props) {
  const isActive = (kind: View['kind']) => view.kind === kind;
  const tripsActive = view.kind === 'trips' || view.kind === 'trip';
  return (
    <header className="header">
      <button
        type="button"
        className="header__title"
        onClick={() => onNavigate({ kind: 'home' })}
      >
        <ByzantineCross className="header__title-mark" />
        <span>
          Athos Pilgrim
          <span className="header__title-greek">Ἁγιον Ὄρος</span>
        </span>
      </button>
      <nav className="header__nav">
        <button
          type="button"
          className={isActive('home') ? 'nav__item is-active' : 'nav__item'}
          onClick={() => onNavigate({ kind: 'home' })}
        >
          Monasteries
        </button>
        <button
          type="button"
          className={tripsActive ? 'nav__item is-active' : 'nav__item'}
          onClick={() => onNavigate({ kind: 'trips' })}
        >
          Trips
        </button>
        <button
          type="button"
          className={isActive('getting-there') ? 'nav__item is-active' : 'nav__item'}
          onClick={() => onNavigate({ kind: 'getting-there' })}
        >
          Getting there
        </button>
        <button
          type="button"
          className={isActive('ferries') ? 'nav__item is-active' : 'nav__item'}
          onClick={() => onNavigate({ kind: 'ferries' })}
        >
          Ferries
        </button>
      </nav>
      <div aria-hidden="true" />
    </header>
  );
}
