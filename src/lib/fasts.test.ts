import { describe, it, expect } from 'vitest';
import {
  getFastForDate,
  orthodoxPaschaGregorian,
  type FastKind,
} from './fasts';

/** Helper: assert just the `kind` field, since most cases only care about
    which season a date falls inside. */
function expectKind(iso: string, kind: FastKind) {
  expect(getFastForDate(iso).kind).toBe(kind);
}

describe('orthodoxPaschaGregorian', () => {
  // Reference dates from the Orthodox Paschalion table.
  const reference: Record<number, string> = {
    2024: '2024-05-05',
    2025: '2025-04-20',
    2026: '2026-04-12',
    2027: '2027-05-02',
    2028: '2028-04-16',
    2029: '2029-04-08',
    2030: '2030-04-28',
  };

  for (const [yr, expected] of Object.entries(reference)) {
    it(`matches the published Pascha for ${yr}`, () => {
      const d = orthodoxPaschaGregorian(Number(yr));
      const got = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
      expect(got).toBe(expected);
    });
  }
});

describe('getFastForDate — Great Lent', () => {
  // 2026 Pascha = 12 April NS. Clean Monday = 23 February, Lazarus Saturday
  // = 4 April. Palm Sunday = 5 April, Holy Saturday = 11 April.
  it('Clean Monday begins Great Lent', () => {
    const fast = getFastForDate('2026-02-23');
    expect(fast.kind).toBe('great-lent');
    expect(fast.dayOfFast).toBe(1);
  });

  it('Lazarus Saturday is the last day of Great Lent', () => {
    expect(getFastForDate('2026-04-04').kind).toBe('great-lent');
  });

  it('Palm Sunday begins Holy Week (and allows fish)', () => {
    const fast = getFastForDate('2026-04-05');
    expect(fast.kind).toBe('holy-week');
    expect(fast.dayOfFast).toBe(1);
    expect(fast.fishAllowed).toBe(true);
  });

  it('Holy Saturday is the last day of Holy Week', () => {
    expect(getFastForDate('2026-04-11').kind).toBe('holy-week');
  });

  it('Pascha itself is the first day of Bright Week (fast-free)', () => {
    const fast = getFastForDate('2026-04-12');
    expect(fast.kind).toBe('bright-week');
    expect(fast.dayOfFast).toBe(1);
  });

  it('Annunciation (NS 7 April) relaxes the rule when it falls in Holy Week', () => {
    // 2026: Annunciation NS = 7 April; Pascha NS = 12 April; so 7 April is
    // within Holy Week (Palm Sunday 5 → Holy Saturday 11).
    const fast = getFastForDate('2026-04-07');
    expect(fast.kind).toBe('holy-week');
    expect(fast.fishAllowed).toBe(true);
  });

  it('Annunciation relaxes the rule when it falls in Great Lent proper', () => {
    // 2025: Pascha NS = 20 April; Great Lent runs 3 March → 12 April; so 7
    // April is inside Great Lent (after Lazarus Saturday on 12 April).
    // Actually Lazarus Saturday 2025 = Pascha - 8 = 12 April. So 7 April is
    // day 36 of Great Lent.
    const fast = getFastForDate('2025-04-07');
    expect(fast.kind).toBe('great-lent');
    expect(fast.fishAllowed).toBe(true);
  });
});

describe("getFastForDate — Apostles', Dormition, Nativity", () => {
  it("Apostles' Fast covers the days between All Saints week and 28 June", () => {
    // 2026: Pascha 12 April → Pentecost 31 May → All Saints Sunday 7 June →
    // Apostles' Monday 8 June. Fast runs 8 June → 28 June.
    expect(getFastForDate('2026-06-08').kind).toBe('apostles');
    expect(getFastForDate('2026-06-28').kind).toBe('apostles');
    expect(getFastForDate('2026-06-29').kind).toBe('none'); // feast itself
  });

  it('Dormition Fast covers 14 → 27 August NS', () => {
    expectKind('2026-08-14', 'dormition');
    expectKind('2026-08-20', 'dormition');
    expectKind('2026-08-27', 'dormition');
    expectKind('2026-08-28', 'none'); // the feast itself
    expectKind('2026-08-13', 'none'); // day before
  });

  it('Nativity Fast covers 28 November → 6 January NS, crossing the year', () => {
    expectKind('2026-11-28', 'nativity');
    expectKind('2026-12-25', 'nativity');
    expectKind('2027-01-06', 'nativity');
    expectKind('2026-11-27', 'none');
  });

  it('Christmastide is 7 → 17 January NS (fast-free)', () => {
    expectKind('2027-01-07', 'christmastide');
    expectKind('2027-01-12', 'christmastide');
    expectKind('2027-01-17', 'christmastide');
  });

  it('Ordinary days return "none"', () => {
    expectKind('2026-02-13', 'none');
    expectKind('2026-10-15', 'none');
  });

  it('Malformed ISO returns "none"', () => {
    expectKind('not-a-date', 'none');
    expectKind('2026/02/13', 'none');
  });
});
