const btnState = function (state, buttons) {
  const args = Array.from(arguments);
  args.shift();
  if (state === 'enable') {
    args.forEach(arg => arg.classList.remove('disabled'));
  }
  else if (state === 'disable') {
    args.forEach(arg => arg.classList.add('disabled'));

  }
}

const btnHit = (target) => {
  deal_card(target);

  const cardTotal = check_cardTotal(target)

  board.board_cardTotal(target, cardTotal);

  // Check for bust
  if (cardTotal >= 21) {
    phaseSwitcher('DealerPlayPhase');
  }
}

const btnStand = () => {
  phaseSwitcher('DealerPlayPhase');
}

