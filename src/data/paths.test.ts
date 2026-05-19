import { describe, expect, it } from 'vitest';
import { findPath, WALKING_PATHS } from './paths';

describe('findPath', () => {
  it('finds an edge in the order it was declared', () => {
    const direct = findPath('iviron', 'stavronikita');
    expect(direct?.km).toBeGreaterThan(0);
  });

  it('finds the same edge in reverse', () => {
    const a = findPath('iviron', 'stavronikita');
    const b = findPath('stavronikita', 'iviron');
    expect(a).toEqual(b);
  });

  it('returns undefined for two houses with no known path', () => {
    expect(findPath('great-lavra', 'zographou')).toBeUndefined();
  });
});

describe('WALKING_PATHS data integrity', () => {
  it('has positive distances and times for every edge', () => {
    for (const e of WALKING_PATHS) {
      expect(e.km).toBeGreaterThan(0);
      expect(e.minutes).toBeGreaterThan(0);
      expect(e.ascentM).toBeGreaterThanOrEqual(0);
    }
  });
});
