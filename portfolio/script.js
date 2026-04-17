/* ============================================================
   PORTFOLIO JAVASCRIPT
   Neural canvas · Scroll animations · Typewriter · Chatbot
   ============================================================ */

/* ── NEURAL NETWORK CANVAS ───────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const GOLD   = 'rgba(201, 168, 76,';
  const TEAL   = 'rgba(61, 214, 196,';
  const WHITE  = 'rgba(232, 237, 245,';
  const PARTICLE_COUNT = 75;
  const CONNECT_DIST   = 160;

  let W, H, mouse = { x: -9999, y: -9999 };
  let particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x   = Math.random() * (W || window.innerWidth);
      this.y   = initial ? Math.random() * (H || window.innerHeight)
                         : (Math.random() > 0.5 ? -8 : (H || window.innerHeight) + 8);
      this.vx  = (Math.random() - 0.5) * 0.45;
      this.vy  = (Math.random() - 0.5) * 0.35;
      this.r   = 1.5 + Math.random() * 2;
      const pick = Math.random();
      this.color = pick < 0.4 ? GOLD : pick < 0.75 ? TEAL : WHITE;
      this.alpha = 0.3 + Math.random() * 0.5;
    }
    update() {
      // Subtle repulsion from mouse
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 1.2;
        this.y += (dy / dist) * force * 1.2;
      }
      this.x += this.vx;
      this.y += this.vy;
      // Wrap
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10;
      if (this.y > H + 10) this.y = -10;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i], p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const a = (1 - dist / CONNECT_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          // Pick line color based on proximity
          const blendColor = dist < CONNECT_DIST * 0.5 ? GOLD : TEAL;
          ctx.strokeStyle = blendColor + a + ')';
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }
  }

  let animId;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener('resize', () => { resize(); });
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -9999; mouse.y = -9999;
  });
})();


/* ── NAVBAR SCROLL EFFECT ────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


/* ── MOBILE NAV TOGGLE ───────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});


/* ── TYPEWRITER EFFECT ───────────────────────────────────── */
(function typewriter() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const words = [
    'Operations Research',
    'Evolutionary Game Theory',
    'Multi-Agent RL',
    'Bayesian Optimization',
    'Deep Learning',
    'Metaheuristics',
  ];

  let wi = 0, ci = 0, deleting = false;
  const SPEED_TYPE   = 65;
  const SPEED_DELETE = 35;
  const PAUSE_END    = 1800;
  const PAUSE_START  = 300;

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
    }
    setTimeout(tick, deleting ? SPEED_DELETE : SPEED_TYPE);
  }

  setTimeout(tick, 1200);
})();


/* ── SCROLL REVEAL ───────────────────────────────────────── */
(function scrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
})();


/* ── PUBLICATION TABS ────────────────────────────────────── */
document.querySelectorAll('.pub-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pub-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.pub-list').forEach(l => l.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById('tab-' + tab.dataset.tab);
    if (target) {
      target.classList.add('active');
      // Re-trigger reveal for newly shown items
      target.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 50);
      });
    }
  });
});


/* ── SMOOTH SCROLL OFFSET ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-height')) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── CHATBOT ─────────────────────────────────────────────── */
(function initChatbot() {
  const toggle    = document.getElementById('chatbot-toggle');
  const panel     = document.getElementById('chatbot-panel');
  const closeBtn  = document.getElementById('chatbot-close-btn');
  const input     = document.getElementById('chatbot-input');
  const sendBtn   = document.getElementById('chatbot-send');
  const messages  = document.getElementById('chatbot-messages');
  const iconOpen  = document.getElementById('chat-icon-open');
  const iconClose = document.getElementById('chat-icon-close');

  if (!toggle) return;

  let isOpen = false;
  let chatHistory = [];

  function openPanel() {
    isOpen = true;
    panel.classList.add('open');
    iconOpen.style.display  = 'none';
    iconClose.style.display = 'block';
    input.focus();
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('open');
    iconOpen.style.display  = 'block';
    iconClose.style.display = 'none';
  }

  toggle.addEventListener('click', () => isOpen ? closePanel() : openPanel());
  closeBtn.addEventListener('click', closePanel);

  function addMsg(text, role) {
    const div = document.createElement('div');
    div.className = 'msg msg-' + (role === 'user' ? 'user' : 'bot');
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function addTyping() {
    const div = document.createElement('div');
    div.className = 'msg msg-bot msg-typing';
    div.id = 'typing-indicator';
    div.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typing-indicator');
    if (t) t.remove();
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;

    addMsg(text, 'user');
    chatHistory.push({ role: 'user', content: text });
    addTyping();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      });

      removeTyping();

      if (!response.ok) throw new Error('Request failed');

      const data = await response.json();
      const reply = data.response || "I'm sorry, I couldn't get a response. Please try again.";
      addMsg(reply, 'bot');
      chatHistory.push({ role: 'assistant', content: reply });
    } catch (err) {
      removeTyping();
      addMsg('Sorry, something went wrong. Please email hassansiddique632@gmail.com directly.', 'bot');
    }

    sendBtn.disabled = false;
    input.focus();
  }

  sendBtn.addEventListener('click', sendMessage);

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  });
})();


/* ── ACTIVE NAV HIGHLIGHT ON SCROLL ─────────────────────── */
(function activeNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  function update() {
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        links.forEach(a => {
          a.classList.toggle(
            'active-nav',
            a.getAttribute('href') === '#' + sec.id
          );
        });
      }
    });
  }

  window.addEventListener('scroll', update, { passive: true });
})();


/* ── SCROLL PROGRESS BAR ─────────────────────────────────── */
(function scrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();


/* ── BACK TO TOP BUTTON ──────────────────────────────────── */
(function backToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
