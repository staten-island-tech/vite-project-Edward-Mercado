class Bus {
    constructor(name, species) {
        this.name = name;
        this.species = species;

        this.food_health = 100;
        this.speed = 60;
        this.happiness = 100;
        this.physical_health = 100;
        this.alive = true;

        if(this.species.contains("s") && !this.species.contains("79")) { // all si buses except for the s79 bc its the best
            this.speed -= (Math.floor(Math.random()*50));
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
        if(Math.floor(Math.random(1, 20)) === 20) { // critical hit
            this.physical_health -= 35;
            if (this.physical_health <= 0) {
                this.alive = false;
            }
        }
        else {
            this.physical_health -= Math.floor(Math.random(1, 15));
            if (this.physical_health <= 0) {
                this.alive = false;
            }
        }
    }
}