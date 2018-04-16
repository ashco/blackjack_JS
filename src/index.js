// Buttons
const button_play = document.querySelector('.btn--play');
const button_hit = document.querySelector('.btn--hit');
const button_stand = document.querySelector('.btn--stand');
const button_double = document.querySelector('.btn--double');
const button_split = document.querySelector('.btn--split');

// Chips
const element_chipPlayer = document.querySelectorAll('.chip--player');
const element_chipPot = document.querySelector('.chip__pot');

// Score
const element_chipScore = document.querySelector('.chip__score');
const element_playerScore = document.querySelector('.player__score');

let playerScore = 2500;
let playerBetArr = [];


const bet_chipAdd = function () {
  let chipSize = parseInt(this.dataset.bet);

  playerBetArr.push(chipSize);
  playerScore = playerScore - chipSize;

  bet_update();
  chipDisableCheck();
}

const bet_chipRemove = function () {
  const chipSize = playerBetArr.pop();

  playerScore = playerScore + chipSize;

  bet_update();
  chipDisableCheck();
}

const bet_update = function () {
  const playerBetTotal = playerBetArr.reduce((total, current) => total + current, 0);


  element_playerScore.innerText = playerScore;
  element_chipScore.innerText = playerBetTotal;
}

const chipDisableCheck = function () {
  element_chipPlayer.forEach(chip => {
    let chipSize = parseInt(chip.dataset.bet);

    chipSize > playerScore ? chip.classList.add('disabled') : chip.classList.remove('disabled');
  });
}


const alert = () => console.log('trigger');


button_play.addEventListener('click', alert);
button_hit.addEventListener('click', alert);
button_stand.addEventListener('click', alert);
button_double.addEventListener('click', alert);
button_split.addEventListener('click', alert);

element_chipPot.addEventListener('click', bet_chipRemove);
element_chipPlayer.forEach(chip => chip.addEventListener('click', bet_chipAdd));

bet_update();