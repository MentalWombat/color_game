var numSquares = 6;
var colors = [];
var pickedColor;
var bgColor = document.querySelector("body").style.background;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

var sclick = new Howl({
  src: ['sounds/click.mp3', 'sounds/click.wav']
});

var fclick = new Howl({
  src: ['sounds/fin.mp3', 'sounds/fin.wav'],
});

var clickSound = true;

init();

function init(){
  setupModeButtons();
  setupSquares();
  reset();
  modeButtons[1].classList.add("selected");
}

function setupModeButtons(){
  for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].classList.remove("selected");
      }
      this.classList.add("selected");
      if(this.textContent === "Easy"){
        numSquares = 3;
      } else if(this.textContent === "Normal"){
        numSquares = 6;
      } else {
        numSquares = 9;
      }
      reset();
    });
  }
}

function setupSquares(){
  for(var i = 0; i < squares.length; i++){
    squares[i].addEventListener("click", function(){
      var clickedColor = this.style.background;
      if(clickedColor === pickedColor){
        if(clickSound){
          fclick.play();
        }
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        colorDisplay.style.background = clickedColor;
        clickSound = false;
      } else {
        sclick.play();
        this.style.background = bgColor;
        messageDisplay.textContent = "Try Again";
        message.classList.add("fade");
        setTimeout(function(){ message.classList.remove("fade") }, 600);
      }
    });
  }
}

function reset(){
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = " ";
  for(var i = 0; i <squares.length; i++){
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  colorDisplay.style.background = bgColor;
  clickSound = true;
}

resetButton.addEventListener("click", function(){
  reset();
});

function changeColors(color){
  for(var i = 0; i < squares.length; i++){
    squares[i].style.background = color;
  }
}

function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num){
  var arr = []
  for(var i = 0; i < num; i++){
    arr.push(randomColor())
  }
  return arr;
}

function randomColor(){
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b +")";
}