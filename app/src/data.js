import './style.css'
import { Bus } from './class_logic.js'
import { Food } from './class_logic.js'
import { Toy } from  './class_logic.js'
import { Medicine } from  './class_logic.js'
import { jumpGame } from './training_functions.js'

export const busData = [
    "s44", "s57", "s59", "s62", "s79", "b1"
]
export const shopItems = [
    {
        class: Food,
        name: "Small Gasoline",
        nutrition: 10,
        imageURL: "",
        className: "Food",
    },
    {
        class: Food,
        name: "Big Gasoline",
        nutrition: 20,
        imageURL: "",
        className: "Food",
    },
    {
        class: Food,
        name: "Premier Gasoline",
        nutrition: 25,
        imageURL: "",
        className: "Food",
    },
    {
        class: Toy,
        name: "Rubber Duck",
        happiness: 10,
        imageURL: "",
        preferences: ["s44", "s62"],
        className: "Toy",
    },
    {
        class: Toy,
        name: "Bus Plush",
        happiness: 20,
        imageURL: "",
        preferences: ["s57", "b1", "s79"],
        className: "Toy",
    },
    {
        class: Toy,
        name: "Car Park Dollhouse",
        happiness: 25,
        imageURL: "",
        preferences: ["s59", "s79"],
        className: "Toy",
    },
    {
        class: Medicine,
        name: "Medical Wrench",
        heal: 10,
        imageURL: "",
        className: "Medicine",
    },
    {
        class: Medicine,
        name: "Magic Gas",
        heal: 20,
        imageURL: "",
        className: "Medicine",
    },
    {
        class: Medicine,
        name: "Bus Repair Kit",
        heal: 25,
        imageURL: "",
        className: "Medicine",
    }
]

export const trainingMethods = [
   { 
    name: "Jump Game",
    functionName: jumpGame(),
}
]