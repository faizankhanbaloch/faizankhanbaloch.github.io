// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .project-card, .bubble, .db-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursorTrail.style.opacity = '0.15';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorTrail.style.opacity = '0.4';
  });
});

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== TERMINAL ANIMATION =====
const terminalBody = document.getElementById('terminalBody');
const lines = [
  { type: 'cmd', text: '$ whoami' },
  { type: 'out', text: 'faizan_khan — Backend Engineer' },
  { type: 'cmd', text: '$ cat experience.json' },
  { type: 'out', text: '{ "years": 4, "domain": "Fintech & AI" }' },
  { type: 'cmd', text: '$ ./run-ssrp --optimize' },
  { type: 'ok',  text: '[OK] Query time reduced by 40%' },
  { type: 'cmd', text: '$ java -jar spring-app.jar' },
  { type: 'ok',  text: '[BOOT] Application started on port 8080' },
  { type: 'cmd', text: '$ git log --oneline -3' },
  { type: 'out', text: 'a3f21b7 feat: optimize settlement batch processing' },
  { type: 'out', text: 'c9d4e1a fix: thread-safe transaction rollback handler' },
  { type: 'out', text: '8e2f09d perf: reduce DB connection pool overhead' },
  { type: 'cmd', text: '$ echo $STATUS' },
  { type: 'ok',  text: 'Available for new opportunities ✓' },
];

let lineIdx = 0;
let charIdx = 0;
let isTypingCmd = false;
let currentEl = null;

function typeNext() {
  if (lineIdx >= lines.length) {
    // Add blinking cursor at end
    const cur = document.createElement('span');
    cur.className = 'cursor-t';
    terminalBody.appendChild(cur);
    return;
  }

  const line = lines[lineIdx];

  if (!currentEl) {
    currentEl = document.createElement('div');
    currentEl.className = line.type;
    terminalBody.appendChild(currentEl);
    charIdx = 0;
  }

  if (line.type === 'cmd') {
    // Type character by character
    if (charIdx < line.text.length) {
      currentEl.textContent = line.text.slice(0, charIdx + 1);
      charIdx++;
      terminalBody.scrollTop = terminalBody.scrollHeight;
      setTimeout(typeNext, 40 + Math.random() * 30);
    } else {
      currentEl = null;
      lineIdx++;
      setTimeout(typeNext, 120);
    }
  } else {
    // Output lines appear instantly
    currentEl.textContent = line.text;
    currentEl = null;
    lineIdx++;
    terminalBody.scrollTop = terminalBody.scrollHeight;
    setTimeout(typeNext, 80);
  }
}

// Start terminal after a brief delay
setTimeout(typeNext, 800);

// ===== INTERSECTION OBSERVER for animations =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

// Timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.index || 0) * 150;
      setTimeout(() => entry.target.classList.add('visible'), delay);
    }
  });
}, observerOptions);
timelineItems.forEach(el => timelineObserver.observe(el));

// Project cards
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.index || 0) * 100;
      setTimeout(() => entry.target.classList.add('visible'), delay);
    }
  });
}, observerOptions);
projectCards.forEach(el => projectObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const fill = bar.querySelector('.bar-fill');
      const level = bar.dataset.level;
      setTimeout(() => {
        fill.style.width = level + '%';
      }, 200);
    }
  });
}, observerOptions);
skillBars.forEach(el => skillObserver.observe(el));

// ===== COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 1500;
      const start = Date.now();
      const startVal = target > 100 ? target - 100 : 0;

      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startVal + (target - startVal) * eased);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    }
  });
}, observerOptions);
stats.forEach(el => counterObserver.observe(el));

// ===== SMOOTH ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== PARALLAX HERO GRID =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const grid = document.querySelector('.hero-bg-grid');
  if (grid) {
    grid.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ===== SECTION ENTRY FADE =====
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05 });

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  sectionObserver.observe(section);
});
