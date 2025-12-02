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
        imageURL: "/images/small-gasoline.png",
        className: "Food",
    },
    {
        class: Food,
        name: "Big Gasoline",
        nutrition: 20,
        imageURL: "/images/big-gasoline.png",
        className: "Food",
    },
    {
        class: Food,
        name: "Premier Gasoline",
        nutrition: 25,
        imageURL: "/images/premier-gasoline.png",
        className: "Food",
    },
    {
        class: Toy,
        name: "Rubber Duck",
        happiness: 10,
        imageURL: "/images/rubber-duck.png",
        preferences: ["s44", "s62"],
        className: "Toy",
    },
    {
        class: Toy,
        name: "Bus Plush",
        happiness: 20,
        imageURL: "/images/bus-plush.png",
        preferences: ["s57", "b1", "s79"],
        className: "Toy",
    },
    {
        class: Toy,
        name: "Car Park Dollhouse",
        happiness: 25,
        imageURL: "/images/car-park-dollhouse.png",
        preferences: ["s59", "s79"],
        className: "Toy",
    },
    {
        class: Medicine,
        name: "Medical Wrench",
        heal: 10,
        imageURL: "/images/medical-wrench.png",
        className: "Medicine",
    },
    {
        class: Medicine,
        name: "Magic Gas",
        heal: 20,
        imageURL: "/images/magic-gas.png",
        className: "Medicine",
    },
    {
        class: Medicine,
        name: "Bus Repair Kit",
        heal: 25,
        imageURL: "/images/bus-repair-kit.png",
        className: "Medicine",
    },
    {
        class: TrainingItem,
        name: "Treadmill",
        speed: 25,
        range: 10,
        imageURL: "/images/treadmill.png",
        className: "TrainingItem",
    },
    {
        class: TrainingItem,
        name: "Coffee",
        speed: 15,
        range: 15,
        imageURL: "/images/coffee.png",
        className: "TrainingItem",
    },
    {
        class: TrainingItem,
        name: "Punching Bag",
        speed: 30,
        range: 5,
        imageURL: "/images/punching-bag.png",
        className: "TrainingItem",
    }
]