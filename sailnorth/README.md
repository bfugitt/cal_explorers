# Sail North

A puzzle game for the 4th grade chapter "Exploration and Settlement." Students captain a Spanish ship
up the California coast against the wind and current, find harbors, and reach Oregon.
Runs in any browser (including Chromebooks). No accounts, no tracking.

## Put it online with GitHub Pages
1. Create a new GitHub repository and upload every file in this folder (keep them together).
2. Open Settings, then Pages. Choose "Deploy from a branch," pick `main` and `/ (root)`, and save.
3. After a minute the game is at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

To try it first, double-click `index.html`.

## Files
- `index.html`: page and styling
- `data.js`: **all the wording** (intro, harbor cards, glossary, difficulty settings). Edit this file to change text or difficulty.
- `core.js`: the sailing rules
- `game.js`: the screens
- `mapdata.js`: the California coast (Natural Earth, public domain)
- `TEACHER_NOTES.md`: how it connects to the chapter, plus a fact check

## Difficulty
In `data.js`, the `modes` section sets supplies, hints, rocks, and fog for Easy and Standard.
`physics` sets sailing speeds and the current. `stars` sets the star cut-offs.

## How long does a game take?
A perfect voyage takes 32 turns. Students will probably need 40 to 60. I estimate 10 to 20 minutes, but it has not been timed with students.
