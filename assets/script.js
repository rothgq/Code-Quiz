const quizId = document.getElementById('#quiz-questions');
const timeLeft = document.getElementById('#time-remaining');
const answersChoices = document.getElementById('#answer-choices');

const currentQuestion = 0;
const timer = 75;
let timeInterval;

function startQuiz() {
    const homePage = document.querySelector('#home-page');
    homePage.style.display = 'none';
    quizId.removeAttribute('class');
    askQuestion();
    timeInterval = setInterval(startTimer, 1000);
    startTimer();
};

function askQuestion() {
    const currentQuestion = document.getElementById('#question');
    currentQuestion.textContent = questions[currentQuestion].question;
    answersChoices.innerHTML = '';

    for (let i = 0; i < questions[currentQuestion].answer.length; i++) {
        const answerButton = document.createElement('button');
        answerButton.textContent = questions[currentQuestion].answer[i];
        answerButton.addEventListener('click', checkAnswer);
        answersChoices.appendChild(answerButton);
    };
};

function checkAnswer() {
    event.preventDefault();
    const submission = event.target.textContent;
    if (submission === questions[currentQuestion].correctAnwser) {
        currentQuestion++;
        if (currentQuestion === questions.length) {
            endQuiz();
        } else {
            askQuestion();
        }
        M.toast({ html: 'Correct!' });
    } else {
        timer -= 10;
        M.toast({ html: 'Incorrect!' });
    }
};

function startTimer() {
    timeLeft.textContent = timer;
    timer--;
    if (timer === 0) {
        endQuiz();
    }
};

function endQuiz() {
    clearInterval(timeInterval);
    const scoreScreen = document.getElementById('#score-screen');
    scoreScreen.removeAttribute('class');
    const finalTime = document.getElementById('#final-time');
    finalTime.textContent = timeLeft;
    quizId.setAttribute('class', 'hide');
}
