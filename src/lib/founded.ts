/* Parse the `founded` field on a Monastery record into a single sortable year.
   Inputs we see in the data:
     "963"                 →  963
     "972–985"             →  972  (earliest year)
     "11th c."             →  1050 (mid-century)
     "early 14th c."       →  1320
     "late 18th c."        →  1780
     "10th–11th c."        →  1050 (start of the later century)

   This is intentionally lossy — the timeline view needs a numeric anchor,
   not full date arithmetic. Return null only when no signal is recoverable. */

const ORDINAL_TO_CENTURY: Record<string, number> = {
  '4th': 4, '5th': 5, '6th': 6, '7th': 7, '8th': 8, '9th': 9,
  '10th': 10, '11th': 11, '12th': 12, '13th': 13, '14th': 14,
  '15th': 15, '16th': 16, '17th': 17, '18th': 18, '19th': 19, '20th': 20,
};

function midCenturyYear(century: number): number {
  return (century - 1) * 100 + 50;
}

function earlyCenturyYear(century: number): number {
  return (century - 1) * 100 + 20;
}

function lateCenturyYear(century: number): number {
  return (century - 1) * 100 + 80;
}

export function parseFoundedYear(founded: string): number | null {
  const explicit = founded.match(/\b(\d{3,4})\b/);
  if (explicit) {
    return Number(explicit[1]);
  }
  const centuryMatch = founded.toLowerCase().match(/(early|mid|late)?\s*(\d+)(?:st|nd|rd|th)\s*c\.?/);
  if (centuryMatch) {
    const qualifier = centuryMatch[1];
    const century = Number(centuryMatch[2]);
    if (!Number.isFinite(century)) return null;
    if (qualifier === 'early') return earlyCenturyYear(century);
    if (qualifier === 'late') return lateCenturyYear(century);
    return midCenturyYear(century);
  }
  // Fallback: ordinal like "the 14th c." caught above. Just look for any
  // century word we recognise.
  for (const [k, v] of Object.entries(ORDINAL_TO_CENTURY)) {
    if (founded.toLowerCase().includes(k)) {
      return midCenturyYear(v);
    }
  }
  return null;
}
