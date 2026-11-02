/* ==========================================================================
   SAIL NORTH: content file.  Wording, harbors, difficulty, and facts live here.
   Facts come from the TCI chapter "Exploration and Settlement."
   Standards: California HSS 4.2.3 (Spanish exploration), 4.1 (geography), and map skills.
   ========================================================================== */
window.SAIL_DATA = {
  title: "Sail North",
  subtitle: "Exploring California's Coast",

  intro: [
    "The year is 1542. You are the captain of a Spanish ship exploring the coast of Alta California. Your orders: sail north and follow the coast.",
    "It sounds easy, but it is not. The wind usually blows from the northwest, straight at you. The ocean current flows south, pushing you back. Fog hides the rocks. And there are very few harbors.",
    "Can you reach the harbors and sail all the way to Oregon before your supplies run out?"
  ],

  /* Sailing rules: speeds by angle to the wind (0 = straight into the wind ... 4 = wind from behind). */
  physics: { speeds: [0, 2, 3, 3, 2], current: 1 },
  restock: 20, supplyCap: 60, hullMax: 3,

  modes: {
    easy:     { label: "Easy",     supplies: 45, hints: null, reefPct: 12, fog: false, desc: "More supplies, fewer rocks, no fog, and unlimited help from the pilot." },
    standard: { label: "Standard", supplies: 30, hints: 3,    reefPct: 35, fog: true,  desc: "Fog hides the rocks. You get 3 hints from the pilot." }
  },
  fogBands: [[15, 19], [6, 10]],        // map rows where fog banks lie near the coast

  harborOrder: ["monterey", "drakes", "oregon"],
  harbors: {
    sandiego: { name: "San Diego Bay", who: "Juan Rodríguez Cabrillo (kuh-BREE-yoh)", year: 1542, short: "Start",
      text: [
        "In September 1542, Cabrillo reached a sheltered bay, now called San Diego Bay. He went ashore and claimed the land for Spain.",
        "The Kumeyaay (KOO-me-eye) people who lived here saw the ships and were afraid. Using sign language, they explained that other men like the Spanish had killed many Indians. When Cabrillo's crew rowed ashore to fish, some Kumeyaay attacked them.",
        "Cabrillo sailed on up the coast. He planned to follow the shore wherever it led, and to look for a waterway leading inland."
      ] },
    monterey: { name: "Monterey Bay", who: "Sebastián Vizcaíno (viz-kah-EE-no)", year: 1602, short: "Monterey",
      text: [
        "Vizcaíno's orders were to map the California coast and look for harbors. It took his ships six months just to reach San Diego, because winds and currents slowed them down.",
        "Five weeks later, he entered a large bay and named it Monterey Bay. He told the king it was the perfect harbor for Spanish ships.",
        "But the king decided California was too far away for a new settlement. Spain lost interest for more than 150 years."
      ] },
    drakes: { name: "Drakes Bay", who: "Francis Drake", year: 1579, short: "Drakes Bay",
      text: [
        "Drake was an English captain. His ship had been taking Spanish treasure, and it was heavy and leaking when he reached California.",
        "He landed near what is now San Francisco to make repairs. Miwok Indians came out to welcome Drake and his crew, and watched the men lift the big ship out of the water.",
        "Drake stayed more than a month. Before he left, he ordered a brass plate made to claim the land for Queen Elizabeth. Years later, a famous plate was found... but was it real? (That is a mystery for another day.)"
      ] },
    oregon: { name: "The Oregon Coast", who: "Cabrillo's crew", year: 1543, short: "Oregon",
      text: [
        "Cabrillo did not live to finish the voyage. He died of an infection, and his crew buried him in California with respect.",
        "The crew did not turn back. They sailed on to Oregon, and later returned to Mexico.",
        "Cabrillo and his men were the first Europeans to sail this coast. You have followed their path. You have also met the sailors and the winds, currents, fog, and rocks that made it so hard."
      ] }
  },

  glossary: [
    { word: "current", meaning: "water in the ocean that flows steadily in one direction" },
    { word: "expedition", meaning: "a journey to explore unknown places" },
    { word: "harbor", meaning: "a sheltered place where ships can rest and be safe" },
    { word: "tack", meaning: "to zigzag, sailing at an angle to the wind, so you can make progress toward the wind" },
    { word: "reef", meaning: "rocks hidden just under the water, dangerous to ships" },
    { word: "soundings", meaning: "checking the water near the ship to find rocks and see how deep it is" }
  ],

  lookoutRadius: 4, soundingRadius: 3,

  /* Captain's tips shown while sailing. */
  tips: [
    "The wind blows from the northwest. You cannot sail straight into it.",
    "The current pushes you 1 square south after every move.",
    "Rocks close to shore can scrape your ship. Fog hides them. Take soundings!",
    "Zigzag! Turn one way, then the other, so you do not run into the coast or drift far out to sea."
  ],

  final: {
    reflection: [
      "What made it so hard to sail north along the California coast?",
      "Why did explorers zigzag (tack) instead of sailing in a straight line?",
      "The Kumeyaay and Miwok people lived along this coast long before the ships arrived. How do you think they felt when they saw the ships?"
    ],
    leftOut: "This game puts voyages from different years into one trip. Cabrillo sailed in 1542, Drake in 1579, and Vizcaíno in 1602. Real sailors faced much more than this game shows: sickness on board (Cabrillo's crew was made up of Spanish sailors and soldiers, and also Mexican Indians), storms, and months at sea. The coast was already home to many Native peoples, including the Kumeyaay, Chumash, and Miwok."
  },

  teacher: {
    standards: "California HSS 4.2.3 (Spanish exploration and colonization of California), 4.1 (physical geography of California: the Pacific Ocean and coast), plus map-reading and cause-and-effect skills.",
    notes: [
      "The game is a puzzle about the chapter's key challenge: wind from the northwest and a southward current make sailing north hard. The numbers on the steering pad show how far the ship moves for each heading.",
      "The harbor cards come straight from the chapter: San Diego Bay (Cabrillo, 1542), Monterey Bay (Vizcaíno, 1602), Drakes Bay (Drake, 1579), and Oregon (Cabrillo's crew).",
      "The voyage combines three explorers in one trip. Each harbor card gives its own explorer and year.",
      "Kumeyaay, Chumash, and Miwok lands are labeled on the map so students see the coast was already inhabited.",
      "The game ends by pointing toward the Brass Plate mystery in the chapter's Read & Do."
    ]
  },

  stars: { turns: [60, 40], hits: [3, 0] }   // turns: 2 stars at 60 or fewer, 3 stars at 40 or fewer
};
