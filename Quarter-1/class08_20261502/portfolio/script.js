// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') body.setAttribute('data-theme', 'light');

themeToggle.addEventListener('click', () => {
  const isLight = body.getAttribute('data-theme') === 'light';
  body.setAttribute('data-theme', isLight ? 'dark' : 'light');
  localStorage.setItem('theme', isLight ? 'dark' : 'light');
});

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav__menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  alert(`Thank you ${data.name}! Your message has been sent.`);
  contactForm.reset();
});

// Scroll animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.style.background = window.scrollY > 50 
    ? 'rgba(10, 10, 15, 0.95)' 
    : 'rgba(10, 10, 15, 0.9)';
});
