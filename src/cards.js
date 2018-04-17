const deal_card = (target) => {
  const targetCards = check_targetCards(target);

  targetCards.unshift(cards.info[cards.position.deck.shift()]);

  addCardImg(target, targetCards[0]);
}

const addCardImg = (target, card) => {
  // if (card.id === cards.position.dealer[0].id) {
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


const deal_initial = () => {
  for (let i = 0; i < 2; i++) {

    deal_card('player');
    deal_card('dealer');
  }
}




const check_targetCards = (target) => target === 'player' ? cards.position.player : cards.position.dealer;

const check_cardTotal = (target) => {
  const targetCards = check_targetCards(target);
  const totalValue = targetCards.reduce((total, current) => {
    if (current.value >= 10) {
      current.value = 10;
    }
    else if (current.value === 1) {
      current.value = 11;
    }
    return total + current.value;
  }, 0);

  return totalValue;
}


// const check_bust = (target) => {
//   const targetCards = check_targetCards(target);

// }

const check_blackJack = (target) => {
  const targetCards = check_targetCards(target);
  const result = (check_cardTotal(target) === 21 && targetCards.length === 2) ? true : false;
  return result;
}

const botDealer = () => {
  let playerTotal = check_cardTotal('player');
  let dealerTotal = check_cardTotal('dealer');

  if (playerTotal > 21 || dealerTotal >= 16) {
    phaseSwitcher('ScoringPhase');
  }
  while (dealerTotal < 16) {
    deal_card('dealer');
    dealerTotal = check_cardTotal('dealer');
    board.board_cardTotal('dealer', dealerTotal);
  }
}