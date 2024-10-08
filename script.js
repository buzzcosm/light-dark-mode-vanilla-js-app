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

// Update images based on the current theme
function updateImageMode(theme) {
  imageElements.forEach((img) => {
    img.src = `img/undraw_${img.id}_${theme}.svg`;
  });
}

// Apply theme settings to the page
function applyThemeSettings(isDarkMode = false) {
  const theme = isDarkMode ? THEME.DARK : THEME.LIGHT;
  const { navBg, textBoxBg } = BG_COLORS[theme];

  nav.style.backgroundColor = navBg;
  textBox.style.backgroundColor = textBoxBg;
  toggleIcon.children[0].textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
  toggleIcon.children[1].classList.replace(
    isDarkMode ? ICON_CLASS.LIGHT : ICON_CLASS.DARK,
    isDarkMode ? ICON_CLASS.DARK : ICON_CLASS.LIGHT
  );

  updateImageMode(theme);
}

// Toggle theme based on switch state
function switchTheme(event) {
  const isDarkMode = event.target.checked;
  document.documentElement.setAttribute('data-theme', isDarkMode ? THEME.DARK : THEME.LIGHT);
  applyThemeSettings(isDarkMode);
  localStorage.setItem('theme', isDarkMode ? THEME.DARK : THEME.LIGHT); // Save theme in local storage
}

function loadThemeFromStorage() {
  const savedTheme = localStorage.getItem('theme');
  if (!savedTheme) return; // Early return if no theme is saved

  const isDarkMode = savedTheme === THEME.DARK;
  document.documentElement.setAttribute('data-theme', savedTheme);
  toggleSwitch.checked = isDarkMode;
  applyThemeSettings(isDarkMode);
}

// Event Listeners
toggleSwitch.addEventListener('change', switchTheme);
window.addEventListener('load', loadThemeFromStorage);