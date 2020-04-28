var gamePattern = [];
var userClickPattern = [];
var level = 0;
var gameOver = false;

var buttonColor = ["red", "blue", "green", "yellow"];
var letterCode = ["e", "d", "q", "a"];
$(document).on("keypress", function() {
  $(document).off("keypress");
  $("h1").html("LEVEL 0");
    nextSequence();
  $(document).on("keypress", function() {
    var chosenLetter = event.key;
    var chosenColor;
    if (chosenLetter == "e" || chosenLetter == "E")
      chosenColor = "red";
    else if (chosenLetter == "d" || chosenLetter == "D")
      chosenColor = "blue";
    else if (chosenLetter == "q" || chosenLetter == "Q")
      chosenColor = "green";
    else if (chosenLetter == "a" || chosenLetter == "A")
      chosenColor = "yellow";

    if(chosenColor != null){
      userClickPattern.push(chosenColor);

      playSound(chosenColor);
      animatePress(chosenColor);
      if (!gameOver) {
        checkAnswer(userClickPattern.length - 1);
      }
    }
  });

});

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (!gameOver) {
    checkAnswer(userClickPattern.length - 1);
  }

});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  level++;
  $("h1").html("LEVEL " + level);

  userClickPattern = [];

}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else if (level != 0) {

    gameOver = true;

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Press Any Key to Restart");

    $(document).off("keypress");

    $(document).on("keypress", function() {
      $(document).off("keypress");
      startOver();
    })
  }

}

function startOver() {
  level = 0;
  gameOver = false;
  gamePattern = [];
  nextSequence();

  $(document).on("keypress", function() {
    var chosenLetter = event.key;
    var chosenColor;
    if (chosenLetter == "e")
      chosenColor = "red";
    else if (chosenLetter == "d")
      chosenColor = "blue";
    else if (chosenLetter == "q")
      chosenColor = "green";
    else if (chosenLetter == "a")
      chosenColor = "yellow";

    if(chosenColor != null){
      userClickPattern.push(chosenColor);

      playSound(chosenColor);
      animatePress(chosenColor);
      if (!gameOver) {
        checkAnswer(userClickPattern.length - 1);
      }
    }
  });
}
