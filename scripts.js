let settings;
function Settings(field) {
  this.field = field;
  this.fieldWidth = 640;
  this.fieldHeight = 480;
  this.fieldColor = 'rgb(241, 210, 33)';
  this.rocketWidth = '20px';
  this.rocketHeight = '150px';
  this.rocketPlayer1Color = 'rgb(41, 173, 85)';
  this.rocketPlayer2Color = 'rgb(25, 0, 255)';
  this.rocketPlayer1_initialPosY = 5;
  this.rocketPlayer1_actualPosY = this.rocketPlayer1_initialPosY;
  this.rocketPlayer2_initialPosY = 5;
  this.rocketPlayer2_actualPosY = this.rocketPlayer2_initialPosY;
  this.scoreColor = 'rgba(33, 33, 33, 0.7)';
  this.ballRadius = '15px';
  this.ballColor = 'rgb(255, 0, 0)';
  this.ballPositionStart_X = this.field.getBoundingClientRect().top + (this.field.offsetWidth / 2);
  this.ballPositionStart_Y = this.field.getBoundingClientRect().left + (this.field.offsetHeight / 2);
  this.ballHitsCounter = 0;
  this.ballCurrentPosition = {
    currentPos_X: this.ballPositionStart_X,
    currentPos_Y: this.ballPositionStart_Y,
  };
  this.ballCurrentAcceleration = {
    currentAcceleration_X: 0,
    currentAcceleration_Y: 0,
  };
  this.ballSpeed = {
    currentAcceleration_X: 0,
    currentAcceleration_Y: 0,
  };
  this.ballSpeed = 5;
  this.ballActualSpeed = this.ballSpeed;
}



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
  const settings = new Settings(field);
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
  field.style.backgroundColor = settings.fieldColor
  ball.style.width = settings.fieldHeight * 0.075 + 'px';
  ball.style.height = settings.fieldHeight * 0.075 + 'px';
  ball.style.top = settings.rocketPlayer1_actualPosY + '%';
  ball.style.left = settings.rocketPlayer1_actualPosY + '%';
  ball.style.backgroundColor = settings.ballColor;
  racketPlayer_1.style.width = settings.fieldWidth * 0.025 + 'px';
  racketPlayer_1.style.height = settings.fieldHeight * 0.25 + 'px';
  racketPlayer_1.style.top = settings.rocketPlayer1_actualPosY + '%';
  racketPlayer_1.style.backgroundColor = settings.rocketPlayer1Color;
  racketPlayer_2.style.width = settings.fieldWidth * 0.025 + 'px';
  racketPlayer_2.style.height = settings.fieldHeight * 0.25 + 'px';
  racketPlayer_2.style.bottom = settings.rocketPlayer2_actualPosY + '%';
  racketPlayer_2.style.backgroundColor = settings.rocketPlayer2Color;

  racketPlayer_2.style.width = settings.fieldWidth * 0.025 + 'px';
  racketPlayer_2.style.height = settings.fieldHeight * 0.25 + 'px';


}




window.addEventListener('click', function(e){
  console.log(e.clientX, e.clientY)
})