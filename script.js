// GUI Elements
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const nav = document.getElementById('nav');
const textBox = document.getElementById('text-box');
const imageElements = document.querySelectorAll('.about-container img');

// Color constants for dark and light mode
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

function applyThemeSettings({isDark = false}) {
  const theme = isDark ? 'dark' : 'light';
  nav.style.backgroundColor = BG_COLORS[theme].navBg;
  textBox.style.backgroundColor = BG_COLORS[theme].textBoxBg;
  toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
  toggleIcon.children[1].classList.replace(isDark ? 'fa-sun' : 'fa-moon', isDark ? 'fa-moon' : 'fa-sun');
  updateImageMode(theme);
}

function switchTheme(event) {
  const isDark = event.target.checked;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Save theme in Local Storage
  applyThemeSettings(isDark);
}

function loadCurrentThemefromLocalStorage() {
  const currentTheme = localStorage.getItem('theme');
  // Check Local Storage For Theme
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleSwitch.checked = currentTheme === 'dark';
    applyThemeSettings({isDark: currentTheme === 'dark'});
  }
}

// Event Listener
toggleSwitch.onchange = switchTheme;
window.onload = loadCurrentThemefromLocalStorage;