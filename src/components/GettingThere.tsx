import {
  DIAMONITIRION,
  GETTING_THERE_STEPS,
  PORTS,
} from '../data/transport';
import type { View } from '../types';
import { CrossFlourish, KeystoneBadge } from './Ornaments';
import { useI18n } from '../i18n';
import {
  DIAMONITIRION_RO,
  GETTING_THERE_STEPS_RO,
  PORTS_RO,
} from '../i18n/data-ro';

interface Props {
  onNavigate: (view: View) => void;
}

export function GettingThere({ onNavigate }: Props) {
  const { t, tr } = useI18n();
  const [ledePre, ledePost = ''] = t('getting.lede').split('{diamonitirion}');

  return (
    <article className="page">
      <div className="parchment">
        <header className="page__header">
          <p className="page__eyebrow">{t('getting.eyebrow')}</p>
          <h1>{t('getting.title')}</h1>
          <CrossFlourish className="section-divider" />
          <p className="page__lede">
            {ledePre}
            <em>Diamonitirion</em>
            {ledePost}
          </p>
        </header>

        <section>
          <h2>
            {t('getting.diamonitirionH2')}{' '}
            <KeystoneBadge>{t('getting.entryPermit')}</KeystoneBadge>
          </h2>
          <ul className="kv">
            <li>
              <span>{t('getting.bureauName')}</span>
              <span>
                {tr(DIAMONITIRION.bureauName, DIAMONITIRION_RO.bureauName)},{' '}
                {tr(DIAMONITIRION.bureauCity, DIAMONITIRION_RO.bureauCity)}
              </span>
            </li>
            <li>
              <span>{t('getting.address')}</span>
              <span>{tr(DIAMONITIRION.bureauAddress, DIAMONITIRION_RO.bureauAddress)}</span>
            </li>
            <li>
              <span>{t('getting.phone')}</span>
              <span>
                <a href={`tel:${DIAMONITIRION.bureauPhone.replace(/\s+/g, '')}`}>
                  {DIAMONITIRION.bureauPhone}
                </a>
              </span>
            </li>
            <li>
              <span>{t('getting.email')}</span>
              <span>
                <a href={`mailto:${DIAMONITIRION.bureauEmail}`}>
                  {DIAMONITIRION.bureauEmail}
                </a>
              </span>
            </li>
            <li>
              <span>{t('getting.online')}</span>
              <span>
                <a href={DIAMONITIRION.bureauUrl} target="_blank" rel="noreferrer noopener">
                  {DIAMONITIRION.bureauUrl}
                </a>
              </span>
            </li>
            <li>
              <span>{t('getting.dailyQuota')}</span>
              <span>
                {t('getting.quotaValue', {
                  ortho: DIAMONITIRION.dailyQuotaOrthodox,
                  nonOrtho: DIAMONITIRION.dailyQuotaNonOrthodox,
                })}
              </span>
            </li>
            <li>
              <span>{t('getting.standardStay')}</span>
              <span>{t('getting.nights', { n: DIAMONITIRION.standardStayNights })}</span>
            </li>
          </ul>
          <ul className="notes">
            {tr(DIAMONITIRION.notes, DIAMONITIRION_RO.notes).map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </section>

        <CrossFlourish className="section-divider" />

        <section>
          <h2>{t('getting.stepsTitle')}</h2>
          <ol className="steps">
            {GETTING_THERE_STEPS.map((s) => {
              const ro = GETTING_THERE_STEPS_RO[s.step];
              return (
                <li key={s.step}>
                  <h3>{tr(s.title, ro?.title)}</h3>
                  <p>{tr(s.body, ro?.body)}</p>
                </li>
              );
            })}
          </ol>
        </section>

        <CrossFlourish className="section-divider" />

        <section>
          <h2>{t('getting.portsTitle')}</h2>
          <ul className="port-list">
            {PORTS.map((p) => {
              const ro = PORTS_RO[p.id];
              return (
                <li key={p.id}>
                  <h3>{tr(p.name, ro?.name)}</h3>
                  <p className="port-list__role">{tr(p.role, ro?.role)}</p>
                  {p.notes && <p>{tr(p.notes, ro?.notes)}</p>}
                </li>
              );
            })}
          </ul>
          <div className="page__actions">
            <button type="button" onClick={() => onNavigate({ kind: 'ferries' })}>
              {t('getting.seeTimetable')}
            </button>
          </div>
        </section>
      </div>
    </article>
  );
}
