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

import type { Legend, SacredIcon } from '../types';

interface PlaceRo {
  name?: string;
  founded?: string;
  patronalFeast?: string;
  intro?: string;
  notes?: string[];
  icons?: SacredIcon[];
  legends?: Legend[];
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
    icons: [
      {
        name: 'Maica Domnului Cucuzelița',
        nameGreek: 'Παναγία Κουκουζέλισσα',
        description:
          'Icoană făcătoare de minuni cinstită de Sfântul Ioan Cucuzel, marele psalt athonit al secolului al XIV-lea, care a auzit, în timpul priveghii, glasul Maicii Domnului zicând: „Cântă, Ioane, și nu vei lipsi de plată" — iar la trezire a aflat în mâna sa o monedă de aur.',
      },
      {
        name: 'Maica Domnului Iconoma',
        nameGreek: 'Παναγία Οἰκονόμισσα',
        description:
          'Icoana înaintea căreia Maica Domnului însăși i-a făgăduit Sfântului Atanasie că va fi de aici înainte iconoama mănăstirii. Din ziua aceea Marea Lavră nu mai are iconom dintre monahi: dregătoria a rămas Maicii Domnului.',
      },
      {
        name: 'Mormântul și toiagul Sfântului Atanasie',
        description:
          'Ctitorul este îngropat în katholikon; alături se păstrează toiagul său greu, ferecat în fier, și crucea de lemn pe care o purta la piept.',
      },
    ],
    legends: [
      {
        title: 'Maica Domnului Iconoma',
        description:
          'În vremea unei foamete grele de la începutul mănăstirii, Sfântul Atanasie a pornit să părăsească Sfântul Muntele. Pe drum i s-a arătat o femeie luminoasă, care a lovit cu toiagul în stâncă scoțând un izvor — „Aghiasma Maicii Domnului", care curge până astăzi — i-a umplut hambarele goale și i-a spus: „De aici înainte, Eu voi fi iconoama acestui locaș". De atunci, niciun monah nu a mai purtat dregătoria de iconom la Marea Lavră.',
      },
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
    icons: [
      {
        name: 'Cinstitul Brâu al Maicii Domnului',
        nameGreek: 'Τιμία Ζώνη',
        description:
          'Brâul țesut, după tradiție, cu mâinile Preasfintei Născătoare de Dumnezeu din păr de cămilă — singura sfântă moaște trupească a Maicii Domnului rămasă pe pământ. Dăruit Vatopedului de împăratul Ioan al VI-lea Cantacuzino; este cinstit ca tămăduitor de boli grele, mai ales pentru femeile care nu pot avea copii — moaștele se scot afară spre închinare, fără ca femeile să poată trece în Munte.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/7/75/Assumptiongirdle.jpg',
        imageCredit: 'Wikimedia Commons · domeniu public',
      },
      {
        name: 'Maica Domnului Vimatarissa',
        nameGreek: 'Παναγία Βηματάρισσα',
        description:
          'Numită „Locuitoarea altarului". A fost ascunsă sub lespedea Sfântului Altar, împreună cu o lumânare aprinsă, înaintea unui jaf arab din secolul al IX-lea. Șaptezeci de ani mai târziu a fost aflată de diaconul Sava — și icoana, și lumânarea încă ardeau, neatinse.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/4/47/%D0%A1%D0%B2%D0%B5%D1%82%D0%B0_%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B8%D1%86%D0%B0_%D0%9E%D0%BB%D1%82%D0%B0%D1%80%D0%BD%D0%B8%D1%86%D0%B0_%D0%92%D0%B8%D0%BC%D0%B0%D1%82%D0%B8%D1%80%D0%B8%D1%81%D0%B0%2C_%D0%BA%D1%80%D0%B0%D0%B9_%D0%BD%D0%B0_XII_%D0%B2%D0%B5%D0%BA%2C_%D0%92%D0%B0%D1%82%D0%BE%D0%BF%D0%B5%D0%B4.jpg',
        imageCredit: 'Wikimedia Commons · domeniu public',
      },
      {
        name: 'Maica Domnului Paramythia',
        nameGreek: 'Παναγία Παραμυθία',
        description:
          'Numită „Mângâierea". În dimineața zilei de 21 ianuarie 807, în clipa în care egumenul auzea citindu-se semnele de obște, Pruncul zugrăvit pe icoană a ridicat mâna și a astupat gura Maicii Sale, care îl prevenea să nu deschidă porțile — pirații așezaseră o cursă afară. Icoana se păstrează până astăzi în chipul în care a rămas atunci, cu mâna Pruncului la buzele Maicii Domnului.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/f/ff/Panagia_Paramythia_Icon_from_Vatopedi_Monastery_14th_Century.jpg',
        imageCredit: 'Wikimedia Commons · domeniu public',
      },
      {
        name: 'Maica Domnului Elaiovritissa',
        nameGreek: 'Παναγία Ἐλαιοβρύτισσα',
        description:
          'Numită „Izvorâtoarea de untdelemn". Când iconomul Sfântul Ghenadie se temea că untdelemnul mănăstirii s-a sfârșit, vasele goale au început să dea pe afară înaintea acestei icoane.',
      },
      {
        name: 'Maica Domnului Antifonitria',
        nameGreek: 'Παναγία Ἀντιφωνήτρια',
        description:
          'Numită „Răspunzătoarea". A mustrat-o pe împărăteasa Placidia, fiica lui Teodosie cel Mare, când a îndrăznit să treacă pragul katholikonului — întărind astfel avatonul, oprirea femeilor de a păși pe Sfântul Munte.',
      },
      {
        name: 'Maica Domnului Pyrovolitheisa',
        nameGreek: 'Παναγία Πυροβοληθεῖσα',
        description:
          'Numită „Cea împușcată". Un ostaș turc a tras în 1822 cu pușca în mâna dreaptă a Maicii Domnului; cuprins de tulburare și remușcare, s-a spânzurat de un măslin din afara zidurilor. Glonțul se vede până astăzi înfipt în panou.',
      },
      {
        name: 'Maica Domnului Esfagmeni',
        nameGreek: 'Παναγία Ἐσφαγμένη',
        description:
          'Numită „Cea înjunghiată". Un diacon, mâniat că nu i s-a dat masa la vreme, a lovit cu cuțitul icoana — și din rana de pe obrazul Maicii Domnului ar fi curs sânge. Diaconul s-a pocăit ani îndelungați, legat cu lanț de această icoană.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/5/54/%D0%A1%D0%B2%D0%B5%D1%82%D0%B0_%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B8%D1%86%D0%B0_%D0%97%D0%B0%D0%BA%D0%BB%D0%B0%D0%BD%D0%B0_%D0%95%D1%81%D1%84%D0%B0%D0%B3%D0%BC%D0%B5%D0%BD%D0%B8%2C_XIV_%D0%B2%D0%B5%D0%BA%2C_%D0%92%D0%B0%D1%82%D0%BE%D0%BF%D0%B5%D0%B4.jpg',
        imageCredit: 'Wikimedia Commons · domeniu public',
      },
      {
        name: 'Maica Domnului Pantanassa',
        nameGreek: 'Παναγία Παντάνασσα',
        description:
          'Numită „Împărăteasa tuturor". Vestită în vremurile noi prin tămăduirile de cancer și pentru rugăciunea înaintea ei pentru bolnavii grei; copii ale icoanei sunt trimise de obștea de la Vatopedi în toată lumea.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/5/5e/Pantanassa_%28Vatopedi_monastery%29.jpg',
        imageCredit: 'Wikimedia Commons · domeniu public',
      },
    ],
    legends: [
      {
        title: 'Pruncul aflat în rug',
        description:
          'Numele „Vatopedi" — „rugul pruncului" — vine, după tradiție, de la fiul împăratului Teodosie cel Mare, Arcadie, căzut în mare în largul țărmului. Împărăteasa și călugării l-au căutat în deznădejde, până l-au aflat dormind nevătămat într-un rug, deasupra locului unde se înalță astăzi katholikonul. Icoana Vimatarissa este cea înaintea căreia s-au plecat în mulțumire.',
      },
      {
        title: 'Întărirea avatonului',
        description:
          'Când Placidia, fiica lui Teodosie, a încercat să intre în katholikon în veacul al V-lea, un glas din icoana Antifonitria a oprit-o la prag: „Rămâi afară — locul acesta aparține altei Împărătese". Din ziua aceea, nicio femeie nu a mai pășit pe Sfântul Munte.',
      },
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
    icons: [
      {
        name: 'Maica Domnului Portărița',
        nameGreek: 'Παναγία Πορταΐτισσα',
        description:
          'Cea mai vestită icoană a Sfântului Munte. Se află într-un paraclis așezat lângă poarta mănăstirii, nu în katholikon, fiindcă Maica Domnului însăși a oprit-o acolo: „Nu am venit ca să Mă păziți voi — Eu am venit să vă păzesc". Pe obrazul Maicii Domnului se vede o rană adâncă, dintr-o lovitură de suliță a unui ostaș iconoclast din Constantinopol — din care, spune tradiția, a curs sânge.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/7/73/Iveron.jpg',
        imageCredit: 'Wikimedia Commons · domeniu public',
      },
    ],
    legends: [
      {
        title: 'Icoana venită pe mare',
        description:
          'În vremea prigoanei iconoclaste, o văduvă din Niceea, silită să ardă icoana Maicii Domnului, a încredințat-o mării. Două veacuri mai târziu, monahii de la Iviron au văzut, în largul țărmului lor, un stâlp de foc stând drept deasupra apei. După multe încercări nereușite, sihastrul Cuvios Gavriil Iviritul a pășit pe valuri și a luat icoana în brațe, aducând-o la mal. Au așezat-o în katholikon — dar dimineața de dimineață a fost aflată singură la poartă. Atunci au înțeles și au zidit paraclisul în care se află până astăzi.',
      },
      {
        title: 'Un semn înainte de sfârșit',
        description:
          'În Sfântul Munte se spune că, atunci când Portărița se va întoarce de la sine în mare, va fi semn că se apropie sfârșitul lumii.',
      },
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
    icons: [
      {
        name: 'Maica Domnului cu trei mâini',
        nameGreek: 'Παναγία Τριχερούσα',
        description:
          'Icoana făcătoare de minuni a Sfântului Ioan Damaschin. După ce calif Walid i-a tăiat mâna dreaptă pe nedrept, Sfântul Ioan s-a rugat înaintea acestei icoane și mâna sa a fost lipită la loc; în semn de mulțumire, a prins de panou o a treia mână de argint. Icoana, adusă mai târziu la Hilandar, stă astăzi pe scaunul stăreției — Hilandarul nu are stareț dintre monahi, ci doar pe Maica Domnului, pe care părinții o cinstesc ca „Egumena" lor.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/95/VergineTricherusa.jpg',
        imageCredit: 'Wikimedia Commons · domeniu public',
      },
      {
        name: 'Vița Sfântului Simeon',
        description:
          'O viță-de-vie crescută din mormântul Sfântului Simeon (Nemania), ctitorul mănăstirii, prin zidul katholikonului. Strugurii ei uscați sunt trimiși în toată lumea și sunt cinstiți pentru nenumărate minuni asupra soților ce nu pot avea copii.',
      },
    ],
    legends: [
      {
        title: 'Maica Domnului — Egumena',
        description:
          'În urma unei tulburări în obște, icoana Tricherusa, după tradiție, ar fi coborât singură de la locul ei pe scaunul stăreției. De atunci scaunul a rămas neocupat: la fiecare slujbă a Sfintei Liturghii cheile mănăstirii se așază pe icoana Maicii Domnului, iar ea singură este socotită Egumena Hilandarului.',
      },
      {
        title: 'Focul din 2004',
        description:
          'În noaptea de 4 martie 2004, un foc puternic a mistuit jumătate din mănăstire în câteva ceasuri. Katholikonul și icoana Tricherusa au rămas neatinse în mijlocul flăcărilor — semn citit de obște ca un răspuns al Maicii Domnului însăși.',
      },
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
    icons: [
      {
        name: 'Maica Domnului a Acatistului (Chairetismos)',
        nameGreek: 'Παναγία τοῦ Ἀκαθίστου · Χαιρετισμός',
        description:
          'Icoana „Bucură-te" — chiar înaintea căreia împăratul Alexie al III-lea Comnenul al Trapezuntului a cântat Imnul Acatist al Maicii Domnului în mulțumire, după ce fiica lui s-a tămăduit. Dăruită mănăstirii la întemeiere; cea mai vestită icoană a Acatistului din Sfântul Munte.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/a/aa/Akafist_bogomateri.jpg',
        imageCredit: 'Frescă a Acatistului · Wikimedia Commons',
      },
      {
        name: 'Mâna dreaptă a Sfântului Ioan Botezătorul',
        description:
          'Mâna cu care Înaintemergătorul L-a botezat pe Hristos — păstrată ca cel mai de preț odor al mănăstirii, alături de un dinte al Sfântului Hristofor și de părticele din moaștele Sfinților Apostol Luca și Întâi-Mucenic Ștefan.',
      },
    ],
    legends: [
      {
        title: 'Lumina ce cobora din cer',
        description:
          'Un păstor de pe povârnișurile de sud-vest a văzut, noapte de noapte, o lumină ca o stea coborând din cer peste o anumită stâncă deasupra mării. A spus părinților; Sfântul Dionisie a venit să cerceteze locul și a ridicat acolo mănăstirea — în chiar locul arătat de sus.',
      },
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
    icons: [
      {
        name: 'Icoana nefăcută de mână omenească a Sfântului Gheorghe',
        nameGreek: 'Ἁγίος Γεώργιος ὁ Ζωγραφικός',
        description:
          'Icoana „nezugrăvită de mână" a Sfântului Mare Mucenic Gheorghe — apărută peste noapte pe o scândură curată la începutul secolului al X-lea. Episcopul de Lida, venit să cerceteze adevărul, ar fi atins chipul sfântului: urma degetului a rămas adâncită în lemn, iar mâna lui s-a lipit de icoană și a trebuit să fie retezată.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/b/b6/%D0%A1%D0%B2%D0%B5%D1%82%D0%B8_%D0%93%D0%B5%D0%BE%D1%80%D0%B3%D0%B8_%D0%9D%D0%B5%D1%80%D1%8A%D0%BA%D0%BE%D1%82%D0%B2%D0%BE%D1%80%D0%B5%D0%BD%2C_%D0%BA%D1%80%D0%B0%D0%B9_%D0%BD%D0%B0_XIII_%D0%B2%D0%B5%D0%BA%2C_%D0%BE%D0%B1%D0%BA%D0%BE%D0%B2_%D0%BE%D1%82_1837%2C_%D0%97%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D1%81%D0%BA%D0%B8_%D0%BC%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B8%D1%80.jpg',
        imageCredit: 'Wikimedia Commons · domeniu public',
      },
    ],
    legends: [
      {
        title: 'Cei trei frați și scândura curată',
        description:
          'Trei frați monahi din Ohrida — Moise, Aron și Ioan — se certau cărui sfânt să închine mănăstirea. Au pus o scândură curată pe Sfântul Altar și au priveghet toată noaptea. Dimineața, chipul Sfântului Gheorghe se afla pe ea, zugrăvit de nicio mână omenească. De atunci mănăstirea se cheamă „Zografu" — „Pictorul".',
      },
      {
        title: 'Cei douăzeci și șase de mucenici',
        description:
          'În 1276, când împăratul Mihail al VIII-lea Paleologul și patriarhul Ioan al XI-lea Bekkos au semnat Unirea de la Lyon și au trimis trupe să o impună în Sfântul Munte, douăzeci și șase de monahi de la Zografu s-au închis în turnul cetății și au refuzat să-l pomenească pe patriarhul unionist. Latinii au dat foc turnului peste ei. Athonul îi cinstește în 10/23 octombrie.',
      },
    ],
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
    icons: [
      {
        name: 'Maica Domnului Grabnic-Ascultătoarea',
        nameGreek: 'Παναγία Γοργοϋπήκοος',
        description:
          'Frescă din secolul al XIV-lea în trecerea îngustă dintre trapeză și katholikon. În 1664, iconomul Nilo, trecând în grabă cu o lumânare de pin, a fost mustrat cu glas tare de către icoană pentru că îi înnegrea fața cu fum; nedând ascultare, a fost lovit cu orbire. După lungă pocăință la picioarele Maicii Domnului și-a recăpătat vederea, iar icoana este de atunci cinstită în toată lumea ortodoxă pentru grabnica ei ascultare a rugăciunilor.',
      },
    ],
    legends: [
      {
        title: 'Sfinții Arhangheli și tânărul cu aurul',
        description:
          'Frate Varnava, trimis peste mare să strângă milostenie pentru mănăstire, a fost prins de pirați pe corabie și aruncat în mare cu o piatră legată de picioare. A strigat către Sfinții Arhangheli; ei i s-au arătat pe corabie în chip de doi ostași și, în clipa următoare, Varnava era pus în paraclisul Sfinților Arhangheli de la Dochiariu — încă ud de apa mării, dar cu aurul furat de pirați în traistă. Mănăstirea, care era închinată Sfântului Nicolae, a fost de atunci închinată Sfinților Arhangheli.',
      },
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
    icons: [
      {
        name: 'Maica Domnului Dulcea Sărutare',
        nameGreek: 'Παναγία Γλυκοφιλούσα',
        description:
          'Icoană în care Pruncul Hristos își apasă obrazul de obrazul Maicii Sale. După tradiție, datează din vremea prigoanei iconoclaste (sec. VIII–IX) și a fost încredințată mării de jupâneasa Victoria din Constantinopol, când soțul ei a cerut-o spre a fi distrusă. A fost aflată de monahii Filoteului pe țărm în Lunea Luminată — iar pe locul găsirii a țâșnit un izvor.',
      },
    ],
    legends: [
      {
        title: 'Icoana de la țărm',
        description:
          'În fiecare an, în Lunea din Săptămâna Luminată, icoana Dulcei Sărutări este purtată în procesiune până la izvorul de la mal, locul unde a fost aflată. Spune tradiția că izvorul a țâșnit din pământ uscat în chiar ceasul în care icoana a venit la țărm. Litia se ține neîntrerupt de peste o mie de ani.',
      },
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
    icons: [
      {
        name: 'Mâna stângă a Sfintei Maria Magdalena',
        description:
          'Mâna stângă neputrezită a Sfintei Mironosițe Maria Magdalena — caldă la atingere și revărsând o mireasmă blândă; se păstrează într-o raclă de argint în katholikon.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/8/83/Left-hand-Mary-Magdalene-foto-1.jpg',
        imageCredit: 'Wikimedia Commons · CC0',
      },
    ],
    legends: [
      {
        title: 'Steaua deasupra stâncii',
        description:
          'În noaptea Nașterii Domnului, Sfântul Simon — care nevoia într-o peșteră pe povârniș — a văzut o stea coborând din cer și oprindu-se deasupra unei stânci abrupte deasupra mării. A înțeles semnul și a numit locul „Noul Vitleem". Zidarii trimiși să ridice mănăstirea s-au temut să urce pe stâncă — până când un meșter, urcând cu o tavă de vin, s-a împiedicat și a alunecat tot drumul în jos. A ajuns la poale cu tava și vinul nevărsate. De atunci nimeni nu s-a mai împotrivit.',
      },
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
    icons: [
      {
        name: 'Darurile aduse de Magi',
        description:
          'O parte din darurile aduse de Magi Pruncului Hristos la Nașterea Sa: 14 plăcuțe de aur și 62 de boabe de smirnă și tămâie înșirate pe fir de argint. Aduse pe Athos în secolul al XV-lea de prințesa Maro, fiica sultanului Murad al II-lea. Boabele răspândesc până astăzi mireasmă.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/6/6a/Gifts_of_the_magi_look.jpg',
        imageCredit: 'George Malkov · Wikimedia Commons · CC BY-SA 3.0',
      },
      {
        name: 'Maica Domnului Mirovlitisa',
        nameGreek: 'Παναγία Μυροβλύτισσα',
        description:
          'Icoana „Izvorâtoarea de mir", care a izvorât mir bineînmiresmat în vremuri de necaz pentru mănăstire.',
      },
    ],
    legends: [
      {
        title: 'Împărăteasa Maro întoarsă din drum',
        description:
          'Maro, soția creștină ortodoxă (sârbă) a sultanului Murad al II-lea — și păstrătoarea darurilor Magilor după căderea Constantinopolului — a pornit să le aducă ea însăși la mănăstire. Pe cărarea ce urcă din golf, un glas a oprit-o: „Maro, stai! Nu mai trece înainte: de aici începe împărăția altei Împărătese". A dat darurile egumenului și s-a întors la corabie. O cruce de marmură marchează până astăzi locul: „Crucea Împărătesei".',
      },
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
    icons: [
      {
        name: 'Sfântul Nicolae „cel cu stridia"',
        nameGreek: 'Ἅγιος Νικόλαος ὁ Στρειδᾶς',
        description:
          'Icoană în mozaic din secolul al XIV-lea, scoasă din mare de pescari în plasă, în vremea refacerii mănăstirii. O stridie (στρείδι) crescuse peste fruntea sfântului. Când patriarhul Ieremia a încercat să o desprindă, din locul cu pricina ar fi izvorât sânge; semnul se vede până astăzi pe fruntea icoanei.',
      },
    ],
    legends: [
      {
        title: 'Mozaicul aflat în plasă',
        description:
          'În 1546, pescarii noii obști, lucrând în largul țărmului de răsărit, au tras în plase icoana în mozaic a Sfântului Nicolae — pierdută în mare în vremea iconoclasmului, șapte veacuri mai înainte. Stridia desprinsă de pe fruntea sfântului ar fi sângerat: jumătatea cochiliei a fost prinsă ca dar de mulțumire pe o sfântă Evanghelie de argint, cealaltă a fost măcinată și dată bolnavilor.',
      },
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
    icons: [
      {
        name: 'Piciorul stâng al Sfintei Ana',
        description:
          'Piciorul stâng neputrezit al Sfintei Ana, mama Maicii Domnului și bunica Mântuitorului — adus de la Provata în 1686 și așezat în kiriakon. Moaștele sunt cinstite mai ales de femeile care cer darul nașterii de prunci; cererile lor sunt aduse de rude bărbătești sau citite de monahi, fiindcă avatonul oprește intrarea femeilor pe Sfântul Munte.',
      },
    ],
    legends: [
      {
        title: 'Casa bunicii lui Dumnezeu',
        description:
          'Întreg schitul este socotit la Sfântul Munte „casa Sfintei Ana". Pelerinii spun că aerul miroase a pâine coaptă — și într-adevăr, chiliile de pe potecă coc prescuri și dulciuri tradiționale, vândute spre ajutorul vieții schitului. Praznicul Sfintei Ana, în 25 iulie, este cel mai mult cercetat din toată coasta de sud-vest.',
      },
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
    legends: [
      {
        title: 'Cel ce-și arde colibele',
        description:
          'Sfântul Maxim († 1365), marele isihast cunoscut ca „nebun pentru Hristos" al Athonului, a viețuit pe acest țărm de stâncă. De câte ori o colibă devenea prea ușor de locuit sau pelerinii începeau să-l caute și să-i tulbure rugăciunea, o ardea și se muta mai adânc în stânci. De aici numele de „Kavsokalivia" — „colibele arse".',
      },
      {
        title: 'Sfântul Maxim în zbor',
        description:
          'Sfântul Grigorie Sinaitul, mergând pe coasta de stâncă, l-a întâlnit pe Maxim coborând de pe o stâncă înaltă. Întrebat cum a coborât, Maxim a răspuns: „Îngerul Domnului m-a purtat". Grigorie a recunoscut darul vederii dumnezeiești în el și s-a despărțit de el cu evlavie.',
      },
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
    icons: [
      {
        name: 'Maica Domnului Prodromița',
        nameGreek: 'Παναγία Προδρομίτισσα',
        description:
          'Icoană făcătoare de minuni „nefăcută de mână omenească". Comandată în 1853 zugravului ieșean Iordache Nicolau, fețele Maicii Domnului și ale Pruncului au apărut peste noapte zugrăvite singure pe lemn — meșterul lăsase chipurile neterminate, tulburat că nu putea reda dumnezeiasca lor lumină. Este cea mai cinstită icoană a vetrei monahale românești de la Athos.',
      },
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
    legends: [
      {
        title: 'Lanțurile și scripetele',
        description:
          'Coborârea din Karulia exterioară spre cele dinăuntru se face pe bucăți de lanț bătute în peretele stâncii; pe alocuri sprijinul piciorului nu e mai larg decât vârful unei tălpi. Scripetele cu care i se ridică pustnicului în coș pâinea și apa se numește *karouli* — și el dă numele întregului loc.',
      },
      {
        title: 'O școală a celor mai aspri nevoitori',
        description:
          'Karulia nu are kiriakon, nu are drum, nu are obște și nu are stareț. Sihaștrii care aleg locul acesta o fac pentru rugăciunea inimii în singurătate extremă; mulți sunt cunoscuți la Sfântul Munte doar după numele de botez, iar o parte nu coboară de pe stâncă niciodată.',
      },
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

interface LeadTimeRo {
  season?: string;
  months?: string;
  advance?: string;
}

interface ChecklistItemRo {
  label?: string;
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

export const DIAMONITIRION_LEAD_TIME_RO: Record<string, LeadTimeRo> = {
  peak: {
    season: 'Săptămâna Sfintelor Paști · Adormirea Maicii Domnului (15 august) · vârf de vară',
    months: 'aprilie · iulie · august',
    advance: 'cu 6+ luni înainte',
  },
  shoulder: {
    season: 'Primăvară târzie & toamnă (sezon intermediar)',
    months: 'mai · iunie · septembrie · octombrie',
    advance: 'cu 2–3 luni înainte',
  },
  off: {
    season: 'Zile de lucru de iarnă (în afara marilor praznice)',
    months: 'noiembrie – martie',
    advance: 'cu 2–4 săptămâni înainte',
  },
};

export const DIAMONITIRION_CHECKLIST_RO: Record<string, ChecklistItemRo> = {
  reservation: { label: 'Rezervarea Diamonitirion-ului confirmată (telefonic sau prin e-mail)' },
  passport: { label: 'Pașaport sau buletin original — valabil 6+ luni' },
  confirmation: { label: 'Confirmarea rezervării salvată (tipărită sau captură de ecran)' },
  cash: { label: 'Numerar în euro pentru taxa de eliberare (cabina din port poate să nu accepte cardul)' },
  'monastery-bookings': { label: 'Fiecare noapte confirmată telefonic cu mănăstirea-gazdă' },
  'long-trousers': { label: 'Pantaloni lungi — pantalonii scurți nu sunt îngăduiți în mănăstiri' },
  'sleeved-shirts': { label: 'Cămăși cu mâneci lungi — îmbrăcăminte cuviincioasă la slujbe' },
  'walking-shoes': { label: 'Încălțăminte solidă de drumeție — potecile dintre mănăstiri sunt pietroase' },
  'warm-layer': { label: 'O haină groasă pentru slujbele de noapte (frig chiar și vara)' },
  headlamp: { label: 'Lanternă frontală pentru Utrenia de noapte și plecările dinaintea zorilor' },
  'water-bottle': { label: 'Bidon reumplabil de apă (izvoarele mănăstirilor sunt sigure)' },
  'offline-maps': { label: 'Hărți offline descărcate pe telefon — semnalul este slab pe Munte' },
  backpack: { label: 'Doar rucsac — valizele cu rotile nu pot urma potecile' },
  'power-bank': { label: 'Baterie externă — prizele diferă între chiliile pentru oaspeți' },
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

interface SuggestedItineraryRo {
  name?: string;
  description?: string;
  dayNotes?: (string | undefined)[];
}

export const SUGGESTED_ITINERARIES_RO: Record<string, SuggestedItineraryRo> = {
  'classic-east-coast': {
    name: 'Coasta de nord-est — clasic',
    description:
      'Trei zile de-a lungul țărmului estic, mai blând — Iviron, Stavronikita și Pantocrator, cu Careia și Protatonul în mijloc.',
    dayNotes: [
      'Dafni → Careia cu autocarul, apoi mai departe la Iviron. Pe poteca de coastă, până la Stavronikita (aprox. 1½ oră de mers).',
      'Continuă spre nord, de-a lungul coastei de est.',
      'Trecere la Careia pentru Protaton și icoana făcătoare de minuni „Axion Estin".',
    ],
  },
  'southern-tip-pilgrimage': {
    name: 'Pelerinaj la vârful sudic',
    description:
      'Patru zile la capătul de pustie al Sfântului Munte — Marea Lavră și schiturile agățate de stâncă: Cavsocalivia, Sfânta Ana, Karulia.',
    dayNotes: [
      'Dafni → Marea Lavră cu vedeta de pe coasta de sud-est. Călătorie lungă — bagaj ușor.',
      'Mers pe jos spre sud-vest, în jurul piciorului Athonului, către schiturile răsăritene.',
      'Schiturile de pe stânci — potecile sunt foarte abrupte; rezervă cea mai mare parte a zilei.',
      'Întoarcere spre nord, pe coasta de vest, cu vedeta mică.',
    ],
  },
  'western-cliffs': {
    name: 'Stâncile de vest',
    description:
      'Trei zile pe stâncile dramatice ale coastei de vest — Simonopetra, Grigoriou, Dionisiu și Sfântul Pavel, toate atinse de vedeta de pe coasta de sud-est, plecând din Dafni.',
    dayNotes: [
      'Dafni → Simonopetra cu vedeta de coastă. Arsanalul este la nivelul mării; mănăstirea stă la 230 m, sus pe stâncă.',
      'Mers pe jos sau cu vedeta, spre sud, de-a lungul coastei stâncoase.',
      'Capătul sudic al stâncilor, apoi întoarcere prin Xiropotamu, lângă Dafni.',
    ],
  },
  'slavic-heritage': {
    name: 'Moștenirea slavă',
    description:
      'Trei zile prin mănăstirile negrecești ale Sfântului Munte — Hilandar (sârbă), Zografu (bulgară) și Sfântul Pantelimon (rusă), cu slujbele lor în slavonă și arhitectura aparte.',
    dayNotes: [
      'Ierissos → arsanalul Mănăstirii Hilandar (vedetele sunt mai rare; verifică în port).',
      'Traversare a peninsulei pe jos sau cu microbuzul, până la mănăstirea bulgară din interior.',
      'Coborâre la coasta de vest — marea mănăstire rusească și vecinele ei.',
    ],
  },
};

interface SaintRo {
  name?: string;
  years?: string;
  feast?: string;
  intro?: string;
  notes?: string[];
}

export const SAINTS_RO: Record<string, SaintRo> = {
  'athanasios-athonite': {
    name: 'Sfântul Atanasie Athonitul',
    years: 'cca. 920 – cca. 1003',
    feast: 'Adormirea Sfântului Atanasie Athonitul (5 / 18 iulie)',
    intro:
      'Întemeietorul Marii Lavre și arhitectul, sub împărații Nichifor Phokas și Ioan Tzimiskes, al vieții chinoviale rânduite pe Sfântul Munte. Înaintea venirii lui, povârnișurile erau presărate cu sihăstrii; typikonul pe care l-a alcătuit a dat Muntelui forma sa instituțională.',
    notes: [
      'Mormântul său din katholikonul Marii Lavre păstrează toiagul de fier și crucea pe care o purta la piept. Maica Domnului i s-a arătat la izvorul Aghiasmei în vremea foametei celei mari și a luat asupra-Și grija de iconomie a mănăstirii — dregătoria de iconom a rămas neîncredințată vreunui monah de atunci.',
    ],
  },
  'gregory-palamas': {
    name: 'Sfântul Grigorie Palama',
    years: '1296 – 1359',
    feast: 'Sfântul Grigorie Palama (14 / 27 noiembrie)',
    intro:
      'Isihast athonit și teolog al luminii necreate. Ucenicit la Vatoped sub Sfântul Nicodim, a apărat mai târziu lucrarea Rugăciunii lui Iisus împotriva raționalistului Varlaam Calabrezul. Arhiepiscop al Tesalonicului din 1347, prăznuirea sa cade pe 14 noiembrie și se ține din nou în Duminica a doua a Postului Mare.',
  },
  'silouan-the-athonite': {
    name: 'Sfântul Siluan Athonitul',
    years: '1866 – 1938',
    feast: 'Sfântul Siluan (11 / 24 septembrie)',
    intro:
      'Țăran rus care a ajuns unul dintre cei mai luminați monahi ai veacului al XX-lea. De la vârsta de douăzeci și șapte de ani, în mănăstirea rusească Sfântul Pantelimon, și-a petrecut nopțile în rugăciune neîncetată pentru Adam, „pentru tot omul". Ucenicul său, Arhimandritul Sofronie, i-a păstrat cuvintele în *Sfântul Siluan Athonitul*.',
    notes: [
      '„Ține-ți mintea în iad și nu deznădăjdui" — cuvântul de căpetenie pe care Domnul i l-a spus într-o clipă de chinuită rugăciune.',
    ],
  },
  'paisios-the-athonite': {
    name: 'Sfântul Paisie Athonitul',
    years: '1924 – 1994',
    feast: 'Sfântul Paisie (12 / 25 iulie)',
    intro:
      'Stareț de obârșie capadociană al Panagudei și al Schitului Kapsala, a cărui kalivă a fost una dintre cele mai cercetate chilii de la Athos în ultimul sfert al veacului al XX-lea. Canonizat în 2015, pomenirea sa se face pe 12 iulie, ziua în care s-a mutat la Domnul, la Suroti, lângă Tesalonic.',
  },
  'porphyrios-the-kafsokalyvit': {
    name: 'Sfântul Porfirie Kavsokalivitul',
    years: '1906 – 1991',
    feast: 'Sfântul Porfirie (2 / 15 decembrie)',
    intro:
      'Stareț al Schitului Kavsokalivia (metoc al Marii Lavre) și, ani de-a rândul, preot la policlinica „Sfântul Gherasim" din Atena. A primit darul străvederii de tânăr; învățăturile lui, strânse postum în *Rănit de iubire*, înfățișează viața creștină drept îmbrățișare a lui Hristos „fără silință", prin dragoste, nu prin frică.',
  },
  'maximos-kavsokalyvit': {
    name: 'Sfântul Maxim Kavsokalivitul',
    years: 'cca. 1270 – 1365',
    feast: 'Sfântul Maxim (13 / 26 ianuarie)',
    intro:
      '„Arzătorul de colibe" — așa numit pentru că își ardea kaliva ori de câte ori locul era aflat de oameni și venirea lor îi tulbura rugăciunea. Sihastru în pustia sălbatică din sud-estul Athonului, contemporan al Sfântului Grigorie Sinaitul, este ocrotitorul Schitului Kavsokalivia.',
  },
  'kosmas-aitolos': {
    name: 'Sfântul Cosma Etolianul',
    years: '1714 – 1779',
    feast: 'Sfântul Cosma (24 august / 6 septembrie)',
    intro:
      'Întocmai-cu-Apostolii, marele propovăduitor al pământurilor grecești sub stăpânirea otomană. Tuns în monahism la Filotheu, a primit binecuvântarea Sfintei Comunități să părăsească Muntele și să propovăduiască Evanghelia în satele Epirului, Macedoniei și Albaniei, întemeind sute de școli. A pătimit mucenicește lângă Berat în 1779.',
  },
  'nikodemos-the-hagiorite': {
    name: 'Sfântul Nicodim Aghioritul',
    years: '1749 – 1809',
    feast: 'Sfântul Nicodim (14 / 27 iulie)',
    intro:
      'Marele editor patristic al Sfântului Munte. Împreună cu Sfântul Macarie al Corintului a alcătuit *Filocalia* (Veneția, 1782), antologia scrierilor mistice athonite care a modelat duhovnicia ortodoxă din Rusia până în lumea greacă modernă. *Pidalionul*, *Războiul nevăzut* și marele *Sinaxar* sunt tot lucrarea lui.',
  },
  'john-koukouzelis': {
    name: 'Sfântul Ioan Cucuzel',
    years: 'cca. 1280 – cca. 1360',
    feast: 'Sfântul Ioan Cucuzel (1 / 14 octombrie)',
    intro:
      'Psalt împărătesc la curtea Constantinopolului care a fugit la Marea Lavră și a viețuit acolo ca monah-păstor. Înaintea icoanei Maicii Domnului Cucuzelița a auzit glasul Născătoarei de Dumnezeu zicând „Cântă, Ioane al meu, și nu vei lipsi de plată" — iar la trezire a aflat în mâna sa o monedă de aur. Părintele *Papadichii*, marele manual medieval al cântării bisericești.',
  },
  'gregory-of-sinai': {
    name: 'Sfântul Grigorie Sinaitul',
    years: 'cca. 1260 – 1346',
    feast: 'Sfântul Grigorie Sinaitul (8 / 21 august)',
    intro:
      'Învățător isihast care a adus la Athos lucrarea sinaitică a Rugăciunii lui Iisus, ce a prins rădăcini în kathismatele din jurul Magoulei. Dascăl (în duh și în scrieri) al Sfântului Grigorie Palama. A întemeiat mai târziu marea mănăstire de la Paroria, la hotarul bizantino-bulgar.',
  },
};
