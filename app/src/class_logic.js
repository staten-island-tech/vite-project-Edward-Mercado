export class Bus {
    constructor(name, species) { // will construct for the first time
        this.name = name;
        this.species = species;

        this.fullness = 80 + Math.ceil(Math.random()*20); // hungry boy to start?
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
        const bus = new Bus(inputBus.name, inputBus.species)

        bus.name = inputBus.name;
        bus.species = inputBus.species;
        bus.fullness = inputBus.fullness;
        bus.physical_health = inputBus.physical_health
        bus.speed = inputBus.speed;
        bus.alive = inputBus.alive;
        bus.selected = inputBus.selected;

        return bus;
    }

    statsHandler() {
        if(this.fullness>100) {
            this.fullness = 100;
        }
        if(this.physical_health>100) {
            this.physical_health = 100;
        }
        if(this.happiness>100) {
            this.happiness = 100;
        }
        if(this.speed>150) {
            this.speed = 150;
        }
        let killable_stats = [this.fullness, this.physical_health, this.happiness, this.speed]

        if (killable_stats.some((value) => value === 0)) {
            this.alive = false
        }
    }

    feed(food) {
        if(this.alive) {
            this.fullness += food.nutrition;
            this.statsHandler()
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

export class Toy {
    constructor(name, happiness, imageURL, preferences) {
        this.name = name;
        this.happiness = happiness;
        this.imageURL = imageURL;
        this.preferences = preferences;
    }
}