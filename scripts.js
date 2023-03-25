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
  this.ballSize = ((this.fieldWidth + this.fieldHeight) / 2) * 0.06;
  this.ballColor = 'rgb(255, 0, 0)';
  this.ballPositionStart_X = (this.fieldWidth / 2) - this.ballSize / 2;
  this.ballPositionStart_Y = (this.fieldHeight / 2) - this.ballSize / 2;
  this.ballCurrentPosition = {
    currentPos_X: this.ballPositionStart_X,
    currentPos_Y: this.ballPositionStart_Y,
  };
  this.racketSpeed = 18;
  this.ballHitsCounter = 1;
  this.ballSpeed_X = randomBallDirection_X(5);
  this.ballSpeed_Y = randomBallDirection_Y(-4, 4);
  this.ballActualSpeed_X = this.ballSpeed_X;
  this.ballActualSpeed_Y = this.ballSpeed_Y;
  this.playerScoreCounter_1 = 0;
  this.playerScoreCounter_2 = 0;
  this.startCountdown = 3;
  this.isCanBallMove = true;
  this.isGameOver = false;
  this.isCanRocketPlayer_1_Move = true;
  this.isCanRocketPlayer_2_Move = true;
  this.update = function() {
    const ball = document.querySelector('.ball');
    ball.style.left = this.ballCurrentPosition.currentPos_X + 'px';
    ball.style.top = this.ballCurrentPosition.currentPos_Y + 'px';
    document.querySelector('.racket-player1').style.top = this.racketPlayer1_actualPosY + 'px';
    document.querySelector('.racket-player2').style.bottom = this.racketPlayer2_actualPosY + 'px';
  }
}
function randomBallDirection_X(ballSpeed_X) {
  const randomNumber = Math.round(Math.random() * ballSpeed_X);
  const direction_X = randomNumber % 2 === 0 ? -1 : 1;
  return ballSpeed_X * direction_X;
}
function randomBallDirection_Y(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function startGame() {
  settings.playerScoreCounter_1 = 0;
  settings.playerScoreCounter_2 = 0;
  settings.reqAnimMoveBall = window.requestAnimationFrame(moveBall);
}

function showScore(player, score) {
  const scorePlayer_1 = document.querySelector('.scores__player1');
  const scorePlayer_2 = document.querySelector('.scores__player2');
  const winner = document.querySelector('.field__counter');
  if (player === 'player1') {
    scorePlayer_1.textContent = score;
    if (score >= 5) {
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
    if (score >= 5) {
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

function moveBall() {
  const fieldTopPosY = settings.field.getBoundingClientRect().top;
  // const fieldLeftPosX = settings.field.getBoundingClientRect().left;
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
                                  // settings.ballCurrentPosition.currentPos_X += 1;  
                                  // settings.update();  
                                  // console.log(settings.ballHitsCounter)
    } else if (settings.ballCurrentPosition.currentPos_X + settings.ballSize > settings.fieldWidth) {
        settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
        settings.ballCurrentPosition.currentPos_X = settings.fieldWidth - settings.ballSize;
        settings.isCanBallMove = !settings.isCanBallMove;
        window.removeEventListener('keydown', moveRacket);
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
                                // settings.ballCurrentPosition.currentPos_X += 1;
                                // settings.update();
                                // console.log(settings.ballHitsCounter)
    } else if (settings.ballCurrentPosition.currentPos_X < 0) {
        settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
        settings.ballCurrentPosition.currentPos_X = 0;
        settings.isCanBallMove = !settings.isCanBallMove;
        window.removeEventListener('keydown', moveRacket);
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


function startTimer(duration, fn) {
  console.log('Start!')
  if (!settings.isGameOver) {
    const startCountdown = document.querySelector('.field__counter');
    settings.ballHitsCounter = 1;                                
    let timer = duration;
    const intervalStartCountdown = setInterval(function () {
      startCountdown.textContent = timer;
      if (--timer < 0) {
        clearInterval(intervalStartCountdown);
        startCountdown.textContent = 'Start!';
        fn();
        const timerStartCountdown = setTimeout(() => {
          startCountdown.textContent = '';
                                          window.addEventListener('keydown', moveRacket);
          clearTimeout(timerStartCountdown);
        }, 600)
      }
    }, 600);
  }
}



function moveRacket(e) {
  e.preventDefault();
  const fieldTopPosY = settings.field.getBoundingClientRect().top;
  const fieldBottomPosY = settings.field.getBoundingClientRect().bottom;
  const racketPlayer_1 = document.querySelector('.racket-player1');
  const racketPlayer_2 = document.querySelector('.racket-player2');
  const keyPlayer_1 = e.code === 'ShiftLeft' ? -settings.racketSpeed
                    : e.code === 'ControlLeft' ? settings.racketSpeed : false;
  const keyPlayer_2 = e.code === 'ArrowUp' ? settings.racketSpeed
                    : e.code === 'ArrowDown' ? -settings.racketSpeed : false;
    if (keyPlayer_1) {
      settings.racketPlayer1_actualPosY += keyPlayer_1;
      if (e.code === 'ShiftLeft'
          && racketPlayer_1.getBoundingClientRect().top + keyPlayer_1 < fieldTopPosY) {
settings.racketPlayer1_actualPosY = 0;
      } else if (e.code === 'ControlLeft'
                  && racketPlayer_1.getBoundingClientRect().bottom + keyPlayer_1 > fieldBottomPosY) {
          settings.racketPlayer1_actualPosY = settings.fieldHeight - settings.racketHeight;
        } 
    }
    if (keyPlayer_2) {
      settings.racketPlayer2_actualPosY += keyPlayer_2;
      if (e.code === 'ArrowDown'
          && racketPlayer_2.getBoundingClientRect().bottom - keyPlayer_2 > fieldBottomPosY) {
        settings.racketPlayer2_actualPosY = 0;
      } else if (e.code === 'ArrowUp'
                && racketPlayer_2.getBoundingClientRect().top - keyPlayer_2 < fieldTopPosY) {
          settings.racketPlayer2_actualPosY = settings.fieldHeight - settings.racketHeight;
        }
    }
}


// const ball = document.querySelector('.ball');
// const startCountdown = document.querySelector('.field__counter');
// let timer = duration;
// ball.style.display = 'block';

function stopAnimation(reqAnim) {
  window.cancelAnimationFrame(reqAnim);
}


function restart() {
  const racketPlayer_1 = document.querySelector('.racket-player1');
  const racketPlayer_2 = document.querySelector('.racket-player2');
    settings.isCanBallMove = !settings.isCanBallMove;
    // console.log(settings.ballPositionStart_X)
    // console.log(settings.ballPositionStart_Y)


    settings.ballCurrentPosition.currentPos_X = settings.ballPositionStart_X;
    settings.ballCurrentPosition.currentPos_Y = settings.ballPositionStart_Y;
                                                  // settings.ballActualSpeed_Y /= 2;
    racketPlayer_1.style.top = settings.racketPlayer1_actualPosY;
    racketPlayer_2.style.bottom = settings.racketPlayer2_actualPosY;
    // window.addEventListener('keydown', moveRacket);
    moveBall()
                                                  // window.cancelAnimationFrame(settings.reqAnimMoveBall);
}



function refreshGameplay() {
  document.querySelector('.scores__player1').textContent = 0;
  document.querySelector('.scores__player2').textContent = 0;
  document.querySelector('.field__counter').textContent = 'Press start to play a new game';
  settings.isGameOver = !settings.isGameOver;
  settings.isCanBallMove = true;
  settings.ballCurrentPosition.currentPos_X = settings.ballPositionStart_X;
  settings.ballCurrentPosition.currentPos_Y = settings.ballPositionStart_Y;
  settings.racketPlayer1_actualPos = settings.racketPlayer1_initialPosY;
  settings.racketPlayer2_actualPos = settings.racketPlayer2_initialPosY;
  settings.update();
}







window.addEventListener('click', function(e){
  console.log(e.clientX, e.clientY)
})