//Timer variables
var timerDisplay = document.getElementById("#time_display");


//questions and answer variables
var main = document.getElementsByTagName('main')[0]
var quizBox = document.querySelector(".container");
// var answerBoxesEl = document.getElementById('.btn-layout');
var questionDisplay = document.getElementById('question_display')
var startButton = document.getElementById("btnStart");
var answerList = document.getElementById('answer_list');
var answerFeedback = document.getElementById('feedback')



//variable attached to the scoreboard HTML query
var initialsInput = document.getElementById('initials_input');
var submitInitialsButton = document.getElementById('submit_initials_button');
var scoreBoard = document.getElementById("#scoreboard_page");
var clearScoresButton = document.getElementById("clear_scores");
var viewScoreBoard = document.getElementById("scoreboard_link");
var returnToStart = document.getElementById("return_start_page")




// List of questions and answers to be pulled in each section
var questionBank = [
    {
        question: "What does JSON stand for?",
        answer: [
            { text: "JavaScript Object Notation", correct: true },
            { text: "JQuery Storage Operating Notice", correct: false },
            { text: "Joint System Operation Notification", correct: false },
            { text: "JavaScript Object Notification", correct: false }],
        correct_index: 1,
    },
    {
        question: "The <a> tag is used for what in HTML?",
        answer: [
            { text: "Large amounts of Text", correct: false },
            { text: "Attributes", correct: false },
            { text: "Accessbility Captions", correct: false },
            { text: "Anchors, or links", correct: true }],
        correct_index: 4,
    },
    {
        question: "How do you call a class in a CSS style sheet?",
        answer: [
            { text: "#class", correct: false },
            { text: ".class", correct: true },
            { text: "$class", correct: false },
            { text: "!class", correct: false }],
        correct_index: 2,
    },
    {
        question: "Which of these tags comes first on the page in HTML?",
        answer: [
            { text: "<main>", correct: false },
            { text: "<body>", correct: false },
            { text: "<head>", correct: true },
            { text: "h1", correct: false }],
        correct_index: 3,
    }];

const startingTime = questions.length * 10;
const timeError = 10;
var remainingTime;
var timer;
var score;

function init() {
    startButton.addEventListener('click', event => {
    event.preventDefault()
    displayQuestionPage()
});
answerList.addEventListener('click', function(event){
    event.preventDefault()
    if (event.target.matches('button')) {
        var button = event.target;
        if (button.classList.contains('correct')) {
            answerFeedback.textContent = "Correct!"
            questionNumbersBox.children[nextQuestionIndex - 1].classList.add('correct')
            score++;
        } else {
            answerFeedback.textContent = "Wrong!"
            questionNumbersBox.children[nextQuestionIndex - 1].classList.add('wrong')
            remainingTime -= timePenalty
    }
    if (remainingTime > 0) displayNextQuestion()
    else displayGetNamePage()
    
}
})
submitInitialsButton.addEventListener('click', event => {
    event.preventDefault()
    let initials = initialsInput.value.toUpperCase()
    if (initials) {
        let highscores = JSON.parse(localStorage.getItem('highscores')) || []
        
        timestamp = Date.now()
        highscores.push({
            'timestamp': timestamp,
            'score': score,
            'initials': initials,
            'timeRemaining': remainingTime
        })
        highscores = highscores.sort((a, b) => {
            if (a.score != b.score) return b.score - a.score
            if (a.timeRemaining != b.timeRemaining) return b.timeRemaining - a.timeRemaining
            if (a.timestamp != b.timestamp) return a.timestamp - b.timestamp
            return 0
        }
        )}
    });
    localStorage.setItem('highscores', JSON.stringify(highscores))
            
    displayHighscorePage()
    initialsInput.value = ""


goToStartingPageButton.addEventListener('click', event => {
event.preventDefault()
displayStartingPage()
})
clearHighscoresButton.addEventListener('click', event => {
var confirmed = confirm("You are about to clear all of your highscores. Would you like to continue?")
if (confirmed) {
    event.preventDefault()
    localStorage.setItem('highscores', "[]")
    displayHighscorePage()
}
})
viewHighscoreLink.addEventListener('click', event => {
event.preventDefault()
displayHighscorePage()
})


displayStartingPage()
};

function displayPage(id) {
    main.querySelectorAll('.page').forEach(page => {
        if (page.id == id) {
            page.classList.remove('hidden')
        } else {
            page.classList.add('hidden')
        }
    })
    return 4
};

function displayStartingPage() {
    displayPage('starting_page')
    
    clearInterval(timer)
    remainingTime = 0
    timeDisplay.textContent = formatSeconds(remainingTime)
};

var nextQuestionIndex  
var randomizedQuestions

function displayQuestionPage() {
    displayPage('question_page')

    questionNumbersBox.innerHTML = ""

    for (let i = 0; i < questions.length; i++) {
        const element = questions[i];
        var el = document.createElement('span')
        el.textContent = i + 1
        questionNumbersBox.appendChild(el)
    }


    randomizedQuestions = randomizeArray(questions)
    nextQuestionIndex = 0
    score = 0

   
    startTimer();
    displayNextQuestion();
};

function displayNextQuestion() {
    if (nextQuestionIndex < questions.length) { 
        const question = randomizedQuestions[nextQuestionIndex].question
        const answers = randomizedQuestions[nextQuestionIndex].answers
        const randomizedAnswers = randomizeArray(answers)
        const correctAnswer = answers[randomizedQuestions[nextQuestionIndex].correct_index]
        
        questionDisplay.textContent = question
        answersList.innerHTML = ""
        answerFeedback.textContent = ""

        for (let i = 0; i < randomizedAnswers.length; i++) {
            let answer = randomizedAnswers[i]
            let button = document.createElement("button")
            button.classList.add('answer')
            if (answer == correctAnswer)
                button.classList.add('correct')
            button.textContent = `${i + 1}. ${answer}`
            answersList.appendChild(button)
        }

        nextQuestionIndex++
    } else {
        clearInterval(timer)
        displayGetNamePage()
    }
};

function displayGetNamePage() {
    displayPage('get_name_page')
    if (remainingTime < 0) remainingTime = 0
    timeDisplay.textContent = formatSeconds(remainingTime)
    scoreDisplay.textContent = score
};


function displayHighscorePage() {
    displayPage('highscore_page')
    questionNumbersBox.innerHTML = ""

    highscoreList.innerHTML = ""

    clearInterval(timer)

    let highscores = JSON.parse(localStorage.getItem('highscores'))
    
    let i = 0
    for (const key in highscores) {
        i++
        let highscore = highscores[key]
        var el = document.createElement('div')
        let initials = highscore.initials.padEnd(3, ' ')
        let playerScore = highscore.score.toString().padStart(3, ' ')
        let timeRemaining = formatSeconds(highscore.timeRemaining)
        el.textContent = `${i}. ${initials} - Score: ${playerScore} - Time: ${timeRemaining}`
        highscoreList.appendChild(el)
    }
};

function randomizeArray(array) {
    clone = [...array]
    output = []
    
    while (clone.length > 0) {
        let r = Math.floor(Math.random() * clone.length);
        let i = clone.splice(r, 1)[0]
        output.push(i)
    }

    return output
};

function startTimer() {
    remainingTime = startingTime
    timeDisplay.textContent = formatSeconds(remainingTime)
    
    timer = setInterval(function() {
        remainingTime--
    
        if (remainingTime < 0) {
            clearInterval(timer)
            displayGetNamePage()
        } else {
            timeDisplay.textContent = formatSeconds(remainingTime)
        }
    
    }, 1000)
};

function formatSeconds(seconds) {
    let m = Math.floor(seconds / 60).toString().padStart(2, ' ')
    let s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
};

init();