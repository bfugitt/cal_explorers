/* Sail North: game rules (no screen code, so it can be tested on its own). */
(function (root) {
  "use strict";
  var M = root.SAIL_MAP, D = root.SAIL_DATA, Sail = {};
  var DIRS = [
    { id: "N",  dx: 0,  dy: -1, label: "North",     arrow: "↑" }, { id: "NE", dx: 1,  dy: -1, label: "Northeast", arrow: "↗" },
    { id: "E",  dx: 1,  dy: 0,  label: "East",      arrow: "→" }, { id: "SE", dx: 1,  dy: 1,  label: "Southeast", arrow: "↘" },
    { id: "S",  dx: 0,  dy: 1,  label: "South",     arrow: "↓" }, { id: "SW", dx: -1, dy: 1,  label: "Southwest", arrow: "↙" },
    { id: "W",  dx: -1, dy: 0,  label: "West",      arrow: "←" }, { id: "NW", dx: -1, dy: -1, label: "Northwest", arrow: "↖" }
  ];
  Sail.DIRS = DIRS; Sail.map = M;
  var WIND_FROM = 7;                                   // the wind blows from the northwest
  function rel(i) { var d = Math.abs(i - WIND_FROM); return Math.min(d, 8 - d); }
  Sail.speed = function (i) { return D.physics.speeds[rel(i)]; };

  Sail.isLand = function (x, y) { if (x < 0 || y < 0 || x >= M.cols || y >= M.rows) return true; return M.grid[y].charAt(x) === "1"; };
  function realLand(x, y) { return x >= 0 && y >= 0 && x < M.cols && y < M.rows && M.grid[y].charAt(x) === "1"; }
  Sail.harborAt = function (x, y) {
    for (var id in M.harbors) { var h = M.harbors[id]; if (Math.abs(h[0] - x) <= 1 && Math.abs(h[1] - y) <= 1 && !Sail.isLand(x, y)) return id; }
    return null;
  };
  function nearHarbor(x, y, r) { for (var id in M.harbors) { var h = M.harbors[id]; if (Math.abs(h[0] - x) <= r && Math.abs(h[1] - y) <= r) return true; } return false; }
  function nearLand(x, y) { for (var dx = -1; dx <= 1; dx++) for (var dy = -1; dy <= 1; dy++) if ((dx || dy) && realLand(x + dx, y + dy)) return true; return false; }
  function hash(x, y) { var h = (Math.imul(x + 17, 73856093) ^ Math.imul(y + 31, 19349663)) >>> 0; h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0; return (h ^ (h >>> 16)) >>> 0; }
  Sail.isReef = function (mode, x, y) {
    if (Sail.isLand(x, y) || !nearLand(x, y) || nearHarbor(x, y, 2)) return false;
    return (hash(x, y) % 100) < D.modes[mode].reefPct;
  };
  Sail.isFog = function (mode, x, y) {
    if (!D.modes[mode].fog || Sail.isLand(x, y) || nearHarbor(x, y, 3)) return false;
    var inBand = false; D.fogBands.forEach(function (b) { if (y >= b[0] && y <= b[1]) inBand = true; });
    if (!inBand) return false;
    for (var k = 0; k <= 3; k++) if (realLand(x + k, y)) return true;
    return false;
  };
  function key(x, y) { return x + "," + y; }

  Sail.newGame = function (mode) {
    var m = D.modes[mode], h = M.harbors.sandiego;
    var S = { mode: mode, x: h[0], y: h[1], supplies: m.supplies, hull: D.hullMax, turns: 0, hints: m.hints, known: {}, visited: { sandiego: true },
              lastHarbor: "sandiego", hits: 0, heading: 0, log: [], over: null, soundings: 0, restocks: 0, hintsUsed: 0, lastHint: null };
    Sail.lookout(S); return S;
  };

  /* What would happen if you sailed heading i?  Reefs count only if you know about them (for previews). */
  Sail.plan = function (S, i, knownOnly) {
    var d = DIRS[i], sp = Sail.speed(i), x = S.x, y = S.y, path = [], hit = false, hitCells = [], blocked = false;
    function reefHere(cx, cy) { return knownOnly ? !!S.known[key(cx, cy)] : Sail.isReef(S.mode, cx, cy); }
    for (var k = 0; k < sp; k++) {
      var nx = x + d.dx, ny = y + d.dy;
      if (Sail.isLand(nx, ny)) { blocked = true; break; }
      x = nx; y = ny; path.push([x, y]);
      if (reefHere(x, y)) { hit = true; hitCells.push([x, y]); }
    }
    var drift = false;
    if (sp > 0 && !Sail.isLand(x, y + D.physics.current)) { y += D.physics.current; drift = true; if (reefHere(x, y)) { hit = true; hitCells.push([x, y]); } }
    else if (sp === 0) { y = S.y; }
    return { path: path, end: [x, y], hit: hit, hitCells: hitCells, blocked: blocked, speed: sp, drift: drift };
  };

  Sail.lookout = function (S) {
    var inFog = Sail.isFog(S.mode, S.x, S.y), r = inFog ? 1 : D.lookoutRadius;
    for (var dx = -r; dx <= r; dx++) for (var dy = -r; dy <= r; dy++) {
      var cx = S.x + dx, cy = S.y + dy;
      if (Sail.isReef(S.mode, cx, cy) && !Sail.isFog(S.mode, cx, cy)) S.known[key(cx, cy)] = true;
      else if (Sail.isReef(S.mode, cx, cy) && inFog && Math.abs(dx) <= 1 && Math.abs(dy) <= 1) S.known[key(cx, cy)] = true;
    }
  };

  function arrive(S, report) {
    var h = Sail.harborAt(S.x, S.y);
    if (!h) return;
    var wasVisited = !!S.visited[h];
    S.visited[h] = true; S.lastHarbor = h;
    if (!wasVisited) {
      S.supplies = Math.min(D.supplyCap, S.supplies + D.restock); S.restocks++;
      report.harbor = h; report.restocked = true;
    }
    if (S.hull < D.hullMax) { S.hull = D.hullMax; report.repaired = true; }
    if (h === "oregon") S.over = "won";
  }
  function afterTurn(S, report) {
    Sail.lookout(S);
    if (S.hull <= 0) {
      var hb = M.harbors[S.lastHarbor]; S.x = hb[0]; S.y = hb[1]; S.hull = 2; S.supplies -= 3; S.turns += 3;
      report.wrecked = true; report.lines.push("Your ship is badly damaged. The crew limps back to " + D.harbors[S.lastHarbor].name + " for repairs. That costs 3 turns of supplies.");
    }
    arrive(S, report);
    if (!S.over && S.supplies <= 0) { S.supplies = 0; S.over = "supplies"; }
  }

  Sail.move = function (S, i) {
    var report = { lines: [], ok: true };
    if (S.over) return { ok: false, lines: [] };
    var sp = Sail.speed(i);
    if (!sp) { return { ok: false, lines: ["You can't sail straight into the wind. Try another direction."] }; }
    var d0 = Sail.pilotDist(S);
    var p = Sail.plan(S, i, false);
    S.x = p.end[0]; S.y = p.end[1]; S.turns++; S.supplies--; S.heading = i;
    var moved = p.path.length;
    var txt = "Sailed " + DIRS[i].label.toLowerCase() + " " + moved + (moved === 1 ? " square." : " squares.");
    if (p.blocked) txt += " The coast stopped you.";
    if (p.drift) txt += " The current pushed you 1 square south.";
    report.lines.push(txt);
    if (p.hit) {
      S.hull--; S.hits++; report.hit = true; p.hitCells.forEach(function (c) { S.known[key(c[0], c[1])] = true; });
      report.lines.push("Scrape! You hit hidden rocks. Hull damage!");
    }
    afterTurn(S, report);
    var d1 = S.over ? null : Sail.pilotDist(S);
    S.stuck = (d0 !== null && d1 !== null && d1 >= d0) ? (S.stuck || 0) + 1 : 0;
    if (S.stuck >= 3 && !S.over) { report.coach = true; S.stuck = 0; }
    S.log.unshift("Turn " + S.turns + ": " + report.lines.join(" ")); if (S.log.length > 6) S.log.pop();
    return report;
  };

  Sail.sounding = function (S) {
    var report = { lines: [], ok: true }; if (S.over) return { ok: false, lines: [] };
    var r = D.soundingRadius, found = 0;
    for (var dx = -r; dx <= r; dx++) for (var dy = -r; dy <= r; dy++) {
      var cx = S.x + dx, cy = S.y + dy;
      if (Sail.isReef(S.mode, cx, cy) && !S.known[key(cx, cy)]) { S.known[key(cx, cy)] = true; found++; }
    }
    S.turns++; S.supplies--; S.soundings++;
    var drifted = false;
    if (!Sail.isLand(S.x, S.y + D.physics.current)) { S.y += D.physics.current; drifted = true; }
    report.lines.push("You took soundings." + (found ? " You found " + found + " hidden " + (found === 1 ? "rock" : "rocks") + " and marked them on the map." : " No hidden rocks nearby.") + (drifted ? " The current pushed you 1 square south." : ""));
    afterTurn(S, report);
    S.log.unshift("Turn " + S.turns + ": " + report.lines.join(" ")); if (S.log.length > 6) S.log.pop();
    return report;
  };

  /* The pilot: shortest safe path (by turns) to the next harbor. */
  Sail.nextGoal = function (S) { for (var i = 0; i < D.harborOrder.length; i++) if (!S.visited[D.harborOrder[i]]) return D.harborOrder[i]; return null; };
  Sail.hint = function (S) {
    var goal = Sail.nextGoal(S); if (!goal) return null;
    var start = S.x + "," + S.y, dist = {}, first = {}; dist[start] = 0; var q = [[S.x, S.y]];
    for (var qi = 0; qi < q.length; qi++) {
      var c = q[qi], ck = c[0] + "," + c[1];
      if (Sail.harborAt(c[0], c[1]) === goal) return { heading: first[ck], turns: dist[ck], goal: goal };
      for (var i = 0; i < 8; i++) {
        if (!Sail.speed(i)) continue;
        var tmp = { mode: S.mode, x: c[0], y: c[1], known: S.known }, p = Sail.plan(tmp, i, true);
        if (p.hit) continue;
        var nk = p.end[0] + "," + p.end[1];
        if (dist[nk] === undefined) { dist[nk] = dist[ck] + 1; first[nk] = (ck === start) ? i : first[ck]; q.push([p.end[0], p.end[1]]); }
      }
    }
    return null;
  };

  Sail.pilotDist = function (S) { var h = Sail.hint(S); return h ? h.turns : null; };

  Sail.score = function (S) {
    var T = D.stars, nav = S.over === "won" ? (S.turns <= T.turns[1] ? 3 : S.turns <= T.turns[0] ? 2 : 1) : 1;
    var care = S.hits <= T.hits[1] ? 3 : S.hits <= 2 ? 2 : 1;
    var visited = Object.keys(S.visited).length - 1;       // harbors reached beyond the start
    var journey = visited >= 3 ? 3 : visited >= 2 ? 2 : 1;
    return { navigator: nav, care: care, journey: journey, visited: visited };
  };

  root.SailCore = Sail;
})(typeof window !== "undefined" ? window : global);
