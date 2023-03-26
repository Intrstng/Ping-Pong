let settings;
function Settings(field) {
  this.field = field;
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
  this.racketSpeed = 5;
  this.ballHitsCounter = 0;
  this.ballSpeed_X = randomBallDirection_X(5);
  this.ballSpeed_Y = randomBallDirection_Y(-4, 4);
  this.ballActualSpeed_X = this.ballSpeed_X;
  this.ballActualSpeed_Y = this.ballSpeed_Y;
  this.playerScoreCounter_1 = 0;
  this.playerScoreCounter_2 = 0;
  this.startCountdown = 3;
  this.isCanBallMove = true;
  this.isCanRacketMove = true;
  this.isUpPressedPlayer_1 = false;
  this.isDownPressedPlayer_1 = false;
  this.isUpPressedPlayer_2 = false;
  this.isDownPressedPlayer_2 = false;
  this.isGameOver = false;
  this.isInitialStart = true;
  this.update = function() {
    const ball = document.querySelector('.ball');
    ball.style.left = this.ballCurrentPosition.currentPos_X + 'px';
    ball.style.top = this.ballCurrentPosition.currentPos_Y + 'px';
    document.querySelector('.racket-player1').style.top = this.racketPlayer1_actualPosY + 'px';
    document.querySelector('.racket-player2').style.bottom = this.racketPlayer2_actualPosY + 'px';
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
  startBtn.addEventListener('click', () => startTimer(settings.startCountdown, startGame));
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

function addStylesToField(settings) {
  const field = document.querySelector('.field');
  const ball = document.querySelector('.ball');
  const racketPlayer_1 = document.querySelector('.racket-player1');
  const racketPlayer_2 = document.querySelector('.racket-player2');
  field.style.width = settings.fieldWidth + 'px';
  field.style.height = settings.fieldHeight + 'px';
  field.style.backgroundColor = settings.fieldColor;
  ball.style.width = settings.ballSize + 'px';
  ball.style.height = settings.ballSize + 'px';
  ball.style.left = settings.ballPositionStart_X + 'px';
  ball.style.top = settings.ballPositionStart_Y + 'px';
  ball.style.backgroundColor = settings.ballColor;
  racketPlayer_1.style.width = settings.racketWidth + 'px';
  racketPlayer_1.style.height = settings.racketHeight + 'px';
  racketPlayer_1.style.top = settings.racketPlayer1_actualPosY + 'px';
  racketPlayer_1.style.backgroundColor = settings.racketPlayer1_color;
  racketPlayer_2.style.width = settings.racketWidth + 'px';
  racketPlayer_2.style.height = settings.racketHeight + 'px';
  racketPlayer_2.style.bottom = settings.racketPlayer2_actualPosY + 'px';
  racketPlayer_2.style.backgroundColor = settings.racketPlayer2_color;
}

function stopAnimation(reqAnim) {
  window.cancelAnimationFrame(reqAnim);
}

function startGame() {
  settings.playerScoreCounter_1 = 0;
  settings.playerScoreCounter_2 = 0;
  settings.isCanRacketMove = true;
  settings.reqAnimMoveBall = window.requestAnimationFrame(moveBall);
}

function startTimer(duration, fn) {
  if (!settings.isGameOver) {
    const startCountdown = document.querySelector('.field__counter');
    settings.ballHitsCounter = 1;                                
    let timer = duration;
    const intervalStartCountdown = setInterval(function () {
      startCountdown.textContent = timer;
      if (--timer < 0) {
        clearInterval(intervalStartCountdown);
        startCountdown.textContent = 'Start!';
        const timerStartCountdown = setTimeout(() => {
          startCountdown.textContent = '';
          fn();
          settings.isInitialStart && moveRacket();
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
      stopAnimation(settings.reqAnimMoveBall);
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
      stopAnimation(settings.reqAnimMoveBall);
      const newGameTimer = setTimeout(() => {
        refreshGameplay();
        clearTimeout(newGameTimer);
      }, 2000);
    }
  }
}

function restart() {
  const racketPlayer_1 = document.querySelector('.racket-player1');
  const racketPlayer_2 = document.querySelector('.racket-player2');
  settings.isCanBallMove = !settings.isCanBallMove;
  settings.isCanRacketMove = !settings.isCanRacketMove;
  settings.ballCurrentPosition.currentPos_X = settings.ballPositionStart_X;
  settings.ballCurrentPosition.currentPos_Y = settings.ballPositionStart_Y;
  racketPlayer_1.style.top = settings.racketPlayer1_actualPosY;
  racketPlayer_2.style.bottom = settings.racketPlayer2_actualPosY;
  moveBall();
}

function refreshGameplay() {
  document.querySelector('.scores__player1').textContent = 0;
  document.querySelector('.scores__player2').textContent = 0;
  document.querySelector('.field__counter').textContent = 'Press Start! to play a new game';
  settings.isGameOver = !settings.isGameOver;
  settings.isCanBallMove = true;
  settings.ballCurrentPosition.currentPos_X = settings.ballPositionStart_X;
  settings.ballCurrentPosition.currentPos_Y = settings.ballPositionStart_Y;
  settings.racketPlayer1_actualPos = settings.racketPlayer1_initialPosY;
  settings.racketPlayer2_actualPos = settings.racketPlayer2_initialPosY;
  settings.update();
}

function keyDownHandler(e) {
  if (settings.isCanRacketMove) {
    switch(e.code) {
      case 'ShiftLeft': settings.isUpPressedPlayer_1 = true;
      break;
      case 'ArrowUp': settings.isUpPressedPlayer_2 = true;
      break;
      case 'ControlLeft': settings.isDownPressedPlayer_1 = true;
      break;
      case 'ArrowDown': settings.isDownPressedPlayer_2 = true;
      break;
      default: false;
    }
  } else if ((!settings.isCanRacketMove)) { //Disable rackets movement between games (if one key is pressed)
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
}
document.addEventListener('keydown', keyDownHandler);

function keyUpHandler(e) {
  if (!settings.isCanRacketMove) return; //Disable rackets movement between games (if two keys are pressed)
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
document.addEventListener('keyup', keyUpHandler);

function moveBall() {
  const fieldTopPosY = settings.field.getBoundingClientRect().top;
  const racketPlayer_1 = document.querySelector('.racket-player1');
  const racketPlayer_2 = document.querySelector('.racket-player2');
  if (settings.isCanBallMove) {
    settings.ballCurrentPosition.currentPos_X += settings.ballActualSpeed_X;
    //Проверка не вылетел ли мяч за пределы правой ракетки
    if (settings.ballCurrentPosition.currentPos_X + settings.ballSize > settings.fieldWidth - settings.racketWidth
        && settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 > racketPlayer_2.getBoundingClientRect().top - fieldTopPosY
        && settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 < racketPlayer_2.getBoundingClientRect().bottom - fieldTopPosY) {
      settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
      settings.ballCurrentPosition.currentPos_X = settings.fieldWidth - settings.racketWidth - settings.ballSize;
      settings.ballHitsCounter++;
    } else if (settings.ballCurrentPosition.currentPos_X + settings.ballSize > settings.fieldWidth) {
        settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
        settings.ballCurrentPosition.currentPos_X = settings.fieldWidth - settings.ballSize;
        settings.isCanBallMove = !settings.isCanBallMove;
        settings.isCanRacketMove = !settings.isCanRacketMove;
        window.removeEventListener('keydown', keyDownHandler);
        settings.playerScoreCounter_1++;
        showScore('player1', settings.playerScoreCounter_1);
        startTimer(settings.startCountdown, restart);
        stopAnimation(settings.reqAnimMoveBall);
      }
    // Проверка не вылетел ли мяч за пределы левой ракетки
    if (settings.ballCurrentPosition.currentPos_X < settings.racketWidth
      && settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 > racketPlayer_1.getBoundingClientRect().top - fieldTopPosY
      && settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 < racketPlayer_1.getBoundingClientRect().bottom - fieldTopPosY) {
    settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
    settings.ballCurrentPosition.currentPos_X = settings.racketWidth;
    settings.ballHitsCounter++;
    } else if (settings.ballCurrentPosition.currentPos_X < 0) {
        settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
        settings.ballCurrentPosition.currentPos_X = 0;
        settings.isCanBallMove = !settings.isCanBallMove;
        settings.isCanRacketMove = !settings.isCanRacketMove;
        window.removeEventListener('keydown', keyDownHandler);
        settings.playerScoreCounter_2++;
        showScore('player2', settings.playerScoreCounter_2);
        startTimer(settings.startCountdown, restart);
        stopAnimation(settings.reqAnimMoveBall);
      }
    settings.ballCurrentPosition.currentPos_Y += settings.ballActualSpeed_Y;
    // Проверка не вылетел ли мяч за пределы нижней границы поля 
    if (settings.ballCurrentPosition.currentPos_Y + settings.ballSize > settings.fieldHeight) {
      settings.ballActualSpeed_Y = -settings.ballActualSpeed_Y;
      settings.ballCurrentPosition.currentPos_Y = settings.fieldHeight - settings.ballSize;
    }
    // Проверка не вылетел ли мяч за пределы верхней границы поля
    if (settings.ballCurrentPosition.currentPos_Y < 0) {
      settings.ballActualSpeed_Y = -settings.ballActualSpeed_Y;
      settings.ballCurrentPosition.currentPos_Y = 0;
    }
    settings.update();
    settings.reqAnimMoveBall = window.requestAnimationFrame(moveBall);
  }
}

function moveRacket() {
    const fieldTopPosY = settings.field.getBoundingClientRect().top;
    const fieldBottomPosY = settings.field.getBoundingClientRect().bottom;
    const racketPlayer_1 = document.querySelector('.racket-player1');
    const racketPlayer_2 = document.querySelector('.racket-player2');
      if (settings.isUpPressedPlayer_1) {
        settings.racketPlayer1_actualPosY -= settings.racketSpeed;
        if (settings.isUpPressedPlayer_1 && racketPlayer_1.getBoundingClientRect().top - settings.racketSpeed < fieldTopPosY) {
          settings.racketPlayer1_actualPosY = 0;
        }
      } else if (settings.isDownPressedPlayer_1) {
        settings.racketPlayer1_actualPosY += settings.racketSpeed;
        if (racketPlayer_1.getBoundingClientRect().bottom + settings.racketSpeed > fieldBottomPosY) {
          settings.racketPlayer1_actualPosY = settings.fieldHeight - settings.racketHeight;
        } 
      }
      if (settings.isDownPressedPlayer_2) {
        settings.racketPlayer2_actualPosY -= settings.racketSpeed;
        if (racketPlayer_2.getBoundingClientRect().bottom + settings.racketSpeed > fieldBottomPosY) {
          settings.racketPlayer2_actualPosY = 0;
        }
      } else if (settings.isUpPressedPlayer_2) {
        settings.racketPlayer2_actualPosY += settings.racketSpeed;
        if (racketPlayer_2.getBoundingClientRect().top - settings.racketSpeed < fieldTopPosY) {
          settings.racketPlayer2_actualPosY = settings.fieldHeight - settings.racketHeight;
        } 
      }
      window.requestAnimationFrame(moveRacket);
}