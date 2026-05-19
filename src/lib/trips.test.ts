import { describe, it, expect } from 'vitest';
import {
  eachDateInRange,
  regenerateDays,
  tripFromTemplate,
  addPlace,
  removePlace,
  movePlace,
} from './trips';
import type { TripDay, TripPlace } from '../types';
import type { SuggestedItinerary } from '../data/suggested-itineraries';

describe('eachDateInRange', () => {
  it('returns the inclusive date range, in chronological order', () => {
    expect(eachDateInRange('2026-06-10', '2026-06-13')).toEqual([
      '2026-06-10',
      '2026-06-11',
      '2026-06-12',
      '2026-06-13',
    ]);
  });

  it('returns a single date when start === end', () => {
    expect(eachDateInRange('2026-06-10', '2026-06-10')).toEqual(['2026-06-10']);
  });

  it('returns [] when end is before start', () => {
    expect(eachDateInRange('2026-06-13', '2026-06-10')).toEqual([]);
  });

  it('crosses month and year boundaries cleanly', () => {
    expect(eachDateInRange('2026-12-30', '2027-01-02')).toEqual([
      '2026-12-30',
      '2026-12-31',
      '2027-01-01',
      '2027-01-02',
    ]);
  });

  it('handles leap-year 29 February correctly', () => {
    expect(eachDateInRange('2028-02-28', '2028-03-01')).toEqual([
      '2028-02-28',
      '2028-02-29',
      '2028-03-01',
    ]);
  });

  it('rejects 29 February in a non-leap year', () => {
    expect(eachDateInRange('2026-02-29', '2026-03-01')).toEqual([]);
  });

  it('rejects malformed ISO inputs', () => {
    expect(eachDateInRange('06/10/2026', '2026-06-13')).toEqual([]);
    expect(eachDateInRange('2026-13-01', '2026-13-02')).toEqual([]);
  });
});

describe('regenerateDays', () => {
  const iviron: TripPlace = { kind: 'monastery', slug: 'iviron' };
  const vatopedi: TripPlace = { kind: 'monastery', slug: 'vatopedi' };

  it('preserves places for dates that survive the range change', () => {
    const existing: TripDay[] = [
      { date: '2026-06-10', places: [iviron] },
      { date: '2026-06-11', places: [vatopedi] },
      { date: '2026-06-12', places: [] },
    ];
    const next = regenerateDays(existing, '2026-06-11', '2026-06-13');
    expect(next).toEqual([
      { date: '2026-06-11', places: [vatopedi] },
      { date: '2026-06-12', places: [] },
      { date: '2026-06-13', places: [] },
    ]);
  });

  it('drops places for dates outside the new range', () => {
    const existing: TripDay[] = [
      { date: '2026-06-10', places: [iviron] },
      { date: '2026-06-11', places: [vatopedi] },
    ];
    const next = regenerateDays(existing, '2026-06-12', '2026-06-13');
    expect(next.map((d) => d.places)).toEqual([[], []]);
  });

  it('returns [] when the new range is invalid', () => {
    expect(regenerateDays([], '2026-06-13', '2026-06-10')).toEqual([]);
  });
});

describe('tripFromTemplate', () => {
  const template: SuggestedItinerary = {
    id: 'test-template',
    name: 'Test',
    description: 'A test itinerary.',
    durationDays: 3,
    days: [
      { places: [{ kind: 'monastery', slug: 'iviron' }] },
      { places: [{ kind: 'monastery', slug: 'vatopedi' }] },
      { places: [] },
    ],
  };

  it('lays each template day on a consecutive date from the start', () => {
    const trip = tripFromTemplate(template, '2026-06-10', 'My Pilgrimage');
    expect(trip.startDate).toBe('2026-06-10');
    expect(trip.endDate).toBe('2026-06-12');
    expect(trip.days.map((d) => d.date)).toEqual([
      '2026-06-10',
      '2026-06-11',
      '2026-06-12',
    ]);
    expect(trip.name).toBe('My Pilgrimage');
  });

  it('crosses a leap-day boundary correctly', () => {
    const trip = tripFromTemplate(template, '2028-02-28', 'Leap test');
    expect(trip.days.map((d) => d.date)).toEqual([
      '2028-02-28',
      '2028-02-29',
      '2028-03-01',
    ]);
  });

  it('copies place lists by value (not by reference)', () => {
    const trip = tripFromTemplate(template, '2026-06-10', 'X');
    trip.days[0].places.push({ kind: 'monastery', slug: 'extra' });
    expect(template.days[0].places.length).toBe(1);
  });

  it('falls back to a single-day trip if the start date is malformed', () => {
    const trip = tripFromTemplate(template, 'not-a-date', 'X');
    expect(trip.days).toEqual([{ date: 'not-a-date', places: [] }]);
  });
});

describe('addPlace / removePlace / movePlace', () => {
  const iviron: TripPlace = { kind: 'monastery', slug: 'iviron' };
  const vatopedi: TripPlace = { kind: 'monastery', slug: 'vatopedi' };
  const lavra: TripPlace = { kind: 'monastery', slug: 'great-lavra' };

  it('addPlace appends a new place', () => {
    expect(addPlace({ date: 'd', places: [iviron] }, vatopedi).places).toEqual([
      iviron,
      vatopedi,
    ]);
  });

  it('addPlace is a no-op when the same place is already present', () => {
    const day = { date: 'd', places: [iviron] };
    expect(addPlace(day, iviron)).toBe(day);
  });

  it('removePlace removes by index', () => {
    expect(
      removePlace({ date: 'd', places: [iviron, vatopedi] }, 0).places,
    ).toEqual([vatopedi]);
  });

  it('removePlace is a no-op for out-of-range index', () => {
    const day = { date: 'd', places: [iviron] };
    expect(removePlace(day, 5)).toBe(day);
  });

  it('movePlace reorders places', () => {
    const day = { date: 'd', places: [iviron, vatopedi, lavra] };
    expect(movePlace(day, 0, 1).places).toEqual([vatopedi, iviron, lavra]);
    expect(movePlace(day, 2, -1).places).toEqual([iviron, lavra, vatopedi]);
  });

  it('movePlace is a no-op at boundaries', () => {
    const day = { date: 'd', places: [iviron, vatopedi] };
    expect(movePlace(day, 0, -1)).toBe(day);
    expect(movePlace(day, 1, 1)).toBe(day);
  });
});
