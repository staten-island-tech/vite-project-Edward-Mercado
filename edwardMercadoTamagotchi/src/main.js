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

function openWindow() {
  const savedTheme = localStorage.getItem('theme') || 'light'; // returns light theme if we don't have one
  switchWebThemes(savedTheme);

  let buses = [];
  
  const localStorageBuses = localStorage.getItem('buses') || "[]";
  
  if (localStorageBuses != "[]") {
    let object_buses = JSON.parse(localStorageBuses);
    buses = [];
    object_buses.forEach((bus) => {

      let busClass_bus = new Bus(bus.name, bus.species);
      let fixedBus = busClass_bus.reconstructor(bus);
      buses.push(fixedBus);
    })

    return (buses);
  }
  else {
    buses = [];
    localStorage.setItem('buses', JSON.stringify(buses));
  }

  return (buses);
}

function saveGame() {
  localStorage.setItem('buses', JSON.stringify(buses));
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

  const deleteBusButton = document.querySelector(".delete-bus-menu__confirmation")
  
  deleteBusButton.removeEventListener("click", () => deleteBusMenu(deleteBusButton.getAttribute("data-index")));
}

function newAdoptionScreen(adoptedBus) { // after you adopt something, shows what you just did
  const newAdoptionMenuTitle = document.getElementById("new-adoption-menu-title");
  let nOrNot = ""
  if (adoptedBus.species[0] === "s") {
    nOrNot = "N"
  }
  newAdoptionMenuTitle.textContent = `YOU JUST ADOPTED A${nOrNot} ${adoptedBus.species}!`

  const adoptionMenuDisplay = document.querySelector(".adoption-menu-display");
  adoptionMenuDisplay.innerHTML = ''
  adoptionMenuDisplay.insertAdjacentHTML("afterbegin", `<div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> NAME: ${ adoptedBus.name } </h2>
          </div>
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> FULLNESS: ${ adoptedBus.fullness }</h2>
            <div class="stat_bar"></div>
          </div>
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> HEALTH: ${ adoptedBus.physical_health }</h2>
          </div>
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> SPEED: ${ adoptedBus.speed }</h2>
          </div>
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> HAPPINESS: ${ adoptedBus.happiness }</h2>
          </div>
        </div>`)
  
  openMenu("#new-adoption-menu");
}

function adoptMenu(species) {
  openMenu("#adoption-menu");

  const adoptionDataTarget = document.querySelector(".adoption-data-target");
  adoptionDataTarget.innerHTML = "";
  adoptionDataTarget.insertAdjacentHTML("afterbegin", `<h2 class="adoption-data-attribute"> BUS SPECIES: ${species} </h2>`);

  const formPlace = document.querySelector("#adopt-form-location");
  formPlace.innerHTML = ''
  formPlace.insertAdjacentHTML('beforeend', `
    <form class="name-input" id="nameInput">
      <input type="hidden" id="species-input" value="${ species }">
      <h2 class="game-subtitle"> GIVE IT A NAME! </h2>
      <div class="horizontal-line"></div>
      <div class="name-input__container">
      <input class="name-input__text" type="text" maxlength="14" id="name-input" name="name-input" placeholder="Name your bus...">
      <input class="name-input__button" type="submit" value="ADOPT!"/>
      </div>
    </form>
    `);
  
  const nameForm = document.querySelector(".name-input");
  nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let nameInput = document.getElementById("name-input").value;

  if (!nameInput) {
    nameInput = "Unnamed Bus"
  }
  const busSpecies = document.getElementById("species-input").value.replaceAll(" ", "");

  let adoptedBus = new Bus(nameInput, busSpecies);
  buses.push(adoptedBus);
  injectBuses(buses);
  const adoptionMenu = document.getElementById("adoption-menu");
  adoptionMenu.addEventListener("animationend", newAdoptionScreen(adoptedBus));
  closeMenu("#adoption-menu");
  adoptionMenu.removeEventListener("animationend", newAdoptionScreen(adoptedBus));
})

  const speciesInput = document.querySelector("#species-input");
  speciesInput.value = species;

  injectBuses(buses);
}

function deleteBus(confirmDeleteButton, busIndex) {
  closeMenu("#delete-bus-menu");
  buses.splice(busIndex, 1);
  injectBuses(buses);
  confirmDeleteButton.removeEventListener("click", () => deleteBus(confirmDeleteButton, busIndex), { once: true });
}

function deleteBusMenu(busIndex) {
  openMenu("#delete-bus-menu");
  let targetBus = buses[busIndex];
  const confirmDeleteButton = document.querySelector(".delete-bus-menu__confirmation");
  confirmDeleteButton.addEventListener("click", () => deleteBus(confirmDeleteButton, busIndex), { once: true });

  const deleteBusDisplay = document.querySelector(".delete-bus-menu__data-container");
  deleteBusDisplay.innerHTML = ''
  deleteBusDisplay.insertAdjacentHTML("afterbegin", 
    `<div class="adoption-menu__attribute">
          <h2 class="adoption-menu-subtitle"> NAME: ${targetBus.name} </h2>
        </div>
        <div class="adoption-menu__attribute">
          <h2 class="adoption-menu-subtitle"> FULLNESS: ${targetBus.fullness} </h2>
        </div>
        <div class="adoption-menu__attribute">
          <h2 class="adoption-menu-subtitle"> HEALTH: ${targetBus.physical_health} </h2>
        </div>
        <div class="adoption-menu__attribute">
          <h2 class="adoption-menu-subtitle"> SPEED: ${targetBus.speed} </h2>
        </div>
        <div class="adoption-menu__attribute">
          <h2 class="adoption-menu-subtitle"> HAPPINESS: ${targetBus.happiness} </h2>
        </div>`
  )
}

function injectBuses(buses) {
  const currentBusesContainer = document.querySelector(".current-buses__container");
  currentBusesContainer.innerHTML = '';

  buses.forEach((bus) => {
    currentBusesContainer.insertAdjacentHTML("beforeend", `
      <div class="owned-bus-display">
          <div>
            <h3 class="owned-bus-display__name"> ${ bus.name } </h3>
            <h3 class="owned-bus-display__species"> ${ bus.species } </h3>
          </div>

          <div class="owned-bus-display__button-container">
          <button class="owned-bus-display__button" id="select-bus-button" data-index=${buses.indexOf(bus)}>
            SELECT THIS BUS
          </button> 
          <button class="owned-bus-display__button" id="delete-bus-button" data-index=${buses.indexOf(bus)}>
            DELETE THIS BUS
          </button>
          </div>
        </div>
      `)
  })

  const deleteBusButtons = document.querySelectorAll("#delete-bus-button");
  deleteBusButtons.forEach((button) => {
    button.addEventListener("click", () => deleteBusMenu(button.getAttribute("data-index")))
  })

  const selectBusButtons = document.querySelectorAll("#select-bus-button");
  selectBusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      buses.forEach((bus) => {
        bus.selected = false
      })
      let targetBus = buses[button.getAttribute("data-index")]
      targetBus.selected = true;
      globalThis.selectedBus = targetBus;
    })
  })

  saveGame();
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
    adoptMenu(button.textContent);
  })
})

const hideDataButtons = document.querySelectorAll(".game-pet-selection__button");

hideDataButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetContainer = document.querySelector(button.getAttribute("data-target"));
    console.log(button.getAttribute("data-target"));
    if (button.textContent === "HIDE") {
      button.textContent = "SHOW";
      targetContainer.style.display = "none";
    }
    else {
      button.textContent = "HIDE";
      targetContainer.style.display = "";
    }
  })
})

const buses = openWindow(); // opens the window and gets the user's save data

injectBuses(buses);