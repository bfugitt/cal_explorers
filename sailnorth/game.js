/* Sail North: screens. Rules are in core.js, content is in data.js.
   No accounts and no tracking. */
(function () {
  "use strict";
  var D = window.SAIL_DATA, M = window.SAIL_MAP, Sail = window.SailCore;
  var app = document.getElementById("app");
  var S = null, phase = "title", overlay = null, mode = "standard", lastEnd = null;
  var PX = M.px;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function stars(n) { return "★".repeat(n) + "☆".repeat(3 - n); }
  function cx(x) { return (x + 0.5) * PX; } function cy(y) { return (y + 0.5) * PX; }
  var NATIVE = [["Kumeyaay", 22.3, 20.6], ["Chumash", 17.6, 17.2], ["Miwok", 11.9, 10.3]];

  /* ---------- the map ---------- */
  function mapSVG() {
    var W = M.cols * PX, H = M.rows * PX, h = '<svg id="sea" class="map" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Map of the California coast with your ship, harbors, and hidden rocks">';
    h += '<rect class="ocean" width="' + W + '" height="' + H + '"/>';
    for (var gx = 1; gx < M.cols; gx++) h += '<line class="gl" x1="' + gx * PX + '" y1="0" x2="' + gx * PX + '" y2="' + H + '"/>';
    for (var gy = 1; gy < M.rows; gy++) h += '<line class="gl" x1="0" y1="' + gy * PX + '" x2="' + W + '" y2="' + gy * PX + '"/>';
    h += '<path class="land" d="' + M.land + '"/>';
    /* fog */
    if (S && D.modes[S.mode].fog) {
      for (var y = 0; y < M.rows; y++) for (var x = 0; x < M.cols; x++) if (Sail.isFog(S.mode, x, y)) h += '<rect class="fog" x="' + x * PX + '" y="' + y * PX + '" width="' + PX + '" height="' + PX + '"/>';
      h += '<text class="lbl fogt" x="' + 7.4 * PX + '" y="' + 17 * PX + '">Fog bank</text><text class="lbl fogt" x="' + 3.2 * PX + '" y="' + 8 * PX + '">Fog bank</text>';
    }
    /* wind and current arrows */
    for (var ax = 2; ax < 22; ax += 5) for (var ay = 3; ay < 22; ay += 5) {
      if (Sail.isLand(ax, ay) || Sail.isLand(ax + 1, ay + 1)) continue;
      var px = cx(ax), py = cy(ay);
      h += '<path class="wind" d="M' + (px - 10) + "," + (py - 10) + "L" + (px + 10) + "," + (py + 10) + "M" + (px + 10) + "," + (py + 10) + "L" + (px + 10) + "," + (py + 1) + "M" + (px + 10) + "," + (py + 10) + "L" + (px + 1) + "," + (py + 10) + '"/>';
      h += '<path class="cur" d="M' + (px + 2 * PX - 2) + "," + (py - 12) + "L" + (px + 2 * PX - 2) + "," + (py + 12) + "M" + (px + 2 * PX - 2) + "," + (py + 12) + "L" + (px + 2 * PX - 7) + "," + (py + 4) + "M" + (px + 2 * PX - 2) + "," + (py + 12) + "L" + (px + 2 * PX + 3) + "," + (py + 4) + '"/>';
    }
    /* labels */
    h += '<text class="lbl big" x="' + 2.4 * PX + '" y="' + 12.5 * PX + '">PACIFIC OCEAN</text>';
    h += '<text class="lbl land-l" x="' + 22.2 * PX + '" y="' + 23.2 * PX + '">BAJA CALIFORNIA</text><text class="lbl land-l" x="' + 20.5 * PX + '" y="' + 14 * PX + '">ALTA CALIFORNIA</text><text class="lbl land-l" x="' + 15.5 * PX + '" y="' + 1.4 * PX + '">OREGON</text>';
    NATIVE.forEach(function (n) { h += '<text class="lbl nat" x="' + n[1] * PX + '" y="' + n[2] * PX + '">' + n[0] + "</text>"; });
    /* harbors */
    for (var id in M.harbors) {
      var hb = M.harbors[id], seen = S && S.visited[id];
      h += '<g class="harbor' + (seen ? " seen" : "") + '"><circle cx="' + cx(hb[0]) + '" cy="' + cy(hb[1]) + '" r="' + PX * 0.8 + '"/><text class="anchor" x="' + cx(hb[0]) + '" y="' + (cy(hb[1]) + 7) + '">⚓</text>' +
        '<text class="lbl hname" x="' + (cx(hb[0]) - PX) + '" y="' + (cy(hb[1]) + 4) + '" text-anchor="end">' + esc(D.harbors[id].short) + (seen ? " ✓" : "") + "</text></g>";
    }
    /* hidden rocks you know about */
    if (S) for (var k in S.known) { var p = k.split(","); var rx = cx(+p[0]), ry = cy(+p[1]); h += '<path class="rock" d="M' + (rx - 9) + "," + (ry + 8) + "L" + rx + "," + (ry - 9) + "L" + (rx + 9) + "," + (ry + 8) + 'Z"><title>Rocks</title></path>'; }
    /* preview of a chosen heading and the ship */
    h += '<g id="pv"></g>';
    if (S) h += '<g class="ship"><circle cx="' + cx(S.x) + '" cy="' + cy(S.y) + '" r="17"/><text x="' + cx(S.x) + '" y="' + (cy(S.y) + 9) + '">⛵</text></g>';
    return h + "</svg>";
  }

  /* ---------- screens ---------- */
  function viewTitle() {
    var h = '<div class="titlewrap"><h1>' + esc(D.title) + '</h1><p class="lead">' + esc(D.subtitle) + "</p>" + D.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    h += '<div class="row wrap"><button class="btn ghost" data-act="howto" type="button">❓ How to sail</button><button class="btn ghost" data-act="glossary" type="button">📚 Words to know</button><button class="btn ghost" data-act="teacher" type="button">Teacher notes</button></div>';
    h += "<h2>Choose your voyage</h2><div class=\"modes\">";
    Object.keys(D.modes).forEach(function (id) {
      h += '<button class="modecard" data-act="start" data-mode="' + id + '" type="button"><strong>' + esc(D.modes[id].label) + "</strong><span>" + esc(D.modes[id].desc) + "</span></button>";
    });
    return h + "</div></div>";
  }

  function statusBar() {
    var hearts = "";
    for (var i = 0; i < D.hullMax; i++) hearts += i < S.hull ? "🟦" : "⬜";
    var goal = Sail.nextGoal(S), gtxt = goal ? D.harbors[goal].name : "Oregon";
    return '<header class="status"><div class="here"><span class="k">Next goal</span><strong>' + esc(gtxt) + "</strong></div>" +
      '<div><span class="k">Supplies</span><strong class="' + (S.supplies <= 8 ? "low" : "") + '">🍞 ' + S.supplies + '</strong></div>' +
      '<div><span class="k">Ship</span><strong aria-label="Hull ' + S.hull + " of " + D.hullMax + '">' + hearts + "</strong></div>" +
      '<div><span class="k">Turn</span><strong>' + S.turns + '</strong></div>' +
      '<div class="btns"><button class="btn small" data-act="howto" type="button">❓ How to sail</button><button class="btn small ghost" data-act="quit" type="button">Quit</button></div></header>';
  }

  function padBtn(i) {
    var d = Sail.DIRS[i], sp = Sail.speed(i), cls = "pad s" + sp + (S.lastHint === i ? " hint" : "");
    return '<button class="' + cls + '" data-act="sail" data-h="' + i + '" type="button"' + (sp ? "" : " disabled") + ' aria-label="Sail ' + d.label.toLowerCase() + (sp ? ", " + sp + " squares" : ", not possible: straight into the wind") + '">' +
      '<span class="ar">' + d.arrow + '</span><span class="sp">' + (sp ? sp : "✖") + "</span></button>";
  }
  function viewPlay() {
    var h = statusBar() + '<div class="game"><div class="mapwrap">' + mapSVG() + '</div><aside class="panel">';
    h += '<section class="card"><h3>Wind and current</h3><div class="wc"><div><span class="ico wi">↘</span> <strong>Wind</strong> blows from the northwest</div><div><span class="ico ci">↓</span> <strong>Current</strong> flows south</div></div></section>';
    h += '<section class="card"><h3>Steer your ship</h3><p class="muted">Pick a direction. The number is how many squares you sail. Then the current pushes you 1 square south.</p><div class="padgrid">' +
      padBtn(7) + padBtn(0) + padBtn(1) + padBtn(6) + '<button class="pad center" data-act="sound" type="button" aria-label="Take soundings: check for hidden rocks">📏<span class="sp2">Soundings</span></button>' + padBtn(2) + padBtn(5) + padBtn(4) + padBtn(3) + "</div>";
    var hl = S.hints === null ? "unlimited" : S.hints + " left";
    h += '<div class="row wrap"><button class="btn small" data-act="hint" type="button"' + (S.hints === 0 ? " disabled" : "") + '>🧭 Ask the pilot (' + hl + ')</button></div>';
    h += '<p class="muted keys">Keys: Q W E / A D / Z X C steer. S = soundings.</p></section>';
    h += '<section class="card"><h3>Captain\'s log</h3><p class="tip">💡 ' + esc(D.tips[Math.floor(S.turns / 6) % D.tips.length]) + '</p><ul class="log">' +
      (S.log.length ? S.log.map(function (l, i) { return "<li" + (i === 0 ? ' class="new"' : "") + ">" + esc(l) + "</li>"; }).join("") : "<li>Your voyage begins. Choose a direction.</li>") + "</ul></section>";
    return h + "</aside></div>";
  }

  function viewEnd() {
    var won = S.over === "won", sc = Sail.score(S);
    var h = '<div class="titlewrap"><h1>' + (won ? "You reached Oregon!" : "Out of supplies") + "</h1>";
    h += "<p class=\"lead\">" + (won ? "You followed the coast all the way north." : "Your crew is tired and hungry, so the expedition turns back. Explorers often had to do the same.") + "</p>";
    h += '<section class="card big"><div class="results">' +
      '<div><h3>🧭 Navigator</h3><p class="big">' + stars(sc.navigator) + "</p><p>" + (won ? "You needed <strong>" + S.turns + "</strong> turns." : "You sailed " + S.turns + " turns.") + "</p></div>" +
      '<div><h3>⚓ Care</h3><p class="big">' + stars(sc.care) + "</p><p>You hit hidden rocks <strong>" + S.hits + "</strong> " + (S.hits === 1 ? "time" : "times") + ".</p></div>" +
      '<div><h3>🗺️ Harbors</h3><p class="big">' + stars(sc.journey) + "</p><p>You reached <strong>" + sc.visited + "</strong> of 3 harbors up the coast.</p></div></div></section>";
    h += '<div class="row wrap"><button class="btn" data-act="log" type="button">📖 Open my harbor log</button><button class="btn primary" data-act="again" type="button">Sail again</button></div>';
    h += '<section class="card"><h2>Think about it</h2><ul class="think">' + D.final.reflection.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("") + "</ul></section>";
    h += '<aside class="note"><h3>What this game leaves out</h3><p>' + esc(D.final.leftOut) + "</p></aside>";
    h += '<aside class="note nextup"><h3>Up next: The Mystery of the Brass Plate</h3><p>You visited Drakes Bay, where Francis Drake left a brass plate. Years later, a plate was found. Was it real? Historians had to investigate...</p></aside>';
    return h + "</div>";
  }

  /* ---------- overlays ---------- */
  function harborCard(id, extra) {
    var hb = D.harbors[id];
    var h = '<p class="era">' + esc(hb.who) + ", " + hb.year + "</p><h2>⚓ " + esc(hb.name) + "</h2>" + hb.text.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    return h + (extra || "");
  }
  function overlayHTML() {
    if (!overlay) return "";
    var h = '<div class="overlay" role="dialog" aria-modal="true"><div class="sheet">';
    var t = overlay.type;
    if (t === "harbor") {
      var extra = "";
      if (overlay.briefing) extra = '<div class="note"><h3>Your orders</h3><p>Sail north along the coast. Reach the harbors to restock and repair, and keep going to Oregon. You have ' + S.supplies + ' supplies, and each turn uses 1.</p></div>';
      else {
        if (overlay.restocked) extra += '<p class="gain">🍞 The crew restocked food and water: +' + D.restock + " supplies.</p>";
        if (overlay.repaired) extra += '<p class="gain">🔧 The ship was repaired.</p>';
      }
      h += harborCard(overlay.id, extra) + '<p><button class="btn primary" data-act="closeharbor" type="button" autofocus>' + (overlay.id === "oregon" ? "See my results" : overlay.briefing ? "Set sail" : "Continue the voyage") + "</button></p>";
    } else {
      h += '<button class="btn small closebtn" data-act="close" type="button">Close ✕</button>';
      if (t === "howto") {
        h += "<h2>❓ How to sail</h2><p><strong>Wind.</strong> The wind blows from the northwest (toward the southeast). You can't sail straight into it.</p>" +
          "<p><strong>Steering.</strong> Choose one of 8 directions. The number shows how many squares you sail. Sailing across the wind is fastest. Sailing at a slant into the wind is slower.</p>" +
          "<p><strong>Current.</strong> After each move, the ocean current pushes your ship 1 square south.</p>" +
          "<p><strong>Zigzag!</strong> To go north against the wind, you have to <em>tack</em>: sail at an angle one way, then the other. Sometimes you must sail away from the coast first, then come back.</p>" +
          "<p><strong>Dangers.</strong> Rocks hide near the shore. In fog you can't see them. Take <em>soundings</em> to find them. Rocks you find stay on your map.</p>" +
          "<p><strong>Supplies.</strong> Every turn uses 1 supply. Harbors give you more. The pilot can suggest the best direction.</p><p class=\"muted\">Tip: point at a direction button to see where it would take you.</p>";
      } else if (t === "glossary") {
        h += "<h2>📚 Words to know</h2><dl>" + D.glossary.map(function (g) { return "<dt>" + esc(g.word) + "</dt><dd>" + esc(g.meaning) + "</dd>"; }).join("") + "</dl>";
      } else if (t === "teacher") {
        h += "<h2>Teacher notes</h2><p><strong>Standards:</strong> " + esc(D.teacher.standards) + "</p><ul>" + D.teacher.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>";
      } else if (t === "log") {
        h += "<h2>📖 Harbor log</h2>";
        Object.keys(S.visited).forEach(function (id) { h += '<article class="entry">' + harborCard(id) + "</article>"; });
      } else if (t === "quit") {
        h += "<h2>Leave the voyage?</h2><p>Your progress will be lost.</p><p><button class=\"btn primary\" data-act=\"quit-yes\" type=\"button\">Leave</button> <button class=\"btn\" data-act=\"close\" type=\"button\">Keep sailing</button></p>";
      } else if (t === "coach") {
        h += "<h2>🧭 Stuck?</h2><p>You are not getting closer to your goal. Remember: you can't sail straight into the wind, and the current pushes you south.</p><p>Try sailing <strong>away from the coast</strong> first, across the wind, and then turn back toward your goal. Or ask the pilot for a hint.</p><p><button class=\"btn primary\" data-act=\"close\" type=\"button\">Keep sailing</button></p>";
      }
    }
    return h + "</div></div>";
  }

  /* ---------- render ---------- */
  function render() {
    var h = phase === "title" ? viewTitle() : phase === "play" ? viewPlay() : viewEnd();
    app.className = phase === "play" ? "fixed" : "";
    app.innerHTML = h + overlayHTML();
    if (phase !== "play") window.scrollTo(0, 0);
    var f = document.querySelector(".overlay [autofocus], .overlay .closebtn, .overlay .btn.primary"); if (f) f.focus({ preventScroll: true });
  }

  function preview(i) {
    var g = document.getElementById("pv"); if (!g || !S) return;
    if (i === null) { g.innerHTML = ""; return; }
    var p = Sail.plan(S, i, true), pts = [[S.x, S.y]].concat(p.path); if (p.drift || p.end[1] !== (pts[pts.length - 1][1])) pts.push(p.end);
    var d = "M" + pts.map(function (c) { return cx(c[0]) + "," + cy(c[1]); }).join("L");
    g.innerHTML = '<path class="pvline' + (p.hit ? " bad" : "") + '" d="' + d + '"/><circle class="pvend' + (p.hit ? " bad" : "") + '" cx="' + cx(p.end[0]) + '" cy="' + cy(p.end[1]) + '" r="9"/>';
  }

  /* ---------- actions ---------- */
  function afterMove(rep) {
    if (!rep.ok) { S.log.unshift(rep.lines[0] || ""); render(); return; }
    S.lastHint = null;
    if (rep.harbor) overlay = { type: "harbor", id: rep.harbor, restocked: rep.restocked, repaired: rep.repaired };
    else if (rep.coach) {
      if (!S.coachShown) { S.coachShown = true; overlay = { type: "coach" }; }
      else { S.log.unshift("Stuck? Sail away from the coast, across the wind, or ask the pilot."); if (S.log.length > 6) S.log.pop(); }
    }
    if (S.over && S.over !== "won") { phase = "end"; overlay = null; }
    render();
  }
  function doSail(i) { afterMove(Sail.move(S, i)); }

  app.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act]"); if (!t || t.disabled) return;
    var a = t.getAttribute("data-act");
    if (a === "start") { mode = t.getAttribute("data-mode"); S = Sail.newGame(mode); phase = "play"; overlay = { type: "harbor", id: "sandiego", briefing: true }; render(); }
    else if (a === "sail") doSail(+t.getAttribute("data-h"));
    else if (a === "sound") afterMove(Sail.sounding(S));
    else if (a === "hint") {
      if (S.hints !== null && S.hints <= 0) return;
      var hint = Sail.hint(S);
      if (hint) { if (S.hints !== null) S.hints--; S.lastHint = hint.heading; S.log.unshift("The pilot suggests sailing " + Sail.DIRS[hint.heading].label.toLowerCase() + "."); if (S.log.length > 6) S.log.pop(); }
      render();
    }
    else if (a === "howto") { overlay = { type: "howto" }; render(); }
    else if (a === "glossary") { overlay = { type: "glossary" }; render(); }
    else if (a === "teacher") { overlay = { type: "teacher" }; render(); }
    else if (a === "log") { overlay = { type: "log" }; render(); }
    else if (a === "quit") { overlay = { type: "quit" }; render(); }
    else if (a === "quit-yes") { overlay = null; S = null; phase = "title"; render(); }
    else if (a === "close") { overlay = null; render(); }
    else if (a === "closeharbor") { var id = overlay.id; overlay = null; if (S.over === "won") phase = "end"; render(); }
    else if (a === "again") { S = null; overlay = null; phase = "title"; render(); }
  });
  app.addEventListener("mouseover", function (e) { var b = e.target.closest(".pad[data-h]"); if (b) preview(+b.getAttribute("data-h")); });
  app.addEventListener("mouseout", function (e) { if (e.target.closest(".pad[data-h]")) preview(null); });
  app.addEventListener("focusin", function (e) { var b = e.target.closest(".pad[data-h]"); if (b) preview(+b.getAttribute("data-h")); });
  app.addEventListener("focusout", function (e) { if (e.target.closest(".pad[data-h]")) preview(null); });

  var KEYS = { w: 0, ArrowUp: 0, e: 1, d: 2, ArrowRight: 2, c: 3, x: 4, ArrowDown: 4, z: 5, a: 6, ArrowLeft: 6, q: 7 };
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "Escape" && overlay && overlay.type !== "harbor") { overlay = null; render(); return; }
    if (phase !== "play" || overlay || !S) return;
    if (e.key === "s") { e.preventDefault(); afterMove(Sail.sounding(S)); return; }
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (KEYS[k] !== undefined) { e.preventDefault(); if (Sail.speed(KEYS[k])) doSail(KEYS[k]); }
  });

  render();
})();
