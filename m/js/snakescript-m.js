(function () {
    // Touch button controls
    document.getElementById("btnUp").addEventListener("click", function () {
        if (snake.vely === 0) {
            snake.vely = -cellsize;
            snake.velx = 0;
        }
    });

    document.getElementById("btnDown").addEventListener("click", function () {
        if (snake.vely === 0) {
            snake.vely = cellsize;
            snake.velx = 0;
        }
    });

    document.getElementById("btnLeft").addEventListener("click", function () {
        if (snake.velx === 0) {
            snake.velx = -cellsize;
            snake.vely = 0;
        }
    });

    document.getElementById("btnRight").addEventListener("click", function () {
        if (snake.velx === 0) {
            snake.velx = cellsize;
            snake.vely = 0;
        }
    });

    function vw(percent) {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        return (percent * w) / 100;
    }

    // Define the size of each cell in the game grid
    var cellsize = Math.floor(vw(2));

    // Calculate rows and cols based on 80vw canvas area
    var rows = Math.floor(vw(80) / cellsize);
    var cols = Math.floor(vw(80) / cellsize);

    var board, ctx;
    var framespeed = 10;
    var score = 0;

    var snake = {
        x: 0,
        y: 0,
        velx: cellsize,
        vely: 0,
        cells: [],
        setcells: 6,
    };

    var food = {
        x: 0,
        y: 0,
    };

    window.addEventListener("load", function () {
        board = document.getElementById("board");
        board.height = rows * cellsize;
        board.width = cols * cellsize;

        ctx = board.getContext("2d");

        // Initialize snake at center
        snake.x = 0;
        snake.y = Math.floor((rows / 2)) * cellsize;

        placefood();
        setInterval(frame, 1500 / framespeed);
    });

    function frame() {
        ctx.clearRect(0, 0, board.width, board.height);

        // Draw food
        ctx.fillStyle = "#ae9e83";
        ctx.strokeStyle = "#716750";
        ctx.lineWidth = 1;
        ctx.fillRect(food.x, food.y, cellsize, cellsize);
        ctx.strokeRect(food.x, food.y, cellsize, cellsize);

        // Update snake position
        snake.x += snake.velx;
        snake.y += snake.vely;

        // Collision with wall
        if (snake.x < 0 || snake.x >= board.width || snake.y < 0 || snake.y >= board.height) {
            reset();
        }

        snake.cells.unshift({ x: snake.x, y: snake.y });

        if (snake.cells.length > snake.setcells) {
            snake.cells.pop();
        }

        ctx.fillStyle = "#4e4838";
        ctx.strokeStyle = "#716750";

        snake.cells.forEach(function (cell, index) {
            ctx.fillRect(cell.x, cell.y, cellsize, cellsize);
            ctx.strokeRect(cell.x, cell.y, cellsize, cellsize);

            // Collision with food
            if (snake.x === food.x && snake.y === food.y) {
                snake.setcells++;
                score++;
                document.getElementById("score").innerHTML = score;
                placefood();
            }

            // Collision with self
            for (var i = index + 1; i < snake.cells.length; i++) {
                if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                    reset();
                }
            }
        });
    }

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

    function reset() {
        score = 0;
        document.getElementById("score").innerHTML = score;

        // Spawn in the center
        snake.x = 0;
        snake.y = Math.floor((rows / 2)) * cellsize;

        snake.velx = cellsize;
        snake.vely = 0;
        snake.cells = [];
        snake.setcells = 6;
        placefood();
    }

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

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
})();

