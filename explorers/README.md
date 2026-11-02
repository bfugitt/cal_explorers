# Explorer's Choice

A choose-your-own-adventure voyage game for the 4th grade chapter "Exploration and Settlement."
Students pick an explorer (Cabrillo, Drake, Vizcaíno, Bering, Portolá, Anza, or Cook), manage supplies, crew, morale, and trust of local people,
make choices at each stop, and reach for their goal. Runs in any browser (including Chromebooks). No accounts, no tracking.

## Put it online with GitHub Pages
1. Create a new GitHub repository and upload every file in this folder (keep them together).
2. Open Settings, then Pages. Choose "Deploy from a branch," pick `main` and `/ (root)`, and save.
3. After a minute the game is at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

To try it first, double-click `index.html`.

## Files
- `index.html`: page and styling
- `data.js`: **all the content** (stories, choices, hazards, endings). Edit this file to change wording or facts.
- `core.js`: the voyage rules
- `game.js`: the screens
- `maps.js`: the maps (Natural Earth, public domain)
- `TEACHER_NOTES.md`: how each voyage follows the chapter, plus things to check

## Adding explorers later
Each explorer is one block in `data.js` (`explorers`): goal, hardships, map stops, and a list of "beats" (scenes, travel, camps, and hazards).
The maps for the California coast, the Atlantic and South America, and the northern Pacific are in `maps.js`.

## How long does a voyage take?
About 10 to 15 minutes each. I have not timed it with students.

## Difficulty
In `data.js`: each explorer's `start` values, `legScale` (how costly each leg of travel is), and the effects on each choice.
