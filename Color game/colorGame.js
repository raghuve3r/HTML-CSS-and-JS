var noOfSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var message = document.getElementById("menu");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
  modeButtonSetup();
  squareSetup();
  resetting();
}

function modeButtonSetup(){
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? noOfSquares = 3: noOfSquares = 6;
      resetting();
    });
  }
}

function squareSetup(){
  for (var i = 0; i < squares.length; i++) {
    //click event
    squares[i].addEventListener("click", function() {
      //get the color of the clicked tile
      var clickedColor = this.style.backgroundColor;

      //compare color
      if (clickedColor === pickedColor) {
        message.textContent = "Correct!";
        reset.textContent = "Play again?";
        changeColors(clickedColor);
        h1.style.backgroundColor = pickedColor;
      } else {
        this.style.backgroundColor = "#232323";
        message.textContent = "Try again";
      }
    });
  }
}
function resetting() {
  colors = generateRandomColors(noOfSquares);
  //pick a new color from the array
  pickedColor = pickColor();
  //change colors of the square
  colorDisplay.textContent = pickedColor;

  message.textContent = "";
  reset.textContent = "New Colors";
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "#232323";
}

reset.addEventListener("click", function() {
  resetting();
});


function changeColors(color) {
  //loop all squares and change to same color
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var num = Math.floor(Math.random() * colors.length);
  return colors[num];
}

function generateRandomColors(num) {
  //make an array
  arr = [];

  //generate random colors and add to array
  for (var i = 0; i < num; i++) {
    //get random color and push to array
    arr.push(randomColor())

  }

  return arr;
}

function randomColor() {
  //pick a red from 0-255
  var r = Math.floor(Math.random() * 256)
  //pick a green from 0-255
  var g = Math.floor(Math.random() * 256)
  //pick a blue from 0-255
  var b = Math.floor(Math.random() * 256)

  return "rgb(" + r + ", " + g + ", " + b + ")"
}
