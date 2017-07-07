$(document).ready(function() {
  $(".introScreen").fadeIn(500);
  $(".gameSquare").html("");
});

var numberOfPlayers = 0;
var player1Letter = "X";
var player2Letter = "O";
var computerPlayer = false;
var playerActive = 1;
var activeLetter = player1Letter;
var squaresRemaining = [1,2,3,4,5,6,7,8,9];
var gameOver = false;
var isWinner = false;
var winningLetter;
var bestMove = 0;


$("#choice1").click(function() {
  numberOfPlayers = 1;
  computerPlayer = true;
  $(this).css("background-color", "orange");
  $("#choice2").css("background-color", "white");
  $("#letterChoice").fadeIn(500).css("display", "inline-block");
});

$("#choice2").click(function() {
  numberOfPlayers = 2;
  computerPlayer = false;
  $(this).css("background-color", "orange");
  $("#choice1").css("background-color", "white");
  $("#letterChoice").fadeIn(500).css("display", "inline-block");
});

$("#choiceX").click(function() {
  player1Letter = "X";
  player2Letter = "O";
  $(this).css("background-color", "orange");
  $("#choiceO").css("background-color", "white");
  $(".startButton").fadeIn(500).css("display", "block");
});

$("#choiceO").click(function() {
  player1Letter = "O";
  player2Letter = "X";
  $(this).css("background-color", "orange");
  $("#choiceX").css("background-color", "white");
  $(".startButton").fadeIn(500).css("display", "block");
});

$(".startButton").click(function() {
  $(".gameBoard").fadeIn(500);
  if (numberOfPlayers == 1) {
    $("#choice2").css("display", "none");
  } else {
    $("#choice1").css("display", "none");
  }
  $(".chooseLetter").html("Player 1 Letter");
  if (player1Letter == "X") {
    $("#choiceO").css("display", "none");
  } else {
    $("#choiceX").css("display", "none");
  }
  $("#choice1, #choice2, #choiceX, #choiceO").prop("disabled", true);
  $(this).animate({"opacity": 0}, 500);
  activeLetter = player1Letter;
  $(this).css("display", "none");
  $(".resetButton").fadeIn(500).css("display", "block");
  $(".newGameButton").fadeIn(500).css("display", "block");
});

$(".gameSquare").click(function() {
  if ($(this).html() != "X" && $(this).html() != "O") {
    $(this).html(activeLetter);
    var squareNum = Number($(this).attr("id")[$(this).attr("id").length - 1]);
    squaresRemaining.splice(squaresRemaining.indexOf(squareNum), 1);
    nextMove();
  }
});

$(".newGameButton").click(function() {
  newGame();
  $(".endResult").fadeOut(500);
});

$(".resetButton").click(function() {
  $(".newGameButton").click();
  $(this).fadeOut(500);
  $(".playerOptions, .letterToChoose").fadeIn(500);
  $(".startButton").css("display", "block").animate({"opacity": 1}, 500);
  $(".chooseLetter").html("Choose Your Letter");
  $(".gameBoard, .newGameButton").fadeOut(500);
  $("#choice1, #choice2, #choiceX, #choiceO").prop("disabled", false);
  $(".endResult").fadeOut(500);
  gameOver = false;
  isWinner = false;
  bestMove = 0;
}); 

function newGame() {
  $(".gameSquare").html('');
  squaresRemaining = [1,2,3,4,5,6,7,8,9];
  activeLetter = player1Letter;
  gameOver = false;
  isWinner = false;
  bestMove = 0;
}

function nextMove() {
  checkForWinner();
  if (isWinner) {
    displayEndState();
  } else {
    checkForEnd();
  }
  if (gameOver) {
    displayEndState();
  } else {
    if (playerActive == 1) {
      playerActive = 2;
      activeLetter = player2Letter;
      if (numberOfPlayers == 1) {
        setTimeout(computerMove, 500);
      }
    } else {
      playerActive = 1;
      activeLetter = player1Letter;
    }
  }
}

function computerMove() {
  determineBestMove();
  if (bestMove > 0) {
    $("#square" + bestMove).click();
    bestMove = 0;
  } else {
    var indexToPlay = Math.floor(Math.random() * squaresRemaining.length)
    var squareToPlay = squaresRemaining[indexToPlay];
    $("#square" + squareToPlay).click();
  }
}

function determineBestMove() {
  canComputerWin();
  if (bestMove === 0) {
    canComputerBlock();
  }
}

function displayEndState() {
  if (gameOver) {
    if (isWinner) {
      $(".endResult").html(winningLetter + " Wins!").fadeIn(500);
    } else {
      $(".endResult").html("It's a Draw").fadeIn(500);
    }
  }
}

function checkForWinner() {
  if ($("#square1").html() == $("#square2").html() && $("#square2").html() == $("#square3").html() && ($("#square1").html() == "X" || $("#square1").html() == "O")) {
    gameOver = true;
    isWinner = true;
    winningLetter = $("#square1").html();
  } else if ($("#square4").html() == $("#square5").html() && $("#square5").html() == $("#square6").html() && ($("#square4").html() == "X" || $("#square4").html() == "O")) {
    gameOver = true;
    isWinner = true;
    winningLetter = $("#square4").html();
  } else if ($("#square7").html() == $("#square8").html() && $("#square8").html() == $("#square9").html() && ($("#square7").html() == "X" || $("#square7").html() == "O")) {
    gameOver = true;
    isWinner = true;
    winningLetter = $("#square7").html();
  } else if ($("#square1").html() == $("#square4").html() && $("#square4").html() == $("#square7").html() && ($("#square1").html() == "X" || $("#square1").html() == "O")) {
    gameOver = true;
    isWinner = true;
    winningLetter = $("#square1").html();
  } else if ($("#square2").html() == $("#square5").html() && $("#square5").html() == $("#square8").html() && ($("#square2").html() == "X" || $("#square2").html() == "O")) {
    gameOver = true;
    isWinner = true;
    winningLetter = $("#square2").html();
  } else if ($("#square3").html() == $("#square6").html() && $("#square6").html() == $("#square9").html() && ($("#square3").html() == "X" || $("#square3").html() == "O")) {
    gameOver = true;
    isWinner = true;
    winningLetter = $("#square3").html();
  } else if ($("#square1").html() == $("#square5").html() && $("#square5").html() == $("#square9").html() && ($("#square1").html() == "X" || $("#square1").html() == "O")) {
    gameOver = true;
    isWinner = true;
    winningLetter = $("#square1").html();
  } else if ($("#square3").html() == $("#square5").html() && $("#square5").html() == $("#square7").html() && ($("#square3").html() == "X" || $("#square3").html() == "O")) {
    gameOver = true;
    isWinner = true;
    winningLetter = $("#square3").html();
  } 
}

function checkForEnd() {
  if (squaresRemaining.length == 0) {
    gameOver = true;
    isWinner = false;
  }
}

function canComputerWin() {
  if ($("#square1").html() == player2Letter && $("#square2").html() == player2Letter && $("#square3").html() == "") {
    bestMove = 3;
  } else if ($("#square1").html() == player2Letter && $("#square3").html() == player2Letter && $("#square2").html() == "") {
    bestMove = 2;
  } else if ($("#square2").html() == player2Letter && $("#square3").html() == player2Letter && $("#square1").html() == "") {
    bestMove = 1;
  } else if ($("#square4").html() == player2Letter && $("#square5").html() == player2Letter && $("#square6").html() == "") {
    bestMove = 6;
  } else if ($("#square4").html() == player2Letter && $("#square6").html() == player2Letter && $("#square5").html() == "") {
    bestMove = 5;
  } else if ($("#square5").html() == player2Letter && $("#square6").html() == player2Letter && $("#square4").html() == "") {
    bestMove = 4;
  } else if ($("#square7").html() == player2Letter && $("#square8").html() == player2Letter && $("#square9").html() == "") {
    bestMove = 9;
  } else if ($("#square7").html() == player2Letter && $("#square9").html() == player2Letter && $("#square8").html() == "") {
    bestMove = 8;
  } else if ($("#square8").html() == player2Letter && $("#square9").html() == player2Letter && $("#square7").html() == "") {
    bestMove = 7;
  } else if ($("#square1").html() == player2Letter && $("#square4").html() == player2Letter && $("#square7").html() == "") {
    bestMove = 7;
  } else if ($("#square1").html() == player2Letter && $("#square7").html() == player2Letter && $("#square4").html() == "") {
    bestMove = 4;
  } else if ($("#square4").html() == player2Letter && $("#square7").html() == player2Letter && $("#square1").html() == "") {
    bestMove = 1;
  } else if ($("#square2").html() == player2Letter && $("#square5").html() == player2Letter && $("#square8").html() == "") {
    bestMove = 8;
  } else if ($("#square2").html() == player2Letter && $("#square8").html() == player2Letter && $("#square5").html() == "") {
    bestMove = 5;
  } else if ($("#square5").html() == player2Letter && $("#square8").html() == player2Letter && $("#square2").html() == "") {
    bestMove = 2;
  } else if ($("#square3").html() == player2Letter && $("#square6").html() == player2Letter && $("#square9").html() == "") {
    bestMove = 9;
  } else if ($("#square3").html() == player2Letter && $("#square9").html() == player2Letter && $("#square6").html() == "") {
    bestMove = 6;
  } else if ($("#square6").html() == player2Letter && $("#square9").html() == player2Letter && $("#square3").html() == "") {
    bestMove = 3;
  } else if ($("#square1").html() == player2Letter && $("#square5").html() == player2Letter && $("#square9").html() == "") {
    bestMove = 9;
  } else if ($("#square1").html() == player2Letter && $("#square9").html() == player2Letter && $("#square5").html() == "") {
    bestMove = 5;
  } else if ($("#square5").html() == player2Letter && $("#square9").html() == player2Letter && $("#square1").html() == "") {
    bestMove = 1;
  } else if ($("#square3").html() == player2Letter && $("#square5").html() == player2Letter && $("#square7").html() == "") {
    bestMove = 7;
  } else if ($("#square3").html() == player2Letter && $("#square7").html() == player2Letter && $("#square5").html() == "") {
    bestMove = 5;
  } else if ($("#square5").html() == player2Letter && $("#square7").html() == player2Letter && $("#square3").html() == "") {
    bestMove = 3;
  } 
}

function canComputerBlock() {
  if ($("#square1").html() == player1Letter && $("#square2").html() == player1Letter && $("#square3").html() == "") {
    bestMove = 3;
  } else if ($("#square1").html() == player1Letter && $("#square3").html() == player1Letter && $("#square2").html() == "") {
    bestMove = 2;
  } else if ($("#square2").html() == player1Letter && $("#square3").html() == player1Letter && $("#square1").html() == "") {
    bestMove = 1;
  } else if ($("#square4").html() == player1Letter && $("#square5").html() == player1Letter && $("#square6").html() == "") {
    bestMove = 6;
  } else if ($("#square4").html() == player1Letter && $("#square6").html() == player1Letter && $("#square5").html() == "") {
    bestMove = 5;
  } else if ($("#square5").html() == player1Letter && $("#square6").html() == player1Letter && $("#square4").html() == "") {
    bestMove = 4;
  } else if ($("#square7").html() == player1Letter && $("#square8").html() == player1Letter && $("#square9").html() == "") {
    bestMove = 9;
  } else if ($("#square7").html() == player1Letter && $("#square9").html() == player1Letter && $("#square8").html() == "") {
    bestMove = 8;
  } else if ($("#square8").html() == player1Letter && $("#square9").html() == player1Letter && $("#square7").html() == "") {
    bestMove = 7;
  } else if ($("#square1").html() == player1Letter && $("#square4").html() == player1Letter && $("#square7").html() == "") {
    bestMove = 7;
  } else if ($("#square1").html() == player1Letter && $("#square7").html() == player1Letter && $("#square4").html() == "") {
    bestMove = 4;
  } else if ($("#square4").html() == player1Letter && $("#square7").html() == player1Letter && $("#square1").html() == "") {
    bestMove = 1;
  } else if ($("#square2").html() == player1Letter && $("#square5").html() == player1Letter && $("#square8").html() == "") {
    bestMove = 8;
  } else if ($("#square2").html() == player1Letter && $("#square8").html() == player1Letter && $("#square5").html() == "") {
    bestMove = 5;
  } else if ($("#square5").html() == player1Letter && $("#square8").html() == player1Letter && $("#square2").html() == "") {
    bestMove = 2;
  } else if ($("#square3").html() == player1Letter && $("#square6").html() == player1Letter && $("#square9").html() == "") {
    bestMove = 9;
  } else if ($("#square3").html() == player1Letter && $("#square9").html() == player1Letter && $("#square6").html() == "") {
    bestMove = 6;
  } else if ($("#square6").html() == player1Letter && $("#square9").html() == player1Letter && $("#square3").html() == "") {
    bestMove = 3;
  } else if ($("#square1").html() == player1Letter && $("#square5").html() == player1Letter && $("#square9").html() == "") {
    bestMove = 9;
  } else if ($("#square1").html() == player1Letter && $("#square9").html() == player1Letter && $("#square5").html() == "") {
    bestMove = 5;
  } else if ($("#square5").html() == player1Letter && $("#square9").html() == player1Letter && $("#square1").html() == "") {
    bestMove = 1;
  } else if ($("#square3").html() == player1Letter && $("#square5").html() == player1Letter && $("#square7").html() == "") {
    bestMove = 7;
  } else if ($("#square3").html() == player1Letter && $("#square7").html() == player1Letter && $("#square5").html() == "") {
    bestMove = 5;
  } else if ($("#square5").html() == player1Letter && $("#square7").html() == player1Letter && $("#square3").html() == "") {
    bestMove = 3;
  } 
}