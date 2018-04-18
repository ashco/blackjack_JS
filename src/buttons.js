const btn = {
  state: function (state, buttons) {
    const args = Array.from(arguments);
    args.shift();
    if (state === 'enable') {
      args.forEach(arg => arg.classList.remove('disabled'));
    }
    else if (state === 'disable') {
      args.forEach(arg => arg.classList.add('disabled'));
    }
  },


  hit: function (target) {
    cards.deal_card(target);

    const cardTotal = cards.check_cardTotal(target)

    board.board_cardTotal(target, cardTotal);

    // Check for bust
    if (cardTotal >= 21) {
      cards.phaseSwitcher('DealerPlayPhase');
    }
  },


  stand: function () {
    cards.phaseSwitcher('DealerPlayPhase');
  }
}







// const btnState = function (state, buttons) {
//   const args = Array.from(arguments);
//   args.shift();
//   if (state === 'enable') {
//     args.forEach(arg => arg.classList.remove('disabled'));
//   }
//   else if (state === 'disable') {
//     args.forEach(arg => arg.classList.add('disabled'));

//   }
// }

// const btnHit = (target) => {
//   cards.deal_card(target);

//   const cardTotal = cards.check_cardTotal(target)

//   board.board_cardTotal(target, cardTotal);

//   // Check for bust
//   if (cardTotal >= 21) {
//     cards.phaseSwitcher('DealerPlayPhase');
//   }
// }

// const btnStand = () => {
//   cards.phaseSwitcher('DealerPlayPhase');
// }

