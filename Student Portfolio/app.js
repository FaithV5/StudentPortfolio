const body = document.body;
const themeToggle = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  if (themeToggle) themeToggle.checked = true;
}

const refreshSkyElements = () => {
  const sky = document.querySelector('.sky');
  sky.innerHTML = '';
  
  if (!body.classList.contains('dark-mode')) {
    for (let i = 0; i < 5; i++) {
      const cloud = document.createElement('div');
      cloud.classList.add('cloud');
      cloud.style.top = `${Math.random() * 50}%`;
      cloud.style.left = `${Math.random() * 100}%`;
      cloud.style.width = `${100 + Math.random() * 150}px`;
      cloud.style.height = `${60 + Math.random() * 40}px`;
      cloud.style.animationDuration = `${30 + Math.random() * 30}s`;
      cloud.style.animationDelay = `-${Math.random() * 30}s`;
      sky.appendChild(cloud);
    }
  } else {
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      sky.appendChild(star);
    }
  }
};

if (document.querySelector('.sky')) refreshSkyElements();

if (themeToggle) {
  themeToggle.addEventListener('change', function() {
    if (this.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }

    if (document.querySelector('.sky')) refreshSkyElements();
  });
}

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', (event) => {
    const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-fill');
  
  if (skillBars.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const percent = entry.target.getAttribute('data-percent');
          entry.target.style.width = `${percent}%`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
      observer.observe(bar);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  animateSkillBars();
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  const yearEls = document.querySelectorAll('#footer-year');
  if (yearEls.length) {
    const y = new Date().getFullYear();
    yearEls.forEach(el => el.textContent = y);
  }
});