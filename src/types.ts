export type Tradition =
  | 'Greek'
  | 'Russian'
  | 'Serbian'
  | 'Bulgarian'
  | 'Romanian'
  | 'Georgian';

export type MonasteryRank = 'ruling' | 'skete' | 'kellion';

export interface Monastery {
  slug: string;
  name: string;
  nameGreek: string;
  rank: MonasteryRank;
  /** Position in the canonical hierarchical order (1–20 for the ruling monasteries). */
  hierarchyOrder: number;
  tradition: Tradition;
  founded: string;
  patronalFeast: string;
  /** Decimal degrees, WGS84. */
  lat: number;
  lng: number;
  /** Short intro paragraph for the list/detail header. */
  intro: string;
  /** Optional longer notes — history, what to see, dependencies. */
  notes?: string[];
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

export type View =
  | { kind: 'home' }
  | { kind: 'monastery'; slug: string }
  | { kind: 'settlement'; slug: string }
  | { kind: 'getting-there' }
  | { kind: 'ferries' };
