// Buttons
const button_hit = document.querySelector('.btn--hit');
const button_stand = document.querySelector('.btn--stand');
const button_double = document.querySelector('.btn--double');
const button_split = document.querySelector('.btn--split');

// Chips
const button_chipBet = document.querySelectorAll('.chip--bet');
const button_chipPlayer = document.querySelector('.chip--player');

// Score
const element_playerScore = document.querySelector('.player__score');

let playerScore = 2400;
let playerBet;

const updateScore = function () {
  element_playerScore.innerText = playerScore;
}


const chipBet = function (chipValue) {
 playerBet += chipValue
}






const alert = function () {
  console.log('trigger');
}


button_hit.addEventListener('click', alert);
button_stand.addEventListener('click', alert);
button_double.addEventListener('click', alert);
button_split.addEventListener('click', alert);

button_chipBet.forEach(chip => {
  addEventListener('click', alert);
});
button_chipPlayer.addEventListener('click', alert);


updateScore();