(() => {
  const defaults = window.PORTFOLIO_CONFIG || {};
  let data = JSON.parse(localStorage.getItem("hadessei_portfolio") || "null") || defaults;

  const $ = (s) => document.querySelector(s);
  const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value ?? ""; };

  set("brandName", data.name);
  set("heroName", data.name);
  set("heroDescription", data.description);
  set("profileText", data.profile);
  set("emailText", data.email);
  set("discordText", data.discord);
  set("footerName", data.name);
  if ($("#avatar")) $("#avatar").src = data.avatar || defaults.avatar;

  const stats = $("#statsGrid");
  stats.innerHTML = (data.stats || []).map((s,i) =>
    `<article class="stat reveal" style="--delay:${i*80}ms"><strong>${escapeHTML(s.value)}</strong><span>${escapeHTML(s.label)}</span></article>`
  ).join("");

  const exp = $("#experienceList");
  exp.innerHTML = (data.experiences || []).map((x,i) =>
    `<article class="experience reveal">
      <div class="timeline-dot"></div>
      <div class="exp-top"><div><small>${escapeHTML(x.server)}</small><h3>${escapeHTML(x.role)}</h3></div><b>${escapeHTML(x.players)}</b></div>
      <p>${escapeHTML(x.description)}</p>
      <div class="tags">${(x.tags||[]).map(t=>`<span>#${escapeHTML(t)}</span>`).join("")}</div>
    </article>`
  ).join("");

  const skills = $("#skillsGrid");
  skills.innerHTML = (data.skills || []).map((x,i) =>
    `<article class="skill reveal" style="--delay:${i*70}ms"><div class="skill-icon">${escapeHTML(x.icon)}</div><h3>${escapeHTML(x.title)}</h3><p>${escapeHTML(x.text)}</p></article>`
  ).join("");

  // Menú móvil
  $("#menuToggle")?.addEventListener("click", () => $("#nav").classList.toggle("open"));
  document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => $("#nav").classList.remove("open")));

  // Copiar
  document.querySelectorAll("[data-copy]").forEach(btn => btn.addEventListener("click", async () => {
    const value = document.getElementById(btn.dataset.copy)?.textContent || "";
    try { await navigator.clipboard.writeText(value); btn.textContent = "Copiado"; setTimeout(()=>btn.textContent="Copiar",1200); }
    catch { btn.textContent = "Selecciona el texto"; }
  }));

  // Contacto: abre Discord con mensaje preparado
  $("#contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = `Hola ${data.name}, soy ${f.get("name")}. Discord: ${f.get("discord") || "No indicado"}. Servidor: ${f.get("server") || "No indicado"}. ${f.get("message")}`;
    const url = `https://discord.com/users/${encodeURIComponent(data.discordId || defaults.discordId)}`;
    navigator.clipboard?.writeText(text);
    window.open(url, "_blank");
  });

  // Animaciones al aparecer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Estado visual de Discord.
  // Un sitio estático no puede consultar presencia privada de Discord de forma segura.
  // Se muestra estado configurable hasta conectar un backend/bot.
  const dot = $("#discordDot"), status = $("#discordStatus");
  dot?.classList.add("offline");
  if (status) status.textContent = "Discord: disponible para contacto";

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  }
})();