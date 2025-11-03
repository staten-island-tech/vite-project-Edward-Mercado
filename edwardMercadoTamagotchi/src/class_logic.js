class Bus {
    constructor(name, species) {
        this.name = name;
        this.species = species;

        this.food_health = 80 + Math.ceil(Math.random()*20); // hungry boy to start?
        this.speed = 50 + Math.ceil(Math.random()*15);
        this.happiness = 100;
        this.physical_health = 100;
        this.alive = true;

        if(this.species.includes("s") && !this.species.includes("79")) { // all si buses except for the s79 bc its the best
            this.speed -= (Math.floor(Math.random()*25));
        }
        else {
            this.speed += (Math.floor(Math.random()*10));
        }
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

class Food {
    constructor(name, nutrition, imageURL) {
        this.name = name;
        this.nutrition = nutrition;
        this.imageURL = imageURL;
    }
}

const newPet = new Bus("Fitzgerald", "s57");
const newFood = new Food("bus snacks", 25, "https://example.com/bus_snacks.png");

newPet.feed(newFood);

console.log(newPet);