var startButton = document.getElementById("start-btn");
var titleScreen = document.getElementById("title-container");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonEl = document.getElementById("answer-btns");
var answerChoice = document.getElementById("choice");

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
        // subtractTime();
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

function endGame() {
    answerChoice.innerText = "";

}



startButton.addEventListener("click", startQuiz);