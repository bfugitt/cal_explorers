/* Explorer's Choice: voyage rules (no screen code, so it can be tested on its own). */
(function (root) {
  "use strict";
  var E = root.EXPLORE, J = {};
  J.rng = Math.random;
  var KEYS = ["supplies", "health", "morale", "trust", "vessel"];
  J.KEYS = KEYS;
  function clamp(v) { return v < 0 ? 0 : v > 100 ? 100 : v; }
  J.ex = function (S) { return E.explorers[S.id]; };

  J.newGame = function (id) {
    var ex = E.explorers[id];
    var S = { id: id, i: 0, m: {}, flags: {}, days: 0, stop: 0, stopName: ex.stops[0].name, log: [], real: 0, changed: 0, decisions: [], over: null, recent: [], cur: null, pendingJump: null, hardships: [] };
    KEYS.forEach(function (k) { S.m[k] = ex.start[k]; });
    J.settle(S);
    return S;
  };
  function beats(S) { return E.explorers[S.id].beats; }
  function okWhen(S, w) {
    if (!w) return true;
    if (w.flag && !S.flags[w.flag]) return false;
    if (w.notFlag && S.flags[w.notFlag]) return false;
    return true;
  }
  /* Move to the first beat (from S.i) that applies, preparing hazards. Sets S.cur. */
  J.settle = function (S) {
    var b = beats(S);
    while (S.i < b.length) {
      var beat = b[S.i];
      if (!okWhen(S, beat.when)) { S.i++; continue; }
      if (beat.type === "hazard") {
        var ev = null;
        if (J.rng() < beat.chance) {
          var pool = E.hazards[beat.pool].filter(function (h) { return S.recent.indexOf(h.id) < 0; });
          if (pool.length) { ev = pool[Math.floor(J.rng() * pool.length)]; S.recent.push(ev.id); if (S.recent.length > 2) S.recent.shift(); }
        }
        if (!ev) { S.i++; continue; }
        S.cur = { kind: "hazard", beat: beat, ev: ev }; return S.cur;
      }
      S.cur = { kind: beat.type, beat: beat }; return S.cur;
    }
    S.over = S.over || "done"; S.cur = null; return null;
  };
  J.next = function (S) {
    if (S.over) return null;
    if (S.pendingJump) { var id = S.pendingJump; S.pendingJump = null; var b = beats(S); for (var k = 0; k < b.length; k++) if (b[k].id === id) { S.i = k; return J.settle(S); } }
    S.i++; return J.settle(S);
  };

  function apply(S, fx) {
    var d = {};
    if (!fx) return d;
    KEYS.forEach(function (k) { if (fx[k]) { var before = S.m[k]; S.m[k] = clamp(S.m[k] + fx[k]); d[k] = S.m[k] - before; } });
    if (fx.days) S.days += fx.days;
    return d;
  }
  function crisis(S) {
    if (S.over) return;
    if (S.m.supplies <= 0 || S.m.health <= 0) { S.over = "turnback"; S.crisis = S.m.supplies <= 0 ? "supplies" : "health"; }
  }
  function setFlags(S, set) { if (set) for (var k in set) S.flags[k] = set[k]; }

  J.travel = function (S) {
    var beat = S.cur.beat, ex = J.ex(S), sc = E.legScale || 1;
    function scaled(fx) { var o = {}; for (var q in fx) o[q] = Math.round(fx[q] * sc); return o; }
    var d = apply(S, scaled(beat.leg));
    if (beat.legIf && S.flags[beat.legIf.flag]) { var d2 = apply(S, scaled(beat.legIf.effects)); for (var k in d2) d[k] = (d[k] || 0) + d2[k]; }
    S.days += beat.days || 0; S.stop = beat.to; S.stopName = ex.stops[beat.to].name;
    crisis(S);
    return { text: beat.text, deltas: d, days: beat.days || 0 };
  };

  /* A scene or hazard choice. Returns the result to show. */
  J.choose = function (S, idx) {
    var cur = S.cur, beat = cur.beat, src = cur.kind === "hazard" ? cur.ev : beat, ch = src.choices[idx], res = { text: "", deltas: {}, changed: false, real: null, history: null };
    var fx = ch.effects, set = ch.set, text = ch.result || "";
    if (ch.outcomes) {
      var x = J.rng(), acc = 0, pick = ch.outcomes[ch.outcomes.length - 1];
      for (var i = 0; i < ch.outcomes.length; i++) { acc += ch.outcomes[i].p; if (x <= acc) { pick = ch.outcomes[i]; break; } }
      fx = pick.effects; set = pick.set; text = pick.text;
    }
    res.deltas = apply(S, fx); setFlags(S, set); res.text = text;
    if (cur.kind === "hazard") S.hardships.push(src.title);
    if (cur.kind === "scene" && typeof beat.real === "number") {
      var isReal = idx === beat.real; res.real = isReal; S.decisions.push({ id: beat.id, real: isReal });
      if (isReal) S.real++; else { S.changed++; res.changed = true; res.history = beat.history; }
    }
    if (ch.jump) S.pendingJump = ch.jump;
    if (ch.endEarly) { S.over = ch.endEarly; S.endReason = "choice"; }
    crisis(S);
    return res;
  };
  J.camp = function (S, picks) {
    var beat = S.cur.beat, d = {}, i;
    for (i = 0; i < picks.length && i < beat.picks; i++) { var dd = apply(S, beat.actions[picks[i]].effects); for (var k in dd) d[k] = (d[k] || 0) + dd[k]; }
    S.days += 7 * picks.length; crisis(S);
    return { deltas: d };
  };
  J.finishEnd = function (S) { if (!S.over) S.over = "done"; };

  /* ---------- scoring ---------- */
  function stars3(v, t) { return v >= t[0] ? 3 : v >= t[1] ? 2 : 1; }
  J.score = function (S) {
    var ex = J.ex(S), g = ex.ending.goal(S), crewAvg = (S.m.health + S.m.morale) / 2;
    var crew = S.crisis ? 1 : stars3(crewAvg, E.ranks.crew), rel = stars3(S.m.trust, E.ranks.trust);
    return { goal: g, crew: crew, relations: rel, real: S.real, changed: S.changed, total: S.real + S.changed };
  };

  root.Journey = J;
})(typeof window !== "undefined" ? window : global);
