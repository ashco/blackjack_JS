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
