//Timer variables
var timer;
var timerCount;

//questions and answer variables
var quizBox = document.querySelector(".container");
var answerBoxesEl = document.querySelector('.btn-layout');
var startButton = document.querySelector("#btnStart");
var continueButton = document.querySelector("#btnCont");
var questionEl = document.querySelector('.question')
var answerButtonEl = document.querySelector('.answer-buttons')


var incorrect = "incorrect";
var correct = "correct";
var questionPrompt;
var questionOption;

//variable attached to the scoreboard HTML query
var scoreBoard = document.querySelector("#scoreBoard");


startButton.addEventListener("click", startGame);
continueButton.addEventListener('click', ()=> {
    quizBox++;
    presentNextQuestion();
})


// List of questions and answers to be pulled in each section
var questionBank = [
    {
        questionPrompt: "What does JSON stand for?",
        questionOption: [
            { text: "JavaScript Object Notation", correct: true },
            { text: "JQuery Storage Operating Notice", correct: false },
            { text: "Joint System Operation Notification", correct: false },
            { text: "JavaScript Object Notification", correct: false }],
    },
    {
        questionPrompt: "The <a> tag is used for what in HTML?",
        questionOption: [
            { text: "Large amounts of Text", correct: false },
            { text: "Attributes", correct: false },
            { text: "Accessbility Captions", correct: false },
            { text: "Anchors, or links", correct: true }],

    },
    {
        questionPrompt: "How do you call a class in a CSS style sheet?",
        questionOption: [
            { text: "#class", correct: false },
            { text: ".class", correct: true },
            { text: "$class", correct: false },
            { text: "!class", correct: false }],

    },
    {
        questionPrompt: "Which of these tags comes first on the page in HTML?",
        questionOption: [
            { text: "<main>", correct: false },
            { text: "<body>", correct: false },
            { text: "<head>", correct: true },
            { text: "h1", correct: false }],

    }];


// function checkWin() {
//     var questionsRemaining = questionBank = 0;
//     if(questionBank.length === 0) {
//         endGame();
//     }
//     if(timerCount === 0){
//         endGame();
//     }
// };

console.log(questionBank[0].questionPrompt);

function presentQuestion() {
    questionEl.innerText = questionBank[0].questionPrompt;
    questionEl.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerButtonEl.appendChild(button)
    })
}

function presentNextQuestion() {
    clearState()
}

function clearState() {
    continueButton.classList.add('hide');
    while(answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild);
    }
}

function selectAnswer() {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setClassStatus(document.body, correct);
    Array.from(answerButtonEl.children).forEach(button => {
        setClassStatus(button, button.dataset.correct)
    });
    if(quizBox.length !=0 && timerCount!=0) {
    nextButton.classList.remove('hide');
    } else {
        scoreBoard.classList.remove('hide');
    }
}

function setClassStatus(element, correct) {
    clearClassStatus(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')

    }
}

function clearClassStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
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
    }, 1000);
}

// document.getElementById('wrong').addEventListener('click', function(){
//     timer -=10;
//     document.getElementById('timerCount').innerHTML=timerCount;
// });


function startGame() {
    console.log("Started.");
    startButton.classList.add('hide');
    quizBox.classList.remove('hide');
    answerBoxesEl.classList.remove('hide');
    presentQuestion();
}

//Function for the end of the game, regardless of approach
function endGame() {
    return;
}