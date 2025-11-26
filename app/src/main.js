import './style.css'
import { Bus } from './class_logic.js'
import { Food } from './class_logic.js'
import { Toy } from './class_logic.js'
import { Medicine } from './class_logic.js'
import { busData } from './data.js'
import { shopItems } from './data.js'
import { trainingMethods } from './data.js'

function randomInt(min, max) {
  let difference = max - min;
  return Math.floor((Math.random()*difference))+min
}

function switchWebThemes(theme) {
  const themes = ["red", "orange", "yellow", "green", "blue", "purple", "light", "dark"]; // yellow is not a color

  themes.forEach((theme) => {
    document.body.classList.remove('theme-' + theme);
  });

  document.body.classList.add('theme-' + theme);
  localStorage.setItem('theme', theme);
}

// fix the bug where when your inventory is loaded then it gets your stuff all in one category (foods)


function openWindow() {
  const savedTheme = localStorage.getItem('theme') || 'light'; // returns light theme if we don't have one
  switchWebThemes(savedTheme);

  let buses = [];
  
  let localStorageFoods = JSON.parse(localStorage.getItem("foods")) || [];
  localStorageFoods.forEach((food) => {
    foods.push(new Food(food.name, food.nutrition, food.imageURL));
  })
  updateFoods();

  let localStorageToys = JSON.parse(localStorage.getItem("toys")) || [];
  localStorageToys.forEach((toy) => {
    toys.push(new Toy(toy.name, toy.happiness, toy.imageURL, toy.preferences));
  })
  updateToys();

  let localStorageMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
  localStorageMedicines.forEach((medicine) => {
    medicines.push(new Medicine(medicine.name, medicine.heal, medicine.imageURL));
  })
  updateMedicine();

  const localStorageBuses = localStorage.getItem('buses') || "[]";
  
  if (localStorageBuses != "[]") {
    let objectBuses = JSON.parse(localStorageBuses);
    buses = [];
    objectBuses.forEach((busObject) => {

      let busClass_bus = new Bus(busObject.name, busObject.species);
      let fixedBus = busClass_bus.reconstructor(busObject);
      buses.push(fixedBus);
    }
  )
    if (!objectBuses.find((bus) => bus.selected === true)) {
      buses[0].selected = true;
    }

    return (buses);
  }
  else {
    buses = [];
    localStorage.setItem('buses', JSON.stringify(buses));
  }

  return (buses);
}

function saveGame(button_click) {
  localStorage.setItem('buses', JSON.stringify(buses));
  localStorage.setItem('foods', JSON.stringify(foods));
  localStorage.setItem('medicines', JSON.stringify(medicines));
  localStorage.setItem('toys', JSON.stringify(toys));
  if(button_click) {
    showSaveAlert();
  }
}

function openMenu(menuID) {
  const menu = document.querySelector(menuID);
  menu.style.display = "flex";
  menu.classList.add("game-care-menu-open");

  if (menuID === "#game-statsView-menu") {
    const statsViewTitle = document.getElementById("statsView-title");
    let selectedBus = buses[0];
    buses.forEach((bus) => {
      if (bus.selected) {
        statsViewTitle.textContent = `${bus.name}'s STATS`
        selectedBus = bus;
      }
    })
    const statsViewMenu = document.querySelector(".statsView-container");
    statsViewMenu.innerHTML = '';
    statsViewMenu.insertAdjacentHTML("afterbegin", `
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> NAME: ${ selectedBus.name } </h2>
          </div>
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> SPECIES: ${ selectedBus.species } </h2>
          </div>
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> FULLNESS: ${ selectedBus.fullness }</h2>
            <div class="stats-bar__container">
              <div class="stats-bar__fill" id="view-fullness"></div>
            </div>
          </div>
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> HEALTH: ${ selectedBus.physical_health }</h2>
            <div class="stats-bar__container">
              <div class="stats-bar__fill" id="view-physical_health"></div>
            </div>
          </div>
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> SPEED: ${ selectedBus.speed }</h2>
            <div class="stats-bar__container">
              <div class="stats-bar__fill" id="view-speed"></div>
            </div>
          </div>
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> HAPPINESS: ${ selectedBus.happiness }</h2>
            <div class="stats-bar__container">
              <div class="stats-bar__fill" id="view-happiness"></div>
            </div>
          </div>
        </div>
      `)
      updateStatsBar("view-fullness", selectedBus.fullness, 100);
      updateStatsBar("view-physical_health", selectedBus.physical_health, 100);
      updateStatsBar("view-speed", selectedBus.speed, 150);
      updateStatsBar("view-happiness", selectedBus.happiness, 100);
    }

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
            <div class="stats-bar__container">
              <div class="stats-bar__fill" id="adoption-fullness"></div>
            </div>
          </div>
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> HEALTH: ${ adoptedBus.physical_health }</h2>
            <div class="stats-bar__container">
              <div class="stats-bar__fill" id="adoption-physical_health"></div>
            </div>
          </div>
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> SPEED: ${ adoptedBus.speed }</h2>
            <div class="stats-bar__container">
              <div class="stats-bar__fill" id="adoption-speed"></div>
            </div>
          </div>
          <div class="adoption-menu__attribute">
            <h2 class="adoption-menu-subtitle"> HAPPINESS: ${ adoptedBus.happiness }</h2>
            <div class="stats-bar__container">
              <div class="stats-bar__fill" id="adoption-happiness"></div>
            </div>
          </div>
        </div>`)
  
  updateStatsBar("adoption-fullness", adoptedBus.fullness, 100);
  updateStatsBar("adoption-physical_health", adoptedBus.physical_health, 100);
  updateStatsBar("adoption-speed", adoptedBus.speed, 150);
  updateStatsBar("adoption-happiness", adoptedBus.happiness, 100);

  if(!buses.find((bus) => {bus.selected === true})) {
    adoptedBus.selected = true;
  }

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
}

function updateStatsBar(barId, value, maxValue) {
  let percentage = Math.floor((value/maxValue) * 100);
  const healthBar = document.getElementById(barId);
  healthBar.style.width = `${percentage}%`;
}

function lightHit() {
  let selectedBus = ""
  buses.forEach((bus) => {
    if (bus.selected) {
      selectedBus = bus;
    }
  })
  let old_health = selectedBus.physical_health;
  let old_happiness = selectedBus.happiness;

  selectedBus.happiness -= randomInt(5, 12);
  selectedBus.physical_health -= randomInt(10, 25);

  selectedBus = selectedBus.statsHandler();

  if (!selectedBus.alive) {
    buses.splice(buses.indexOf(selectedBus), 1);
    injectBuses(buses);
    closeMenu("#game-hit-menu");
    openMenu("#death-screen");
  }
  else {
    closeMenu("#game-hit-menu");
    const lightHitData = document.getElementById("light-hit-data-container");
    lightHitData.innerHTML = "";
    lightHitData.insertAdjacentHTML("beforeend", `
      <h2 class="game-care-subtitle"> HEALTH: ${old_health} -> ${selectedBus.physical_health} </h2>
      <h2 class="game-care-subtitle"> HAPPINESS: ${old_happiness} -> ${selectedBus.happiness} </h2>
      `)
    openMenu("#light-hit");
  }
  saveGame(false);
}

function strongHit() {
  let selectedBus = ""
  buses.forEach((bus) => {
    if (bus.selected) {
      selectedBus = bus;
    }
  });

  let oldHealth = selectedBus.physical_health;
  let oldHappiness = selectedBus.happiness;

  selectedBus.happiness -= randomInt(12, 20);
  selectedBus.physical_health -= randomInt(35, 45);
  console.log(selectedBus.happiness);
  selectedBus = selectedBus.statsHandler();

  if (!selectedBus.alive) {
    buses.splice(buses.indexOf(selectedBus), 1);
    injectBuses(buses);
    closeMenu("#game-hit-menu");
    openMenu("#death-screen");
  }
  else {
    closeMenu("#game-hit-menu");
    const strongHitData = document.getElementById("strong-hit-data-container");
    strongHitData.innerHTML = "";
    strongHitData.insertAdjacentHTML("beforeend", `
      <h2 class="game-care-subtitle"> HEALTH: ${oldHealth} -> ${selectedBus.physical_health} </h2>
      <h2 class="game-care-subtitle"> HAPPINESS: ${oldHappiness} -> ${selectedBus.happiness} </h2>
      `)
    openMenu("#strong-hit");
  }
  
  saveGame(false);
}

function feedBus(foodName) {
  /* could i be using .find a little more here?
  of course,
  why didn't i?
  im lazy
  i also didnt want to google how to do the syntax
  giveToy is basically the same function as this but with .find a little more
  yeah
  :D
  */

  let selectedBus = null;
  selectedBus = buses.find((bus) => bus.selected === true);
  let oldFullness = 0;
  for(let i=0;i<foods.length;i++) {
    if (foods[i].name === foodName) {
      oldFullness = selectedBus.fullness;
      selectedBus.fullness += foods[i].nutrition;
      selectedBus.statsHandler();
      foods.splice(foods[i], 1);
      i+= foods.length;
    }
  }
  updateFoods();
  closeMenu("#game-feed-menu");

  const feedResultContainer = document.querySelector("#feed-result__data-container");
  feedResultContainer.innerHTML = '';
  feedResultContainer.insertAdjacentHTML("beforeend", `
      <h2 class="game-care-subtitle"> BUS NAME: ${selectedBus.name} </h2>
      <h2 class="game-care-subtitle"> FULLNESS: ${oldFullness} -> ${selectedBus.fullness}! </h2>
    `);

  openMenu("#feed-result");
  saveGame();
}

function updateFoods() {
  const foodsContainer = document.getElementById("foods__container");
  foodsContainer.innerHTML = '';
  preventOverflow(foods);
  foods.forEach((food) => {
    foodsContainer.insertAdjacentHTML("beforeend", `
      <button class="shop-item-button" id="food-inventory-button">${food.name}</button>
      `)
  })
  const foodButtons = document.querySelectorAll("#food-inventory-button");
  foodButtons.forEach((button) => {
    button.addEventListener("click", () => {
      feedBus(button.textContent);
    })
  })
}

function updateToys() {
  const toysContainer = document.getElementById("toys__container");
  toysContainer.innerHTML = '';
  preventOverflow(toys);
  toys.forEach((toy) => {
    toysContainer.insertAdjacentHTML("beforeend", `
      <button class="shop-item-button" id="toy-inventory-button">${toy.name}</button>
      `)
  })

  const toysButtons = document.querySelectorAll("#toy-inventory-button");
  toysButtons.forEach((button) => {
    button.addEventListener("click", () => {
      giveToy(button.textContent);
    })
  })
}

function giveToy(toyName) {
  let selectedBus = buses.find((bus) => bus.selected === true);
  let toy = toys.find((toy) => toy.name === toyName);
  let review = "Your bus enjoyed playing."

  let oldHappiness = selectedBus.happiness;
  selectedBus.happiness += toy.happiness;

  toy.preferences.forEach((preference) => { // .find() wasn't working and im lazy
    if (preference === selectedBus.species) {
      selectedBus.happiness += toy.happiness;
      review = "Your bus REALLY enjoyed playing!"
    }
  })
  selectedBus.statsHandler();
  toys.splice(toys.indexOf(toy), 1);

  updateToys();
  closeMenu("#game-petPlay-menu")

  const feedResultContainer = document.querySelector("#petPlay-result__data-container");
  feedResultContainer.innerHTML = '';
  feedResultContainer.insertAdjacentHTML("beforeend", `
      <h2 class="game-care-subtitle"> BUS NAME: ${selectedBus.name} </h2>
      <h2 class="game-care-subtitle"> HAPPINESS: ${oldHappiness} -> ${selectedBus.happiness}! </h2>
      <h2 class="game-care-subtitle"> ${review} </h2>
    `);

  openMenu("#petPlay-result");
  saveGame();
}

function updateMedicine() {
  const medsContainer = document.getElementById("meds__container");
  medsContainer.innerHTML = '';
  preventOverflow(medicines);
  medicines.forEach((med) => {
    medsContainer.insertAdjacentHTML("beforeend", `
      <button class="shop-item-button" id="med-inventory-button">${med.name}</button>
      `)
  })

  const medsButtons = document.querySelectorAll("#med-inventory-button");
  medsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      healBus(button.textContent);
    })
  })
}

function healBus(medName) {
  let selectedBus = buses.find((bus) => bus.selected === true);
  let med = medicines.find((med) => med.name === medName);

  let oldHealth = selectedBus.physical_health;
  selectedBus.physical_health += med.heal;
  selectedBus.statsHandler();
  medicines.splice(medicines.indexOf(med), 1);

  updateMedicine();
  closeMenu("#game-heal-menu");

  const healResultContainer = document.querySelector("#heal-result__data-container");
  healResultContainer.innerHTML = '';
  healResultContainer.insertAdjacentHTML("beforeend", `
      <h2 class="game-care-subtitle"> BUS NAME: ${selectedBus.name} </h2>
      <h2 class="game-care-subtitle"> HEALTH: ${oldHealth} -> ${selectedBus.physical_health}! </h2>
    `);
  openMenu("#heal-result");

  saveGame();
}

function preventOverflow(list) {
  if(list.length > 12) {
    list.length = 12;
  }
}

function buyItem(shopItem) {
  let itemClass = shopItem.class;

  if (itemClass === Food) {
    foods.push(new Food(shopItem.name, shopItem.nutrition, shopItem.imageURL));
    updateFoods();
  }
  else if (itemClass === Toy) {
    toys.push(new Toy(shopItem.name, shopItem.happiness, shopItem.imageURL, shopItem.preferences));
    updateToys();
  }
  else if (itemClass === Medicine) {
    medicines.push(new Medicine(shopItem.name, shopItem.heal, shopItem.imageURL));
    updateMedicine();
  }

  preventOverflow(lists);

  saveGame(false)
}

function showSaveAlert() {
  const saveMenu = document.getElementById("save-alert");
  saveMenu.style.display = "flex";
  saveMenu.classList.add("save-alert__open-animation");
  saveMenu.addEventListener("animationend", () => {
    saveMenu.classList.remove("save-alert__open-animation");
    saveMenu.style.display = "none";
  })
}

function insertItemData(shopItemContainer, shopItem) {
  if(shopItem.class === Food) {
    shopItemContainer.insertAdjacentHTML("beforeend", `
      <h2 class="shop-menu-subtitle"> NAME: ${ shopItem.name } </h2>
      <h2 class="shop-menu-subtitle"> ITEM VARIETY: ${ shopItem.className } </h2>
      <h2 class="shop-menu-subtitle"> PROVIDES ${ shopItem.nutrition } FULLNESS </h2>
      `)
  }
  else if(shopItem.class === Medicine) {
    shopItemContainer.insertAdjacentHTML("beforeend", `
      <h2 class="shop-menu-subtitle"> NAME: ${ shopItem.name } </h2>
      <h2 class="shop-menu-subtitle"> ITEM VARIETY: ${ shopItem.className } </h2>
      <h2 class="shop-menu-subtitle"> HEALS ${ shopItem.heal } HEALTH </h2>
      `)
  }
  else if(shopItem.class === Toy) {
    let preferenceString = ""
    shopItem.preferences.forEach((preference) => {
      if(shopItem.preferences.indexOf(preference) !== 0) {
        preferenceString = preferenceString + ", " + preference
      }
      else {
        preferenceString = preferenceString + preference
      }
    })

    shopItemContainer.insertAdjacentHTML("beforeend", `
      <h2 class="shop-menu-subtitle"> NAME: ${ shopItem.name } </h2>
      <h2 class="shop-menu-subtitle"> ITEM VARIETY: ${ shopItem.className } </h2>
      <h2 class="shop-menu-subtitle"> BOOSTS HAPPINESS BY ${ shopItem.happiness } POINTS </h2>
      <h2 class="shop-menu-subtitle"> ESPECIALLY LIKED BY: </h2>
      <h2 class="shop-menu-subtitle"> ${preferenceString} </h2>
      `)
  }
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
  saveGame(true);
})

const careButtons = document.querySelectorAll(".care-button");
careButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if(buses.length === 0) {
      openMenu("#no-buses-menu");
    }
    else {
      openMenu(button.getAttribute("data-menuTarget"));
    }
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

const lightHitButton = document.getElementById("light-hit-button");
lightHitButton.addEventListener("click", () => {
  lightHit();
})

const strongHitButton = document.getElementById("strong-hit-button");
strongHitButton.addEventListener("click", () => {
  strongHit();
})

const shopItemsContainer = document.querySelector(".shop-items-container");
const body = document.querySelector("body");
shopItems.forEach((shopItem) => {
  shopItemsContainer.insertAdjacentHTML("beforeend", `
    <button class="shop-item-button" id="${shopItem.name.replaceAll(" ", "-")}__button"> ${shopItem.name} </button>
    `)
  body.insertAdjacentHTML("beforeend", 
    `
    <div class="game-care-menu" id="${shopItem.name.replaceAll(" ", "-")}__menu">
      <div>
        <h2 class="game-care-subtitle"> Buy ${shopItem.name} </h2>
        <div class="horizontal-line"></div>
        <div id="${shopItem.name.replaceAll(" ", "-")}__data-container">
          
        </div>
      </div>

      <div id="${shopItem.name.replaceAll(" ", "-")}__data-container"> 
      
      </div>

      <button class="buy-item-button" id="${shopItem.name.replaceAll(" ", "-")}__buy-button" data-menuTarget="#${shopItem.name.replaceAll(" ", "-")}__menu"> Buy ${shopItem.name} </button>
      <button class="close-menu-button" id="${shopItem.name.replaceAll(" ", "-")}__close-button" data-menuTarget="#${shopItem.name.replaceAll(" ", "-")}__menu"> RETURN HOME </button>
    </div>
    `
  )
  const shopItemButton = document.getElementById(shopItem.name.replaceAll(" ", "-") + "__button");
  shopItemButton.addEventListener("click", () => {
    closeMenu("#game-shop-menu");
    openMenu(`#${shopItem.name.replaceAll(" ", "-")}__menu`);
  })

  const shopItemClose = document.getElementById(shopItem.name.replaceAll(" ", "-") + "__close-button");
  shopItemClose.addEventListener("click", () => {
    closeMenu(`#${shopItem.name.replaceAll(" ", "-")}__menu`);
  })

  const shopItemBuy = document.getElementById(shopItem.name.replaceAll(" ", "-") + "__buy-button");
  shopItemBuy.addEventListener("click", () => {
    buyItem(shopItem);
  })

  const shopItemContainer = document.getElementById(`${shopItem.name.replaceAll(" ", "-")}__data-container`)
  insertItemData(shopItemContainer, shopItem);
})

const foods = [];
const toys = [];
const medicines = [];

const lists = [foods, toys, medicines];
// lists.forEach((list) => {
//   list.length = 0;
// })

const buses = openWindow(); // opens the window and gets the user's save data
injectBuses(buses);