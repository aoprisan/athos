export type Tradition =
  | 'Greek'
  | 'Russian'
  | 'Serbian'
  | 'Bulgarian'
  | 'Romanian'
  | 'Georgian';

export type MonasteryRank = 'ruling' | 'skete' | 'kellion';

/** Coarse geographic regions of the Athonite peninsula. Each ruling monastery
    is assigned to exactly one; settlements inherit their region from the
    ruling monastery they depend on. Not an administrative division — the
    Holy Mountain is a single autonomous state — but a working pilgrim's
    sense of where on the peninsula a house lies. */
export type MonasteryRegion =
  | 'northwest'
  | 'northeast-coast'
  | 'east-slopes'
  | 'southern-tip'
  | 'southwest-cliffs'
  | 'west-coast';

export interface SacredIcon {
  /** English / common name (often a Greek epithet transliterated). */
  name: string;
  /** Original Greek name, where applicable. */
  nameGreek?: string;
  /** Two- to four-sentence note on what the icon is, what it depicts, and
      why it is famous. Treats relics in the same shape — a fragment of the
      True Cross or the head of a saint is grouped here as a holy object the
      monastery is known to keep. */
  description: string;
  /** Optional hot-linked image. Should be a direct image URL (not a wiki
      article page), typically a Wikimedia Commons thumb. */
  imageUrl?: string;
  /** Short credit line shown beneath the image, e.g. "Wikimedia Commons /
      Public domain". */
  imageCredit?: string;
}

export interface Legend {
  /** Short headline (e.g. "Star above the cliff", "Foot of St Anne"). */
  title: string;
  /** Two- to four-sentence retelling of the traditional story. */
  description: string;
}

export interface Monastery {
  slug: string;
  name: string;
  nameGreek: string;
  rank: MonasteryRank;
  /** Position in the canonical hierarchical order (1–20 for the ruling monasteries). */
  hierarchyOrder: number;
  tradition: Tradition;
  /** Geographic region of the peninsula. */
  region: MonasteryRegion;
  founded: string;
  patronalFeast: string;
  /** Decimal degrees, WGS84. */
  lat: number;
  lng: number;
  /** Short intro paragraph for the list/detail header. */
  intro: string;
  /** Optional longer notes — history, what to see, dependencies. */
  notes?: string[];
  /** Wonder-working icons and notable relics housed at the monastery. */
  icons?: SacredIcon[];
  /** Foundation legends and traditional stories tied to the place. */
  legends?: Legend[];
  links: Array<{ label: string; url: string }>;
}

export type SettlementKind = 'skete' | 'hermitage';

export interface Settlement {
  slug: string;
  name: string;
  nameGreek: string;
  kind: SettlementKind;
  tradition?: Tradition;
  /** Slug of the ruling monastery this settlement is dependent on, if any. */
  dependsOn?: string;
  /** Founding date or rough century. For hermitages without a fixed
      foundation, a phrase like "medieval origin". */
  founded: string;
  /** Patronal feast of the kyriakon (skete church). Omitted for the
      scattered hermit settlements which have no central kyriakon. */
  patronalFeast?: string;
  /** Decimal degrees, WGS84. Approximate (~250 m) for the smaller dependencies. */
  lat: number;
  lng: number;
  /** Short intro paragraph for the detail header. */
  intro: string;
  /** Optional longer notes. */
  notes?: string[];
  /** Wonder-working icons and notable relics, where any are kept on site. */
  icons?: SacredIcon[];
  /** Legends and traditional stories tied to the place. */
  legends?: Legend[];
  links: Array<{ label: string; url: string }>;
}

export interface FerryRoute {
  id: string;
  from: string;
  to: string;
  /** Boat / vessel name(s). */
  vessel?: string;
  /** Local departure time(s) HH:MM. */
  departures: string[];
  /** Approximate journey duration in minutes. */
  durationMin: number;
  /** Pilgrim/visitor category notes (e.g. "Diamonitirion required"). */
  notes?: string;
  operator?: string;
}

export interface TransportPort {
  id: string;
  name: string;
  role: string;
  lat: number;
  lng: number;
  notes?: string;
}

export interface TripPlace {
  /** Which dataset this slug belongs to. */
  kind: 'monastery' | 'settlement';
  /** Slug from MONASTERIES or SETTLEMENTS. */
  slug: string;
}

export interface TripDay {
  /** ISO date YYYY-MM-DD, unique within a trip, used as the stable key. */
  date: string;
  /** Ordered list of places to visit that day. */
  places: TripPlace[];
}

export interface Trip {
  /** Unique id used in the URL. Slugified name + 4-char random suffix. */
  slug: string;
  name: string;
  /** ISO YYYY-MM-DD. */
  startDate: string;
  /** ISO YYYY-MM-DD, inclusive, must be >= startDate. */
  endDate: string;
  /** One entry per day in [startDate, endDate], in chronological order. */
  days: TripDay[];
  /** ISO timestamp, set on create, updated on every mutation. */
  updatedAt: string;
}

export type View =
  | { kind: 'home' }
  | { kind: 'monastery'; slug: string }
  | { kind: 'settlement'; slug: string }
  | { kind: 'getting-there' }
  | { kind: 'ferries' }
  | { kind: 'trips' }
  | { kind: 'trip'; slug: string };
