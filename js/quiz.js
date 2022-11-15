const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = document.getElementById('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores'));
console.log(highScores);
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
  console.log('Clicked the Save button!');
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };
  console.log(score);
}