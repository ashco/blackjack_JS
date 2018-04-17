const deal_initial = () => {
  for (let i = 0; i < 2; i++) {
    cards.position.player.unshift(cards.info[cards.position.deck.shift()]);
    cards.position.dealer.unshift(cards.info[cards.position.deck.shift()]);
  }

  console.table(cards.position.player);
  console.table(cards.position.dealer);
}

const deal_hit = () => {

}




const boardUpdate_initialDeal = () => {
  const delay = 500;

  for (let i = 0; i < cards.position.player.length && i < cards.position.dealer.length; i++) {
    let playerCard = setTimeout(addCardImg(cards.position.player[i], 'player'), delay);
    let dealerCard = setTimeout(addCardImg(cards.position.dealer[i], 'dealer'), delay);
  }
}

const addCardImg = (card, player) => {
  const html = `
    <div class="card color--${card.color}">
      ${card.name}
    </div>
  `;

  if (player === 'player') {
    element_playerCards.innerHTML += html;
  }
  if (player === 'dealer') {
    element_dealerCards.innerHTML += html;
  }
}