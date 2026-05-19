import { describe, expect, it } from 'vitest';
import { DEFAULT_ATHONITE_HORARIUM, effectiveServices } from './horarium';

describe('effectiveServices', () => {
  it('returns the default horarium when no overrides are given', () => {
    expect(effectiveServices(undefined)).toEqual(DEFAULT_ATHONITE_HORARIUM);
  });

  it('preserves user-supplied notes alongside the defaults', () => {
    const eff = effectiveServices({ notes: ['Liturgy at sunrise on Sundays.'] });
    expect(eff.vespers).toBe(DEFAULT_ATHONITE_HORARIUM.vespers);
    expect(eff.notes).toEqual(['Liturgy at sunrise on Sundays.']);
  });

  it('lets a partial override fill in missing fields from the default', () => {
    const eff = effectiveServices({ orthros: '03:30', liturgy: '06:00' });
    expect(eff.orthros).toBe('03:30');
    expect(eff.liturgy).toBe('06:00');
    expect(eff.vespers).toBe(DEFAULT_ATHONITE_HORARIUM.vespers);
    expect(eff.trapezaMid).toBe(DEFAULT_ATHONITE_HORARIUM.trapezaMid);
  });
});
