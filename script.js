/* ─── PARTICLE CANVAS ─── */
(function () {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  const COUNT = 75;
  const MAX_DIST = 130;
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = Math.max(window.innerHeight, document.getElementById('home').offsetHeight);
  }

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.r = Math.random() * 1.4 + 0.4;
    this.alpha = Math.random() * 0.45 + 0.15;
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  };

  function init() {
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.update();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
      ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,212,255,${0.07 * (1 - d / MAX_DIST)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ─── TYPING EFFECT ─── */
(function () {
  const roles = [
    'MERN Stack Developer',
    'Data Science Researcher',
    'Full-Stack Engineer',
    'Computer Vision Enthusiast',
    'Problem Solver',
  ];
  const el = document.querySelector('.typed-text');
  let rIdx = 0, cIdx = 0, deleting = false;

  function tick() {
    const word = roles[rIdx];
    if (!deleting) {
      el.textContent = word.slice(0, cIdx + 1);
      cIdx++;
      if (cIdx === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 95);
    } else {
      el.textContent = word.slice(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        rIdx = (rIdx + 1) % roles.length;
      }
      setTimeout(tick, deleting ? 55 : 95);
    }
  }
  tick();
})();

/* ─── SCROLL REVEAL ─── */
(function () {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
})();

/* ─── NAVBAR SCROLL ─── */
(function () {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* ─── HAMBURGER ─── */
(function () {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
})();

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) cur = sec.id;
    });
    links.forEach((l) => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
    });
  }, { passive: true });
})();

/* ─── CONTACT FORM ─── */
(function () {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim() || 'Portfolio Contact';
    const message = form.querySelector('#message').value.trim();
    const body    = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = `mailto:hrikeshkumar145@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
})();

/* ─── FOOTER YEAR ─── */
document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ─── STAGGERED REVEAL DELAY ─── */
(function () {
  const grids = ['.skills-grid', '.projects-grid', '.awards-grid', '.research-grid'];
  grids.forEach((sel) => {
    const parent = document.querySelector(sel);
    if (!parent) return;
    parent.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`;
    });
  });
})();
