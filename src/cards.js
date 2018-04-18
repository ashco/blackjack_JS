// const deal_card = (target) => {
//   const targetCards = check_targetCards(target);

//   targetCards.unshift(deck.cards.info[deck.cards.position.deck.shift()]);

//   addCardImg(target, targetCards[0]);
// }


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


// const deal_initial = () => {
//   for (let i = 0; i < 2; i++) {

//     deal_card('player');
//     deal_card('dealer');
//   }
// }


// const check_targetCards = (target) => target === 'player' ? cards.cardObj.position.player : cards.cardObj.position.dealer;


// const check_cardTotal = (target) => {
//   const targetCards = check_targetCards(target);
//   let totalValue = targetCards.reduce((total, current) => total + current.value, 0);

//   if (totalValue > 21) {
//     console.log('Potential Bust: Checking for Ace');
//     targetCards.forEach(card => {
//       if (card.name === 'a') {
//         console.log('ACE OF BASE');
//         console.log(card);
//       }

//     });
//   }

//   return totalValue;
// }



const botDealer = () => {
  let playerTotal = cards.check_cardTotal('player');
  let dealerTotal = cards.check_cardTotal('dealer');

  if (playerTotal > 21) {
    cards.phaseSwitcher('ScoringPhase');
  }
  while (dealerTotal < 16) {
    cards.deal_card('dealer');
    dealerTotal = cards.check_cardTotal('dealer');
    board.board_cardTotal('dealer', dealerTotal);
  }
  cards.phaseSwitcher('ScoringPhase');
}