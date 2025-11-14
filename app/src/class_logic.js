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

        killable_stats.forEach((stat) => {
            if (stat <= 0) {
                this.alive = false;
            }
        })
        return this;
    }
}

export class Food {
    constructor(name, nutrition, imageURL) {
        this.class = Food;
        this.name = name;
        this.nutrition = nutrition;
        this.imageURL = imageURL;
    }
}

export class Toy {
    constructor(name, happiness, imageURL, preferences) {
        this.class = Toy;
        this.name = name;
        this.happiness = happiness;
        this.imageURL = imageURL;
        this.preferences = preferences;
    }
}

export class Medicine {
    constructor(name, heal, imageURL) {
        this.class = Medicine;
        this.name = name;
        this.heal = heal;
        this.imageURL = imageURL;
        this.preferences = preferences;
    }
}