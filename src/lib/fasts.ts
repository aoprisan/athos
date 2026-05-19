/* Orthodox fasting calendar. Athonite monasteries follow the Julian (Old
   Style) calendar liturgically, so Pascha is the *Orthodox* Pascha (Julian-
   computed) and the fixed fasts that the trapeza observes are tied to Old-
   Style date stamps. Pilgrims, however, enter trip dates in the modern
   civil (Gregorian / New-Style) calendar, so every anchor we compute here
   is converted to its Gregorian equivalent before we test membership.

   For 1900–2099 the Julian→Gregorian offset is +13 days; outside that
   window the offset shifts and this module would need a real proleptic
   conversion. The app's audience plans pilgrimages in the near term, so
   the simpler +13 is correct for every trip date a user can plausibly
   enter today. */

export type FastKind =
  | 'great-lent'
  | 'holy-week'
  | 'bright-week'
  | 'apostles'
  | 'dormition'
  | 'nativity'
  | 'christmastide'
  | 'none';

export interface FastForDate {
  kind: FastKind;
  /** 1-indexed day within the period (1 = first day of the fast or fast-free
      season). Undefined for `none`. */
  dayOfFast?: number;
  /** Total length of the period in days. */
  lengthDays?: number;
  /** True when a major feast falling inside the fast relaxes the rule
      (fish allowed): Annunciation (Old-Style 25 March → New-Style 7 April)
      and Palm Sunday in Great Lent. */
  fishAllowed?: boolean;
  /** True when the day is also a major feast falling inside the fast —
      currently only used for display; relaxation is reported via
      `fishAllowed`. */
  feastWithinFast?: boolean;
}

interface MD { month: number; day: number; }

/** Gauss's Easter Algorithm — Orthodox / Julian-calendar form. Returns the
    Julian-calendar Pascha date for the given year. Months: 3 = March,
    4 = April. */
function orthodoxPaschaJulian(year: number): MD {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const total = d + e + 114;
  const month = Math.floor(total / 31);
  const day = (total % 31) + 1;
  return { month, day };
}

/** Days to add to a Julian date to get its Gregorian equivalent. Constant
    for the entire 1900–2099 window; the Pascha algorithm above is valid
    indefinitely under the Julian calendar, but only this window is what we
    advertise here. */
function julianToGregorianOffset(year: number): number {
  if (year >= 1900 && year < 2100) return 13;
  // Defensive fallback — computed from the standard formula
  // offset = floor(year/100) - floor(year/400) - 2.
  return Math.floor(year / 100) - Math.floor(year / 400) - 2;
}

/** Orthodox Pascha as a *Gregorian* (civil) date in the given year. */
export function orthodoxPaschaGregorian(year: number): Date {
  const j = orthodoxPaschaJulian(year);
  const offset = julianToGregorianOffset(year);
  // Construct in UTC so the subsequent date math doesn't suffer DST drift.
  const julian = Date.UTC(year, j.month - 1, j.day);
  return new Date(julian + offset * 86_400_000);
}

function utcDate(year: number, month1to12: number, day: number): Date {
  return new Date(Date.UTC(year, month1to12 - 1, day));
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86_400_000);
}

function diffDays(later: Date, earlier: Date): number {
  return Math.round((later.getTime() - earlier.getTime()) / 86_400_000);
}

function withinClosed(d: Date, start: Date, end: Date): boolean {
  return d.getTime() >= start.getTime() && d.getTime() <= end.getTime();
}

function parseISO(isoDate: string): Date | null {
  const m = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  return utcDate(Number(m[1]), Number(m[2]), Number(m[3]));
}

/** Returns the fast/fast-free season that the given civil (Gregorian) date
    falls inside, for the Athonite (Old-Style) calendar. */
export function getFastForDate(isoDate: string): FastForDate {
  const d = parseISO(isoDate);
  if (!d) return { kind: 'none' };
  const year = d.getUTCFullYear();

  // Pascha-anchored windows for this year and the previous one (the
  // previous year's Apostles' Fast never crosses into the next year, but
  // Christmastide of year-1 reaches into early January of year, which we
  // handle separately via the fixed Dec 25 / Jan 4 anchors below). */
  const pascha = orthodoxPaschaGregorian(year);

  // Great Lent (proper): Clean Monday → Lazarus Saturday = 40 days.
  // Clean Monday = Pascha - 48 days. Lazarus Saturday = Pascha - 8 days.
  const cleanMonday = addDays(pascha, -48);
  const lazarusSaturday = addDays(pascha, -8);

  // Holy Week: Palm Sunday (Pascha - 7) → Holy Saturday (Pascha - 1).
  const palmSunday = addDays(pascha, -7);
  const holySaturday = addDays(pascha, -1);

  // Bright Week: Pascha → Bright Saturday (Pascha + 6). Fast-free.
  const brightSaturday = addDays(pascha, 6);

  // Apostles' Fast: Monday after All Saints (Pascha + 57) → 28 June (NS),
  // since 29 June is the feast of Saints Peter and Paul. The fast can run
  // anywhere from 8 to 42 days depending on Pascha.
  const apostlesMonday = addDays(pascha, 57);
  const apostlesEnd = utcDate(year, 6, 28);

  if (withinClosed(d, cleanMonday, lazarusSaturday)) {
    const length = diffDays(lazarusSaturday, cleanMonday) + 1;
    const dayOfFast = diffDays(d, cleanMonday) + 1;
    // Annunciation (Old-Style 25 March = New-Style 7 April) relaxes the
    // rule even when it falls inside Great Lent.
    const isAnnunciation = d.getUTCMonth() === 3 && d.getUTCDate() === 7;
    return {
      kind: 'great-lent',
      dayOfFast,
      lengthDays: length,
      fishAllowed: isAnnunciation,
      feastWithinFast: isAnnunciation,
    };
  }

  if (withinClosed(d, palmSunday, holySaturday)) {
    const dayOfFast = diffDays(d, palmSunday) + 1;
    // Palm Sunday relaxes to allow fish; Annunciation (NS 7 April) also
    // relaxes when it falls inside Holy Week. The rest of Holy Week is
    // strict (no oil on Holy Friday by Athonite typikon).
    const isPalmSunday = d.getTime() === palmSunday.getTime();
    const isAnnunciation = d.getUTCMonth() === 3 && d.getUTCDate() === 7;
    return {
      kind: 'holy-week',
      dayOfFast,
      lengthDays: 7,
      fishAllowed: isPalmSunday || isAnnunciation,
      feastWithinFast: isPalmSunday || isAnnunciation,
    };
  }

  if (withinClosed(d, pascha, brightSaturday)) {
    return {
      kind: 'bright-week',
      dayOfFast: diffDays(d, pascha) + 1,
      lengthDays: 7,
    };
  }

  if (withinClosed(d, apostlesMonday, apostlesEnd)) {
    return {
      kind: 'apostles',
      dayOfFast: diffDays(d, apostlesMonday) + 1,
      lengthDays: diffDays(apostlesEnd, apostlesMonday) + 1,
    };
  }

  // Dormition Fast: 1 Aug → 14 Aug (NS, since this is an Old-Style fast
  // shifted +13 days to the civil calendar… but Athonite trapeza switches
  // to the fast on the dates of the Old-Style calendar, which the pilgrim
  // experiences as 14–27 August NS. To stay aligned with what the pilgrim
  // *sees* at the monastery, we use Old-Style 1–14 August projected to
  // NS = 14 → 27 August.) */
  const dormitionStart = utcDate(year, 8, 14);
  const dormitionEnd = utcDate(year, 8, 27);
  if (withinClosed(d, dormitionStart, dormitionEnd)) {
    return {
      kind: 'dormition',
      dayOfFast: diffDays(d, dormitionStart) + 1,
      lengthDays: 14,
    };
  }

  // Nativity Fast: Old-Style 15 November → 24 December = NS 28 Nov → 6 Jan
  // (with 7 Jan = NS-equivalent of OS Christmas). 40 days. Spans the year
  // boundary, so check both the current year's start and the previous
  // year's start. */
  const nativityStartThisYear = utcDate(year, 11, 28);
  const nativityEndThisYear = utcDate(year + 1, 1, 6);
  const nativityStartLastYear = utcDate(year - 1, 11, 28);
  const nativityEndLastYear = utcDate(year, 1, 6);

  if (withinClosed(d, nativityStartThisYear, nativityEndThisYear)) {
    return {
      kind: 'nativity',
      dayOfFast: diffDays(d, nativityStartThisYear) + 1,
      lengthDays: 40,
    };
  }
  if (withinClosed(d, nativityStartLastYear, nativityEndLastYear)) {
    return {
      kind: 'nativity',
      dayOfFast: diffDays(d, nativityStartLastYear) + 1,
      lengthDays: 40,
    };
  }

  // Christmastide: 7 Jan (NS-of-OS-Christmas) → 17 Jan (NS-of-OS-Theophany-
  // eve). Athonite trapeza is fast-free in this window. (NS 17 Jan = OS 4
  // Jan, the day before Theophany; OS Theophany Eve is a strict fast.) */
  const christmastideStart = utcDate(year, 1, 7);
  const christmastideEnd = utcDate(year, 1, 17);
  if (withinClosed(d, christmastideStart, christmastideEnd)) {
    return {
      kind: 'christmastide',
      dayOfFast: diffDays(d, christmastideStart) + 1,
      lengthDays: 11,
    };
  }

  return { kind: 'none' };
}
