/* ================================================
   PORTFOLIO — script.js
   ================================================ */

/* ── Dark / Light Theme Toggle ── */
const themeToggle = document.getElementById('themeToggle');
const htmlEl      = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});


/* ── Sticky Navbar Shadow on Scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


/* ── Hamburger / Mobile Menu ── */
const hamburger = document.getElementById('hamburger');
let   mobileOverlay;

// Create mobile overlay dynamically
function buildMobileMenu() {
  mobileOverlay = document.createElement('div');
  mobileOverlay.className = 'mobile-menu-overlay';
  mobileOverlay.id = 'mobileOverlay';

  const links = ['Home','About','Achievements','Projects','Gallery','Contact'];
  const hrefs = ['#home','#about','#achievements','#projects','#gallery','#contact'];

  links.forEach((label, i) => {
    const a = document.createElement('a');
    a.href        = hrefs[i];
    a.textContent = label;
    a.addEventListener('click', () => closeMobileMenu());
    mobileOverlay.appendChild(a);
  });

  document.body.appendChild(mobileOverlay);
}

function closeMobileMenu() {
  if (mobileOverlay) mobileOverlay.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  if (!mobileOverlay) buildMobileMenu();
  mobileOverlay.classList.toggle('open');
});


/* ── Active Nav Link on Scroll ── */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


/* ── Scroll Reveal (fade-up elements) ── */
const fadeEls = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Stagger delay for card grids
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => fadeObserver.observe(el));


/* ── Gallery Filter ── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('hidden', !match);
    });
  });
});


/* ── Gallery Lightbox ── */
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbClose   = document.getElementById('lbClose');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img     = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');

    if (img && !item.classList.contains('placeholder')) {
      lbImg.src          = img.src;
      lbImg.alt          = img.alt;
      lbCaption.textContent = caption ? caption.textContent : '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });


/* ── Contact Form (demo handler) ── */
const contactForm = document.getElementById('contactForm');
const formNote    = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled    = true;

  // Simulate send delay — connect to a real backend or Formspree as needed
  setTimeout(() => {
    formNote.textContent = '✅ Message sent! I will get back to you soon.';
    contactForm.reset();
    btn.textContent = 'Send Message ✈';
    btn.disabled    = false;
    setTimeout(() => formNote.textContent = '', 5000);
  }, 1200);
});


/* ── Smooth scroll for any hash link ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
