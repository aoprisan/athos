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
    icons: [
      {
        name: 'Left foot of St Anne',
        description:
          'The incorrupt left foot of St Anne, the mother of the Theotokos and grandmother of the Lord — brought from Asia Minor in 1686 and enshrined in the kyriakon. The relic is venerated above all by women asking for the gift of a child; the petitions are forwarded by male relatives or read out by the monks themselves, since the avaton forbids women on the Mountain.',
      },
    ],
    legends: [
      {
        title: 'The grandmother of God',
        description:
          'The whole skete is regarded on the Mountain as her household. Pilgrims describe the air as smelling of bread baking — and indeed the cells along the path bake prosphora and traditional sweets, sold to support the kalyves. The feast on 25 July is the most heavily attended on the south-west cliffs.',
      },
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
    legends: [
      {
        title: 'The Hut-Burner',
        description:
          'St Maximos († 1365), the great hesychast known as "the fool for Christ" of Athos, lived in this stretch of cliff. Whenever a hut grew comfortable, or pilgrims began to seek him out and disturb his prayer, he would burn it down and move further into the rocks. The name "Kafsokalyvia" — "hut-burnings" — is his.',
      },
      {
        title: 'St Maximos in flight',
        description:
          'St Gregory the Sinaite, walking along the cliffs, met Maximos as he came down off a high rock. When asked how he had descended, Maximos answered: "An angel of the Lord carried me." Gregory recognised the gift of theoria in him and parted from him in awe.',
      },
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
    icons: [
      {
        name: 'Panagia Prodromitissa',
        nameGreek: 'Παναγία Προδρομίτισσα · Maica Domnului Prodromița',
        description:
          'A miraculous icon "not painted by hands": commissioned in 1853 from the Iași iconographer Iordache Nicolau, the face and hands of the Mother of God and the Child appeared overnight on the panel — the painter had left them unfinished, troubled that he could not get the expression right. The icon is the chief wonder-working image of the Romanian presence on Athos.',
      },
    ],
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
    legends: [
      {
        title: 'St Paisius Velichkovsky',
        description:
          'St Paisius came here in 1757 with 35 disciples and began the Slavonic translation of the Philokalia — the corpus of hesychast writings that would shape Orthodox spirituality across the Slavic world. When the brotherhood grew to over sixty, he moved on to Simonopetra and finally to Moldavia, founding the great monasteries of Dragomirna, Sekoul, and Neamț.',
      },
    ],
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
    icons: [
      {
        name: 'Forehead of the Apostle Andrew',
        description:
          'The chief relic of the skete: a portion of the forehead of the apostle Andrew the First-Called, the patron of Russia. Brought from Constantinople in the 19th century.',
      },
    ],
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
    legends: [
      {
        title: 'The chains and the windlass',
        description:
          'The descent from outer Karoulia to the inner kalyves is by lengths of iron chain set into the cliff face; in places the foothold is no wider than a man\'s toe-tip. The small windlass that hauls bread and water up to a hermit in his basket is called a *karouli* — and gives the whole place its name.',
      },
      {
        title: 'A school of the strictest',
        description:
          'Karoulia has no kyriakon, no road, no settled community, and no abbot. The hermits who choose this place do so for the prayer of the heart in extreme solitude; many are known on the Mountain only by a baptismal name, and a handful never come down at all.',
      },
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
    legends: [
      {
        title: 'Cave of St Athanasios',
        description:
          'Within the territory of Vigla, hidden in the slope above the sea, is the cave where St Athanasios the Athonite is said to have retreated for prayer in the early days of the foundation of Great Lavra. Pilgrims with permission of Lavra are sometimes shown the place.',
      },
    ],
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
    legends: [
      {
        title: 'The kalyves of the great elders',
        description:
          'Katounakia is venerated as a school of the strictest Athonite hesychasm — the kalyves of St Daniel Katounakiotes († 1929) and of St Ephraim Katounakiotes († 1998) are still occupied. Pilgrims who come for their blessing are usually directed first up the long stone path to St Anne, then down the side track to the cells.',
      },
    ],
    links: [],
  },
];

export function findSettlement(slug: string): Settlement | undefined {
  return SETTLEMENTS.find((s) => s.slug === slug);
}
