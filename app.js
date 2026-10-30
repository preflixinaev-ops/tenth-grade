(() => {
  "use strict";
  const C = window.THE_MOMENT_CONFIG || {};
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const safe = (v, fallback = "") => typeof v === "string" ? v : fallback;
  const escapeHTML = (s) => safe(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  const setText = (selector, value) => { const el = $(selector); if (el && value != null) el.textContent = value; };
  const showToast = (msg) => { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 2400); };

  document.documentElement.dataset.theme = C.theme || "warm";
  setText("#recipientName", C.recipient || "Someone");
  setText("#senderName", C.sender || "Someone");
  setText("#endingSender", C.sender || "Someone");
  setText("#openingSubtitle", C.opening?.subtitle || "Some things deserve more than a message.");
  setText("#letterDate", C.letter?.date || C.dateLabel || "");
  setText("#letterTitle", C.letter?.title || "Dear you,");
  setText("#signature", C.letter?.signoff || "With love,");
  setText("#voiceCaption", C.unsaid?.voiceCaption || "Press play when you're ready.");
  setText("#finalTitle", C.final?.title || "Some moments stay forever.");
  setText("#finalMessage", C.final?.message || "");
  setText("#countdownCaption", C.countdown?.caption || "A day worth celebrating.");

  const letterContent = $("#letterContent");
  (C.letter?.paragraphs || []).forEach(p => {
    const node = document.createElement("p"); node.textContent = p; letterContent.appendChild(node);
  });
  const unsaid = $("#unsaidContent");
  (C.unsaid?.paragraphs || []).forEach(p => {
    const node = document.createElement("p"); node.textContent = p; unsaid.appendChild(node);
  });
  const wishes = $("#wishList");
  (C.wishes || []).forEach((wish, i) => {
    const row = document.createElement("div"); row.className = "wish-row reveal";
    row.innerHTML = `<span>0${i + 1}</span><p>${escapeHTML(wish)}</p><b>✳</b>`;
    wishes.appendChild(row);
  });

  const timeline = $("#timeline");
  (C.memories || []).forEach((m, i) => {
    const article = document.createElement("article");
    article.className = `memory-item reveal ${m.layout === "small" ? "memory-small" : ""}`;
    const hasImage = safe(m.image);
    article.innerHTML = `
      <div class="memory-marker"><span>0${i + 1}</span><i></i></div>
      <div class="memory-card">
        ${hasImage ? `<button class="memory-image" type="button" aria-label="Open ${escapeHTML(m.title || "memory")}"><img loading="lazy" src="${escapeHTML(m.image)}" alt="${escapeHTML(m.imageAlt || m.title || "Memory")}"><span>VIEW MEMORY ↗</span></button>` : `<div class="memory-placeholder"><span>ADD YOUR PHOTO</span><b>✳</b></div>`}
        <div class="memory-caption"><span class="eyebrow">${escapeHTML(m.date || "A MEMORY")}</span><h3>${escapeHTML(m.title || "A moment")}</h3><p>${escapeHTML(m.description || "")}</p></div>
      </div>`;
    timeline.appendChild(article);
    const imageButton = $(".memory-image", article);
    if (imageButton) imageButton.addEventListener("click", () => openLightbox(m.image, m.title || ""));
  });

  if (safe(C.final?.image)) {
    $("#finalPhoto").src = C.final.image;
    $("#finalPhoto").alt = C.final.imageAlt || "A final memory";
  } else $("#finalPhotoWrap").classList.add("hidden");
  if (safe(C.unsaid?.voice || C.music?.voice)) {
    $("#voiceAudio").src = C.unsaid?.voice || C.music.voice;
  } else $("#voiceCard").classList.add("hidden");
  if (safe(C.music?.background)) $("#backgroundMusic").src = C.music.background;
  if (!C.features?.hiddenMessage) $("#secretTrigger").classList.add("hidden");
  if (!C.features?.downloadLetter) $("#downloadLetter").classList.add("hidden");
  if (!C.countdown?.enabled) $("#countdownCard").classList.add("hidden");

  // Intersection reveal: progressive enhancement, with visible fallback for reduced motion.
  const revealEls = $$(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) revealEls.forEach(el => el.classList.add("is-visible"));
  else {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  // Navigation has a multi-page feel while retaining accessible anchor URLs.
  const pages = $$("[data-page]");
  const navLinks = $$("[data-menu-link]");
  function activatePage(id) {
    pages.forEach(p => p.classList.toggle("active", p.id === id));
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    $("#menuPanel").classList.remove("open");
    $("#menuPanel").setAttribute("aria-hidden", "true");
    $("#menuToggle").classList.remove("open");
    if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const id = a.getAttribute("href").slice(1);
    if (document.getElementById(id)) { e.preventDefault(); activatePage(id); }
  }));
  $("#beginButton").addEventListener("click", () => activatePage("letter"));
  $("#menuToggle").addEventListener("click", () => {
    const open = !$("#menuPanel").classList.contains("open");
    $("#menuPanel").classList.toggle("open", open);
    $("#menuPanel").setAttribute("aria-hidden", String(!open));
    $("#menuToggle").classList.toggle("open", open);
  });
  window.addEventListener("popstate", () => {
    const id = location.hash.slice(1) || "home";
    const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" });
  });

  // Envelope interaction.
  const envelope = $("#envelope");
  function openLetter() {
    if (envelope.classList.contains("opened")) return;
    envelope.classList.add("opened");
    $("#envelopeHint").textContent = "YOUR LETTER IS READY";
    setTimeout(() => {
      $("#letterReading").classList.add("show");
      $("#letterReading").setAttribute("aria-hidden", "false");
      $("#letterReading").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }, reduceMotion ? 0 : 850);
  }
  envelope.addEventListener("click", openLetter);
  envelope.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLetter(); } });
  $("#closeLetter").addEventListener("click", () => {
    $("#letterReading").classList.remove("show");
    $("#letterReading").setAttribute("aria-hidden", "true");
  });

  // Background music: starts only after an explicit user action.
  const music = $("#backgroundMusic");
  $("#musicToggle").addEventListener("click", async () => {
    if (!music.src) { showToast("Add a music file in config.js to enable sound."); return; }
    try {
      if (music.paused) { await music.play(); $("#musicLabel").textContent = "SOUND ON"; $("#musicToggle").classList.add("playing"); }
      else { music.pause(); $("#musicLabel").textContent = "SOUND OFF"; $("#musicToggle").classList.remove("playing"); }
    } catch { showToast("Your browser could not play this audio file."); }
  });

  // Secret message reveal.
  $("#secretTrigger").addEventListener("click", () => {
    const box = $("#secretMessage");
    if (!box.classList.contains("show")) {
      box.textContent = C.unsaid?.secret || "You are appreciated more than words can say.";
      box.classList.add("show"); box.setAttribute("aria-hidden", "false");
      $("#secretTrigger").innerHTML = "<span>♡</span> A LITTLE REMINDER, JUST FOR YOU";
    }
  });

  // Lightbox.
  function openLightbox(src, caption) {
    if (!src) return;
    $("#lightboxImage").src = src; $("#lightboxCaption").textContent = caption;
    $("#lightbox").classList.add("show"); $("#lightbox").setAttribute("aria-hidden", "false");
  }
  function closeLightbox() { $("#lightbox").classList.remove("show"); $("#lightbox").setAttribute("aria-hidden", "true"); }
  $("#lightboxClose").addEventListener("click", closeLightbox);
  $("#lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") closeLightbox(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeLightbox(); $("#menuPanel").classList.remove("open"); } });

  // Countdown.
  let countdownTimer;
  if (C.countdown?.enabled && C.countdown.target) {
    const target = new Date(C.countdown.target).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const vals = [Math.floor(diff / 86400000), Math.floor(diff / 3600000) % 24, Math.floor(diff / 60000) % 60, Math.floor(diff / 1000) % 60];
      $$("#countdown b").forEach((el, i) => el.textContent = String(vals[i]).padStart(2, "0"));
    };
    tick(); countdownTimer = setInterval(tick, 1000);
  }

  // Lightweight confetti finale.
  function confetti() {
    if (!C.features?.confetti || reduceMotion) return;
    const colors = ["#d9a77e", "#e7c7b3", "#f4dfb6", "#a9b5a0", "#d7a9ad"];
    for (let i = 0; i < 54; i++) {
      const piece = document.createElement("i"); piece.className = "confetti";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random() * 1.1}s`;
      piece.style.setProperty("--drift", `${(Math.random() - .5) * 180}px`);
      document.body.appendChild(piece); setTimeout(() => piece.remove(), 3800);
    }
  }
  const endingObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { confetti(); endingObserver.disconnect(); } }), { threshold: .35 });
  endingObserver.observe($("#ending"));

  // Download a clean printable letter using browser print-to-PDF.
  $("#downloadLetter").addEventListener("click", () => {
    const printable = document.createElement("div");
    printable.className = "print-letter";
    const paragraphs = (C.letter?.paragraphs || []).map(p => `<p>${escapeHTML(p)}</p>`).join("");
    printable.innerHTML = `<div class="print-brand">THE MOMENT · A PERSONAL LETTER</div><h1>${escapeHTML(C.letter?.title || "Dear you,")}</h1>${paragraphs}<p>${escapeHTML(C.letter?.signoff || "With love,")}</p><h2>${escapeHTML(C.sender || "")}</h2>`;
    document.body.appendChild(printable); window.print(); printable.remove();
  });
  $("#replayButton").addEventListener("click", () => activatePage("home"));

  // Scroll progress.
  const progress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    $("#progressBar").style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", progress, { passive: true }); progress();
})();