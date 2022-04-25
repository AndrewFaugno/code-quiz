var startButton = document.getElementById("start-btn");
var titleScreen = document.getElementById("title-container");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonEl = document.getElementById("answer-btns");
var answerChoice = document.getElementById("choice");
var timer = document.getElementById("timer");
var viewHighScore = document.getElementById("highscore");
var endScreen = document.getElementById("end-screen");
var submitEl = document.getElementById("submit");
var finalScore = document.getElementById("score");
var playAgainButton = document.getElementById("play-again");
var highscoreScreen = document.getElementById("highscore-page");



let shuffledQuestion, currentQuestionIndex;

// list of questions and answers
var questions = [
    {
        question: 'Enter Question here about html',
        answers: [
            {text: 'CorrectAnswer', correct: false},
            {text: 'textanswer', correct: false},
            {text: 'wronganswer', correct: true}
        ]
    },
    {
        question: 'Question kjnskg 5',
        answers: [
            {text: 'CorrectAnswer', correct: false},
            {text: 'textanswer', correct: false},
            {text: 'wronganswer', correct: true}
        ]
    },
    {
        question: 'nother question',
        answers: [
            {text: 'CorrectAnswer', correct: false},
            {text: 'textanswer', correct: false},
            {text: 'wronganswer', correct: true}
        ]
    },
    {
        question: 'Another questionnn',
        answers: [
            {text: 'CorrectAnswer', correct: false},
            {text: 'textanswer', correct: false},
            {text: 'wronganswer', correct: true}
        ]
    },
    {
        question: 'Stufffff stuffl',
        answers: [
            {text: 'CorrectAnswer', correct: false},
            {text: 'textanswer', correct: false},
            {text: 'wronganswer', correct: true}
        ]
    }
]

// starts quiz when start button is pressed and shows next question
function startQuiz() {
    titleScreen.classList.add('hide');
    questionContainerEl.classList.remove('hide');

    shuffledQuestion = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    startTimer();
    nextQuestion();
    
}

// Moves to the next question
function nextQuestion() {
    resetState();
    showQuestion(shuffledQuestion[currentQuestionIndex]);
    
}

// displays the question and answer choices
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonEl.appendChild(button);
    })

}

function resetState() {
    // resets answer choice every question
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    }
}

function selectAnswer(event) {
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct;
    
    // checks if answer was correct or wrong
    answerChoice.classList.add('top-border')
    if (correct) {
        answerChoice.innerText = "Correct!";
        console.log("true");
    
    } else {
        answerChoice.innerText = "Wrong!";
        console.log("false");
        if (counter > 10) {
            counter = counter - 10;
        } else if (counter < 10){
            timer.innerHTML = 0;
            endGame();         
        }
    }
    // sees if there are more questions then proceeds to next if there is
    if ( shuffledQuestion.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        nextQuestion();
    } else {
        console.log("Finished");
        endGame();

    }    
}


// sets time limit
var counter = 100

// starts the countdowm
function startTimer() {
    countDown = setInterval( function () {
        if (counter > 0) {
            counter--;
            timer.innerHTML = counter;
        }
    }, 1000)
}


function endGame() {
    // stops timer
    clearInterval(countDown);  
    
    // hides questions
    questionContainerEl.classList.add('hide');
    
    // displays the end screen
    endScreen.classList.remove('hide');
    
    finalScore.innerText = counter;
    
}

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

function saveHighscore() {
    // saves players name and score into array
    playerName = document.getElementById("name").value;
    playerScore = finalScore.textContent

    // defines playerInfo array
    const playerInfo = {
        name: playerName,
        score: playerScore
    };

    // pushes saved name and score to localstorage
    highScores.push(playerInfo);

    // updates local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // goes to highscore page
    highscoreList();
}

function highscoreList() {
    highscoreScreen.classList.remove('hide');
    titleScreen.classList.add('hide');
    endScreen.classList.add('hide');

    // create highscore list     make loop for every array in localstorage!!!!!
    for (var i = 0; i < highScores.length; i++) {
        var listHighscoreEl = document.createElement("li");
        listHighscoreEl.className = "list-highscore";

        
        
    }
}

function homePage() {
    highscoreScreen.classList.add('hide');
    titleScreen.classList.remove('hide');
    clearInterval(countDown);  
}



submitEl.addEventListener("click", saveHighscore);

startButton.addEventListener("click", startQuiz);

playAgainButton.addEventListener("click", homePage);


viewHighScore.addEventListener("click", highscoreList);

