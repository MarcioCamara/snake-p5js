class Fruit {
    constructor() {
        this.eat();
    }

    eat() {
        this.x = floor(random(0, width) / gap) * gap;
        this.y = floor(random(0, height) / gap) * gap;

        if (this.x === snake.x || this.y === snake.y) {
            this.eat();
        }
    }

    show() {
        fill('rgb(228, 59, 17)');
        stroke(0);
        strokeWeight(1);
        rect(this.x, this.y, gap, gap, 6);
    }
}