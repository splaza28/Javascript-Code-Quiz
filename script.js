//declaring variables for game
var start = document.querySelector("#start-btn");
var next = document.querySelector("#next-btn");
var timer = document.querySelector("#timer");
var question = document.querySelector("#question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
//var answers = document.querySelector("#answers");
var game = document.querySelector("#game");
var intro = document.querySelector("#intro")
var finalScore = document.querySelector("#final-score")
var submit = document.querySelector("#submit-btn");
var title = document.querySelector("#title");
var userEl = document.querySelector("#user");

var questions = [
  {

    question: "What is the correct JavaScript syntax to write “Hello World”?",
    choice1: "response.write(“Hello World”)",  
    choice2: "document.write(“Hello World”)",
    choice3: "println(“Hello World”)",
    answer: 2
    
  },

{
  question: "What does DOM stand for?",
  choice1: "Display Object Management", 
  choice2: "Document Object Model",
  choice3: "Digital Ordinance Model",
  answer: 2
  
},

{
  question: "The 'function' and  'var' are known as:",
  choice1: "Data types", 
  choice2: "Prototypes",
  choice3: "Declaration statements", 
  answer: 3 
  
},

{
  question: "Which one of the following is the correct way for calling the JavaScript code?",
  choice1: "Triggering Event", 
   choice2: "RMI", 
   choice3: "Function/Method", 
   answer: 3
    
},

{
  question: "Which is not valid data type in Javascript?",
  choice1: "Undefinded",
  choice2: "Boolean", 
  choice3: "float", 
  answer: 3
  
},

]

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let totalQuestions = 5;
let time = 90;




//adding event listener for start,next, & submit buttons
start.addEventListener("click", () => {
  intro.classList.add("hidden-container");
  title.classList.add("hidden-container");
  game.classList.remove("hidden-container");
  start.classList.add("hidden-container");
  startTimer();
});

next.addEventListener("click", () => {
  currentQuestion++;
  showNextQuestion();
});

submit.addEventListener("click", function(e) {
  e.stopPropagation();
  addScore();

});

//setting up game quiz timer countdown from 90 seconds
function startTimer() {
  timeInterval = setInterval(() => {
      if (time > -1) {
          timer.textContent = time;
          time--;
      } 
      else {
        endGame()
      }
  }, 1000);
}


//call to begin quiz game
startGame = () => {
  console.log("Let's Begin!");
  questionCounter = 0;
  score = 0;
  availableQuestions = [ ...questions];
  console.log(availableQuestions);
  showNextQuestion();
  };

 

//setting up quiz questions 
showNextQuestion = () => {

  if(availableQuestions.length === 0 || questionCounter >= totalQuestions) {
    
    //return window.location.assign("/end.html");
    endGame();
  } 
questionCounter++;
var questionIndex = Math.floor(Math.random() * availableQuestions.length);
currentQuestion = availableQuestions[questionIndex];
question.innerText = currentQuestion.question; 

choices.forEach(choice => {
var number = choice.dataset["number"];
choice.innerText = currentQuestion["choice" + number];
});

availableQuestions.splice(questionIndex, 1);

acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
  if (!acceptingAnswers) return;
  acceptingAnswers = false;
  var selectedChoice = e.target;
  var selectedAnswer = selectedChoice.dataset["number"];

  var classToApply = 
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      time -=29
    }
  
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout( () => {
      selectedChoice.parentElement.classList.remove(classToApply);
      showNextQuestion();
    }, 1000);
  
  });
});

function endGame () {
  game.classList.add("hidden-container");
  finalScore.classList.remove("hidden-container");

  clearInterval(time);

  var finalScoreEl = document.querySelector("#answers");
  finalScoreEl.textContent = time + 22;
  }

  

startGame();

function saveHighscore() {
  // get value of input box
  var initials = userEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      user: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "end.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submit.onclick = saveHighscore;
