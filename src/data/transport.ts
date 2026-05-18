import type { FerryRoute, TransportPort } from '../types';

// Mount Athos has no land border crossing for pilgrims; entry is by boat only.
// Two mainland ports serve the peninsula:
//   • Ouranoupoli — gateway to the south-west / "Daphne side" (most monasteries).
//   • Ierissos — gateway to the north-east coast (Hilandar, Vatopedi, etc.).
// Pilgrims must obtain a Diamonitirion (entry permit) in advance from the
// Pilgrims' Bureau in Thessaloniki, then collect it at Ouranoupoli on the day
// of travel before boarding.
//
// Schedules below summarise the typical year-round timetable as published by
// the operators. Verify before travel — sailings shift seasonally, weather can
// cancel any trip, and Sunday services are often reduced or rerouted.

export const DIAMONITIRION = {
  bureauName: "Pilgrims' Bureau of Mount Athos",
  bureauCity: 'Thessaloniki',
  bureauAddress: '109 Egnatia St., Thessaloniki, Greece',
  bureauPhone: '+30 2310 252578',
  bureauEmail: 'piligrimsbureau@c-lab.gr',
  bureauUrl: 'https://athosreservation.gr/',
  // Standard Orthodox quota; non-Orthodox have a separate, lower quota.
  dailyQuotaOrthodox: 100,
  dailyQuotaNonOrthodox: 10,
  standardStayNights: 3,
  notes: [
    'Reservation must be made by phone or email well in advance — peak seasons (Pascha, Dormition, summer) fill months ahead.',
    'Diamonitirion is issued only to adult males. Women are not permitted to enter (avaton).',
    'The permit is collected on the day of travel at the Pilgrims\' Office in Ouranoupoli, against the original passport / ID, on payment of the issuance fee.',
    'A second-extension permit can sometimes be obtained from the Holy Epistasia in Karyes once on the Mountain.',
  ],
};

export const PORTS: TransportPort[] = [
  {
    id: 'ouranoupoli',
    name: 'Ouranoupoli',
    role: 'Main mainland port — pilgrims for the south-west coast (Daphne).',
    lat: 40.323,
    lng: 23.984,
    notes:
      'Last village before the border. The Pilgrims\' Office is at the harbour. Daily ferries to Daphne via Dochiariou, Xenophontos, Panteleimon, Xeropotamou.',
  },
  {
    id: 'ierissos',
    name: 'Ierissos',
    role: 'Secondary mainland port — pilgrims for the north-east coast.',
    lat: 40.398,
    lng: 23.881,
    notes:
      'Departures are less frequent. Boats call at the arsanas (jetties) of Hilandar, Esphigmenou, Vatopedi, Pantokratoros, Stavronikita, Iviron.',
  },
  {
    id: 'daphne',
    name: 'Daphne',
    role: 'Main port on Mount Athos itself.',
    lat: 40.203,
    lng: 24.196,
    notes:
      'Bus connects Daphne with Karyes (the capital) on arrival of the main ferry. Onward small-boat services run south-east toward Simonopetra, Dionysiou, Agiou Pavlou and the skete of Kafsokalyvia.',
  },
  {
    id: 'karyes',
    name: 'Karyes',
    role: 'Administrative capital of the Athonite peninsula.',
    lat: 40.258,
    lng: 24.241,
    notes:
      'Seat of the Holy Community (Iera Koinotita). Bus from Daphne. Several monasteries are within walking distance.',
  },
];

export const FERRIES: FerryRoute[] = [
  {
    id: 'ouranoupoli-daphne',
    from: 'Ouranoupoli',
    to: 'Daphne',
    vessel: 'Agios Panteleimon / Axion Estin',
    operator: 'Athos Sea Cruises',
    departures: ['09:45'],
    durationMin: 110,
    notes:
      'Main pilgrim ferry. Stops along the south-west coast at the arsanas of Docheiariou, Xenophontos, Panteleimon, Xeropotamou before reaching Daphne. Return sailing typically departs Daphne around 12:00.',
  },
  {
    id: 'ouranoupoli-daphne-express',
    from: 'Ouranoupoli',
    to: 'Daphne',
    vessel: 'Small speedboat',
    operator: 'Local operators',
    departures: ['08:45', '10:40'],
    durationMin: 60,
    notes:
      'Faster alternative; fewer stops. Schedule varies by season — confirm at the harbour the evening before.',
  },
  {
    id: 'daphne-kafsokalyvia',
    from: 'Daphne',
    to: 'Kafsokalyvia (south-eastern skete)',
    vessel: 'Agia Anna / Mikra Agia Anna',
    departures: ['12:30'],
    durationMin: 90,
    notes:
      'Connects with the main ferry from Ouranoupoli. Calls at Simonopetra, Osiou Grigoriou, Dionysiou, Agiou Pavlou, Nea Skete, Agia Anna, Karoulia, Kafsokalyvia.',
  },
  {
    id: 'ierissos-coast',
    from: 'Ierissos',
    to: 'North-east coast monasteries',
    vessel: 'Local ferry',
    operator: 'Ierissos boat services',
    departures: ['08:30'],
    durationMin: 180,
    notes:
      'Calls at the arsanas of Hilandar, Esphigmenou, Vatopedi, Pantokratoros, Stavronikita and Iviron, weather permitting. Does not run every day — confirm locally.',
  },
];

export const FERRY_LINKS = [
  {
    label: 'Athos Sea Cruises (Ouranoupoli ↔ Daphne)',
    url: 'https://athos-ferries.com/',
  },
  {
    label: 'Mount Athos official portal',
    url: 'https://www.mountathos.org/',
  },
  {
    label: 'Pilgrims\' Bureau — reservations',
    url: 'https://athosreservation.gr/',
  },
];

// How to reach Ouranoupoli from Thessaloniki.
export const GETTING_THERE_STEPS = [
  {
    step: 1,
    title: 'Reserve the Diamonitirion',
    body:
      'Contact the Pilgrims\' Bureau in Thessaloniki by phone or email at least several weeks in advance, more for high seasons. State the date of entry, length of stay, and full passport details. They confirm a slot in the day\'s pilgrim quota.',
  },
  {
    step: 2,
    title: 'Travel to Thessaloniki',
    body:
      'Thessaloniki (SKG) is the nearest international airport. From the city, the route continues overland to Ouranoupoli (about 120 km, 2½ hours by bus or car).',
  },
  {
    step: 3,
    title: 'Bus or car to Ouranoupoli',
    body:
      'KTEL Halkidikis runs scheduled buses from Halkidiki bus terminal (Ktel Chalkidikis) in Thessaloniki to Ouranoupoli several times daily. The last village before Mount Athos has guesthouses; most pilgrims spend the night there.',
  },
  {
    step: 4,
    title: 'Collect the Diamonitirion in Ouranoupoli',
    body:
      'On the morning of travel, present your passport at the Pilgrims\' Office at the harbour, pay the fee, and receive the printed permit. The office opens early (around 07:30) and closes before the main ferry departs.',
  },
  {
    step: 5,
    title: 'Board the ferry to Daphne (or to the east coast from Ierissos)',
    body:
      'The main pilgrim ferry leaves Ouranoupoli mid-morning. Boarding requires the Diamonitirion. Onward boats from Daphne run toward the south-east coast (Simonopetra → Kafsokalyvia) after arrival.',
  },
];
