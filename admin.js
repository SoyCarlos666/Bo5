(() => {
  const DEFAULT = window.PORTFOLIO_CONFIG || {};
  const KEY = "hadessei_portfolio";
  const PASSWORD = "Hades661"; // Cambia esta contraseña antes de publicar.
  let data = JSON.parse(localStorage.getItem(KEY) || "null") || structuredClone(DEFAULT);
  const $ = s => document.querySelector(s);
  const esc = v => String(v ?? "").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

  $("#loginBtn").onclick = () => {
    if ($("#password").value === PASSWORD) {
      sessionStorage.setItem("hadessei_admin","1");
      $("#login").classList.add("hidden"); $("#app").classList.remove("hidden"); load();
    } else $("#loginError").textContent = "Contraseña incorrecta.";
  };
  $("#password").addEventListener("keydown",e=>{if(e.key==="Enter")$("#loginBtn").click()});
  if(sessionStorage.getItem("hadessei_admin")==="1"){ $("#login").classList.add("hidden"); $("#app").classList.remove("hidden"); load(); }

  document.querySelectorAll(".tab").forEach(btn=>btn.onclick=()=>{
    document.querySelectorAll(".tab,.tab-content").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active"); $("#"+btn.dataset.tab).classList.add("active");
  });

  function load(){
    $("#name").value=data.name||"";$("#avatar").value=data.avatar||"";$("#description").value=data.description||"";$("#profile").value=data.profile||"";
    $("#email").value=data.email||"";$("#discord").value=data.discord||"";$("#discordId").value=data.discordId||"";
    renderStats();renderExperience();renderSkills();
  }
  function renderStats(){
    $("#statsEditor").innerHTML=(data.stats||[]).map((x,i)=>`
      <div class="editor-card stat-card"><div class="row">
      <label>VALOR<input data-i="${i}" data-k="value" value="${esc(x.value)}"></label>
      <label>TÍTULO<input data-i="${i}" data-k="label" value="${esc(x.label)}"></label></div>
      <button class="remove" data-remove-stat="${i}">Eliminar</button></div>`).join("");
  }
  function renderExperience(){
    $("#experienceEditor").innerHTML=(data.experiences||[]).map((x,i)=>`
      <div class="editor-card"><div class="row">
      <label>SERVIDOR<input data-i="${i}" data-k="server" value="${esc(x.server)}"></label>
      <label>CARGO<input data-i="${i}" data-k="role" value="${esc(x.role)}"></label>
      <label>JUGADORES<input data-i="${i}" data-k="players" value="${esc(x.players)}"></label>
      <label>ETIQUETAS<input data-i="${i}" data-k="tags" value="${esc((x.tags||[]).join(", "))}"></label>
      <label class="full">DESCRIPCIÓN<textarea data-i="${i}" data-k="description">${esc(x.description)}</textarea></label></div>
      <button class="remove" data-remove-exp="${i}">Eliminar</button></div>`).join("");
  }
  function renderSkills(){
    $("#skillsEditor").innerHTML=(data.skills||[]).map((x,i)=>`
      <div class="editor-card"><div class="row">
      <label>ICONO<input data-i="${i}" data-k="icon" value="${esc(x.icon)}"></label>
      <label>TÍTULO<input data-i="${i}" data-k="title" value="${esc(x.title)}"></label>
      <label class="full">DESCRIPCIÓN<textarea data-i="${i}" data-k="text">${esc(x.text)}</textarea></label></div>
      <button class="remove" data-remove-skill="${i}">Eliminar</button></div>`).join("");
  }

  document.addEventListener("input",e=>{
    const el=e.target;if(el.dataset.i===undefined)return;
    const i=+el.dataset.i,k=el.dataset.k;
    if(el.closest("#statsEditor"))data.stats[i][k]=el.value;
    if(el.closest("#experienceEditor"))data.experiences[i][k]=k==="tags"?el.value.split(",").map(x=>x.trim()).filter(Boolean):el.value;
    if(el.closest("#skillsEditor"))data.skills[i][k]=el.value;
  });
  document.addEventListener("click",e=>{
    if(e.target.dataset.removeStat){data.stats.splice(+e.target.dataset.removeStat,1);renderStats()}
    if(e.target.dataset.removeExp){data.experiences.splice(+e.target.dataset.removeExp,1);renderExperience()}
    if(e.target.dataset.removeSkill){data.skills.splice(+e.target.dataset.removeSkill,1);renderSkills()}
  });
  $("#addStat").onclick=()=>{data.stats.push({value:"0+",label:"NUEVA MÉTRICA"});renderStats()};
  $("#addExperience").onclick=()=>{data.experiences.push({server:"Nuevo servidor",role:"Cargo",players:"0+ Jugadores",description:"Descripción de la experiencia.",tags:["Gestión"]});renderExperience()};
  $("#addSkill").onclick=()=>{data.skills.push({icon:"◆",title:"Nueva habilidad",text:"Descripción de la habilidad."});renderSkills()};

  $("#saveBtn").onclick=()=>{
    data.name=$("#name").value;data.avatar=$("#avatar").value;data.description=$("#description").value;data.profile=$("#profile").value;
    data.email=$("#email").value;data.discord=$("#discord").value;data.discordId=$("#discordId").value;
    localStorage.setItem(KEY,JSON.stringify(data));toast("Cambios guardados en este navegador.");
  };
  $("#resetBtn").onclick=()=>{
    if(confirm("¿Restaurar la configuración original?")){data=structuredClone(DEFAULT);localStorage.removeItem(KEY);load();toast("Configuración restaurada.");}
  };
  function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)}
})();