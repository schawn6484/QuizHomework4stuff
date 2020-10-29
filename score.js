const highScoreEl = document.getElementById('highscores')
const clearEl = document.getElementById('clear')

var score = JSON.parse(localStorage.getItem('score'));
highScoreEl.textContent = " Hi " + score.name + " Your score is: " + score.score;


function clearScore(){
    localStorage.removeItem('score');
    location.reload();
}


clearEl.onclick = clearScore;
