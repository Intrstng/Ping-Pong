let settings;
let requestAnim = window.requestAnimationFrame ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame ||
                  window.oRequestAnimationFrame ||
                  window.msRequestAnimationFrame ||
                  function(callback) { window.setTimeout(callback, 1000 / 60); }

function Settings(field) {
  this.field = field;
  this.ball = document.querySelector('.ball');
  this.racket_1 = document.querySelector('.racket-player1')
  this.racket_2 = document.querySelector('.racket-player2')
  this.fieldWidth = 800;
  this.fieldHeight = 600;
  this.fieldColor = 'rgb(241, 210, 33)';
  this.racketWidth = this.fieldWidth * 0.025;
  this.racketHeight = this.fieldHeight * 0.26;
  this.racketPlayer1_color = 'rgb(41, 173, 85)';
  this.racketPlayer2_color = 'rgb(25, 0, 255)';
  this.racketPlayer1_initialPosY = this.fieldHeight * 0.04;
  this.racketPlayer1_actualPosY = this.racketPlayer1_initialPosY;
  this.racketPlayer2_initialPosY = this.fieldHeight * 0.04;
  this.racketPlayer2_actualPosY = this.racketPlayer2_initialPosY;
  this.scoreColor = 'rgba(33, 33, 33, 0.7)';
  this.ballSize = ((this.fieldWidth + this.fieldHeight) / 2) * 0.05;
  this.ballColor = 'rgb(255, 0, 0)';
  this.ballPositionStart_X = (this.fieldWidth / 2) - this.ballSize / 2;
  this.ballPositionStart_Y = (this.fieldHeight / 2) - this.ballSize / 2;
  this.ballCurrentPosition = {
    currentPos_X: this.ballPositionStart_X,
    currentPos_Y: this.ballPositionStart_Y,
  };
  this.racketSpeed = 8;
  this.startCountdown = 3;
  this.ballSpeed_X = randomBallDirection_X(7);
  this.ballSpeed_Y = randomBallDirection_Y(-4, 4);
  this.ballActualSpeed_X = this.ballSpeed_X;
  this.ballActualSpeed_Y = this.ballSpeed_Y;
  this.playerScoreCounter_1 = 0;
  this.playerScoreCounter_2 = 0;
  this.isCanBallMove = true;
  this.isCanRacketMove = true;
  this.isUpPressedPlayer_1 = false;
  this.isDownPressedPlayer_1 = false;
  this.isUpPressedPlayer_2 = false;
  this.isDownPressedPlayer_2 = false;
  this.isGameOver = false;
  this.isInitialStart = true;
  this.update = function() {
    this.ball.style.left = this.ballCurrentPosition.currentPos_X + 'px';
    this.ball.style.top = this.ballCurrentPosition.currentPos_Y + 'px';
    this.racket_1.style.top = this.racketPlayer1_actualPosY + 'px';
    this.racket_2.style.bottom = this.racketPlayer2_actualPosY + 'px';
  };
}
function randomBallDirection_X(ballSpeed_X) {
  const randomNumber = Math.round(Math.random() * ballSpeed_X);
  const direction_X = randomNumber % 2 === 0 ? -1 : 1;
  return ballSpeed_X * direction_X;
}
function randomBallDirection_Y(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function buildControls() {
  const controls = document.createElement('div');
  controls.className = 'controls';
  const startBtn = document.createElement('button');
  startBtn.className = 'start-btn start-btn_hover start-btn_active';
  startBtn.innerHTML = `<img src="https://img.icons8.com/ios/20/null/ping-pong.png"/>Start!`;
  const scores = document.createElement('div');
  scores.className = 'scores';
  scores.innerHTML = `<div class="scores__player1">0</div>
                        <span>&#58</span>
                          <div class="scores__player2">0</div>`;
  controls.append(startBtn);
  controls.append(scores);
  document.body.append(controls);
}
window.onload = buildControls();

function buildField() {
  const field = document.createElement('div');
  field.className = 'field';
  document.body.append(field);
  const fieldCounter = document.createElement('div');
  fieldCounter.className = 'field__counter';
  field.append(fieldCounter);
  const racket_1 = document.createElement('div');
  racket_1.className = 'racket racket-player1';
  field.append(racket_1);
  const racket_2 = document.createElement('div');
  racket_2.className = 'racket racket-player2';
  field.append(racket_2);
  const ball = document.createElement('div');
  ball.className = 'ball';
  field.append(ball);
  settings = new Settings(field);
  addStylesToField(settings);
}
window.onload = buildField();

const curryHandler = function(duration, fn) {
  return () => startTimer(duration, fn);
}; 
const startBtnHandler = curryHandler(settings.startCountdown, startGame);
document.querySelector('.start-btn').addEventListener('click', startBtnHandler);

function addStylesToField(settings) {
  settings.field.style.width = settings.fieldWidth + 'px';
  settings.field.style.height = settings.fieldHeight + 'px';
  settings.field.style.backgroundColor = settings.fieldColor;
  settings.ball.style.width = settings.ballSize + 'px';
  settings.ball.style.height = settings.ballSize + 'px';
  settings.ball.style.left = settings.ballPositionStart_X + 'px';
  settings.ball.style.top = settings.ballPositionStart_Y + 'px';
  settings.ball.style.backgroundColor = settings.ballColor;
  settings.racket_1.style.width = settings.racketWidth + 'px';
  settings.racket_1.style.height = settings.racketHeight + 'px';
  settings.racket_1.style.top = settings.racketPlayer1_actualPosY + 'px';
  settings.racket_1.style.backgroundColor = settings.racketPlayer1_color;
  settings.racket_2.style.width = settings.racketWidth + 'px';
  settings.racket_2.style.height = settings.racketHeight + 'px';
  settings.racket_2.style.bottom = settings.racketPlayer2_actualPosY + 'px';
  settings.racket_2.style.backgroundColor = settings.racketPlayer2_color;
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const countdownSound = new Audio('http://tastyspleen.net/~quake2/baseq2/sound/world/clock.wav');
const startGameSound = new Audio('http://www.superluigibros.com/downloads/sounds/SNES/SMRPG/wav/smrpg_battle_punch.wav');
const wallHitSound = new Audio('http://david.guerrero.free.fr/Effects/DrillImpact.wav');
const racketHitSound = new Audio('http://4umi.com/web/sound/tennis.wav');
const missSound = new Audio('http://web.mit.edu/sahughes/www/Sounds/m=100.mp3');
const fanfareSound = new Audio('http://cd.textfiles.com/maxsounds/WAV/EFEITOS/FANFARE.WAV');

// function gameSoundInit(...args) {
//   for (let arg of args) {
//     arg.play();
//     arg.pause();
//   }
// }

function gameSound(item) {
  item.currentTime = 0;
  item.play();
}

function startGame() {
  settings.playerScoreCounter_1 = 0;
  settings.playerScoreCounter_2 = 0;
  settings.isCanRacketMove = true;
  moveBall(); // window.requestAnimationFrame(moveBall);
}

function startTimer(duration, fn) {
  // gameSoundInit(countdownSound, startGameSound, wallHitSound, racketHitSound, missSound, fanfareSound);
  document.querySelector('.start-btn').removeEventListener('click', startBtnHandler);
  if (!settings.isGameOver) {
    const startCountdown = document.querySelector('.field__counter');                            
    let timer = duration;
    const intervalStartCountdown = setInterval(function () {
      gameSound(countdownSound);
      startCountdown.textContent = timer;
      if (--timer < 0) {
        clearInterval(intervalStartCountdown);
        startCountdown.textContent = 'Start!';
        const timerStartCountdown = setTimeout(() => {
          gameSound(startGameSound);
          startCountdown.textContent = '';
          fn();
          settings.isInitialStart = false;            
          clearTimeout(timerStartCountdown);
        }, 600)
      }
    }, 600);
  }
}

function showScore(player, score) {
  const scorePlayer_1 = document.querySelector('.scores__player1');
  const scorePlayer_2 = document.querySelector('.scores__player2');
  const winner = document.querySelector('.field__counter');
  if (player === 'player1') {
    scorePlayer_1.textContent = score;
    if (score >= 2) {
      winner.textContent = 'Player 1 Wins!';
      settings.isGameOver = true;
      gameSound(fanfareSound);
      const newGameTimer = setTimeout(() => {
        refreshGameplay();
        clearTimeout(newGameTimer);
      }, 2000);
    }
  } else if (player === 'player2') {
    scorePlayer_2.textContent = score;
    if (score >= 2) {
      winner.textContent = 'Player 2 Wins!';
      settings.isGameOver = true;
      gameSound(fanfareSound);
      const newGameTimer = setTimeout(() => {
        refreshGameplay();
        clearTimeout(newGameTimer);
      }, 2000);
    }
  }
}

function restart() {
  settings.isCanBallMove = !settings.isCanBallMove;
  settings.isCanRacketMove = !settings.isCanRacketMove;
  settings.ballCurrentPosition.currentPos_X = settings.ballPositionStart_X;
  settings.ballCurrentPosition.currentPos_Y = settings.ballPositionStart_Y;
  moveBall();
}

function refreshGameplay() {
  document.querySelector('.start-btn').addEventListener('click', startBtnHandler);
  document.querySelector('.scores__player1').textContent = 0;
  document.querySelector('.scores__player2').textContent = 0;
  document.querySelector('.field__counter').textContent = 'Press Start! to play a new game';
  settings.isGameOver = !settings.isGameOver;
  settings.isCanBallMove = true;
  settings.ballCurrentPosition.currentPos_X = settings.ballPositionStart_X;
  settings.ballCurrentPosition.currentPos_Y = settings.ballPositionStart_Y;
}

function keyDownHandler(e) {
  if (e.repeat == false && settings.isCanRacketMove) {
    if (e.code === 'ShiftLeft') {settings.isUpPressedPlayer_1 = true; moveLeftRacket();} 
    if (e.code === 'ControlLeft') { settings.isDownPressedPlayer_1 = true; moveLeftRacket();}
    if (e.code === 'ArrowUp') {settings.isUpPressedPlayer_2 = true; moveRightRacket();}
    if (e.code === 'ArrowDown') {settings.isDownPressedPlayer_2 = true; moveRightRacket();}
  }
}

function keyUpHandler(e) {
  switch(e.code) {
    case 'ShiftLeft': settings.isUpPressedPlayer_1 = false;
      break;
    case 'ArrowUp': settings.isUpPressedPlayer_2 = false;
    break;
    case 'ControlLeft': settings.isDownPressedPlayer_1 = false;
      break;
    case 'ArrowDown': settings.isDownPressedPlayer_2 = false;
      break;
    default: false;
  }
}

function moveBall() {
  const fieldTopPosY = settings.field.getBoundingClientRect().top;
  if (settings.isCanBallMove) {
    settings.ballCurrentPosition.currentPos_X += settings.ballActualSpeed_X;
    // Checking if the ball hits the right racket
    if (settings.ballCurrentPosition.currentPos_X + settings.ballSize > settings.fieldWidth - settings.racketWidth
        && settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 > settings.racket_2.getBoundingClientRect().top - fieldTopPosY
        && settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 < settings.racket_2.getBoundingClientRect().bottom - fieldTopPosY) {
      settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
      settings.ballCurrentPosition.currentPos_X = settings.fieldWidth - settings.racketWidth - settings.ballSize;
      gameSound(racketHitSound);
    } else if (settings.ballCurrentPosition.currentPos_X + settings.ballSize > settings.fieldWidth) {
        gameSound(missSound);
        settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
        settings.ballCurrentPosition.currentPos_X = settings.fieldWidth - settings.ballSize;
        settings.isCanBallMove = !settings.isCanBallMove;
        settings.isCanRacketMove = !settings.isCanRacketMove;
        settings.playerScoreCounter_1++;
        showScore('player1', settings.playerScoreCounter_1);
        startTimer(settings.startCountdown, restart);
      }
    // Checking if the ball hits the left racket
    if (settings.ballCurrentPosition.currentPos_X < settings.racketWidth
      && settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 > settings.racket_1.getBoundingClientRect().top - fieldTopPosY
      && settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 < settings.racket_1.getBoundingClientRect().bottom - fieldTopPosY) {
    settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
    settings.ballCurrentPosition.currentPos_X = settings.racketWidth;
    gameSound(racketHitSound);
    } else if (settings.ballCurrentPosition.currentPos_X < 0) {
        gameSound(missSound);
        settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
        settings.ballCurrentPosition.currentPos_X = 0;
        settings.isCanBallMove = !settings.isCanBallMove;
        settings.isCanRacketMove = !settings.isCanRacketMove;
        settings.playerScoreCounter_2++;
        showScore('player2', settings.playerScoreCounter_2);
        startTimer(settings.startCountdown, restart);  
      }
    settings.ballCurrentPosition.currentPos_Y += settings.ballActualSpeed_Y;
    // Checking if the ball is inside the bottom bound
    if (settings.ballCurrentPosition.currentPos_Y + settings.ballSize > settings.fieldHeight) {
      settings.ballActualSpeed_Y = -settings.ballActualSpeed_Y;
      settings.ballCurrentPosition.currentPos_Y = settings.fieldHeight - settings.ballSize;
      gameSound(wallHitSound);
    }
    // Checking if the ball is inside the top bound
    if (settings.ballCurrentPosition.currentPos_Y < 0) {
      settings.ballActualSpeed_Y = -settings.ballActualSpeed_Y;
      settings.ballCurrentPosition.currentPos_Y = 0;
      gameSound(wallHitSound);
    }
    settings.update();
    requestAnim(moveBall);
  }
}

function moveLeftRacket() {
  if (settings.isUpPressedPlayer_1) {
      settings.racketPlayer1_actualPosY -= settings.racketSpeed;
      if (settings.racket_1.offsetTop - settings.racketSpeed < 0) {
        settings.racketPlayer1_actualPosY = 0;
      }
      requestAnim(moveLeftRacket);
  }
  if (settings.isDownPressedPlayer_1) {
      settings.racketPlayer1_actualPosY += settings.racketSpeed;
      if (settings.racket_1.offsetTop + settings.racketHeight + settings.racketSpeed > settings.fieldHeight) {
        settings.racketPlayer1_actualPosY = settings.fieldHeight - settings.racketHeight;
      } 
      requestAnim(moveLeftRacket);
  }
  settings.update();
}

function moveRightRacket() {
  if (settings.isDownPressedPlayer_2) {
    settings.racketPlayer2_actualPosY -= settings.racketSpeed;
    if (settings.racket_2.offsetTop + settings.racketHeight + settings.racketSpeed > settings.fieldHeight) {
      settings.racketPlayer2_actualPosY = 0;
    }
    requestAnim(moveRightRacket);
  }
  if (settings.isUpPressedPlayer_2) {
    settings.racketPlayer2_actualPosY += settings.racketSpeed;
    if (settings.racket_2.offsetTop - settings.racketSpeed < 0) {
      settings.racketPlayer2_actualPosY = settings.fieldHeight - settings.racketHeight;
    } 
    requestAnim(moveRightRacket);
  }
  settings.update();
}









