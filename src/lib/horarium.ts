import type { MonasteryServices } from '../types';

/* Daily akolouthia ("horarium") for an Athonite monastery.

   Athos keeps Byzantine time — the clock ticks the daily count from sunset
   (sunset = 12 hours / 24:00), so the civil time of vespers and orthros drifts
   with the season. The times below are averages a pilgrim can plan around; the
   archondariki will confirm the exact hour on the day. Where a house is widely
   known to keep an unusual rhythm, override the default in MONASTERIES via the
   `services` field on the Monastery record. */

export const DEFAULT_ATHONITE_HORARIUM: MonasteryServices = {
  vespers: '16:30',
  orthros: '04:00',
  liturgy: '06:30',
  trapezaMid: '09:00',
  trapezaEve: '18:30',
};

export function effectiveServices(
  services: MonasteryServices | undefined,
): MonasteryServices {
  if (!services) return DEFAULT_ATHONITE_HORARIUM;
  return {
    vespers: services.vespers ?? DEFAULT_ATHONITE_HORARIUM.vespers,
    orthros: services.orthros ?? DEFAULT_ATHONITE_HORARIUM.orthros,
    liturgy: services.liturgy ?? DEFAULT_ATHONITE_HORARIUM.liturgy,
    trapezaMid: services.trapezaMid ?? DEFAULT_ATHONITE_HORARIUM.trapezaMid,
    trapezaEve: services.trapezaEve ?? DEFAULT_ATHONITE_HORARIUM.trapezaEve,
    notes: services.notes,
  };
}
