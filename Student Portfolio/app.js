// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme') || 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.checked = true;
}

// Function to refresh sky elements
const refreshSkyElements = () => {
  const sky = document.querySelector('.sky');
  // Clear existing elements
  sky.innerHTML = '';
  
  // Add clouds for light mode
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
    // Add stars for dark mode
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

// Initialize sky elements on page load
refreshSkyElements();

// Toggle theme with sky refresh
themeToggle.addEventListener('change', function() {
  if (this.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
  
  // Refresh sky elements when theme changes
  refreshSkyElements();
});

// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
  const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
  if (!isClickInsideNav && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Animate skill bars when they come into view
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  animateSkillBars();
  
  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
