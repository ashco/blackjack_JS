const addCardImg = (target, card) => {
  // if (card.id === deck.cards.position.dealer[0].id) {
  //   const html = `<div class="card--back"></div>`;

  // }
  // else {
    const html = `
      <div class="card--front color--${card.color}">
        ${card.name}
      </div>
    `;
  // }

  if (target === 'player') {
    element_playerCards.innerHTML += html;
  }
  else if (target === 'dealer') {
    element_dealerCards.innerHTML += html;
  }
}



// const botDealer = () => {
//   let playerTotal = cards.check_cardTotal('player');
//   let dealerTotal = cards.check_cardTotal('dealer');

//   if (playerTotal > 21) {
//     cards.phaseSwitcher('ScoringPhase');
//   }
//   while (dealerTotal < 16) {
//     cards.deal_card('dealer');
//     dealerTotal = cards.check_cardTotal('dealer');
//     board.board_cardTotal('dealer', dealerTotal);
//   }
//   cards.phaseSwitcher('ScoringPhase');
// }