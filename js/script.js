var timer;
var timerCount;
var quizBox = document.querySelector(".container");
var answerBoxesEl = document.querySelector('.btn-layout');
var incorrect = "incorrect";
var correct = "correct"; 
var questionPrompt = {};
var questionOption = {};
var isWin = false;
var startButton = document.querySelector("#btnStart");
var scoreBoard = "#scoreBoard";


startButton.addEventListener("click", startGame);


var questionBank = [
   questionOne = {
        questionPrompt: "What does JSON stand for?",
        questionOption: [
            {text: "JavaScript Object Notation", correct: true}, 
            {text: "JQuery Storage Operating Notice", correct: false},
            {text: "Joint System Operation Notification", correct: false},
            {text: "JavaScript Object Notification", correct: false}],
    },
   questionTwo = {
        questionPrompt: "The <a> tag is used for what in HTML?",
        questionOption: [
            {text:"Large amounts of Text", correct: false}, 
            {text:"Attributes", correct: false}, 
            {text:"Accessbility Captions",  correct: false}, 
            {text:"Anchors, or links", correct: true}],
        
    },
    questionThree={
        questionPrompt: "How do you call a class in a CSS style sheet?",
        questionOption: [
            {text: "#class", correct: false},
            {text:".class", correct: true},
            {text:"$class", correct: false},
            {text:"!class",correct: false}],
        
    },
    questionFour={
        questionPrompt: "Which of these tags comes first on the page in HTML?",
        questionOption: [
            {text:"<main>", correct: false},
            {text:"<body>", correct: false},
            {text:"<head>", correct: true},
            {text:"h1",correct: false}],
        
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
function endGame() {
    return;
}

function presentQuestion() {
    for (i=0; i<questionBank.length; i++) {
    document.write(questionBank[0].questionPrompt = document.getElementById('#question1')),
    questionBank[0].questionOption = document.getElementById('#question1'),
    questionBank[0].questionCorrect = document.getElementById('#question1')
}};

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
    console.log("Started.");
    startButton.classList.add('hide');
    quizBox.classList.remove('hide');
    answerBoxesEl.classList.remove('hide');
    presentQuestion();
}

