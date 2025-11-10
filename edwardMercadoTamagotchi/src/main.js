import './style.css'
import { Bus } from './class_logic.js'
import { Food } from './class_logic.js'

const busData = [
  "s44", "s57", "s59", "s62", "s79", "b1"
]

function randomInt(max) {
  let output = Math.floor(Math.random() * max);
  return output;
}

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
  
  const localStorageBuses = localStorage.getItem('buses') || "[]";
  
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
    const bus = new Bus("hi", `${ busData[randomInt(busData.length)] }`);
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
  menu.classList.add("game-care-menu-open");

  menu.addEventListener(
    "animationend", // waits for the animation to finish
    () => {
      menu.classList.remove("game-care-menu-open"); // removes the class that creates the animation
    },
    { once: true } // prevents maximum call stack size exceeded error
  );

  const shadow = document.querySelector(".menu-shadow");
  shadow.style.display = "block";
}

function closeMenu(menuID) {
  const menu = document.querySelector(menuID);
  menu.classList.add("game-care-menu-close");
  menu.addEventListener(
    "animationend",
    () => {
      menu.style.display = "none";
      menu.classList.remove("game-care-menu-close");
    },
    { once: true }
  );

  const shadow = document.querySelector(".menu-shadow");
  shadow.style.display = "none";
}

function adoptMenu(species) {
  const menu = document.querySelector('#adoption-menu');
  menu.style.display = "flex";
  menu.classList.add("game-care-menu-open");

  const adoptionDataTarget = document.querySelector(".adoption-data-target");
  adoptionDataTarget.innerHTML = "";
  adoptionDataTarget.insertAdjacentHTML("afterbegin", `<h2 class="adoption-data-attribute"> BUS SPECIES: ${species} </h2>`)


  menu.addEventListener(
    "animationend", // waits for the animation to finish
    () => {
      menu.classList.remove("game-care-menu-open"); // removes the class that creates the animation
    },
    { once: true } // prevents maximum call stack size exceeded error
  );

  const shadow = document.querySelector(".menu-shadow");
  shadow.style.display = "block";
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

closeMenuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeMenu(button.getAttribute("data-menuTarget"));
  })
})

const busAdoptContainer = document.querySelector(".bus-adopt__container");

busData.reverse().forEach((bus) => {
  busAdoptContainer.insertAdjacentHTML('afterbegin', 
    `<button class="bus-selection__button"> ${ bus } </button>`)
});

const busSelectionButtons = document.querySelectorAll(".bus-selection__button");
busSelectionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    adoptMenu(button.textContent)
  })
})

const buses = openWindow(); // opens the window and gets the user's save data