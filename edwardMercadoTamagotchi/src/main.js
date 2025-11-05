import './style.css'
import Bus from './class_logic.js'

function switchWebThemes(theme) {
  const themes = ["red", "orange", "p-yellow", "green", "blue", "purple", "light", "dark"]; // yellow is not a color

  themes.forEach((theme) => {
    document.body.classList.remove('theme-' + theme);
  });

  console.log('theme-' + theme);

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

const themeButtons = document.querySelectorAll(".toggleMode");

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTheme = button.getAttribute("data-theme");
    switchWebThemes(selectedTheme);
  })
})

function openWindow() {
  const savedTheme = localStorage.getItem('theme') || 'light'; // returns light theme if we don't have one
  switchWebThemes(savedTheme);

  const localStorageBuses = localStorage.getItem('buses');
  if (localStorageBuses) {
    const buses = JSON.parse(localStorageBuses);
    buses.forEach((bus) => {
      if (bus.selected) {
        let selectedBus = bus;
        assignButtonEvents(selectedBus);
      }
    })
  }
  else {
    bus = new Bus("hi", `s${Math.floor(Math.random() * 100)}`);
    const buses = [bus];
    localStorage.setItem('buses', JSON.stringify(buses));
  }
}

openWindow();
console.log(buses);