/**
 * Mugilan - Automation Software Tester & QA Portfolio
 * Dynamic Section Loader and Rich Interactive & Animated UI
 */

const sectionNames = [
  'header',
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'approach',
  'workflow',
  'learning',
  'resume',
  'contact',
  'footer'
];

async function loadSections() {
  try {
    const sections = await Promise.all(
      sectionNames.map(async (name) => {
        const response = await fetch(`sections/${name}.html`);
        if (!response.ok) throw new Error(`Unable to load sections/${name}.html`);
        return [name, await response.text()];
      })
    );

    for (const [name, markup] of sections) {
      const container = document.querySelector(`[data-section="${name}"]`);
      if (container) {
        container.innerHTML = markup;
      }
    }

    initializePage();
  } catch (error) {
    console.error('Error loading sections:', error);
    const main = document.querySelector('#main-content') || document.querySelector('main');
    if (main) {
      main.innerHTML = `
        <div style="padding: 60px 20px; text-align: center; color: #ef4444;">
          <h2>Unable to load portfolio sections</h2>
          <p>Please ensure you are viewing this via the local HTTP server: <code>http://localhost:4173</code></p>
        </div>
      `;
    }
  }
}

function initializePage() {
  initThemeToggle();
  initNavigation();
  initAmbientCanvas();
  initScrollProgressBar();
  initTypewriterEffect();
  initScrollReveal();
  initCounterAnimation();
  init3DTiltAndSpotlight();
  initSkillsFilter();
  initProjectsFilter();
  initLiveAutomationRunner();
  initHeroRunner();
  initModals();
  initCopyEmail();
  initContactForm();
  initActiveScrollSpy();
  
  // Dynamic Year
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

/**
 * 1. Ambient Particle & Constellation Canvas
 * Represents interconnected test cases, microservices & quality assertions
 */
function initAmbientCanvas() {
  const canvas = document.querySelector('#qa-ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, maxDist: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 30), 46);
  for (let i = 0; i < particleCount; i++) {
    const isSpecial = i % 5 === 0;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      radius: isSpecial ? 2.5 : Math.random() * 1.5 + 1.2,
      color: Math.random() > 0.35 ? '#22c55e' : '#38bdf8',
      pulse: Math.random() * Math.PI,
      pulseSpeed: 0.03 + Math.random() * 0.02
    });
  }

  let time = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);
    time += 0.015;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw subtle halo for test nodes
      const haloRadius = p.radius + Math.sin(p.pulse) * 1.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, haloRadius + 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.color === '#22c55e' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(56, 189, 248, 0.12)';
      ctx.fill();

      // Draw core node
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Connect near particles with pipeline data traces
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();

          // Animated QA data packet traveling down the line
          const packetProgress = (time * 0.35 + i * 0.15) % 1;
          const px = p.x + (p2.x - p.x) * packetProgress;
          const py = p.y + (p2.y - p.y) * packetProgress;
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 197, 94, ${alpha * 2})`;
          ctx.fill();
        }
      }

      // Mouse interactivity: assertion test probe
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          const alpha = (1 - dist / mouse.maxDist) * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Highlight node near cursor
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 197, 94, ${alpha * 0.6})`;
          ctx.fill();
        }
      }
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/**
 * 2. Top Scroll Reading Progress Bar
 */
function initScrollProgressBar() {
  const progressBar = document.querySelector('#scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  }, { passive: true });
}

/**
 * 3. Typewriter Subtitle Animation in Hero
 */
function initTypewriterEffect() {
  const textEl = document.querySelector('#hero-typewriter');
  if (!textEl) return;

  const roles = [
    'Manual & Automation Testing',
    'Python & Playwright Automation',
    'Postman & Swagger API Testing',
    'Web & Mobile App QA',
    'Regression & Defect Tracking'
  ];

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = true;
  let pauseDuration = 2200;

  function type() {
    const currentText = roles[roleIndex];

    if (isDeleting) {
      textEl.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textEl.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 70;

    if (!isDeleting && charIndex === currentText.length) {
      speed = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 350;
    }

    setTimeout(type, speed);
  }

  setTimeout(type, 1800);
}

/**
 * 4. Scroll Reveal Intersection Observer
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll, .skill-card, .project-card, .workflow-card, .pillar-card, .learn-card, .experience-card, .terminal-card, .about-main-card, .approach-card');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 0.08}s`;
    observer.observe(el);
  });
}

/**
 * 5. Animated Number Counter on Viewport Scroll
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const duration = 1600;
        const startTime = performance.now();

        function update(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Number((easeProgress * target).toFixed(decimals)).toLocaleString('en-US', { minimumFractionDigits: decimals });

          el.textContent = `${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = `${target.toLocaleString('en-US', { minimumFractionDigits: decimals })}${suffix}`;
          }
        }

        requestAnimationFrame(update);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach((c) => observer.observe(c));
}

/**
 * 6. Interactive 3D Tilt & Cursor Spotlight
 */
function init3DTiltAndSpotlight() {
  // Only apply tilt on larger screens with fine pointer
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cards = document.querySelectorAll('.tilt-card, .skill-card, .project-card, .workflow-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Mouse Spotlight CSS variables
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D perspective tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}

/**
 * 7. Dark/Light Theme Switching
 */
function initThemeToggle() {
  const root = document.documentElement;
  const toggleBtn = document.querySelector('#theme-toggle');
  
  // Default to dark theme if not previously stored
  const savedTheme = localStorage.getItem('mugi_theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('mugi_theme', newTheme);
      showToast(`Switched to ${newTheme} mode 🌓`);
    });
  }
}

/**
 * 8. Navigation & Mobile Drawer
 */
function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('#site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
      siteNav.classList.toggle('is-open', !isExpanded);
    });

    siteNav.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        siteNav.classList.remove('is-open');
      }
    });
  }
}

/**
 * Active navigation scroll spy
 */
function initActiveScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/**
 * 9. Skills Category Filter
 */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          card.style.display = 'flex';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 10. Projects Category Filter
 */
function initProjectsFilter() {
  const tabs = document.querySelectorAll('.project-tab');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach((card) => {
        const cat = (card.getAttribute('data-category') || '').trim();
        const categories = cat.split(/\s+/);
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 11. Hero Quick Test Runner Simulator with Progress Bar & Pop Animation
 */
function initHeroRunner() {
  const btnRerun = document.querySelector('#btn-rerun-hero');
  const termOutput = document.querySelector('#hero-terminal-output');
  const progressBar = document.querySelector('#hero-progress-bar');

  if (!btnRerun || !termOutput) return;

  const sampleTests = [
    { name: 'test_login_valid_credentials()', tech: 'Python', time: '0.34s' },
    { name: 'test_api_status_code_200()', tech: 'Requests', time: '0.12s' },
    { name: 'test_form_boundary_validation()', tech: 'Playwright', time: '0.28s' },
    { name: 'test_database_crud_verification()', tech: 'SQL', time: '0.19s' }
  ];

  btnRerun.addEventListener('click', () => {
    termOutput.innerHTML = '<div class="test-row running"><span class="test-status">RUNNING</span><span class="test-name">Executing test suite in Chrome...</span></div>';
    btnRerun.disabled = true;
    if (progressBar) progressBar.style.width = '10%';

    sampleTests.forEach((test, index) => {
      setTimeout(() => {
        if (index === 0) termOutput.innerHTML = '';
        const row = document.createElement('div');
        row.className = 'test-row pass anim-pop';
        row.innerHTML = `
          <span class="test-status">PASSED</span>
          <span class="test-name">${test.name}</span>
          <span class="test-tech">${test.tech}</span>
          <span class="test-time">${test.time}</span>
        `;
        termOutput.appendChild(row);

        if (progressBar) {
          const pct = Math.round(((index + 1) / sampleTests.length) * 100);
          progressBar.style.width = `${pct}%`;
        }

        if (index === sampleTests.length - 1) {
          btnRerun.disabled = false;
          showToast('Hero suite execution complete: 4/4 Passed! ⚡');
        }
      }, (index + 1) * 350);
    });
  });
}

/**
 * 12. Live Automation Test Dashboard Runner with Animated Progress Bar
 */
function initLiveAutomationRunner() {
  const btnSmoke = document.querySelector('#run-smoke-suite');
  const btnApi = document.querySelector('#run-api-suite');
  const btnReset = document.querySelector('#reset-suite');
  const logEl = document.querySelector('#live-terminal-log');
  const statusEl = document.querySelector('#terminal-live-status');
  const progressBar = document.querySelector('#dashboard-progress-fill');

  const mPassed = document.querySelector('#metric-passed');
  const mFailed = document.querySelector('#metric-failed');
  const mSkipped = document.querySelector('#metric-skipped');
  const mRate = document.querySelector('#metric-rate');
  const mTime = document.querySelector('#metric-time');

  if (!logEl) return;

  const smokeLogs = [
    { type: 'info', text: '[INFO] Initializing Pytest test session (Chrome headless)' },
    { type: 'info', text: '[INFO] Loading Page Object Model locators for auth & checkout' },
    { type: 'success', text: '✓ tests/test_login.py::test_valid_login PASSED [0.32s]' },
    { type: 'success', text: '✓ tests/test_login.py::test_empty_password_validation PASSED [0.18s]' },
    { type: 'success', text: '✓ tests/test_checkout.py::test_cart_item_count_assertion PASSED [0.45s]' },
    { type: 'success', text: '✓ tests/test_navigation.py::test_header_links_200 PASSED [0.22s]' },
    { type: 'warning', text: 's tests/test_checkout.py::test_stripe_payment_gateway SKIPPED (sandbox config)' },
    { type: 'success', text: '✓ tests/test_db.py::test_order_records_integrity PASSED [0.29s]' },
    { type: 'highlight', text: '====== 5 passed, 1 skipped in 1.46s ======' }
  ];

  const apiLogs = [
    { type: 'info', text: '[INFO] Starting REST API validation suite via Python Requests & Swagger' },
    { type: 'info', text: '[INFO] OpenAPI Spec: /swagger/v1/swagger.json schema validation active' },
    { type: 'success', text: '✓ GET /api/v1/auth/token -> Status 200 OK PASSED [0.09s]' },
    { type: 'success', text: '✓ POST /api/v1/properties -> 201 Created + Swagger Schema Match PASSED [0.14s]' },
    { type: 'success', text: '✓ POST /api/v1/users -> Created 201 + Schema Match PASSED [0.15s]' },
    { type: 'success', text: '✓ GET /api/v1/users/1042 -> Response Body Validated PASSED [0.08s]' },
    { type: 'success', text: '✓ PUT /api/v1/users/1042 -> Updated Fields Checked PASSED [0.12s]' },
    { type: 'success', text: '✓ DELETE /api/v1/users/1042 -> Status 204 No Content PASSED [0.07s]' },
    { type: 'success', text: '✓ GET /api/v1/invalid -> Expected 404 Handled Correctly PASSED [0.06s]' },
    { type: 'highlight', text: '====== 7 passed in 0.62s (100% Swagger & Contract Success) ======' }
  ];

  function runSimulation(logs, stats, label) {
    if (statusEl) statusEl.textContent = 'RUNNING';
    logEl.innerHTML = '';
    if (progressBar) progressBar.style.width = '10%';

    logs.forEach((item, idx) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = `log-line ${item.type} anim-pop`;
        line.textContent = item.text;
        logEl.appendChild(line);
        logEl.scrollTop = logEl.scrollHeight;

        if (progressBar) {
          const pct = Math.round(((idx + 1) / logs.length) * 100);
          progressBar.style.width = `${pct}%`;
        }

        if (idx === logs.length - 1) {
          if (statusEl) statusEl.textContent = 'PASSED';
          if (mPassed) mPassed.textContent = stats.passed;
          if (mFailed) mFailed.textContent = stats.failed;
          if (mSkipped) mSkipped.textContent = stats.skipped;
          if (mRate) mRate.textContent = stats.rate;
          if (mTime) mTime.textContent = stats.time;
          showToast(`${label} completed successfully! 🚀`);
        }
      }, (idx + 1) * 220);
    });
  }

  if (btnSmoke) {
    btnSmoke.addEventListener('click', () => {
      btnSmoke.classList.add('active');
      if (btnApi) btnApi.classList.remove('active');
      runSimulation(smokeLogs, { passed: '5', failed: '0', skipped: '1', rate: '100%', time: '1.46s' }, 'Smoke Test Suite');
    });
  }

  if (btnApi) {
    btnApi.addEventListener('click', () => {
      btnApi.classList.add('active');
      if (btnSmoke) btnSmoke.classList.remove('active');
      runSimulation(apiLogs, { passed: '7', failed: '0', skipped: '0', rate: '100%', time: '0.62s' }, 'REST API Suite');
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      logEl.innerHTML = '<div class="log-line info">[INFO] Ready. Select a test suite above to initiate execution.</div>';
      if (statusEl) statusEl.textContent = 'READY';
      if (progressBar) progressBar.style.width = '0%';
      if (mPassed) mPassed.textContent = '0';
      if (mFailed) mFailed.textContent = '0';
      if (mSkipped) mSkipped.textContent = '0';
      if (mRate) mRate.textContent = '—';
      if (mTime) mTime.textContent = '0.00s';
      showToast('Simulator reset to initial state 🔄');
    });
  }

  // Trigger from project action buttons
  document.querySelectorAll('[data-action="run-demo"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const workflowSection = document.querySelector('#workflow');
      if (workflowSection) {
        workflowSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (btnSmoke) btnSmoke.click();
        }, 500);
      }
    });
  });
}

/**
 * 13. Modals System (Bug Report, Test Cases, Resume Preview)
 */
function initModals() {
  function openModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // Action Triggers
  document.querySelectorAll('[data-action="view-bug-modal"]').forEach((btn) => {
    btn.addEventListener('click', () => openModal('bug-modal'));
  });

  document.querySelectorAll('[data-action="view-testcases-modal"], [data-action="view-api-docs"]').forEach((btn) => {
    btn.addEventListener('click', () => openModal('testcases-modal'));
  });

  document.querySelectorAll('[data-action="view-property-modal"]').forEach((btn) => {
    btn.addEventListener('click', () => openModal('property-modal'));
  });

  const previewResumeBtn = document.querySelector('#preview-resume-btn');
  if (previewResumeBtn) {
    previewResumeBtn.addEventListener('click', () => openModal('resume-modal'));
  }

  // Close Buttons
  document.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      const modal = document.querySelector(`#${modalId}`);
      closeModal(modal);
    });
  });

  // Backdrop click to close
  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
  });

  // ESC key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.is-open').forEach(closeModal);
    }
  });
}

/**
 * 14. Copy Email to Clipboard
 */
function initCopyEmail() {
  const copyBtn = document.querySelector('#copy-email-btn');
  const emailText = 'Mugilanmugilan636@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailText);
        showToast('Email copied to clipboard! 📋');
        const originalText = copyBtn.querySelector('.copy-text');
        if (originalText) {
          originalText.textContent = 'Copied!';
          setTimeout(() => {
            originalText.textContent = 'Copy';
          }, 2000);
        }
      } catch {
        showToast('Email: Mugilanmugilan636@gmail.com');
      }
    });
  }
}

/**
 * 15. Contact Form Simulation & Validation
 */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  const statusEl = document.querySelector('#form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('#contact-name');
    const emailInput = document.querySelector('#contact-email');
    const messageInput = document.querySelector('#contact-message');

    let isValid = true;

    if (!nameInput.value.trim()) {
      showError('name-error', 'Please enter your name');
      isValid = false;
    } else {
      clearError('name-error');
    }

    if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
      showError('email-error', 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError('email-error');
    }

    if (!messageInput.value.trim()) {
      showError('message-error', 'Please write a brief message');
      isValid = false;
    } else {
      clearError('message-error');
    }

    if (!isValid) return;

    const submitBtn = document.querySelector('#contact-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Message...</span>';
    }

    setTimeout(() => {
      if (statusEl) {
        statusEl.className = 'form-status success';
        statusEl.innerHTML = `
          <strong>✓ Thank you, ${nameInput.value}!</strong>
          <p>Your message has been dispatched successfully. I will get back to you promptly.</p>
        `;
      }
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span> <span class="btn-icon">🚀</span>';
      }
      showToast('Message sent successfully! ✉️');
    }, 800);
  });

  function showError(id, message) {
    const el = document.querySelector(`#${id}`);
    if (el) el.textContent = message;
  }

  function clearError(id) {
    const el = document.querySelector(`#${id}`);
    if (el) el.textContent = '';
  }
}

/**
 * Toast Notification Utility
 */
function showToast(message) {
  const toast = document.querySelector('#toast-message');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

// Start loading all portfolio sections
loadSections();
