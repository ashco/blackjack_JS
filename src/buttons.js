const buttonHit = (target) => {
  deal_card(target);

  const cardTotal = check_cardTotal(target)

  board.board_cardTotal(target, cardTotal);

  // Check for bust
  if (cardTotal > 21) {
    phaseSwitcher('DealerPlayPhase');
  }
}

const buttonStand = () => {
  phaseSwitcher('DealerPlayPhase');
}

