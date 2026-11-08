/* Builds the page from SITE (site-info.js). You shouldn't need to edit this file. */
(() => {
  const S = SITE;
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const digits = (S.phone || "").replace(/[^\d+]/g, "");
  const first = (S.name || "").split(" ")[0];

  const ICON = {
    phone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/>',
    text: '<path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM7 9h10v2H7zm6 5H7v-2h6zm4-6H7V6h10z"/>',
    email: '<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/>',
    pin: '<path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>',
    house: '<path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3z"/>',
    zillow: '<path d="M12 1 1 9.6v2.6l3-2.2V23h16V10l3 2.2V9.6zm4.6 17.4H7.4l5.9-6.6H8.1l1.3-3.2h7.2l-5.8 6.6h5.8z"/>',
    youtube: '<path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12z"/>',
    instagram: '<path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/>',
    facebook: '<path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/>',
    tiktok: '<path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.7a2.9 2.9 0 1 1-2-2.7V9.5a6.3 6.3 0 1 0 5.4 6.2V8.8a8.2 8.2 0 0 0 4.8 1.5V6.9a4.8 4.8 0 0 1-1-.2z"/>',
    linkedin: '<path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/>',
  };
  const icon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;
  const ext = 'target="_blank" rel="noopener"';

  const ytId = (url) => { const m = (url || "").match(/(?:shorts\/|v=|youtu\.be\/|embed\/)([\w-]{11})/); return m ? m[1] : ""; };
  const vid = ytId(S.youtubeVideo);
  const isShort = /shorts\//.test(S.youtubeVideo || "");

  const socials = [
    ["youtube", "YouTube", S.youtubeChannel || S.youtubeVideo, "Watch my videos"],
    ["instagram", "Instagram", S.instagram, S.instagramHandle || "Follow me"],
    ["facebook", "Facebook", S.facebook, "Like my page"],
    ["tiktok", "TikTok", S.tiktok, "Follow along"],
    ["linkedin", "LinkedIn", S.linkedin, "Connect with me"],
  ].filter((s) => s[2]);

  const logo = S.logoImage ? `<img src="${esc(S.logoImage)}" alt="${esc(S.brokerage)}" class="logo-img" />` : `<span class="logo-text">${esc(S.logoText)}</span>`;
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.address || "");

  document.title = `${S.name}, ${S.title} | ${S.brokerage} | ${S.city}`;
  // A link like index.html?theme=bold shows a specific design
  const urlTheme = new URLSearchParams(location.search).get("theme");
  const theme = ["classic", "bold", "modern"].includes(urlTheme) ? urlTheme : (S.theme || "classic");
  document.body.classList.add("theme-" + theme);
  if (!S.movingStripes) document.body.classList.add("no-stripes");
  document.documentElement.style.setProperty("--accent", S.accentColor || "#f78d2d");

  const contactButtons = `
    <a class="btn" href="tel:${digits}">${icon("phone")} Call ${esc(first)}</a>
    <a class="btn" href="sms:${digits}">${icon("text")} Text ${esc(first)}</a>
    <a class="btn" href="mailto:${esc(S.email)}">${icon("email")} Email ${esc(first)}</a>`;

  const video = vid
    ? `<button class="video-thumb ${isShort ? "short" : ""}" data-vid="${vid}" aria-label="Play video">
         <img src="https://i.ytimg.com/vi/${vid}/hqdefault.jpg" alt="" /><span class="play">▶</span></button>`
    : `<div class="video-thumb placeholder"><span class="play">▶</span><small>Your YouTube video</small></div>`;

  document.getElementById("app").innerHTML = `
  <header class="site-header">
    <div class="wrap header-inner">
      <a href="#top" class="brand">${logo}</a>
      <nav class="nav">
        <a href="#about">About</a><a href="#reviews">Reviews</a>${vid ? `<a href="#videos">Videos</a>` : socials.length ? `<a href="#videos">Social</a>` : ""}
        <a href="#contact" class="btn btn-sm">Contact Me</a>
      </nav>
    </div>
  </header>

  <section class="cover" id="top" style="--cover:url('${esc(S.coverPhoto)}')">
    <div class="wrap cover-inner">
      <div class="cover-text">
        <p class="kicker">${esc(S.title)} · ${esc(S.brokerage)} · ${esc(S.city)}</p>
        <h1>${esc(S.name)}</h1>
        <p class="tagline">${esc(S.tagline)}</p>
        <div class="cover-actions">
          <a href="#contact" class="btn btn-lg">Contact Me</a>
          <a href="tel:${digits}" class="btn btn-lg btn-ghost">${icon("phone")} ${esc(S.phone)}</a>
        </div>
      </div>
      <div class="cover-photo"><img src="${esc(S.headshot)}" alt="${esc(S.name)}" /></div>
    </div>
  </section>

  ${S.stats && S.stats.length ? `<section class="stats"><div class="wrap stats-grid">
    ${S.stats.map((s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("")}
  </div></section>` : ""}

  <section class="section about" id="about">
    <div class="wrap about-grid">
      <div class="about-photo"><img src="${esc(S.headshot)}" alt="${esc(S.name)}" /></div>
      <div>
        <p class="eyebrow">Meet Your Agent</p>
        <h2>${esc(S.name)}</h2>
        <p class="about-text">${esc(S.about)}</p>
        <div class="profile-buttons">
          ${S.zillow ? `<a class="btn btn-dark" href="${esc(S.zillow)}" ${ext}>${icon("zillow")} My Zillow Profile</a>` : ""}
          ${S.homes ? `<a class="btn btn-dark" href="${esc(S.homes)}" ${ext}>${icon("house")} My Homes.com Profile</a>` : ""}
        </div>
      </div>
    </div>
  </section>

  ${S.reviews && S.reviews.length ? `<section class="section reviews-section" id="reviews">
    <div class="wrap">
      <p class="eyebrow center">Client Reviews</p>
      <h2 class="center">What my clients say</h2>
      <div class="reviews">
        ${S.reviews.map((r) => `<blockquote class="review">
          <div class="stars">★★★★★</div>
          <div class="review-text"><p>${esc(r.text)}</p></div>
          <button class="read-more" type="button">Read more</button>
          <footer>${esc(r.name)}<span>${esc(r.type)}</span></footer>
        </blockquote>`).join("")}
      </div>
      ${S.zillow ? `<p class="center more"><a href="${esc(S.zillow)}" ${ext}>See all reviews on Zillow →</a></p>` : ""}
    </div>
  </section>` : ""}

  ${vid || socials.length ? `<section class="section media" id="videos">
    <div class="wrap media-grid ${vid ? "" : "no-video"}">
      ${vid ? `<div class="video-box">${video}</div>` : ""}
      <div class="follow">
        <p class="eyebrow">Follow Along</p>
        <h2>${vid ? "Tours, tips &amp; market updates" : "Follow me on social"}</h2>
        <div class="socials">
          ${socials.map(([k, label, url, sub]) => `<a class="social" href="${esc(url)}" ${ext}><span class="ic">${icon(k)}</span><span><b>${label}</b><small>${esc(sub)}</small></span></a>`).join("")}
        </div>
      </div>
    </div>
  </section>` : ""}

  <section class="section contact" id="contact">
    <div class="wrap contact-inner">
      <p class="eyebrow center">Contact Me</p>
      <h2 class="center">Let's talk about your next move.</h2>
      <div class="contact-buttons">${contactButtons}</div>
      <p class="center contact-line"><a href="mailto:${esc(S.email)}">${esc(S.email)}</a> · <a href="${mapUrl}" ${ext}>${icon("pin")} ${esc(S.address)}</a></p>
    </div>
  </section>

  <footer class="site-footer">
    <div class="wrap footer-inner">
      <div><strong>${esc(S.name)}, ${esc(S.title)}</strong><br />${esc(S.brokerage)} · ${esc(S.address)}</div>
      <div class="footer-socials">${socials.map(([k, label, url]) => `<a href="${esc(url)}" ${ext} aria-label="${label}">${icon(k)}</a>`).join("")}</div>
      <div class="fine">Equal Housing Opportunity · © ${new Date().getFullYear()} ${esc(S.brokerage)}</div>
    </div>
  </footer>`;

  // Video: tap the thumbnail to play it right on the page
  document.querySelectorAll(".video-thumb[data-vid]").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (location.protocol === "file:") { window.open(S.youtubeVideo, "_blank", "noopener"); return; }
      btn.outerHTML = `<div class="video-thumb ${isShort ? "short" : ""}"><iframe src="https://www.youtube.com/embed/${btn.dataset.vid}?autoplay=1"
        title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
    })
  );

  // Reviews: "Read more" for long ones
  document.querySelectorAll(".review").forEach((r) => {
    const t = r.querySelector(".review-text"), b = r.querySelector(".read-more");
    if (t.scrollHeight <= t.clientHeight + 4) { b.hidden = true; r.classList.add("open"); return; }
    b.addEventListener("click", () => { const o = r.classList.toggle("open"); b.textContent = o ? "Show less" : "Read more"; });
  });
})();
