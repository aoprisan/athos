import { MONASTERIES } from '../data/monasteries';
import { SETTLEMENTS } from '../data/settlements';
import { SAINTS } from '../data/saints';
import type { Monastery, Settlement } from '../types';

/* Feast-day matching. Athonite monasteries follow the Julian (Old Style)
   calendar, but the `patronalFeast` field on each monastery already records
   both dates: `(5 / 18 July)` means 5 July Old Style = 18 July New Style. The
   second number is therefore the civil (Gregorian) date a pilgrim arriving on
   that day will encounter the panegyri. We parse that second date out so the
   trip view can highlight days when a house is celebrating. Moveable feasts
   (Pascha-anchored) are not resolved — they would need a paschalion. */

const MONTHS: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

export interface FeastDate {
  /** 1–12. */
  month: number;
  /** 1–31. */
  day: number;
}

/** Parses the civil (Gregorian) date out of a patronalFeast string. Two forms
 *  occur in the data:
 *    1. Same-month, shared name:  `Title (D1 / D2 Month)`  →  D2 Month
 *    2. Cross-month, two names:   `Title (D1 Month1 / D2 Month2)`  →  D2 Month2
 *  Returns null for moveable feasts or any string that doesn't match. */
export function parseFeastDate(patronalFeast: string): FeastDate | null {
  if (/moveable/i.test(patronalFeast)) return null;
  const paren = patronalFeast.match(/\(([^)]+)\)/);
  if (!paren) return null;
  const halves = paren[1].split('/');
  if (halves.length < 2) return null;
  const civil = halves[halves.length - 1].trim();
  const match = civil.match(/(\d+)\s+([A-Za-z]+)/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = MONTHS[match[2].toLowerCase()];
  if (!month || !Number.isFinite(day) || day < 1 || day > 31) return null;
  return { month, day };
}

export interface FeastMatch {
  kind: 'monastery' | 'settlement' | 'saint';
  slug: string;
  /** The full `patronalFeast` / feast string from the source data. */
  feast: string;
  /** Display name from the source data (English). */
  name: string;
  /** Greek name, where one is recorded (saints sometimes have none). */
  nameGreek: string;
}

interface IndexEntry extends FeastMatch {
  month: number;
  day: number;
}

let cachedIndex: IndexEntry[] | null = null;

function buildIndex(): IndexEntry[] {
  const out: IndexEntry[] = [];
  for (const m of MONASTERIES) {
    const date = parseFeastDate(m.patronalFeast);
    if (!date) continue;
    out.push({
      kind: 'monastery',
      slug: m.slug,
      feast: m.patronalFeast,
      name: m.name,
      nameGreek: m.nameGreek,
      month: date.month,
      day: date.day,
    });
  }
  for (const s of SETTLEMENTS) {
    if (!s.patronalFeast) continue;
    const date = parseFeastDate(s.patronalFeast);
    if (!date) continue;
    out.push({
      kind: 'settlement',
      slug: s.slug,
      feast: s.patronalFeast,
      name: s.name,
      nameGreek: s.nameGreek,
      month: date.month,
      day: date.day,
    });
  }
  for (const sa of SAINTS) {
    const date = parseFeastDate(sa.feast);
    if (!date) continue;
    out.push({
      kind: 'saint',
      slug: sa.slug,
      feast: sa.feast,
      name: sa.name,
      nameGreek: sa.nameGreek ?? '',
      month: date.month,
      day: date.day,
    });
  }
  return out;
}

function index(): IndexEntry[] {
  if (cachedIndex === null) {
    cachedIndex = buildIndex();
  }
  return cachedIndex;
}

/** Returns all monasteries and settlements whose civil patronal-feast date
 *  matches the given ISO `YYYY-MM-DD` date. Multiple houses can share a feast
 *  (e.g. two monasteries of the Transfiguration). */
export function getFeastsForDate(isoDate: string): FeastMatch[] {
  const match = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return [];
  const month = Number(match[2]);
  const day = Number(match[3]);
  return index()
    .filter((e) => e.month === month && e.day === day)
    .map(({ month: _m, day: _d, ...rest }) => rest);
}

export type { Monastery, Settlement };
