let settings;
function Settings(field) {
  this.field = field;
  this.fieldWidth = 640;
  this.fieldHeight = 480;
  this.fieldColor = 'rgb(241, 210, 33)';
  this.racketWidth = this.fieldWidth * 0.025;
  this.racketHeight = this.fieldHeight * 0.26;
  this.racketPlayer1Color = 'rgb(41, 173, 85)';
  this.racketPlayer2Color = 'rgb(25, 0, 255)';
  this.racketPlayer1_initialPosY = this.fieldWidth * 0.04;
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
  this.rocketSpeed = 14;
  this.ballSpeed_X = 5;
  this.ballSpeed_Y = 4;
  this.ballActualSpeed_X = this.ballSpeed_X;
  this.ballActualSpeed_Y = this.ballSpeed_Y;
  this.ballHitsCounter = 0;
  this.playerScoreCounter_1 = 0;
  this.playerScoreCounter_2 = 0;
  this.isCanBallMove = true;
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

function buildControls() {
  const controls = document.createElement('div');
  controls.className = 'controls';
  const startBtn = document.createElement('button');
  startBtn.className = 'start-btn start-btn_hover start-btn_active';
  startBtn.innerHTML = `<img src="https://img.icons8.com/ios/20/null/ping-pong.png"/>Start!`;
  const scores = document.createElement('div');
  scores.className = 'scores';
  scores.innerHTML = `<div class="scores__player1">1</div>
                        <span>&#58</span>
                          <div class="scores__player2">2</div>`;
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
  racketPlayer_1.style.backgroundColor = settings.racketPlayer1Color;
  racketPlayer_2.style.width = settings.racketWidth + 'px';
  racketPlayer_2.style.height = settings.racketHeight + 'px';
  racketPlayer_2.style.bottom = settings.racketPlayer2_actualPosY + 'px';
  racketPlayer_2.style.backgroundColor = settings.racketPlayer2Color;
}

function moveBall() {
  const fieldTopPosY = settings.field.getBoundingClientRect().top;
  const racketPlayer_1 = document.querySelector('.racket-player1');
  const racketPlayer_2 = document.querySelector('.racket-player2');
  if (settings.isCanBallMove) {
    settings.ballCurrentPosition.currentPos_X += settings.ballActualSpeed_X;
    //Проверка не вылетел ли мяч за пределы правой границы поля
    
    if (settings.ballCurrentPosition.currentPos_X + settings.ballSize > settings.fieldWidth - settings.racketWidth
        && settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 > racketPlayer_2.getBoundingClientRect().top - fieldTopPosY
        && settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 < racketPlayer_2.getBoundingClientRect().bottom - fieldTopPosY) {
      settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
      settings.ballCurrentPosition.currentPos_X = settings.fieldWidth - settings.racketWidth - settings.ballSize;
    } 
    //   else if (settings.ballCurrentPosition.currentPos_X  + settings.ballSize < settings.fieldWidth) {
    //   settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
    //   settings.ballCurrentPosition.currentPos_X = 0;
    //   settings.isCanBallMove = !settings.isCanBallMove;
    // }



    // else if (settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 < racketPlayer_2.getBoundingClientRect().top - fieldTopPosY
    //   || settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 > racketPlayer_2.getBoundingClientRect().bottom - fieldTopPosY
    //   || settings.ballCurrentPosition.currentPos_X + settings.ballSize > settings.fieldWidth - settings.racketWidth) {
    //   settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
    //   settings.ballCurrentPosition.currentPos_X = settings.fieldWidth - settings.ballSize;
    //   // settings.isCanBallMove = false;
    //   settings.playerScoreCounter_1++;
    // }
    // Проверка не вылетел ли мяч за пределы левой границы поля
                             
console.log('currentPos_X', settings.ballCurrentPosition.currentPos_X)
console.log(racketPlayer_1.getBoundingClientRect().top - fieldTopPosY)

                              if (settings.ballCurrentPosition.currentPos_X < settings.racketWidth
                                && settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 > racketPlayer_1.getBoundingClientRect().top - fieldTopPosY
                                && settings.ballCurrentPosition.currentPos_Y + settings.ballSize / 2 < racketPlayer_1.getBoundingClientRect().bottom - fieldTopPosY) {
                              settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
                              settings.ballCurrentPosition.currentPos_X = settings.racketWidth;
                              } else if (settings.ballCurrentPosition.currentPos_X < 0) {
                                  settings.ballActualSpeed_X = -settings.ballActualSpeed_X;
                                  settings.ballCurrentPosition.currentPos_X = 0;
                                  settings.isCanBallMove = !settings.isCanBallMove;
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
  requestAnimationFrame(moveBall);
  }
}
requestAnimationFrame(moveBall);














function moveRacket(e) {
  e.preventDefault();
  const fieldTopPosY = settings.field.getBoundingClientRect().top;
  const fieldBottomPosY = settings.field.getBoundingClientRect().bottom;
  const racketPlayer_1 = document.querySelector('.racket-player1');
  const racketPlayer_2 = document.querySelector('.racket-player2');
  const keyPlayer_1 = e.code === 'ShiftLeft' ? -settings.rocketSpeed
                    : e.code === 'ControlLeft' ? settings.rocketSpeed : false;
  const keyPlayer_2 = e.code === 'ArrowUp' ? settings.rocketSpeed
                    : e.code === 'ArrowDown' ? -settings.rocketSpeed : false;
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
window.addEventListener('keydown', moveRacket);



function restart(e) {
 if (e.code === 'Space') {
  settings.isCanBallMove = !settings.isCanBallMove;

  settings.ballCurrentPosition.currentPos_X = settings.ballPositionStart_X;
  settings.ballCurrentPosition.currentPos_Y = settings.ballPositionStart_Y;
  moveBall()
 }
}
window.addEventListener('keydown', restart);










window.addEventListener('click', function(e){
  console.log(e.clientX, e.clientY)
})






