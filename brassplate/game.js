/* The Mystery of the Brass Plate: screens. Content is in data.js.
   No accounts and no tracking. */
(function () {
  "use strict";
  var P = window.PLATE, app = document.getElementById("app");
  var S = null, overlay = null;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function newState() { return { step: -1, points: 0, answers: {}, board: [], checks: {}, hot: null, reflect: {}, reflectDone: false, reflectPts: 0, verdict: null, caseIdx: 0, cases: {}, over: false }; }
  function stepObj() { return P.steps[S.step]; }
  function add(pts) { S.points += pts; }

  /* ---------- the plate drawing ---------- */
  var LINES = ["Be it known unto all men by these presents.", "June 17, 1579", "By the grace of God and in the name of Her", "Majesty Queen Elizabeth of England and her", "successors forever, I take possession of this", "kingdom whose king and people freely resign", "their right and title in the whole land unto", "Her Majesty's keeping. Now named by me and", "to be known unto all men as Nova Albion.", "CG Francis Drake"];
  function plateSVG(hot, stamp) {
    var h = '<svg class="plate" viewBox="0 0 440 330" role="img" aria-label="The brass plate with its inscription, a hole near the bottom right, and a notch at the top and bottom">';
    h += '<defs><linearGradient id="brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2bb5b"/><stop offset=".5" stop-color="#c89a34"/><stop offset="1" stop-color="#a97d22"/></linearGradient></defs>';
    h += '<rect class="plbg" x="0" y="0" width="440" height="330"/>';
    h += '<rect class="plbody' + (hot === "plate" ? " hl" : "") + '" x="20" y="20" width="400" height="290" rx="8" fill="url(#brass)"/>';
    h += '<rect class="plbg" x="205" y="14" width="30" height="20"/><rect class="plbg" x="205" y="306" width="30" height="20"/>';
    if (hot === "notches") h += '<rect class="hlbox" x="200" y="10" width="40" height="30" rx="4"/><rect class="hlbox" x="200" y="300" width="40" height="30" rx="4"/>';
    h += '<ellipse class="plbg" cx="362" cy="262" rx="26" ry="20"/>';
    if (hot === "hole") h += '<ellipse class="hlring" cx="362" cy="262" rx="34" ry="28"/>';
    if (hot === "date") h += '<rect class="hlbox" x="30" y="66" width="380" height="24" rx="4"/>';
    if (hot === "claim") h += '<rect class="hlbox" x="30" y="92" width="380" height="68" rx="4"/>';
    for (var i = 0; i < LINES.length; i++) h += '<text class="etch' + (i === 1 ? " dateline" : "") + '" x="' + (i === 9 ? 150 : 38) + '" y="' + (58 + i * 22) + '">' + esc(LINES[i]) + "</text>";
    if (stamp) h += '<g transform="rotate(-14 220 165)"><rect x="70" y="120" width="300" height="86" rx="10" class="stampbox"/><text x="220" y="178" class="stamp">ARTIFAKE</text></g>';
    return h + "</svg>";
  }

  /* ---------- chrome ---------- */
  function progress() {
    var st = (S.step >= 0 && S.step < P.steps.length) ? stepObj().stage : (S.over ? P.stages.length : 0);
    return '<nav class="prog" aria-label="Case progress">' + P.stages.map(function (n, i) { return '<span class="pg' + (i < st ? " done" : i === st ? " now" : "") + '">' + esc(n) + "</span>"; }).join("") + "</nav>";
  }
  function topbar() {
    return '<header class="top"><div class="ttl">🔍 ' + esc(P.title) + '</div><div class="pts">⭐ ' + S.points + ' points</div><div class="tb"><button class="btn small" data-act="board" type="button">🗂️ Evidence board (' + S.board.length + ')</button>' +
      '<button class="btn small ghost" data-act="words" type="button">📚 Words</button><button class="btn small ghost" data-act="quit" type="button">Quit</button></div></header>' + progress();
  }
  function chip(pts, max) { return '<span class="chip ' + (pts === max ? "full" : pts > 0 ? "part" : "none") + '">+' + pts + (pts === max ? " ⭐" : "") + "</span>"; }
  function moreBlock(t) { return t ? '<details class="more"><summary>Read more</summary><p>' + esc(t) + "</p></details>" : ""; }

  /* ---------- question block (used by several step types) ---------- */
  function qBlock(o, key, q, options, best, ok, explain, maxPts, picked) {
    var h = '<section class="q"><h3>' + esc(q) + '</h3><div class="opts">';
    options.forEach(function (t, i) {
      var cls = "opt";
      if (picked !== null && picked !== undefined) cls += i === best ? " right" : i === picked ? " wrong" : " dim";
      h += '<button class="' + cls + '" data-act="' + o + '" data-key="' + key + '" data-i="' + i + '" type="button"' + (picked !== null && picked !== undefined ? " disabled" : "") + ">" + esc(t) + "</button>";
    });
    h += "</div>";
    if (picked !== null && picked !== undefined) {
      var pts = picked === best ? maxPts : ok.indexOf(picked) >= 0 ? 1 : 0;
      h += '<p class="fb ' + (pts === maxPts ? "ok" : pts ? "part" : "no") + '">' + chip(pts, maxPts) + " " + esc(explain[picked]) + "</p>";
    }
    return h + "</section>";
  }

  /* ---------- steps ---------- */
  function viewStart() {
    return '<div class="titlewrap"><h1>' + esc(P.title) + '</h1><p class="lead">' + esc(P.subtitle) + "</p>" + plateSVG(null, false) +
      P.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<div class="row wrap"><button class="btn primary big" data-act="begin" type="button">Open the case file</button><button class="btn ghost" data-act="words" type="button">📚 Words to know</button><button class="btn ghost" data-act="teacher" type="button">Teacher notes</button></div></div>';
  }
  function viewStory(s) {
    var h = '<section class="card paper"><div class="emo">' + s.emoji + "</div><h2>" + esc(s.title) + "</h2>" + s.text.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    if (s.bullets) h += '<ul class="bl">' + s.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>";
    if (s.after) h += "<p>" + esc(s.after) + "</p>";
    h += moreBlock(s.more);
    if (s.type === "truth") h = h.replace('<div class="emo">', '<div class="plwrap">' + plateSVG(null, true) + '</div><div class="emo">');
    return h + '<p><button class="btn primary" data-act="next" type="button">Continue</button></p></section>';
  }
  function viewClue(s) {
    var a = S.answers[s.id], picked = a ? a.pick : null;
    var h = '<section class="card paper clue"><div class="tag">Evidence · ' + esc(s.year) + " · " + esc(s.source) + "</div><h2>" + s.emoji + " " + esc(s.title) + "</h2><p>" + esc(s.text) + "</p>" + moreBlock(s.more) + "</section>";
    h += qBlock("answer", s.id, s.q, s.options, s.best, s.ok, s.explain, 2, picked);
    if (a) h += '<p><button class="btn primary" data-act="next" type="button">Add to my evidence board and continue</button></p>';
    return h;
  }
  function viewCompare(s) {
    var n = Object.keys(S.checks).length, all = n === s.items.length, a = S.answers[s.id], picked = a ? a.pick : null;
    var h = '<section class="card paper clue"><div class="tag">Evidence · ' + esc(s.year) + "</div><h2>" + s.emoji + " " + esc(s.title) + "</h2><p>" + esc(s.text) + "</p>";
    h += '<div class="cmp"><div class="cmpl"><h3>Crew\'s description (1579)</h3><ul class="chk">';
    s.items.forEach(function (it, i) {
      var chk = S.checks[i];
      h += '<li><button class="ck' + (chk ? " on" : "") + '" data-act="check" data-i="' + i + '" type="button">' + (chk ? (it.ok === true ? "✔ " : "❓ ") : "🔍 ") + esc(it.label) + "</button>" +
        (chk ? '<p class="res ' + (it.ok === true ? "yes" : "unk") + '">' + esc(it.result) + "</p>" : "") + "</li>";
    });
    h += '</ul></div><div class="cmpr"><h3>The plate (found in 1936)</h3>' + plateSVG(S.hot, false) + "</div></div>";
    if (all) h += '<p class="fb ok">' + esc(s.done) + "</p>";
    h += "</section>";
    if (all) {
      h += qBlock("answer", s.id, s.q, s.options, s.best, s.ok, s.explain, 2, picked);
      if (a) h += '<p><button class="btn primary" data-act="next" type="button">Add to my evidence board and continue</button></p>';
    } else h += '<p class="muted">Check all ' + s.items.length + " parts of the description. (" + n + " of " + s.items.length + " done)</p>";
    return h;
  }
  function viewDecide(s) {
    var a = S.answers[s.id], picked = a ? a.pick : null;
    var h = '<section class="card paper"><div class="tag">Decision · ' + esc(s.year) + "</div><h2>" + s.emoji + " " + esc(s.title) + "</h2><p>" + esc(s.text) + "</p></section>";
    h += qBlock("answer", s.id, "What should happen next?", s.options, s.best, s.ok, s.explain, 2, picked);
    if (a) h += '<p><button class="btn primary" data-act="next" type="button">Continue</button></p>';
    return h;
  }
  function viewVerdict(s) {
    var a = S.answers[s.id], picked = a ? a.pick : null, r = S.answers[s.id + "r"], rp = r ? r.pick : null;
    var h = '<section class="card paper"><div class="tag">Verdict</div><h2>' + s.emoji + " " + esc(s.title) + "</h2><p>" + esc(s.text) + "</p></section>";
    h += qBlock("answer", s.id, "Is this Drake's plate?", s.options, s.best, s.ok, s.explain, 3, picked);
    if (a) {
      h += qBlock("reason", s.id, s.reasonQ, s.reasons, s.reasonBest, [], ["Yes. Scientific evidence is the strongest reason.", "A dirty plate says nothing about when it was made.", "Being sure is not the same as having proof."], 2, rp);
      if (r) h += '<p><button class="btn primary" data-act="next" type="button">Find out where the plate came from</button></p>';
    }
    return h;
  }
  function viewReflect(s) {
    var h = '<section class="card paper"><div class="tag">Think</div><h2>' + s.emoji + " " + esc(s.title) + "</h2><p>" + esc(s.text) + '</p><div class="opts">';
    s.options.forEach(function (o, i) {
      var on = !!S.reflect[i], cls = "opt multi" + (on ? " sel" : "");
      if (S.reflectDone) cls += o.ok ? " right" : on ? " wrong" : " dim";
      h += '<button class="' + cls + '" data-act="rsel" data-i="' + i + '" type="button"' + (S.reflectDone ? " disabled" : "") + ' aria-pressed="' + on + '">' + (on ? "☑ " : "☐ ") + esc(o.t) + "</button>";
    });
    h += "</div>";
    if (!S.reflectDone) h += '<p><button class="btn primary" data-act="rcheck" type="button">Check my answers</button></p>';
    else {
      h += '<p class="fb ' + (S.reflectPts === 4 ? "ok" : "part") + '">' + chip(S.reflectPts, 4) + " The true statements are marked green. Historians always ask: Is it real? Who made it? How do we know?</p>";
      h += '<div class="think"><h3>💬 Talk about it</h3><p>' + esc(s.thinkQ) + '</p></div><p><button class="btn primary" data-act="next" type="button">On to the Case Files</button></p>';
    }
    return h + "</section>";
  }
  function viewCases(s) {
    var c = P.cases[S.caseIdx], cs = S.cases[c.id] || {}, h;
    if (S.caseIdx === 0 && !S.caseStarted) {
      return '<section class="card paper"><div class="emo">' + s.emoji + "</div><h2>" + esc(s.title) + "</h2><p>" + esc(s.text) + '</p><p><button class="btn primary" data-act="caseStart" type="button">Open Case 1</button></p></section>';
    }
    h = '<section class="card paper"><div class="tag">Case ' + (S.caseIdx + 1) + " of " + P.cases.length + "</div><h2>" + c.emoji + " " + esc(c.title) + "</h2><p>" + esc(c.story) + '</p><div class="cluecards">';
    c.clues.forEach(function (t, i) { h += '<div class="cc"><span>Clue ' + (i + 1) + "</span>" + esc(t) + "</div>"; });
    h += "</div></section>";
    h += qBlock("cv", c.id, "Is it real, fake, or...?", c.verdictOptions, c.verdictBest, [], c.verdictOptions.map(function (_, i) { return i === c.verdictBest ? "Good call!" : (c.verdictBest === 2 ? "Not quite. Nothing here is out of place, but experts would still test it." : "Not quite. Look at the clues again."); }), 1, cs.v === undefined ? null : cs.v);
    if (cs.v !== undefined) {
      h += qBlock("cc", c.id, c.clueQ, c.clues.map(function (_, i) { return "Clue " + (i + 1) + ": " + c.clues[i]; }), c.clueBest, [], c.clues.map(function (_, i) { return i === c.clueBest ? "Yes! " + c.explain : "Not that one. " + c.explain; }), 2, cs.c === undefined ? null : cs.c);
      if (cs.c !== undefined) h += '<p><button class="btn primary" data-act="caseNext" type="button">' + (S.caseIdx + 1 < P.cases.length ? "Next case" : "Finish the investigation") + "</button></p>";
    }
    return h;
  }
  function viewFinal() {
    var rank = P.ranks.filter(function (r) { return S.points >= r.min; })[0];
    var h = '<div class="titlewrap"><h1>Case closed!</h1><section class="card paper big"><div class="rank">' + rank.emoji + "</div><h2>" + esc(rank.name) + '</h2><p class="bigpts">⭐ ' + S.points + " points</p>" +
      "<p>You followed the clues, changed your mind when new evidence came in, and tested your skills on new cases.</p></section>";
    h += '<section class="card"><h2>What a historian learned from the brass plate</h2><ul class="think"><li>A match is a good sign, but it is not proof.</li><li>Wanting something to be true can make us overlook doubts.</li><li>Evidence can be fake, so we check it.</li><li>New tests can change what we know.</li></ul></section>';
    h += '<div class="row wrap"><button class="btn" data-act="board" type="button">🗂️ Review my evidence board</button><button class="btn primary" data-act="again" type="button">Play again</button></div></div>';
    return h;
  }

  /* ---------- overlays ---------- */
  function overlayHTML() {
    if (!overlay) return "";
    var h = '<div class="overlay" role="dialog" aria-modal="true"><div class="sheet"><button class="btn small closebtn" data-act="close" type="button">Close ✕</button>';
    if (overlay === "words") h += "<h2>📚 Words to know</h2><dl>" + P.glossary.map(function (g) { return "<dt>" + esc(g.word) + "</dt><dd>" + esc(g.meaning) + "</dd>"; }).join("") + "</dl>";
    else if (overlay === "teacher") h += "<h2>Teacher notes</h2><p><strong>Standards:</strong> " + esc(P.teacher.standards) + "</p><ul>" + P.teacher.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>";
    else if (overlay === "board") {
      h += "<h2>🗂️ Evidence board</h2>";
      if (!S || !S.board.length) h += "<p>No evidence yet. Answer the clue questions to fill your board.</p>";
      else S.board.forEach(function (b) { h += '<article class="entry"><p class="tag">' + esc(b.year) + "</p><h3>" + esc(b.title) + "</h3><p><strong>You said:</strong> " + esc(b.pick) + " " + chip(b.pts, b.max) + "</p></article>"; });
    } else if (overlay === "quit") h += "<h2>Leave the case?</h2><p>Your progress will be lost.</p><p><button class=\"btn primary\" data-act=\"quit-yes\" type=\"button\">Leave</button> <button class=\"btn\" data-act=\"close\" type=\"button\">Keep investigating</button></p>";
    return h + "</div></div>";
  }

  /* ---------- render ---------- */
  function render() {
    var h;
    if (!S) { S = newState(); }
    if (S.step === -1) h = viewStart();
    else if (S.over) h = topbar() + viewFinal();
    else {
      var s = stepObj(), t = s.type;
      h = topbar() + '<main class="stage">' + (t === "story" || t === "truth" ? viewStory(s) : t === "clue" ? viewClue(s) : t === "compare" ? viewCompare(s) : t === "decide" ? viewDecide(s) : t === "verdict" ? viewVerdict(s) : t === "reflect" ? viewReflect(s) : viewCases(s)) + "</main>";
    }
    var y = window.pageYOffset;
    app.innerHTML = h + overlayHTML();
    if (render.keep) { window.scrollTo(0, y); render.keep = false; } else window.scrollTo(0, 0);
    var f = document.querySelector(".overlay .closebtn"); if (f) f.focus({ preventScroll: true });
  }
  function keepScroll() { render.keep = true; }
  function advance() { S.step++; S.hot = null; if (S.step >= P.steps.length) S.over = true; render(); }

  /* ---------- actions ---------- */
  function record(s, pick, pts, max) { S.answers[s.id] = { pick: pick, pts: pts }; add(pts); S.board.push({ year: s.year, title: s.title, pick: s.options[pick], pts: pts, max: max }); }
  app.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act]"); if (!t || t.disabled) return;
    var a = t.getAttribute("data-act"), i = +t.getAttribute("data-i"), key = t.getAttribute("data-key");
    if (a === "begin") { S.step = 0; render(); }
    else if (a === "next") advance();
    else if (a === "answer") {
      var s = P.steps.filter(function (x) { return x.id === key; })[0], pts = i === s.best ? (s.type === "verdict" ? 3 : 2) : s.ok.indexOf(i) >= 0 ? 1 : 0;
      if (s.type === "decide") { S.answers[s.id] = { pick: i, pts: pts }; add(pts); }
      else if (s.type === "verdict") { S.answers[s.id] = { pick: i, pts: pts }; add(pts); S.board.push({ year: "1977", title: "My verdict", pick: s.options[i], pts: pts, max: 3 }); }
      else record(s, i, pts, 2);
      keepScroll(); render();
    }
    else if (a === "reason") { var s2 = P.steps.filter(function (x) { return x.id === key; })[0], p2 = i === s2.reasonBest ? 2 : 0; S.answers[s2.id + "r"] = { pick: i, pts: p2 }; add(p2); keepScroll(); render(); }
    else if (a === "check") { S.checks[i] = true; S.hot = stepObj().items[i].hot; keepScroll(); render(); }
    else if (a === "rsel") { S.reflect[i] = !S.reflect[i]; keepScroll(); render(); }
    else if (a === "rcheck") {
      var s3 = stepObj(), good = 0, bad = 0; s3.options.forEach(function (o, k) { if (S.reflect[k]) { if (o.ok) good++; else bad++; } });
      S.reflectPts = Math.max(0, Math.min(4, good - bad)); add(S.reflectPts); S.reflectDone = true; keepScroll(); render();
    }
    else if (a === "caseStart") { S.caseStarted = true; render(); }
    else if (a === "cv") { var c = P.cases[S.caseIdx], cs = S.cases[c.id] = S.cases[c.id] || {}; cs.v = i; var pv = i === c.verdictBest ? 1 : 0; add(pv); keepScroll(); render(); }
    else if (a === "cc") { var c2 = P.cases[S.caseIdx], cs2 = S.cases[c2.id]; cs2.c = i; var pc = i === c2.clueBest ? 2 : 0; add(pc); keepScroll(); render(); }
    else if (a === "caseNext") { S.caseIdx++; if (S.caseIdx >= P.cases.length) { S.over = true; } render(); }
    else if (a === "board") { overlay = "board"; render(); }
    else if (a === "words") { overlay = "words"; render(); }
    else if (a === "teacher") { overlay = "teacher"; render(); }
    else if (a === "quit") { overlay = "quit"; render(); }
    else if (a === "quit-yes") { overlay = null; S = newState(); render(); }
    else if (a === "close") { overlay = null; keepScroll(); render(); }
    else if (a === "again") { S = newState(); overlay = null; render(); }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && overlay) { overlay = null; keepScroll(); render(); } });
  render();
})();
