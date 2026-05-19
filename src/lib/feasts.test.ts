import { describe, it, expect } from 'vitest';
import { parseFeastDate, getFeastsForDate } from './feasts';

describe('parseFeastDate', () => {
  it('parses the same-month shared-name form: "Title (D1 / D2 Month)"', () => {
    expect(parseFeastDate('Repose of St Athanasios the Athonite (5 / 18 July)')).toEqual({
      month: 7,
      day: 18,
    });
    expect(parseFeastDate('Dormition of the Theotokos (15 / 28 August)')).toEqual({
      month: 8,
      day: 28,
    });
  });

  it('parses the cross-month two-name form: "Title (D1 Month1 / D2 Month2)"', () => {
    expect(parseFeastDate('Annunciation (25 March / 7 April)')).toEqual({
      month: 4,
      day: 7,
    });
    expect(
      parseFeastDate('Presentation of the Theotokos (21 November / 4 December)'),
    ).toEqual({ month: 12, day: 4 });
    expect(
      parseFeastDate('Nativity of St John the Baptist (24 June / 7 July)'),
    ).toEqual({ month: 7, day: 7 });
  });

  it('returns null for moveable feasts', () => {
    expect(parseFeastDate('Ascension of the Lord (moveable)')).toBeNull();
    expect(parseFeastDate('Holy Trinity (moveable, Pentecost)')).toBeNull();
  });

  it('returns null when there is no parseable date in parentheses', () => {
    expect(parseFeastDate('Some title with no parens')).toBeNull();
    expect(parseFeastDate('Title (just a comment)')).toBeNull();
    expect(parseFeastDate('Title (5 / something)')).toBeNull();
  });

  it('rejects out-of-range days and bogus months', () => {
    expect(parseFeastDate('Bogus (1 / 32 August)')).toBeNull();
    expect(parseFeastDate('Bogus (1 / 5 Whateverember)')).toBeNull();
  });
});

describe('getFeastsForDate', () => {
  it('finds Dormition on 28 August (NS-equivalent of OS 15 Aug)', () => {
    const matches = getFeastsForDate('2026-08-28');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.some((m) => m.feast.includes('Dormition'))).toBe(true);
  });

  it('returns an empty list for a feast-free day', () => {
    // 13 February has no patronal feast in the dataset.
    expect(getFeastsForDate('2026-02-13')).toEqual([]);
  });

  it('returns an empty list for malformed ISO input', () => {
    expect(getFeastsForDate('not-a-date')).toEqual([]);
    expect(getFeastsForDate('2026/08/28')).toEqual([]);
  });
});
