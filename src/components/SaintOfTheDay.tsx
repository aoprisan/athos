import { getFeastsForDate } from '../lib/feasts';
import { useI18n } from '../i18n';
import type { View } from '../types';

interface Props {
  onNavigate: (view: View) => void;
}

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatTodayLabel(lang: string): string {
  return new Date().toLocaleDateString(lang === 'ro' ? 'ro-RO' : 'en-GB', {
    day: '2-digit',
    month: 'short',
  });
}

/** A discreet strip beneath the header that shows the most prominent
 *  commemoration whose civil date falls today. Quiet on most days — surfaces
 *  only when our small saint and monastery feast index actually hits.
 *
 *  Picks the first match by index order (saints precede monasteries by the
 *  order we add to the index). Tapping the strip opens the relevant detail. */
export function SaintOfTheDay({ onNavigate }: Props) {
  const { t, lang } = useI18n();
  const feasts = getFeastsForDate(todayISO());
  if (feasts.length === 0) return null;
  // Prefer a saint over a monastery for the headline — pilgrims read this
  // band like a synaxarion line, where the saint's name is what one wants
  // to know first.
  const headline =
    feasts.find((f) => f.kind === 'saint') ?? feasts[0];

  const onClick = () => {
    if (headline.kind === 'saint') {
      onNavigate({ kind: 'saint', slug: headline.slug });
    } else if (headline.kind === 'monastery') {
      onNavigate({ kind: 'monastery', slug: headline.slug });
    } else {
      onNavigate({ kind: 'settlement', slug: headline.slug });
    }
  };

  return (
    <button type="button" className="today-band" onClick={onClick}>
      <span className="today-band__mark" aria-hidden="true">☩</span>
      <span className="today-band__label">{t('today.label')}</span>
      <span className="today-band__date">{formatTodayLabel(lang)}</span>
      <span className="today-band__sep" aria-hidden="true">·</span>
      <span className="today-band__name">{headline.name}</span>
    </button>
  );
}
