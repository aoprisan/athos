/* Walking-path graph between Athonite houses.

   Each edge describes a classical, on-foot connection between two monasteries
   or sketes. Distances, ascent and walking time are averages drawn from the
   established Athonite walking literature — Sotiris Kadas, *Mount Athos: An
   Illustrated Guide*; the Friends of Mount Athos (FoMA) footpath manual; and
   topographic readings on OpenTopoMap. Treat them as guidance: weather,
   condition of the path, and a pilgrim's pace all vary.

   Edges are undirected — `findPath(from, to)` returns the same edge as
   `findPath(to, from)`. */

export type PathDifficulty = 'easy' | 'medium' | 'strenuous';

export interface WalkingEdge {
  /** Slug of either a monastery or a settlement. */
  a: string;
  b: string;
  km: number;
  /** Approximate metres of ascent from the lower end. */
  ascentM: number;
  /** Average walking time, in minutes. */
  minutes: number;
  difficulty: PathDifficulty;
  /** Short note on the character of the path. */
  notes?: string;
}

export const WALKING_PATHS: WalkingEdge[] = [
  // ─── Northeast coast — the easiest stretch on the Mountain. ───
  {
    a: 'iviron',
    b: 'stavronikita',
    km: 3.2,
    ascentM: 80,
    minutes: 60,
    difficulty: 'easy',
    notes: 'Gentle coastal track, alternating between olive groves and the shore.',
  },
  {
    a: 'stavronikita',
    b: 'pantokratoros',
    km: 3.0,
    ascentM: 90,
    minutes: 60,
    difficulty: 'easy',
    notes: 'Continuation of the coastal path, briefly inland through chestnut woods.',
  },
  {
    a: 'pantokratoros',
    b: 'vatopedi',
    km: 6.5,
    ascentM: 250,
    minutes: 150,
    difficulty: 'medium',
    notes: 'Inland over the wooded saddle north of Mt Tsoukara.',
  },
  {
    a: 'vatopedi',
    b: 'esphigmenou',
    km: 5.5,
    ascentM: 180,
    minutes: 130,
    difficulty: 'medium',
    notes: 'Forest path skirting the north-eastern coast.',
  },
  {
    a: 'esphigmenou',
    b: 'hilandar',
    km: 4.5,
    ascentM: 200,
    minutes: 90,
    difficulty: 'medium',
    notes: 'Quiet wooded climb inland — the most travelled of the northern paths.',
  },
  {
    a: 'hilandar',
    b: 'zographou',
    km: 10.5,
    ascentM: 520,
    minutes: 240,
    difficulty: 'strenuous',
    notes: 'Crosses the spine of the peninsula. Carry water; the path is shaded but long.',
  },

  // ─── Karyes hub — the central monastic town. ───
  {
    a: 'iviron',
    b: 'koutloumousiou',
    km: 6.8,
    ascentM: 380,
    minutes: 150,
    difficulty: 'medium',
    notes: 'Uphill from the sea to the plateau of Karyes, on the old paved path.',
  },
  {
    a: 'koutloumousiou',
    b: 'philotheou',
    km: 5.5,
    ascentM: 200,
    minutes: 130,
    difficulty: 'medium',
    notes: 'Through the wooded slopes east of Karyes.',
  },
  {
    a: 'philotheou',
    b: 'karakallou',
    km: 3.5,
    ascentM: 120,
    minutes: 80,
    difficulty: 'easy',
    notes: 'Short forest path between the two neighbouring houses.',
  },

  // ─── West coast — the Daphne approach. ───
  {
    a: 'xeropotamou',
    b: 'st-panteleimon',
    km: 4.5,
    ascentM: 220,
    minutes: 110,
    difficulty: 'medium',
    notes: 'Descends from the hillside monastery to the Russian coastal compound.',
  },
  {
    a: 'st-panteleimon',
    b: 'xenophontos',
    km: 3.0,
    ascentM: 80,
    minutes: 60,
    difficulty: 'easy',
    notes: 'Easy coastal walk along the west shore.',
  },
  {
    a: 'xenophontos',
    b: 'docheiariou',
    km: 1.5,
    ascentM: 40,
    minutes: 30,
    difficulty: 'easy',
    notes: 'Short coastal path; the two arsanades are visible from each other.',
  },
  {
    a: 'docheiariou',
    b: 'konstamonitou',
    km: 4.5,
    ascentM: 320,
    minutes: 110,
    difficulty: 'medium',
    notes: 'Climb inland from the coast to the secluded valley of Konstamonitou.',
  },
  {
    a: 'konstamonitou',
    b: 'zographou',
    km: 4.0,
    ascentM: 260,
    minutes: 100,
    difficulty: 'medium',
    notes: 'Forest traverse between the two interior houses.',
  },

  // ─── Southwest cliffs — the most spectacular footpath on Athos. ───
  {
    a: 'simonopetra',
    b: 'osiou-grigoriou',
    km: 4.5,
    ascentM: 350,
    minutes: 120,
    difficulty: 'strenuous',
    notes: 'Steep descent and re-ascent on the cliff path. Spectacular but not for the unsure.',
  },
  {
    a: 'osiou-grigoriou',
    b: 'dionysiou',
    km: 3.5,
    ascentM: 220,
    minutes: 90,
    difficulty: 'medium',
    notes: 'Cliff path with several stone-laid sections, in shade for much of the way.',
  },
  {
    a: 'dionysiou',
    b: 'agiou-pavlou',
    km: 4.0,
    ascentM: 280,
    minutes: 100,
    difficulty: 'medium',
    notes: 'Continues along the western cliffs; the Athonite ridge looms above.',
  },
  {
    a: 'agiou-pavlou',
    b: 'skete-nea',
    km: 1.5,
    ascentM: 80,
    minutes: 35,
    difficulty: 'easy',
    notes: 'Short walk to the New Skete just south.',
  },
  {
    a: 'skete-nea',
    b: 'skete-st-anne',
    km: 1.8,
    ascentM: 120,
    minutes: 40,
    difficulty: 'easy',
    notes: 'Continues south along the cliffs to the great skete of St Anne.',
  },

  // ─── Southern tip — the desert of Athos. ───
  {
    a: 'skete-st-anne',
    b: 'great-lavra',
    km: 12.0,
    ascentM: 750,
    minutes: 330,
    difficulty: 'strenuous',
    notes: 'Long traverse over Karoulia, Katounakia and Kerasia. The wild side of the Mountain.',
  },
];

/** Lookup an edge between two slugs in either direction. Returns the edge as
 *  originally listed (no mutation). */
export function findPath(from: string, to: string): WalkingEdge | undefined {
  return WALKING_PATHS.find(
    (e) => (e.a === from && e.b === to) || (e.a === to && e.b === from),
  );
}
