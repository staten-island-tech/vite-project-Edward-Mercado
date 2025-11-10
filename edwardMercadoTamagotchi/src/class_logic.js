export class Bus {
    constructor(name, species) { // will construct for the first time
        this.name = name;
        this.species = species;

        this.food_health = 80 + Math.ceil(Math.random()*20); // hungry boy to start?
        this.speed = 50 + Math.ceil(Math.random()*15);
        this.happiness = 100;
        this.physical_health = 100;
        this.alive = true;
        this.selected = false;

        this.class = Bus;

        if(this.species.includes("s") && !this.species.includes("79")) { // all si buses except for the s79 bc its the best
            this.speed -= (Math.floor(Math.random()*25));
        }
        else {
            this.speed += (Math.floor(Math.random()*10));
        }
    }

    reconstructor(inputBus) { // will reconstruct from localStorage data
        this.name = inputBus.name;
        this.species = inputBus.species;
        this.food_health = inputBus.food_health;
        this.speed = inputBus.speed;
        this.alive = inputBus.alive;
        this.selected = inputBus.selected;
    }

    feed(food) {
        if(this.alive) {
            this.food_health += food.nutrition;
            if(this.food_health > 100) {
                this.food_health = 100;
            }
        }
    }

    hit() {
        if(Math.floor(Math.random() * 20) === 20) { // critical hit
            this.physical_health -= 35;
            if (this.physical_health <= 0) {
                this.alive = false;
            }
        }
        else {
            this.physical_health -= Math.ceil(Math.random() * 20);
            if (this.physical_health <= 0) {
                this.alive = false;
            }
        }
    }
}

class BusChild extends Bus { // save the syntax if necessary later
    constructor(name, species, example) {
        super(name, species);
        this.example = example;
    }
}

export class Food {
    constructor(name, nutrition, imageURL) {
        this.name = name;
        this.nutrition = nutrition;
        this.imageURL = imageURL;
    }
}