var timer;
var timerCount;
var quizBox = document.querySelector(".container");
var incorrect = "incorrect";
var correct = "correct"; 
var questionPrompt = {};
var questionOption = {};
var isWin = false;
var startButton = document.querySelector("#btnStart");
var scoreBoard = "#scoreBoard";

var questionBank = [
   questionOne = {
        questionPrompt: "What does JSON stand for?",
        questionOption: ["JavaScript Object Notation", "JQuery Storage Operating Notice", "Joint System Operation Notification", "JavaScript Object Notification"],
        questionCorrect: "JavaScript Object Notation"
    },
   questionTwo= {
        questionPrompt: "The <a> tag is used for what in HTML?",
        questionOption: ["Large amounts of Text", "Attributes", "Accessbility Captions", "Anchors, or links"],
        questionCorrect: "JavaScript Object Notation"
    },
    questionThree={
        questionPrompt: "How do you call a class in a CSS style sheet?",
        questionOption: ["#class", ".class", "$class", "!class"],
        questionCorrect: ".class"
    },
    questionFour={
        questionPrompt: "Which of these tags comes first on the page in HTML?",
        questionOption: ["<main>", "<body>", "<head>", "h1"],
        questionCorrect: "<head>"
    }];


function checkWin() {
    var questionsRemaining = questionBank = 0;
    if(questionBank.length === 0) {
        endGame();
    }
    if(timerCount === 0){
        endGame();
    }
};

//Function for the end of the game, regardless of approach
// function endGame();

function presentQuestion() {
     questionOne.textContent = questionPrompt;
     

}

//Timer Function
function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timer.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);}

// document.getElementById('wrong').addEventListener('click', function(){
//     timer -=10;
//     document.getElementById('timerCount').innerHTML=timerCount;
// });


function startGame(){

    isWin = false;
    timerCount = 60;
    startTimer();
   presentQuestion();
}

startButton.addEventListener("click", startGame());