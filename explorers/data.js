/* ==========================================================================
   EXPLORER'S CHOICE: content file.  Every story, choice, and fact lives here.
   Facts come from the TCI chapter "Exploration and Settlement."
   Choices marked real:true are what the real explorer did (per the chapter).
   Other choices are "what might have happened" and are labeled that way.
   Standards: California HSS 4.2.3 (Spanish and English exploration), 4.1 (geography), analysis skills.
   ========================================================================== */
window.EXPLORE = {
  title: "Explorer's Choice",
  subtitle: "Choose a voyage. Reach your goal. Survive the hardships.",
  intro: [
    "Explorers came to California and the Pacific coast for very different reasons. Some wanted land and treasure. Some wanted a shortcut across North America. Some wanted to start settlements.",
    "Choose one and lead the voyage. Manage your supplies, your crew, and the people you meet. You can make the same choices as the real explorer, or change history."
  ],

  meters: [
    { id: "supplies", emoji: "🍞", label: "Supplies" },
    { id: "health",   emoji: "❤️", label: "Crew health" },
    { id: "morale",   emoji: "😊", label: "Morale" },
    { id: "trust",    emoji: "🤝", label: "Trust of local people" },
    { id: "vessel",   emoji: "⛵", label: "Ship" }
  ],

  glossary: [
    { word: "expedition", meaning: "a journey to explore unknown places" },
    { word: "colony", meaning: "a territory ruled by a country in another land" },
    { word: "current", meaning: "water in the ocean that flows steadily in one direction" },
    { word: "Northwest Passage", meaning: "a waterway through North America that explorers hoped would make the trip between Europe and Asia shorter" },
    { word: "mission", meaning: "a settlement where priests taught their religion to native peoples" },
    { word: "morale", meaning: "how confident and hopeful a group feels" }
  ],

  /* ---------------- Random hazards ---------------- */
  hazards: {
    sea: [
      { id: "storm", emoji: "⛈️", title: "A storm at sea", text: "Dark clouds roll in. The waves grow huge, and the ship rolls.",
        choices: [
          { label: "Lighten the ship: throw some cargo overboard", desc: "Safer, but you lose supplies.", effects: { supplies: -8, vessel: -2 }, result: "Without the extra weight, the ship rides the waves." },
          { label: "Ride out the storm", desc: "Risky: could be fine, or could do damage.", outcomes: [
            { p: 0.5, effects: { vessel: -6 }, text: "The ship holds together, with a little damage." },
            { p: 0.5, effects: { vessel: -18, health: -6 }, text: "The storm damages the ship, and some sailors are hurt." } ] }
        ] },
      { id: "sick", emoji: "🤒", title: "Sickness on board", text: "Many of your sailors are feeling sick and weak.",
        choices: [
          { label: "Rest the sick and share the fresh food", desc: "Costs supplies, but helps.", effects: { supplies: -8, health: -2, morale: 2 }, result: "The sick rest and recover. It costs food and time." },
          { label: "Keep sailing", desc: "Save supplies, but risk more illness.", outcomes: [
            { p: 0.5, effects: { health: -8 }, text: "Some sailors get sicker." },
            { p: 0.5, effects: { health: -16, morale: -6 }, text: "The sickness spreads. Morale drops." } ] }
        ] },
      { id: "calm", emoji: "🌫️", title: "Becalmed", text: "The wind dies. The sails hang limp, and the ship barely moves.",
        choices: [
          { label: "Wait patiently for the wind", desc: "Use supplies while you wait.", effects: { supplies: -6, morale: -3 }, result: "Days pass slowly before the wind returns." },
          { label: "Row the ship with small boats", desc: "Make progress, but crew gets tired.", effects: { supplies: -3, health: -5, morale: -4 }, result: "Rowing is hard work, but you keep moving." }
        ] }
    ],
    land: [
      { id: "heat", emoji: "🥵", title: "Heat and thirst", text: "The sun beats down. Water skins are almost empty.",
        choices: [
          { label: "Rest in the shade and march at night", desc: "Slower, but safer.", effects: { supplies: -5, health: -2 }, result: "The cool night air helps everyone." },
          { label: "Press on in the heat", desc: "Risky: could cost health and animals.", outcomes: [
            { p: 0.5, effects: { health: -10, vessel: -4 }, text: "People and animals are worn out." },
            { p: 0.5, effects: { health: -14, supplies: -6 }, text: "Some people faint, and water is wasted." } ] }
        ] },
      { id: "mule", emoji: "🐴", title: "A mule falls ill", text: "One of the pack mules is sick and can't carry its load.",
        choices: [
          { label: "Slow down and care for the animals", desc: "Costs supplies, helps the animals.", effects: { supplies: -5, vessel: 6 }, result: "The mule recovers, and the animals are stronger." },
          { label: "Leave the mule behind", desc: "Save time, but lose gear.", effects: { vessel: -10, morale: -3 }, result: "You move on. The load is shared among the other animals." }
        ] },
      { id: "river", emoji: "🌊", title: "A swollen river", text: "Heavy rain has made the river too high to wade across easily.",
        choices: [
          { label: "Wait for the water to drop", desc: "Safe, but you lose time and food.", effects: { supplies: -7, morale: -2 }, result: "After a few days, the river drops and you cross safely." },
          { label: "Cross at once", desc: "Risky: you could lose gear.", outcomes: [
            { p: 0.6, effects: {}, text: "You cross safely and save time." },
            { p: 0.4, effects: { supplies: -10, vessel: -10 }, text: "The river sweeps away some food and gear." } ] }
        ] }
    ],
    arctic: [
      { id: "ice", emoji: "🧊", title: "Ice floes", text: "Chunks of ice drift across your path.",
        choices: [
          { label: "Steer carefully around the ice", desc: "Slow, but safer.", effects: { supplies: -4, vessel: -3 }, result: "You wind your way around the ice." },
          { label: "Sail straight through the slush", desc: "Faster, but risky.", outcomes: [
            { p: 0.5, effects: { vessel: -6 }, text: "The ice scrapes the ship, with a little damage." },
            { p: 0.5, effects: { vessel: -18 }, text: "A big chunk of ice damages the ship." } ] }
        ] },
      { id: "freeze", emoji: "🌨️", title: "A freezing storm", text: "Icy wind and waves hit the ship. Ropes and sails are stiff with ice.",
        choices: [
          { label: "Take in the sails and ride it out", desc: "Cold, but safe.", effects: { vessel: -4, health: -4, morale: -3 }, result: "The storm passes. Everyone is cold and tired." },
          { label: "Run for shelter near the shore", desc: "Closer to rocks.", effects: { supplies: -5, vessel: -8 }, result: "You find shelter, but the shore is rocky." }
        ] },
      { id: "fogA", emoji: "🌫️", title: "Thick fog", text: "Fog hides the sea and the coast.",
        choices: [
          { label: "Anchor and wait", desc: "Use supplies while you wait.", effects: { supplies: -5, morale: -2 }, result: "The fog lifts after a few days." },
          { label: "Sound ahead with small boats", desc: "Tiring, but you keep moving.", effects: { supplies: -3, health: -3 }, result: "The small boats lead you through." }
        ] }
    ]
  },

  /* ---------------- The explorers ---------------- */
  explorers: {

    /* ================= CABRILLO ================= */
    cabrillo: {
      id: "cabrillo", name: "Juan Rodríguez Cabrillo", short: "Cabrillo", say: "kuh-BREE-yoh", year: 1542, country: "Spain", emoji: "⚓", color: "#c0392b", map: "west", travelEmoji: "⛵",
      vessel: { emoji: "⛵", label: "Ship" },
      goal: "Sail north along the coast of Alta California. Claim land for Spain, look for treasure, and search for a waterway leading inland.",
      hardships: ["Wind and current work against you", "Fog and rocky waters, with few harbors", "People on shore who are afraid of strangers", "Sickness"],
      difficulty: "Medium",
      start: { supplies: 70, health: 80, morale: 70, trust: 50, vessel: 80 },
      stops: [
        { id: "navidad", name: "Navidad, Mexico", lon: -104.9, lat: 19.1, date: "June 1542", lx: 8, ly: -8, anchor: "start" },
        { id: "baja", name: "Baja coast", lon: -115.9, lat: 27.6, date: "July 1542", lx: -10, ly: 4, anchor: "end", via: [[-107.5, 20.5], [-110.6, 22.2], [-113.3, 24.4]] },
        { id: "sandiego", name: "San Diego Bay", lon: -117.4, lat: 32.6, date: "September 1542", lx: -10, ly: 4, anchor: "end", via: [[-117.3, 30.4]] },
        { id: "wind", name: "The windy coast", lon: -121.1, lat: 34.3, date: "Fall 1542", lx: -10, ly: 4, anchor: "end", via: [[-118.9, 33.4], [-120.4, 34.0]] },
        { id: "fog", name: "Fog and rocks", lon: -122.4, lat: 36.2, date: "Late 1542", lx: -10, ly: 4, anchor: "end", via: [[-121.9, 35.2]] },
        { id: "far", name: "Farther north", lon: -125.0, lat: 39.9, date: "Winter", lx: -10, ly: 4, anchor: "end", via: [[-123.2, 37.8], [-124.2, 38.9]] },
        { id: "oregon", name: "Oregon coast", lon: -125.0, lat: 42.6, date: "1543", lx: -10, ly: 4, anchor: "end", via: [[-125.1, 41.3]] }
      ],
      beats: [
        { type: "scene", stop: 0, id: "c0", emoji: "⚓", title: "Setting sail",
          text: "It is June 1542. You are Juan Rodríguez Cabrillo, and your ships are leaving Mexico. Most of your crew are Spanish sailors and soldiers. Some are Mexican Indians. Your orders: sail northwest and explore the coast of Alta California. You hope to claim land, find treasure, and find a waterway leading inland.",
          more: "A waterway through North America would make sailing between Europe and Asia much easier.",
          q: "How will you sail?", real: 0,
          history: "In real life, Cabrillo left Mexico in June and sailed northwest, hugging the coast. He planned to follow the coast wherever it led.",
          choices: [
            { label: "Hug the coast. You can see land and stop when you need to.", effects: { vessel: -3, morale: 4 }, result: "You keep the shore in sight. It is slower, but you can land for water and learn what the coast looks like." },
            { label: "Sail far out to sea, where the winds are better.", effects: { supplies: -4, morale: -4, vessel: 2 }, set: { offshore: true }, result: "What might have happened: The open ocean is faster, but you see little of the coast and can't land for water." }
          ] },
        { type: "travel", to: 1, days: 20, leg: { supplies: -8, vessel: -3 }, text: "You sail northwest along the Mexican coast and then up the dry coast of Baja California." },
        { type: "camp", stop: 1, id: "cc", emoji: "🏜️", title: "A dry, rocky coast",
          text: "Your ships anchor off a hot, dry shore. Choose 2 things to do before you go on.", picks: 2,
          actions: [
            { label: "Search for fresh water", effects: { supplies: 14, health: -2 } },
            { label: "Rest the crew", effects: { health: 12, morale: 6, supplies: -4 } },
            { label: "Repair the ship", effects: { vessel: 16, supplies: -3 } },
            { label: "Fish and meet people on shore", effects: { supplies: 8, trust: 5 } }
          ] },
        { type: "travel", to: 2, days: 25, leg: { supplies: -8, vessel: -3, morale: -2 }, text: "You keep sailing north along the coast." },
        { type: "scene", stop: 2, id: "c2a", emoji: "🏖️", title: "A sheltered bay",
          text: "In September you find a calm, sheltered bay, now called San Diego Bay. At last, a safe place to anchor! Your sailors go ashore.",
          voice: "The Kumeyaay (KOO-me-eye) people lived here long before the ships came.",
          q: "What will you do?", real: 0,
          history: "In real life, Cabrillo went ashore and claimed the land for Spain.",
          choices: [
            { label: "Claim the land for Spain.", effects: { morale: 6, trust: -8 }, set: { claimed: true }, result: "You claim the land for Spain. You haven't asked the people who already live here." },
            { label: "Anchor, rest, and greet the people who live here.", effects: { trust: 6, morale: 2 }, result: "What might have happened: You take time to meet the people before doing anything else." }
          ] },
        { type: "scene", stop: 2, id: "c2b", emoji: "🤲", title: "The Kumeyaay are afraid",
          text: "The Kumeyaay people who first see your ships are afraid. Using sign language, they explain that they have seen other men like the Spanish, and that those men killed many Indians. Your crew is hungry for fresh fish.",
          voice: "The Kumeyaay had heard about men who killed many Indians. They had good reason to be afraid.",
          q: "What will you do?", real: 0,
          history: "In real life, Cabrillo's crew rowed ashore to fish, and some Kumeyaay attacked them. Eventually Cabrillo sailed on, continuing up the coast.",
          choices: [
            { label: "Send the crew to row ashore and fish.", effects: { supplies: 8, health: -10, trust: -10 }, result: "Some Kumeyaay attack the crew who rowed ashore to fish. Your sailors return hurt, but with some fish." },
            { label: "Fish from the ships, and send a small gift ashore.", effects: { supplies: 3, trust: 8 }, result: "What might have happened: The Kumeyaay may see that you do not mean harm. Fishing from the ships brings less food." },
            { label: "Sail on right away.", effects: { supplies: -2, morale: -3 }, result: "What might have happened: You leave the bay. Nobody is hurt, but you didn't get any fresh food." }
          ] },
        { type: "travel", to: 3, days: 15, leg: { supplies: -8, vessel: -4 }, text: "You sail on up the coast." },
        { type: "scene", stop: 3, id: "c3", emoji: "🌬️", title: "Against the wind and current",
          text: "Now the coast is a challenge. The ocean current flows south, and the wind usually blows from the northwest. Both make it very hard to sail north.",
          more: "Remember Sail North? To go north, ships had to zigzag, sailing at an angle to the wind.",
          q: "How will you sail north?", real: 0,
          history: "In real life, Cabrillo planned to follow the coast wherever it led, and he continued up the coast.",
          choices: [
            { label: "Hug the coast and keep going.", effects: { supplies: -6, vessel: -8, morale: -2 }, result: "You keep following the shore. It is slow and hard, but you stay in sight of land." },
            { label: "Zigzag out to sea, then back to the coast.", effects: { supplies: -4, vessel: -3, morale: -2 }, result: "What might have happened: Sailing at an angle to the wind can work, but you may miss parts of the coast." },
            { label: "Anchor and wait for a better wind.", effects: { supplies: -9, morale: -4 }, result: "What might have happened: The wind does not change. You wait, and use up supplies." }
          ] },
        { type: "travel", to: 4, days: 20, leg: { supplies: -7, vessel: -3 }, text: "Fog begins to roll in." },
        { type: "scene", stop: 4, id: "c4", emoji: "🌁", title: "Fog and rocks",
          text: "Fog covers the sea. Rocky water lies along the coast. There are almost no harbors, and mountains rise steeply from the sea. If you hit the rocks, your ship could be wrecked.",
          q: "What will you do?",
          choices: [
            { label: "Anchor and wait for the fog to lift.", effects: { supplies: -6, morale: -2 }, result: "The fog lifts after a few days. The crew is safe, but supplies are lower." },
            { label: "Send a small boat ahead to look for rocks and a harbor.", effects: { supplies: -3, health: -3 }, result: "The small boat finds a way through the rocks. It is tiring work, but the ship stays safe." },
            { label: "Sail on slowly through the fog.", outcomes: [
              { p: 0.5, effects: {}, text: "You are lucky. No rocks this time." },
              { p: 0.5, effects: { vessel: -20, health: -5 }, text: "Scrape! The ship hits rocks and is damaged." } ] }
          ] },
        { type: "hazard", pool: "sea", chance: 0.7 },
        { type: "travel", to: 5, days: 30, leg: { supplies: -7, morale: -3 }, text: "Winter comes. You sail on, farther north than any European before you." },
        { type: "scene", stop: 5, id: "c5", emoji: "🕯️", title: "Cabrillo is gone",
          text: "Cabrillo did not live to finish the voyage. He died of an infection, and his crew buried him in California with respect. The crew must decide what to do next. You are now the crew's leader.",
          q: "What does the crew do?", real: 0,
          history: "In real life, the crew continued on to Oregon and later returned to Mexico.",
          choices: [
            { label: "Sail on to Oregon, as Cabrillo planned.", effects: { supplies: -6, morale: 4 }, result: "The crew honors Cabrillo by finishing the voyage." },
            { label: "Turn back to Mexico now.", effects: { supplies: -2 }, endEarly: "turnback", result: "What might have happened: The crew heads for home. The voyage ends here." }
          ] },
        { type: "travel", to: 6, days: 30, leg: { supplies: -7 }, text: "Your ships sail on to the north." },
        { type: "end", stop: 6, text: "You have reached the Oregon coast. Cabrillo and his men were the first Europeans to sail along this coast. Now your crew will turn around and return to Mexico." }
      ],
      ending: {
        real: [
          "In June 1542, Cabrillo left Mexico and sailed northwest, hugging the coast. In September he reached San Diego Bay and claimed the land for Spain.",
          "The Kumeyaay were afraid. They said other men like the Spanish had killed many Indians. Some Kumeyaay attacked Cabrillo's crew when they rowed ashore to fish.",
          "Wind, current, fog, rocks, and few harbors made the voyage very hard. Cabrillo died of an infection and his crew buried him in California. They continued to Oregon and later returned to Mexico. Cabrillo and his men were the first Europeans to sail along this coast.",
          "Cabrillo was looking for a waterway leading inland. He did not find one."
        ],
        goal: function (S) { var f = S.stop >= 6; return { stars: f ? 3 : S.stop >= 4 ? 2 : 1, text: f ? "You reached the Oregon coast." : "You sailed as far as " + S.stopName + "." }; }
      },
      questions: [
        "What was Cabrillo hoping to find? Did he find it?",
        "How did the wind and current make the voyage harder?",
        "Why did the Kumeyaay people feel afraid? What would you have done differently?"
      ]
    },

    /* ================= PORTOLÁ ================= */
    portola: {
      id: "portola", name: "Gaspar de Portolá", short: "Portolá", say: "por-toh-LA", year: 1769, country: "Spain", emoji: "🐴", color: "#8a5a2b", map: "west", travelEmoji: "🐴",
      vessel: { emoji: "🐴", label: "Animals and gear" },
      goal: "Lead the land expedition north from Baja California. Start settlements at San Diego Bay and Monterey Bay.",
      hardships: ["A hilly desert in Baja California", "Sickness in the groups from the ships", "Finding Monterey Bay", "Long marches with limited food"],
      difficulty: "Hard",
      start: { supplies: 65, health: 75, morale: 65, trust: 50, vessel: 80 },
      stops: [
        { id: "baja", name: "Baja California", lon: -112.5, lat: 27.0, date: "1769", lx: 10, ly: 6, anchor: "start" },
        { id: "desert", name: "The hilly desert", lon: -115.3, lat: 30.3, date: "Spring 1769", lx: 10, ly: 6, anchor: "start", via: [[-113.7, 28.7]] },
        { id: "sandiego", name: "San Diego Bay", lon: -117.1, lat: 32.7, date: "Summer 1769", lx: 10, ly: 6, anchor: "start", via: [[-116.4, 31.6]] },
        { id: "chumash", name: "A Chumash village", lon: -119.5, lat: 34.5, date: "August 1769", lx: 10, ly: 6, anchor: "start", via: [[-118.2, 33.9]] },
        { id: "monterey", name: "Monterey Bay", lon: -121.8, lat: 36.6, date: "Fall 1769", lx: 10, ly: 6, anchor: "start", via: [[-120.6, 35.4]] },
        { id: "sf", name: "San Francisco Bay", lon: -122.3, lat: 37.8, date: "Fall 1769", lx: 10, ly: 6, anchor: "start", via: [[-122.0, 37.3]] }
      ],
      extraRoutes: [ { label: "Ships", via: [[-110.2, 23.2], [-113.0, 24.5], [-116.5, 28.4], [-117.6, 32.3]], style: "sea" } ],
      beats: [
        { type: "scene", stop: 0, id: "p0", emoji: "📜", title: "Orders from Spain",
          text: "It is 1769. Spain is worried. England is growing powerful, and Russian fur traders are coming down the Pacific coast. You are Gaspar de Portolá, governor of Baja California. Spain sends you to start settlements at San Diego Bay and Monterey Bay. Father Junípero Serra, a Catholic priest, comes along to teach the Christian religion to the native peoples.",
          more: "Two ships will go by sea and two groups will go by land. All will meet at San Diego Bay.",
          q: "How will you travel?", real: 0,
          history: "In real life, Portolá and Father Serra went by land. The sea trip was worse: many sailors got sick and died, and one ship even sank.",
          choices: [
            { label: "By land, with soldiers, priests, mules, cattle, and horses.", effects: { vessel: -4, supplies: -4 }, result: "Your group sets out with pack mules carrying food, tools, and supplies, and a huge herd of cattle and horses." },
            { label: "By sea, on one of the ships.", effects: { health: -16, morale: -8, vessel: -18 }, result: "What might have happened: The ships had a harder trip than the land groups. Many sailors got sick." }
          ] },
        { type: "travel", to: 1, days: 20, leg: { supplies: -8, vessel: -5, health: -3 }, text: "You march north into the hilly desert of Baja California." },
        { type: "scene", stop: 1, id: "p1", emoji: "🥵", title: "The hilly desert",
          text: "The land is hot, dry, and hilly. It is hard going for people and animals. It will take one group 51 days to reach San Diego.",
          q: "How will you march?",
          choices: [
            { label: "March at a steady pace every day.", effects: { supplies: -6, health: -6, vessel: -6 }, result: "You make steady progress, but everyone is worn out." },
            { label: "Rest in the midday heat and march in the cool of morning and evening.", effects: { supplies: -8, health: -2, vessel: -2 }, result: "It takes more days, but people and animals suffer less." },
            { label: "Leave some heavy tools and gear behind to move faster.", effects: { supplies: -4, health: -2, vessel: 4 }, set: { lightLoad: true }, result: "The load is lighter, but you may need those tools later." }
          ] },
        { type: "camp", stop: 1, id: "pc", emoji: "⛺", title: "A camp in the desert",
          text: "Your group stops to rest. Choose 2 things to do before you go on.", picks: 2,
          actions: [
            { label: "Search for water and grass for the animals", effects: { supplies: 12, vessel: 4 } },
            { label: "Rest the people and the animals", effects: { health: 10, vessel: 8, morale: 5, supplies: -5 } },
            { label: "Check and repack the loads", effects: { vessel: 14, supplies: -3 } },
            { label: "Meet nearby people and trade", effects: { trust: 6, supplies: 6 } }
          ] },
        { type: "travel", to: 2, days: 31, leg: { supplies: -9, health: -4, vessel: -6 }, text: "After 51 days of hard travel, you reach San Diego Bay." },
        { type: "scene", stop: 2, id: "p2", emoji: "🤒", title: "The groups meet at San Diego Bay",
          text: "At last the ships and land groups meet at San Diego Bay. But the trip by sea was terrible. One ship sank. On another, half the men have died. Many more are too sick to go on.",
          q: "What will you do?", real: 0,
          history: "In real life, Portolá left Father Serra at San Diego and went on with a smaller group. Serra founded the first mission in San Diego soon after arriving in 1769.",
          choices: [
            { label: "Leave Father Serra with the sick, and go north with a smaller group.", effects: { health: 8, supplies: -4, morale: -3 }, set: { sandiego: true }, result: "Father Serra stays at San Diego and starts the first mission there. You push north with a smaller group." },
            { label: "Wait at San Diego until everyone is stronger.", effects: { health: 14, supplies: -14, morale: 4 }, set: { sandiego: true }, result: "What might have happened: Everyone rests, and the mission is started, but you use up food and time." },
            { label: "Take everyone north, even the sick.", effects: { health: -18, morale: -8 }, result: "What might have happened: The sick struggle to keep up, and no settlement is started at San Diego." }
          ] },
        { type: "travel", to: 3, days: 30, leg: { supplies: -8, vessel: -4 }, text: "You head north along the coast. Father Juan Crespi keeps a diary of the land and the people you meet." },
        { type: "scene", stop: 3, id: "p3", emoji: "🎁", title: "A village comes to meet you",
          text: "Father Crespi writes in his diary that a Chumash (CHOO-mash) chief came to your camp with his whole village. They brought more food than all your people could eat.",
          voice: "The Chumash chief and his village chose to bring food to the strangers.",
          q: "What will you do?", real: 0,
          history: "In real life, the Chumash chief and his village brought more food than all the people could eat, and Father Crespi wrote about it in his diary.",
          choices: [
            { label: "Accept the gift with thanks, and offer something in return.", effects: { supplies: 20, trust: 10, morale: 6 }, result: "Your people eat well. Offering something in return shows respect." },
            { label: "Accept the food and ask for even more.", effects: { supplies: 26, trust: -12 }, result: "What might have happened: You get more food, but the Chumash may feel you are asking too much." },
            { label: "Politely refuse. You do not want to be a burden.", effects: { trust: 2, morale: -3 }, result: "What might have happened: Your people stay hungry while food is offered." }
          ] },
        { type: "hazard", pool: "land", chance: 0.7 },
        { type: "travel", to: 4, days: 40, leg: { supplies: -8, vessel: -4, morale: -3 }, text: "You march on north, looking for Monterey Bay." },
        { type: "scene", stop: 4, id: "p4", emoji: "🌊", title: "A bay that doesn't look right",
          text: "You have reached Monterey Bay, the place you were sent to find. But it does not look like the place Vizcaíno described in 1602 as the perfect harbor.",
          q: "What will you do?", real: 0,
          history: "In real life, Portolá decided it did not look like Vizcaíno's description and kept going north. His men spotted what would later be called San Francisco Bay.",
          choices: [
            { label: "This isn't it. Keep going north to look for the real Monterey.", effects: { supplies: -8, morale: -4 }, result: "You push on north with your smaller group." },
            { label: "This must be it. Start a settlement here.", effects: { supplies: -4, morale: 8 }, set: { monterey: true }, jump: "endMonterey", result: "What might have happened: You found the right place! But you won't see what lies farther north." }
          ] },
        { type: "travel", to: 5, days: 10, leg: { supplies: -5, morale: -2 }, text: "You go on north." },
        { type: "scene", stop: 5, id: "p5", emoji: "🌉", title: "A giant bay",
          text: "Your men spot a huge bay. Father Crespi writes that it is big enough for all of Spain's navies. But your supplies are getting low.",
          q: "What will you do next?",
          choices: [
            { label: "Go back south to Monterey Bay and try again to start a settlement.", effects: { supplies: -8, morale: -3 }, set: { monterey: true, sf: true }, result: "You head back to Monterey Bay with a plan to begin a settlement there." },
            { label: "Keep exploring the shores of the great bay.", effects: { supplies: -8, morale: 3, health: -4 }, set: { sf: true }, result: "You learn more about the giant bay, but you are far from the settlements." }
          ] },
        { type: "end", stop: 5, text: "Your expedition has traveled far. You and your men have seen places no Spanish explorers had seen before." },
        { type: "end", id: "endMonterey", stop: 4, text: "You have started a settlement at Monterey Bay, the place you were sent to find. The expedition has done what Spain asked." }
      ],
      ending: {
        real: [
          "In 1769, Spain sent Portolá and Father Serra to California because it was worried about England and Russia.",
          "Portolá and Serra went by land. It took one group 51 days to reach San Diego. The trip by sea was worse: many sailors died and one ship sank.",
          "Portolá left Serra at San Diego and went on to Monterey Bay, which did not look like Vizcaíno's description. His men spotted San Francisco Bay. The expedition started the first European settlements: the San Diego mission in 1769, and the Monterey mission in 1770."
        ],
        goal: function (S) { var n = (S.flags.sandiego ? 1 : 0) + (S.flags.monterey ? 1 : 0); return { stars: 1 + n, text: (S.flags.sandiego ? "You started the San Diego settlement. " : "No settlement was started at San Diego. ") + (S.flags.monterey ? "You found Monterey Bay." : "You did not settle Monterey Bay.") }; }
      },
      questions: [
        "Why did Spain send an expedition to California in 1769?",
        "Why do you think the Chumash brought so much food? What does it tell you about them?",
        "Why was it hard to find Monterey Bay?"
      ]
    },

    /* ================= DRAKE ================= */
    drake: {
      id: "drake", name: "Francis Drake", short: "Drake", say: "", year: 1577, country: "England", emoji: "🏴", color: "#1f4a6e", map: "atlantic", travelEmoji: "⛵",
      vessel: { emoji: "⛵", label: "The Golden Hind" },
      goal: "Sail around South America and up the Pacific coast. Take Spanish treasure for England, find a shortcut home through the Northwest Passage, and make it back alive.",
      hardships: ["Storms that scatter your fleet", "A heavy, leaking ship", "Spanish ships and settlements", "A very long voyage home"],
      difficulty: "Medium",
      start: { supplies: 70, health: 80, morale: 75, trust: 50, vessel: 80 },
      stops: [
        { id: "england", name: "England", lon: -4.2, lat: 50.4, date: "1577", lx: 12, ly: -4, anchor: "start" },
        { id: "tip", name: "Tip of South America", lon: -75.5, lat: -52.0, date: "1578", lx: 12, ly: 4, anchor: "start", via: [[-25, 30], [-35, 0], [-40, -20], [-52, -35], [-62, -47], [-63, -55.5], [-72, -56.5]] },
        { id: "peru", name: "Spanish towns and ships", lon: -78.5, lat: -12.5, date: "1579", lx: 12, ly: 4, anchor: "start", via: [[-76.5, -45], [-75.5, -35], [-73.5, -22]] },
        { id: "treasure", name: "A treasure ship", lon: -83.0, lat: -2.5, date: "1579", lx: 12, ly: 4, anchor: "start", via: [[-81, -7]] },
        { id: "calif", name: "California coast", map: "west", lon: -126.0, lat: 40.5, date: "1579", lx: 14, ly: 4, anchor: "start" },
        { id: "drakes", name: "Drakes Bay", map: "west", lon: -123.7, lat: 38.0, date: "June 1579", lx: 14, ly: 4, anchor: "start" },
        { id: "pacific", name: "West across the Pacific", map: "west", lon: -127.3, lat: 33.5, date: "1579 to 1580", lx: 14, ly: 4, anchor: "start" }
      ],
      beats: [
        { type: "scene", stop: 0, id: "d0", emoji: "👑", title: "The Queen's secret",
          text: "It is 1577. You are Francis Drake, an English sea captain. Queen Elizabeth I wants the riches of the Americas, but England is not strong enough to go to war with Spain. She will help pay for your voyage, but she wants it kept secret so Spain won't know.",
          more: "King Philip II of Spain was Elizabeth's enemy. Spain's treasury was overflowing with gold, silver, and gems from its colonies in the Americas.",
          q: "Will you keep the secret?", real: 0,
          history: "In real life, Drake agreed to keep the queen's secret. She did not want Spain to know she was supporting the voyage.",
          choices: [
            { label: "Yes. The queen's help stays secret.", effects: { morale: 4 }, set: { secret: true }, result: "You sail with five ships and tell no one about the queen's help." },
            { label: "No. Tell everyone the queen is behind this.", effects: { morale: 8, trust: -4 }, set: { exposed: true }, result: "What might have happened: Your crew is proud, but Spain soon learns that England is attacking its ships." }
          ] },
        { type: "travel", to: 1, days: 100, leg: { supplies: -10, vessel: -6, morale: -4 }, text: "You sail south across the Atlantic Ocean with five ships." },
        { type: "scene", stop: 1, id: "d1", emoji: "⛈️", title: "Storms at the tip of South America",
          text: "You sail around the tip of South America. Storms batter your fleet. One by one, the other ships are lost or turn back.",
          q: "What will you do?", real: 0,
          history: "In real life, Drake kept going. By the time he reached the Pacific, the Golden Hind was sailing alone.",
          choices: [
            { label: "Push on into the Pacific, even if the Golden Hind is alone.", effects: { vessel: -12, morale: -8, health: -4 }, result: "By the time you reach the Pacific, the Golden Hind sails alone." },
            { label: "Turn back with the other ships.", effects: {}, endEarly: "turnback", result: "What might have happened: You return home safely. But you never reach the Pacific." }
          ] },
        { type: "travel", to: 2, days: 60, leg: { supplies: -6, vessel: -3, morale: -2 }, text: "You sail north up the western coast of South America." },
        { type: "scene", stop: 2, id: "d2", emoji: "🏴", title: "Spanish towns and ships",
          text: "The Spanish have never seen an English ship in the Pacific. They are not ready for you.",
          more: "To the Spanish, taking their treasure was stealing. Spain and England were rivals, and Spain was angry.",
          q: "What will you do?", real: 0,
          history: "In real life, Drake attacked Spanish towns and ships, taking the Spanish by surprise. They had never seen an English ship in Pacific waters.",
          choices: [
            { label: "Attack Spanish ships and towns by surprise and take their treasure.", effects: { supplies: 14, morale: 8, vessel: -4 }, set: { attacked: true }, result: "You take the Spanish by surprise. They can't stop you." },
            { label: "Trade for food peacefully.", effects: { supplies: 10, morale: 2 }, result: "What might have happened: You get food, but no treasure." },
            { label: "Stay away from the Spanish and sail quietly north.", effects: { supplies: -6, morale: -2 }, result: "What might have happened: Nobody sees you. But you do not get any new supplies." }
          ] },
        { type: "travel", to: 3, days: 30, leg: { supplies: -5, vessel: -2 }, text: "You sail on up the coast." },
        { type: "scene", stop: 3, id: "d3", when: { flag: "attacked" }, emoji: "💰", title: "A treasure ship",
          text: "From one Spanish ship, you take more than a dozen treasure chests. Inside are jewels, pearls, 80 pounds of gold, and 26 tons of silver!",
          q: "How much do you take?", real: 0,
          history: "In real life, Drake took it all. By the time he reached California, his ship was heavy with Spanish silver and gold.",
          choices: [
            { label: "Take it all.", effects: { vessel: -14, morale: 8 }, set: { treasure: true, heavy: true }, result: "Your ship is heavy with treasure. It sits low in the water." },
            { label: "Take the gold and jewels, but leave the heavy silver.", effects: { vessel: -4, morale: 2 }, set: { treasure: true }, result: "What might have happened: The ship rides higher and safer, but you bring home less." },
            { label: "Take nothing.", effects: { morale: -6 }, result: "What might have happened: The crew is upset. Nothing is added to the ship." }
          ] },
        { type: "hazard", pool: "sea", chance: 0.7 },
        { type: "travel", to: 4, days: 60, leg: { supplies: -9, vessel: -6 }, legIf: { flag: "heavy", effects: { vessel: -8 } }, text: "You sail north, past Mexico, to the coast of California." },
        { type: "scene", stop: 4, id: "d4", emoji: "🧭", title: "Looking for the Northwest Passage",
          text: "You hope to find a western opening to the Northwest Passage, a shortcut between the Pacific and England. You sail along the California coast.",
          q: "What will you do?", real: 0,
          history: "In real life, Drake continued up the coast, looking in vain for a western opening to the Northwest Passage.",
          choices: [
            { label: "Sail north, searching for the opening.", effects: { supplies: -10, vessel: -8, morale: -4 }, set: { searched: true }, result: "You look and look, but find no opening. You look in vain." },
            { label: "Skip the search and head west for the long trip home.", effects: { supplies: -4 }, set: { skipped: true }, result: "What might have happened: You save time and supplies, but never look for the shortcut." }
          ] },
        { type: "scene", stop: 4, id: "d5", emoji: "💧", title: "A leaking ship",
          text: "The Golden Hind is leaking badly. If you don't fix it, the ship could sink.",
          q: "What will you do?", real: 0,
          history: "In real life, Drake's ship was leaking, so he landed near what is now San Francisco to make repairs.",
          choices: [
            { label: "Land at a bay near what is now San Francisco and repair the ship.", effects: { vessel: 10, supplies: -4 }, set: { landed: true }, result: "You find a bay where you can make repairs." },
            { label: "Keep sailing and patch the leak at sea.", outcomes: [
              { p: 0.55, effects: { vessel: -10 }, text: "What might have happened: The patch holds, barely." },
              { p: 0.45, effects: { vessel: -35, supplies: -10 }, set: { treasure: false }, text: "What might have happened: The leak gets worse. You throw cargo overboard, including your treasure!" } ] }
          ] },
        { type: "travel", to: 5, when: { flag: "landed" }, days: 5, leg: { supplies: -2 }, text: "You sail into a bay to make repairs." },
        { type: "scene", stop: 5, id: "d6", when: { flag: "landed" }, emoji: "🌿", title: "The Miwok welcome you",
          text: "Miwok Indians come out to welcome you and your crew. They watch as your men raise the large ship out of the water for repairs.",
          voice: "The Miwok people lived here, and they came out to welcome Drake and his crew.",
          q: "How will you greet them?",
          choices: [
            { label: "Greet them with respect, and share gifts and food.", effects: { trust: 12, supplies: 3, morale: 4 }, result: "The Miwok and your crew share a good meeting." },
            { label: "Keep your distance and guard the ship.", effects: { trust: -6, morale: -2 }, result: "Your crew works under guard. The Miwok watch from a distance." },
            { label: "Trade goods for fresh food.", effects: { supplies: 10, trust: 5 }, result: "You trade for fresh food, and your crew eats well." }
          ] },
        { type: "camp", stop: 5, when: { flag: "landed" }, id: "dc", emoji: "⚒️", title: "Over a month at the bay",
          text: "Drake stayed for over a month. Choose 3 things to do while your ship is out of the water.", picks: 3,
          actions: [
            { label: "Repair the Golden Hind", effects: { vessel: 22, supplies: -4 } },
            { label: "Rest the crew", effects: { health: 12, morale: 8, supplies: -4 } },
            { label: "Trade with the Miwok for fresh food", effects: { supplies: 12, trust: 6 } },
            { label: "Explore the land nearby", effects: { morale: 6, health: -1, supplies: -3 } }
          ] },
        { type: "scene", stop: 5, id: "d7", when: { flag: "landed" }, emoji: "🪧", title: "A monument of our being there",
          text: "Before you leave, you think about a monument. A brass plate could carry the date and words claiming the land for Queen Elizabeth. It could be nailed to a great post.",
          q: "What will you do?", real: 0,
          history: "In real life, Drake ordered a brass plate with the date and words claiming the land for Queen Elizabeth. That plate was lost, and a famous plate found in 1936 turned out to be a fake. Remember The Mystery of the Brass Plate?",
          choices: [
            { label: "Order a brass plate claiming the land for Queen Elizabeth.", effects: { morale: 4, trust: -8 }, set: { plate: true }, result: "Your crew makes the plate and nails it to a great post." },
            { label: "Leave a gift for your hosts, and make no claim.", effects: { trust: 10, morale: -2 }, result: "What might have happened: You leave as friends, with no claim on the land." },
            { label: "Leave quietly with nothing behind.", effects: {}, result: "What might have happened: You sail away. Nothing marks your visit." }
          ] },
        { type: "travel", to: 6, days: 40, leg: { supplies: -6 }, text: "Your ship is ready. It is time to go home." },
        { type: "scene", stop: 6, id: "d8", emoji: "🌏", title: "Which way home?",
          text: "You are on the far side of North America with a heavy ship. England is a very long way away.",
          q: "Which way will you go?", real: 0,
          history: "In real life, Drake sailed west across the Pacific and reached England in 1580. His was the second expedition to sail around the world.",
          choices: [
            { label: "Sail west across the Pacific Ocean.", effects: { supplies: -14, morale: -4, health: -4 }, result: "You cross the huge Pacific Ocean, and sail on around the world." },
            { label: "Go back the way you came, past the Spanish.", outcomes: [
              { p: 0.5, effects: { supplies: -10 }, text: "What might have happened: You slip past the Spanish without being seen." },
              { p: 0.5, effects: { supplies: -10, vessel: -14 }, set: { treasure: false }, text: "What might have happened: Spanish ships spot you and you lose some of your treasure." } ] }
          ] },
        { type: "end", stop: 6, text: "Your ship sails home to England. Queen Elizabeth will reward you with knighthood. From then on, you will be known as Sir Francis Drake." }
      ],
      ending: {
        real: [
          "Drake sailed from England in 1577 with five ships. One by one the others were lost or turned back, and the Golden Hind sailed alone into the Pacific. Queen Elizabeth secretly supported the voyage.",
          "Drake attacked Spanish towns and ships and took jewels, pearls, 80 pounds of gold, and 26 tons of silver. In 1579, his leaking ship landed near what is now San Francisco. The Miwok welcomed him. He stayed over a month and ordered a brass plate claiming the land for Queen Elizabeth.",
          "He searched in vain for a western opening to the Northwest Passage, then sailed west across the Pacific and reached England in 1580. His was the second expedition to sail around the world. On April 4, 1581, Queen Elizabeth made him a knight."
        ],
        goal: function (S) { var home = S.over === "done"; var n = 1 + (home && S.flags.treasure ? 1 : 0) + (S.flags.searched ? 1 : 0); return { stars: n, text: (home && S.flags.treasure ? "You brought treasure home to England. " : "You did not bring treasure home. ") + (S.flags.searched ? "You searched for the Northwest Passage." : "You did not search for the Northwest Passage.") }; }
      },
      questions: [
        "Why did Queen Elizabeth want to keep her help a secret?",
        "Why do you think the Spanish were angry at Drake?",
        "The Miwok welcomed Drake. Drake claimed the land for the queen. How do you think the Miwok might have felt about that?"
      ]
    }
,

    /* ================= VIZCAÍNO ================= */
    vizcaino: {
      id: "vizcaino", name: "Sebastián Vizcaíno", short: "Vizcaíno", say: "viz-kah-EE-no", year: 1602, country: "Spain", emoji: "🗺️", color: "#6b3fa0", map: "west", travelEmoji: "⛵",
      vessel: { emoji: "⛵", label: "Ship" },
      goal: "Map the California coast and find good harbors for Spanish ships.",
      hardships: ["Winds and currents that slow your ships", "A very long voyage", "Finding a harbor worth a settlement", "Winning the king's interest"],
      difficulty: "Medium",
      start: { supplies: 60, health: 80, morale: 70, trust: 50, vessel: 80 },
      stops: [
        { id: "mexico", name: "Mexico", lon: -105.5, lat: 19.8, date: "1602", lx: 10, ly: -8, anchor: "start" },
        { id: "baja", name: "Baja coast", lon: -115.9, lat: 27.6, date: "1602", lx: -10, ly: 4, anchor: "end", via: [[-107.5, 20.5], [-110.6, 22.2], [-113.3, 24.4]] },
        { id: "sandiego", name: "San Diego Bay", lon: -117.4, lat: 32.6, date: "Six months later", lx: -10, ly: 4, anchor: "end", via: [[-117.3, 30.4]] },
        { id: "monterey", name: "Monterey Bay", lon: -122.4, lat: 36.7, date: "Five weeks later", lx: -10, ly: 4, anchor: "end", via: [[-119.0, 33.4], [-120.6, 34.4], [-121.9, 35.5]] }
      ],
      beats: [
        { type: "scene", stop: 0, id: "v0", emoji: "📜", title: "Orders from Spain",
          text: "It is 1602. You are Sebastián Vizcaíno. It has been 60 years since Cabrillo, the last Spanish explorer to sail this coast. Your orders are to map the California coast and look for harbors for Spanish ships.",
          more: "Harbors were very hard to find. Most of the coast has few sheltered bays.",
          q: "How will you do your work?",
          choices: [
            { label: "Map every bay and point carefully, even if it is slow.", effects: { supplies: -6, morale: -2 }, set: { mapped: true }, result: "You make careful notes and drawings of the coast. It takes longer." },
            { label: "Sail quickly, and only stop to look for harbors.", effects: { supplies: 2, morale: 2 }, set: { fast: true }, result: "You move faster, but your maps will not be as detailed." }
          ] },
        { type: "travel", to: 1, days: 45, leg: { supplies: -10, vessel: -4 }, text: "Your ships sail northwest along the coast of Mexico and Baja California." },
        { type: "camp", stop: 1, id: "vc", emoji: "🏜️", title: "A dry, rocky coast",
          text: "Your ships anchor off a hot, dry shore. Choose 2 things to do before you go on.", picks: 2,
          actions: [
            { label: "Search for fresh water", effects: { supplies: 14, health: -2 } },
            { label: "Rest the crew", effects: { health: 12, morale: 6, supplies: -4 } },
            { label: "Repair the ship", effects: { vessel: 16, supplies: -3 } },
            { label: "Fish and meet people on shore", effects: { supplies: 8, trust: 5 } }
          ] },
        { type: "scene", stop: 1, id: "v1", emoji: "🌬️", title: "Winds and currents",
          text: "The winds and currents are against you. They slow your ships down, and it is very hard to sail north.",
          more: "Remember Sail North? To go north, ships had to zigzag, sailing at an angle to the wind.",
          q: "How will you sail north?",
          choices: [
            { label: "Zigzag out to sea, then back to the coast.", effects: { supplies: -4, vessel: -3, morale: -2 }, result: "Sailing at an angle to the wind works, but it takes a long time." },
            { label: "Hug the coast and keep going.", effects: { supplies: -6, vessel: -8, morale: -2 }, result: "You stay in sight of land. It is slow and hard on the ship." },
            { label: "Anchor and wait for a better wind.", effects: { supplies: -9, morale: -4 }, result: "The wind does not change. You wait, and use up supplies." }
          ] },
        { type: "hazard", pool: "sea", chance: 0.7 },
        { type: "travel", to: 2, days: 110, leg: { supplies: -16, vessel: -6, morale: -4 }, text: "The voyage drags on. In all, it takes six months just to reach San Diego Bay." },
        { type: "scene", stop: 2, id: "v2", emoji: "⚓", title: "San Diego Bay",
          text: "After six months at sea, your ships reach San Diego Bay. Your crew is worn out from the long, slow voyage.",
          q: "What will you do?", real: 0,
          history: "In real life, Vizcaíno continued on up the coast. Five weeks later, he entered a large bay.",
          choices: [
            { label: "Rest briefly, then sail on north.", effects: { health: 6, supplies: -5, morale: 2 }, result: "The crew rests for a few days, then you sail on." },
            { label: "Stay and rest for a long time.", effects: { health: 14, supplies: -12, morale: 6 }, set: { longrest: true }, result: "What might have happened: Your crew recovers, but you use up supplies and time." }
          ] },
        { type: "travel", to: 3, days: 35, leg: { supplies: -9, vessel: -4, morale: -3 }, text: "You sail on north for five weeks." },
        { type: "scene", stop: 3, id: "v3", emoji: "🌊", title: "A large, sheltered bay",
          text: "You enter a large, sheltered bay. At last! There is fresh water, wood, and a safe place to anchor. Now you must tell the king about it.",
          q: "How will you describe it?", real: 0,
          history: "In real life, Vizcaíno named it Monterey Bay and wrote to the king that it was the perfect harbor for Spanish ships. When Portolá reached the bay in 1769, it did not look like Vizcaíno's description.",
          choices: [
            { label: "Name it Monterey Bay, and tell the king it is the perfect harbor: all that one could hope for.", effects: { morale: 8 }, set: { glowing: true }, result: "You write an excited letter to the king." },
            { label: "Name it Monterey Bay, and describe its shape and landmarks carefully, so others can find it again.", effects: { morale: 2, supplies: -2 }, set: { detailed: true }, result: "What might have happened: A careful description could help later sailors recognize the bay." }
          ] },
        { type: "end", stop: 3, text: "You sail home with your maps and your news. In real life, the king decided that California was too far away for a new settlement. After this voyage, Spain lost interest in California." }
      ],
      ending: {
        real: [
          "In 1602, Vizcaíno sailed from Mexico with orders to map the California coast and look for harbors. The winds and currents slowed his ships, and it took six months just to reach San Diego Bay.",
          "Five weeks later he entered a large bay. He named it Monterey Bay and wrote to the king that the port was all that one could hope for.",
          "But the king decided California was too far away for a new settlement. After this voyage, the Spanish lost interest in California. When Portolá finally reached Monterey Bay in 1769, it did not look like the place Vizcaíno had described."
        ],
        goal: function (S) { var r = S.stop >= 3; return { stars: 1 + (S.flags.mapped ? 1 : 0) + (r ? 1 : 0), text: (r ? "You found Monterey Bay. " : "You did not reach Monterey Bay. ") + (S.flags.mapped ? "You mapped the coast carefully." : "You did not map the coast in detail.") }; }
      },
      questions: [
        "Why did the trip to San Diego Bay take six months?",
        "Why might it cause problems that Vizcaíno called Monterey Bay \"all that one could hope for\"? Think about what happened to Portolá.",
        "Why do you think the king lost interest in California?"
      ]
    },

    /* ================= BERING ================= */
    bering: {
      id: "bering", name: "Vitus Bering", short: "Bering", say: "VY-tuhs BEAR-ing", year: 1728, years: "1728 and 1741", country: "Russia", emoji: "🧊", color: "#2a7f9a", map: "north", travelEmoji: "⛵",
      vessel: { emoji: "⛵", label: "Ship" },
      goal: "In 1728, find out whether Asia and North America are connected. In 1741, map the coast of North America.",
      hardships: ["Storms and fog", "Arctic ice", "Illness", "A very long way from home"],
      difficulty: "Medium",
      start: { supplies: 65, health: 70, morale: 60, trust: 50, vessel: 75 },
      stops: [
        { id: "kam", name: "Kamchatka, Russia", lon: 162.0, lat: 56.0, date: "1728", lx: -12, ly: -6, anchor: "end" },
        { id: "coast", name: "Along the Siberian coast", lon: 183.0, lat: 62.5, date: "Summer 1728", lx: -12, ly: -8, anchor: "end", via: [[166, 58.5], [172, 60.5]] },
        { id: "strait", name: "The strait", lon: 191.1, lat: 65.8, date: "1728", lx: 14, ly: -6, anchor: "start", via: [[187, 64.5]] },
        { id: "kam2", name: "Kamchatka again", lon: 158.8, lat: 53.0, date: "1741", lx: 12, ly: 18, anchor: "start", via: [[185, 63], [172, 60], [165, 56], [161, 54]] },
        { id: "islands", name: "Islands", lon: 190.0, lat: 54.8, date: "1741", lx: 12, ly: 20, anchor: "start", via: [[170, 53.5], [180, 54.0]] },
        { id: "alaska", name: "Coast of Alaska", lon: 211.0, lat: 59.0, date: "1741", lx: -14, ly: 22, anchor: "end", via: [[200, 56.5]] }
      ],
      beats: [
        { type: "scene", stop: 0, id: "b0", emoji: "📜", title: "Orders from Russia",
          text: "It is 1728. You are Vitus Bering, a sea captain serving Russia. Russia wants to know: is Asia connected to North America? You are sent to find out. You will sail north from the coast of Kamchatka.",
          q: "How will you sail?",
          choices: [
            { label: "Stay close to the coast, so you can see the land.", effects: { vessel: -6, morale: 2 }, result: "You keep the shore in sight. It is safer for navigating, but there are rocks and shallows." },
            { label: "Sail farther from shore, where the sea is open.", effects: { supplies: -2, vessel: -2, morale: -3 }, result: "The open sea has fewer rocks, but the crew is nervous out of sight of land." }
          ] },
        { type: "travel", to: 1, days: 40, leg: { supplies: -8, vessel: -4 }, text: "You sail north along the coast." },
        { type: "hazard", pool: "arctic", chance: 0.8 },
        { type: "scene", stop: 1, id: "b1", emoji: "🌫️", title: "Storms and fog",
          text: "Storms and fog make the sailing very hard. You can barely see the water ahead.",
          q: "What will you do?",
          choices: [
            { label: "Anchor and wait it out.", effects: { supplies: -7, morale: -2 }, result: "The fog lifts after a few days. The crew is safe, but supplies are lower." },
            { label: "Send boats ahead to feel the way.", effects: { supplies: -4, health: -3 }, result: "The boats find a way through. It is cold, tiring work." },
            { label: "Sail on carefully.", outcomes: [
              { p: 0.55, effects: { vessel: -4 }, text: "You make it through with a little damage." },
              { p: 0.45, effects: { vessel: -16, health: -4 }, text: "The ship is battered by waves and ice." } ] }
          ] },
        { type: "travel", to: 2, days: 35, leg: { supplies: -7, vessel: -4, morale: -3 }, text: "You sail on north, into colder water." },
        { type: "scene", stop: 2, id: "b2", emoji: "🌊", title: "A waterway between two lands",
          text: "Ahead, you find a waterway between two lands: Asia on one side, and North America on the other. One day it will be called the Bering Strait. Beyond it lie cold seas and ice.",
          more: "A strait is a narrow strip of water.",
          q: "What will you do?", real: 0,
          history: "In real life, Bering found the waterway that separates the two continents in 1728. With storms, fog, and arctic ice, it seemed impossible to find out whether it led to the Northwest Passage.",
          choices: [
            { label: "Turn back and report: the two continents are separated by a waterway.", effects: { supplies: -4, morale: 8 }, set: { strait: true }, result: "You have your answer! Asia and North America are not joined." },
            { label: "Push on north into the ice, to see if this is the Northwest Passage.", outcomes: [
              { p: 0.6, effects: { vessel: -20, supplies: -8 }, set: { strait: true }, text: "What might have happened: Ice closes in. The ship is damaged, and you have to turn back." },
              { p: 0.4, effects: { vessel: -12, health: -5 }, set: { strait: true }, text: "What might have happened: You see only ice and fog. It is too dangerous to go on." } ] }
          ] },
        { type: "travel", to: 3, days: 100, leg: { supplies: 10, health: 8, morale: 6, vessel: 15 }, text: "You return to Kamchatka. Years pass. The ship is repaired and the crew rests. In 1741 you sail again." },
        { type: "camp", stop: 3, id: "bc", emoji: "⚒️", title: "Getting ready for a new voyage",
          text: "The ships must be ready for a long, cold voyage. Choose 3 things to do before you sail.", picks: 3,
          actions: [
            { label: "Repair the ships", effects: { vessel: 20, supplies: -3 } },
            { label: "Rest the crew", effects: { health: 12, morale: 8, supplies: -4 } },
            { label: "Gather supplies for a long voyage", effects: { supplies: 18 } },
            { label: "Train the new sailors", effects: { morale: 6, health: 4, supplies: -4 } }
          ] },
        { type: "scene", stop: 3, id: "b3", emoji: "🗺️", title: "A second voyage",
          text: "It is 1741. Bering sails again. His plan is to map the coast of North America.",
          q: "How will you start?", real: 0,
          history: "In real life, Bering's plan in 1741 was to map the coast of North America.",
          choices: [
            { label: "Sail east to map the coast of North America.", effects: { supplies: -4 }, result: "You head east across the open ocean." },
            { label: "Go north again, to look for the Northwest Passage.", effects: { supplies: -4, vessel: -6, morale: -3 }, set: { northAgain: true }, result: "What might have happened: You search the cold north again. The coast of North America waits." }
          ] },
        { type: "travel", to: 4, days: 40, leg: { supplies: -8, vessel: -5, morale: -3 }, text: "You sail across a wide, stormy sea." },
        { type: "hazard", pool: "arctic", chance: 0.8 },
        { type: "scene", stop: 4, id: "b4", emoji: "🏝️", title: "Several islands",
          text: "Several islands lie in your path. Some have fresh water. Others are hidden by fog.",
          q: "What will you do?", real: 0,
          history: "In real life, Bering explored several islands on this voyage.",
          choices: [
            { label: "Explore the islands and take on fresh water.", effects: { supplies: 8, morale: 3, health: -2 }, set: { islands: true }, result: "You find fresh water and learn about the islands." },
            { label: "Skip the islands and sail straight for the mainland.", effects: { supplies: -5, morale: -2 }, result: "What might have happened: You save time, but miss a chance to restock." }
          ] },
        { type: "travel", to: 5, days: 35, leg: { supplies: -8, vessel: -5, health: -4 }, text: "You sail on toward the coast of Alaska." },
        { type: "scene", stop: 5, id: "b5", emoji: "🏔️", title: "The coast of Alaska",
          text: "At last you reach the coast of Alaska. But storms are rising, and many of your men are getting sick.",
          q: "What will you do?",
          choices: [
            { label: "Map as much of the coast as you can before the weather turns worse.", effects: { supplies: -6, health: -8, morale: -3 }, set: { mapped: true }, result: "You learn much about the coast, but the crew grows sicker." },
            { label: "Rest the sick and wait out the storms.", effects: { supplies: -8, health: 4 }, result: "The sick rest, but supplies go down while you wait." }
          ] },
        { type: "hazard", pool: "arctic", chance: 0.8 },
        { type: "scene", stop: 5, id: "b6", emoji: "🌨️", title: "Storms and illness",
          text: "Storms batter the ships, and illness is spreading. The expedition is in trouble.",
          q: "What will you do?", real: 0,
          history: "In real life, storms and illness forced Bering to turn back. He died before he could return home.",
          choices: [
            { label: "Turn back toward home.", effects: { supplies: -4, morale: -4 }, result: "The expedition turns back." },
            { label: "Keep mapping the coast.", effects: { health: -14, supplies: -8, morale: -4 }, set: { pushed: true }, result: "What might have happened: You learn a little more, but the crew gets sicker." }
          ] },
        { type: "end", stop: 5, text: "The expedition turns back. Bering explored several islands and the coast of Alaska. He died before he could return home." }
      ],
      ending: {
        real: [
          "Russia sent Vitus Bering to find out whether Asia was connected to North America. In 1728 he found a waterway separating the two continents. It became known as the Bering Strait.",
          "With storms, fog, and arctic ice, it seemed impossible to learn whether the strait was the entrance to the Northwest Passage.",
          "Bering sailed again in 1741, planning to map the coast of North America. He explored several islands and the coast of Alaska until storms and illness forced him to turn back. He died before he could return home."
        ],
        goal: function (S) { var a = S.stop >= 5; return { stars: 1 + (S.flags.strait ? 1 : 0) + (a ? 1 : 0), text: (S.flags.strait ? "You found the strait between Asia and North America. " : "You did not find the strait. ") + (a ? "You reached the coast of Alaska." : "You did not reach Alaska.") }; }
      },
      questions: [
        "What did Bering find in 1728? Why was it important?",
        "What is a strait?",
        "Why did storms, fog, and ice make exploring so hard?"
      ]
    },

    /* ================= ANZA ================= */
    anza: {
      id: "anza", name: "Juan Bautista de Anza", short: "Anza", say: "bo-TEE-stuh day AHN-zah", year: 1775, country: "Spain", emoji: "🏜️", color: "#a8561d", map: "west", travelEmoji: "🐴",
      vessel: { emoji: "🐴", label: "Animals and gear" },
      goal: "Lead a large group of settlers from Mexico, west across the desert and mountains, to Monterey. Then choose a site for a mission at San Francisco Bay.",
      hardships: ["Desert heat and mountain cold", "Feeding a large group of settlers and animals", "Living peacefully with the people along the route"],
      difficulty: "Medium",
      start: { supplies: 60, health: 75, morale: 70, trust: 50, vessel: 80 },
      stops: [
        { id: "mexico", name: "Mexico", lon: -110.5, lat: 29.5, date: "1775", lx: 12, ly: 4, anchor: "start" },
        { id: "yuma", name: "Yuma villages", lon: -114.6, lat: 32.7, date: "Late 1775", lx: 14, ly: -8, anchor: "start", via: [[-112.2, 31.0]] },
        { id: "desert", name: "Desert and mountains", lon: -116.4, lat: 33.3, date: "Winter 1775", lx: -14, ly: 18, anchor: "end", via: [[-115.5, 33.0]] },
        { id: "monterey", name: "Monterey", lon: -121.8, lat: 36.6, date: "1776", lx: 12, ly: 6, anchor: "start", via: [[-118.2, 34.1], [-119.8, 35.0], [-120.9, 36.0]] },
        { id: "sf", name: "San Francisco Bay", lon: -122.3, lat: 37.8, date: "1776", lx: 12, ly: 6, anchor: "start", via: [[-122.0, 37.2]] }
      ],
      beats: [
        { type: "scene", stop: 0, id: "a0", emoji: "👨‍👩‍👧‍👦", title: "Gathering the settlers",
          text: "It is 1775. You are Captain Juan Bautista de Anza. You will lead a large group of settlers from present-day Mexico to Monterey. Spaniards, Mexicans, Indians from northern Mexico, and Africans will all help found the new settlements. The trip will take them west across the desert and mountains.",
          q: "Who will you bring?", real: 0,
          history: "In real life, Anza brought a large group of settlers from present-day Mexico to Monterey.",
          choices: [
            { label: "A large group of settlers, with animals and supplies.", effects: { vessel: -4, supplies: -6, morale: 6 }, result: "Families and animals gather for the long journey." },
            { label: "A small party of soldiers to scout the way first.", effects: { supplies: 6, morale: -4, vessel: 4 }, result: "What might have happened: A small party travels faster, but there are no settlers to start a new community." }
          ] },
        { type: "travel", to: 1, days: 25, leg: { supplies: -10, vessel: -5, health: -3 }, text: "You lead the group west toward the Colorado River." },
        { type: "scene", stop: 1, id: "a1", emoji: "🌾", title: "The Yuma villages",
          text: "Your route passes close to villages of the Yuma people, who farm along the river. Your large group has many hungry animals.",
          voice: "The Yuma people grew crops along the river. Their fields were their food for the year.",
          q: "How will you pass?",
          choices: [
            { label: "Ask the Yuma for permission, trade for food, and keep the animals away from their fields.", effects: { supplies: 8, trust: 14 }, set: { fairYuma: true }, result: "The Yuma agree to trade. Your group crosses safely." },
            { label: "Pass through quickly, and let the animals graze where they can.", effects: { supplies: 4, trust: -12, vessel: 4 }, result: "You save time, but your animals walk through the Yuma's fields." },
            { label: "Camp here for several days to rest.", effects: { health: 8, supplies: -6, trust: -4 }, result: "You rest, but your large group uses up food and grass near the villages." }
          ] },
        { type: "hazard", pool: "land", chance: 0.7 },
        { type: "travel", to: 2, days: 30, leg: { supplies: -12, health: -5, vessel: -7 }, text: "You lead the group into the desert, and then up into the mountains." },
        { type: "camp", stop: 2, id: "ac", emoji: "⛺", title: "A camp in the desert and mountains",
          text: "The days are hot and the nights are cold. Choose 2 things to do before you go on.", picks: 2,
          actions: [
            { label: "Search for water and grass for the animals", effects: { supplies: 12, vessel: 4 } },
            { label: "Rest the people and the animals", effects: { health: 10, vessel: 8, morale: 5, supplies: -5 } },
            { label: "Check and repack the loads", effects: { vessel: 14, supplies: -3 } },
            { label: "Hunt for fresh meat", effects: { supplies: 10, morale: 3, vessel: -2 } }
          ] },
        { type: "travel", to: 3, days: 45, leg: { supplies: -12, health: -5, vessel: -6, morale: -4 }, text: "You go on, north along the coast." },
        { type: "scene", stop: 3, id: "a3", emoji: "🏘️", title: "Monterey at last",
          text: "After a long, hard trip, your settlers reach Monterey. Many are tired, but they have arrived.",
          q: "What will you do next?", real: 0,
          history: "In real life, Anza then went north to San Francisco Bay, where he chose a site for another mission.",
          choices: [
            { label: "Rest briefly, then go north to San Francisco Bay and choose a site for a mission.", effects: { supplies: -6, morale: 2 }, result: "You leave the settlers to rest and ride north with a small party." },
            { label: "Stay at Monterey and help the settlers get started.", effects: { morale: 8, supplies: -4 }, set: { stayed: true }, result: "What might have happened: The settlers get a good start, but no site is chosen at San Francisco Bay." }
          ] },
        { type: "travel", to: 4, when: { notFlag: "stayed" }, days: 8, leg: { supplies: -4, vessel: -2 }, text: "You ride north to San Francisco Bay." },
        { type: "scene", stop: 4, id: "a4", when: { notFlag: "stayed" }, emoji: "🌉", title: "A site for a mission",
          text: "You reach San Francisco Bay. You must choose a site for a mission. The Spanish will also build a fort, a presidio, nearby to protect it.",
          q: "How will you choose?",
          choices: [
            { label: "A spot near fresh water and good farmland.", effects: { morale: 6 }, set: { sfSite: true }, result: "Fresh water and farmland will help the settlement grow." },
            { label: "A spot with the best view of the bay.", effects: { morale: 4 }, set: { sfSite: true }, result: "You can watch the bay, but water will be harder to find." }
          ] },
        { type: "scene", stop: 4, id: "a5", when: { notFlag: "fairYuma" }, emoji: "⚠️", title: "Six years later",
          text: "In 1781, settlers still use Anza's route. But the trail passes close to Yuma villages, and the settlers' animals trample the Indians' crops. Angry Yumas attack a group of settlers.",
          voice: "The Yuma had watched animals eat the crops they grew for food.",
          q: "What should Spain do about the route?", real: 0,
          history: "In real life, after the 1781 attack, the Spanish stopped using the overland route. They had to bring supplies by ship.",
          choices: [
            { label: "Stop using the overland route, and bring supplies by ship.", effects: { morale: -2 }, result: "Supplies will have to come by sea, which is slower and costly." },
            { label: "Send soldiers to guard the route.", effects: { morale: -4, trust: -8 }, result: "What might have happened: More soldiers could mean more fighting." },
            { label: "Make an agreement with the Yuma: pay for the crops, and keep animals away from the fields.", effects: { trust: 10, morale: 2 }, result: "What might have happened: Paying for damage and respecting the fields could have kept the peace. We can't know." }
          ] },
        { type: "scene", stop: 4, id: "a6", when: { flag: "fairYuma" }, emoji: "⚠️", title: "Six years later",
          text: "You treated the Yuma fairly. But in real life, the story did not end well. At first settlers came by Anza's route. The trail passed close to Yuma villages, and the settlers' animals trampled the Indians' crops. In 1781, angry Yumas attacked a group of settlers.",
          voice: "The Yuma had watched animals eat the crops they grew for food.",
          q: "What should Spain do about the route?", real: 0,
          history: "In real life, after the 1781 attack, the Spanish stopped using the overland route. They had to bring supplies by ship.",
          choices: [
            { label: "Stop using the overland route, and bring supplies by ship.", effects: { morale: -2 }, result: "Supplies will have to come by sea, which is slower and costly." },
            { label: "Send soldiers to guard the route.", effects: { morale: -4, trust: -8 }, result: "What might have happened: More soldiers could mean more fighting." },
            { label: "Make an agreement with the Yuma: pay for the crops, and keep animals away from the fields.", effects: { trust: 10, morale: 2 }, result: "What might have happened: Paying for damage and respecting the fields could have kept the peace. We can't know." }
          ] },
        { type: "end", stop: 4, text: "Your settlers have crossed the desert and mountains, and Alta California has a new community. The Spanish will keep building missions, presidios, and pueblos." }
      ],
      ending: {
        real: [
          "In 1775, Captain Juan Bautista de Anza led a large group of settlers from present-day Mexico to Monterey. They traveled west across the desert and mountains. Anza then went north to San Francisco Bay, where he chose a site for another mission.",
          "At first, settlers came by Anza's route. But the trail passed close to Yuma villages, and the settlers' animals trampled the Indians' crops. In 1781, angry Yumas attacked a group of settlers.",
          "After that, the Spanish stopped using the overland route. They had to bring supplies by ship. Spaniards, Mexicans, Indians from northern Mexico, and Africans all helped found the settlements of Alta California."
        ],
        goal: function (S) { var m = S.stop >= 3; return { stars: 1 + (m ? 1 : 0) + (S.flags.sfSite ? 1 : 0), text: (m ? "Your settlers reached Monterey. " : "Your settlers did not reach Monterey. ") + (S.flags.sfSite ? "You chose a site for a mission at San Francisco Bay." : "You did not choose a site at San Francisco Bay.") }; }
      },
      questions: [
        "What was hard about leading a large group across a desert and mountains?",
        "Why were the Yuma angry in 1781? What could the Spanish have done differently?",
        "Who helped found the settlements of Alta California?"
      ]
    },

    /* ================= COOK ================= */
    cook: {
      id: "cook", name: "James Cook", short: "Cook", say: "", year: 1778, country: "England", emoji: "🧭", color: "#17806a", map: "north", travelEmoji: "⛵",
      vessel: { emoji: "⛵", label: "Ship" },
      goal: "Search the Pacific coast, from Oregon to Alaska and beyond, for an opening to the Northwest Passage.",
      hardships: ["Fog and storms on an unknown coast", "Arctic ice", "A very long way from home"],
      difficulty: "Medium",
      start: { supplies: 65, health: 75, morale: 65, trust: 50, vessel: 80 },
      stops: [
        { id: "oregon", name: "Oregon coast", lon: 235.0, lat: 44.5, date: "1778", lx: -12, ly: -4, anchor: "end" },
        { id: "coast", name: "Along the coast", lon: 229.0, lat: 52.0, date: "1778", lx: -12, ly: -6, anchor: "end", via: [[234, 48]] },
        { id: "alaska", name: "Alaska", lon: 208.0, lat: 59.5, date: "1778", lx: 12, ly: 22, anchor: "start", via: [[225, 56], [215, 57.5]] },
        { id: "strait", name: "Bering Strait", lon: 191.1, lat: 65.8, date: "Summer 1778", lx: -14, ly: -8, anchor: "end", via: [[208, 55.3], [201, 54.0], [195.6, 54.2], [193.8, 57.5], [192.6, 61.0], [192.0, 64.0]] },
        { id: "ice", name: "Arctic ice", lon: 193.0, lat: 68.8, date: "Summer 1778", lx: 14, ly: -6, anchor: "start" }
      ],
      beats: [
        { type: "scene", stop: 0, id: "k0", emoji: "🔎", title: "The search",
          text: "It is 1778. You are James Cook, an English explorer. England still hopes to find the Northwest Passage, a shortcut between the Atlantic and the Pacific. You will search from the Pacific side, starting at the coast of present-day Oregon.",
          q: "How will you search?", real: 0,
          history: "In real life, Cook explored the Pacific coast from present-day Oregon to Alaska, looking for the passage.",
          choices: [
            { label: "Follow the coast north, looking into every opening.", effects: { supplies: -4, vessel: -3 }, result: "You hug the coast, watching for any sign of a passage." },
            { label: "Sail straight north to the Arctic and skip the coast.", effects: { morale: -3, vessel: -3 }, set: { skipCoast: true }, result: "What might have happened: You save time, but you might miss an opening on the coast." }
          ] },
        { type: "travel", to: 1, days: 40, leg: { supplies: -8, vessel: -3 }, text: "You sail north along the coast." },
        { type: "scene", stop: 1, id: "k1", emoji: "🌫️", title: "Fog and storms",
          text: "Fog, storms, and rocky shores make this unknown coast dangerous.",
          q: "What will you do?",
          choices: [
            { label: "Anchor and wait for the fog to lift.", effects: { supplies: -6, morale: -2 }, result: "The fog lifts after a few days. The crew is safe, but supplies are lower." },
            { label: "Send small boats ahead to look for rocks.", effects: { supplies: -3, health: -3 }, result: "The boats find a safe way. It is tiring work." },
            { label: "Sail on slowly.", outcomes: [
              { p: 0.5, effects: {}, text: "You are lucky. No rocks this time." },
              { p: 0.5, effects: { vessel: -18, health: -4 }, text: "Scrape! The ship hits rocks and is damaged." } ] }
          ] },
        { type: "camp", stop: 1, id: "kc", emoji: "⚓", title: "A sheltered cove",
          text: "You find a sheltered cove to rest in. Choose 2 things to do before you go on.", picks: 2,
          actions: [
            { label: "Search for fresh water", effects: { supplies: 14, health: -2 } },
            { label: "Rest the crew", effects: { health: 12, morale: 6, supplies: -4 } },
            { label: "Repair the ship", effects: { vessel: 16, supplies: -3 } },
            { label: "Fish along the shore", effects: { supplies: 8, morale: 2 } }
          ] },
        { type: "hazard", pool: "arctic", chance: 0.8 },
        { type: "travel", to: 2, days: 50, leg: { supplies: -9, vessel: -4, morale: -2 }, text: "You sail on north, along the coast of Alaska." },
        { type: "scene", stop: 2, id: "k2", emoji: "🔭", title: "A wide inlet",
          text: "A wide inlet leads inland. It might be the way through North America!",
          q: "What will you do?",
          choices: [
            { label: "Explore the inlet with small boats.", effects: { supplies: -8, health: -3, morale: -2 }, result: "It takes days. In the end, the inlet ends at rivers and mountains. It is not a passage." },
            { label: "Skip it and keep going north.", effects: { supplies: -2, morale: -1 }, result: "You leave the inlet behind. You will never know for sure what was inside." }
          ] },
        { type: "travel", to: 3, days: 40, leg: { supplies: -7, vessel: -4, morale: -2 }, text: "You follow the coast north and west, toward the narrow waters between two continents." },
        { type: "scene", stop: 3, id: "k3", emoji: "🌊", title: "The Bering Strait",
          text: "You reach the narrow strip of water between Asia and North America, the Bering Strait. The sea ahead is cold, and the summer is short.",
          more: "Vitus Bering found this waterway in 1728. It is named for him.",
          q: "What will you do?", real: 0,
          history: "In real life, Cook sailed through the Bering Strait until ice blocked his ship.",
          choices: [
            { label: "Sail on through the strait into the Arctic.", effects: { supplies: -6, vessel: -4, morale: 2 }, result: "You sail through the strait and into colder water." },
            { label: "Turn back. The ice season is near.", effects: {}, endEarly: "turnback", result: "What might have happened: You return to the coast, safe, but you never see what is beyond." }
          ] },
        { type: "travel", to: 4, days: 15, leg: { supplies: -5, vessel: -3 }, text: "The air grows colder. Chunks of ice float by." },
        { type: "scene", stop: 4, id: "k4", emoji: "🧊", title: "A wall of ice",
          text: "Ice stretches across the sea ahead and blocks your ship. You can't sail through.",
          q: "What will you do?", real: 0,
          history: "In real life, ice blocked Cook's ship. Cook died before he could return to search again.",
          choices: [
            { label: "Turn back. You will try again another summer.", effects: { morale: -4, supplies: -4 }, result: "You turn back. You hope to return and search again." },
            { label: "Try to force a way through the ice.", outcomes: [
              { p: 0.65, effects: { vessel: -30, health: -6 }, text: "What might have happened: The ice is too thick. The ship is badly damaged." },
              { p: 0.35, effects: { vessel: -14, supplies: -6 }, text: "What might have happened: You work for days, but you have to turn back." } ] }
          ] },
        { type: "end", stop: 4, text: "You turn back from the ice. Cook died before he could return to search again." }
      ],
      ending: {
        real: [
          "In 1778, the English explorer James Cook searched for the Northwest Passage. He explored the Pacific coast from present-day Oregon to Alaska and sailed through the Bering Strait until ice blocked his ship.",
          "Unfortunately, Cook died before he could return to search again.",
          "Many explorers hoped for a shortcut through North America, but storms, fog, and ice made it very hard to search."
        ],
        goal: function (S) { return { stars: 1 + (S.stop >= 3 ? 1 : 0) + (S.stop >= 4 ? 1 : 0), text: S.stop >= 4 ? "You sailed through the Bering Strait and reached the ice." : S.stop >= 3 ? "You reached the Bering Strait." : "You searched the coast." }; }
      },
      questions: [
        "What was Cook searching for? Why did England want it?",
        "Why did the Arctic ice stop Cook's ship?",
        "How are the searches of Cook, Bering, and Drake for the Northwest Passage alike?"
      ]
    }

  },

  order: ["cabrillo", "drake", "vizcaino", "bering", "portola", "anza", "cook"],   // order on the title screen (by date)
  legScale: 1.4,                                  // makes every travel leg cost 40% more (tuned by simulation)
  ranks: { crew: [65, 40], trust: [55, 35] },   // 3 stars at the first number, 2 stars at the second

  teacher: {
    standards: "California HSS 4.2.3 (Spanish and English exploration of California; relationships among soldiers, missionaries, and Indians), 4.1 (geography of California), and the Historical and Social Sciences Analysis Skills (chronological and spatial thinking, point of view).",
    notes: [
      "Each voyage follows the chapter closely. Choices marked as what the real explorer did come from the chapter. Other choices are labeled \"What might have happened,\" because no one can know.",
      "When a student changes history, a popup card says what the real explorer actually did. This is the heart of the lesson: goals versus what happened.",
      "People on shore (the Kumeyaay, the Chumash, and the Miwok) are shown as people with their own choices. A \"Trust\" meter reflects how respectfully students treat them, and no option rewards taking by force.",
      "Cabrillo's death is told simply, as in the chapter. Students then lead the crew.",
      "Drake's attacks on Spanish ships are described from the chapter. A \"Read more\" note says that to the Spanish this was stealing.",
      "The map routes are approximate. Portolá's starting point in Baja California is shown generally, because the chapter does not name a town.",
      "Please check the numbers: supplies, health, and other values are game values and not historical measurements."
    ]
  }
};
