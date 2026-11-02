/* Explorer's Choice: screens. Rules are in core.js, content is in data.js.
   No accounts and no tracking. Completed voyages are remembered only in this browser. */
(function () {
  "use strict";
  var E = window.EXPLORE, MAPS = window.MAPS, J = window.Journey;
  var app = document.getElementById("app");
  var S = null, phase = "title", overlay = null, view = { res: null, picks: [] }, dlog = [];
  var SAVE = "explorersDone_v1";

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function stars(n) { return "★".repeat(n) + "☆".repeat(3 - n); }
  function done() { try { return JSON.parse(localStorage.getItem(SAVE) || "{}"); } catch (e) { return {}; } }
  function markDone(id, st) { try { var d = done(); d[id] = Math.max(d[id] || 0, st); localStorage.setItem(SAVE, JSON.stringify(d)); } catch (e) {} }
  function meterInfo(id) { for (var i = 0; i < E.meters.length; i++) if (E.meters[i].id === id) return E.meters[i]; return null; }

  /* ---------- map ---------- */
  function proj(m, lon, lat) { return [(lon - m.lon0) * m.scale * (m.kx || 1), (m.lat1 - lat) * m.scale]; }
  var LABELS = {
    west: [["PACIFIC OCEAN", -126.5, 30, "big"], ["MEXICO", -104, 25.5, "land"], ["BAJA CALIFORNIA", -112.9, 29.5, "land"], ["CALIFORNIA", -119.5, 39.2, "land"], ["OREGON", -121.5, 43.3, "land"], ["Kumeyaay", -116.3, 31.9, "nat"], ["Chumash", -119.2, 35.1, "nat"], ["Miwok", -122.2, 38.5, "nat"]],
    north: [["PACIFIC OCEAN", 196, 47, "big"], ["BERING SEA", 183, 58.8, "big"], ["ARCTIC OCEAN", 200, 71.2, "big"], ["ALASKA", 216, 64.5, "land"], ["RUSSIA", 150, 66, "land"], ["CANADA", 231, 58, "land"], ["OREGON", 235.5, 43.0, "land"]],
    atlantic: [["ATLANTIC OCEAN", -30, 20, "big"], ["PACIFIC OCEAN", -118, -20, "big"], ["SOUTH AMERICA", -58, -15, "land"], ["NORTH AMERICA", -100, 45, "land"], ["EUROPE", 8, 52, "land"], ["AFRICA", -5, 12, "land"], ["Miwok lands", -121, 35.5, "nat"]]
  };
  function mapSVG() {
    var ex = J.ex(S), key = ex.stops[S.stop].map || ex.map, m = MAPS[key], zoomed = key !== ex.map;
    function onMap(i) { return (ex.stops[i].map || ex.map) === key; }
    var h = '<svg class="map" viewBox="0 0 ' + m.w + " " + m.h + '" role="img" aria-label="Map of the ' + esc(ex.short) + ' voyage">';
    h += '<rect class="ocean" width="' + m.w + '" height="' + m.h + '"/><path class="land" d="' + m.land + '"/>';
    (LABELS[key] || []).forEach(function (l) { var p = proj(m, l[1], l[2]); h += '<text class="lbl ' + l[3] + '" x="' + p[0] + '" y="' + p[1] + '">' + esc(l[0]) + "</text>"; });
    if (zoomed) h += '<text class="lbl nat" x="14" y="' + (m.h - 14) + '">Zoomed in: the California coast</text>';
    /* routes: points for stops on this map; via points only between neighbors on the same map */
    var pts = [];
    ex.stops.forEach(function (s, i) {
      if (!onMap(i)) return;
      var joined = i > 0 && onMap(i - 1);
      if (joined) (s.via || []).forEach(function (v) { pts.push([v[0], v[1], i, false]); });
      pts.push([s.lon, s.lat, i, true, !joined]);
    });
    function d(arr) { var out = ""; arr.forEach(function (q, k) { var p = proj(m, q[0], q[1]); out += (k === 0 || q[4] ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1); }); return out; }
    h += '<path class="route" style="stroke:' + ex.color + '" d="' + d(pts) + '"/>';
    var tr = pts.filter(function (q) { return q[2] <= S.stop; });
    if (tr.length > 1) h += '<path class="route done" style="stroke:' + ex.color + '" d="' + d(tr) + '"/>';
    if (!zoomed) (ex.extraRoutes || []).forEach(function (r) { var arr = (r.via || []).map(function (v) { return [v[0], v[1]]; }); h += '<path class="route extra" d="' + d(arr) + '"/>'; var p0 = proj(m, arr[0][0], arr[0][1]); h += '<text class="lbl nat" x="' + (p0[0] + 8) + '" y="' + (p0[1] + 4) + '">' + esc(r.label) + "</text>"; });
    /* stops */
    ex.stops.forEach(function (s, i) {
      if (!onMap(i)) return;
      var p = proj(m, s.lon, s.lat), here = i === S.stop, past = i < S.stop;
      h += '<g class="stop' + (here ? " here" : past ? " past" : "") + '"><circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (here ? 14 : 10) + '" style="' + (here ? "stroke:" + ex.color : "") + '"/><text class="num" x="' + p[0] + '" y="' + (p[1] + 4.5) + '">' + (i + 1) + "</text>" +
        '<text class="sname" x="' + (p[0] + (s.lx || 14)) + '" y="' + (p[1] + (s.ly || 4)) + '" text-anchor="' + (s.anchor || "start") + '">' + esc(s.name) + "</text></g>";
    });
    var sp = proj(m, ex.stops[S.stop].lon, ex.stops[S.stop].lat);
    h += '<g class="ship"><circle cx="' + sp[0] + '" cy="' + (sp[1] - 26) + '" r="16"/><text x="' + sp[0] + '" y="' + (sp[1] - 18) + '">' + ex.travelEmoji + "</text></g>";
    return h + "</svg>";
  }

  /* ---------- chrome ---------- */
  function meterBar(id) {
    var mi = meterInfo(id), v = S.m[id], lab = id === "vessel" ? J.ex(S).vessel : mi, cls = v >= 60 ? "ok" : v >= 30 ? "mid" : "low";
    return '<div class="mt" title="' + esc(lab.label) + '"><span class="me" aria-hidden="true">' + lab.emoji + '</span><div class="mb"><div class="ml">' + esc(lab.label) + " <strong>" + v + '</strong></div><div class="bar" role="img" aria-label="' + esc(lab.label) + " " + v + ' out of 100"><div class="fill ' + cls + '" style="width:' + v + '%"></div></div></div></div>';
  }
  function statusBar() {
    var ex = J.ex(S), stop = ex.stops[S.stop];
    var h = '<header class="status"><div class="who"><span class="k">' + esc(ex.short) + ", " + ex.year + '</span><strong>' + esc(stop.date) + "</strong><small>Day " + S.days + '</small></div><div class="meters">';
    J.KEYS.forEach(function (k) { h += meterBar(k); });
    return h + '</div><div class="btns"><button class="btn small" data-act="vlog" type="button">📖 Voyage log</button><button class="btn small" data-act="words" type="button">📚 Words</button><button class="btn small ghost" data-act="quit" type="button">Quit</button></div></header>';
  }
  function chips(deltas, days) {
    var h = "";
    J.KEYS.forEach(function (k) { if (deltas && deltas[k]) { var lab = k === "vessel" ? J.ex(S).vessel : meterInfo(k); h += '<span class="dchip ' + (deltas[k] > 0 ? "up" : "down") + '">' + lab.emoji + " " + (deltas[k] > 0 ? "+" : "") + deltas[k] + "</span>"; } });
    if (days) h += '<span class="dchip">📅 ' + days + " days</span>";
    return h ? '<div class="chips">' + h + "</div>" : "";
  }

  /* ---------- title ---------- */
  function viewTitle() {
    var dn = done();
    var h = '<div class="titlewrap"><h1>' + esc(E.title) + '</h1><p class="lead">' + esc(E.subtitle) + "</p>" + E.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    h += '<div class="row wrap"><button class="btn ghost" data-act="words" type="button">📚 Words to know</button><button class="btn ghost" data-act="teacher" type="button">Teacher notes</button></div><h2>Choose your explorer</h2><div class="cards">';
    E.order.forEach(function (id) {
      var x = E.explorers[id];
      h += '<button class="xcard" style="border-top-color:' + x.color + '" data-act="pick" data-id="' + id + '" type="button"><span class="xe">' + x.emoji + "</span><strong>" + esc(x.name) + "</strong><span class=\"xy\">" + x.country + ", " + x.year + (dn[id] ? " · ✔ " + stars(dn[id]) : "") + "</span>" +
        '<span class="xg"><b>Goal:</b> ' + esc(x.goal) + '</span><span class="xh"><b>Hardships:</b> ' + esc(x.hardships.join("; ")) + '.</span><span class="xd">Difficulty: ' + x.difficulty + "</span></button>";
    });
    return h + "</div></div>";
  }

  /* ---------- play ---------- */
  function sceneCard(src, beat, kind) {
    var h = '<section class="card paper"><div class="tag">' + (kind === "hazard" ? "Danger on the way" : esc(J.ex(S).stops[S.stop].name)) + '</div><h2>' + src.emoji + " " + esc(src.title) + "</h2><p>" + esc(src.text) + "</p>";
    if (src.voice) h += '<div class="voice"><strong>👥 People on shore</strong><p>' + esc(src.voice) + "</p></div>";
    if (src.more) h += '<details class="more"><summary>Read more</summary><p>' + esc(src.more) + "</p></details>";
    return h + "</section>";
  }
  function viewPlay() {
    var c = S.cur, h = statusBar() + '<div class="game"><div class="mapwrap">' + mapSVG() + '</div><div class="panel">';
    if (S.over && !c) c = null;
    if (!c || (S.over && view.res)) { /* result of the last choice with game over */ }
    if (c && c.kind === "travel") h += travelCard(c);
    else if (c && (c.kind === "scene" || c.kind === "hazard")) h += choiceCard(c);
    else if (c && c.kind === "camp") h += campCard(c);
    else if (c && c.kind === "end") h += endBeatCard(c);
    else h += '<section class="card paper"><h2>The voyage ends</h2><p><button class="btn primary" data-act="finish" type="button">See how it went</button></p></section>';
    return h + "</div></div>";
  }
  function travelCard(c) {
    var r = view.res;
    var h = '<section class="card paper"><div class="tag">On the way</div><h2>🧭 ' + esc(c.beat.text) + "</h2>" + (r ? chips(r.deltas, r.days) : "");
    if (S.over === "turnback" && S.crisis) h += crisisNote();
    return h + '<p><button class="btn primary" data-act="continue" type="button">Continue</button></p></section>';
  }
  function crisisNote() { return '<p class="fb bad">' + (S.crisis === "supplies" ? "Your supplies have run out. The expedition has to turn back." : "Your crew is too sick to go on. The expedition has to turn back.") + "</p>"; }
  function choiceCard(c) {
    var src = c.kind === "hazard" ? c.ev : c.beat, r = view.res, h = sceneCard(src, c.beat, c.kind);
    if (!r) {
      h += '<section class="q"><h3>' + esc(src.q || "What will you do?") + '</h3><div class="opts">';
      src.choices.forEach(function (ch, i) { h += '<button class="opt" data-act="choose" data-i="' + i + '" type="button"><strong>' + esc(ch.label) + "</strong>" + (ch.desc ? "<span>" + esc(ch.desc) + "</span>" : "") + (ch.endEarly ? '<span class="warn">This will end your voyage.</span>' : "") + "</button>"; });
      return h + "</div></section>";
    }
    h += '<section class="card result">';
    if (r.real === true) h += '<p class="badge real">✔ This is what the real explorer did.</p>';
    else if (r.real === false) h += '<p class="badge alt">🔀 You changed history.</p>';
    h += "<p>" + esc(r.text) + "</p>" + chips(r.deltas, 0);
    if (S.over && S.crisis) h += crisisNote();
    if (r.changed) h += '<p><button class="btn small" data-act="history" type="button">📜 What really happened?</button></p>';
    return h + '<p><button class="btn primary" data-act="continue" type="button">Continue</button></p></section>';
  }
  function campCard(c) {
    var b = c.beat, r = view.res, h = '<section class="card paper"><div class="tag">Camp</div><h2>' + b.emoji + " " + esc(b.title) + "</h2><p>" + esc(b.text) + "</p>";
    if (!r) {
      h += '<div class="opts">';
      b.actions.forEach(function (a, i) {
        var on = view.picks.indexOf(i) >= 0;
        h += '<button class="opt multi' + (on ? " sel" : "") + '" data-act="cpick" data-i="' + i + '" type="button" aria-pressed="' + on + '"><strong>' + (on ? "☑ " : "☐ ") + esc(a.label) + "</strong></button>";
      });
      h += '</div><p class="muted">' + view.picks.length + " of " + b.picks + ' chosen.</p><p><button class="btn primary" data-act="cdone" type="button"' + (view.picks.length === b.picks ? "" : " disabled") + ">Done</button></p>";
    } else h += chips(r.deltas, 0) + (S.over ? crisisNote() : "") + '<p><button class="btn primary" data-act="continue" type="button">Continue</button></p>';
    return h + "</section>";
  }
  function endBeatCard(c) {
    return '<section class="card paper"><div class="tag">' + esc(J.ex(S).stops[S.stop].name) + '</div><h2>🏁 Journey\'s end</h2><p>' + esc(c.beat.text) + '</p><p><button class="btn primary" data-act="finish" type="button">See how it went</button></p></section>';
  }

  /* ---------- ending ---------- */
  function viewEnd() {
    var ex = J.ex(S), sc = J.score(S), turned = S.over === "turnback", h = '<div class="titlewrap"><div class="tag">' + esc(ex.name) + ", " + (ex.years || ex.year) + "</div><h1>" + (turned ? "The expedition turns back" : "Voyage complete!") + "</h1>";
    h += '<p class="lead">' + (turned ? (S.crisis ? (S.crisis === "supplies" ? "Your supplies ran out." : "Your crew became too sick to go on.") : "You chose to end the voyage.") + " Real explorers often had to turn back, too." : "You reached the end of the voyage.") + "</p>";
    h += '<section class="card paper big"><div class="results">' +
      '<div><h3>🎯 Goal</h3><p class="bigs">' + stars(sc.goal.stars) + "</p><p>" + esc(sc.goal.text) + "</p></div>" +
      '<div><h3>❤️ Crew</h3><p class="bigs">' + stars(sc.crew) + "</p><p>Health " + S.m.health + ", morale " + S.m.morale + ".</p></div>" +
      '<div><h3>🤝 Relations</h3><p class="bigs">' + stars(sc.relations) + "</p><p>Trust of local people: " + S.m.trust + ".</p></div></div>";
    if (sc.total) h += '<p class="histline">📜 You made the same choice as the real explorer <strong>' + sc.real + "</strong> of <strong>" + sc.total + "</strong> times, and changed history " + sc.changed + (sc.changed === 1 ? " time." : " times.") + "</p>";
    h += "</section>";
    h += '<section class="card"><h2>What really happened</h2>' + ex.ending.real.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</section>";
    if (S.hardships.length) h += '<section class="card"><h2>Hardships you faced</h2><p>' + S.hardships.map(esc).join(", ") + ".</p></section>";
    h += '<section class="card"><h2>Think about it</h2><ul class="think">' + ex.questions.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("") + "</ul></section>";
    h += '<div class="row wrap"><button class="btn" data-act="vlog" type="button">📖 Voyage log</button><button class="btn primary" data-act="again" type="button">Choose another explorer</button><button class="btn" data-act="retry" type="button">Sail this voyage again</button></div></div>';
    return h;
  }

  /* ---------- overlays ---------- */
  function overlayHTML() {
    if (!overlay) return "";
    var h = '<div class="overlay" role="dialog" aria-modal="true"><div class="sheet">', t = overlay.type;
    if (t === "history") {
      h += '<p class="tag">History check</p><h2>📜 You changed history!</h2><p>' + esc(overlay.text) + '</p><p class="muted">The other choices are guesses about what might have happened.</p><p><button class="btn primary" data-act="close" type="button" autofocus>Back to the voyage</button></p>';
    } else if (t === "brief") {
      var x = E.explorers[overlay.id];
      h += '<p class="tag">' + esc(x.country) + ", " + (x.years || x.year) + "</p><h2>" + x.emoji + " " + esc(x.name) + "</h2><p><strong>Your goal:</strong> " + esc(x.goal) + "</p><p><strong>Hardships you will face:</strong></p><ul>" + x.hardships.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("") + "</ul>" +
        '<p class="muted">You will manage supplies, crew health, morale, trust, and your ' + esc(x.vessel.label.toLowerCase()) + ". You can make the same choices as the real explorer or change history. If supplies or health reach 0, the expedition must turn back.</p>" +
        '<p><button class="btn primary" data-act="go" data-id="' + x.id + '" type="button" autofocus>Set out</button> <button class="btn" data-act="close" type="button">Choose someone else</button></p>';
    } else {
      h += '<button class="btn small closebtn" data-act="close" type="button">Close ✕</button>';
      if (t === "words") h += "<h2>📚 Words to know</h2><dl>" + E.glossary.map(function (g) { return "<dt>" + esc(g.word) + "</dt><dd>" + esc(g.meaning) + "</dd>"; }).join("") + "</dl>";
      else if (t === "teacher") h += "<h2>Teacher notes</h2><p><strong>Standards:</strong> " + esc(E.teacher.standards) + "</p><ul>" + E.teacher.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>";
      else if (t === "vlog") {
        h += "<h2>📖 Voyage log</h2>";
        if (!dlog.length) h += "<p>Your choices will appear here.</p>";
        dlog.forEach(function (l) { h += '<article class="entry"><p class="tag">' + esc(l.where) + "</p><h3>" + esc(l.title) + "</h3><p>" + esc(l.choice) + (l.real === true ? ' <span class="badge real">✔ Same as the real explorer</span>' : l.real === false ? ' <span class="badge alt">🔀 Changed history</span>' : "") + "</p></article>"; });
      } else if (t === "quit") h += "<h2>Leave the voyage?</h2><p>Your progress will be lost.</p><p><button class=\"btn primary\" data-act=\"quit-yes\" type=\"button\">Leave</button> <button class=\"btn\" data-act=\"close\" type=\"button\">Keep sailing</button></p>";
    }
    return h + "</div></div>";
  }

  /* ---------- render ---------- */
  function render() {
    var h = phase === "title" ? viewTitle() : phase === "play" ? viewPlay() : viewEnd();
    app.className = phase === "play" ? "fixed" : "";
    if (S && phase !== "title") app.style.setProperty("--accent", J.ex(S).color); else app.style.removeProperty("--accent");
    var keep = document.querySelector(".panel"), top = keep ? keep.scrollTop : 0;
    app.innerHTML = h + overlayHTML();
    var p = document.querySelector(".panel"); if (p && render.keep) { p.scrollTop = top; render.keep = false; }
    else { if (p) p.scrollTop = 0; if (phase !== "play") window.scrollTo(0, 0); }
    var f = document.querySelector(".overlay [autofocus], .overlay .closebtn"); if (f) f.focus({ preventScroll: true });
  }

  /* ---------- actions ---------- */
  function prepare() {                       // run automatic beats (travel) when they come up
    view = { res: null, picks: [] };
    if (S.cur && S.cur.kind === "travel") view.res = J.travel(S);
  }
  function logChoice(c, idx, res) {
    var src = c.kind === "hazard" ? c.ev : c.beat;
    dlog.push({ where: J.ex(S).stops[S.stop].name, title: src.title, choice: src.choices[idx].label, real: res.real });
  }
  app.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act]"); if (!t || t.disabled) return;
    var a = t.getAttribute("data-act");
    if (a === "pick") { overlay = { type: "brief", id: t.getAttribute("data-id") }; render(); }
    else if (a === "go") { S = J.newGame(t.getAttribute("data-id")); dlog = []; overlay = null; phase = "play"; prepare(); render(); }
    else if (a === "choose") {
      var idx = +t.getAttribute("data-i"), c = S.cur, res = J.choose(S, idx); view.res = res; logChoice(c, idx, res);
      if (res.changed) overlay = { type: "history", text: res.history };
      render.keep = false; render();
    }
    else if (a === "cpick") {
      var i = +t.getAttribute("data-i"), n = view.picks.indexOf(i), max = S.cur.beat.picks;
      if (n >= 0) view.picks.splice(n, 1); else if (view.picks.length < max) view.picks.push(i);
      render.keep = true; render();
    }
    else if (a === "cdone") { var r = J.camp(S, view.picks); view.res = r; dlog.push({ where: J.ex(S).stops[S.stop].name, title: S.cur.beat.title, choice: view.picks.map(function (k) { return S.cur.beat.actions[k].label; }).join("; "), real: null }); render(); }
    else if (a === "continue") {
      if (S.over) { phase = "end"; markDone(S.id, J.score(S).goal.stars); render(); return; }
      J.next(S); if (S.over) { phase = "end"; markDone(S.id, J.score(S).goal.stars); render(); return; }
      prepare(); render();
    }
    else if (a === "finish") { J.finishEnd(S); phase = "end"; markDone(S.id, J.score(S).goal.stars); render(); }
    else if (a === "history") { overlay = { type: "history", text: (view.res && view.res.history) || "" }; render.keep = true; render(); }
    else if (a === "words") { overlay = { type: "words" }; render(); }
    else if (a === "teacher") { overlay = { type: "teacher" }; render(); }
    else if (a === "vlog") { overlay = { type: "vlog" }; render(); }
    else if (a === "quit") { overlay = { type: "quit" }; render(); }
    else if (a === "quit-yes") { overlay = null; S = null; phase = "title"; render(); }
    else if (a === "close") { overlay = null; render.keep = true; render(); }
    else if (a === "again") { S = null; overlay = null; phase = "title"; render(); }
    else if (a === "retry") { var id = S.id; S = J.newGame(id); dlog = []; phase = "play"; prepare(); render(); }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && overlay && overlay.type !== "history") { overlay = null; render.keep = true; render(); } });
  render();
})();
