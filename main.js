/* ═══════════════════════════════════════
   BOAT · MAIN JS
═══════════════════════════════════════ */

// ── THEME ──
const root = document.documentElement;
const saved = localStorage.getItem('boat-theme') || 'dark';
root.setAttribute('data-theme', saved);
function setTheme(t){root.setAttribute('data-theme',t);localStorage.setItem('boat-theme',t);document.querySelectorAll('.theme-btn,.theme-btn-drawer').forEach(b=>{b.textContent=t==='dark'?'☀️':'🌙';});}
setTheme(saved);
document.addEventListener('click',e=>{
  if(e.target.closest('.theme-btn,.theme-btn-drawer')){
    setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark');
  }
});

// ── RTL ──
const savedDir = localStorage.getItem('boat-dir')||'ltr';
root.setAttribute('dir',savedDir);
function setDir(d){root.setAttribute('dir',d);localStorage.setItem('boat-dir',d);document.querySelectorAll('.rtl-btn,.rtl-btn-drawer').forEach(b=>{const lbl=b.querySelector('.rtl-lbl');if(lbl)lbl.textContent=d==='rtl'?'LTR':'RTL';});}
setDir(savedDir);
document.addEventListener('click',e=>{
  if(e.target.closest('.rtl-btn,.rtl-btn-drawer')){
    setDir(root.getAttribute('dir')==='rtl'?'ltr':'rtl');
  }
});

// ── CURSOR ──
const cur=document.querySelector('.cursor'),ring=document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;
if(cur&&ring){
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function tick(){if(cur){cur.style.left=mx+'px';cur.style.top=my+'px';}rx+=(mx-rx)*.1;ry+=(my-ry)*.1;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px';}requestAnimationFrame(tick);})();
  document.querySelectorAll('a,button,.card,.blog-card,.pricing-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.style.width='18px';cur.style.height='18px';ring.style.width='50px';ring.style.height='50px';});
    el.addEventListener('mouseleave',()=>{cur.style.width='10px';cur.style.height='10px';ring.style.width='32px';ring.style.height='32px';});
  });
}

// ── HAMBURGER / DRAWER ──
const ham=document.querySelector('.hamburger'),drawer=document.querySelector('.drawer'),overlay=document.querySelector('.drawer-overlay'),dClose=document.querySelector('.drawer-close');
function openDrawer(){if(!drawer)return;drawer.classList.add('open');overlay&&overlay.classList.add('show');const spans=ham&&ham.querySelectorAll('span');if(spans){spans[0].style.transform='rotate(45deg) translate(5px,5px)';spans[1].style.opacity='0';spans[2].style.transform='rotate(-45deg) translate(5px,-5px)';}}
function closeDrawer(){if(!drawer)return;drawer.classList.remove('open');overlay&&overlay.classList.remove('show');const spans=ham&&ham.querySelectorAll('span');if(spans){spans.forEach(s=>{s.style.transform='';s.style.opacity='';});}}
ham&&ham.addEventListener('click',openDrawer);
dClose&&dClose.addEventListener('click',closeDrawer);
overlay&&overlay.addEventListener('click',closeDrawer);
drawer&&drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeDrawer));

// ── SCROLL REVEAL ──
const reveals=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const revObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revObs.unobserve(e.target);}});},{threshold:.1});
reveals.forEach(el=>revObs.observe(el));

// ── BACK TO TOP ──
const btt=document.querySelector('.btt');
window.addEventListener('scroll',()=>{btt&&btt.classList.toggle('show',window.scrollY>400);});
btt&&btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// ── ACTIVE NAV ──
const page=window.location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-links a,.drawer-links a,.sidebar-nav a').forEach(a=>{if(a.getAttribute('href')===page)a.classList.add('active');});

// ── COUNTER ANIMATION ──
function animCount(el){
  const target=+el.getAttribute('data-target');
  const suffix=el.getAttribute('data-suffix')||'';
  let n=0;const step=target/60;
  const t=setInterval(()=>{n=Math.min(n+step,target);el.textContent=Math.floor(n)+suffix;if(n>=target)clearInterval(t);},20);
}
const cntObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){animCount(e.target);cntObs.unobserve(e.target);}});},{threshold:.5});
document.querySelectorAll('[data-target]').forEach(el=>cntObs.observe(el));

// ── TYPEWRITER ──
function typewriter(el){
  const text=el.getAttribute('data-type')||el.textContent;
  el.textContent='';let i=0;
  const iv=setInterval(()=>{el.textContent+=text[i++];if(i>=text.length)clearInterval(iv);},55);
}
const tyObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){typewriter(e.target);tyObs.unobserve(e.target);}});},{threshold:.5});
document.querySelectorAll('[data-typewrite]').forEach(el=>tyObs.observe(el));

// ── PARALLAX HERO ──
const hero=document.querySelector('.hero');
window.addEventListener('scroll',()=>{if(hero)hero.style.backgroundPositionY=(window.scrollY*.35)+'px';});

// ── CONTACT FORM ──
const cf=document.querySelector('#contact-form');
if(cf){cf.addEventListener('submit',e=>{e.preventDefault();const btn=cf.querySelector('button[type=submit]');const orig=btn.innerHTML;btn.innerHTML='<span>✓ Message Sent!</span>';btn.style.background='#22c55e';setTimeout(()=>{btn.innerHTML=orig;btn.style.background='';cf.reset();},3000);});}

// ── BLOG FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn=>{btn.addEventListener('click',function(){document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');const f=this.dataset.filter;document.querySelectorAll('.blog-card').forEach(c=>{c.style.display=f==='all'||c.dataset.cat===f?'':'none';});});});

// ── DASHBOARD SIDEBAR (mobile) ──
const sbt=document.querySelector('.sidebar-toggle'),dsb=document.querySelector('.dash-sidebar');
sbt&&sbt.addEventListener('click',()=>dsb&&dsb.classList.toggle('open'));

// ── PROGRESS BARS ANIMATE ──
const pbObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const fill=e.target.querySelector('.progress-fill');if(fill){fill.style.width=fill.getAttribute('data-width')||'0%';}pbObs.unobserve(e.target);}});},{threshold:.3});
document.querySelectorAll('.progress-bar').forEach(el=>pbObs.observe(el));

// ── VIDEO MODAL ──
const modal=document.querySelector('.modal-wrap');
const modalClose=document.querySelector('.modal-close');
document.querySelectorAll('[data-modal]').forEach(btn=>{btn.addEventListener('click',()=>modal&&modal.classList.add('open'));});
modalClose&&modalClose.addEventListener('click',()=>modal&&modal.classList.remove('open'));
modal&&modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open');});

// ── CALENDAR (dashboard) ──
function buildCalendar(){
  const grid=document.querySelector('.cal-grid');
  if(!grid)return;
  const now=new Date();const today=now.getDate();
  const daysInMonth=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();
  const firstDay=new Date(now.getFullYear(),now.getMonth(),1).getDay();
  grid.innerHTML='';
  for(let i=0;i<firstDay;i++){const d=document.createElement('div');d.className='cal-day';d.style.opacity='.2';grid.appendChild(d);}
  const appts=[5,12,18,24,28];
  for(let d=1;d<=daysInMonth;d++){
    const div=document.createElement('div');div.className='cal-day';
    if(d===today)div.classList.add('today');
    if(appts.includes(d))div.classList.add('has-appt');
    div.textContent=d;grid.appendChild(div);
  }
}
buildCalendar();

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-item').forEach(item=>{
  const q=item.querySelector('.faq-q');
  q&&q.addEventListener('click',()=>{
    const isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!isOpen)item.classList.add('open');
  });
});

// ── PRICING TOGGLE ──
const pToggle=document.querySelector('.price-toggle');
pToggle&&pToggle.addEventListener('click',()=>{
  pToggle.classList.toggle('annual');
  const isAnnual=pToggle.classList.contains('annual');
  document.querySelectorAll('.price-amount').forEach(el=>{
    el.textContent=isAnnual?el.dataset.annual:el.dataset.monthly;
  });
});
