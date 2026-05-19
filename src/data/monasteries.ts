import type { Monastery } from '../types';

// The twenty ruling (sovereign) monasteries of Mount Athos, listed in the
// canonical hierarchical order they hold in the Holy Community (Iera Koinotita).
// Coordinates come from OpenStreetMap and are accurate enough that every pin
// sits on the actual monastery compound — sufficient for orientation on the
// map view but not for navigation. Always defer to the monastery itself for
// current contact info and pilgrimage policy.
export const MONASTERIES: Monastery[] = [
  {
    slug: 'great-lavra',
    name: 'Great Lavra',
    nameGreek: 'Μεγίστη Λαύρα',
    rank: 'ruling',
    hierarchyOrder: 1,
    tradition: 'Greek',
    region: 'southern-tip',
    founded: '963',
    patronalFeast: 'Repose of St Athanasios the Athonite (5 / 18 July)',
    lat: 40.1713,
    lng: 24.3826,
    intro:
      'The oldest monastery on the Holy Mountain, founded by St Athanasios the Athonite with imperial support from Nikephoros Phokas. First in the hierarchy and the largest in land area.',
    icons: [
      {
        name: 'Panagia Koukouzelissa',
        nameGreek: 'Παναγία Κουκουζέλισσα',
        description:
          'Wonder-working icon of the Theotokos venerated by St John Koukouzelis, the great 14th-century Athonite chanter who heard the Mother of God say "Chant on, my John" and found a gold coin in his hand at the kathisma.',
      },
      {
        name: 'Panagia Oikonomissa',
        nameGreek: 'Παναγία Οἰκονόμισσα',
        description:
          'The "Stewardess" — the icon before which St Athanasios was told by the Theotokos herself that she would be the monastery\'s steward. From that day Great Lavra has had no human oikonomos.',
      },
      {
        name: 'Tomb and iron staff of St Athanasios',
        description:
          'The founder is buried in the katholikon; his heavy iron-bound staff and the iron cross he wore around his neck are kept beside the tomb.',
      },
    ],
    legends: [
      {
        title: 'The Theotokos as Stewardess',
        description:
          'During a famine in the early days of the monastery, St Athanasios set off to leave the Mountain. On the road a luminous woman appeared, struck the rock with her staff to draw forth water (the spring "Agiasma of the Theotokos" still flows nearby), filled the empty storerooms, and told him she would henceforth be the monastery\'s steward. Since then no monk has held the office of oikonomos at Great Lavra.',
      },
    ],
    links: [
      { label: 'Mount Athos — official portal', url: 'https://www.mountathos.org/' },
    ],
  },
  {
    slug: 'vatopedi',
    name: 'Vatopedi',
    nameGreek: 'Βατοπαίδι',
    rank: 'ruling',
    hierarchyOrder: 2,
    tradition: 'Greek',
    region: 'northeast-coast',
    founded: '972–985',
    patronalFeast: 'Annunciation (25 March / 7 April)',
    lat: 40.3142,
    lng: 24.2118,
    intro:
      'A vast coenobitic community on the north-east coast, second in the hierarchy. Houses the Cincture of the Theotokos and several wonder-working icons including Panagia Vimatarissa.',
    icons: [
      {
        name: 'Cincture of the Theotokos',
        nameGreek: 'Τιμία Ζώνη',
        description:
          'The Holy Belt, traditionally woven by the Theotokos herself from camel hair, the only known relic of her bodily remains on earth. Given to Vatopedi by Emperor John VI Kantakouzenos and venerated for healing illness, especially of women unable to conceive — though the relic itself is borne out for veneration, never the women.',
      },
      {
        name: 'Panagia Vimatarissa',
        nameGreek: 'Παναγία Βηματάρισσα',
        description:
          'The "Sanctuary-Dweller". Hidden under the floor of the altar with a lit candle during a 9th-century Arab raid, found seventy years later by the deacon Sabbas — both icon and candle still burning, unharmed.',
      },
      {
        name: 'Panagia Paramythia',
        nameGreek: 'Παναγία Παραμυθία',
        description:
          'The "Consolation". On 21 January 807 the painted Christ Child reached up and covered His mother\'s mouth as she warned the abbot not to open the gates that morning; pirates had laid an ambush outside. The icon is still kept in the position it took in that moment, with Christ\'s hand to her lips.',
      },
      {
        name: 'Panagia Elaiovrytissa',
        nameGreek: 'Παναγία Ἐλαιοβρύτισσα',
        description:
          'The "Oil-Gusher". When the dochiar (cellarer) St Gennadios feared the monastery\'s oil was running out, the empty pithoi overflowed from this icon.',
      },
      {
        name: 'Panagia Antiphonitria',
        nameGreek: 'Παναγία Ἀντιφωνήτρια',
        description:
          'The "Replier". Rebuked Empress Placidia (daughter of Theodosius I) for trying to enter the katholikon — establishing the avaton, the prohibition on women setting foot on the Mountain.',
      },
      {
        name: 'Panagia Pyrovolitheisa',
        nameGreek: 'Παναγία Πυροβοληθεῖσα',
        description:
          'The "Shot Icon". A Turkish soldier fired a musket ball into the icon\'s right hand in 1822; he was struck mad with remorse and hanged himself from an olive tree outside the walls. The ball is still embedded in the panel.',
      },
      {
        name: 'Panagia Esfagmeni',
        nameGreek: 'Παναγία Ἐσφαγμένη',
        description:
          'The "Slain". A monk-deacon struck the icon with a knife after being denied his meal late one evening; blood is said to have flowed from the wound on the cheek, and the monk repented in a long ascesis chained to the icon.',
      },
      {
        name: 'Panagia Pantanassa',
        nameGreek: 'Παναγία Παντάνασσα',
        description:
          'The "Queen of All". Famous in modern times for healings of cancer; copies of the icon are sent out from Vatopedi throughout the world.',
      },
    ],
    legends: [
      {
        title: 'The boy in the bramble',
        description:
          'The name "Vatopedi" — "the bramble of the child" — is traced to the boy Arkadios, son of Theodosius the Great, who was swept overboard during a storm off this coast. The empress and the monks searched the shore in despair until they found him asleep, unharmed, in a bramble bush above the spot where the katholikon now stands. The icon of the Theotokos Vimatarissa is said to be the one before which they gave thanks.',
      },
      {
        title: 'The avaton confirmed',
        description:
          'When Placidia, daughter of Theodosius, tried to enter the katholikon in the 5th century, a voice from the icon of the Antiphonitria stopped her at the threshold: "Stay outside — this place belongs to another Queen." From that day, no woman has set foot on the Holy Mountain.',
      },
    ],
    links: [{ label: 'Vatopedi Monastery', url: 'https://vatopedi.gr/' }],
  },
  {
    slug: 'iviron',
    name: 'Iviron',
    nameGreek: 'Ἰβήρων',
    rank: 'ruling',
    hierarchyOrder: 3,
    tradition: 'Greek',
    region: 'east-slopes',
    founded: '980–983',
    patronalFeast: 'Dormition of the Theotokos (15 / 28 August)',
    lat: 40.2460,
    lng: 24.2854,
    intro:
      'Founded by Georgian (Iberian) monks, hence the name. Home of the Panagia Portaitissa, the "Gate-Keeper" icon, one of the most venerated images on the Mountain.',
    icons: [
      {
        name: 'Panagia Portaitissa',
        nameGreek: 'Παναγία Πορταΐτισσα',
        description:
          'The "Gate-Keeper" — perhaps the most famous icon on Athos. Kept in a small chapel beside the gate of the monastery rather than in the katholikon, because the Mother of God refused to be moved any further: "I have not come for you to guard me — I am here to guard you." A long scar across her cheek is said to be from the spear of an iconoclast soldier in Constantinople, from which fresh blood is said to have flowed.',
      },
    ],
    legends: [
      {
        title: 'The icon that came by sea',
        description:
          'During the iconoclast persecution a widow in Nicaea, ordered to burn the icon of the Theotokos, instead set it adrift on the sea. Two centuries later the monks of Iviron saw a pillar of fire standing upright over the water off their shore. After many failed attempts to take the icon, the hermit St Gabriel the Iberian walked across the waves and carried it to land. They installed it in the katholikon, but every morning it had moved itself back to the gate — and so a chapel was built there.',
      },
      {
        title: 'A sign before the end',
        description:
          'It is told on the Mountain that when the Portaitissa returns to the sea of her own accord, the end of the world is at hand.',
      },
    ],
    links: [],
  },
  {
    slug: 'hilandar',
    name: 'Hilandar',
    nameGreek: 'Χιλανδαρίου',
    rank: 'ruling',
    hierarchyOrder: 4,
    tradition: 'Serbian',
    region: 'northwest',
    founded: '1198',
    patronalFeast: 'Presentation of the Theotokos (21 November / 4 December)',
    lat: 40.3406,
    lng: 24.1211,
    intro:
      'The Serbian monastery, refounded by Sts Simeon (Nemanja) and Sava. Suffered a major fire in 2004; restoration is ongoing.',
    icons: [
      {
        name: 'Panagia Tricherousa',
        nameGreek: 'Παναγία Τριχερούσα',
        description:
          'The "Three-Handed" icon — the wonder-working image of St John of Damascus. After Caliph al-Walid had John\'s right hand cut off on a false charge, the saint prayed before this icon and his hand was restored; in gratitude he affixed a third silver hand to the panel. The icon was brought to Hilandar from Serbia and stands today on the abbot\'s throne — Hilandar has no human abbot, only the Theotokos, and the monks venerate her there as their hēgoumeni.',
      },
      {
        name: 'Vine of St Simeon',
        description:
          'A vine grown from the tomb of St Simeon (Nemanja), the monastery\'s founder, in the wall of the katholikon. Its dried grapes are sent worldwide and are credited with countless miracles for couples unable to conceive.',
      },
    ],
    legends: [
      {
        title: 'The Theotokos as abbess',
        description:
          'After a serious disturbance in the brotherhood, the icon Tricherousa was said to have stepped down from the iconostasis and placed itself on the abbot\'s throne. Since then no monk has occupied that seat: at the daily synaxis the keys of the monastery are placed on the Theotokos\' icon, and she alone is hēgoumeni.',
      },
      {
        title: 'The fire of 2004',
        description:
          'On the night of 4 March 2004 a fire broke out and consumed the northern half of the monastery within hours. The katholikon and the icon Tricherousa were spared, untouched at the centre of the flames — read by the brotherhood as her own deliberate sign.',
      },
    ],
    links: [{ label: 'Hilandar Monastery', url: 'https://www.hilandar.info/' }],
  },
  {
    slug: 'dionysiou',
    name: 'Dionysiou',
    nameGreek: 'Διονυσίου',
    rank: 'ruling',
    hierarchyOrder: 5,
    tradition: 'Greek',
    region: 'southwest-cliffs',
    founded: '1374',
    patronalFeast: 'Nativity of St John the Baptist (24 June / 7 July)',
    lat: 40.1682,
    lng: 24.2742,
    intro:
      'Built on a rocky precipice above the south-west coast. Holds the celebrated icon of the Salutation of the Mother of God (Akathistos).',
    icons: [
      {
        name: 'Panagia Akathistos / Chairetismos',
        nameGreek: 'Παναγία τοῦ Ἀκαθίστου · Χαιρετισμός',
        description:
          'The icon of the "Salutation" — the very image before which Emperor Alexios III Komnenos of Trebizond chanted the Akathist hymn in thanksgiving when his daughter was healed. Given to the monastery at its foundation; the most celebrated icon of the Akathistos type on Athos.',
      },
      {
        name: 'Right hand of St John the Baptist',
        description:
          'A major portion of the Forerunner\'s right hand — the hand with which he baptised Christ — is kept here, the monastery\'s patron. Other relics include a tooth of St Christopher and fragments of Sts Luke and Stephen.',
      },
    ],
    legends: [
      {
        title: 'The descending light',
        description:
          'A shepherd on the hillside above the south-west coast saw, night after night, a column of light descending from heaven onto a particular rock. He told the monks; St Dionysios was sent to investigate, and there built the monastery — on the spot pointed out from above.',
      },
    ],
    links: [{ label: 'Dionysiou Monastery', url: 'https://www.imdionysiou.gr/' }],
  },
  {
    slug: 'koutloumousiou',
    name: 'Koutloumousiou',
    nameGreek: 'Κουτλουμουσίου',
    rank: 'ruling',
    hierarchyOrder: 6,
    tradition: 'Greek',
    region: 'east-slopes',
    founded: '12th–13th c.',
    patronalFeast: 'Transfiguration of the Lord (6 / 19 August)',
    lat: 40.2532,
    lng: 24.2476,
    intro:
      'A short walk from Karyes, the administrative capital. Closely tied historically to the rulers of Wallachia and to Romanian benefactors.',
    icons: [
      {
        name: 'Panagia Phovera Prostasia',
        nameGreek: 'Παναγία Φοβερὰ Προστασία',
        description:
          'The "Awesome Protection" — an old icon brought from Asia Minor, around which the monastery built its long fame as a place of refuge for pilgrims fleeing illness or war.',
      },
    ],
    links: [],
  },
  {
    slug: 'pantokratoros',
    name: 'Pantokratoros',
    nameGreek: 'Παντοκράτορος',
    rank: 'ruling',
    hierarchyOrder: 7,
    tradition: 'Greek',
    region: 'northeast-coast',
    founded: '1357',
    patronalFeast: 'Transfiguration of the Lord (6 / 19 August)',
    lat: 40.2836,
    lng: 24.2667,
    intro:
      'Founded by the brothers Alexios and John, high officials of the Byzantine court. Sits on a small rocky promontory above the north-east coast.',
    icons: [
      {
        name: 'Panagia Gerontissa',
        nameGreek: 'Παναγία Γερόντισσα',
        description:
          'The "Elderess" — a full-length icon of the Theotokos standing without the Christ Child, which spoke three times in the monastery\'s history: ordering the priest to give the dying abbot communion at once, multiplying oil from an empty jar, and standing firm during the fire of 1948 when the flames stopped at her chapel door.',
      },
    ],
    legends: [
      {
        title: 'The pirate and the well',
        description:
          'When Saracen pirates sacked the monastery, a monk threw the icon of the Gerontissa down the well to keep her safe; she stayed there until, after long years, a candle burning in the depths revealed her. The well is still shown to pilgrims behind the katholikon.',
      },
    ],
    links: [],
  },
  {
    slug: 'xeropotamou',
    name: 'Xeropotamou',
    nameGreek: 'Ξηροποτάμου',
    rank: 'ruling',
    hierarchyOrder: 8,
    tradition: 'Greek',
    region: 'west-coast',
    founded: '10th c.',
    patronalFeast: 'Forty Holy Martyrs of Sebaste (9 / 22 March)',
    lat: 40.2287,
    lng: 24.2213,
    intro:
      'Set in the hills above Daphne, the main port. Preserves the largest known fragment of the True Cross.',
    icons: [
      {
        name: 'Fragment of the True Cross',
        description:
          'The largest known surviving fragment of the Cross of Christ — a piece bearing the imprint of one of the nail-holes. Given to the monastery by Empress Pulcheria, the traditional foundress.',
      },
      {
        name: 'Relics of the Forty Martyrs of Sebaste',
        description:
          'A portion of the relics of the Forty soldier-martyrs frozen on the lake at Sebaste, brought from Asia Minor at the same time as the True Cross.',
      },
    ],
    legends: [
      {
        title: 'The forty mushrooms',
        description:
          'Every year, on the feast of the Forty Martyrs (9/22 March), forty mushrooms were said to sprout overnight around the holy table of the katholikon — one for each of the saints. They were gathered and distributed to pilgrims as a blessing.',
      },
    ],
    links: [],
  },
  {
    slug: 'zographou',
    name: 'Zographou',
    nameGreek: 'Ζωγράφου',
    rank: 'ruling',
    hierarchyOrder: 9,
    tradition: 'Bulgarian',
    region: 'northwest',
    founded: '10th c.',
    patronalFeast: 'St George the Great Martyr (23 April / 6 May)',
    lat: 40.3055,
    lng: 24.1598,
    intro:
      'The Bulgarian monastery, hidden in the forested interior of the peninsula. The name ("the painter") refers to an icon of St George said to have been painted by no human hand.',
    icons: [
      {
        name: 'Acheiropoieton icon of St George',
        nameGreek: 'Ἁγίος Γεώργιος ὁ Ζωγραφικός',
        description:
          'The "not painted by hand" icon of St George — appeared overnight on a blank panel in the early 10th century. The bishop of Lydda who came to dispute its authenticity is said to have touched the saint\'s face: the print of his finger remained sunk into the wood, and the bishop\'s hand fused to the icon and had to be cut off.',
      },
    ],
    legends: [
      {
        title: 'The three brothers and the blank panel',
        description:
          'Three brother-monks from Ohrid — Moses, Aaron, and John — argued over which saint should be the monastery\'s patron. They prepared a blank panel of wood, placed it on the holy table, and kept vigil all night. By dawn the image of St George was upon it, painted by no human hand. From that day the monastery has been called "the Painter" (Zographou).',
      },
      {
        title: 'The twenty-six martyrs',
        description:
          'In 1276, when the emperor Michael VIII Palaiologos and the patriarch John XI Bekkos signed the Union of Lyons with Rome and sent troops to enforce it on the Mountain, twenty-six monks of Zographou shut themselves in the tower and refused to commemorate the unionist patriarch. The Latins burned the tower around them. The Athonites commemorate them on 10/23 October.',
      },
    ],
    links: [],
  },
  {
    slug: 'docheiariou',
    name: 'Docheiariou',
    nameGreek: 'Δοχειαρίου',
    rank: 'ruling',
    hierarchyOrder: 10,
    tradition: 'Greek',
    region: 'west-coast',
    founded: '10th c.',
    patronalFeast: 'Synaxis of the Archangels (8 / 21 November)',
    lat: 40.2668,
    lng: 24.1724,
    intro:
      'On the south-west coast, dedicated to the Archangels Michael and Gabriel. Home of the wonder-working icon Panagia Gorgoëpikoös ("Quick to Hear").',
    icons: [
      {
        name: 'Panagia Gorgoëpikoös',
        nameGreek: 'Παναγία Γοργοϋπήκοος',
        description:
          'The "Quick to Hear". A 14th-century fresco in the narrow passage between trapeza and katholikon. In 1664 the cellarer Nilos, hurrying past with a lit pine-torch, was rebuked aloud by the icon for blackening her face with smoke; he ignored the voice and was struck blind. After long penitence at her feet his sight was restored, and the icon has since been famed throughout the Orthodox world as one who hears prayers swiftly.',
      },
    ],
    legends: [
      {
        title: 'The Archangels and the gold-bearing youth',
        description:
          'When a poor monastery brother named Barnabas was sent across the sea to collect alms, pirates seized him on the boat and tied a stone to his feet to drown him. He cried out to the Archangels; they appeared on the boat in the form of two soldiers, and the next moment he was set down, dripping, in the chapel of the Archangels at Docheiariou — with the gold the pirates had stolen still in his sack. The monastery was then rededicated from St Nicholas to the Archangels.',
      },
    ],
    links: [],
  },
  {
    slug: 'karakallou',
    name: 'Karakallou',
    nameGreek: 'Καρακάλλου',
    rank: 'ruling',
    hierarchyOrder: 11,
    tradition: 'Greek',
    region: 'east-slopes',
    founded: '11th c.',
    patronalFeast: 'Sts Peter and Paul (29 June / 12 July)',
    lat: 40.2238,
    lng: 24.3095,
    intro:
      'A fortified monastery in the interior above the east coast, traditionally linked (by name and legend) to the Roman emperor Caracalla.',
    icons: [
      {
        name: 'Head of the Holy Apostle Bartholomew',
        description:
          'The skull of the Apostle Bartholomew, brought from Asia Minor — among the monastery\'s chief relics, kept beside fragments of Sts Peter and Paul.',
      },
    ],
    legends: [
      {
        title: 'A name disputed',
        description:
          'Tradition tells of two possible namesakes: the Roman emperor Caracalla, said to have founded a watchtower here (and from whose name "Karakallou" would derive), and a medieval monk Nikolaos Karakalas, recorded as the actual refounder in the late 11th century. The monastery quietly preserves both stories side by side without insisting on either.',
      },
    ],
    links: [],
  },
  {
    slug: 'philotheou',
    name: 'Philotheou',
    nameGreek: 'Φιλοθέου',
    rank: 'ruling',
    hierarchyOrder: 12,
    tradition: 'Greek',
    region: 'east-slopes',
    founded: '10th c.',
    patronalFeast: 'Annunciation (25 March / 7 April)',
    lat: 40.2254,
    lng: 24.2914,
    intro:
      'Set in a clearing in the forest above the east coast. Holds the Panagia Glykofilousa ("the Sweet-Kissing") icon.',
    icons: [
      {
        name: 'Panagia Glykofilousa',
        nameGreek: 'Παναγία Γλυκοφιλούσα',
        description:
          'The "Sweet-Kissing" — an icon in which the Christ Child presses His cheek against His mother\'s. Said to date from the iconoclast period (8th–9th c.), and to have come from Constantinople by sea, set adrift by the noblewoman Victoria when her husband demanded she destroy it. It was found by monks at the harbour on Bright Monday — and every year on that day a procession carries it back to the cove where it landed.',
      },
    ],
    legends: [
      {
        title: 'The icon at the harbour',
        description:
          'On the Monday of Bright Week (Διακαινήσιμος), the icon of the Glykofilousa is borne in procession down the slope to the spring on the shore where it was found. The spring is said to have welled up from dry ground in the very hour the icon came ashore. The litany has been kept unbroken for over a thousand years.',
      },
    ],
    links: [],
  },
  {
    slug: 'simonopetra',
    name: 'Simonopetra',
    nameGreek: 'Σίμωνος Πέτρα',
    rank: 'ruling',
    hierarchyOrder: 13,
    tradition: 'Greek',
    region: 'southwest-cliffs',
    founded: '13th c.',
    patronalFeast: 'Nativity of Christ (25 December / 7 January)',
    lat: 40.1902,
    lng: 24.2468,
    intro:
      'The most architecturally dramatic of the monasteries — seven-storey balconies clinging to a sheer rock above the sea. Founded by St Simon the Myrrh-Streamer after a vision.',
    icons: [
      {
        name: 'Left hand of St Mary Magdalene',
        description:
          'The undecomposed left hand of the Myrrh-bearer Mary Magdalene — warm to the touch and exuding a soft fragrance, kept in a silver reliquary in the katholikon.',
      },
    ],
    legends: [
      {
        title: 'The star above the cliff',
        description:
          'On the night of the Nativity, St Simon — who had been living in a small cave on the slope — saw a star descend from heaven and stand still above a sheer rock high above the sea. He understood the sign at once and named the place to come "the New Bethlehem". The workmen sent to build the monastery refused to climb the cliff — until a master mason, on his way up with a tray of wine, slipped and fell the whole way down. He arrived at the bottom with the tray and the wine intact. After that no one objected.',
      },
    ],
    links: [{ label: 'Simonopetra Monastery', url: 'https://www.simonopetra.gr/' }],
  },
  {
    slug: 'agiou-pavlou',
    name: 'St Paul (Agiou Pavlou)',
    nameGreek: 'Ἁγίου Παύλου',
    rank: 'ruling',
    hierarchyOrder: 14,
    tradition: 'Greek',
    region: 'southern-tip',
    founded: '10th c.',
    patronalFeast: 'Presentation of the Lord (2 / 15 February)',
    lat: 40.1614,
    lng: 24.2899,
    intro:
      'Beneath the south-west face of Mount Athos itself. Preserves relics of the Three Holy Hierarchs and a portion of the Holy Gifts brought to Christ by the Magi.',
    icons: [
      {
        name: 'Holy Gifts of the Magi',
        description:
          'A portion of the gold, frankincense and myrrh brought by the Magi to the Christ Child — fourteen small plaques of gold and sixty-two beads of myrrh and frankincense threaded on a silver wire. Brought to Athos in the 15th century by Princess Maro, daughter of Sultan Murad II. They are still fragrant.',
      },
      {
        name: 'Panagia Myrovlytissa',
        nameGreek: 'Παναγία Μυροβλύτισσα',
        description:
          'The "Myrrh-Streaming" icon, which is said to have wept fragrant myrrh during seasons of grief for the monastery.',
      },
    ],
    legends: [
      {
        title: 'Princess Maro turned back',
        description:
          'Maro, the Serbian Christian wife of Sultan Murad II — and the keeper of the Magi\'s gifts after the fall of Constantinople — set out to bring the relics herself to the monastery in person. As she climbed the path up from the cove, a voice stopped her: "Maro, stay! Go no further. From here begins the realm of another Queen." She handed the gifts to the abbot and returned to her boat. A small marble cross still marks the spot where she heard the voice; it is called "the Cross of the Queen".',
      },
    ],
    links: [],
  },
  {
    slug: 'stavronikita',
    name: 'Stavronikita',
    nameGreek: 'Σταυρονικήτα',
    rank: 'ruling',
    hierarchyOrder: 15,
    tradition: 'Greek',
    region: 'northeast-coast',
    founded: '16th c. (refounded)',
    patronalFeast: 'St Nicholas of Myra (6 / 19 December)',
    lat: 40.2681,
    lng: 24.2774,
    intro:
      'The smallest and youngest of the ruling monasteries in its present form, refounded by Patriarch Jeremias I. Compact and fortress-like on the east coast.',
    icons: [
      {
        name: 'St Nicholas Streidas',
        nameGreek: 'Ἅγιος Νικόλαος ὁ Στρειδᾶς',
        description:
          'A 14th-century mosaic icon of St Nicholas drawn up from the sea in a fisherman\'s net during the monastery\'s refounding. An oyster (στρείδι) had grown over the saint\'s forehead. When Patriarch Jeremias tried to prise it loose, blood is said to have flowed from the spot; the small mark is still visible on the icon\'s brow.',
      },
    ],
    legends: [
      {
        title: 'The mosaic in the net',
        description:
          'In 1546 fishermen of the new brotherhood, working off the east coast, hauled in their net to find the mosaic icon of St Nicholas — lost in the sea since the iconoclast period seven centuries earlier. The oyster which had clung to the saint\'s forehead, when separated from the panel, was said to bleed: half the shell was attached as a votive to a silver Gospel-book, the other half ground and given to the sick.',
      },
    ],
    links: [],
  },
  {
    slug: 'xenophontos',
    name: 'Xenophontos',
    nameGreek: 'Ξενοφῶντος',
    rank: 'ruling',
    hierarchyOrder: 16,
    tradition: 'Greek',
    region: 'west-coast',
    founded: '10th–11th c.',
    patronalFeast: 'St George the Great Martyr (23 April / 6 May)',
    lat: 40.2588,
    lng: 24.1789,
    intro:
      'On the south-west coast just south of Docheiariou. Houses two katholika (a rare arrangement) and a celebrated mosaic of St George.',
    icons: [
      {
        name: 'Mosaic icons of St George and St Demetrios',
        description:
          'Two large 10th–11th-century mosaic icons — both 1.20 × 0.55 m — set into the wall of the old katholikon. The saints are shown not as soldiers but in the robes of imperial court officials, a rare iconographic type on the Mountain.',
      },
      {
        name: 'Panagia Hodegetria of Xenophontos',
        nameGreek: 'Παναγία Ὁδηγήτρια',
        description:
          'A wonder-working icon of the "Guide" type, traditionally held to have travelled to Xenophontos of its own accord from the monastery of Vatopedi — and to have returned the following morning when the brothers tried to keep it there.',
      },
    ],
    links: [],
  },
  {
    slug: 'osiou-grigoriou',
    name: 'Osiou Grigoriou',
    nameGreek: 'Ὁσίου Γρηγορίου',
    rank: 'ruling',
    hierarchyOrder: 17,
    tradition: 'Greek',
    region: 'southwest-cliffs',
    founded: '14th c.',
    patronalFeast: 'St Nicholas of Myra (6 / 19 December)',
    lat: 40.1793,
    lng: 24.2558,
    intro:
      'Founded by St Gregory the New (the Sinaite). On the south-west coast between Dionysiou and Simonopetra.',
    icons: [
      {
        name: 'Panagia Galaktotrophousa',
        nameGreek: 'Παναγία Γαλακτοτροφοῦσα',
        description:
          'The "Milk-Giver" — an icon of the Theotokos nursing the Christ Child. Brought to Grigoriou from Serbia in the 16th century by the despot Maximos Branković, and famed for hearing the prayers of nursing mothers (whose petitions reach the icon by way of the monastery\'s correspondence).',
      },
      {
        name: 'Head of the Elder St Gregory the Theologian',
        description:
          'The skull of St Gregory of Nazianzus the Elder (father of St Gregory the Theologian), with relics of Sts Anastasia of Rome, Charalambos, and a fragment of St Nicholas of Myra.',
      },
    ],
    links: [],
  },
  {
    slug: 'esphigmenou',
    name: 'Esphigmenou',
    nameGreek: 'Ἐσφιγμένου',
    rank: 'ruling',
    hierarchyOrder: 18,
    tradition: 'Greek',
    region: 'northeast-coast',
    founded: '10th–11th c.',
    patronalFeast: 'Ascension of the Lord (moveable)',
    lat: 40.3540,
    lng: 24.1378,
    intro:
      'On the north-east coast, between Hilandar and Vatopedi. Known historically for the strict ascetic life of its community.',
    icons: [
      {
        name: 'Banner: ΟΡΘΟΔΟΞΙΑ Ἢ ΘΑΝΑΤΟΣ',
        description:
          'Hung over the main gate: "Orthodoxy or Death". The standard of the old-calendarist brotherhood who broke communion with the Ecumenical Patriarchate after the 1965 lifting of mutual anathemas with Rome.',
      },
    ],
    legends: [
      {
        title: 'The Empress Pulcheria as foundress',
        description:
          'Tradition gives the monastery the same imperial founders as Xeropotamou — Emperor Theodosius II and his sister Pulcheria, in the 5th century. The name "Esphigmenou" ("squeezed") refers to its position pressed between three hills and the sea.',
      },
    ],
    links: [],
  },
  {
    slug: 'st-panteleimon',
    name: 'St Panteleimon (Rossikon)',
    nameGreek: 'Ἁγίου Παντελεήμονος',
    rank: 'ruling',
    hierarchyOrder: 19,
    tradition: 'Russian',
    region: 'west-coast',
    founded: '11th c. (present site 18th c.)',
    patronalFeast: 'St Panteleimon the Great Martyr (27 July / 9 August)',
    lat: 40.2379,
    lng: 24.2018,
    intro:
      'The Russian monastery, distinguished by its onion domes and the deep voice of its great bell. Once housed thousands of monks at the turn of the twentieth century.',
    icons: [
      {
        name: 'Head of St Panteleimon the Healer',
        description:
          'The skull of the great-martyr and unmercenary healer Panteleimon, the patron of the monastery — kept in a silver reliquary in the katholikon and brought out for veneration on his feast (27 July / 9 August).',
      },
      {
        name: 'Tsar-Bell of the Holy Mountain',
        description:
          'The largest bell on Athos and one of the largest in the Orthodox world — cast in Moscow in 1894, weighing approximately 13 tonnes. Its low, slow voice carries across the Singitic Gulf and was famous before the Russian Revolution as the heartbeat of the Mountain.',
      },
    ],
    links: [],
  },
  {
    slug: 'konstamonitou',
    name: 'Konstamonitou',
    nameGreek: 'Κωνσταμονίτου',
    rank: 'ruling',
    hierarchyOrder: 20,
    tradition: 'Greek',
    region: 'northwest',
    founded: '11th c.',
    patronalFeast: 'St Stephen the Protomartyr (27 December / 9 January)',
    lat: 40.2887,
    lng: 24.1749,
    intro:
      'The smallest and twentieth in the hierarchy. Tucked into a wooded valley in the interior, near the west coast.',
    icons: [
      {
        name: 'Panagia Antiphonitria of Konstamonitou',
        nameGreek: 'Παναγία Ἀντιφωνήτρια',
        description:
          'A wonder-working icon of the Theotokos who is said to have replied to the prayers of an exhausted brotherhood on the brink of leaving the empty monastery, promising provision; the same day a ship arrived at the arsanas laden with grain.',
      },
      {
        name: 'Right hand of St Stephen the Protomartyr',
        description:
          'A portion of the right hand of the First Martyr Stephen, the monastery\'s patron, who is venerated together with the protodeacon\'s service of the diaconate.',
      },
    ],
    links: [],
  },
];

export function findMonastery(slug: string): Monastery | undefined {
  return MONASTERIES.find((m) => m.slug === slug);
}
