let quizId = document.getElementById('quiz-questions');
let timeLeft = document.getElementById('time-remaining');
let answersChoices = document.getElementById('answer-choices');
let userName = document.getElementById('initials');
let startButton = document.getElementById('start-button');
let saveButton = document.getElementById('save-button');

let currentQuestion = 0;
let timer = 75;
let timeInterval;

const questions = [
    {
        question: '1) In JavaScript, everything is an _____',
        answer: ['a) problem', 'b) function', 'c) variable', 'd) object'],
        correctAnwser: 'd) object',
    },
    {
        question: '2) NPM I is short for ____',
        answer: ['a) npm seed', 'b) npm install', 'c) npm start', 'd) npm run start'],
        correctAnwser: 'b) npm install',
    },
    {
        question: '3) When referencing your JavaScript file in HTML, best practice is to place it ____',
        answer: ['a) just below the first <body> tag', 'b) just above the final </body> tag', 'c) outside the <body> entirely', 'd) anywhere in the <head>'],
        correctAnwser: 'b) just above the final </body> tag',
    },
    {
        question: '4) HTML stands for ____',
        answer: ['a) Hiddentext Marking Language', 'b) Hypertext Makeup Loading', 'c) Hypertext Markup Language', 'd) Hiddentext Markup Language'],
        correctAnwser: 'c) Hypertext Markup Language',
    },
    {
        question: '5) Why was node.js created?',
        answer: ['a) to provide developers with the power to use JavaScript for server-side scripting and unifying web application development around a single programming language.', 'b) to code with Python', 'c) to make front-end coding easier', 'd) to simply complicate your life'],
        correctAnwser: 'a) to provide developers with the power to use JavaScript for server-side scripting and unifying web application development around a single programming language.',
    },
]

function startQuiz() {
    const homePage = document.querySelector('.home-page');
    homePage.setAttribute('class', 'hide');
    quizId.removeAttribute('class');
    askQuestion();
    timeInterval = setInterval(startTimer, 1000);
    startTimer();
};

function askQuestion() {
    const questionOrder = document.getElementById('question');
    questionOrder.textContent = questions[currentQuestion].question;
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
    const scoreScreen = document.getElementById('score-screen');
    scoreScreen.removeAttribute('class');
    const finalTime = document.getElementById('final-time');
    finalTime.textContent = timer;
    quizId.setAttribute('class', 'hide');
};

function saveScore() {
    const initials = userName.value.trim();
    if (initials !== '') {
        let currentScore = JSON.parse(localStorage.getItem('highscore')) || [];
        let newScore = {
            score: timer,
            userName: initials,
        }
        currentScore.push(newScore);
        localStorage.setItem('highscore', JSON.stringify(currentScore));
        window.location.href = 'highscore.html';
    }
};

startButton.addEventListener('click', startQuiz);
saveButton.addEventListener('click', saveScore);