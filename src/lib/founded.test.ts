import { describe, expect, it } from 'vitest';
import { parseFoundedYear } from './founded';

describe('parseFoundedYear', () => {
  it('returns an explicit four-digit year', () => {
    expect(parseFoundedYear('963')).toBe(963);
  });

  it('returns the earliest year in a range', () => {
    expect(parseFoundedYear('972–985')).toBe(972);
  });

  it('maps an ordinal century to its mid-point', () => {
    expect(parseFoundedYear('14th c.')).toBe(1350);
    expect(parseFoundedYear('11th c.')).toBe(1050);
  });

  it('respects early/late qualifiers', () => {
    expect(parseFoundedYear('early 14th c.')).toBe(1320);
    expect(parseFoundedYear('late 18th c.')).toBe(1780);
  });

  it('falls back to the later century when a range is given', () => {
    expect(parseFoundedYear('10th–11th c.')).toBe(1050);
  });

  it('returns null when no signal can be recovered', () => {
    expect(parseFoundedYear('antiquity')).toBe(null);
  });
});
