// Buttons
const button_deal = document.querySelector('.btn--deal');
const button_hit = document.querySelector('.btn--hit');
const button_stand = document.querySelector('.btn--stand');
const button_double = document.querySelector('.btn--double');
const button_split = document.querySelector('.btn--split');
const button_insure = document.querySelector('.btn--insure');

// Message
const element_message = document.querySelector('.text__container h1')

// Cards
const element_playerCards = document.querySelector('.card__images--player');
const element_dealerCards = document.querySelector('.card__images--dealer');

// Chips
const element_chipPlayer = document.querySelectorAll('.chip--player');
const element_chipPot = document.querySelector('.chip__pot');

// Score
const element_chipScore = document.querySelector('.chip__score');
const element_playerScore = document.querySelector('.player__score');
const element_playerCardTotal = document.querySelector('.card__score--player');
const element_dealerCardTotal = document.querySelector('.card__score--dealer');

// Board Closure
const board = (function () {

  let playerScore = 2500;
  let playerBetTotal = 0;
  const playerBetArr = [];

  return ({
    bet_chipAdd: (e) => {
      // console.log();
      const chipSize = parseInt(e.target.dataset.betsize);

      playerBetArr.push(chipSize);
      playerScore = playerScore - chipSize;

      board.boardUpdate_all();
    },


    bet_chipRemove: () => {
      const chipSize = playerBetArr.pop();

      playerScore = playerScore + chipSize;

      board.boardUpdate_all()
    },


    winOrLose: (result) => {
      playerBetTotal = playerBetArr.reduce((total, current) => total + current, 0);

      if (result === true) {
        playerScore = playerScore + (playerBetTotal * 2);
      }
      playerBetArr = [];

      board.boardUpdate_all();
    },


    boardUpdate_bet: () => {
      playerBetTotal = playerBetArr.reduce((total, current) => total + current, 0);

      element_playerScore.innerText = playerScore;
      playerBetTotal > 0 ? element_chipScore.innerText = playerBetTotal : element_chipScore.innerText = '';
    },


    boardUpdate_potChip: () => {
      const chipNum = 10;
      const sway = 7;

      const topChips = playerBetArr.slice(-chipNum);
      const html = topChips.map((chip, i) => {
        const topCoord = board.coordGen(playerBetArr.length - topChips.length + i, 7);
        const rightCoord = board.coordGen(playerBetArr.length - topChips.length + i, 9);

        return `
          <div class="chip--pot chip--${chip}" style="top: ${topCoord * sway}px; right: ${rightCoord * sway}px">${chip}</div>
        `;
      }).join('');

      element_chipPot.innerHTML = html;
    },


    boardUpdate_playerChip: () => {
      element_chipPlayer.forEach(chip => {
        let chipSize = parseInt(chip.dataset.betsize);
        chipSize > playerScore ? chip.classList.add('disabled') : chip.classList.remove('disabled');
      });
    },


    boardUpdate_all: () => {
      board.boardUpdate_bet();
      board.boardUpdate_potChip()
      board.boardUpdate_playerChip();
      playerBetTotal > 0 ? button_deal.classList.remove('disabled') : button_deal.classList.add('disabled');
    },

    coordGen: (index, rand) => {
      if (index <= 0) {
        return 0;
      }

      let coord = index * Math.PI.toFixed(rand);
      coord = parseInt(coord.toString().slice(-4)) / 10000;

      return coord;
    },

    board_message: (message) => {
      element_message.innerText = message;
    },

    alert: () => {
      console.log('trigger');
    }
  });
})();




// button_deal.addEventListener('click', () => {
//   phaseSwitcher('DealPhase');
// });
button_hit.addEventListener('click', board.alert);
button_stand.addEventListener('click', board.alert);
button_double.addEventListener('click', board.alert);
button_split.addEventListener('click', board.alert);