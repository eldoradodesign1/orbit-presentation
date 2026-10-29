// Navigation de la présentation : clavier, glisser, lien direct (#n), notes (N), sommaire (O), plein écran (F).
(() => {
  const slides = [...document.querySelectorAll(".slide")];
  const bar = document.querySelector(".progress i");
  const counts = document.querySelectorAll("[data-count]");
  const notes = document.querySelector(".notes");
  const overview = document.querySelector(".overview");
  let current = 0;

  // Signature BTL sur chaque slide
  const sign = document.querySelector("#btl-sign").content;
  slides.forEach((slide) => { if (!slide.querySelector(".slide-sign")) slide.append(sign.cloneNode(true)); });

  const pad = (n) => String(n).padStart(2, "0");
  const go = (index, push = true) => {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, i) => { slide.classList.toggle("is-active", i === current); slide.classList.toggle("is-past", i < current); });
    bar.style.width = `${((current + 1) / slides.length) * 100}%`;
    counts.forEach((el) => { el.textContent = `${pad(current + 1)} / ${pad(slides.length)}`; });
    const note = slides[current].querySelector("aside.note");
    notes.innerHTML = note ? note.innerHTML : "<p>Pas de note pour cette slide.</p>";
    overview.querySelectorAll("button").forEach((b, i) => b.classList.toggle("is-current", i === current));
    if (push) history.replaceState(null, "", `#${current + 1}`);
  };
  const next = () => go(current + 1); const prev = () => go(current - 1);
  const toggleNotes = () => { notes.classList.toggle("is-open"); document.querySelector("[data-act=notes]").classList.toggle("is-on", notes.classList.contains("is-open")); };
  const toggleOverview = () => overview.classList.toggle("is-open");
  const fullscreen = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.());

  // Sommaire
  const list = overview.querySelector("ol");
  slides.forEach((slide, i) => { const li = document.createElement("li"); li.innerHTML = `<button type="button"><small>${pad(i + 1)}</small>${slide.dataset.title ?? ""}</button>`; li.firstChild.addEventListener("click", () => { go(i); overview.classList.remove("is-open"); }); list.append(li); });

  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input")) return;
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); next(); }
    else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); prev(); }
    else if (e.key === "Home") go(0); else if (e.key === "End") go(slides.length - 1);
    else if (e.key.toLowerCase() === "n") toggleNotes();
    else if (e.key.toLowerCase() === "o") toggleOverview();
    else if (e.key.toLowerCase() === "f") fullscreen();
    else if (e.key === "Escape") { notes.classList.remove("is-open"); overview.classList.remove("is-open"); }
  });
  let x0 = null; let y0 = null;
  document.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  document.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; const dy = e.changedTouches[0].clientY - y0; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) (dx < 0 ? next : prev)(); x0 = null; });
  document.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => ({ prev, next, notes: toggleNotes, overview: toggleOverview, full: fullscreen })[b.dataset.act]()));
  window.addEventListener("hashchange", () => go(Number(location.hash.slice(1)) - 1 || 0, false));
  go(Number(location.hash.slice(1)) - 1 || 0, false);

  // ── Modèle économique (même calcul pour le graphique et le calculateur) ──
  // Mois 0 : développement. Pilote : on ne facture pas encore. Ensuite : n campagnes / mois facturées.
  const model = ({ perMonth, pilot, iaShare, price = 500, ia = 200, setup = 100, hosting = 50, dev = 500, months = 12 }) => {
    let cum = -dev; const rows = [];
    for (let m = 1; m <= months; m++) {
      const billing = m > pilot;
      const revenue = billing ? perMonth * price + Math.round(perMonth * iaShare) * ia : 0;
      const cost = hosting + (billing ? perMonth * setup : 0);
      cum += revenue - cost; rows.push({ m, revenue, cost, net: revenue - cost, cum });
    }
    const even = rows.find((r) => r.cum >= 0)?.m ?? null;
    return { rows, even, total: rows.at(-1).cum, revenue: rows.reduce((s, r) => s + r.revenue, 0) };
  };
  const money = (v) => `${v < 0 ? "−" : ""}${Math.abs(Math.round(v)).toLocaleString("fr-FR")} $`;
  const draw = (svg, result) => {
    const W = 760; const H = 300; const top = 20; const base = 230; const max = Math.max(...result.rows.map((r) => Math.abs(r.cum)), ...result.rows.map((r) => r.revenue), 1);
    const y = (v) => base - (v / max) * (base - top) * (v >= 0 ? 1 : .35);
    const step = W / result.rows.length; const bw = step * .42;
    let out = `<line x1="0" x2="${W}" y1="${base}" y2="${base}" stroke="rgb(190 215 255 / .2)"/>`;
    result.rows.forEach((r, i) => {
      const x = i * step + step / 2;
      out += `<rect x="${x - bw / 2}" y="${Math.min(y(r.revenue), base)}" width="${bw}" height="${Math.abs(base - y(r.revenue)) || 1}" rx="5" fill="rgb(112 232 225 / .75)"><title>Mois ${r.m} : ${money(r.revenue)} facturés</title></rect>`;
      out += `<text x="${x}" y="${base + 22}" text-anchor="middle" font-size="12" fill="rgb(150 168 196)">M${r.m}</text>`;
    });
    const pts = result.rows.map((r, i) => `${i * step + step / 2},${y(r.cum)}`).join(" ");
    out += `<polyline points="${pts}" fill="none" stroke="rgb(151 128 255)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
    result.rows.forEach((r, i) => { out += `<circle cx="${i * step + step / 2}" cy="${y(r.cum)}" r="${r.m === result.even ? 7 : 4}" fill="${r.m === result.even ? "rgb(255 255 255)" : "rgb(151 128 255)"}"/>`; });
    if (result.even) { const i = result.even - 1; out += `<text x="${i * step + step / 2}" y="${y(result.rows[i].cum) - 16}" text-anchor="middle" font-size="13" font-weight="600" fill="#fff">Point mort</text>`; }
    const last = result.rows.at(-1); out += `<text x="${W - 4}" y="${y(last.cum) - 14}" text-anchor="end" font-size="15" font-weight="700" fill="rgb(151 128 255)">${money(last.cum)}</text>`;
    svg.setAttribute("viewBox", `0 0 ${W} ${H - 30}`); svg.innerHTML = out;
  };
  const roi = document.querySelector("#roi-chart");
  if (roi) { const r = model({ perMonth: 2, pilot: 2, iaShare: .5 }); draw(roi, r); document.querySelector("#roi-even").textContent = `mois ${r.even}`; document.querySelector("#roi-total").textContent = money(r.total); }

  const calc = document.querySelector("#calc");
  if (calc) {
    const inputs = [...calc.querySelectorAll("input")];
    const update = () => {
      const v = Object.fromEntries(inputs.map((i) => [i.name, Number(i.value)]));
      calc.querySelector("[data-v=perMonth]").textContent = v.perMonth;
      calc.querySelector("[data-v=pilot]").textContent = `${v.pilot} mois`;
      calc.querySelector("[data-v=iaShare]").textContent = `${v.iaShare} %`;
      calc.querySelector("[data-v=price]").textContent = money(v.price);
      const r = model({ perMonth: v.perMonth, pilot: v.pilot, iaShare: v.iaShare / 100, price: v.price });
      calc.querySelector("[data-k=even]").textContent = r.even ? `mois ${r.even}` : "> 12 mois";
      calc.querySelector("[data-k=revenue]").textContent = money(r.revenue);
      calc.querySelector("[data-k=total]").textContent = money(r.total);
      draw(calc.querySelector("svg"), r);
    };
    inputs.forEach((i) => i.addEventListener("input", update)); update();
  }
})();
