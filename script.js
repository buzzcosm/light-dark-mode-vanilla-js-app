const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const nav = document.getElementById('nav');
const textBox = document.getElementById('text-box');
const imageElements = document.querySelectorAll('.about-container img');

const THEME = {
  DARK: 'dark',
  LIGHT: 'light'
};

const ICON_CLASS = {
  DARK: 'fa-moon',
  LIGHT: 'fa-sun'
};

const MODE_TEXT = {
  DARK: 'Dark Mode',
  LIGHT: 'Light Mode'
};

const BG_COLORS = {
  [THEME.DARK]: {
    navBg: 'rgb(0 0 0 / 50%)',
    textBoxBg: 'rgb(255 255 255 / 50%)',
  },
  [THEME.LIGHT]: {
    navBg: 'rgb(255 255 255 / 50%)',
    textBoxBg: 'rgb(0 0 0 / 50%)',
  }
};

/**
 * Update image elements based on the current theme.
 * @param {string} theme - The current theme. Should be either 'light' or 'dark'.
 */
function updateImageMode(theme) {
  imageElements.forEach((imageElement) => {
    const imageId = imageElement.id;
    const newSrc = `img/undraw_${imageId}_${theme}.svg`;
    imageElement.src = newSrc;
  });
}

/**
 * Applies the theme settings to the page.
 * @param {boolean} isDarkMode - Whether or not the dark theme should be applied.
 */
function applyThemeSettings(isDarkMode) {
  const currentTheme = isDarkMode ? THEME.DARK : THEME.LIGHT;
  const { navBgColor, textBoxBgColor } = BG_COLORS[currentTheme];

  nav.style.backgroundColor = navBgColor;
  textBox.style.backgroundColor = textBoxBgColor;
  toggleIcon.firstElementChild.textContent = isDarkMode ? MODE_TEXT.DARK : MODE_TEXT.LIGHT;
  toggleIcon.firstElementChild.nextElementSibling.classList.replace(
    isDarkMode ? ICON_CLASS.LIGHT : ICON_CLASS.DARK,
    isDarkMode ? ICON_CLASS.DARK : ICON_CLASS.LIGHT
  );

  updateImageMode(currentTheme);
}

/**
 * Toggles the theme of the page based on the switch state.
 * @param {Event} event - The change event emitted by the switch.
 */
function toggleTheme(event) {
  const isDarkMode = event.target.checked;
  document.documentElement.dataset.theme = isDarkMode ? THEME.DARK : THEME.LIGHT;
  applyThemeSettings(isDarkMode);
  localStorage.setItem('theme', isDarkMode ? THEME.DARK : THEME.LIGHT);
}

/**
 * Loads the saved theme from local storage and applies it to the page.
 * If there is no saved theme, does nothing.
 */
function loadThemeFromStorage() {
  const savedTheme = localStorage.getItem('theme');
  if (!savedTheme) return;

  const isDarkMode = savedTheme === THEME.DARK;
  document.documentElement.dataset.theme = savedTheme;
  toggleSwitch.checked = isDarkMode;
  applyThemeSettings(isDarkMode);
}

// Event Listeners
toggleSwitch.addEventListener('change', toggleTheme);
window.addEventListener('load', loadThemeFromStorage);