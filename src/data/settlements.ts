import type { Settlement } from '../types';

// Below the twenty ruling monasteries, the Athonite peninsula is dotted with
// dependent settlements: the twelve traditional *sketes* (organised monastic
// villages or coenobitic communities, each subject to a parent monastery),
// and the older hermit settlements (γεροντάδες) — clusters of cells, kalyves
// and katounakia scattered along the cliffs and slopes.
//
// Sketes are listed in their conventional order; tradition follows the
// community's ethnic / liturgical use today. Coordinates come from
// OpenStreetMap and place each pin on the actual settlement — sufficient
// for orientation on the map view but not for navigation.
export const SETTLEMENTS: Settlement[] = [
  // ───────────── Sketes ─────────────
  {
    slug: 'skete-st-anne',
    name: 'Skete of St Anne',
    nameGreek: 'Σκήτη Ἁγίας Ἄννης',
    kind: 'skete',
    tradition: 'Greek',
    dependsOn: 'great-lavra',
    founded: '14th c.',
    patronalFeast: 'Dormition of St Anne (25 July / 7 August)',
    lat: 40.1405,
    lng: 24.2967,
    intro:
      'The oldest and largest of the Athonite sketes — an idiorrhythmic settlement of kalyves descending the south-west cliffs of Athos in stone terraces. The kyriakon enshrines the left foot of St Anne, the mother of the Theotokos, brought from Asia Minor in the 18th century.',
    notes: [
      'Subordinate to Great Lavra. Sometimes called "Megali Agia Anna" (Greater St Anne) to distinguish it from the nearby "Mikra Agia Anna" sub-skete.',
    ],
    links: [],
  },
  {
    slug: 'skete-nea',
    name: 'Nea Skete',
    nameGreek: 'Νέα Σκήτη',
    kind: 'skete',
    tradition: 'Greek',
    dependsOn: 'agiou-pavlou',
    founded: 'c. 1730',
    patronalFeast: 'Nativity of the Theotokos (8 / 21 September)',
    lat: 40.1473,
    lng: 24.2899,
    intro:
      'Idiorrhythmic skete a short walk north of St Anne, settled by monks who left the older skete seeking stricter solitude. Subject to the monastery of St Paul.',
    links: [],
  },
  {
    slug: 'skete-kafsokalyvia',
    name: 'Skete of Kafsokalyvia',
    nameGreek: 'Σκήτη Καυσοκαλυβίων',
    kind: 'skete',
    tradition: 'Greek',
    dependsOn: 'great-lavra',
    founded: 'organised 18th c.',
    patronalFeast: 'Holy Trinity (moveable, Pentecost)',
    lat: 40.1295,
    lng: 24.3414,
    intro:
      'Idiorrhythmic skete on the steep south-east slopes of Athos, named for St Maximos Kafsokalyvitis ("the Hut-Burner") who set fire to his hut whenever it grew too comfortable. Reorganised in the 18th century by St Akakios.',
    notes: [
      'Terminus of the small-boat service that runs east from Daphne along the south-east coast.',
    ],
    links: [],
  },
  {
    slug: 'skete-prodromou-romanian',
    name: 'Skete of Prodromou (Romanian)',
    nameGreek: 'Σκήτη Προδρόμου',
    kind: 'skete',
    tradition: 'Romanian',
    dependsOn: 'great-lavra',
    founded: '1857',
    patronalFeast: 'Nativity of St John the Baptist (24 June / 7 July)',
    lat: 40.1561,
    lng: 24.3852,
    intro:
      'The largest Romanian community on the Holy Mountain — a coenobitic skete on the south-east tip near Great Lavra, organised in the mid-19th century by Romanian monks from Moldavia.',
    links: [],
  },
  {
    slug: 'skete-iviron-prodromou',
    name: 'Skete of St John the Baptist',
    nameGreek: 'Σκήτη Τιμίου Προδρόμου',
    kind: 'skete',
    tradition: 'Greek',
    dependsOn: 'iviron',
    founded: '17th c.',
    patronalFeast: 'Beheading of St John the Baptist (29 August / 11 September)',
    lat: 40.2386,
    lng: 24.2759,
    intro:
      'Greek idiorrhythmic skete in the wooded hills above Iviron — traditionally a place of strict hesychia.',
    links: [],
  },
  {
    slug: 'skete-lakkou',
    name: 'Skete of Lakkou (Lacu)',
    nameGreek: 'Σκήτη Λάκκου',
    kind: 'skete',
    tradition: 'Romanian',
    dependsOn: 'great-lavra',
    founded: '18th c.',
    patronalFeast: 'St Demetrios the Myrrh-Streamer (26 October / 8 November)',
    lat: 40.1919,
    lng: 24.3183,
    intro:
      'Romanian idiorrhythmic skete hidden in a wooded valley in the interior — a community of small kalyves clustered around the kyriakon of St Demetrios.',
    links: [],
  },
  {
    slug: 'skete-st-demetrios',
    name: 'Skete of St Demetrios (Lakkos)',
    nameGreek: 'Σκήτη Ἁγίου Δημητρίου',
    kind: 'skete',
    tradition: 'Greek',
    dependsOn: 'agiou-pavlou',
    founded: '17th c.',
    patronalFeast: 'St Demetrios the Myrrh-Streamer (26 October / 8 November)',
    lat: 40.1605,
    lng: 24.2810,
    intro:
      'Greek idiorrhythmic skete on the south-west slope, dependent on the monastery of St Paul.',
    links: [],
  },
  {
    slug: 'skete-xenophontos',
    name: 'Skete of Xenophontos',
    nameGreek: 'Σκήτη Ξενοφῶντος',
    kind: 'skete',
    tradition: 'Greek',
    dependsOn: 'xenophontos',
    founded: '18th c.',
    patronalFeast: 'Nativity of the Theotokos (8 / 21 September)',
    lat: 40.2529,
    lng: 24.1998,
    intro:
      'Greek idiorrhythmic skete in the hills above its parent monastery on the south-west coast.',
    links: [],
  },
  {
    slug: 'skete-koutloumousiou',
    name: 'Skete of Koutloumousiou',
    nameGreek: 'Σκήτη Κουτλουμουσίου',
    kind: 'skete',
    tradition: 'Greek',
    dependsOn: 'koutloumousiou',
    founded: '18th c.',
    patronalFeast: 'Transfiguration of the Lord (6 / 19 August)',
    lat: 40.2537,
    lng: 24.2585,
    intro:
      'Greek idiorrhythmic skete a short walk from Karyes, subject to its parent monastery of Koutloumousiou.',
    links: [],
  },
  {
    slug: 'skete-profitis-ilias',
    name: 'Skete of the Prophet Elias',
    nameGreek: 'Σκήτη Προφήτου Ἠλιού',
    kind: 'skete',
    tradition: 'Greek',
    dependsOn: 'pantokratoros',
    founded: '1759',
    patronalFeast: 'Prophet Elias (20 July / 2 August)',
    lat: 40.2956,
    lng: 24.2622,
    intro:
      'Coenobitic skete founded by St Paisius Velichkovsky as a community of Slavic monks renewing the hesychast tradition. Originally Russian-occupied, now a Greek brotherhood.',
    links: [],
  },
  {
    slug: 'skete-st-andrew',
    name: 'Skete of St Andrew (Serai)',
    nameGreek: 'Σκήτη Ἁγίου Ἀνδρέου',
    kind: 'skete',
    tradition: 'Russian',
    dependsOn: 'vatopedi',
    founded: '1841',
    patronalFeast: 'St Andrew the First-Called (30 November / 13 December)',
    lat: 40.2622,
    lng: 24.2444,
    intro:
      'The great "Serai" — a vast coenobitic Russian skete built at the edge of Karyes in the 19th century. Dependent on Vatopedi, today a Greek-occupied skete.',
    links: [],
  },
  {
    slug: 'skete-bogoroditsa',
    name: 'Skete of the Theotokos (Bogoroditsa)',
    nameGreek: 'Σκήτη Βογορόδιτσα',
    kind: 'skete',
    tradition: 'Bulgarian',
    dependsOn: 'pantokratoros',
    founded: '17th c.',
    patronalFeast: 'Dormition of the Theotokos (15 / 28 August)',
    lat: 40.2924,
    lng: 24.2383,
    intro:
      'Coenobitic Bulgarian skete in the wooded interior of the peninsula — historically tied to the Bulgarian monastery of Zographou and to Russian Panteleimon.',
    links: [],
  },

  // ───────────── Hermit settlements (γεροντάδες) ─────────────
  {
    slug: 'karoulia',
    name: 'Karoulia',
    nameGreek: 'Καρούλια',
    kind: 'hermitage',
    dependsOn: 'great-lavra',
    founded: 'medieval origin',
    lat: 40.1226,
    lng: 24.2975,
    intro:
      'The most precipitous hermitages on the Mountain — solitary kalyves clinging to the south-west cliffs of Athos, traditionally reached by chains and rope ladders set into the rock. Provisions are hauled up in baskets ("karouli", the small windlass that gives the place its name).',
    notes: [
      'A place reserved for the strictest of Athonite hesychasts. There is no kyriakon and no road; access is by sea or on foot from St Anne.',
    ],
    links: [],
  },
  {
    slug: 'kapsala',
    name: 'Kapsala',
    nameGreek: 'Καψάλα',
    kind: 'hermitage',
    dependsOn: 'pantokratoros',
    founded: 'medieval origin',
    lat: 40.2701,
    lng: 24.2466,
    intro:
      'A loose scattering of hermit cells in the wooded slopes east of Karyes, settled since the early Athonite centuries and still home to a small community of ascetics.',
    links: [],
  },
  {
    slug: 'vigla',
    name: 'Vigla',
    nameGreek: 'Βίγλα',
    kind: 'hermitage',
    dependsOn: 'great-lavra',
    founded: 'medieval origin',
    lat: 40.1409,
    lng: 24.3909,
    intro:
      'Solitary cells along the eastern slope between Kafsokalyvia and Great Lavra. The name (βίγλα — "watchtower") refers to old coastal lookouts manned in case of pirate landings.',
    links: [],
  },
  {
    slug: 'provata',
    name: 'Provata',
    nameGreek: 'Προβάτα',
    kind: 'hermitage',
    dependsOn: 'great-lavra',
    founded: 'medieval origin',
    lat: 40.2135,
    lng: 24.3182,
    intro:
      'Interior hermit settlement above the east coast — a quiet Lavra-dependent enclave of kalyves in the chestnut forest.',
    links: [],
  },
  {
    slug: 'katounakia',
    name: 'Katounakia',
    nameGreek: 'Κατουνάκια',
    kind: 'hermitage',
    dependsOn: 'great-lavra',
    founded: 'organised 17th c.',
    patronalFeast: 'St Akakios of Kafsokalyvia (12 / 25 April)',
    lat: 40.1246,
    lng: 24.3008,
    intro:
      'A cluster of hermit kalyves on the south-west cliffs between Karoulia and St Anne, organised into something approaching a skete only in the 17th century with the building of the kyriakon.',
    links: [],
  },
];

export function findSettlement(slug: string): Settlement | undefined {
  return SETTLEMENTS.find((s) => s.slug === slug);
}
