// Define the size of each cell in the game grid
var cellsize = 32;

// Calculate the number of rows and columns based on the canvas size and cell size
var rows = 512 / cellsize;
var cols = 512 / cellsize;

// Declare variables for the game board, drawing context, frame speed, and score
var board;
var ctx;
var framespeed = 10;
var score = 0;

// Define the snake object with its initial position, velocity, and initial body cells
var snake = {
  x: cellsize,
  y: cellsize * 7,
  velx: cellsize,
  vely: 0,
  cells: [],
  setcells: 3,
};

// Define the food object with its initial position
var food = {
  x: 0,
  y: 0,
};

// Function to initialize the game when the window loads
window.onload = function() {
  // Get the game board canvas element and set its dimensions
  board = document.getElementById("board");
  board.height = rows * cellsize;
  board.width = cols * cellsize;
  // Get the 2D drawing context of the canvas
  ctx = board.getContext("2d");

  // Place the initial food on the board
  placefood();

  // Start the game loop with the specified frame speed
  setInterval(frame, 1000 / framespeed);
};

// Function to update the game state and render the frame
function frame() {
  // Clear the entire canvas
  ctx.clearRect(0, 0, board.width, board.height);

  // Draw the food on the board
  ctx.fillStyle = "black";
  ctx.fillRect(food.x + 1, food.y + 1, cellsize - 2, cellsize - 2);

  // Update the snake's position based on its velocity
  snake.x += snake.velx;
  snake.y += snake.vely;

  // Check for collisions with the walls and reset the game if necessary
  if (snake.x < 0 || snake.x >= board.width || snake.y < 0 || snake.y >= board.height) {
    reset();
  }

  // Add the snake's head to the beginning of its cells array
  snake.cells.unshift({ x: snake.x, y: snake.y });

  // Remove the tail cell if the snake's length exceeds the set number of cells
  if (snake.cells.length > snake.setcells) {
    snake.cells.pop();
  }

  // Draw each cell of the snake's body and check for collisions with food
  ctx.lineWidth = 1;
  snake.cells.forEach(function(cell, index) {
    ctx.strokeRect(cell.x + 1.5, cell.y + 1.5, cellsize - 3, cellsize - 3);
    if (snake.x === food.x && snake.y === food.y) {
      snake.setcells++;
      score++;
      placefood();
      document.getElementById("score").innerHTML = score;
    }
    // Check for collisions between the snake's head and its body
    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        reset();
      }
    }
  });
}

// Event listener for keyboard input to control the snake's movement
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowUp" && snake.vely === 0) {
    snake.vely = -cellsize;
    snake.velx = 0;
  } else if (event.code === "ArrowDown" && snake.vely === 0) {
    snake.vely = cellsize;
    snake.velx = 0;
  } else if (event.code === "ArrowLeft" && snake.velx === 0) {
    snake.velx = -cellsize;
    snake.vely = 0;
  } else if (event.code === "ArrowRight" && snake.velx === 0) {
    snake.velx = cellsize;
    snake.vely = 0;
  }
});

// Function to reset the game state
function reset() {
  snake.x = cellsize;
  snake.y = cellsize * 7;
  snake.velx = cellsize;
  snake.vely = 0;
  snake.cells = [];
  snake.setcells = 3;
  score = 0;
  placefood();
}

// Function to randomly place food on the board
function placefood() {
  var validPosition = false;
  while (!validPosition) {
    food.x = getRandomInt(0, cols) * cellsize;
    food.y = getRandomInt(0, rows) * cellsize;
    validPosition = true;
    for (var i = 0; i < snake.cells.length; i++) {
      if (food.x === snake.cells[i].x && food.y === snake.cells[i].y) {
        validPosition = false;
        break;
      }
    }
  }
}

// Function to generate a random integer within a specified range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

