// Theme toggle (light/dark via data-theme attr)
const toggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
document.documentElement.dataset.theme = theme;
toggle.setAttribute('aria-pressed', theme === 'dark');

toggle.addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  toggle.setAttribute('aria-pressed', (!isDark).toString());
});

// Project filter
const tabs = document.querySelectorAll('.chip-tab');
const cards = document.querySelectorAll('.project-card');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    cards.forEach(c => {
      const show = filter === 'all' || c.dataset.tags.includes(filter);
      c.style.display = show ? '' : 'none';
    });
  });
});
