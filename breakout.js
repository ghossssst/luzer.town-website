var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");

// Define the size of each cell in the game grid
var cellsize = 32;

// Calculate the number of rows and columns based on the canvas size and cell size
var rows = 512 / cellsize;
var cols = 512 / cellsize;


