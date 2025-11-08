import './style.css'
import { Bus } from './class_logic.js'
import { Food } from './class_logic.js'

function switchWebThemes(theme) {
  const themes = ["red", "orange", "p-yellow", "green", "blue", "purple", "light", "dark"]; // yellow is not a color

  themes.forEach((theme) => {
    document.body.classList.remove('theme-' + theme);
  });

  document.body.classList.add('theme-' + theme);
  localStorage.setItem('theme', theme);
}

function assignButtonEvents(bus) {
  let feedButton = document.querySelector("#feed-button");
  feedButton.addEventListener("click", () => {
    bus.feed();
  })
  let petPlayButton = document.querySelector("#petplay-button");
  petPlayButton.addEventListener("click", () => {
    bus.petPlay()
  })
  let trainButton = document.querySelector("#train-button");
  trainButton.addEventListener("click", () => {
    bus.train()
  })
  let hitButton = document.querySelector("#hit-button");
  hitButton.addEventListener("click", () => {
    bus.hit()
  })
  let shopButton = document.querySelector("#shop-button");
  shopButton.addEventListener("click", () => {
    shop()
  })
}

function openWindow() {
  const savedTheme = localStorage.getItem('theme') || 'light'; // returns light theme if we don't have one
  switchWebThemes(savedTheme);

  let buses = [];
  
  const localStorageBuses = localStorage.getItem('buses');

  if (localStorageBuses != "[]") {
    buses = JSON.parse(localStorageBuses);
    buses.forEach((bus) => {
      if (bus.selected) {
        let selectedBus = bus;
        assignButtonEvents(selectedBus);
      }
    })
    return (buses);
  }
  else {
    const bus = new Bus("hi", `s${Math.floor(Math.random() * 100)}`);
    buses = [bus];
    localStorage.setItem('buses', JSON.stringify(buses));
  }

  return (buses);
}

function saveGame() {
  localStorage.setItem('buses', JSON.stringify(buses));
  const gameSaveAlert = document.querySelector("#game-save-alert");
  gameSaveAlert.style.display = "flex";
}

function openMenu(menuID) {
  const menu = document.querySelector(menuID);
  menu.style.display = "flex";

  const shadow = document.querySelector(".menu-shadow");
  shadow.style.display = "block";
}

function closeMenu(menuID) {
  const menu = document.querySelector(menuID);
  menu.style.display = "none";

  const shadow = document.querySelector(".menu-shadow");
  shadow.style.display = "none";
}









const themeButtons = document.querySelectorAll(".toggleMode");

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTheme = button.getAttribute("data-theme");
    switchWebThemes(selectedTheme);
  })
})

const saveGameButton = document.querySelector(".game-save-button");
saveGameButton.addEventListener("click", () => {
  saveGame();
})

const careButtons = document.querySelectorAll(".care-button");
careButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openMenu(button.getAttribute("data-menuTarget"));
  })
})

const closeMenuButtons = document.querySelectorAll(".close-menu-button");
console.log(closeMenuButtons);
closeMenuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeMenu(button.getAttribute("data-menuTarget"));
  })
})

const buses = openWindow(); // opens the window and gets the user's save data