var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;
var lastIndex = -1;

function nextSequence() {
  userClickedPattern = [];
  lastIndex = -1;
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function(event) {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  lastIndex++;
  checkAnswer(lastIndex);
  animatePress(userChosenColor);
  playSound(userChosenColor);

});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(chosenColor) {
  $("#" + chosenColor).addClass("pressed");
  setTimeout(function() {
    $("#" + chosenColor).removeClass("pressed");
  }, 100);
}


$("body").keypress(function() {
  if (started === false) {
    nextSequence();
  }
  started = true;
});

function checkAnswer(currentLevel) {
  if (gamePattern[lastIndex] === userClickedPattern[lastIndex]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}
