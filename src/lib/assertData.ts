/* Cheap, runs-once boot-time data validator. Catches the editorial drift
   that builds up as new monasteries, sketes, regions, icons, and feast
   strings get added — duplicate slugs, broken `dependsOn` references, and
   `patronalFeast` strings that the feast-day parser will silently reject.

   Designed to be loud in development and quiet in production: in dev we
   print a `console.group`, in prod we emit one `console.warn` so the
   issues surface in Sentry-style log captures without disrupting users. */

import { MONASTERIES } from '../data/monasteries';
import { SETTLEMENTS } from '../data/settlements';
import { parseFeastDate } from './feasts';

export interface DataIssue {
  severity: 'error' | 'warn';
  message: string;
}

export function assertData(): DataIssue[] {
  const issues: DataIssue[] = [];

  // Duplicate slugs across both datasets — slugs are used as router keys
  // and would otherwise collide silently.
  const seenSlugs = new Map<string, 'monastery' | 'settlement'>();
  for (const m of MONASTERIES) {
    const prior = seenSlugs.get(m.slug);
    if (prior) {
      issues.push({
        severity: 'error',
        message: `Duplicate slug "${m.slug}" — monastery clashes with prior ${prior}.`,
      });
    } else {
      seenSlugs.set(m.slug, 'monastery');
    }
  }
  for (const s of SETTLEMENTS) {
    const prior = seenSlugs.get(s.slug);
    if (prior) {
      issues.push({
        severity: 'error',
        message: `Duplicate slug "${s.slug}" — settlement clashes with prior ${prior}.`,
      });
    } else {
      seenSlugs.set(s.slug, 'settlement');
    }
  }

  // dependsOn references — a skete that points at a non-existent monastery
  // would render as orphaned in the detail view.
  const monasterySlugs = new Set(MONASTERIES.map((m) => m.slug));
  for (const s of SETTLEMENTS) {
    if (s.dependsOn && !monasterySlugs.has(s.dependsOn)) {
      issues.push({
        severity: 'error',
        message: `Settlement "${s.slug}" depends on unknown monastery "${s.dependsOn}".`,
      });
    }
  }

  // patronalFeast strings — every fixed (non-moveable) feast must parse,
  // otherwise the feast-day banner will silently miss the day.
  for (const m of MONASTERIES) {
    if (/moveable/i.test(m.patronalFeast)) continue;
    if (parseFeastDate(m.patronalFeast) === null) {
      issues.push({
        severity: 'warn',
        message: `Monastery "${m.slug}" patronalFeast does not parse: ${m.patronalFeast}`,
      });
    }
  }
  for (const s of SETTLEMENTS) {
    if (!s.patronalFeast) continue;
    if (/moveable/i.test(s.patronalFeast)) continue;
    if (parseFeastDate(s.patronalFeast) === null) {
      issues.push({
        severity: 'warn',
        message: `Settlement "${s.slug}" patronalFeast does not parse: ${s.patronalFeast}`,
      });
    }
  }

  return issues;
}

/** Runs `assertData()` and logs any issues. Pass `isDev` to control verbosity. */
export function reportDataIssues(isDev: boolean): void {
  const issues = assertData();
  if (issues.length === 0) return;
  const errors = issues.filter((i) => i.severity === 'error');
  const warns = issues.filter((i) => i.severity === 'warn');
  if (isDev) {
    console.group(`[athos] data validation found ${issues.length} issue(s)`);
    for (const e of errors) console.error(e.message);
    for (const w of warns) console.warn(w.message);
    console.groupEnd();
  } else {
    if (errors.length > 0) {
      console.warn(
        `[athos] data validation: ${errors.length} error(s), ${warns.length} warning(s)`,
      );
    }
  }
}
