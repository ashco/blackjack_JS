const deal_initial = () => {
  for (let i = 0; i < 2; i++) {

    deal_card('player');
    deal_card('dealer');
  }
}

const deal_card = (target) => {
  const targetCards = check_targetCards(target);

  targetCards.unshift(cards.info[cards.position.deck.shift()]);

  addCardImg(targetCards[0], target);
}


// const boardUpdate_initDeal = () => {

//   for (let i = 0; i < cards.position.player.length && i < cards.position.dealer.length; i++) {
//     addCardImg(cards.position.player[i], 'player');
//     addCardImg(cards.position.dealer[i], 'dealer');
//   }
// }

const addCardImg = (card, target) => {
  const html = `
    <div class="card color--${card.color}">
      ${card.name}
    </div>
  `;

  if (target === 'player') {
    element_playerCards.innerHTML += html;
  }
  if (target === 'dealer') {
    element_dealerCards.innerHTML += html;
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

const check_bust = (target) => {
  const targetCards = check_targetCards(target);






}

const check_blackJack = (target) => {
  const targetCards = check_targetCards(target);
  const result = (check_cardTotal(target) === 21 && targetCards.length === 2) ? true : false;
  return result;
}