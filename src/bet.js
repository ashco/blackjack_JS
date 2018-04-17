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

      board.board_update();
    },


    bet_chipRemove: () => {
      const chipSize = playerBetArr.pop();

      playerScore = playerScore + chipSize;

      board.board_update()
    },


    winOrLose: (result) => {
      playerBetTotal = playerBetArr.reduce((total, current) => total + current, 0);

      if (result === true) {
        playerScore = playerScore + (playerBetTotal * 2);
      }
      playerBetArr = [];

      board.board_update();
    },


    bet_update: () => {
      playerBetTotal = playerBetArr.reduce((total, current) => total + current, 0);

      element_playerScore.innerText = playerScore;
      playerBetTotal > 0 ? element_chipScore.innerText = playerBetTotal : element_chipScore.innerText = '';
    },


    potChip_update: () => {
      const chipNum = 10;
      const sway = 10;

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


    playerChip_update: () => {
      element_chipPlayer.forEach(chip => {
        let chipSize = parseInt(chip.dataset.betsize);
        chipSize > playerScore ? chip.classList.add('disabled') : chip.classList.remove('disabled');
      });
    },


    board_update: () => {
      board.bet_update();
      board.potChip_update()
      board.playerChip_update();
    },

    coordGen: (index, rand) => {
      if (index <= 0) {
        return 0;
      }

      let coord = index * Math.PI.toFixed(rand);
      coord = parseInt(coord.toString().slice(-4)) / 10000;

      return coord;
    },

    alert: () => {
      console.log('trigger');
    }
  });
})();


button_play.addEventListener('click', board.alert);
button_hit.addEventListener('click', board.alert);
button_stand.addEventListener('click', board.alert);
button_double.addEventListener('click', board.alert);
button_split.addEventListener('click', board.alert);

element_chipPot.addEventListener('click', board.bet_chipRemove);
element_chipPlayer.forEach(chip => chip.addEventListener('click', board.bet_chipAdd));

board.board_update();