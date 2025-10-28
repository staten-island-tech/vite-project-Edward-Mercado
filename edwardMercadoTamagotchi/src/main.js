import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

function switchWebThemes(theme) {
  const themes = ["red", "orange", "green", "blue", "purple", "light", "dark"]; // yellow is not a color

  themes.forEach((theme) => {
    document.body.classList.remove('theme-' + theme);
  });

  console.log('theme-' + theme);

  document.body.classList.add('theme-' + theme);
  localStorage.setItem('theme', theme);
}

const themeButtons = document.querySelectorAll(".toggleMode");

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTheme = button.getAttribute("data-theme");
    switchWebThemes(selectedTheme);
  })
})

const savedTheme = localStorage.getItem('theme') || 'light';
switchWebThemes(savedTheme);