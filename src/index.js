// Buttons
const button_hit = document.querySelector('.btn--hit');
const button_stand = document.querySelector('.btn--stand');
const button_double = document.querySelector('.btn--double');
const button_split = document.querySelector('.btn--split');

// Chips
const button_chipPlayer = document.querySelectorAll('.chip--player');
const element_chipPot = document.querySelector('.chip--pot');

// Score
const element_chipScore = document.querySelector('.chip--score');
const element_playerScore = document.querySelector('.player__score');

let playerScore = 2500;
let playerBet = [];

const updateBet = function () {
  const playerBetTotal = playerBet.reduce((total, current) => {
    return total + current;
  }, 0);
  console.log(playerBetTotal);
  element_playerScore.innerText = playerScore;
  element_chipScore.innerText = playerBetTotal;
}


const chipBetAdd = function () {
  betSize = parseInt(this.dataset.bet);
  // console.log(betSize);

  playerScore -= betSize;
  playerBet.push(betSize);


  updateBet();
}






const alert = function () {
  console.log('trigger');
}


button_hit.addEventListener('click', alert);
button_stand.addEventListener('click', alert);
button_double.addEventListener('click', alert);
button_split.addEventListener('click', alert);

button_chipPlayer.forEach(chip => chip.addEventListener('click', chipBetAdd));

element_chipPot.addEventListener('click', alert);

updateBet();