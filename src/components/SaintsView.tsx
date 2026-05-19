import { SAINTS } from '../data/saints';
import type { View } from '../types';
import { useI18n } from '../i18n';
import { CrossFlourish, SaintNimbus } from './Ornaments';

interface Props {
  onNavigate: (view: View) => void;
}

export function SaintsView({ onNavigate }: Props) {
  const { t } = useI18n();
  return (
    <div className="saints">
      <header className="saints__header">
        <p className="home__subtitle">{t('saints.subtitle')}</p>
        <h1 className="home__title">{t('saints.title')}</h1>
        <p className="home__lede">{t('saints.lede')}</p>
        <CrossFlourish className="home__flourish" />
      </header>
      <ul className="saints__list">
        {SAINTS.map((s) => (
          <li key={s.slug}>
            <button
              type="button"
              className="saints__item"
              onClick={() => onNavigate({ kind: 'saint', slug: s.slug })}
            >
              <SaintNimbus className="saints__item-nimbus" />
              <span className="saints__item-body">
                <span className="saints__item-name">{s.name}</span>
                {s.nameGreek && (
                  <span className="saints__item-greek">{s.nameGreek}</span>
                )}
                <span className="saints__item-years">{s.years}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
