const THEME_STORAGE_KEY = 'site-theme';
const DEFAULT_THEME = 'default';
const AVAILABLE_THEMES = ['default', 'sunset', 'forest', 'dark'] as const;

type ThemeName = (typeof AVAILABLE_THEMES)[number];

const isThemeName = (value: string | null): value is ThemeName =>
  AVAILABLE_THEMES.includes(value as ThemeName);

const getThemeSelectors = (): NodeListOf<HTMLSelectElement> =>
  document.querySelectorAll<HTMLSelectElement>('[data-theme-select]');

const getStoredTheme = (): ThemeName => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeName(savedTheme) ? savedTheme : DEFAULT_THEME;
};

export const applyTheme = (themeName: string): void => {
  const theme = isThemeName(themeName) ? themeName : DEFAULT_THEME;

  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  getThemeSelectors().forEach((selector) => {
    selector.value = theme;
  });
};

export const initTheme = (): void => {
  const theme = getStoredTheme();
  applyTheme(theme);

  getThemeSelectors().forEach((selector) => {
    selector.value = theme;
    selector.addEventListener('change', ({ currentTarget }) => {
      const target = currentTarget as HTMLSelectElement | null;
      applyTheme(target?.value ?? DEFAULT_THEME);
    });
  });
};
