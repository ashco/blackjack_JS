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
  const chipSize = parseInt(this.dataset.bet);

  playerBetArr.push(chipSize);
  playerScore = playerScore - chipSize;

  bet_update();
  elementManager_potChip()
  elementManager_playerChip();
}

const bet_chipRemove = function () {
  const chipSize = playerBetArr.pop();

  playerScore = playerScore + chipSize;

  bet_update();
  elementManager_potChip()
  elementManager_playerChip();
}

const bet_update = function () {
  const playerBetTotal = playerBetArr.reduce((total, current) => total + current, 0);

  element_playerScore.innerText = playerScore;
  playerBetTotal > 0 ? element_chipScore.innerText = playerBetTotal : element_chipScore.innerText = '';
}

const randCoordGen = function (pos, rand) {
  let coord = (playerBetArr.length - pos) * Math.PI.toFixed(rand);
  coord = (parseInt(coord.toString().slice(-4)) / 10000);
  return coord;
}


const elementManager_potChip = function () {
  const chipNum = 3;

  const top3 = playerBetArr.slice(-chipNum);
  const html = top3.map((chip, i) => {
    const topCoord = randCoordGen(-i, 7);
    const rightCoord = randCoordGen(-i, 9);
    console.log(topCoord, rightCoord);

    return `
      <div class="chip--pot chip--${chip}" style="top: ${topCoord * 25}px; right: ${rightCoord * 25}px">${chip}</div>
    `;
  }).join('');

  element_chipPot.innerHTML = html;
}

const elementManager_playerChip = function () {
  element_chipPlayer.forEach(chip => {
    let chipSize = parseInt(chip.dataset.bet);

    chipSize > playerScore ? chip.classList.add('disabled') : chip.classList.remove('disabled');
  });
}

// const disable_potChip = function () {
//   if (playerBetArr.length === 0) {
//     element_chipPot.classList.add('disabled');
//   }
//   else {
//     element_chipPot.classList.remove('disabled');
//   }
// }

const winOrLose = function (result) {
  const playerBetTotal = playerBetArr.reduce((total, current) => total + current, 0);

  if (result === true) {
    playerScore = playerScore + (playerBetTotal * 2);
  }
  playerBetArr = [];
  bet_update();
  elementManager_potChip()
  elementManager_playerChip();
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