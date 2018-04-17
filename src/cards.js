const deal_initial = () => {
  for (let i = 0; i < 2; i++) {
    cards.position.player.unshift(cards.info[cards.position.deck.shift()]);
    cards.position.dealer.unshift(cards.info[cards.position.deck.shift()]);
  }
}

const deal_hit = () => {

}




const boardUpdate_cards = () => {

}