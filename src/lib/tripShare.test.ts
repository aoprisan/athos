import { describe, expect, it, beforeAll } from 'vitest';
import {
  decodeSharedTrip,
  encodeTripForShare,
  sanitiseSharedPlaces,
  tripToIcal,
} from './tripShare';
import type { Trip } from '../types';

const SAMPLE_TRIP: Trip = {
  slug: 'spring-26-abc1',
  name: 'Spring Pilgrimage',
  startDate: '2026-04-10',
  endDate: '2026-04-12',
  updatedAt: '2026-04-01T08:30:00.000Z',
  days: [
    {
      date: '2026-04-10',
      places: [{ kind: 'monastery', slug: 'iviron', reservationStatus: 'confirmed' }],
    },
    { date: '2026-04-11', places: [{ kind: 'monastery', slug: 'vatopedi' }] },
    { date: '2026-04-12', places: [] },
  ],
};

beforeAll(() => {
  if (typeof globalThis.btoa !== 'function') {
    globalThis.btoa = (s: string) => Buffer.from(s, 'binary').toString('base64');
    globalThis.atob = (s: string) => Buffer.from(s, 'base64').toString('binary');
  }
  // jsdom-less env: stub `window`-bound helpers used by tripShare.
  (globalThis as { window?: unknown }).window ??= globalThis;
});

describe('encodeTripForShare / decodeSharedTrip', () => {
  it('round-trips the trip name, dates, days and places', () => {
    const blob = encodeTripForShare(SAMPLE_TRIP);
    const back = decodeSharedTrip(blob);
    expect(back?.name).toBe(SAMPLE_TRIP.name);
    expect(back?.startDate).toBe(SAMPLE_TRIP.startDate);
    expect(back?.days).toEqual(SAMPLE_TRIP.days);
  });

  it('returns null for garbled input', () => {
    expect(decodeSharedTrip('not-a-real-blob-***')).toBe(null);
  });
});

describe('tripToIcal', () => {
  it('emits one VEVENT per day with correct DTSTART/DTEND', () => {
    const ical = tripToIcal(SAMPLE_TRIP);
    const events = ical.match(/BEGIN:VEVENT/g) ?? [];
    expect(events.length).toBe(SAMPLE_TRIP.days.length);
    expect(ical).toContain('DTSTART;VALUE=DATE:20260410');
    expect(ical).toContain('DTEND;VALUE=DATE:20260413');
    expect(ical).toContain('SUMMARY:Spring Pilgrimage');
  });
});

describe('sanitiseSharedPlaces', () => {
  it('drops places whose slug is unknown in the local data', () => {
    const out = sanitiseSharedPlaces([
      { kind: 'monastery', slug: 'iviron' },
      { kind: 'monastery', slug: 'made-up-house' },
    ]);
    expect(out.map((p) => p.slug)).toEqual(['iviron']);
  });
});
