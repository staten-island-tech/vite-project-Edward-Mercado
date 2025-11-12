import './style.css'
import { Bus } from './class_logic.js'
import { Food } from './class_logic.js'
import { Toy } from  './class_logic.js'

export const busData = [
    "s44", "s57", "s59", "s62", "s79", "b1"
]
export const shopItems = [
    {
        class: Food,
        name: "",
        nutrition: 10,
        imageURL: "",
    },
    {
        class: Food,
        name: "",
        nutrition: 15,
        imageURL: "",
    },
    {
        class: Food,
        name: "",
        nutrition: 20,
        imageURL: "",
    },
    {
        class: Toy,
        name: "",
        happiness: 10,
        imageURL: "",
        preferences: [],
    },
    {
        class: Toy,
        name: "",
        happiness: 15,
        imageURL: "",
        preferences: [],
    },
    {
        class: Toy,
        name: "",
        happiness: 20,
        imageURL: "",
        preferences: [],
    },
]