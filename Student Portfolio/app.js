// Shared UI behavior: theme toggle, sky decorations, skill-bar animation, and mobile menu
(function(){
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');
  const sky = document.querySelector('.sky');
  const STORAGE_KEY = 'theme';

  function random(min,max){ return Math.random()*(max-min)+min }

  function createClouds(count=6){
    removeClouds();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    for(let i=0;i<count;i++){
      const c = document.createElement('div'); c.className='cloud ' + (Math.random()>.5? 'cloud-ltr':'cloud-rtl');
      const size = Math.floor(random(80,260));
      c.style.width = size + 'px'; c.style.height = (size*0.5)+'px';
      c.style.top = random(4,48) + '%';
      c.style.left = Math.floor(random(-40,100)) + 'vw';
      c.style.opacity = String(random(0.6,0.98));
      c.style.animationDuration = (random(35,95)) + 's';
      c.style.animationTimingFunction = 'linear';
      c.style.animationDelay = (random(-40,40)) + 's';
      if(reduced) c.style.animation = 'none';
      c.style.zIndex = 0;
      const b = document.createElement('div'); b.style.cssText='position:absolute;left:12%;top:-12%;width:65%;height:120%;background:inherit;border-radius:50%';
      const a = document.createElement('div'); a.style.cssText='position:absolute;right:8%;top:-6%;width:36%;height:80%;background:inherit;border-radius:50%';
      c.appendChild(b); c.appendChild(a);
      if(sky) sky.appendChild(c);
    }
  }

  function removeClouds(){ if(sky) Array.from(sky.querySelectorAll('.cloud')).forEach(n=>n.remove()); }
  function createStars(count=60){
    removeStars();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    for(let i=0;i<count;i++){
      const s=document.createElement('div'); s.className='star';
      s.style.left = random(2,98)+'%'; s.style.top = random(2,60)+'%';
      s.style.width = s.style.height = (Math.random()*2+.8)+'px';
      s.style.opacity = String(random(0.4,0.95));
      s.style.animation = reduced? 'none' : `twinkle ${random(3,9)}s ease-in-out ${random(0,3)}s infinite`;
      if(sky) sky.appendChild(s);
    }
  }
  function removeStars(){ if(sky) Array.from(sky.querySelectorAll('.star')).forEach(n=>n.remove()); }

  function setMode(dark){
    if(dark){ body.classList.add('dark-mode'); if(toggle) toggle.checked = true; createStars(90); removeClouds(); }
    else { body.classList.remove('dark-mode'); if(toggle) toggle.checked = false; createClouds(8); removeStars(); }
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if(saved==='dark') setMode(true);
  else if(saved==='light') setMode(false);
  else setMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if(toggle){
    toggle.addEventListener('change', ()=>{
      const isDark = toggle.checked;
      setMode(isDark);
      localStorage.setItem(STORAGE_KEY, isDark? 'dark':'light');
    });

    toggle.addEventListener('change', ()=>{
      if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const label = toggle.closest('.theme-switch');
      if(!label) return;
      label.classList.add('input-toggled');
      setTimeout(()=> label.classList.remove('input-toggled'), 420);
    });
  }

  // animate skill bars if present on this page
  const skills = document.querySelectorAll('.skill-fill');
  if(skills.length){
    if('IntersectionObserver' in window){
      const obs = new IntersectionObserver(entries=>{
        entries.forEach(e=>{
          if(e.isIntersecting){ const el = e.target; const pct = Number(el.dataset.percent)||0; el.style.width = pct + '%'; el.setAttribute('aria-valuenow', String(pct)); obs.unobserve(el); }
        });
      },{threshold:0.25});
      skills.forEach(s=>obs.observe(s));
    } else { skills.forEach(s=>{ const pct=Number(s.dataset.percent)||0; s.style.width=pct+'%'; s.setAttribute('aria-valuenow',String(pct)); }); }
  }

  if(!document.body.classList.contains('dark-mode')) createClouds(8);

  // small entrance reveal for sections
  document.querySelectorAll('section').forEach(sec=>{ sec.classList.add('reveal'); setTimeout(()=>sec.classList.add('show'),60); });

  // mobile menu handlers (if menu toggle exists)
  const menuToggle = document.querySelector('.menu-toggle');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const sidebar = document.getElementById('sidebar');
  function openSidebar(){ document.body.classList.add('sidebar-open'); if(menuToggle) menuToggle.setAttribute('aria-expanded','true'); if(sidebar) sidebar.setAttribute('aria-hidden','false'); }
  function closeSidebar(){ document.body.classList.remove('sidebar-open'); if(menuToggle) menuToggle.setAttribute('aria-expanded','false'); if(sidebar) sidebar.setAttribute('aria-hidden','true'); }
  if(menuToggle){
    menuToggle.addEventListener('click', ()=>{ if(document.body.classList.contains('sidebar-open')) closeSidebar(); else openSidebar(); });
  }
  if(backdrop){ backdrop.addEventListener('click', closeSidebar); }
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && document.body.classList.contains('sidebar-open')) closeSidebar(); });

  // mark active nav link in topbar
  try{
    const links = document.querySelectorAll('.nav-links-top a');
    const path = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(a=>{ const href = a.getAttribute('href') || ''; if(href.split('/').pop() === path) a.classList.add('active'); });
  }catch(e){ /* ignore on pages without nav */ }

})();
