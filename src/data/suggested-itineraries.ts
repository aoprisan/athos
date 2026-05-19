import type { TripPlace } from '../types';

/* Pre-built pilgrim itineraries. A starting point a user can clone into their
   own trip list, then edit freely. Each template has a stable id (so Romanian
   overrides can key off it) and a fixed number of days; cloning fills in the
   chosen start date and shifts each day's date accordingly.

   Itineraries assume the standard 3-night Diamonitirion and ferries running
   on the published schedule. They are not the only sensible plans — they are
   four well-trodden routes that work for a first visit. */

export interface SuggestedDay {
  /** Optional one-line travel note for the day (walking time, ferry, etc.). */
  note?: string;
  /** Places to visit on this day, in order. */
  places: TripPlace[];
}

export interface SuggestedItinerary {
  /** Stable id used as part of the cloned trip's slug and as the key for
      Romanian overrides. */
  id: string;
  /** Display name in English. */
  name: string;
  /** One-sentence summary. */
  description: string;
  /** Number of days the itinerary spans. */
  durationDays: number;
  /** Day-by-day plan. */
  days: SuggestedDay[];
}

export const SUGGESTED_ITINERARIES: SuggestedItinerary[] = [
  {
    id: 'classic-east-coast',
    name: 'Classic northeast coast',
    description:
      'Three days along the gentler eastern shore — Iviron, Stavronikita and Pantokratoros, with Karyes and the Protaton at the centre.',
    durationDays: 3,
    days: [
      {
        note: 'Daphne → Karyes by bus, then on to Iviron. Walk along the coast to Stavronikita (about 1½ hours).',
        places: [
          { kind: 'monastery', slug: 'iviron' },
          { kind: 'monastery', slug: 'stavronikita' },
        ],
      },
      {
        note: 'Continue north along the east coast.',
        places: [
          { kind: 'monastery', slug: 'pantokratoros' },
          { kind: 'monastery', slug: 'vatopedi' },
        ],
      },
      {
        note: 'Cross to Karyes for the Protaton and the wonder-working Axion Estin icon.',
        places: [
          { kind: 'monastery', slug: 'koutloumousiou' },
          { kind: 'settlement', slug: 'skete-st-andrew' },
        ],
      },
    ],
  },
  {
    id: 'southern-tip-pilgrimage',
    name: 'Southern tip pilgrimage',
    description:
      'Four days at the desert end of the Mountain — Great Lavra and the cliff-clinging sketes of Athos: Kafsokalyvia, St Anne, Karoulia.',
    durationDays: 4,
    days: [
      {
        note: 'Daphne → Great Lavra by the south-east coastal boat. Long voyage — leave bag light.',
        places: [
          { kind: 'monastery', slug: 'great-lavra' },
        ],
      },
      {
        note: 'Walk south-west around the foot of Athos to the eastern sketes.',
        places: [
          { kind: 'settlement', slug: 'skete-kafsokalyvia' },
          { kind: 'settlement', slug: 'katounakia' },
        ],
      },
      {
        note: 'The cliff-face sketes — paths are very steep; allow most of the day.',
        places: [
          { kind: 'settlement', slug: 'karoulia' },
          { kind: 'settlement', slug: 'skete-st-anne' },
          { kind: 'settlement', slug: 'skete-nea' },
        ],
      },
      {
        note: 'Return north along the west coast by the small boat.',
        places: [
          { kind: 'monastery', slug: 'agiou-pavlou' },
          { kind: 'monastery', slug: 'dionysiou' },
        ],
      },
    ],
  },
  {
    id: 'western-cliffs',
    name: 'Western cliffs',
    description:
      'Three days along the dramatic west-coast cliffs — Simonopetra, Grigoriou, Dionysiou and Agiou Pavlou, all reached by the south-east coastal boat from Daphne.',
    durationDays: 3,
    days: [
      {
        note: 'Daphne → Simonopetra by the coastal boat. The arsanas is at sea level; the monastery sits 230 m above on the cliff.',
        places: [
          { kind: 'monastery', slug: 'simonopetra' },
        ],
      },
      {
        note: 'Walk or take the boat south along the cliff coast.',
        places: [
          { kind: 'monastery', slug: 'osiou-grigoriou' },
          { kind: 'monastery', slug: 'dionysiou' },
        ],
      },
      {
        note: 'The southern end of the cliffs, then return via Xeropotamou near Daphne.',
        places: [
          { kind: 'monastery', slug: 'agiou-pavlou' },
          { kind: 'monastery', slug: 'xeropotamou' },
        ],
      },
    ],
  },
  {
    id: 'slavic-heritage',
    name: 'Slavic heritage',
    description:
      'Three days through the non-Greek monasteries of Athos — Hilandar (Serbian), Zographou (Bulgarian) and St Panteleimon (Russian), with their Slavonic liturgies and distinctive architecture.',
    durationDays: 3,
    days: [
      {
        note: 'Ierissos → Hilandar arsanas (boats are less frequent; confirm at the harbour).',
        places: [
          { kind: 'monastery', slug: 'hilandar' },
        ],
      },
      {
        note: 'Cross the peninsula on foot or by minibus to the Bulgarian house in the interior.',
        places: [
          { kind: 'monastery', slug: 'zographou' },
          { kind: 'monastery', slug: 'konstamonitou' },
        ],
      },
      {
        note: 'Down to the west coast — the great Russian house and its neighbours.',
        places: [
          { kind: 'monastery', slug: 'docheiariou' },
          { kind: 'monastery', slug: 'xenophontos' },
          { kind: 'monastery', slug: 'st-panteleimon' },
        ],
      },
    ],
  },
];

export function findSuggestedItinerary(
  id: string,
): SuggestedItinerary | undefined {
  return SUGGESTED_ITINERARIES.find((it) => it.id === id);
}
