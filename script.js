const cfg=window.PORTFOLIO_CONFIG||{};const name=cfg.name||"Imalafama66";document.querySelectorAll("[data-name]").forEach(e=>e.textContent=name);document.title=`${name} | ${cfg.role||"Staff Manager"}`;
const cursor=document.querySelector(".cursor-glow");window.addEventListener("mousemove",e=>{cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px"});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));
const progress=document.getElementById("progress");window.addEventListener("scroll",()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/h*100)+"%";document.getElementById("navbar").style.boxShadow=scrollY>20?"0 10px 40px rgba(0,0,0,.18)":"none"});
document.getElementById("year").textContent=new Date().getFullYear();
const menu=document.getElementById("menuBtn"),nav=document.getElementById("nav");menu.addEventListener("click",()=>nav.classList.toggle("open"));nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.querySelectorAll(".skill em").forEach(e=>{const w=e.style.width;e.style.width="0";setTimeout(()=>e.style.width=w,500)});
