(function () {

    function vw(percent) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let width = Number ((percent * w) / 100)
    console.log(width);
    return width;
    }

    // Define the size of each cell in the game grid
    var cellsize = vw(2);

    // Calculate the number of rows and columns based on the canvas size and cell size
    var rows = vw(80) / cellsize;
    var cols = vw(80) / cellsize;

    // Declare variables for the game board, drawing context, frame speed, and score
    var board;
    var ctx;
    var framespeed = 10;
    var score = 0;

    // Define the snake object with its initial position, velocity, and initial body cells
    var snake = {
        x: 0,
        y: 0,
        velx: cellsize,
        vely: 0,
        cells: [],
        setcells: 6,
    };

    // Define the food object with its initial position
    var food = {
        x: 0,
        y: 0,
    };

    // Function to initialize the game when the window loads
    window.addEventListener("load", function () {
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
    });

    // Function to update the game state and render the frame
    function frame() {
        // Clear the entire canvas
        ctx.clearRect(0, 0, board.width, board.height);

        // Draw the food on the board
        ctx.lineWidth = vw(0);
        ctx.fillStyle = "#ff748b";
        ctx.fillRect(food.x, food.y, cellsize, cellsize);
        ctx.strokeRect(food.x, food.y, cellsize, cellsize);

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
        ctx.lineWidth = vw(0);
        snake.cells.forEach(function (cell, index) {
            ctx.strokeRect(cell.x + vw(0), cell.y + vw(0), cellsize, cellsize);
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
    document.addEventListener("keydown", function (event) {
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
        score = 0;
        document.getElementById("score").innerHTML = score;
        snake.x = 0;
        snake.y = 0;
        snake.velx = cellsize;
        snake.vely = 0;
        snake.cells = [];
        snake.setcells = 6;
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

})();