import './style.css'
import { Bus } from './class_logic.js'
import { Food } from './class_logic.js'
import { Toy } from  './class_logic.js'
import { Medicine } from  './class_logic.js'
import { TrainingItem } from  './class_logic.js'

export const busData = [
    "s44", "s57", "s59", "s62", "s79", "b1"
]
export const shopItems = [
    {
        class: Food,
        name: "Small Gasoline",
        nutrition: 10,
        imageURL: "",
    },
    {
        class: Food,
        name: "Big Gasoline",
        nutrition: 20,
        imageURL: "",
    },
    {
        class: Food,
        name: "Premier Gasoline",
        nutrition: 25,
        imageURL: "",
    },
    {
        class: Toy,
        name: "Rubber Duck",
        happiness: 10,
        imageURL: "",
        preferences: [],
    },
    {
        class: Toy,
        name: "Bus Plush",
        happiness: 20,
        imageURL: "",
        preferences: [],
    },
    {
        class: Toy,
        name: "Car Park Dollhouse",
        happiness: 25,
        imageURL: "",
        preferences: [],
    },
    {
        class: Medicine,
        name: "Medical Wrench",
        heal: 10,
        imageURL: "",
    },
    {
        class: Medicine,
        name: "Magic Gas",
        heal: 20,
        imageURL: "",
    },
    {
        class: Medicine,
        name: "Bus Repair Kit",
        heal: 25,
        imageURL: "",
    },
    {
        class: TrainingItem,
        name: "Basic Track",
        speed: 15,
        range: 5,
        imageURL: "",
    },
    {
        class: TrainingItem,
        name: "Obstacle Course",
        speed: 25,
        range: 10,
        imageURL: "",
    },
    {
        class: TrainingItem,
        name: "Private Instructor",
        speed: 30,
        range: 20,
        imageURL: "",
    },
]