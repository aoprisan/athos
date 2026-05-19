import { useEffect, useMemo, useState } from 'react';
import {
  DIAMONITIRION,
  DIAMONITIRION_CHECKLIST,
  DIAMONITIRION_LEAD_TIME,
  GETTING_THERE_STEPS,
  PORTS,
} from '../data/transport';
import type { View } from '../types';
import { CrossFlourish, KeystoneBadge } from './Ornaments';
import { useI18n } from '../i18n';
import {
  DIAMONITIRION_CHECKLIST_RO,
  DIAMONITIRION_LEAD_TIME_RO,
  DIAMONITIRION_RO,
  GETTING_THERE_STEPS_RO,
  PORTS_RO,
} from '../i18n/data-ro';

interface Props {
  onNavigate: (view: View) => void;
}

const CHECKLIST_STORAGE_KEY = 'athos:diamonitirion-checklist';

function loadChecklistState(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(CHECKLIST_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function GettingThere({ onNavigate }: Props) {
  const { t, tr } = useI18n();
  const [ledePre, ledePost = ''] = t('getting.lede').split('{diamonitirion}');

  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    loadChecklistState(),
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // Ignore — quota / privacy modes can fail silently.
    }
  }, [checked]);

  const checklistTotals = useMemo(() => {
    const total = DIAMONITIRION_CHECKLIST.reduce(
      (sum, section) => sum + section.items.length,
      0,
    );
    const done = DIAMONITIRION_CHECKLIST.reduce(
      (sum, section) =>
        sum + section.items.filter((item) => checked[item.id]).length,
      0,
    );
    return { total, done };
  }, [checked]);

  function toggleItem(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function resetChecklist() {
    if (window.confirm(t('getting.checklistConfirmReset'))) {
      setChecked({});
    }
  }

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

          <h3 className="diamo__subhead">{t('getting.feesTitle')}</h3>
          <ul className="kv kv--compact">
            <li>
              <span>{t('getting.feeOrthodox')}</span>
              <span>{DIAMONITIRION.feeRangeOrthodox}</span>
            </li>
            <li>
              <span>{t('getting.feeNonOrthodox')}</span>
              <span>{DIAMONITIRION.feeRangeNonOrthodox}</span>
            </li>
            <li>
              <span>{t('getting.feeStudent')}</span>
              <span>{DIAMONITIRION.feeRangeStudent}</span>
            </li>
          </ul>
          <p className="diamo__fine-print">{t('getting.feeNote')}</p>

          <h3 className="diamo__subhead">{t('getting.leadTimeTitle')}</h3>
          <ul className="lead-time">
            {DIAMONITIRION_LEAD_TIME.map((row) => {
              const ro = DIAMONITIRION_LEAD_TIME_RO[row.id];
              return (
                <li key={row.id} className={`lead-time__row lead-time--${row.id}`}>
                  <div className="lead-time__season">
                    {tr(row.season, ro?.season)}
                  </div>
                  <div className="lead-time__months">
                    {tr(row.months, ro?.months)}
                  </div>
                  <div className="lead-time__advance">
                    {tr(row.advance, ro?.advance)}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <CrossFlourish className="section-divider" />

        <section>
          <header className="checklist__header">
            <div>
              <h2>{t('getting.checklistTitle')}</h2>
              <p className="checklist__subtitle">
                {t('getting.checklistSubtitle')}{' '}
                <span className="checklist__progress">
                  {t('getting.checklistProgress', {
                    done: checklistTotals.done,
                    total: checklistTotals.total,
                  })}
                </span>
              </p>
            </div>
            <button
              type="button"
              className="checklist__reset"
              onClick={resetChecklist}
              disabled={checklistTotals.done === 0}
            >
              {t('getting.checklistReset')}
            </button>
          </header>
          <div
            className="checklist__progress-bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={checklistTotals.total}
            aria-valuenow={checklistTotals.done}
          >
            <span
              style={{
                width: `${
                  checklistTotals.total === 0
                    ? 0
                    : Math.round(
                        (checklistTotals.done / checklistTotals.total) * 100,
                      )
                }%`,
              }}
            />
          </div>
          {DIAMONITIRION_CHECKLIST.map((section) => (
            <div key={section.id} className="checklist__section">
              <h3 className="diamo__subhead">
                {t(`getting.checklistSection.${section.id}`)}
              </h3>
              <ul className="checklist">
                {section.items.map((item) => {
                  const ro = DIAMONITIRION_CHECKLIST_RO[item.id];
                  const isChecked = !!checked[item.id];
                  return (
                    <li
                      key={item.id}
                      className={`checklist__item${
                        isChecked ? ' checklist__item--done' : ''
                      }`}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(item.id)}
                        />
                        <span>{tr(item.label, ro?.label)}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
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
