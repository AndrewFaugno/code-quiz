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
    
    // resets time limit
    counter = 100

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

// resets answer choice every question
function resetState() {
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    }
}

// gives input if the selected answer is right or wrong, or proceeds to endgame function if there are no more questions
function selectAnswer(event) {
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct;
    
    // checks if answer was correct or wrong
    answerChoice.classList.add('top-border')
    if (correct) {
        answerChoice.innerText = "Correct!";
    
    } else {
        answerChoice.innerText = "Wrong!";
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

// ends the quiz and saves your score
function endGame() {
    // stops timer
    clearInterval(countDown);  
    
    // hides questions
    questionContainerEl.classList.add('hide');
    
    // displays the end screen
    endScreen.classList.remove('hide');
    
    finalScore.innerText = counter;
    
}

// creates a var for localstorage to be called on
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// adds player scores and names into localstorage and sorts them
function saveHighscore() {
    // saves players name and score into array
    playerName = document.getElementById("name").value;
    playerScore = finalScore.textContent

    if (!playerName) {
        alert("Please Enter Initials");
        return false;
    }

    // defines playerInfo array
    const playerInfo = {
        name: playerName,
        score: playerScore
    };

    // pushes saved name and score to localstorage
    highScores.push(playerInfo);

    // updates local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    highScores.sort(sortNumbers);
    function sortNumbers(a ,b) {
        return b.score - a.score;
    }

    // goes to highscore page
    highscoreList();
}

// takes all arrays in localstorage and creates list
function highscoreList() {
    highscoreScreen.classList.remove('hide');
    titleScreen.classList.add('hide');
    endScreen.classList.add('hide');

    // sets location where list goes
    var highScoreLocationEl = document.getElementById("highscore-list");

    // deletes and previous html elements to prevent duplicates
    while (highScoreLocationEl.firstChild) {
        highScoreLocationEl.removeChild(highScoreLocationEl.firstChild);
    }

    // create highscore list     make loop for every array in localstorage!!!!!
    for (var i = 0; i < highScores.length; i++) {

        var listHighscoreEl = document.createElement("li");
        listHighscoreEl.className = "list-highscore";

        var place = i + 1;
        listHighscoreEl.innerHTML = "<li class='highscoreListIds'>" + place + ". " + highScores[i].name + " - " + highScores[i].score + "</li>"
        highScoreLocationEl.appendChild(listHighscoreEl);          
    }
}

function homePage() {
    highscoreScreen.classList.add('hide');
    titleScreen.classList.remove('hide');
}

// when submit button is clicked
submitEl.addEventListener("click", saveHighscore);

// when start quiz button is clicked
startButton.addEventListener("click", startQuiz);

// when play again button is clicked
playAgainButton.addEventListener("click", homePage);

// when view high scores text is clicked 
viewHighScore.addEventListener("click", highscoreList);

