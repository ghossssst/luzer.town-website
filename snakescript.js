var cellsize = 32;
var rows = 512/cellsize;
var cols = 512/cellsize;
var board;
var ctx;
var framespeed = 10;
var score = 0;

var snake = {
  x: (cellsize),
  y: (cellsize * 7),

  velx: cellsize,
  vely: 0,

  cells: [],

  setcells: 3,
}

var food = {
  x: 0,
  y: 0,
}

window.onload = function() {
  board = document.getElementById("board");
  board.height = rows * cellsize;
  board.width = cols * cellsize;
  ctx = board.getContext("2d");

  placefood();
  setInterval(frame, 1000/framespeed);
}

function frame() {
  
  ctx.clearRect(0,0,board.width,board.height);

  ctx.fillStyle="black";
  ctx.fillRect(food.x+1, food.y+1, cellsize-2, cellsize-2);

  snake.x += snake.velx;
  snake.y += snake.vely;

  if (snake.x < 0 || snake.x >= board.width || snake.y < 0 || snake.y >= board.height) {
    reset();
  }

  snake.cells.unshift({x: snake.x, y: snake.y});

  if (snake.cells.length > snake.setcells) {
    snake.cells.pop();
  }
  
  ctx.lineWidth = 1;
  snake.cells.forEach(function(cell, index){
    ctx.strokeRect(cell.x+1.5, cell.y+1.5, cellsize-3, cellsize-3);
    if (snake.x == food.x && snake.y == food.y) {
      snake.setcells++;
      score++;
      placefood();
    }
    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x == snake.cells[i].x && cell.y == snake.cells[i].y) {
        reset();
      }
    }
  })
}

document.addEventListener("keydown", function(i) {
  if (i.code == "ArrowUp" && snake.vely == 0) {
      snake.vely = -cellsize;
      snake.velx = 0;
  }
  else if (i.code == "ArrowDown" && snake.vely == 0) {
      snake.vely = cellsize;
      snake.velx = 0;
  }
  else if (i.code == "ArrowLeft" && snake.velx == 0) {
      snake.velx = -cellsize;
      snake.vely = 0;
  }
  else if (i.code == "ArrowRight" && snake.velx == 0) {
      snake.velx = cellsize;
      snake.vely = 0;
  }
})

function reset() {
  snake.x = (cellsize);
  snake.y = (cellsize * 7);
  snake.velx = cellsize;
  snake.vely = 0;
  snake.cells = [];
  snake.setcells = 3;
  score = 0;
  placefood()
}

function placefood() {
  document.getElementById("score").innerHTML = score;
  food.x = getRandomInt(0, rows) * cellsize
  food.y = getRandomInt(0, cols) * cellsize 
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
