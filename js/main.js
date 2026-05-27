/* RDS Nails & Beauty — main.js */

/* ── Footer year ──────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Nav: scroll shadow + active link ────────────────── */
const nav = document.getElementById('nav');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  highlightActiveLink();
}
window.addEventListener('scroll', onScroll, { passive: true });

function highlightActiveLink() {
  const links = document.querySelectorAll('.nav__link');
  const sections = [...links]
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  let current = sections[0];
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section;
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current?.id}`);
  });
}

/* ── Mobile menu ──────────────────────────────────────── */
const burger  = document.getElementById('navBurger');
const menu    = document.getElementById('navMenu');

function toggleMenu(open) {
  burger.classList.toggle('open', open);
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}

burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')));

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

/* Close on outside click */
document.addEventListener('click', e => {
  if (menu.classList.contains('open') && !nav.contains(e.target)) {
    toggleMenu(false);
  }
});

/* Close on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('open')) toggleMenu(false);
});

/* ── Gallery filter ───────────────────────────────────── */
const filterBtns = document.querySelectorAll('.gallery__filter');
const galleryItems = document.querySelectorAll('.gallery__item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    galleryItems.forEach(item => {
      const matches = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !matches);
    });
  });
});

/* ── Scroll-in fade animations ────────────────────────── */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

/* ── Smooth anchor scroll (supplement CSS) ────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY;
    const navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h'));
    window.scrollTo({ top: top - navH, behavior: 'smooth' });
  });
});
