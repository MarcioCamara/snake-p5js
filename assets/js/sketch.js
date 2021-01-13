let canvas;

let apple;
let snake;
let gap = 15; // espaço entre as linhas da grid

let previousLocation = {};
let highestScore = 0;
let actualHighestScore = 0;
let highestSpeed = 0;
let difficultyIncrement = .5;

let gifCreateImg = null;
const difficultyImg = document.getElementById('difficultyImg');
const difficultySelection = document.getElementById('difficulty');

function preload() {
  font = loadFont('assets/fonts/Tahoma.ttf');
  biteSound = loadSound('assets/sounds/bite.mp3');
  music = loadSound('assets/sounds/music.mp3');
  allowsfx = loadImage('assets/imgs/allowsfx.png');

  difficultyChange();
}

function setup() {
  canvas = createCanvas(600, 600);

  snake = new Head();
  apple = new Fruit();
  hud = new HUD();

  actualHighestScore = highestScore;

  frameRate(snake.speed);

  difficultySelection.addEventListener('change', difficultyChange);
}

function difficultyChange() {
  let difficultyLevel = difficultySelection.value;

  if (difficultyLevel === '.5') {
    difficultyImg.src = 'assets/imgs/hookworm.png';
  } else if (difficultyLevel === '2') {
    difficultyImg.src = 'assets/imgs/caterpillar.png';
  } else if (difficultyLevel === '5') {
    difficultyImg.src = 'assets/imgs/worm.png';
  } else if (difficultyLevel === '10') {
    difficultyImg.src = 'assets/imgs/snake.png';
  } else {
    console.error('Não entra em nenhuma condição de seleção de dificuldade, bicho!');
  }
}

function draw() {
  background(219, 173, 106);

  for (let i = snake.tails.length - 1; i >= 0; i--) {
    const tail = snake.tails[i];
    const previousTail = snake.tails[i - 1];

    if (i === 0) {
      tail.x = snake.x;
      tail.y = snake.y;
    } else {
      tail.x = previousTail.x;
      tail.y = previousTail.y;
    }

    tail.show();
  }

  previousLocation.x = snake.x;
  previousLocation.y = snake.y;

  highestSpeed = highestSpeed === 0 ? snake.speed : highestSpeed;
  highestScore = highestScore === 0 ? snake.score : highestScore;

  snake.update();

  if (snake.collisionFruit(apple)) {
    snake.bite();

    snake.score++;
    snake.speed += difficultyIncrement;

    frameRate(snake.speed);

    apple.eat();

    snake.tails.push(new Tail(previousLocation.x, previousLocation.y));
  }

  if (snake.score > highestScore) {
    highestScore = snake.score;
  }

  if (snake.speed > highestSpeed) {
    highestSpeed = snake.speed;
  }

  if (snake.collisionCanvas() || snake.collisionTail()) {
    hud.showFinishText = true;

    frameRate(snake.speed);

    apple.eat();
    snake.redefine();
  }

  apple.show();
  snake.show();
  hud.showInfos();
  hud.showStart();
  hud.showFinish();
  hud.showNewRecord();
}

function keyPressed() {
  difficultyIncrement = Number(document.getElementById('difficulty').value);

  if ((keyCode === LEFT_ARROW || keyCode === 65) && (!hud.showFinishText) && snake.dir !== 'right') {
    snake.dir = 'left';
  } else if ((keyCode === RIGHT_ARROW || keyCode === 68) && (!hud.showFinishText) && snake.dir !== 'left') {
    snake.dir = 'right';
  } else if ((keyCode === UP_ARROW || keyCode === 87) && (!hud.showFinishText) && snake.dir !== 'down') {
    snake.dir = 'up';
  } else if ((keyCode === DOWN_ARROW || keyCode === 83) && (!hud.showFinishText) && snake.dir !== 'up') {
    snake.dir = 'down';
  } else if ((keyCode === 13) && !snake.dir) {
    hud.hideFinish();
    actualHighestScore = highestScore;
    if (gifCreateImg) gifCreateImg.remove();
    gifCreateImg = null;
    hud.showStartText = true;
  }

  if (snake.dir) {
    hud.hideStart();
  }
}

function mouseClicked() {
  if (
    mouseX > 10 &&
    mouseX < 34 &&
    mouseY > 10 &&
    mouseY < 34
  ) {
    console.log('clicou no sfx');
    if (localStorage.getItem('allowsfx') === 'true') {
      localStorage.setItem('allowsfx', 'false');
      tint(0, 0, 0, 126);

      if (music.isPlaying()) {
        music.stop();
      }

      if (biteSound.isPlaying()) {
        biteSound.stop();
      }
    } else {
      localStorage.setItem('allowsfx', 'true');
      tint(0, 0, 0, 255);

      if (!music.isPlaying() && localStorage.getItem('allowsfx') !== 'false') {
        music.play();
      }
    }
  }
}