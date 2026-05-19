/* Romanian content overlay for the monasteries, settlements, ports, ferries
   and travel information. Keyed by the canonical English slug / id so the
   English data files stay the source of truth for structure and coordinates.
   Missing keys (or missing fields within a key) fall back to the English
   originals via the `tr()` helper.

   Sources (Romanian Orthodox portals and reference sites):
     doxologia.ro, ro.orthodoxwiki.org, crestinortodox.ro, basilica.ro,
     mount-athos.org (versiunea română), prodromu-athos.ro,
     pelerinajesfantulmunteathos.ro, sfantulmunteathos.wordpress.com,
     ziarullumina.ro, agerpres.ro, radiorenasterea.ro, athos.guide. */

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
      'Prima mănăstire chinovială de la Athos și întâia în ierarhia Sfântului Munte, întemeiată în jurul anului 963 prin nevoința Cuviosului Atanasie din Trapezunt, cu sprijinul împăraților bizantini Nichifor al II-lea Phokas și Ioan I Tzimiskes. Are jurisdicție asupra tuturor schiturilor și sihăstriilor din jurul vârfului Athonului.',
    notes: [
      'În katholikonul mănăstirii se află mormântul Sfântului Atanasie Athonitul; alături se păstrează toiagul său de fier cu patru muchii și crucea de lemn ferecată în fier pe care o purta la piept.',
    ],
  },
  vatopedi: {
    name: 'Vatoped',
    founded: '972–985',
    patronalFeast: 'Buna Vestire (25 martie / 7 aprilie)',
    intro:
      'Una dintre cele mai mari și mai însemnate mănăstiri ale Sfântului Munte, având una dintre cele mai numeroase obști. Așezată în partea de nord-est a peninsulei, este a doua în ierarhia athonită. Aici se păstrează Cinstitul Brâu al Maicii Domnului, dăruit mănăstirii de împăratul Ioan al VI-lea Cantacuzino, precum și șapte icoane făcătoare de minuni ale Maicii Domnului — între care Vimatarissa, Paramythia, Pantanassa, Elaiovrytissa, Antifonitria, Esfagmeni și Pyrovolitheisa.',
    notes: [
      'Paraclisul închinat Sfântului Brâu al Maicii Domnului a fost zidit de Sfântul Neagoe Basarab în anul 1520. Tot de Vatoped sunt legate trei chilii românești: Sfântul Ipatie, Sfântul Ioan Botezătorul și Sfântul Gheorghe Colciu.',
    ],
  },
  iviron: {
    name: 'Iviron',
    founded: '980–983',
    patronalFeast: 'Adormirea Maicii Domnului (15 / 28 august)',
    intro:
      'A treia în ierarhia athonită, zidită între anii 980 și 983 de Cuviosul Ioan Iviritul — general bizantin originar din Iviria (Georgia de astăzi) — împreună cu fiul său Eftimie și cu rudenia Gheorghe, după tunderea lor în monahism de către Sfântul Atanasie Athonitul. Locuită vreme îndelungată de monahi georgieni, de unde și numele Iviron.',
    notes: [
      'La paraclisul de la poarta mănăstirii se află icoana făcătoare de minuni a Maicii Domnului Portărița (Portaitissa), venită pe mare de la Constantinopol în vremea iconoclasmului. A fost scoasă din valuri de monahul Gavriil, fiul femeii care o trimisese din Constantinopol.',
    ],
  },
  hilandar: {
    name: 'Hilandar',
    founded: '1198',
    patronalFeast: 'Intrarea în Biserică a Maicii Domnului (21 noiembrie / 4 decembrie)',
    intro:
      'A patra în ierarhia athonită, mănăstirea sârbilor de la Sfântul Munte, recunoscută ca independentă în 1198 prin hrisov al împăratului Alexie al III-lea Anghel. Reînnoită și socotită ca ctitorii de Sfinții Simeon (Ștefan Nemania) și Sava — întâi-stătătorul Bisericii Sârbe — care au făcut din ea centrul duhovnicesc al neamului sârbesc.',
    notes: [
      'A suferit un puternic incendiu în anul 2004; lucrările de restaurare continuă de atunci. Mănăstirea a fost locuită neîntrerupt de monahi sârbi de la întemeiere și până astăzi.',
    ],
  },
  dionysiou: {
    name: 'Dionisiu',
    founded: '1374',
    patronalFeast: 'Nașterea Sfântului Ioan Botezătorul (24 iunie / 7 iulie)',
    intro:
      'A cincea în ierarhia athonită, ridicată în secolul al XIV-lea de Cuviosul Dionisie din Korisos, cu sprijinul împăratului Alexie al III-lea Comnenul al Trapezuntului, după hrisovul de întemeiere din 1374. Locul ctitoriei i-a fost arătat printr-o lumină ca o stea ce cobora din cer noapte de noapte, până în zori.',
    notes: [
      'Aici se păstrează mâna dreaptă a Sfântului Ioan Botezătorul, hramul mănăstirii, un dinte al Sfântului Hristofor și părticele din moaștele Sfinților Apostol Luca și Întâi-Mucenic Ștefan. În 1535 mănăstirea a fost mistuită de un incendiu.',
    ],
  },
  koutloumousiou: {
    name: 'Cutlumuș',
    founded: 'sec. XII–XIII',
    patronalFeast: 'Schimbarea la Față a Domnului (6 / 19 august)',
    intro:
      'Numită „Lavra Țărilor Române" pentru ajutorul primit din partea voievozilor români și pentru numeroșii viețuitori români. Refăcută din temelii în a doua jumătate a secolului al XIV-lea de Hariton din Imvros — protul Sfântului Munte și mai târziu mitropolit al Țării Românești (1372–1380) — cu sprijin material adus de Vlaicu Vodă. Hramul este Schimbarea la Față a Domnului, iar locul în ierarhia athonită al șaselea.',
    notes: [
      'Mai târziu, mănăstirea a fost înnoită de Sfântul Voievod Neagoe Basarab, de Mircea cel Bătrân și de Vintilă Vodă. Ultima danie românească însemnată a fost a jupânesei Marghioala Procopie Canusi, cu ajutorul căreia mănăstirea a fost refăcută după marele incendiu din 1870.',
    ],
  },
  pantokratoros: {
    name: 'Pantocrator',
    founded: '1357',
    patronalFeast: 'Schimbarea la Față a Domnului (6 / 19 august)',
    intro:
      'A șaptea în ierarhia athonită, reîntemeiată la mijlocul secolului al XIV-lea de frații Alexie și Ioan, dregători bizantini și ofițeri în oastea împăratului Ioan al V-lea Paleologul. Sfințită de Patriarhul Ecumenic Calist I cu puțin înainte de săvârșirea sa. Se înalță pe un mic promontoriu stâncos deasupra coastei de nord-est, lângă Mănăstirea Stavronichita.',
    notes: [
      'Alexie a adormit în 1368/1369, lucrarea fiind dusă mai departe de Ioan, care în 1384 a luat schima cea mare la Pantocrator, primind numele Ioanichie. În 1385 mănăstirea a fost atinsă de un puternic incendiu și a fost reînnoită de Patriarhul Antonie al Constantinopolului și de împăratul Manuel al II-lea Paleologul.',
    ],
  },
  xeropotamou: {
    name: 'Xiropotamu',
    founded: 'sec. X',
    patronalFeast: 'Sfinții 40 de Mucenici din Sevastia (9 / 22 martie)',
    intro:
      'Așezată pe partea de sud-vest a peninsulei, pe drumul de la Dafni spre Careia. Numele vine de la o vâlcea adâncă cu un pârâu care seacă vara, dar este lat și adânc iarna. După tradiție, întemeiată în anul 424 de împărăteasa Pulheria, care a adus aici și părți din moaștele celor 40 de Mucenici din Sevastia. Hramul mănăstirii este al Sfinților 40 de Mucenici.',
    notes: [
      'Mănăstirea păstrează cea mai mare bucată cunoscută din Lemnul Sfintei Cruci, cu semnul cuiului cu care a fost răstignit Mântuitorul. În fiecare an, la praznicul Sfinților 40 de Mucenici, în jurul Sfântului Altar răsăreau, după tradiție, 40 de ciuperci, care erau împărțite credincioșilor ca binecuvântare.',
    ],
  },
  zographou: {
    name: 'Zografu',
    founded: 'sec. X',
    patronalFeast: 'Sfântul Mare Mucenic Gheorghe (23 aprilie / 6 mai)',
    intro:
      'A noua în ierarhie, mănăstirea bulgarilor de la Sfântul Munte, ascunsă în interiorul împădurit al peninsulei. Întemeiată în secolul al X-lea, după tradiție, de trei frați monahi din Ohrida — Moise, Aron și Ioan. Fiecare voia un alt hram, așa că au pus în biserică o scândură nezugrăvită și au priveghet o noapte; dimineața s-au trezit cu chipul Sfântului Gheorghe zugrăvit pe ea, „nefăcut de mână omenească". De atunci mănăstirea poartă numele Zografu („Pictorul"), iar hramul este al Sfântului Mare Mucenic Gheorghe.',
  },
  docheiariou: {
    name: 'Dochiariu',
    founded: 'sec. X',
    patronalFeast: 'Soborul Sfinților Arhangheli Mihail și Gavriil (8 / 21 noiembrie)',
    intro:
      'A zecea în ierarhie din anul 1046, așezată pe partea de sud-vest a peninsulei, între portul Mănăstirii Zografu și Mănăstirea Xenofont. Are una dintre cele mai elegante arhitecturi ale Sfântului Munte. Inițial închinată Sfântului Ierarh Nicolae, are astăzi hramul Soborul Sfinților Arhangheli Mihail și Gavriil, schimbat în urma mai multor minuni săvârșite prin mijlocirea Sfinților Arhangheli.',
    notes: [
      'Într-un paraclis alipit zidului trapezei se află icoana făcătoare de minuni a Maicii Domnului „Gorgoepicoos" — adică „Grabnic-Ascultătoarea".',
    ],
  },
  karakallou: {
    name: 'Caracalu',
    founded: 'sec. XI',
    patronalFeast: 'Sfinții Apostoli Petru și Pavel (29 iunie / 12 iulie)',
    intro:
      'A unsprezecea în ierarhia athonită, așezată în interiorul peninsulei, deasupra coastei de est, între Marea Lavră și Iviron. Atestată documentar în 1018 și 1087. Numele vine, după tradiție, de la împăratul roman Caracalla sau, mai degrabă, de la monahul Karakalas, socotit ctitor.',
    notes: [
      'În secolul al XVI-lea mănăstirea a fost pustiită de pirați. Voievodul Moldovei Petru Rareș a răscumpărat de la turci toate odoarele luate și a zidit din nou mănăstirea împreună cu biserica cea mare, înnoită în 1548. Astăzi viețuiesc aici aproximativ 50 de monahi.',
    ],
  },
  philotheou: {
    name: 'Filoteu',
    founded: 'sec. X',
    patronalFeast: 'Buna Vestire (25 martie / 7 aprilie)',
    intro:
      'Așezată într-o poiană din partea de nord-est a peninsulei, între pădurile de castani, la o jumătate de ceas de mers pe jos de Mănăstirea Caracalu. Întemeiată la sfârșitul secolului al X-lea de Cuviosul Filotei împreună cu nevoitorii Arsenie și Dionisie — contemporani cu Sfântul Atanasie Athonitul. Hramul este Buna Vestire.',
    notes: [
      'Adăpostește icoana făcătoare de minuni a Maicii Domnului „Dulcea Sărutare" (Glykofilousa), care, după tradiție, datează din vremea iconoclasmului (sec. VIII–IX) și a venit pe mare de la Constantinopol, de la jupâneasa Victoria. În fiecare luni a Săptămânii Luminate părinții mănăstirii merg cu icoana în procesiune până la izvorul de pe țărm, locul unde a fost aflată.',
    ],
  },
  simonopetra: {
    name: 'Simonos Petras (Simonopetra)',
    founded: 'sec. XIII',
    patronalFeast: 'Nașterea Domnului (25 decembrie / 7 ianuarie)',
    intro:
      'A treisprezecea în ierarhia athonită, așezată pe vârful unei stânci, la 230 m deasupra mării, în partea de sud-vest a peninsulei. După tradiție, în noaptea Nașterii Domnului, o stea a coborât din cer arătând Cuviosului Simon Athonitul locul unde să zidească mănăstirea — de aceea s-a și numit „Noul Vitleem". Hramul este Nașterea Domnului.',
    notes: [
      'În 1580 (sau 1581) mănăstirea a fost mistuită cu totul de un incendiu, care a luat viața multor monahi; supraviețuitorii, în frunte cu egumenul Evghenie, au reușit să salveze odoarele.',
    ],
  },
  'agiou-pavlou': {
    name: 'Sfântul Pavel (Aghiou Pavlou)',
    founded: 'sec. X',
    patronalFeast: 'Întâmpinarea Domnului (2 / 15 februarie)',
    intro:
      'Întemeiată în a doua jumătate a secolului al X-lea de Cuviosul Pavel Xeropotamitul, sub poalele de sud-vest ale Athonului. Hramul mănăstirii este Întâmpinarea Domnului.',
    notes: [
      'Aici se păstrează darurile aduse de magi la Nașterea Mântuitorului: 14 bucățele de aur și 62 de boabe de smirnă și tămâie înșirate pe fir. Darurile au fost aduse, după tradiție, de împărăteasa Maro (Mara), fiica sultanului Murad al II-lea; oprită de un glas din cer la jumătatea drumului spre mănăstire — „Maro, stai! Nu mai trece înainte: de aici începe împărăția altei Împărătese, a Maicii Domnului, ocrotitoarea Sfântului Munte" — le-a dat egumenului și s-a întors la corabie.',
    ],
  },
  stavronikita: {
    name: 'Stavronikita',
    founded: 'sec. XVI (refăcută)',
    patronalFeast: 'Sfântul Nicolae al Mirelor Lichiei (6 / 19 decembrie)',
    intro:
      'A cincisprezecea în ierarhia athonită și cea mai mică dintre cele douăzeci de mănăstiri conducătoare. Refăcută între 1527–1546 prin râvna Patriarhului Ieremia I al Constantinopolului, socotit „al doilea și cel mai însemnat ctitor". Biserica cea nouă, închinată Sfântului Nicolae, a fost zugrăvită în 1546 de Teofan Cretanul împreună cu fiul său Simeon.',
    notes: [
      'Mănăstirea a primit ajutor și de la voievozii români Vlad Vintilă, Radu Paisie, Ieremia Movilă, Matei Basarab și Ștefan Cantacuzino.',
    ],
  },
  xenophontos: {
    name: 'Xenofont',
    founded: 'sec. X–XI',
    patronalFeast: 'Sfântul Mare Mucenic Gheorghe (23 aprilie / 6 mai)',
    intro:
      'Pe coasta de sud-vest, imediat la sud de Dochiariu. Ridicată în secolul al X-lea de Cuviosul Xenofont, după al cărui nume se cheamă. Hramul este al Sfântului Mare Mucenic Gheorghe.',
    notes: [
      'Adăpostește două icoane mozaicate, rare la Sfântul Munte, înfățișând pe Sfinții Mari Mucenici Dimitrie (în dreapta) și Gheorghe (în stânga), de 1,20 × 0,55 m, datând din sec. X–XI. Sfinții sunt zugrăviți în veșminte de dregători imperiali, nu în îmbrăcăminte ostășească.',
    ],
  },
  'osiou-grigoriou': {
    name: 'Grigoriu',
    founded: 'sec. XIV',
    patronalFeast: 'Sfântul Nicolae al Mirelor Lichiei (6 / 19 decembrie)',
    intro:
      'A șaptesprezecea în ierarhia athonită, așezată pe stâncă, lângă mare, în partea de sud-vest a peninsulei, între mănăstirile Dionisiu și Simonos Petras. Întemeiată în secolul al XIV-lea de ucenicii Sfântului Grigorie Sinaitul — după tradiție, de Cuviosul Grigorie cel Tânăr. La început mănăstirea purta numele Sfântului Nicolae, hramul ei; mai apoi a luat numele ctitorului.',
    notes: [
      'Între odoarele mănăstirii se păstrează moaște ale Sfintei Anastasia Romana, ale Sfântului Mucenic Haralambie, capul Sfântului Grigorie de Nazianz cel Bătrân, capul Sfintei Fotini și o părticică din moaștele Sfântului Nicolae.',
    ],
  },
  esphigmenou: {
    name: 'Esfigmenu',
    founded: 'sec. X–XI',
    patronalFeast: 'Înălțarea Domnului (sărbătoare mobilă)',
    intro:
      'Așezată pe țărmul nord-estic al Sfântului Munte, într-un golf adăpostit de vânt, închinată Înălțării Domnului. Numele de „Esfigmenu" — „strâmtorat" — vine de la așezarea ei între trei coline. După tradiție, întemeierea este datată în secolul al V-lea, ctitori socotiți fiind împăratul Teodosie al II-lea și sora sa Pulheria.',
    notes: [
      'Obștea s-a remarcat de-a lungul vremii prin rigoarea vieții ascetice și a păstrat calendarul iulian. În urma încercării de apropiere a Patriarhului Bartolomeu I de Biserica Catolică, monahii de la Esfigmenu au încetat să-l mai pomenească la slujbe și au ajuns la o îndelungată cumpănă cu Patriarhia.',
    ],
  },
  'st-panteleimon': {
    name: 'Sfântul Pantelimon (Rusicon)',
    founded: 'sec. XI (locul actual: sec. XVIII)',
    patronalFeast: 'Sfântul Mare Mucenic Pantelimon (27 iulie / 9 august)',
    intro:
      'Marea Lavră a rușilor de la Sfântul Munte, cunoscută și sub numele de „Rusicon" (Русик). Întemeiată în secolul al XI-lea, sub împărăția lui Alexie I Comnenul, de câțiva monahi veniți din Rusia. Biserica cea mare a fost zidită în actuala așezare, pe coasta de sud-vest — între Mănăstirile Xenofont și Xiropotamu — în anul 1765. Hramul este al Sfântului Mare Mucenic Pantelimon.',
    notes: [
      'Adevărat colos, cu două biserici înăuntru, vreo 35 de paraclise și patru corpuri mari de chilii cu câte patru și cinci niveluri. În anul 1855 număra 350 de călugări, iar către sfârșitul secolului al XIX-lea, peste 1000 — viețuind împreună ruși, greci, sârbi, bulgari și români.',
    ],
  },
  konstamonitou: {
    name: 'Costamonitu',
    founded: 'sec. XI',
    patronalFeast: 'Sfântul Întâi-Mucenic și Arhidiacon Ștefan (27 decembrie / 9 ianuarie)',
    intro:
      'A douăzecea și ultima în ierarhia mănăstirilor athonite, închinată Sfântului Întâi-Mucenic și Arhidiacon Ștefan. Așezată într-un loc deschis și frumos, pe latura golfului Singhitic, între mănăstirile Zografu și Dochiariu, la un ceas de mers pe jos de țărm. Biserica de astăzi a fost zidită în 1867.',
  },
};

export const SETTLEMENTS_RO: Record<string, PlaceRo> = {
  'skete-st-anne': {
    name: 'Schitul Sfânta Ana',
    founded: 'sec. XIV',
    patronalFeast: 'Adormirea Sfintei Ana (25 iulie / 7 august)',
    intro:
      'Cel mai vechi și mai mare schit al Sfântului Munte, așezat pe teritoriul Marii Lavre, în partea de sud-vest a peninsulei, la aproximativ 500 m altitudine. Întemeierea îi este atestată din secolul al XIV-lea, primul ctitor fiind Cuviosul Gherontie, ultimul stareț al mănăstirii Vuleftiria, având legături duhovnicești cu Sfântul Maxim Kavsokalivitul.',
    notes: [
      'La 25 octombrie 1686, moaștele Sfintei Ana — partea de jos a piciorului stâng, acoperită cu pielea — au fost aduse de la Schitul Provata și așezate în biserica cea nouă; de atunci, schitul, numit înainte „Schitul Lavrei", a luat numele Sfintei Ana, bunica Domnului. Cuprinde astăzi 44 de chilii cu circa 120 de monahi, care se îndeletnicesc cu împletitul de coșuri, sculptură în lemn, alcătuirea de cântări, prepararea tămâiei, croitorie și pictură de icoane.',
    ],
  },
  'skete-nea': {
    name: 'Schitul Nou (Nea Skiti)',
    founded: 'sec. XVIII',
    patronalFeast: 'Nașterea Maicii Domnului (8 / 21 septembrie)',
    intro:
      'Schit idioritmic dependent de Mănăstirea Sfântul Pavel, așezat lângă mare, între Mănăstirea Sfântul Pavel și Schitul Sfânta Ana. Cuprinde 28 de chilii și colibe locuite de aproape 40 de monahi. Aici se află chiliile celor mai renumiți iconari athoniți. Kiriakonul a fost zidit în 1760 și are hramul Nașterea Maicii Domnului.',
  },
  'skete-kafsokalyvia': {
    name: 'Schitul Cavsocalivia (Kavsokalivia)',
    founded: 'organizat în sec. XVIII',
    patronalFeast: 'Sfânta Treime (sărbătoare mobilă, Rusaliile)',
    intro:
      'Schit idioritmic grecesc dependent de Marea Lavră, așezat în partea de sud-est a peninsulei, la 120 m altitudine și la trei ceasuri de mers de mănăstirea-mamă. Numele vine de la Sfântul Maxim Kavsokalivitul († 13 ianuarie 1365), care își ardea coliba de paie ca să nu se așeze, pribegind apoi ca „nebun pentru Hristos" — în grecește, kafsokalyvitos, „cel ce-și arde coliba".',
    notes: [
      'Kiriakonul de astăzi, închinat Sfintei Treimi, a fost zidit în 1745. Pe lângă biserica cea mare, schitul are alte trei biserici mai mici. Astăzi viețuiesc aici aproximativ 30 de monahi, care se îndeletnicesc cu sculptura în lemn, cu pictura de icoane și cu împletirea metaniilor.',
    ],
  },
  'skete-prodromou-romanian': {
    name: 'Schitul Românesc Prodromu',
    founded: '1857',
    patronalFeast: 'Nașterea Sfântului Ioan Botezătorul (24 iunie / 7 iulie)',
    intro:
      'Cea mai mare așezare monahală românească de la Sfântul Munte, schit chinovial dependent de Marea Lavră. Reorganizat în forma de astăzi între 1852 și 1866 prin osteneala ieroschimonahilor Nifon Ionescu și Nectarie, veniți de la Mănăstirea Horaița din ținutul Neamțului. Piatra de temelie a noii biserici a fost pusă în martie 1857 cu binecuvântarea Marii Lavre, iar târnosirea s-a săvârșit în 1866. Hramul este Nașterea Sfântului Ioan Botezătorul (gr. Prodromos — „Înaintemergătorul").',
    notes: [
      'Ridicarea și întărirea schitului au fost sprijinite de domnitorul Moldovei Grigore Alexandru Ghica, de caimacamul Țării Românești Alexandru Ghica, de mitropoliții Sofronie al Moldovei și Nifon al Țării Românești, precum și de numeroși credincioși din Principatele Române. Primul stareț a fost ieroschimonahul Nifon Ionescu însuși, care a adunat în jurul lui până la 60 de ucenici.',
    ],
  },
  'skete-iviron-prodromou': {
    name: 'Schitul Cinstitului Înaintemergător (Iviru)',
    founded: 'sec. XVII',
    patronalFeast: 'Tăierea capului Sfântului Ioan Botezătorul (29 august / 11 septembrie)',
    intro:
      'Schit grecesc idioritmic dependent de Mănăstirea Iviron, așezat în dealurile împădurite din spatele mănăstirii-mamă — în chip tradițional, loc de aspră isihie.',
  },
  'skete-lakkou': {
    name: 'Schitul Românesc Lacu',
    founded: 'cca. 1760',
    patronalFeast: 'Sfântul Mare Mucenic Dimitrie Izvorâtorul de Mir (26 octombrie / 8 noiembrie)',
    intro:
      'Una dintre cele mai vechi vetre monahale românești din Sfântul Munte, a doua ca mărime între așezările românești de aici. Schit idioritmic dependent de Mănăstirea Sfântul Pavel, așezat în partea de nord-est a peninsulei, între Turnul Amalfionului și mănăstirea-mamă, la o jumătate de ceas de mers peste munte. În Patericul atonit a fost numit „cea mai adâncă pustie" sau „Tebaida Sfântului Munte".',
    notes: [
      'Aici au viețuit din secolul al XIV-lea monahi sârbi; pe la mijlocul secolului al XVIII-lea au început să sosească monahi din Principatul Moldovei. Pe la 1760, ieromonahul Daniil de la Mănăstirea Neamț a organizat obștea în chip de schit și a zidit o biserică de lemn cu hramul Sfântului Mare Mucenic Dimitrie. Noul kiriakon, început în 1898 cu cheltuiala monahului Iustin, a fost terminat în 1904. La începutul secolului XX viețuiau aici peste 120 de monahi în 24 de colibe.',
    ],
  },
  'skete-st-demetrios': {
    name: 'Schitul Sfântul Dimitrie (Lakkos)',
    founded: 'sec. XVII',
    patronalFeast: 'Sfântul Mare Mucenic Dimitrie Izvorâtorul de Mir (26 octombrie / 8 noiembrie)',
    intro:
      'Schit grecesc idioritmic pe povârnișul de sud-vest, dependent de Mănăstirea Sfântul Pavel.',
  },
  'skete-xenophontos': {
    name: 'Schitul Buna Vestire (Xenofont)',
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
      'Schit grecesc idioritmic la scurtă distanță de Careia, dependent de mănăstirea-mamă Cutlumuș. La rândul lui poartă numele monahilor români aduși de Vlaicu Vodă în vremea egumenului Hariton, care le-a făcut acest așezământ.',
  },
  'skete-profitis-ilias': {
    name: 'Schitul Sfântul Prooroc Ilie',
    founded: '1759',
    patronalFeast: 'Sfântul Prooroc Ilie Tesviteanul (20 iulie / 2 august)',
    intro:
      'Schit chinovial dependent de Mănăstirea Pantocrator, așezat pe coastă, deasupra mănăstirii-mamă, la 140 m altitudine. Cea mai veche pomenire a chiliei închinate Sfântului Ilie este din 1492, când Vlad Călugărul, domn al Țării Românești, i-a dat un venit anual de 1000 de aspri.',
    notes: [
      'În 1757, Sfântul Cuvios Paisie Velicikovski s-a sălășluit aici cu 35 de ucenici și a început să tâlmăcească scrieri filocalice din grecește în românește și slavonește. În 1762, pentru creșterea obștii, a plecat cu 64 de ucenici la Simonopetra, apoi la Dragomirna, în Moldova. În 1839 chilia a fost recunoscută ca schit chinovial rusesc; din 1992 a primit obște grecească de la Schitul „Bunavestire" al Mănăstirii Xenofont.',
    ],
  },
  'skete-st-andrew': {
    name: 'Schitul Sfântul Andrei (Serai)',
    founded: '1841',
    patronalFeast: 'Sfântul Apostol Andrei, Cel Întâi-Chemat (30 noiembrie / 13 decembrie)',
    intro:
      'Așezat la 500 m de Careia, capitala administrativă a Sfântului Munte. Cunoscut sub numele „Serai", care în limba rusă înseamnă „acest Rai". Proprietate a Mănăstirii Vatoped. În 1841, monahii ruși Visarion și Varsanufie au cumpărat chilia, iar în 1849, prin sigiliu al Patriarhului ecumenic Antim al VI-lea, ea a fost recunoscută ca schit cu viață de obște.',
    notes: [
      'Biserica cea mare, închinată Sfântului Apostol Andrei, a fost ridicată după planurile profesorului Serghei Surupov și sub conducerea arhitectului grec Hristodulos, cu temelia pusă în 1867. Sfințită în 1900 de Patriarhul Ioachim al III-lea, este una dintre cele mai mari biserici din Balcani (60 × 33 × 29 m). Cel mai de preț odor al schitului este o parte din moaștele (fruntea) Sfântului Apostol Andrei. După 1992, obștea a fost reînviorată ca obște grecească.',
    ],
  },
  'skete-bogoroditsa': {
    name: 'Schitul Bunavestire (Bogorodița)',
    founded: 'sec. XVII',
    patronalFeast: 'Adormirea Maicii Domnului (15 / 28 august)',
    intro:
      'Schit chinovial bulgăresc în interiorul împădurit al peninsulei, dependent de Mănăstirea Pantocrator — legat istoric de Mănăstirea bulgară Zografu și de Mănăstirea rusească Sfântul Pantelimon.',
  },

  karoulia: {
    name: 'Karulia',
    founded: 'origini medievale',
    intro:
      'Cea mai aspră sihăstrie a Sfântului Munte, așezată în punctul cel mai sudic al peninsulei, pe o stâncă uscată și abruptă, cu chilii risipite prin scobiturile firești ale stâncilor. Numele vine de la „karouli" — micile scripeți cu care sihaștrii trag în coșuri apa și pâinea aduse ca milostenie de monahi sau de pescari. Locul este împărțit în Karulia exterioară și Karulia interioară.',
    notes: [
      'Cele mai multe chilii sunt mici și ridicate cu mâna lor, din materiale adunate. Trecerea dinspre Karulia exterioară spre cea interioară se face cu ajutorul unor lanțuri de sprijin, iar coborârea pe peretele de stâncă se face ținându-te cu amândouă mâinile de lanț și sprijinindu-te în scobituri în care abia încape vârful piciorului. La începutul secolului XX viețuiau aici 30 de pustnici; astăzi numărul lor se mișcă între 10 și 20. La început a aparținut de Schitul „Mica Sfântă Ana"; în 1877 a fost vândută de Marea Lavră unor monahi ruși.',
    ],
  },
  kapsala: {
    name: 'Kapsala',
    founded: 'origini medievale',
    intro:
      'Așezare sihăstrească pe povârnișurile împădurite la est de Careia, între mănăstirile Pantocrator și Stavronikita. Așezare liniștită și ferită, care întruchipează tăcerea și adâncul duhovnicesc al Sfântului Munte și împletește, în chip rar, viața de obște cu nevoința în singurătate.',
  },
  vigla: {
    name: 'Vigla',
    founded: 'origini medievale',
    intro:
      'Sihăstrie așezată la marginea de sud-est a peninsulei athonite, pe povârnișul dintre Cavsocalivia și Marea Lavră. Numele (gr. βίγλα — „turn de strajă") amintește de vechile posturi de pază de pe țărm, ridicate pentru a vesti debarcarea piraților. Tot în Vigla se află Peștera Sfântului Atanasie Athonitul.',
  },
  provata: {
    name: 'Provata',
    founded: 'origini medievale',
    intro:
      'Așezare sihăstrească din interiorul peninsulei, dependentă de Marea Lavră, în apropierea Mănăstirii Caracalu — un colț liniștit, cu chilii ascunse în pădurea de castani de deasupra coastei de est.',
  },
  katounakia: {
    name: 'Katunakia',
    founded: 'organizat în sec. XVII',
    patronalFeast: 'Sfântul Acachie Kavsokalivitul (12 / 25 aprilie)',
    intro:
      'Schit idioritmic dependent de Marea Lavră, așezat pe stâncile de sud-vest, între Schitul „Mica Sfântă Ana" și Karulia, cu 22 de chilii și aproape 35 de monahi. Aici se cinstesc chiliile, capetele și sfintele moaște ale unor mari isihaști — între care Cuviosul Daniil Katunakiotul și Cuviosul Efrem Katunakiotul. Organizat în chip de schit abia în secolul al XVII-lea, odată cu ridicarea kiriakonului.',
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
      'Ultimul sat înainte de granița Sfântului Munte. Biroul Pelerinilor (Γραφείο Προσκυνητών) se află în port. De aici pleacă zilnic feribotul cel mare spre Dafni, oprind la arsanalele Mănăstirilor Hilandar, Zografu, Costamonitu, Dochiariu, Xenofont și Sfântul Pantelimon.',
  },
  ierissos: {
    name: 'Ierissos',
    role: 'Port secundar de pe continent — pentru pelerinii spre coasta de nord-est.',
    notes:
      'Plecările sunt mai rare. Bărcile opresc la arsanalele Mănăstirilor Hilandar, Vatoped, Pantocrator, Stavronikita, Iviron, Filoteu și Caracalu, precum și la debarcaderul Morfonou.',
  },
  daphne: {
    name: 'Dafni',
    role: 'Portul principal de pe Athos.',
    notes:
      'Un autocar face legătura între Dafni și Careia (capitala administrativă) la sosirea feribotului cel mare. Bărcile mici merg apoi spre sud-est, către Simonopetra, Grigoriu, Dionisiu, Sfântul Pavel și Schitul Cavsocalivia.',
  },
  karyes: {
    name: 'Careia (Kareia)',
    role: 'Capitala administrativă a Sfântului Munte.',
    notes:
      'Așezată aproape de mijlocul peninsulei, la 370 m altitudine. Aici se află clădirea Sfintei Chinotite — sfatul a 20 de monahi, câte unul din fiecare mănăstire, aleși anual. În față se înalță Biserica Protaton, închinată Adormirii Maicii Domnului — cea mai însemnată biserică a Sfântului Munte, în formă de bazilică, pictată la începutul secolului al XIV-lea de marele zugrav Manuel Panselinos. În altarul ei se păstrează icoana făcătoare de minuni „Axion Estin" („Vrednică ești").',
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
      'Feribotul cel mare al pelerinilor. Pleacă zilnic din Ouranoupoli la 09:45 și ajunge la Dafni în jurul orei 11:45, după o călătorie de aproape două ore. Oprește pe coasta de sud-vest la arsanalele Mănăstirilor Hilandar, Zografu, Costamonitu, Dochiariu, Xenofont și Sfântul Pantelimon. Cursa de întoarcere pleacă din Dafni la 12:10 și ajunge la Ouranoupoli la 14:10.',
  },
  'ouranoupoli-daphne-express': {
    from: 'Ouranoupoli',
    to: 'Dafni',
    vessel: 'Vedeta rapidă Hodegetria',
    operator: 'Operatori locali',
    notes:
      'Vedetă rapidă, cu durata călătoriei de circa 45 de minute între Ouranoupoli și Dafni. Mai puține opriri. Orarul variază după sezon — verifică în port cu o seară înainte.',
  },
  'daphne-kafsokalyvia': {
    from: 'Dafni',
    to: 'Cavsocalivia (schitul sud-estic)',
    vessel: 'Aghia Anna / Mikra Aghia Anna',
    notes:
      'Are legătură cu feribotul cel mare din Ouranoupoli. Oprește la Simonopetra, Grigoriu, Dionisiu, Sfântul Pavel, Schitul Nou, Sfânta Ana, Karulia și Cavsocalivia.',
  },
  'ierissos-coast': {
    from: 'Ierissos',
    to: 'Coasta de nord-est',
    vessel: 'Vedeta „Panagia"',
    operator: 'Servicii de barcă Ierissos',
    notes:
      'Pleacă zilnic din Ierissos la 08:35. Oprește la arsanalele Mănăstirilor Hilandar, Vatoped, Pantocrator, Stavronikita, Iviron, Filoteu și Caracalu, precum și la debarcaderul Morfonou — în funcție de vreme. Nu circulă în fiecare zi — verifică la fața locului.',
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
  bureauName: 'Biroul Pelerinilor de la Sfântul Munte Athos (Γραφείο Προσκυνητών)',
  bureauCity: 'Tesalonic',
  bureauAddress: 'Str. Egnatia 109, Tesalonic, Grecia',
  notes: [
    'Diamonitirion-ul este actul sigilat cu pecetea Sfântului Munte (vulturul bicefal bizantin), care încuviințează intrarea pe Athos și găzduirea în mănăstiri pe durata pelerinajului; cuprinde datele personale și termenul de ședere.',
    'Avaton — femeile nu au îngăduit să intre pe Sfântul Munte și nici să se apropie la mai puțin de 500 m de țărm. Tradiția, pusă pe seama Maicii Domnului însăși, ocrotitoarea Athonului, este în vigoare din vremea împăratului Ioan I Tzimiskes (970), printr-un Typicon semnat de Sfântul Atanasie Athonitul. Locul este numit „Grădina Maicii Domnului".',
    'Rezervarea se face din vreme la Biroul Pelerinilor (tel. +30 23102 52578, e-mail piligrimsbureau@c-lab.gr sau athosreservation@gmail.com), numai după ce ai confirmare de cazare pentru fiecare noapte. În sezoanele de vârf (Sfintele Paști, Adormirea Maicii Domnului, vara) locurile se ocupă cu luni înainte.',
    'Permisul se ridică în dimineața plecării, de la Biroul Pelerinilor din Ouranoupoli, pe baza pașaportului sau actului de identitate original, după plata taxei de eliberare. Biroul lucrează zilnic între 06:00 și 11:45 și se închide înainte de plecarea feribotului cel mare.',
    'Pelerinii români pot cere mijlocirea Schiturilor Românești Prodromu și Lacu pentru obținerea Diamonitirion-ului. O prelungire se poate obține uneori de la Sfânta Epistasie din Careia, după sosirea pe Sfântul Munte.',
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
      'Contactează Biroul Pelerinilor de la Tesalonic prin telefon (+30 23102 52578) sau e-mail (piligrimsbureau@c-lab.gr) cu cel puțin câteva săptămâni înainte, mai mult în sezoanele aglomerate. Indică data intrării, lungimea șederii și datele complete din pașaport. Pentru pelerinii români, Schiturile Românești Prodromu și Lacu pot mijloci rezervarea. Biroul îți confirmă un loc în cota zilnică a pelerinilor.',
  },
  2: {
    title: 'Călătoria spre Tesalonic',
    body:
      'Tesalonic (SKG) este cel mai apropiat aeroport internațional. Din oraș, drumul continuă pe uscat spre Ouranoupoli (aprox. 120 km, 2½ ore cu autocarul sau cu mașina).',
  },
  3: {
    title: 'Autocar sau mașină până la Ouranoupoli',
    body:
      'Compania KTEL Halkidikis are curse regulate din autogara KTEL Chalkidikis din Tesalonic spre Ouranoupoli, de mai multe ori pe zi. Ultimul sat înainte de Sfântul Munte are pensiuni; cei mai mulți pelerini înnoptează aici.',
  },
  4: {
    title: 'Ridică Diamonitirion-ul în Ouranoupoli',
    body:
      'În dimineața plecării, prezintă pașaportul la Biroul Pelerinilor din port (deschis între 06:00 și 11:45), achită taxa și primești permisul tipărit. Biroul se închide înainte de plecarea feribotului cel mare.',
  },
  5: {
    title: 'Îmbarcă-te pe feribot spre Dafni (sau pe coasta de est, din Ierissos)',
    body:
      'Feribotul cel mare al pelerinilor pleacă din Ouranoupoli la 09:45 și ajunge la Dafni în jurul orei 11:45. La îmbarcare se cere Diamonitirion-ul. Din Dafni un autocar duce spre Careia, iar bărci mici merg spre coasta de sud-est (Simonopetra → Cavsocalivia).',
  },
};
