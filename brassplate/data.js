/* ==========================================================================
   THE MYSTERY OF THE BRASS PLATE: content file.
   All facts come from the TCI chapter "Exploration and Settlement" (Read & Do).
   Standards: California HSS 4.2.3 (Spanish/English exploration) and Historical and Social Sciences Analysis Skills
   (research, evidence, and point of view).
   ========================================================================== */
window.PLATE = {
  title: "The Mystery of the Brass Plate",
  subtitle: "A history detective game",
  intro: [
    "In 1579, the English explorer Francis Drake left a brass plate on the California coast. Then it was lost.",
    "In 1936, a shop clerk found a metal plate on the ground. A history professor was sure it was Drake's plate. Newspapers called it one of the most exciting finds in California history.",
    "But was it real? You are the history detective. Gather clues, make your calls, and find out. Be careful: new evidence can change the answer."
  ],
  glossary: [
    { word: "artifact", meaning: "an object made or used by people in the past. Historians use artifacts to learn about the past." },
    { word: "evidence", meaning: "facts and objects that help you decide whether something is true" },
    { word: "primary source", meaning: "a record made by someone who was there at the time" },
    { word: "historian", meaning: "a person who studies the past" },
    { word: "artifake", meaning: "a fake artifact. Someone made it to look old, so people think it is real." },
    { word: "replica", meaning: "a copy of something" }
  ],

  /* Points: clue answers and decisions are worth up to 2, the verdict 3, the reflection up to 4, each case file 3. */
  ranks: [ { min: 27, name: "Chief Historian", emoji: "🏆" }, { min: 17, name: "History Detective", emoji: "🔍" }, { min: 0, name: "Junior Detective", emoji: "🧐" } ],

  stages: ["1579", "1936", "The Match", "1937", "1977", "The Truth", "Think", "Case Files"],

  steps: [
    { id: "s1", stage: 0, type: "story", emoji: "⛵", title: "Drake in California, 1579",
      text: [
        "Francis Drake was an English sea captain. His ship, the Golden Hind, was heavy with silver and gold taken from Spanish ships.",
        "When Drake reached northern California, his ship was leaking badly. He landed near what is now San Francisco to make repairs. Miwok Indians came out to welcome Drake and his crew.",
        "Drake stayed for over a month."
      ],
      more: "Queen Elizabeth I of England wanted the riches of the Americas, but England was not strong enough to fight Spain. She secretly helped pay for Drake's voyage." },

    { id: "s2", stage: 0, type: "story", emoji: "📜", title: "Drake orders a brass plate",
      text: [
        "Before he left, Drake ordered a plate made of brass. One of his crew wrote a description of it. That description is a primary source, because it was written by someone who was there.",
        "The crew member said:"
      ],
      bullets: [
        "The plate had the date engraved on it.",
        "Words on it claimed the land for Queen Elizabeth.",
        "A coin with the queen's picture could be seen through a hole in the plate.",
        "It was nailed to a \"great post,\" as \"a monument of our being there.\""
      ],
      after: "The plate was left behind. Then it was lost. No one knew where it was.",
      more: "A primary source is very useful, but it only helps if we can compare it with the real object." },

    { id: "c1", stage: 1, type: "clue", emoji: "🔎", year: "1936", title: "A strange metal plate",
      source: "A story about the find",
      text: "One summer day in 1936, a shop clerk named Beryle Shinn saw a small metal plate on the ground, north of San Francisco. It was black with dirt. He tossed it in his car and forgot about it. Months later he cleaned it. He saw the date \"1579\" and the name \"Drake.\"",
      more: "Shinn thought a history professor might be interested, so he took the plate to Herbert Bolton at the University of California.",
      q: "What does this clue tell us?",
      options: ["It's real! It has Drake's name and the date.", "It's a fake.", "Not sure yet. We need to check it."],
      best: 2, ok: [],
      explain: ["Not so fast. Anyone can write a name and a date on metal. A date and a name are not proof.", "There's no reason yet to call it fake. We simply don't know.", "Good thinking! A found object needs to be checked before we believe it."] },

    { id: "m1", stage: 2, type: "compare", emoji: "🧪", year: "1936", title: "Bolton compares the plate",
      text: "Professor Bolton believed the plate came from Drake's visit. He compared it with the crew's 1579 description. Check each part of the description against the plate.",
      items: [
        { label: "A plate made of brass", result: "The plate is made of brass.", ok: true, hot: "plate" },
        { label: "The date is engraved on it", result: "The plate says June 17, 1579.", ok: true, hot: "date" },
        { label: "Words claim the land for Queen Elizabeth", result: "The plate names Queen Elizabeth and claims the land.", ok: true, hot: "claim" },
        { label: "A hole where a coin could be seen", result: "The plate has a hole.", ok: true, hot: "hole" },
        { label: "Nailed to a \"great post\"", result: "No post was found with it, so this can't be checked.", ok: null, hot: "notches" }
      ],
      done: "Bolton decided that everything about the plate matched the descriptions from 1579. He was thrilled. He was sure it was the real thing.",
      q: "What does the match tell us?",
      options: ["It proves the plate is real.", "It supports \"real,\" but it doesn't prove it. Someone could copy the description.", "It means the plate is fake."],
      best: 1, ok: [],
      explain: ["A match is a good sign, but it is not proof. Someone could make a plate to match the description.", "Excellent! A match makes \"real\" more likely, but a careful faker could copy the description.", "The plate does match, so this doesn't make sense as a reason to call it fake."] },

    { id: "d1", stage: 2, type: "decide", emoji: "🗞️", year: "1937", title: "Decision time",
      text: "It's 1937. Bolton is excited. Reporters want to know: is this Drake's plate? What should Bolton do?",
      options: ["Tell the world right now. Everything matches!", "Test the metal first, and ask other experts to look at it.", "Hide the plate so no one can see it."],
      best: 1, ok: [],
      explain: ["That is what Bolton did. In 1937 he announced that Drake's brass plate had been found. Newspapers called it one of the most exciting finds in California history. But some historians were worried that the plate might be a fake.", "Smart! Testing and asking other experts is how historians check evidence. Bolton did not wait, though. He announced the discovery in 1937.", "Hiding the plate would not help anyone find out the truth."] },

    { id: "c2", stage: 3, type: "clue", emoji: "🤔", year: "1937", title: "Some historians worry",
      source: "Newspaper reports and historians",
      text: "After Bolton's announcement, some historians were worried that the plate might be a fake. The plate became famous anyway. Pictures of it were put in history books. A replica was given to England's Queen Elizabeth II.",
      more: "At that time, nobody had tested the metal. The worried historians did not have proof.",
      q: "What does this clue tell us?",
      options: ["It proves the plate is a fake.", "It's a warning sign. We should look for more evidence.", "It doesn't matter. Everyone loves the plate."],
      best: 1, ok: [],
      explain: ["Worry is not proof. They needed evidence.", "Yes! A doubt is a reason to keep investigating, but it doesn't settle the question.", "Fame is not evidence. A famous object can still be fake."] },

    { id: "d2", stage: 3, type: "decide", emoji: "❓", year: "1937 to 1977", title: "How can we find out?",
      text: "For many years the plate fooled many people. How could we find out whether the metal is really from the 1500s?",
      options: ["Ask Bolton if he is sure.", "Use science to test the brass.", "Read more newspaper stories about the plate."],
      best: 1, ok: [],
      explain: ["Bolton believed it was real, but being sure is not the same as having proof.", "Yes! Science can test what an object is made of and when it could have been made. That is just what researchers did.", "Newspapers only repeated what people already believed."] },

    { id: "c3", stage: 4, type: "clue", emoji: "🔬", year: "1977", title: "New tests",
      source: "A scientific report",
      text: "In 1977, researchers performed new tests on the plate. The tests showed that the brass could not have been made in the 1500s.",
      more: "That means the plate could not have been made in Drake's time.",
      q: "What does this clue tell us?",
      options: ["The plate is real.", "Strong evidence the plate is a fake.", "Not sure yet."],
      best: 1, ok: [2],
      explain: ["It does not support real. The brass could not have been made in the 1500s.", "Correct! If the metal could not have existed in 1579, the plate could not be from 1579.", "This is strong evidence, so you can be more sure. But it's good to ask for more proof."] },

    { id: "v1", stage: 4, type: "verdict", emoji: "⚖️", title: "Your verdict",
      text: "You have all the clues. Is this Francis Drake's plate?",
      options: ["Yes. It's the real plate.", "No. It's a fake.", "I can't tell."],
      best: 1, ok: [],
      explain: ["The brass could not have been made in the 1500s, so it can't be Drake's plate.", "Correct! The tests show the plate could not have been made in 1579.", "The evidence is strong enough to decide: it's a fake."],
      reasonQ: "What is the best reason for your verdict?",
      reasons: ["Tests showed the brass could not have been made in the 1500s.", "The plate was dirty.", "Bolton was sure about it."],
      reasonBest: 0 },

    { id: "t1", stage: 5, type: "truth", emoji: "🎭", title: "So where did it come from?",
      text: [
        "Today historians know the answer. It started as a practical joke.",
        "Bolton's friends knew how badly he wanted to find Drake's brass plate. So they made an \"artifake,\" a fake artifact. They cut a piece of brass, etched words onto it, and heated it to make it look old. Then they hid it near Drakes Bay.",
        "They planned to tell Bolton about the joke and have a good laugh. But when Bolton told the world the plate was real, his friends were dismayed. The joke had gone too far.",
        "For 40 years the fake plate fooled many people. Herbert Bolton died in 1953 without ever knowing the truth."
      ],
      more: "Some day, somewhere on the coast near San Francisco, Drake's real plate of brass may still be found." },

    { id: "r1", stage: 6, type: "reflect", emoji: "💭", title: "What challenges do people face when exploring the past?",
      text: "This is the big question. Choose all the statements that are true.",
      options: [
        { t: "People can want something to be true so much that they overlook doubts.", ok: true },
        { t: "Evidence can be fake, so historians must check it.", ok: true },
        { t: "New tests and tools can change what we know.", ok: true },
        { t: "Sometimes the real evidence is missing. The real plate may still be lost.", ok: true },
        { t: "If an object looks old and has a date on it, it must be real.", ok: false },
        { t: "Newspapers never make mistakes.", ok: false }
      ],
      thinkQ: "Think about it: the plate says the king and people of this land freely gave up their right to it. The Miwok people lived here, and they welcomed Drake. What do you think the Miwok people would say about that claim?" },

    { id: "k1", stage: 7, type: "cases", emoji: "🗂️", title: "Case Files",
      text: "Now it's your turn to investigate! Here are four new cases. Decide whether each object is real, and find the clue that tells you." }
  ],

  cases: [
    { id: "diary", emoji: "📓", title: "The Gold Seeker's Diary",
      story: "A family says it has a diary written by a gold seeker in the year 1849.",
      clues: [ "The pages are covered in neat ballpoint pen writing.", "The paper is yellow.", "The diary tells about a long trip by wagon." ],
      verdictOptions: ["Real", "Fake", "Probably real, but it should be tested"], verdictBest: 1,
      clueQ: "Which clue gives it away?", clueBest: 0,
      explain: "Ballpoint pens were not common until the 1900s, long after 1849. A diary from 1849 would be written in ink with a different kind of pen." },
    { id: "helmet", emoji: "⛑️", title: "The Explorer's Helmet",
      story: "A museum is offered a metal helmet. The seller says it belonged to one of Cabrillo's sailors in 1542.",
      clues: [ "It is made of metal and has dents.", "It is held together with Phillips-head screws.", "It has the shape of a helmet from the 1500s." ],
      verdictOptions: ["Real", "Fake", "Probably real, but it should be tested"], verdictBest: 1,
      clueQ: "Which clue gives it away?", clueBest: 1,
      explain: "Phillips-head screws were not invented until the 1930s. A helmet from 1542 could not have them." },
    { id: "map", emoji: "🗺️", title: "The Old Map",
      story: "A dealer says this map of the California coast was drawn by Cabrillo's crew in 1542.",
      clues: [ "It is drawn on old-looking paper.", "It shows the coastline of California.", "A label says \"State of California.\"" ],
      verdictOptions: ["Real", "Fake", "Probably real, but it should be tested"], verdictBest: 1,
      clueQ: "Which clue gives it away?", clueBest: 2,
      explain: "California did not become a state until 1850. A map from 1542 could not say \"State of California.\"" },
    { id: "bell", emoji: "🔔", title: "The Mission Bell",
      story: "An old mission has a large bell. Words on it say it was made in Spain's time, in the 1790s.",
      clues: [ "The bronze is rough, with small bumps, as if it was cast by hand.", "The words are in Spanish, and the date is from the 1790s.", "It hangs in a bell tower like the ones at other missions." ],
      verdictOptions: ["Real", "Fake", "Probably real, but it should be tested"], verdictBest: 2,
      clueQ: "Which clue is the best sign it could be real?", clueBest: 1,
      explain: "Nothing here is out of place. The language and date match the time and place. It looks real, but historians would still test the metal to be sure, just as with the brass plate." }
  ],

  teacher: {
    standards: "California HSS 4.2.3 (Spanish and English exploration of California) and the Historical and Social Sciences Analysis Skills for grades 4 and 5: research, evidence, and point of view. It also supports reading informational text and explaining events using specific information.",
    notes: [
      "This game accompanies the chapter's Read & Do, \"The Mystery of the Brass Plate.\" All facts come from that reading.",
      "Students work through the story the way historians did. They decide what to do in 1937, then see how new evidence in 1977 changes the answer. The lesson is about the process of evidence, not blaming Bolton.",
      "Bolton is treated fairly. He was fooled by a joke that went too far, and the game says so.",
      "The final question about the Miwok points to the chapter's theme of perspective. It is a discussion prompt and is not scored.",
      "Case Files give students new evidence-based problems. Three of the objects are fake because of details that don't belong in their time. One is probably real.",
      "Dates for the Case Files (ballpoint pens in the 1900s, Phillips screws in the 1930s, California statehood in 1850) are outside the chapter. Please confirm they fit your class."
    ]
  }
};
