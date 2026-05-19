/* Athonite saints — short hagiographies for the saints most often invoked on
   pilgrimage to the Holy Mountain. The list is intentionally selective: the
   point is not to mirror the Synaxarion but to give the pilgrim a card for
   each name they will hear at vespers, in the trapeza, or before a relic.

   Feast strings follow the same `Title (D1 Old / D2 New)` shape as
   `Monastery.patronalFeast`, so the existing feast-day parser picks them up
   without modification. */

export interface Saint {
  slug: string;
  /** English / common name (often a Greek epithet transliterated). */
  name: string;
  nameGreek?: string;
  /** Approximate years of life, e.g. "c. 920 – 1003". */
  years: string;
  /** Civil feast string. Same shape as Monastery.patronalFeast. */
  feast: string;
  /** Monastery slug the saint is most associated with. Optional — some
      Athonite saints belonged to several houses. */
  monastery?: string;
  /** Three- to five-sentence introduction the pilgrim can read while waiting
      for the akolouthia to begin. */
  intro: string;
  /** Optional longer notes — quotations, miracles, what to see. */
  notes?: string[];
  /** Optional source links. */
  links?: Array<{ label: string; url: string }>;
}

export const SAINTS: Saint[] = [
  {
    slug: 'athanasios-athonite',
    name: 'St Athanasios the Athonite',
    nameGreek: 'Ἀθανάσιος ὁ Ἀθωνίτης',
    years: 'c. 920 – c. 1003',
    feast: 'Repose of St Athanasios the Athonite (5 / 18 July)',
    monastery: 'great-lavra',
    intro:
      'Founder of Great Lavra and architect, under Nikephoros Phokas and John Tzimiskes, of organised coenobitic life on the Holy Mountain. Before his coming the slopes were dotted with hermits; the typikon he composed gave the Mountain its institutional shape.',
    notes: [
      'His tomb in the katholikon of Great Lavra holds his iron-bound staff and the cross he wore on his breast. The Theotokos appeared to him at the Agiasma spring during the great famine and undertook to be the monastery\'s steward — the office of oikonomos has been left vacant ever since.',
    ],
  },
  {
    slug: 'gregory-palamas',
    name: 'St Gregory Palamas',
    nameGreek: 'Γρηγόριος ὁ Παλαμᾶς',
    years: '1296 – 1359',
    feast: 'St Gregory Palamas (14 / 27 November)',
    monastery: 'vatopedi',
    intro:
      'Athonite hesychast and theologian of the uncreated light. Trained at Vatopedi under St Nikodemos, he later defended the practice of the Jesus Prayer against the rationalist Barlaam of Calabria. Archbishop of Thessalonica from 1347, his feast falls on 14 November and is observed again on the Second Sunday of Great Lent.',
  },
  {
    slug: 'silouan-the-athonite',
    name: 'St Silouan the Athonite',
    nameGreek: 'Σιλουανὸς ὁ Ἀθωνίτης',
    years: '1866 – 1938',
    feast: 'St Silouan (11 / 24 September)',
    monastery: 'st-panteleimon',
    intro:
      'A Russian peasant who became one of the most luminous monks of the twentieth century. From the age of twenty-seven, in the Russian monastery of St Panteleimon, he passed his nights in unceasing prayer for Adam, "for the whole man". His disciple Archimandrite Sophrony preserved his sayings in *Saint Silouan the Athonite*.',
    notes: [
      '"Keep thy mind in hell, and despair not" — the central word the Lord spoke to him in a moment of agonised prayer.',
    ],
  },
  {
    slug: 'paisios-the-athonite',
    name: 'St Paisios the Athonite',
    nameGreek: 'Παΐσιος ὁ Ἁγιορείτης',
    years: '1924 – 1994',
    feast: 'St Paisios (12 / 25 July)',
    monastery: 'koutloumousiou',
    intro:
      'A Cappadocian-born elder of Panagouda and the Skete of Kapsala, whose kalyve was one of the most-visited cells on Athos in the last quarter of the twentieth century. Glorified in 2015, his memory is kept on 12 July, the day he reposed at Souroti near Thessalonica.',
  },
  {
    slug: 'porphyrios-the-kafsokalyvit',
    name: 'St Porphyrios the Kafsokalyvit',
    nameGreek: 'Πορφύριος ὁ Καυσοκαλυβίτης',
    years: '1906 – 1991',
    feast: 'St Porphyrios (2 / 15 December)',
    monastery: 'great-lavra',
    intro:
      'Elder of the Kafsokalyvia skete (a dependency of Great Lavra) and, for many years, priest of the polyclinic of St Gerasimos in Athens. He received the gift of clairvoyance very young; his counsels, gathered posthumously as *Wounded by Love*, frame the Christian life as the embrace of Christ "without effort", through love rather than fear.',
  },
  {
    slug: 'maximos-kavsokalyvit',
    name: 'St Maximos the Kavsokalyvite',
    nameGreek: 'Μάξιμος ὁ Καυσοκαλύβης',
    years: 'c. 1270 – 1365',
    feast: 'St Maximos (13 / 26 January)',
    monastery: 'great-lavra',
    intro:
      'The "Hut-Burner" — so called because he burnt his own kalyve every time the place became known and visitors disturbed his prayer. A solitary in the wild south-eastern desert of Athos, contemporary of St Gregory of Sinai, he is the patron of the skete of Kafsokalyvia.',
  },
  {
    slug: 'kosmas-aitolos',
    name: 'St Kosmas of Aitolia',
    nameGreek: 'Κοσμᾶς ὁ Αἰτωλός',
    years: '1714 – 1779',
    feast: 'St Kosmas (24 August / 6 September)',
    monastery: 'philotheou',
    intro:
      'Equal-to-the-Apostles, the great preacher of the Greek lands under Ottoman rule. Tonsured at Philotheou, he received the blessing of the Holy Community to leave the Mountain and preach the Gospel in the villages of Epirus, Macedonia and Albania, founding hundreds of schools. He was martyred near Berat in 1779.',
  },
  {
    slug: 'nikodemos-the-hagiorite',
    name: 'St Nikodemos the Hagiorite',
    nameGreek: 'Νικόδημος ὁ Ἁγιορείτης',
    years: '1749 – 1809',
    feast: 'St Nikodemos (14 / 27 July)',
    monastery: 'great-lavra',
    intro:
      'The great patristic editor of the Holy Mountain. With Makarios of Corinth he compiled the *Philokalia* (Venice, 1782), the anthology of mystical Athonite writing that shaped Orthodox spirituality from Russia to the modern Greek world. The *Pedalion*, *Invisible Warfare* and the great *Synaxaristes* are also his work.',
  },
  {
    slug: 'john-koukouzelis',
    name: 'St John Koukouzelis',
    nameGreek: 'Ἰωάννης ὁ Κουκουζέλης',
    years: 'c. 1280 – c. 1360',
    feast: 'St John Koukouzelis (1 / 14 October)',
    monastery: 'great-lavra',
    intro:
      'Imperial chanter at the Constantinopolitan court who fled to Great Lavra and lived as a shepherd-monk. Before the icon of Panagia Koukouzelissa he heard the Mother of God say "Chant on, my John, and you shall not lack reward" — and on waking found a gold coin in his hand. Father of the *Papadike*, the great medieval chant manual.',
  },
  {
    slug: 'gregory-of-sinai',
    name: 'St Gregory of Sinai',
    nameGreek: 'Γρηγόριος ὁ Σιναΐτης',
    years: 'c. 1260 – 1346',
    feast: 'St Gregory of Sinai (8 / 21 August)',
    monastery: 'philotheou',
    intro:
      'Hesychast teacher who brought the Sinaitic practice of the Jesus Prayer to Athos, where it took root in the kathismata around Magoula. Teacher (in spirit and in writings) of St Gregory Palamas. Later founded the great monastery of Paroria on the Bulgarian-Byzantine frontier.',
  },
];

export function findSaint(slug: string): Saint | undefined {
  return SAINTS.find((s) => s.slug === slug);
}

export function saintsForMonastery(monasterySlug: string): Saint[] {
  return SAINTS.filter((s) => s.monastery === monasterySlug);
}
