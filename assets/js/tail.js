class Tail {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        fill('rgba(105, 255, 92, 0.7)');
        stroke(0);
        strokeWeight(1);
        rect(this.x, this.y, gap, gap, 3);
    }
}