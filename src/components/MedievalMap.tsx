import { useMemo, useState } from 'react';
import { MONASTERIES } from '../data/monasteries';
import { PORTS } from '../data/transport';
import type { Monastery, View } from '../types';

/* MedievalMap — Byzantine-fresco map of the Athonite peninsula, in the
   iconographic register of Athonite monastery frescoes (cf. the Vatopedi
   wall-painting tradition). Painted plaster ground, dusty blue sea, painted
   green hills, terra-cotta-roofed monastery compounds, stylised cypresses,
   and a sky band at the top with the Theotokos flanked by two angels — the
   Holy Mountain is her Garden in the Athonite tradition.

   Inline SVG, no tile server. The view is fixed (the peninsula is small
   and the composition deliberate) so pan/zoom is absent by design. */

interface Props {
  onNavigate: (view: View) => void;
  selectedSlug?: string;
}

const VIEW_W = 1200;
const MAP_H = 820;
const SKY_H = 180;

// Public-domain Byzantine icons in the sky band. Served from /public/icons via
// Vite's base path so the URL is correct in both dev and the GitHub Pages build.
const ICONS_BASE = `${import.meta.env.BASE_URL}icons/`;

const LNG_MIN = 23.84;
const LNG_MAX = 24.45;
const LAT_MIN = 40.07;
const LAT_MAX = 40.43;

function project(lng: number, lat: number): [number, number] {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * VIEW_W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * MAP_H;
  return [x, y];
}

const C = {
  wall:        '#ead8a8',
  wallLight:   '#f4e6c0',
  wallShade:   '#c9b078',
  roof:        '#7e2b22',
  roofLight:   '#a04030',
  roofDark:    '#5a1812',
  land:        '#9bb47a',
  landLight:   '#b5cd96',
  landMid:     '#7c9560',
  landShade:   '#5a7a45',
  landDeep:    '#3e5530',
  road:        '#c8b07a',
  sea:         '#a3b6be',
  seaDeep:     '#7a96a5',
  seaLight:    '#c6d0d3',
  sky:         '#c8d0c8',
  skyLight:    '#e4e8df',
  skyDeep:     '#a7b4ad',
  ink:         '#2e2618',
  inkSoft:     '#5a4836',
  gold:        '#d6ad32',
  goldBright:  '#f5e08e',
  goldDeep:    '#7a5b12',
  maphorion:   '#7e2b22',
  maphorionInk:'#3a1410',
  underveil:   '#3c5a3a',
  tunic:       '#fbf5e6',
  sash:        '#a04030',
  greenRobe:   '#6a8b4a',
  blueRobe:    '#3c5a78',
  skin:        '#e8c598',
  skinShade:   '#a88660',
};

const PENINSULA_PATH = `
  M 290 250
  C 240 175, 340 130, 430 145
  C 480 152, 510 130, 590 148
  C 650 162, 690 200, 740 246
  C 790 300, 840 360, 880 425
  C 920 485, 970 535, 1020 568
  C 1070 595, 1110 620, 1135 650
  C 1150 678, 1140 700, 1110 712
  C 1080 720, 1045 720, 1010 720
  C 975 716, 945 700, 920 686
  C 890 672, 860 678, 830 695
  C 810 705, 785 700, 755 668
  C 720 632, 685 595, 645 555
  C 605 510, 565 470, 525 432
  C 485 392, 445 354, 405 320
  C 365 290, 325 275, 305 270
  C 290 264, 280 258, 290 250
  Z
`.trim();

const HILL_PATHS = [
  'M 410 268 Q 470 248 540 280 Q 610 308 670 322',
  'M 480 348 Q 540 330 600 372 Q 660 410 720 442',
  'M 580 442 Q 640 422 710 460 Q 770 490 830 510',
  'M 690 540 Q 740 525 790 552 Q 850 590 900 600',
  'M 820 620 Q 870 610 910 638 Q 950 660 990 668',
];

const TREES: Array<[number, number, 'c' | 'o']> = [
  [420, 240, 'c'], [490, 270, 'o'], [560, 320, 'c'], [620, 290, 'o'],
  [680, 350, 'c'], [580, 410, 'o'], [510, 380, 'c'], [640, 440, 'c'],
  [720, 420, 'o'], [780, 460, 'c'], [840, 510, 'c'], [900, 540, 'o'],
  [780, 540, 'c'], [840, 600, 'o'], [700, 510, 'c'], [600, 480, 'c'],
  [500, 340, 'o'], [470, 310, 'c'], [780, 380, 'o'], [880, 480, 'c'],
  [930, 580, 'c'], [870, 660, 'c'], [800, 670, 'o'], [710, 650, 'c'],
  [615, 590, 'o'], [555, 540, 'c'], [475, 480, 'o'], [425, 420, 'c'],
  [385, 350, 'o'], [340, 295, 'c'], [1030, 660, 'c'], [990, 690, 'c'],
];

interface Placed extends Monastery {
  x: number;
  y: number;
}

function variantFor(m: Monastery): 'onion' | 'twin' | 'cliff' | 'classic' {
  if (m.tradition === 'Russian') return 'onion';
  if (m.tradition === 'Serbian' || m.tradition === 'Bulgarian') return 'twin';
  if (
    m.slug === 'simonopetra' ||
    m.slug === 'dionysiou' ||
    m.slug === 'agiou-pavlou'
  )
    return 'cliff';
  return 'classic';
}

export function MedievalMap({ onNavigate, selectedSlug }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  const monasteries: Placed[] = useMemo(
    () =>
      MONASTERIES.map((m) => {
        const [x, y] = project(m.lng, m.lat);
        return { ...m, x, y };
      }),
    [],
  );
  const ports = useMemo(
    () => PORTS.map((p) => {
      const [x, y] = project(p.lng, p.lat);
      return { ...p, x, y };
    }),
    [],
  );
  const [mtX, mtY] = project(24.327, 40.157);
  const labelTarget = hovered ?? selectedSlug ?? null;
  const labelMonastery = monasteries.find((m) => m.slug === labelTarget);

  return (
    <div className="medieval-map">
      <svg
        viewBox={`0 ${-SKY_H} ${VIEW_W} ${MAP_H + SKY_H}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Painted Byzantine map of Mount Athos and the twenty ruling monasteries, with the Theotokos and two angels in the sky band above"
      >
        <defs>
          <linearGradient id="fresco-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.skyLight} />
            <stop offset="100%" stopColor={C.sky} />
          </linearGradient>
          <linearGradient id="fresco-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.seaLight} />
            <stop offset="100%" stopColor={C.seaDeep} />
          </linearGradient>
          <radialGradient id="fresco-land" cx="0.45" cy="0.5" r="0.65">
            <stop offset="0%" stopColor={C.landLight} />
            <stop offset="100%" stopColor={C.landMid} />
          </radialGradient>
          <radialGradient id="halo-gold" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor={C.goldBright} />
            <stop offset="60%" stopColor={C.gold} />
            <stop offset="100%" stopColor={C.goldDeep} />
          </radialGradient>

          <pattern
            id="fresco-grain"
            x="0"
            y="0"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <rect width="160" height="160" fill="transparent" />
            <circle cx="20" cy="40" r="0.6" fill={C.inkSoft} opacity="0.12" />
            <circle cx="80" cy="120" r="0.5" fill={C.inkSoft} opacity="0.1" />
            <circle cx="140" cy="60" r="0.5" fill={C.inkSoft} opacity="0.1" />
            <circle cx="60" cy="20" r="0.4" fill={C.inkSoft} opacity="0.08" />
            <circle cx="120" cy="100" r="0.7" fill={C.inkSoft} opacity="0.13" />
            <path
              d="M 30 80 Q 50 78 70 82"
              stroke={C.inkSoft}
              strokeWidth="0.3"
              fill="none"
              opacity="0.08"
            />
          </pattern>

          <symbol id="m-classic" viewBox="-20 -52 40 52" overflow="visible">
            <ellipse cx="0" cy="-1" rx="20" ry="3" fill="rgba(46,38,24,0.28)" />
            <path
              d="M -18 -2 L -18 -22 L -14 -26 L -14 -30 L 14 -30 L 14 -26 L 18 -22 L 18 -2 Z"
              fill={C.wall}
              stroke={C.ink}
              strokeWidth="0.8"
            />
            <path d="M 12 -2 L 12 -30 L 14 -30 L 14 -2 Z" fill={C.wallShade} opacity="0.7" />
            <path
              d="M -14 -30 L -14 -33 L -11 -33 L -11 -30 M -8 -30 L -8 -33 L -5 -33 L -5 -30 M -2 -30 L -2 -33 L 2 -33 L 2 -30 M 5 -30 L 5 -33 L 8 -33 L 8 -30 M 11 -30 L 11 -33 L 14 -33 L 14 -30"
              fill={C.wall}
              stroke={C.ink}
              strokeWidth="0.5"
            />
            <rect x="-19.5" y="-36" width="6" height="34" fill={C.wall} stroke={C.ink} strokeWidth="0.6" />
            <rect x="13.5" y="-36" width="6" height="34" fill={C.wall} stroke={C.ink} strokeWidth="0.6" />
            <path d="M -19.5 -36 L -16.5 -41 L -13.5 -36 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.5" />
            <path d="M 13.5 -36 L 16.5 -41 L 19.5 -36 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.5" />
            <rect x="-17.4" y="-26" width="1.2" height="3" fill={C.ink} opacity="0.7" />
            <rect x="-17.4" y="-18" width="1.2" height="3" fill={C.ink} opacity="0.7" />
            <rect x="15.2" y="-26" width="1.2" height="3" fill={C.ink} opacity="0.7" />
            <rect x="15.2" y="-18" width="1.2" height="3" fill={C.ink} opacity="0.7" />
            <rect x="-10.5" y="-24" width="7" height="14" fill={C.wall} stroke={C.ink} strokeWidth="0.5" />
            <path d="M -10.5 -24 L -7 -28 L -3.5 -24 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.45" />
            <rect x="3.5" y="-24" width="7" height="14" fill={C.wall} stroke={C.ink} strokeWidth="0.5" />
            <path d="M 3.5 -24 L 7 -28 L 10.5 -24 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.45" />
            <rect x="-4" y="-16" width="8" height="14" fill={C.wallLight} stroke={C.ink} strokeWidth="0.6" />
            <rect x="-6.5" y="-12" width="13" height="3" fill={C.wallLight} stroke={C.ink} strokeWidth="0.45" />
            <rect x="-3" y="-22" width="6" height="6" fill={C.wallLight} stroke={C.ink} strokeWidth="0.5" />
            <path d="M -4 -22 Q -4 -29 0 -31 Q 4 -29 4 -22 Z" fill="url(#halo-gold)" stroke={C.ink} strokeWidth="0.5" />
            <line x1="0" y1="-31" x2="0" y2="-42" stroke={C.ink} strokeWidth="0.8" />
            <line x1="-3" y1="-37" x2="3" y2="-37" stroke={C.ink} strokeWidth="0.7" />
            <line x1="-1.5" y1="-40" x2="1.5" y2="-40" stroke={C.ink} strokeWidth="0.55" />
            <rect x="-2" y="-7" width="4" height="5" fill={C.ink} />
            <path d="M -2 -5 Q 0 -7 2 -5" stroke={C.wallLight} strokeWidth="0.5" fill="none" />
            <rect x="-8.5" y="-20" width="1" height="2" fill={C.ink} opacity="0.7" />
            <rect x="-8.5" y="-15" width="1" height="2" fill={C.ink} opacity="0.7" />
            <rect x="7.5" y="-20" width="1" height="2" fill={C.ink} opacity="0.7" />
            <rect x="7.5" y="-15" width="1" height="2" fill={C.ink} opacity="0.7" />
          </symbol>

          <symbol id="m-onion" viewBox="-20 -54 40 54" overflow="visible">
            <ellipse cx="0" cy="-1" rx="20" ry="3" fill="rgba(46,38,24,0.28)" />
            <path d="M -18 -2 L -18 -22 L -14 -26 L -14 -30 L 14 -30 L 14 -26 L 18 -22 L 18 -2 Z" fill={C.wall} stroke={C.ink} strokeWidth="0.8" />
            <path d="M 12 -2 L 12 -30 L 14 -30 L 14 -2 Z" fill={C.wallShade} opacity="0.7" />
            <path d="M -14 -30 L -14 -33 L -11 -33 L -11 -30 M -8 -30 L -8 -33 L -5 -33 L -5 -30 M -2 -30 L -2 -33 L 2 -33 L 2 -30 M 5 -30 L 5 -33 L 8 -33 L 8 -30 M 11 -30 L 11 -33 L 14 -33 L 14 -30" fill={C.wall} stroke={C.ink} strokeWidth="0.5" />
            <rect x="-19.5" y="-38" width="5.5" height="36" fill={C.wall} stroke={C.ink} strokeWidth="0.6" />
            <rect x="14" y="-38" width="5.5" height="36" fill={C.wall} stroke={C.ink} strokeWidth="0.6" />
            <path d="M -19.5 -38 Q -16.75 -44 -14 -38 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.5" />
            <path d="M 14 -38 Q 16.75 -44 19.5 -38 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.5" />
            <rect x="-10.5" y="-24" width="7" height="14" fill={C.wall} stroke={C.ink} strokeWidth="0.5" />
            <path d="M -10.5 -24 L -7 -28 L -3.5 -24 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.45" />
            <rect x="3.5" y="-24" width="7" height="14" fill={C.wall} stroke={C.ink} strokeWidth="0.5" />
            <path d="M 3.5 -24 L 7 -28 L 10.5 -24 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.45" />
            <rect x="-4" y="-16" width="8" height="14" fill={C.wallLight} stroke={C.ink} strokeWidth="0.6" />
            <rect x="-3" y="-23" width="6" height="6" fill={C.wallLight} stroke={C.ink} strokeWidth="0.5" />
            <path
              d="M -5 -23 Q -7 -28 -4 -33 Q -2 -38 0 -39 Q 2 -38 4 -33 Q 7 -28 5 -23 Z"
              fill="url(#halo-gold)"
              stroke={C.ink}
              strokeWidth="0.5"
            />
            <line x1="0" y1="-39" x2="0" y2="-50" stroke={C.ink} strokeWidth="0.8" />
            <line x1="-3" y1="-45" x2="3" y2="-45" stroke={C.ink} strokeWidth="0.7" />
            <rect x="-2" y="-7" width="4" height="5" fill={C.ink} />
          </symbol>

          <symbol id="m-twin" viewBox="-20 -52 40 52" overflow="visible">
            <ellipse cx="0" cy="-1" rx="20" ry="3" fill="rgba(46,38,24,0.28)" />
            <path d="M -18 -2 L -18 -22 L -14 -26 L -14 -30 L 14 -30 L 14 -26 L 18 -22 L 18 -2 Z" fill={C.wall} stroke={C.ink} strokeWidth="0.8" />
            <path d="M 12 -2 L 12 -30 L 14 -30 L 14 -2 Z" fill={C.wallShade} opacity="0.7" />
            <path d="M -14 -30 L -14 -33 L -11 -33 L -11 -30 M -8 -30 L -8 -33 L -5 -33 L -5 -30 M -2 -30 L -2 -33 L 2 -33 L 2 -30 M 5 -30 L 5 -33 L 8 -33 L 8 -30 M 11 -30 L 11 -33 L 14 -33 L 14 -30" fill={C.wall} stroke={C.ink} strokeWidth="0.5" />
            <rect x="-3" y="-40" width="6" height="38" fill={C.wall} stroke={C.ink} strokeWidth="0.7" />
            <path d="M -3 -40 L 0 -44 L 3 -40 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.5" />
            <rect x="-2" y="-7" width="4" height="5" fill={C.ink} />
            <rect x="-1.4" y="-35" width="1" height="2" fill={C.ink} opacity="0.7" />
            <rect x="0.4" y="-35" width="1" height="2" fill={C.ink} opacity="0.7" />
            <rect x="-13" y="-22" width="7" height="20" fill={C.wall} stroke={C.ink} strokeWidth="0.55" />
            <path d="M -13 -22 L -9.5 -26 L -6 -22 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.45" />
            <rect x="6" y="-22" width="7" height="20" fill={C.wall} stroke={C.ink} strokeWidth="0.55" />
            <path d="M 6 -22 L 9.5 -26 L 13 -22 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.45" />
          </symbol>

          <symbol id="m-cliff" viewBox="-20 -54 40 54" overflow="visible">
            <path
              d="M -19 0 L -16 -10 L -10 -13 L -4 -10 L 0 -13 L 4 -9 L 10 -12 L 14 -8 L 19 0 Z"
              fill={C.skinShade}
              stroke={C.ink}
              strokeWidth="0.7"
            />
            <path d="M -12 -3 L -10 -10 M -4 -3 L -3 -11 M 5 -3 L 6 -10 M 12 -3 L 12 -8" stroke={C.ink} strokeWidth="0.3" opacity="0.6" />
            <rect x="-14" y="-32" width="5" height="20" fill={C.wall} stroke={C.ink} strokeWidth="0.55" />
            <path d="M -14 -32 L -11.5 -36 L -9 -32 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.4" />
            <rect x="9" y="-32" width="5" height="20" fill={C.wall} stroke={C.ink} strokeWidth="0.55" />
            <path d="M 9 -32 L 11.5 -36 L 14 -32 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.4" />
            <rect x="-9" y="-26" width="18" height="14" fill={C.wall} stroke={C.ink} strokeWidth="0.55" />
            <line x1="-9" y1="-21" x2="9" y2="-21" stroke={C.ink} strokeWidth="0.3" opacity="0.7" />
            <line x1="-9" y1="-17" x2="9" y2="-17" stroke={C.ink} strokeWidth="0.3" opacity="0.7" />
            <rect x="-3" y="-32" width="6" height="6" fill={C.wallLight} stroke={C.ink} strokeWidth="0.5" />
            <path d="M -4 -32 Q -4 -38 0 -40 Q 4 -38 4 -32 Z" fill="url(#halo-gold)" stroke={C.ink} strokeWidth="0.5" />
            <line x1="0" y1="-40" x2="0" y2="-50" stroke={C.ink} strokeWidth="0.7" />
            <line x1="-3" y1="-45" x2="3" y2="-45" stroke={C.ink} strokeWidth="0.6" />
            <rect x="-9.5" y="-23" width="1" height="2" fill={C.ink} opacity="0.7" />
            <rect x="-9.5" y="-18" width="1" height="2" fill={C.ink} opacity="0.7" />
            <rect x="8.5" y="-23" width="1" height="2" fill={C.ink} opacity="0.7" />
            <rect x="8.5" y="-18" width="1" height="2" fill={C.ink} opacity="0.7" />
          </symbol>

          <symbol id="m-cypress" viewBox="-4 -18 8 18" overflow="visible">
            <ellipse cx="0" cy="0" rx="2.5" ry="0.7" fill="rgba(46,38,24,0.25)" />
            <rect x="-0.5" y="-3" width="1" height="3" fill={C.inkSoft} />
            <path
              d="M 0 -17 Q -3 -12 -3 -6 Q -3 -1 0 -1 Q 3 -1 3 -6 Q 3 -12 0 -17 Z"
              fill={C.landDeep}
              stroke={C.ink}
              strokeWidth="0.3"
            />
            <path
              d="M 0 -17 Q 1 -12 1 -6 Q 1 -1 0 -1"
              fill="none"
              stroke={C.landMid}
              strokeWidth="0.5"
              opacity="0.7"
            />
          </symbol>

          <symbol id="m-olive" viewBox="-5 -10 10 10" overflow="visible">
            <ellipse cx="0" cy="0" rx="4" ry="0.6" fill="rgba(46,38,24,0.22)" />
            <rect x="-0.5" y="-2" width="1" height="2" fill={C.inkSoft} />
            <ellipse cx="-1.6" cy="-5" rx="2.5" ry="2.8" fill={C.landMid} stroke={C.ink} strokeWidth="0.3" />
            <ellipse cx="1.6" cy="-5" rx="2.5" ry="2.8" fill={C.land} stroke={C.ink} strokeWidth="0.3" />
            <ellipse cx="0" cy="-7" rx="2.5" ry="2.5" fill={C.landLight} stroke={C.ink} strokeWidth="0.3" />
          </symbol>

          <symbol id="m-anchor" viewBox="-14 -16 28 32" overflow="visible">
            <ellipse cx="0" cy="14" rx="11" ry="1.4" fill="rgba(46,38,24,0.3)" />
            <line x1="0" y1="-11" x2="0" y2="11" stroke={C.ink} strokeWidth="1.3" />
            <line x1="-5" y1="-7" x2="5" y2="-7" stroke={C.ink} strokeWidth="1.3" />
            <path d="M -9 5 Q -9 12 0 12 Q 9 12 9 5" fill="none" stroke={C.ink} strokeWidth="1.3" />
            <line x1="-9" y1="5" x2="-12" y2="3" stroke={C.ink} strokeWidth="1.2" />
            <line x1="9" y1="5" x2="12" y2="3" stroke={C.ink} strokeWidth="1.2" />
            <circle cx="0" cy="-11" r="2.4" fill={C.roof} stroke={C.ink} strokeWidth="0.9" />
          </symbol>
        </defs>

        <g>
          <rect x="0" y={-SKY_H} width={VIEW_W} height={SKY_H} fill="url(#fresco-sky)" />
          <rect x="0" y={-SKY_H} width={VIEW_W} height={SKY_H} fill="url(#fresco-grain)" />

          <g opacity="0.5">
            <ellipse cx="150" cy={-90} rx="80" ry="14" fill={C.skyLight} />
            <ellipse cx="320" cy={-130} rx="55" ry="10" fill={C.skyLight} />
            <ellipse cx="880" cy={-100} rx="70" ry="14" fill={C.skyLight} />
            <ellipse cx="1060" cy={-130} rx="60" ry="12" fill={C.skyLight} />
          </g>

          <g>
            <path
              d="M 220 -148 Q 600 -172 980 -148 L 980 -120 Q 600 -140 220 -120 Z"
              fill={C.wallLight}
              stroke={C.ink}
              strokeWidth="1"
            />
            <path
              d="M 226 -144 Q 600 -168 974 -144 L 974 -123 Q 600 -136 226 -123 Z"
              fill="none"
              stroke={C.inkSoft}
              strokeWidth="0.5"
            />
            <text
              x="600"
              y="-130"
              textAnchor="middle"
              fontFamily="'Cinzel Decorative', 'Cardo', serif"
              fontWeight="900"
              fontSize="18"
              letterSpacing="9"
              fill={C.maphorion}
            >
              ΑΓΙΟΝ ΟΡΟΣ
            </text>
            <text x="180" y="-132" textAnchor="middle" fontFamily="'Cardo', serif" fontStyle="italic" fontSize="11" fill={C.maphorion}>☩</text>
            <text x="1020" y="-132" textAnchor="middle" fontFamily="'Cardo', serif" fontStyle="italic" fontSize="11" fill={C.maphorion}>☩</text>
          </g>

          {/* Central Theotokos — 11th-century Novgorod "Sign" icon
              (Theotokos in orant pose with Christ Child medallion on her
              chest). Public-domain medieval artwork; see public/icons/CREDITS.md.
              Frame extends y=-118 to y=-4 in absolute coords (inside the
              sky band y∈[-180, 0]). */}
          <g transform="translate(600 -61)">
            <ellipse cx="0" cy="0" rx="74" ry="80" fill="url(#halo-gold)" opacity="0.32" />
            <rect x="-48" y="-55" width="96" height="112" fill="rgba(46,38,24,0.4)" transform="translate(2 3)" />
            <rect x="-50" y="-57" width="100" height="116" fill={C.gold} />
            <rect x="-47" y="-54" width="94" height="110" fill={C.goldDeep} />
            <rect x="-45" y="-52" width="90" height="106" fill={C.wallLight} />
            <image
              href={`${ICONS_BASE}theotokos.jpg`}
              x="-45"
              y="-52"
              width="90"
              height="106"
              preserveAspectRatio="xMidYMid slice"
            />
            <g fill={C.maphorion} fontSize="9" fontFamily="Cardo, serif" textAnchor="middle">
              <text x="-55" y="-54">☩</text>
              <text x="55" y="-54">☩</text>
              <text x="-55" y="60">☩</text>
              <text x="55" y="60">☩</text>
            </g>
            <text x="-66" y="-28" textAnchor="middle" fontFamily="Cardo, serif" fontSize="12" fontWeight="700" fill={C.maphorion}>ΜΡ</text>
            <line x1="-74" y1="-32" x2="-58" y2="-32" stroke={C.maphorion} strokeWidth="0.6" />
            <text x="66" y="-28" textAnchor="middle" fontFamily="Cardo, serif" fontSize="12" fontWeight="700" fill={C.maphorion}>ΘΥ</text>
            <line x1="58" y1="-32" x2="74" y2="-32" stroke={C.maphorion} strokeWidth="0.6" />
          </g>

          {/* Left archangel — 13th-century Byzantine icon (Mikharkhangel).
              Public-domain medieval artwork; see public/icons/CREDITS.md.
              Shown in original orientation so the figure faces the centre. */}
          <g transform="translate(420 -55)">
            <ellipse cx="0" cy="0" rx="56" ry="64" fill="url(#halo-gold)" opacity="0.28" />
            <rect x="-38" y="-44" width="76" height="92" fill="rgba(46,38,24,0.4)" transform="translate(2 3)" />
            <rect x="-40" y="-46" width="80" height="96" fill={C.gold} />
            <rect x="-37" y="-43" width="74" height="90" fill={C.goldDeep} />
            <rect x="-35" y="-41" width="70" height="86" fill={C.wallLight} />
            <image
              href={`${ICONS_BASE}archangel.jpg`}
              x="-35"
              y="-41"
              width="70"
              height="86"
              preserveAspectRatio="xMidYMid slice"
            />
            <g fill={C.maphorion} fontSize="7.5" fontFamily="Cardo, serif" textAnchor="middle">
              <text x="-44" y="-44">☩</text>
              <text x="44" y="-44">☩</text>
              <text x="-44" y="52">☩</text>
              <text x="44" y="52">☩</text>
            </g>
          </g>

          {/* Right archangel — same icon mirrored, so the figure faces the
              centre (toward the Theotokos). The frame stays unflipped. */}
          <g transform="translate(780 -55)">
            <ellipse cx="0" cy="0" rx="56" ry="64" fill="url(#halo-gold)" opacity="0.28" />
            <rect x="-38" y="-44" width="76" height="92" fill="rgba(46,38,24,0.4)" transform="translate(2 3)" />
            <rect x="-40" y="-46" width="80" height="96" fill={C.gold} />
            <rect x="-37" y="-43" width="74" height="90" fill={C.goldDeep} />
            <rect x="-35" y="-41" width="70" height="86" fill={C.wallLight} />
            <g transform="scale(-1 1)">
              <image
                href={`${ICONS_BASE}archangel.jpg`}
                x="-35"
                y="-41"
                width="70"
                height="86"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
            <g fill={C.maphorion} fontSize="7.5" fontFamily="Cardo, serif" textAnchor="middle">
              <text x="-44" y="-44">☩</text>
              <text x="44" y="-44">☩</text>
              <text x="-44" y="52">☩</text>
              <text x="44" y="52">☩</text>
            </g>
          </g>
        </g>

        <rect x="0" y="0" width={VIEW_W} height={MAP_H} fill="url(#fresco-sea)" />

        <g stroke={C.seaDeep} strokeWidth="0.9" fill="none" opacity="0.45" strokeLinecap="round">
          <path d="M 100 380 Q 130 376 160 380 T 220 380" />
          <path d="M 180 480 Q 210 476 240 480 T 300 480" />
          <path d="M 1080 200 Q 1110 196 1140 200 T 1180 200" />
          <path d="M 1100 320 Q 1130 316 1160 320 T 1180 320" />
          <path d="M 60 600 Q 90 596 120 600 T 180 600" />
          <path d="M 1080 440 Q 1110 436 1140 440 T 1180 440" />
          <path d="M 850 770 Q 880 766 910 770 T 980 770" />
          <path d="M 220 720 Q 250 716 280 720 T 340 720" />
          <path d="M 360 780 Q 390 776 420 780 T 480 780" />
          <path d="M 1060 760 Q 1090 756 1120 760 T 1180 760" />
        </g>

        <text x="200" y="600" fontFamily="'Cinzel Decorative', 'Cardo', serif" fontSize="22" fill={C.seaDeep} opacity="0.6" letterSpacing="8">ΑΙΓΑΙΟ</text>
        <text x="200" y="624" fontFamily="'Cardo', serif" fontStyle="italic" fontSize="13" fill={C.seaDeep} opacity="0.6" letterSpacing="2">πέλαγος</text>

        <g transform="translate(240 600) rotate(-4)">
          <path d="M -34 18 Q 0 28 34 18 L 26 26 L -26 26 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.8" />
          <path d="M -28 22 Q 0 24 28 22" stroke={C.roofDark} strokeWidth="0.5" fill="none" />
          <line x1="0" y1="18" x2="0" y2="-24" stroke={C.ink} strokeWidth="1" />
          <path d="M 0 -22 Q 22 -8 0 14 Z" fill={C.tunic} stroke={C.ink} strokeWidth="0.6" />
          <line x1="0" y1="-18" x2="0" y2="10" stroke={C.maphorion} strokeWidth="0.9" />
          <line x1="-6" y1="-4" x2="6" y2="-4" stroke={C.maphorion} strokeWidth="0.9" />
          <line x1="0" y1="-24" x2="10" y2="-24" stroke={C.maphorion} strokeWidth="0.5" />
          <g stroke={C.ink} strokeWidth="0.5">
            <line x1="-22" y1="22" x2="-26" y2="30" />
            <line x1="-14" y1="22" x2="-18" y2="30" />
            <line x1="-6" y1="22" x2="-10" y2="30" />
            <line x1="6" y1="22" x2="10" y2="30" />
            <line x1="14" y1="22" x2="18" y2="30" />
            <line x1="22" y1="22" x2="26" y2="30" />
          </g>
        </g>

        <g transform="translate(900 760) rotate(2)">
          <path d="M -18 4 Q 0 10 18 4 L 14 8 L -14 8 Z" fill={C.tunic} stroke={C.ink} strokeWidth="0.6" />
          <line x1="0" y1="4" x2="0" y2="-12" stroke={C.ink} strokeWidth="0.7" />
          <path d="M 0 -10 Q 10 -2 0 6 Z" fill={C.tunic} stroke={C.ink} strokeWidth="0.4" />
        </g>

        <g>
          <path d={PENINSULA_PATH} fill="url(#fresco-land)" stroke={C.ink} strokeWidth="1.7" strokeLinejoin="round" />
          <path d={PENINSULA_PATH} fill="url(#fresco-grain)" />
          <g fill="none" stroke={C.landShade} strokeWidth="1.4" opacity="0.55" strokeLinecap="round">
            {HILL_PATHS.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
          <g fill="none" stroke={C.landDeep} strokeWidth="0.9" opacity="0.4" strokeLinecap="round">
            {HILL_PATHS.map((d, i) => (
              <path key={i} d={d} transform="translate(2 6)" />
            ))}
          </g>
          <g fill="none" stroke={C.landLight} strokeWidth="0.9" opacity="0.55" strokeLinecap="round">
            {HILL_PATHS.map((d, i) => (
              <path key={i} d={d} transform="translate(-2 -5)" />
            ))}
          </g>
          <path
            d="M 870 565 Q 800 580 740 600 Q 680 620 600 640"
            fill="none"
            stroke={C.road}
            strokeWidth="2.2"
            strokeDasharray="5 4"
            opacity="0.75"
            strokeLinecap="round"
          />
        </g>

        <g>
          {TREES.map(([x, y, kind], i) =>
            kind === 'c' ? (
              <use key={i} href="#m-cypress" x={x - 4} y={y - 18} width="8" height="18" />
            ) : (
              <use key={i} href="#m-olive" x={x - 5} y={y - 10} width="10" height="10" />
            ),
          )}
        </g>

        <g transform={`translate(${mtX} ${mtY})`}>
          <path
            d="M -54 12 L -22 -64 L -8 -30 L 12 -58 L 32 -42 L 54 12 Z"
            fill={C.landMid}
            stroke={C.ink}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <g stroke={C.landDeep} strokeWidth="1.1" opacity="0.55" fill="none" strokeLinecap="round">
            <path d="M -22 -64 Q -30 -34 -42 0" />
            <path d="M -18 -54 Q -26 -24 -34 6" />
            <path d="M -14 -42 Q -22 -14 -28 8" />
          </g>
          <g stroke={C.landLight} strokeWidth="1" opacity="0.6" fill="none" strokeLinecap="round">
            <path d="M 12 -58 Q 22 -32 32 -8" />
            <path d="M 18 -48 Q 28 -22 38 0" />
          </g>
          <path
            d="M -22 -64 L -18 -58 L -12 -60 L -6 -54 L 0 -56 L 6 -50 L 12 -58 Q -8 -56 -22 -64 Z"
            fill={C.skyLight}
            stroke={C.inkSoft}
            strokeWidth="0.5"
          />
          <rect x="-23" y="-72" width="3" height="5" fill={C.wall} stroke={C.ink} strokeWidth="0.4" />
          <path d="M -23 -72 L -21.5 -74 L -20 -72 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.3" />
          <line x1="-21.5" y1="-74" x2="-21.5" y2="-80" stroke={C.ink} strokeWidth="0.5" />
          <line x1="-23" y1="-77.5" x2="-20" y2="-77.5" stroke={C.ink} strokeWidth="0.4" />
          <text x="0" y="26" textAnchor="middle" fontFamily="'Cardo', serif" fontStyle="italic" fontSize="13" fill={C.ink}>Ἄθως</text>
          <text x="0" y="40" textAnchor="middle" fontFamily="'Cardo', serif" fontStyle="italic" fontSize="10" fill={C.inkSoft} letterSpacing="2">⸻  Mons Athos  ⸻</text>
        </g>

        <g transform="translate(160 700)">
          <circle cx="0" cy="0" r="42" fill={C.wallLight} stroke={C.ink} strokeWidth="0.9" opacity="0.92" />
          <circle cx="0" cy="0" r="36" fill="none" stroke={C.ink} strokeWidth="0.4" />
          <g stroke={C.ink} strokeWidth="0.35">
            {Array.from({ length: 32 }).map((_, i) => {
              const a = (i / 32) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={Math.cos(a) * 36}
                  y1={Math.sin(a) * 36}
                  x2={Math.cos(a) * 42}
                  y2={Math.sin(a) * 42}
                />
              );
            })}
          </g>
          <g stroke={C.ink} strokeWidth="0.5">
            <path d="M 0 -36 L -6 0 L 6 0 Z" fill={C.maphorion} />
            <path d="M 0 36 L -6 0 L 6 0 Z" fill={C.wallShade} />
            <path d="M 36 0 L 0 -6 L 0 6 Z" fill={C.wallShade} />
            <path d="M -36 0 L 0 -6 L 0 6 Z" fill={C.wallShade} />
            <path d="M 26 -26 L -3 -3 L 3 3 Z" fill={C.greenRobe} opacity="0.9" />
            <path d="M -26 26 L 3 3 L -3 -3 Z" fill={C.greenRobe} opacity="0.9" />
            <path d="M 26 26 L -3 3 L 3 -3 Z" fill={C.greenRobe} opacity="0.9" />
            <path d="M -26 -26 L 3 -3 L -3 3 Z" fill={C.greenRobe} opacity="0.9" />
          </g>
          <circle cx="0" cy="0" r="4" fill={C.gold} stroke={C.ink} strokeWidth="0.5" />
          <text x="0" y="-46" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="10" fill={C.ink} letterSpacing="1">Β</text>
          <text x="0" y="51" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="10" fill={C.ink} letterSpacing="1">Ν</text>
          <text x="49" y="3.5" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="10" fill={C.ink} letterSpacing="1">Α</text>
          <text x="-49" y="3.5" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="10" fill={C.ink} letterSpacing="1">Δ</text>
        </g>

        <g>
          {monasteries.map((m, i) => {
            const variant = variantFor(m);
            const symbolId = `m-${variant}`;
            const isSelected = m.slug === selectedSlug;
            const isHovered = m.slug === hovered;
            const isLit = isSelected || isHovered;
            const w = isLit ? 50 : 40;
            const h = isLit ? 64 : 52;
            return (
              <g key={m.slug} transform={`translate(${m.x} ${m.y})`}>
                <g
                  className={`mm-monastery ${isLit ? 'is-lit' : ''}`}
                  onMouseEnter={() => setHovered(m.slug)}
                  onMouseLeave={() =>
                    setHovered((cur) => (cur === m.slug ? null : cur))
                  }
                  onClick={() =>
                    onNavigate({ kind: 'monastery', slug: m.slug })
                  }
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <rect
                    x="-28"
                    y={-h - 4}
                    width="56"
                    height={h + 32}
                    fill="none"
                    pointerEvents="all"
                  />
                  {isLit && (
                    <ellipse
                      cx="0"
                      cy="-24"
                      rx="36"
                      ry="42"
                      fill="url(#halo-gold)"
                      opacity="0.4"
                    />
                  )}
                  <use
                    href={`#${symbolId}`}
                    x={-w / 2}
                    y={-h}
                    width={w}
                    height={h}
                  />
                  <g transform="translate(0 10)">
                    <circle
                      cx="0"
                      cy="0"
                      r="8.5"
                      fill={isLit ? C.goldBright : C.wallLight}
                      stroke={C.ink}
                      strokeWidth="0.8"
                    />
                    <text
                      x="0"
                      y="0.5"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontFamily="'Cinzel', serif"
                      fontWeight="700"
                      fontSize="10"
                      fill={C.ink}
                    >
                      {m.hierarchyOrder}
                    </text>
                  </g>
                </g>
              </g>
            );
          })}
        </g>

        <g>
          {ports.map((p) => {
            const isCapital = p.id === 'karyes';
            return (
              <g key={p.id} transform={`translate(${p.x} ${p.y})`} className="mm-port">
                {isCapital ? (
                  <g>
                    <ellipse cx="0" cy="8" rx="14" ry="2" fill="rgba(46,38,24,0.25)" />
                    <rect x="-10" y="-2" width="20" height="8" fill={C.wall} stroke={C.ink} strokeWidth="0.55" />
                    <path d="M -10 -4 L -10 -8 L -6 -8 L -6 -4 M -2 -4 L -2 -8 L 2 -8 L 2 -4 M 6 -4 L 6 -8 L 10 -8 L 10 -4" fill={C.wall} stroke={C.ink} strokeWidth="0.45" />
                    <rect x="-3" y="-14" width="6" height="12" fill={C.wall} stroke={C.ink} strokeWidth="0.5" />
                    <path d="M -3 -14 L 0 -18 L 3 -14 Z" fill={C.roof} stroke={C.ink} strokeWidth="0.4" />
                    <line x1="0" y1="-18" x2="0" y2="-24" stroke={C.ink} strokeWidth="0.5" />
                    <path d="M 0 -23 L 6 -21 L 0 -19 Z" fill={C.maphorion} stroke={C.ink} strokeWidth="0.3" />
                    <rect x="-1" y="2" width="2" height="4" fill={C.ink} />
                    <text x="0" y="22" textAnchor="middle" fontFamily="'Cardo', serif" fontStyle="italic" fontSize="12" fontWeight="700" fill={C.ink}>Καρυές</text>
                    <text x="0" y="34" textAnchor="middle" fontFamily="'Cardo', serif" fontStyle="italic" fontSize="9.5" fill={C.inkSoft}>capital · Karyes</text>
                  </g>
                ) : (
                  <g>
                    <use href="#m-anchor" x={-12} y={-14} width="24" height="28" />
                    <text x="0" y="22" textAnchor="middle" fontFamily="'Cardo', serif" fontStyle="italic" fontSize="12" fill={C.ink}>{p.name}</text>
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {labelMonastery && (
          <g
            style={{ pointerEvents: 'none' }}
            transform={`translate(${labelMonastery.x} ${labelMonastery.y})`}
          >
            <g className="mm-label-callout">
              <line
                x1="0"
                y1="-44"
                x2="0"
                y2="-66"
                stroke={C.ink}
                strokeWidth="0.7"
                strokeDasharray="2 2"
              />
              <g transform="translate(-100 -98)">
                <path
                  d="M 0 4 L 0 28 L 200 28 L 200 4 Q 200 0 196 0 L 4 0 Q 0 0 0 4 Z"
                  fill={C.wallLight}
                  stroke={C.ink}
                  strokeWidth="0.8"
                />
                <path
                  d="M 4 6 L 196 6 M 4 22 L 196 22"
                  stroke={C.maphorion}
                  strokeWidth="0.4"
                  opacity="0.6"
                />
                <text
                  x="100"
                  y="14"
                  textAnchor="middle"
                  fontFamily="'Cinzel', 'Cardo', serif"
                  fontWeight="700"
                  fontSize="11"
                  fill={C.ink}
                  letterSpacing="2"
                >
                  {labelMonastery.name.toUpperCase()}
                </text>
                <text
                  x="100"
                  y="25"
                  textAnchor="middle"
                  fontFamily="'Cardo', serif"
                  fontStyle="italic"
                  fontSize="10.5"
                  fill={C.maphorion}
                >
                  {labelMonastery.nameGreek}
                </text>
              </g>
            </g>
          </g>
        )}

        <rect
          x="4"
          y={-SKY_H + 4}
          width={VIEW_W - 8}
          height={MAP_H + SKY_H - 8}
          fill="none"
          stroke={C.ink}
          strokeWidth="2"
          pointerEvents="none"
        />
        <rect
          x="14"
          y={-SKY_H + 14}
          width={VIEW_W - 28}
          height={MAP_H + SKY_H - 28}
          fill="none"
          stroke={C.ink}
          strokeWidth="0.5"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
}
