/**
 * TERMINAL NOIR - Portfolio JavaScript
 * Custom cursor, theme toggle, animations, and interactions
 */

// ═══════════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════════

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor--follower');

if (cursor && cursorFollower && window.innerWidth > 768) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor animation
  const animateCursor = () => {
    // Main cursor - quick follow
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    // Follower - slower, smoother
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;

    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Hover effects
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-card, .stat');
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor--hover');
      cursorFollower.classList.add('cursor--hover');
    });
    target.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor--hover');
      cursorFollower.classList.remove('cursor--hover');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
  });
}

// ═══════════════════════════════════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════════════════════════════════

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle__icon');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  body.setAttribute('data-theme', 'light');
  if (themeIcon) themeIcon.textContent = '◑';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = body.getAttribute('data-theme') === 'light';
    body.setAttribute('data-theme', isLight ? 'dark' : 'light');
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
    if (themeIcon) themeIcon.textContent = isLight ? '◐' : '◑';
  });
}

// ═══════════════════════════════════════════════════════════════
// MOBILE NAVIGATION
// ═══════════════════════════════════════════════════════════════

const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

if (navToggle && navMenu) {
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

  // Close menu on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (Math.abs(currentScroll - lastScroll) > 50) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      lastScroll = currentScroll;
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      const navHeight = 70;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════════════════════════

const animateCounter = (element, target) => {
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(updateCounter);
};

// ═══════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS (Intersection Observer)
// ═══════════════════════════════════════════════════════════════

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');

      // Counter animation for stats
      if (entry.target.classList.contains('stat')) {
        const counter = entry.target.querySelector('.stat__number');
        if (counter && counter.dataset.count) {
          animateCounter(counter, parseInt(counter.dataset.count));
        }
      }

      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-card, .project-card, .stat, .section__header').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.classList.add(`delay-${(index % 5) + 1}`);
  animateOnScroll.observe(el);
});

// ═══════════════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════════════

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Loading state
    submitBtn.innerHTML = '<span class="btn__text">$ sending...</span>';
    submitBtn.disabled = true;

    // Simulate sending (replace with actual form submission)
    setTimeout(() => {
      submitBtn.innerHTML = '<span class="btn__text">✓ message sent!</span>';
      submitBtn.style.background = '#28c840';
      submitBtn.style.borderColor = '#28c840';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}

// ═══════════════════════════════════════════════════════════════
// LOCAL TIME DISPLAY
// ═══════════════════════════════════════════════════════════════

const updateLocalTime = () => {
  const timeElement = document.getElementById('local-time');
  if (timeElement) {
    const now = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Karachi',
      hour12: false
    };
    timeElement.textContent = `PKT ${now.toLocaleTimeString('en-US', options)}`;
  }
};

updateLocalTime();
setInterval(updateLocalTime, 60000);

// ═══════════════════════════════════════════════════════════════
// NAVBAR SCROLL EFFECT
// ═══════════════════════════════════════════════════════════════

const nav = document.querySelector('.nav');

if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.borderBottomColor = 'var(--accent-primary)';
      nav.style.boxShadow = '0 4px 30px rgba(0, 255, 200, 0.1)';
    } else {
      nav.style.borderBottomColor = 'var(--border-subtle)';
      nav.style.boxShadow = 'none';
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// TYPING EFFECT FOR HERO (Optional enhancement)
// ═══════════════════════════════════════════════════════════════

const typeWriter = (element, text, speed = 50) => {
  let i = 0;
  element.textContent = '';

  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };

  type();
};

// ═══════════════════════════════════════════════════════════════
// PARALLAX EFFECT FOR GRID BACKGROUND
// ═══════════════════════════════════════════════════════════════

const gridBg = document.querySelector('.hero__grid-bg');

if (gridBg && window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    gridBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  });
}

// ═══════════════════════════════════════════════════════════════
// KEYBOARD NAVIGATION
// ═══════════════════════════════════════════════════════════════

document.addEventListener('keydown', (e) => {
  // ESC to close mobile menu
  if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }

  // Tab key - show focus styles
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Add loaded class for initial animations
  document.body.classList.add('loaded');

  // Stagger hero animations
  const heroElements = document.querySelectorAll('.terminal__line, .hero__title, .hero__subtitle, .hero__description, .hero__buttons');
  heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.transitionDelay = `${i * 0.1}s`;

    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  });
});

console.log('%c[zaib_] Portfolio loaded successfully', 'color: #00ffc8; font-family: monospace; font-size: 14px;');
