# The Mystery of the Brass Plate

A history-detective game for the 4th grade chapter "Exploration and Settlement" (the Read & Do about Drake's brass plate).
Runs in any browser (including Chromebooks). No accounts, no tracking.

## Put it online with GitHub Pages
1. Create a new GitHub repository and upload every file in this folder (keep them together).
2. Open Settings, then Pages. Choose "Deploy from a branch," pick `main` and `/ (root)`, and save.
3. After a minute the game is at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

To try it first, double-click `index.html`.

## Files
- `index.html`: page and styling
- `data.js`: **all the wording** (story, clues, questions, case files). Edit this file to change text.
- `game.js`: the screens
- `TEACHER_NOTES.md`: how it connects to the chapter, scoring, and discussion questions

## How long does it take?
About 15 to 25 minutes, but it has not been timed with students.

## Editing
Everything students read is in `data.js`. Each clue has a short text plus an optional "Read more" paragraph, a question, the best answer, and an explanation for each choice.
Point values and rank cut-offs are at the top of `data.js` (`ranks`).
