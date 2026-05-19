import { useI18n } from '../i18n';
import { effectiveServices } from '../lib/horarium';
import type { MonasteryServices } from '../types';

interface Props {
  services?: MonasteryServices;
  /** Whether the source data carried explicit per-house overrides. When false,
      the panel labels itself as the typical Athonite horarium rather than
      claiming exact times for this house. */
  hasOverride: boolean;
}

interface ServiceRow {
  key: keyof Pick<
    MonasteryServices,
    'vespers' | 'orthros' | 'liturgy' | 'trapezaMid' | 'trapezaEve'
  >;
  labelKey: string;
  greek: string;
}

const ROWS: ServiceRow[] = [
  { key: 'orthros', labelKey: 'services.orthros', greek: 'Ὄρθρος' },
  { key: 'liturgy', labelKey: 'services.liturgy', greek: 'Θεία Λειτουργία' },
  { key: 'trapezaMid', labelKey: 'services.trapezaMid', greek: 'Τράπεζα' },
  { key: 'vespers', labelKey: 'services.vespers', greek: 'Ἑσπερινός' },
  { key: 'trapezaEve', labelKey: 'services.trapezaEve', greek: 'Δεῖπνον' },
];

export function Horarium({ services, hasOverride }: Props) {
  const { t } = useI18n();
  const eff = effectiveServices(services);
  const titleKey = hasOverride ? 'detail.horariumTitle' : 'detail.horariumTitleTypical';
  return (
    <section className="horarium" aria-labelledby="horarium-heading">
      <h2 id="horarium-heading">{t(titleKey)}</h2>
      <ol className="horarium__list">
        {ROWS.map((row) => {
          const time = eff[row.key];
          if (!time) return null;
          return (
            <li key={row.key} className="horarium__row">
              <span className="horarium__time">{time}</span>
              <span className="horarium__service">
                <span className="horarium__service-name">{t(row.labelKey)}</span>
                <span className="horarium__service-greek">{row.greek}</span>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="horarium__note">{t('detail.horariumByzantineNote')}</p>
      {eff.notes && eff.notes.length > 0 && (
        <ul className="horarium__overrides">
          {eff.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
