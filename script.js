const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const nav = document.getElementById('nav');
const textBox = document.getElementById('text-box');
const imageElements = document.querySelectorAll('.about-container img');

const THEME = {
  DARK: 'dark',
  LIGHT: 'light'
};

const BG_COLORS = {
  dark: {
    navBg: 'rgb(0 0 0 / 50%)',
    textBoxBg: 'rgb(255 255 255 / 50%)',
  },
  light: {
    navBg: 'rgb(255 255 255 / 50%)',
    textBoxBg: 'rgb(0 0 0 / 50%)',
  }
};

function updateImageMode(theme) {
  imageElements.forEach((img) => {
    img.src = `img/undraw_${img.id}_${theme}.svg`;
  });
}

function applyThemeSettings(isDarkMode = false) {
  const theme = isDarkMode ? THEME.DARK : THEME.LIGHT;
  nav.style.backgroundColor = BG_COLORS[theme].navBg;
  textBox.style.backgroundColor = BG_COLORS[theme].textBoxBg;
  toggleIcon.children[0].textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
  toggleIcon.children[1].classList.replace(isDarkMode ? 'fa-sun' : 'fa-moon', isDarkMode ? 'fa-moon' : 'fa-sun');
  updateImageMode(theme);
}

function switchTheme(event) {
  const isDarkMode = event.target.checked;
  document.documentElement.setAttribute('data-theme', isDarkMode ? THEME.DARK : THEME.LIGHT);
  applyThemeSettings(isDarkMode);
  // Save theme in local storage
  localStorage.setItem('theme', isDarkMode ? THEME.DARK : THEME.LIGHT);
}

function loadThemeFromStorage() {
  const savedTheme = localStorage.getItem('theme');
  const isDarkMode = savedTheme === THEME.DARK;
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    toggleSwitch.checked = isDarkMode;
    applyThemeSettings(isDarkMode);
  }
}

// Event Listeners
toggleSwitch.addEventListener('change', switchTheme);
window.addEventListener('load', loadThemeFromStorage);