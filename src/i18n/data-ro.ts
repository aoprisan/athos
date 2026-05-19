/* Romanian translations of the monastery, settlement and transport content.
   Keyed by the canonical English slug / id so the source data stays the
   authoritative copy. Missing keys (or missing fields within a key) fall
   back to the English originals via the `tr()` helper. */

interface PlaceRo {
  name?: string;
  founded?: string;
  patronalFeast?: string;
  intro?: string;
  notes?: string[];
}

export const MONASTERIES_RO: Record<string, PlaceRo> = {
  'great-lavra': {
    name: 'Marea Lavră',
    founded: '963',
    patronalFeast: 'Adormirea Sfântului Atanasie Athonitul (5 / 18 iulie)',
    intro:
      'Cea mai veche mănăstire a Sfântului Munte, întemeiată de Sfântul Atanasie Athonitul cu sprijinul imperial al lui Nichifor Phokas. Prima în ierarhie și cea mai întinsă ca suprafață.',
  },
  vatopedi: {
    name: 'Vatopedi',
    founded: '972–985',
    patronalFeast: 'Buna Vestire (25 martie / 7 aprilie)',
    intro:
      'O vastă obște chinovială pe coasta de nord-est, a doua în ierarhie. Adăpostește Brâul Maicii Domnului și mai multe icoane făcătoare de minuni, între care Panagia Vimatarissa.',
  },
  iviron: {
    name: 'Iviron',
    founded: '980–983',
    patronalFeast: 'Adormirea Maicii Domnului (15 / 28 august)',
    intro:
      'Întemeiată de monahi georgieni (iberi), de unde și numele. Adăpostește icoana Panagia Portaitissa, „Portărița", una dintre cele mai cinstite icoane ale Sfântului Munte.',
  },
  hilandar: {
    name: 'Hilandar',
    founded: '1198',
    patronalFeast: 'Intrarea în Biserică a Maicii Domnului (21 noiembrie / 4 decembrie)',
    intro:
      'Mănăstirea sârbă, reîntemeiată de sfinții Simeon (Nemanja) și Sava. A suferit un mare incendiu în 2004; restaurarea este în curs.',
  },
  dionysiou: {
    name: 'Dionisiu',
    founded: '1374',
    patronalFeast: 'Nașterea Sfântului Ioan Botezătorul (24 iunie / 7 iulie)',
    intro:
      'Ridicată pe o stâncă deasupra coastei de sud-vest. Adăpostește celebra icoană a Bunei Vestiri (Akathistos).',
  },
  koutloumousiou: {
    name: 'Cutlumuș',
    founded: 'sec. XII–XIII',
    patronalFeast: 'Schimbarea la Față a Domnului (6 / 19 august)',
    intro:
      'La scurtă distanță de Kareia, capitala administrativă. Strâns legată istoric de domnii Țării Românești și de binefăcătorii români.',
  },
  pantokratoros: {
    name: 'Pantocrator',
    founded: '1357',
    patronalFeast: 'Schimbarea la Față a Domnului (6 / 19 august)',
    intro:
      'Întemeiată de frații Alexie și Ioan, înalți demnitari ai curții bizantine. Se înalță pe un mic promontoriu stâncos deasupra coastei de nord-est.',
  },
  xeropotamou: {
    name: 'Xiropotamu',
    founded: 'sec. X',
    patronalFeast: 'Sfinții 40 de Mucenici din Sevastia (9 / 22 martie)',
    intro:
      'Așezată în dealurile de deasupra portului Dafni. Păstrează cea mai mare bucată cunoscută din Lemnul Sfintei Cruci.',
  },
  zographou: {
    name: 'Zografu',
    founded: 'sec. X',
    patronalFeast: 'Sfântul Mare Mucenic Gheorghe (23 aprilie / 6 mai)',
    intro:
      'Mănăstirea bulgară, ascunsă în interiorul împădurit al peninsulei. Numele („pictorul") se referă la o icoană a Sfântului Gheorghe despre care se spune că nu este lucrată de mână omenească.',
  },
  docheiariou: {
    name: 'Dohiariu',
    founded: 'sec. X',
    patronalFeast: 'Soborul Sfinților Arhangheli (8 / 21 noiembrie)',
    intro:
      'Pe coasta de sud-vest, închinată Sfinților Arhangheli Mihail și Gavriil. Adăpostește icoana făcătoare de minuni Panagia Gorgoepikoos („Grabnic-Ascultătoarea").',
  },
  karakallou: {
    name: 'Caracalu',
    founded: 'sec. XI',
    patronalFeast: 'Sfinții Apostoli Petru și Pavel (29 iunie / 12 iulie)',
    intro:
      'O mănăstire fortificată din interiorul peninsulei, deasupra coastei de est, legată tradițional (prin nume și prin legendă) de împăratul roman Caracalla.',
  },
  philotheou: {
    name: 'Filoteu',
    founded: 'sec. X',
    patronalFeast: 'Buna Vestire (25 martie / 7 aprilie)',
    intro:
      'Așezată într-o poiană din pădurea de deasupra coastei de est. Adăpostește icoana Panagia Glykofilousa („Dulcea Sărutare").',
  },
  simonopetra: {
    name: 'Simonopetra',
    founded: 'sec. XIII',
    patronalFeast: 'Nașterea Domnului (25 decembrie / 7 ianuarie)',
    intro:
      'Cea mai impresionantă arhitectural dintre mănăstiri — șapte caturi de cerdacuri suspendate pe o stâncă verticală deasupra mării. Întemeiată de Sfântul Simon Mirovlitul în urma unei vedenii.',
  },
  'agiou-pavlou': {
    name: 'Sfântul Pavel (Aghiou Pavlou)',
    founded: 'sec. X',
    patronalFeast: 'Întâmpinarea Domnului (2 / 15 februarie)',
    intro:
      'Sub coasta de sud-vest a Athonului. Păstrează moaște ale Sfinților Trei Ierarhi și o parte din darurile aduse Mântuitorului de către Magi.',
  },
  stavronikita: {
    name: 'Stavronichita',
    founded: 'sec. XVI (reîntemeiată)',
    patronalFeast: 'Sfântul Nicolae al Mirelor Lichiei (6 / 19 decembrie)',
    intro:
      'Cea mai mică și mai tânără dintre mănăstirile conducătoare în forma actuală, reîntemeiată de patriarhul Ieremia I. Compactă și asemenea unei cetăți, pe coasta de est.',
  },
  xenophontos: {
    name: 'Xenofont',
    founded: 'sec. X–XI',
    patronalFeast: 'Sfântul Mare Mucenic Gheorghe (23 aprilie / 6 mai)',
    intro:
      'Pe coasta de sud-vest, imediat la sud de Dohiariu. Adăpostește două katholikoane (caz rar) și un celebru mozaic al Sfântului Gheorghe.',
  },
  'osiou-grigoriou': {
    name: 'Cuviosul Grigorie',
    founded: 'sec. XIV',
    patronalFeast: 'Sfântul Nicolae al Mirelor Lichiei (6 / 19 decembrie)',
    intro:
      'Întemeiată de Sfântul Grigorie cel Nou (Sinaitul). Pe coasta de sud-vest, între Dionisiu și Simonopetra.',
  },
  esphigmenou: {
    name: 'Esfigmenu',
    founded: 'sec. X–XI',
    patronalFeast: 'Înălțarea Domnului (sărbătoare mobilă)',
    intro:
      'Pe coasta de nord-est, între Hilandar și Vatopedi. Cunoscută istoric pentru viața ascetică riguroasă a obștii.',
  },
  'st-panteleimon': {
    name: 'Sfântul Pantelimon (Rusicon)',
    founded: 'sec. XI (locul actual: sec. XVIII)',
    patronalFeast: 'Sfântul Mare Mucenic Pantelimon (27 iulie / 9 august)',
    intro:
      'Mănăstirea rusă, recunoscută după turlele-bulb și după glasul adânc al marelui clopot. La cumpăna secolelor XIX–XX adăpostea mii de monahi.',
  },
  konstamonitou: {
    name: 'Costamonitu',
    founded: 'sec. XI',
    patronalFeast: 'Sfântul Ștefan, Întâiul Mucenic (27 decembrie / 9 ianuarie)',
    intro:
      'Cea mai mică și a douăzecea în ierarhie. Adăpostită într-o vale împădurită din interior, aproape de coasta de vest.',
  },
};

export const SETTLEMENTS_RO: Record<string, PlaceRo> = {
  'skete-st-anne': {
    name: 'Schitul Sfânta Ana',
    founded: 'sec. XIV',
    patronalFeast: 'Adormirea Sfintei Ana (25 iulie / 7 august)',
    intro:
      'Cel mai vechi și mai mare dintre schiturile athonite — o așezare idioritmică de chilii ce coboară în trepte de piatră pe stâncile de sud-vest ale Athonului. Kyriakon-ul păstrează piciorul stâng al Sfintei Ana, mama Maicii Domnului, adus din Asia Mică în secolul XVIII.',
    notes: [
      'Dependent de Marea Lavră. Uneori numit „Megali Aghia Anna" (Sfânta Ana Mare), pentru a-l deosebi de sub-schitul „Mikra Aghia Anna" din apropiere.',
    ],
  },
  'skete-nea': {
    name: 'Schitul Nou (Nea Skiti)',
    founded: 'cca. 1730',
    patronalFeast: 'Nașterea Maicii Domnului (8 / 21 septembrie)',
    intro:
      'Schit idioritmic la scurtă distanță, spre nord, de Sfânta Ana, întemeiat de monahi care au plecat din vechiul schit căutând o singurătate mai aspră. Dependent de mănăstirea Sfântul Pavel.',
  },
  'skete-kafsokalyvia': {
    name: 'Schitul Cavsocalivia',
    founded: 'organizat în sec. XVIII',
    patronalFeast: 'Sfânta Treime (sărbătoare mobilă, Rusalii)',
    intro:
      'Schit idioritmic pe povârnișurile abrupte de sud-est ale Athonului, numit după Sfântul Maxim Cavsocalivitul („Cel ce-și ardea coliba"), care își dădea foc colibei ori de câte ori devenea prea așezat. Reorganizat în secolul XVIII de Sfântul Acachie.',
    notes: [
      'Capătul cursei mici de barcă ce pleacă din Dafni spre est, de-a lungul coastei de sud-est.',
    ],
  },
  'skete-prodromou-romanian': {
    name: 'Schitul Prodromu (românesc)',
    founded: '1857',
    patronalFeast: 'Nașterea Sfântului Ioan Botezătorul (24 iunie / 7 iulie)',
    intro:
      'Cea mai mare comunitate românească din Sfântul Munte — un schit chinovial la capătul de sud-est, lângă Marea Lavră, organizat la mijlocul secolului XIX de monahi români din Moldova.',
  },
  'skete-iviron-prodromou': {
    name: 'Schitul Sfântul Ioan Botezătorul',
    founded: 'sec. XVII',
    patronalFeast: 'Tăierea capului Sfântului Ioan Botezătorul (29 august / 11 septembrie)',
    intro:
      'Schit grecesc idioritmic în dealurile împădurite de deasupra mănăstirii Iviron — în chip tradițional, un loc de aspră isihie.',
  },
  'skete-lakkou': {
    name: 'Schitul Lacu',
    founded: 'sec. XVIII',
    patronalFeast: 'Sfântul Dimitrie Izvorâtorul de Mir (26 octombrie / 8 noiembrie)',
    intro:
      'Schit românesc idioritmic ascuns într-o vale împădurită din interior — o obște de mici chilii așezate în jurul kyriakon-ului închinat Sfântului Dimitrie.',
  },
  'skete-st-demetrios': {
    name: 'Schitul Sfântul Dimitrie (Lacos)',
    founded: 'sec. XVII',
    patronalFeast: 'Sfântul Dimitrie Izvorâtorul de Mir (26 octombrie / 8 noiembrie)',
    intro:
      'Schit grecesc idioritmic pe povârnișul de sud-vest, dependent de mănăstirea Sfântul Pavel.',
  },
  'skete-xenophontos': {
    name: 'Schitul Xenofont',
    founded: 'sec. XVIII',
    patronalFeast: 'Nașterea Maicii Domnului (8 / 21 septembrie)',
    intro:
      'Schit grecesc idioritmic în dealurile de deasupra mănăstirii-mamă, pe coasta de sud-vest.',
  },
  'skete-koutloumousiou': {
    name: 'Schitul Cutlumuș',
    founded: 'sec. XVIII',
    patronalFeast: 'Schimbarea la Față a Domnului (6 / 19 august)',
    intro:
      'Schit grecesc idioritmic la scurtă distanță de Kareia, dependent de mănăstirea Cutlumuș.',
  },
  'skete-profitis-ilias': {
    name: 'Schitul Sfântul Prooroc Ilie',
    founded: '1759',
    patronalFeast: 'Sfântul Prooroc Ilie (20 iulie / 2 august)',
    intro:
      'Schit chinovial întemeiat de Sfântul Paisie Velicikovski, ca obște de monahi slavi care reînnoiau tradiția isihastă. Inițial rusesc, astăzi este o obște grecească.',
  },
  'skete-st-andrew': {
    name: 'Schitul Sfântul Andrei (Serai)',
    founded: '1841',
    patronalFeast: 'Sfântul Apostol Andrei, Cel Întâi Chemat (30 noiembrie / 13 decembrie)',
    intro:
      'Marele „Serai" — un vast schit chinovial rusesc ridicat la marginea Kareiei în secolul XIX. Dependent de Vatopedi, astăzi un schit cu obște greacă.',
  },
  'skete-bogoroditsa': {
    name: 'Schitul Maicii Domnului (Bogoroditsa)',
    founded: 'sec. XVII',
    patronalFeast: 'Adormirea Maicii Domnului (15 / 28 august)',
    intro:
      'Schit chinovial bulgăresc în interiorul împădurit al peninsulei — legat istoric de mănăstirea bulgară Zografu și de Sfântul Pantelimon, mănăstirea rusă.',
  },

  karoulia: {
    name: 'Karulia',
    founded: 'origini medievale',
    intro:
      'Cele mai abrupte sihăstrii ale Sfântului Munte — chilii singuratice agățate de stâncile de sud-vest ale Athonului, ajunse după tradiție prin lanțuri și scări de funie fixate în piatră. Proviziile sunt urcate în coșuri cu un mic vinci („karuli"), care a dat și numele locului.',
    notes: [
      'Un loc rezervat celor mai aspri isihaști athoniți. Nu există kyriakon și nici drum; accesul se face cu barca sau pe jos, dinspre Sfânta Ana.',
    ],
  },
  kapsala: {
    name: 'Kapsala',
    founded: 'origini medievale',
    intro:
      'O risipire de chilii sihăstrești pe povârnișurile împădurite la est de Kareia, locuită încă din primele secole athonite și care adăpostește și astăzi o mică obște de nevoitori.',
  },
  vigla: {
    name: 'Vigla',
    founded: 'origini medievale',
    intro:
      'Chilii singuratice pe povârnișul estic, între Cavsocalivia și Marea Lavră. Numele (βίγλα — „turnul de strajă") se referă la vechile posturi de pază de pe țărm, ridicate pentru a vesti debarcarea piraților.',
  },
  provata: {
    name: 'Provata',
    founded: 'origini medievale',
    intro:
      'Așezare sihăstrească din interior, deasupra coastei de est — un colț liniștit de chilii dependente de Marea Lavră, ascuns în pădurea de castani.',
  },
  katounakia: {
    name: 'Katunakia',
    founded: 'organizat în sec. XVII',
    patronalFeast: 'Sfântul Acachie din Cavsocalivia (12 / 25 aprilie)',
    intro:
      'Un grup de chilii sihăstrești pe stâncile de sud-vest, între Karulia și Sfânta Ana, organizate într-un fel de schit abia în secolul XVII, odată cu ridicarea kyriakon-ului.',
  },
};

interface PortRo {
  name?: string;
  role?: string;
  notes?: string;
}

export const PORTS_RO: Record<string, PortRo> = {
  ouranoupoli: {
    name: 'Ouranoupoli',
    role: 'Portul principal de pe continent — pentru pelerinii spre coasta de sud-vest (Dafni).',
    notes:
      'Ultimul sat înainte de graniță. Biroul Pelerinilor se află în port. Cursele zilnice spre Dafni opresc la Dohiariu, Xenofont, Pantelimon, Xiropotamu.',
  },
  ierissos: {
    name: 'Ierissos',
    role: 'Portul secundar de pe continent — pentru pelerinii spre coasta de nord-est.',
    notes:
      'Plecările sunt mai rare. Bărcile opresc la arsanale (debarcadere) ale mănăstirilor Hilandar, Esfigmenu, Vatopedi, Pantocrator, Stavronichita, Iviron.',
  },
  daphne: {
    name: 'Dafni',
    role: 'Portul principal de pe Athos.',
    notes:
      'Un autobuz face legătura între Dafni și Kareia (capitala) la sosirea feribotului principal. Bărcile mici merg apoi spre sud-est, către Simonopetra, Dionisiu, Sfântul Pavel și schitul Cavsocalivia.',
  },
  karyes: {
    name: 'Kareia',
    role: 'Capitala administrativă a peninsulei athonite.',
    notes:
      'Sediul Sfintei Chinotite (Iera Koinotita). Autobuz din Dafni. Mai multe mănăstiri se află la distanță de mers pe jos.',
  },
};

interface FerryRo {
  from?: string;
  to?: string;
  vessel?: string;
  operator?: string;
  notes?: string;
}

export const FERRIES_RO: Record<string, FerryRo> = {
  'ouranoupoli-daphne': {
    from: 'Ouranoupoli',
    to: 'Dafni',
    vessel: 'Aghios Panteleimon / Axion Estin',
    operator: 'Athos Sea Cruises',
    notes:
      'Feribotul principal al pelerinilor. Oprește de-a lungul coastei de sud-vest la arsanalele de la Dohiariu, Xenofont, Pantelimon, Xiropotamu, înainte de a ajunge la Dafni. Cursa de întoarcere pleacă de obicei din Dafni în jurul orei 12:00.',
  },
  'ouranoupoli-daphne-express': {
    from: 'Ouranoupoli',
    to: 'Dafni',
    vessel: 'Vedetă rapidă',
    operator: 'Operatori locali',
    notes:
      'Variantă mai rapidă; mai puține opriri. Orarul variază după sezon — verifică în port cu o seară înainte.',
  },
  'daphne-kafsokalyvia': {
    from: 'Dafni',
    to: 'Cavsocalivia (schitul sud-estic)',
    vessel: 'Aghia Anna / Mikra Aghia Anna',
    notes:
      'Are legătură cu feribotul principal din Ouranoupoli. Oprește la Simonopetra, Cuviosul Grigorie, Dionisiu, Sfântul Pavel, Schitul Nou, Sfânta Ana, Karulia, Cavsocalivia.',
  },
  'ierissos-coast': {
    from: 'Ierissos',
    to: 'Mănăstirile coastei de nord-est',
    vessel: 'Feribot local',
    operator: 'Servicii de barcă Ierissos',
    notes:
      'Oprește la arsanalele de la Hilandar, Esfigmenu, Vatopedi, Pantocrator, Stavronichita și Iviron, în funcție de vreme. Nu circulă în fiecare zi — verifică la fața locului.',
  },
};

export const FERRY_LINKS_RO: Record<string, { label?: string }> = {
  'https://athos-ferries.com/': {
    label: 'Athos Sea Cruises (Ouranoupoli ↔ Dafni)',
  },
  'https://www.mountathos.org/': {
    label: 'Portalul oficial al Sfântului Munte',
  },
  'https://athosreservation.gr/': {
    label: 'Biroul Pelerinilor — rezervări',
  },
};

interface DiamonitirionRo {
  bureauName?: string;
  bureauCity?: string;
  bureauAddress?: string;
  notes?: string[];
}

export const DIAMONITIRION_RO: DiamonitirionRo = {
  bureauName: 'Biroul Pelerinilor Sfântului Munte',
  bureauCity: 'Tesalonic',
  bureauAddress: 'Str. Egnatia 109, Tesalonic, Grecia',
  notes: [
    'Rezervarea se face prin telefon sau e-mail cu mult timp înainte — sezoanele de vârf (Sfintele Paști, Adormirea Maicii Domnului, vara) se umplu cu luni înainte.',
    'Diamonitirion-ul se eliberează doar bărbaților adulți. Femeile nu au voie să intre (avaton).',
    'Permisul se ridică în ziua plecării, la Biroul Pelerinilor din Ouranoupoli, pe baza pașaportului / actului de identitate original și după plata taxei de eliberare.',
    'O prelungire se poate obține uneori de la Sfânta Epistasie din Kareia, odată ajuns pe Sfântul Munte.',
  ],
};

interface StepRo {
  title?: string;
  body?: string;
}

export const GETTING_THERE_STEPS_RO: Record<number, StepRo> = {
  1: {
    title: 'Rezervă Diamonitirion-ul',
    body:
      'Contactează Biroul Pelerinilor din Tesalonic prin telefon sau e-mail cu cel puțin câteva săptămâni înainte (mai mult în sezoanele aglomerate). Indică data intrării, durata șederii și datele complete din pașaport. Biroul îți confirmă un loc în cota zilnică a pelerinilor.',
  },
  2: {
    title: 'Călătoria spre Tesalonic',
    body:
      'Tesalonic (SKG) este cel mai apropiat aeroport internațional. Din oraș, drumul continuă pe uscat spre Ouranoupoli (aprox. 120 km, 2½ ore cu autocarul sau cu mașina).',
  },
  3: {
    title: 'Autocar sau mașină până la Ouranoupoli',
    body:
      'KTEL Halkidikis are curse regulate din autogara Halkidikis (KTEL Chalkidikis) din Tesalonic spre Ouranoupoli, de mai multe ori pe zi. Ultimul sat înainte de Sfântul Munte are pensiuni; cei mai mulți pelerini înnoptează aici.',
  },
  4: {
    title: 'Ridică Diamonitirion-ul în Ouranoupoli',
    body:
      'În dimineața plecării, prezintă pașaportul la Biroul Pelerinilor din port, achită taxa și primești permisul tipărit. Biroul se deschide devreme (în jurul orei 07:30) și se închide înainte de plecarea feribotului principal.',
  },
  5: {
    title: 'Îmbarcă-te pe feribot spre Dafni (sau spre coasta de est, din Ierissos)',
    body:
      'Feribotul principal al pelerinilor pleacă din Ouranoupoli la mijlocul dimineții. La îmbarcare se cere Diamonitirion-ul. Bărcile de legătură din Dafni merg apoi spre coasta de sud-est (Simonopetra → Cavsocalivia).',
  },
};
