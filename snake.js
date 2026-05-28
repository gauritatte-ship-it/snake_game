//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 1;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); //use for drawing on the board

  placeFood();
  document.addEventListener("keyup", changeDirection);
  //update();
  setInterval(update, 1000 / 4); //100 miliseconds
};

var score = 0;

function updateScore() {
  document.getElementById("score").innerText = score;
}

function update() {
  if (gameOver) return;

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  //Draw food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  //Check if snake eats food
  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
    score += 10; //increase core by 10
    updateScore(); //update score display
  }

  //Move the snake body
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length > 0) {
    snakeBody[0] = [snakeX, snakeY];
  }

  //Move the snake head
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;

  //Draw snake
  context.fillStyle = "lime";
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //game over condition
  //wrap around walls insted of game over
  /*if (snakeX < 0) snakeX = (cols - 1) * blockSize;
  if (snakeX >= cols * blockSize) snakeX = 0;
  if (snakeY < 0) snakeY = (rows - 1) * blockSize;
  if (snakeY >= rows * blockSize) snakeY = 0;*/

  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  //(0-1) * cols -> (0-19.9999) -> (0-19) *25
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
