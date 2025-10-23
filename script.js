// Theme toggle (light/dark via data-theme attr) — dark-first default
const toggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'dark'); // force dark-first
document.documentElement.dataset.theme = theme;
toggle.setAttribute('aria-pressed', theme === 'dark');

toggle.addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme === 'dark';
  const next = isDark ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  toggle.setAttribute('aria-pressed', (!isDark).toString());
});

// Project filter (tabs)
const tabs = document.querySelectorAll('.chip-tab');
const cards = document.querySelectorAll('.project-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const filter = tab.dataset.filter;
    cards.forEach(c => {
      const show = filter === 'all' || c.dataset.tags.includes(filter);
      c.style.display = show ? '' : 'none';
    });
  });
});

// Smooth-scroll for internal anchors (reduced motion respect)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      }
    }
  });
});
