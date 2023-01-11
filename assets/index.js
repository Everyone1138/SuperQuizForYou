var startQuizElement = document.getElementById("startpage");
var quizBody = document.getElementById("quiz");
var quizTimer = document.getElementById("timer");
var gameoverPage = document.getElementById("gameover");
var highscoreDisplayScore = document.getElementById("highscore-score");
var highScorePage = document.getElementById("high-scorePage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var finalScoreElement = document.getElementById("finalScore");
var questionsElement = document.getElementById("questions");
var startQuizButton = document.getElementById("startbtn");
var submitScoreBtn = document.getElementById("submitScore");
var endGameBtns = document.getElementById("endGameBtns");

var btn0 = document.getElementById("0");
var btn1 = document.getElementById("1");
var btn2 = document.getElementById("2");
var btn3 = document.getElementById("3");

var questions = [
  {
    question: "Which set of four are all considered JavaScript Datatypes?",
    answer0: "String,Number,Boolean,Object",
    answer1: "String,Var, Const, Iterations",
    answer2: "Boolean, Undefined, Loop, While",
    answer3: "None of the Above",
    correctAnswer: "0",
  },

  {
    question: "If you have a list of items and you want to loop through them?",
    answer0: "You create a Boolean",
    answer1: "You create a new file",
    answer2: "You create an Array",
    answer3: "All of the above",
    correctAnswer: "2",
  },

  {
    question: "JavaScript classes are ?",
    answer0: "Functions for JavaScript Objects",
    answer1: "Templates for JavaScript Objects",
    answer2: "JSON for JavaScript Objects",
    answer3: "Templates for things outside of JavaScript",
    correctAnswer: "1",
  },

  {
    question: "What kind of loops does JavaScript support?",
    answer0: "for, for/out, for/of, while, do/while ",
    answer1: "for, for/in, for/of, while, random ",
    answer2: "for, for/in, sytax, while, do/while ",
    answer3: "for, for/in, for/of, while, do/while ",
    correctAnswer: "3",
  },

  {
    question: "What does Math.random() do?",
    answer0:
      "It returns a random number between 0 (inclusive),  and 1 (exclusive)",
    answer1:
      "It returns a random number between 10 (inclusive),  and 1 (exclusive)",
    answer2:
      "It returns a random number between 0 (inclusive),  and 100 (exclusive)",
    answer3:
      "It returns a random number between -1000 (inclusive),  and 1 (exclusive)",
    correctAnswer: "0",
  },

  {
    question: "Which of these are conditional statements in JavaScript?",
    answer0: "for, else, else if, switch.",
    answer1: "if, else, else if, switch.",
    answer2: "if, while, else if, switch.",
    answer3: "if, else, else if, break.",
    correctAnswer: "1",
  },

  {
    question: "What two types of values does JavaScript syntax define?",
    answer0: "Method values(literals) and Terminal values(Variables)",
    answer1: "Fixed values(literals) and Terminal values(Variables)",
    answer2: "Fixed values(literals) and Variable values(Variables)",
    answer3: "None of the above",
    correctAnswer: "2",
  },

  {
    question: "What is a JavaScript function?",
    answer0: "It is a block of code designed to perform a particular task",
    answer1: "It is a package",
    answer2: "It is html",
    answer3: "It is something you make in a css file",
    correctAnswer: "0",
  },

  {
    question: "What are the four ways to declare variables?",
    answer0: "using var,using let ,using int, using noting",
    answer1: "using var,using num ,using const, using noting",
    answer2: "using x,using let ,using const, using noting",
    answer3: "using var,using let ,using const, using noting",
    correctAnswer: "3",
  },

  {
    question: "All values except __________ are objects ",
    answer0: "Null",
    answer1: "Arrays",
    answer2: "Methods",
    answer3: "Primatives",
    correctAnswer: "3",
  },
  {
    question: "In a constructor function 'this' does.....",
    answer0: "everything you need it to do.",
    answer1: "not have a value. It is a substitute for the new object.",
    answer2: "have a value. It is a substitute for the new object.",
    answer3: "not style the html page you're working on.",
    correctAnswer: "1",
  },
];

var finalQuestionIndex = questions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerPenalty = -10;
var timerInterval;
var score = 0;
var correct;

function generateQuizWithQuestion() {
  gameoverPage.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = questions[currentQuestionIndex];
  questionsElement.innerHTML = "<p>" + currentQuestion.question + "</p>";
  btn0.innerHTML = currentQuestion.answer0;
  btn1.innerHTML = currentQuestion.answer1;
  btn2.innerHTML = currentQuestion.answer2;
  btn3.innerHTML = currentQuestion.answer3;
}

function startQuiz() {
  gameoverPage.style.display = "none";
  startQuizElement.style.display = "none";
  generateQuizWithQuestion();

  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}

function checkAnswer(answer) {
  correct = questions[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    alert("YOU ARE CORRECT!");
    currentQuestionIndex++;
    generateQuizWithQuestion();
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
    alert("YOU ARE INCORRECT!");
    currentQuestionIndex++;
    generateQuizWithQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  quizBody.style.display = "none";
  gameoverPage.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreElement.innerHTML =
    "You got " + score + " out of " + questions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore() {
  if (highscoreInputName.value === "") {
    alert("You forgot to enter your initials!");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighScores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score,
    };

    gameoverPage.style.display = "none";
    highscoreContainer.style.display = "flex";
    highScorePage.style.display = "block";
    endGameBtns.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
});

function generateHighscores() {
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
  }
}

function showHighscore() {
  startQuizElement.style.display = "none";
  gameoverPage.style.display = "none";
  highscoreContainer.style.display = "flex";
  highScorePage.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighscores();
}

function clearScore() {
  window.localStorage.clear();
  highscoreDisplayName.textContent = "";
  highscoreDisplayScore.textContent = "";
}

function replayQuiz() {
  highscoreContainer.style.display = "none";
  gameoverPage.style.display = "none";
  startQuizElement.style.display = "flex";
  timeLeft = 60;
  score = 0;
  currentQuestionIndex = 0;
}

startQuizButton.addEventListener("click", startQuiz);
