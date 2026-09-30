var itemsNumber = 6;
var colors = [];
var mysteryColor;
var modeButtons = document.querySelectorAll(".mode");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var items = document.querySelectorAll(".item");
var resetButton = document.getElementById("reset");

var itemClick = new Howl({
  src: ["sounds/click.mp3", "sounds/click.wav"],
});

var finalClick = new Howl({
  src: ["sounds/fin.mp3", "sounds/fin.wav"],
});

function updateItems(color) {
  for (var i = 0; i < items.length; i++) {
    items[i].style.background = color;
    items[i].disabled = true;
  }
}

function clickItem(e) {
  const element = e.target;
  if (element.style.background === mysteryColor) {
    finalClick.play();
    messageDisplay.textContent = "Correct!";
    resetButton.textContent = "Play Again?";
    resetButton.classList.add("invert");
    document.documentElement.style.setProperty("--mystery-color", mysteryColor);
    updateItems(mysteryColor);
  } else {
    itemClick.play();
    element.disabled = true;
    element.style.background = "transparent";
    messageDisplay.textContent = "Try Again";
  }
}

function getRandomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateRandomColors(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(getRandomColor());
  }
  return arr;
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function resetItems() {
  colors = generateRandomColors(itemsNumber);
  mysteryColor = pickColor();
  document.documentElement.style.setProperty("--mystery-color", "#fff");
  colorDisplay.textContent = mysteryColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "Guess New Color";
  resetButton.classList.remove("invert");
  for (var i = 0; i < items.length; i++) {
    if (colors[i]) {
      items[i].style.display = "block";
      items[i].style.background = colors[i];
      items[i].disabled = false;
    } else {
      items[i].style.display = "none";
      items[i].style.background = "transparent";
      items[i].disabled = true;
    }
  }
}

function setMode(e) {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].classList.remove("selected");
  }
  const element = e.target;
  element.classList.add("selected");
  if (element.textContent === "Easy") {
    itemsNumber = 3;
  } else if (element.textContent === "Normal") {
    itemsNumber = 6;
  } else {
    itemsNumber = 9;
  }
  resetItems();
}

function init() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", setMode);
  }
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", clickItem);
  }
  resetButton.addEventListener("click", resetItems);
  resetItems();
}

init();
