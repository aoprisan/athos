/* Trip serialisation for sharing — keep dependencies in the standard library.

   Share URL format:  #/trip-import?d=<base64url(JSON)>
   iCal export:       one VEVENT per day with the planned places in the body. */

import type { Trip, TripPlace } from '../types';
import { MONASTERIES, findMonastery } from '../data/monasteries';
import { SETTLEMENTS, findSettlement } from '../data/settlements';

function utf8ToBase64Url(input: string): string {
  if (typeof window === 'undefined') return '';
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return window
    .btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlToUtf8(input: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const padding = '='.repeat((4 - (input.length % 4)) % 4);
    const b64 = input.replace(/-/g, '+').replace(/_/g, '/') + padding;
    const binary = window.atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

/** Strip a trip down to the fields a recipient needs: name, dates, days,
 *  places. We drop the source slug and `updatedAt` — the importer mints a
 *  fresh slug and timestamp. */
export interface ShareableTrip {
  name: string;
  startDate: string;
  endDate: string;
  days: Array<{ date: string; places: TripPlace[] }>;
}

export function encodeTripForShare(trip: Trip): string {
  const shareable: ShareableTrip = {
    name: trip.name,
    startDate: trip.startDate,
    endDate: trip.endDate,
    days: trip.days.map((d) => ({ date: d.date, places: d.places })),
  };
  return utf8ToBase64Url(JSON.stringify(shareable));
}

export function decodeSharedTrip(blob: string): ShareableTrip | null {
  const text = base64UrlToUtf8(blob);
  if (!text) return null;
  try {
    const parsed = JSON.parse(text);
    if (
      !parsed ||
      typeof parsed.name !== 'string' ||
      typeof parsed.startDate !== 'string' ||
      typeof parsed.endDate !== 'string' ||
      !Array.isArray(parsed.days)
    ) {
      return null;
    }
    return parsed as ShareableTrip;
  } catch {
    return null;
  }
}

export function buildShareUrl(trip: Trip, baseHref: string): string {
  const blob = encodeTripForShare(trip);
  // Place after the `#/` so existing hash-routing picks it up cleanly.
  return `${baseHref}#/trip-import?d=${blob}`;
}

/* ─── iCal ───────────────────────────────────────────────────────────── */

function escapeIcal(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\r?\n/g, '\\n');
}

function isoToIcalDate(iso: string): string {
  return iso.replace(/-/g, '');
}

function placeLabel(p: TripPlace): string {
  if (p.kind === 'monastery') {
    return findMonastery(p.slug)?.name ?? p.slug;
  }
  return findSettlement(p.slug)?.name ?? p.slug;
}

export function tripToIcal(trip: Trip, tripUrl?: string): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Athos Pilgrim//Trip Export//EN',
    'CALSCALE:GREGORIAN',
  ];
  const stamp = isoToIcalDate(trip.updatedAt.slice(0, 10)) +
    'T' +
    trip.updatedAt.slice(11, 19).replace(/:/g, '') +
    'Z';
  for (let i = 0; i < trip.days.length; i++) {
    const day = trip.days[i];
    const summary = `${trip.name} · ${day.places.length > 0 ? day.places.map(placeLabel).join(', ') : 'free day'}`;
    const description = day.places
      .map((p, idx) => `${idx + 1}. ${placeLabel(p)}`)
      .join('\\n');
    const nextDate = new Date(day.date + 'T00:00:00Z');
    nextDate.setUTCDate(nextDate.getUTCDate() + 1);
    const dtend = nextDate.toISOString().slice(0, 10);
    lines.push(
      'BEGIN:VEVENT',
      `UID:athos-${trip.slug}-${day.date}@athos.local`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${isoToIcalDate(day.date)}`,
      `DTEND;VALUE=DATE:${isoToIcalDate(dtend)}`,
      `SUMMARY:${escapeIcal(summary)}`,
    );
    if (description) lines.push(`DESCRIPTION:${escapeIcal(description)}`);
    if (tripUrl) lines.push(`URL:${escapeIcal(tripUrl)}`);
    lines.push('END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export function downloadText(filename: string, contents: string, mime: string): void {
  if (typeof window === 'undefined') return;
  const blob = new Blob([contents], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

/* Sanity-check that the importer can resolve every place slug.
   Unknown slugs aren't fatal — we just drop them and let the user re-add. */
export function sanitiseSharedPlaces(places: TripPlace[]): TripPlace[] {
  const monasteries = new Set(MONASTERIES.map((m) => m.slug));
  const settlements = new Set(SETTLEMENTS.map((s) => s.slug));
  return places.filter((p) =>
    p.kind === 'monastery' ? monasteries.has(p.slug) : settlements.has(p.slug),
  );
}
