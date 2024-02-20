const clearButton = document.getElementById('clear-button');
let highScores = document.getElementById('scores');

function showScores() {
    let allScores = JSON.parse(localStorage.getItem('highscore')) || [];
    allScores.sort(function(a,b){return a-b});

    allScores.forEach(score => {
        let scoreList = document.createElement('li');
        scoreList.textContent = score.userName + ' : '+ score.score;
        highScores.appendChild(scoreList);
    });
};

function clearScores() {
    window.localStorage.removeItem('highscore');
    window.location.reload();
};

clearButton.addEventListener('click', clearScores);

showScores();