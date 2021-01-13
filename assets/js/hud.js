let button;

class HUD {
  elements = [];

  constructor() {
    this.x = 10;
    this.y = 10;

    this.showStartText = true;
    this.showFinishText = false;
  }

  showInfos() {
    fill(0);
    noStroke();
    textAlign(LEFT);
    textSize(12);

    this.elements = [
      'Highest Speed: ' + highestSpeed,
      'Speed: ' + snake.speed,
      'Highest Score: ' + int(highestScore),
      'Score: ' + int(snake.score),
    ];

    image(allowsfx, 10, 10);
    if (localStorage.getItem('allowsfx') === 'false') {
      tint(0, 0, 0, 126);
    }

    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];

      text(element, 15, height - (15 * (i + 1)));
    }
  }

  showStart() {
    if (this.showStartText) {
      fill(255);
      stroke(51);
      textAlign(CENTER);
      strokeWeight(3);
      textSize(14);
      text('Press any directional to', width / 2, height / 2 - (gap * 5));
      const bounds = font.textBounds('Press any directional to', width / 2, height / 2 - (gap * 5), 14);

      fill(255);
      stroke(51);
      textAlign(CENTER);
      strokeWeight(4);
      textSize(24);
      text('Start Game', width / 2, height / 2 - (gap * 3));

      if (mouseX >= bounds.x && mouseX <= bounds.x + bounds.w &&
        mouseY >= bounds.y && mouseY <= bounds.y + bounds.h) {
        textSize(12);
        textAlign(LEFT);
        const instruction = 'directionals = 🡐 🡒 🡑 🡓 or W A S D';

        fill(255);
        stroke(0);
        strokeWeight(1);
        rect(mouseX, mouseY, textWidth(instruction) + 10, 20);

        fill(0);
        noStroke();
        text(instruction, mouseX + 5, mouseY + 15);
      }
    }
  }

  hideStart() {
    this.showStartText = false;

    if (!music.isPlaying() && localStorage.getItem('allowsfx') !== 'false') {
      music.play();
    }
  }

  hideFinish() {
    this.showFinishText = false;
  }

  showFinish() {
    if (this.showFinishText) {
      fill(255);
      stroke(51);
      textAlign(CENTER);
      strokeWeight(4);
      textSize(24);
      text('You lose!', width / 2, height / 2 - (gap * 3));

      strokeWeight(3);
      textSize(14);
      text('Press ENTER to try again!', width / 2, height / 2 - gap);

      if (music.isPlaying()) {
        music.stop();
      }
    }
  }

  showNewRecord() {
    if (this.showFinishText && actualHighestScore < highestScore) {
      fill(255);
      stroke(51);
      textAlign(CENTER);
      strokeWeight(4);
      textSize(36);
      text('New Record!', width / 2, height / 2 - (gap * 12));
    }

    if (this.showFinishText && actualHighestScore < highestScore && !gifCreateImg) {
      gifCreateImg = (createImg('assets/imgs/new-record.gif')).position(innerWidth / 2 - 75, innerHeight / 2 - 130);
    }
  }
}