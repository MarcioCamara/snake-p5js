class Head {
    constructor() {
        this.redefine();
    }

    redefine() {
        this.x = floor(width / (2 * gap)) * gap;
        this.y = floor(height / (2 * gap)) * gap;
        this.dir = '';
        this.score = 0;
        this.speed = 5;
        this.tails = [];

        for (let i = 0; i < 2; i++) {
            this.tails.push(new Tail(this.x, this.y + (gap * i)));
        }
    }

    update() {
        if (this.dir === 'left') {
            this.x -= gap;
        } else if (this.dir === 'right') {
            this.x += gap;
        } else if (this.dir === 'up') {
            this.y -= gap;
        } else if (this.dir === 'down') {
            this.y += gap;
        }
    }

    collisionFruit(obj) {
        return (this.x === obj.x && this.y === obj.y);
    }

    collisionCanvas() {
        return (this.x >= width || this.x < 0 || this.y >= height || this.y < 0);
    }

    collisionTail() {
        for (let i = 0; i < this.tails.length; i++) {
            const tail = this.tails[i];

            if (this.x === tail.x && this.y === tail.y && (this.x !== floor(width / (2 * gap)) * gap)) {
                return true;
            }
        }
    }

    bite() {
        if (biteSound.isPlaying()) {
            biteSound.stop();
        } else if (localStorage.getItem('allowsfx') !== 'false') {
            biteSound.play();
        }
    }

    show() {
        fill('rgb(105, 255, 92)');
        stroke(0);
        strokeWeight(1);
        rect(this.x, this.y, gap, gap, 3);
    }
}