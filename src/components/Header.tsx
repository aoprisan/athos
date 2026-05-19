import type { View } from '../types';
import { ByzantineCross } from './Ornaments';
import { LanguageToggle, useI18n } from '../i18n';

interface Props {
  view: View;
  onNavigate: (view: View) => void;
}

export function Header({ view, onNavigate }: Props) {
  const { t } = useI18n();
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
          {t('home.title')}
          <span className="header__title-greek">{t('app.brandGreekTagline')}</span>
        </span>
      </button>
      <nav className="header__nav">
        <button
          type="button"
          className={isActive('home') ? 'nav__item is-active' : 'nav__item'}
          onClick={() => onNavigate({ kind: 'home' })}
        >
          {t('nav.monasteries')}
        </button>
        <button
          type="button"
          className={tripsActive ? 'nav__item is-active' : 'nav__item'}
          onClick={() => onNavigate({ kind: 'trips' })}
        >
          {t('nav.trips')}
        </button>
        <button
          type="button"
          className={isActive('getting-there') ? 'nav__item is-active' : 'nav__item'}
          onClick={() => onNavigate({ kind: 'getting-there' })}
        >
          {t('nav.gettingThere')}
        </button>
        <button
          type="button"
          className={isActive('ferries') ? 'nav__item is-active' : 'nav__item'}
          onClick={() => onNavigate({ kind: 'ferries' })}
        >
          {t('nav.ferries')}
        </button>
      </nav>
      <LanguageToggle />
    </header>
  );
}
