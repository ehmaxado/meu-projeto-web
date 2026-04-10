const THEME_STORAGE_KEY = 'site-theme';
const DEFAULT_THEME = 'default';
const AVAILABLE_THEMES = ['default', 'sunset', 'forest'];

function getStoredTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (AVAILABLE_THEMES.includes(savedTheme)) {
    return savedTheme;
  }

  return DEFAULT_THEME;
}

export function applyTheme(themeName) {
  const theme = AVAILABLE_THEMES.includes(themeName)
    ? themeName
    : DEFAULT_THEME;

  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  const selectors = document.querySelectorAll('[data-theme-select]');
  selectors.forEach((selector) => {
    selector.value = theme;
  });
}

export function initTheme() {
  const theme = getStoredTheme();
  applyTheme(theme);

  const selectors = document.querySelectorAll('[data-theme-select]');
  selectors.forEach((selector) => {
    selector.value = theme;
    selector.addEventListener('change', (event) => {
      applyTheme(event.target.value);
    });
  });
}
