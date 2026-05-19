import type { Trip, TripDay, TripPlace } from '../types';

const STORAGE_KEY = 'athos:trips';

export function loadTrips(): Trip[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidTrip);
  } catch {
    return [];
  }
}

export function saveTrips(trips: Trip[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  } catch {
    /* ignore quota or privacy-mode failures */
  }
}

function isValidTrip(value: unknown): value is Trip {
  if (!value || typeof value !== 'object') return false;
  const t = value as Record<string, unknown>;
  return (
    typeof t.slug === 'string' &&
    typeof t.name === 'string' &&
    typeof t.startDate === 'string' &&
    typeof t.endDate === 'string' &&
    Array.isArray(t.days) &&
    typeof t.updatedAt === 'string'
  );
}

/** Returns ISO YYYY-MM-DD strings for every date in [start, end] inclusive. */
export function eachDateInRange(start: string, end: string): string[] {
  const s = parseISODate(start);
  const e = parseISODate(end);
  if (!s || !e || e.getTime() < s.getTime()) return [];
  const out: string[] = [];
  const cursor = new Date(s.getTime());
  while (cursor.getTime() <= e.getTime()) {
    out.push(toISODate(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

/** Builds the day list for a date range, preserving existing places for any
 *  date that already had an entry. */
export function regenerateDays(
  existing: TripDay[],
  start: string,
  end: string,
): TripDay[] {
  const byDate = new Map(existing.map((d) => [d.date, d.places]));
  return eachDateInRange(start, end).map((date) => ({
    date,
    places: byDate.get(date) ?? [],
  }));
}

export function makeTripSlug(name: string): string {
  const base = name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const safe = base.length > 0 ? base : 'trip';
  return `${safe}-${randomSuffix()}`;
}

export function findTrip(trips: Trip[], slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}

export function upsertTrip(trips: Trip[], trip: Trip): Trip[] {
  const idx = trips.findIndex((t) => t.slug === trip.slug);
  if (idx === -1) return [trip, ...trips];
  const next = trips.slice();
  next[idx] = trip;
  return next;
}

export function removeTrip(trips: Trip[], slug: string): Trip[] {
  return trips.filter((t) => t.slug !== slug);
}

export function touch(trip: Trip): Trip {
  return { ...trip, updatedAt: new Date().toISOString() };
}

export function addPlace(day: TripDay, place: TripPlace): TripDay {
  const exists = day.places.some(
    (p) => p.kind === place.kind && p.slug === place.slug,
  );
  if (exists) return day;
  return { ...day, places: [...day.places, place] };
}

export function removePlace(day: TripDay, index: number): TripDay {
  if (index < 0 || index >= day.places.length) return day;
  const next = day.places.slice();
  next.splice(index, 1);
  return { ...day, places: next };
}

export function movePlace(
  day: TripDay,
  index: number,
  direction: -1 | 1,
): TripDay {
  const target = index + direction;
  if (index < 0 || index >= day.places.length) return day;
  if (target < 0 || target >= day.places.length) return day;
  const next = day.places.slice();
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return { ...day, places: next };
}

function parseISODate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split('-').map((n) => Number(n));
  const date = new Date(Date.UTC(y, m - 1, d));
  if (Number.isNaN(date.getTime())) return null;
  if (
    date.getUTCFullYear() !== y ||
    date.getUTCMonth() !== m - 1 ||
    date.getUTCDate() !== d
  ) {
    return null;
  }
  return date;
}

function toISODate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 6).padEnd(4, '0');
}

function localeTag(lang: string): string {
  return lang === 'ro' ? 'ro-RO' : 'en-GB';
}

/** Formats an ISO date as a long-form label like "Wed, 10 Jun 2026". */
export function formatTripDate(iso: string, lang: string = 'en'): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  return d.toLocaleDateString(localeTag(lang), {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Formats an ISO date range as "10 Jun – 13 Jun 2026". */
export function formatTripRange(
  start: string,
  end: string,
  lang: string = 'en',
): string {
  const s = parseISODate(start);
  const e = parseISODate(end);
  if (!s || !e) return `${start} – ${end}`;
  const sameYear = s.getUTCFullYear() === e.getUTCFullYear();
  const tag = localeTag(lang);
  const startLabel = s.toLocaleDateString(tag, {
    day: '2-digit',
    month: 'short',
    year: sameYear ? undefined : 'numeric',
    timeZone: 'UTC',
  });
  const endLabel = e.toLocaleDateString(tag, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return `${startLabel} – ${endLabel}`;
}
