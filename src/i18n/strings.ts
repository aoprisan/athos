/* UI string dictionary. Keys are dot-separated by area. Romanian entries fall
   back to English at runtime when a translation is missing. */

import type { Tradition } from '../types';

export type Lang = 'en' | 'ro';

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ro', label: 'Română', short: 'RO' },
];

export const STRINGS: Record<Lang, Record<string, string>> = {
  en: {
    'app.brandGreekTagline': 'Ἁγιον Ὄρος',
    'app.footer':
      'Information for pilgrims to the Holy Mountain. Verify ferry sailings and the {diamonitirion} with official sources before you travel.',
    'app.footer.diamonitirion': 'Diamonitirion',
    'lang.label': 'Language',

    'nav.monasteries': 'Monasteries',
    'nav.trips': 'Trips',
    'nav.gettingThere': 'Getting there',
    'nav.ferries': 'Ferries',

    'home.subtitle': 'Ἁγιον Ὄρος · the Holy Mountain',
    'home.title': 'Athos Pilgrim',
    'home.lede':
      'A practical guide to the twenty ruling monasteries of Mount Athos, the {diamonitirion} entry permit, and the ferries that carry pilgrims to the easternmost finger of the Halkidiki peninsula.',
    'home.listTitle': 'The Twenty Ruling Monasteries',
    'home.listSubtitle': 'in canonical hierarchical order',
    'home.settlementsTitle': 'Sketes & hermit settlements',
    'home.settlementsSubtitle': 'dependencies of the ruling monasteries',
    'home.hermitageLabel': 'hermitage',

    'map.styleLabel': 'Map style',
    'map.portolano': 'Portolano',
    'map.topographic': 'Topographic',
    'map.loadingTopo': 'Loading topographic map…',
    'map.medievalAria':
      'Painted Byzantine map of Mount Athos and the twenty ruling monasteries, with the Theotokos and two angels in the sky band above',

    'detail.backToMap': 'Back to map',
    'detail.allMonasteries': '☩ All monasteries',
    'detail.allTrips': '☩ All trips',
    'detail.notFoundMonastery': 'Monastery not found.',
    'detail.notFoundSettlement': 'Settlement not found.',
    'detail.notFoundTrip': 'Trip not found.',
    'detail.founded': 'Founded',
    'detail.feast': 'Feast',
    'detail.location': 'Location',
    'detail.links': 'Links',
    'detail.dependencyOf': 'Dependency of',
    'detail.kindSkete': 'Skete',
    'detail.kindHermitage': 'Hermit settlement',
    'detail.fallbackTradition': 'Athonite hesychast tradition',
    'detail.coords': '{lat}° N · {lng}° E',

    'getting.eyebrow': 'πῶς ἀναβαίνομεν · how we ascend',
    'getting.title': 'Getting to the Holy Mountain',
    'getting.lede':
      'Mount Athos is a self-governing monastic republic on the easternmost finger of the Halkidiki peninsula in northern Greece. There is no road crossing — all pilgrims arrive by boat from Ouranoupoli or Ierissos, and only after obtaining the {diamonitirion} entry permit.',
    'getting.diamonitirionH2': 'The Diamonitirion',
    'getting.entryPermit': 'entry permit',
    'getting.bureauName': 'Issuing office',
    'getting.address': 'Address',
    'getting.phone': 'Phone',
    'getting.email': 'Email',
    'getting.online': 'Online reservation',
    'getting.dailyQuota': 'Daily quota',
    'getting.quotaValue': '{ortho} Orthodox / {nonOrtho} non-Orthodox',
    'getting.standardStay': 'Standard stay',
    'getting.nights': '{n} nights',
    'getting.stepsTitle': 'Step by step',
    'getting.portsTitle': 'Ports',
    'getting.seeTimetable': 'See ferry timetable',

    'ferry.eyebrow': "δι' ὕδατος · by way of water",
    'ferry.title': 'Ferry Routes & Timetable',
    'ferry.lede':
      'All sailings depend on weather and season. Sunday and feast-day schedules are often reduced. Confirm at the harbour the evening before, especially for the smaller boats along the south-east coast.',
    'ferry.routesH2': 'Routes',
    'ferry.vessel': 'Vessel',
    'ferry.operator': 'Operator',
    'ferry.duration': 'Duration ~ {min} min',
    'ferry.departures': 'Departures',
    'ferry.officialLinks': 'Official links',
    'ferry.backToGetting': '← Back to Getting There',

    'trips.subtitle': 'Plan your pilgrimage',
    'trips.title': 'Trips',
    'trips.lede':
      'Sketch out the days of your visit and the monasteries or sketes you hope to call at on each. Trips are stored on this device only.',
    'trips.newTrip': 'New trip',
    'trips.name': 'Name',
    'trips.namePlaceholder': 'Spring pilgrimage',
    'trips.startDate': 'Start date',
    'trips.endDate': 'End date',
    'trips.create': 'Create trip',
    'trips.yourTrips': 'Your trips',
    'trips.empty': 'No trips yet. Use the form above to plan your first visit.',
    'trips.errorName': 'Give the trip a name.',
    'trips.errorRange': 'End date must be on or after the start date.',
    'trips.day': 'day',
    'trips.days': 'days',
    'trips.place': 'place',
    'trips.places': 'places',
    'trips.delete': 'Delete',
    'trips.deleteAriaLabel': 'Delete trip {name}',
    'trips.confirmDelete': 'Delete trip "{name}"? This cannot be undone.',

    'tripDetail.rename': 'Rename',
    'tripDetail.renameAriaLabel': 'Rename trip',
    'tripDetail.renamePrompt': 'Rename trip',
    'tripDetail.start': 'Start',
    'tripDetail.end': 'End',
    'tripDetail.deleteTrip': 'Delete trip',
    'tripDetail.itineraryMap': 'Itinerary map',
    'tripDetail.loadingMap': 'Loading itinerary map…',
    'tripDetail.dayN': 'Day {n}',
    'tripDetail.dayEmpty': 'No places yet.',
    'tripDetail.unknownMonastery': 'Unknown monastery',
    'tripDetail.unknownSettlement': 'Unknown settlement',
    'tripDetail.moveUp': 'Move up',
    'tripDetail.moveDown': 'Move down',
    'tripDetail.removePlace': 'Remove place',
    'tripDetail.remove': 'Remove',
    'tripDetail.addPlace': 'Add a place',
    'tripDetail.pickPlace': 'Pick a monastery or skete…',
    'tripDetail.rulingMonasteries': 'Ruling monasteries',
    'tripDetail.sketesHermitages': 'Sketes & hermitages',
    'tripDetail.alertStartAfterEnd': 'Start date must be on or before the end date.',
    'tripDetail.alertEndBeforeStart': 'End date must be on or after the start date.',

    'tripMap.empty': "Add places to a day below and they'll appear on the map.",
    'tripMap.legendAria': 'Map legend',

    'tradition.Greek': 'Greek',
    'tradition.Russian': 'Russian',
    'tradition.Serbian': 'Serbian',
    'tradition.Bulgarian': 'Bulgarian',
    'tradition.Romanian': 'Romanian',
    'tradition.Georgian': 'Georgian',
    'tradition.suffix': '{trad} tradition',
  },
  ro: {
    'app.brandGreekTagline': 'Sfântul Munte',
    'app.footer':
      'Informații pentru pelerinii Sfântului Munte. Verificați cursele de feribot și {diamonitirion}-ul la sursele oficiale înainte de plecare.',
    'app.footer.diamonitirion': 'Diamonitirion',
    'lang.label': 'Limbă',

    'nav.monasteries': 'Mănăstiri',
    'nav.trips': 'Pelerinaje',
    'nav.gettingThere': 'Cum ajungi',
    'nav.ferries': 'Feriboturi',

    'home.subtitle': 'Sfântul Munte · Grădina Maicii Domnului',
    'home.title': 'Pelerin la Athos',
    'home.lede':
      'Un ghid practic pentru cele douăzeci de mănăstiri conducătoare ale Sfântului Munte Athos, pentru permisul de intrare {diamonitirion} și pentru feriboturile care duc pelerinii spre vârful estic al peninsulei Halkidiki.',
    'home.listTitle': 'Cele douăzeci de mănăstiri conducătoare',
    'home.listSubtitle': 'în ordinea ierarhică canonică',
    'home.settlementsTitle': 'Schituri și sihăstrii',
    'home.settlementsSubtitle': 'dependențe ale mănăstirilor conducătoare',
    'home.hermitageLabel': 'sihăstrie',

    'map.styleLabel': 'Stilul hărții',
    'map.portolano': 'Portulan',
    'map.topographic': 'Topografică',
    'map.loadingTopo': 'Se încarcă harta topografică…',
    'map.medievalAria':
      'Hartă bizantină pictată a Sfântului Munte Athos și a celor douăzeci de mănăstiri conducătoare, cu Maica Domnului și doi îngeri în brâul de cer de deasupra',

    'detail.backToMap': 'Înapoi la hartă',
    'detail.allMonasteries': '☩ Toate mănăstirile',
    'detail.allTrips': '☩ Toate pelerinajele',
    'detail.notFoundMonastery': 'Mănăstirea nu a fost găsită.',
    'detail.notFoundSettlement': 'Așezarea nu a fost găsită.',
    'detail.notFoundTrip': 'Pelerinajul nu a fost găsit.',
    'detail.founded': 'Întemeiere',
    'detail.feast': 'Hram',
    'detail.location': 'Localizare',
    'detail.links': 'Legături',
    'detail.dependencyOf': 'Dependentă de',
    'detail.kindSkete': 'Schit',
    'detail.kindHermitage': 'Sihăstrie',
    'detail.fallbackTradition': 'Tradiție isihastă athonită',
    'detail.coords': '{lat}° N · {lng}° E',

    'getting.eyebrow': 'πῶς ἀναβαίνομεν · cum urcăm',
    'getting.title': 'Cum se ajunge la Sfântul Munte',
    'getting.lede':
      'Sfântul Munte este o republică monastică autonomă, situată pe vârful estic al peninsulei Halkidiki din nordul Greciei. Nu există acces rutier — toți pelerinii ajung cu barca din Ouranoupoli sau Ierissos, și numai după obținerea permisului de intrare {diamonitirion}.',
    'getting.diamonitirionH2': 'Diamonitirion-ul',
    'getting.entryPermit': 'permis de intrare',
    'getting.bureauName': 'Biroul de eliberare',
    'getting.address': 'Adresă',
    'getting.phone': 'Telefon',
    'getting.email': 'E-mail',
    'getting.online': 'Rezervare online',
    'getting.dailyQuota': 'Cotă zilnică',
    'getting.quotaValue': '{ortho} ortodocși / {nonOrtho} neortodocși',
    'getting.standardStay': 'Ședere standard',
    'getting.nights': '{n} nopți',
    'getting.stepsTitle': 'Pas cu pas',
    'getting.portsTitle': 'Porturi',
    'getting.seeTimetable': 'Vezi orarul feriboturilor',

    'ferry.eyebrow': "δι' ὕδατος · pe calea apei",
    'ferry.title': 'Rute și orar feribot',
    'ferry.lede':
      'Toate cursele depind de vreme și de sezon. Duminica și în zilele de praznic orarele sunt adesea reduse. Verificați în port cu o seară înainte, mai ales pentru bărcile mici de pe coasta de sud-est.',
    'ferry.routesH2': 'Rute',
    'ferry.vessel': 'Navă',
    'ferry.operator': 'Operator',
    'ferry.duration': 'Durată ~ {min} min',
    'ferry.departures': 'Plecări',
    'ferry.officialLinks': 'Legături oficiale',
    'ferry.backToGetting': '← Înapoi la „Cum ajungi"',

    'trips.subtitle': 'Plănuiește-ți pelerinajul',
    'trips.title': 'Pelerinaje',
    'trips.lede':
      'Schițează zilele vizitei și mănăstirile sau schiturile la care vrei să te oprești în fiecare zi. Pelerinajele sunt salvate doar pe acest dispozitiv.',
    'trips.newTrip': 'Pelerinaj nou',
    'trips.name': 'Nume',
    'trips.namePlaceholder': 'Pelerinaj de primăvară',
    'trips.startDate': 'Dată început',
    'trips.endDate': 'Dată sfârșit',
    'trips.create': 'Creează pelerinaj',
    'trips.yourTrips': 'Pelerinajele tale',
    'trips.empty':
      'Niciun pelerinaj încă. Folosește formularul de mai sus pentru a-ți plănui prima vizită.',
    'trips.errorName': 'Dă-i un nume pelerinajului.',
    'trips.errorRange': 'Data de sfârșit trebuie să fie după data de început.',
    'trips.day': 'zi',
    'trips.days': 'zile',
    'trips.place': 'loc',
    'trips.places': 'locuri',
    'trips.delete': 'Șterge',
    'trips.deleteAriaLabel': 'Șterge pelerinajul {name}',
    'trips.confirmDelete':
      'Ștergi pelerinajul „{name}"? Această acțiune nu poate fi anulată.',

    'tripDetail.rename': 'Redenumește',
    'tripDetail.renameAriaLabel': 'Redenumește pelerinajul',
    'tripDetail.renamePrompt': 'Redenumește pelerinajul',
    'tripDetail.start': 'Început',
    'tripDetail.end': 'Sfârșit',
    'tripDetail.deleteTrip': 'Șterge pelerinajul',
    'tripDetail.itineraryMap': 'Harta itinerariului',
    'tripDetail.loadingMap': 'Se încarcă harta itinerariului…',
    'tripDetail.dayN': 'Ziua {n}',
    'tripDetail.dayEmpty': 'Niciun loc încă.',
    'tripDetail.unknownMonastery': 'Mănăstire necunoscută',
    'tripDetail.unknownSettlement': 'Așezare necunoscută',
    'tripDetail.moveUp': 'Mută în sus',
    'tripDetail.moveDown': 'Mută în jos',
    'tripDetail.removePlace': 'Elimină locul',
    'tripDetail.remove': 'Elimină',
    'tripDetail.addPlace': 'Adaugă un loc',
    'tripDetail.pickPlace': 'Alege o mănăstire sau un schit…',
    'tripDetail.rulingMonasteries': 'Mănăstiri conducătoare',
    'tripDetail.sketesHermitages': 'Schituri și sihăstrii',
    'tripDetail.alertStartAfterEnd':
      'Data de început trebuie să fie înaintea datei de sfârșit.',
    'tripDetail.alertEndBeforeStart':
      'Data de sfârșit trebuie să fie după data de început.',

    'tripMap.empty':
      'Adaugă locuri la o zi mai jos și vor apărea pe hartă.',
    'tripMap.legendAria': 'Legenda hărții',

    'tradition.Greek': 'greacă',
    'tradition.Russian': 'rusă',
    'tradition.Serbian': 'sârbă',
    'tradition.Bulgarian': 'bulgară',
    'tradition.Romanian': 'română',
    'tradition.Georgian': 'georgiană',
    'tradition.suffix': 'tradiție {trad}',
  },
};

export function traditionLabel(trad: Tradition, lang: Lang): string {
  const dict = STRINGS[lang];
  const fallback = STRINGS.en;
  return dict[`tradition.${trad}`] ?? fallback[`tradition.${trad}`] ?? trad;
}
