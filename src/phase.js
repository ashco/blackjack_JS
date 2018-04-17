let blackJack = false;

const phaseSwitcher = (phase) => {
  if (phase === 'PlaceYourBetsPhase'){
    console.log('Initialize: PlaceYourBetsPhase');
    // Event listeners
    element_chipPot.addEventListener('click', board.bet_chipRemove);
    element_chipPlayer.forEach(chip => chip.addEventListener('click', board.bet_chipAdd));

    // Message
    board.board_message('Place Your Bets');
    board.boardUpdate_all(); // Place bets, interact with chips in board

  }


  else if (phase === 'DealPhase') {
    console.log('Initialize: DealPhase');
    // Event listeners
    element_chipPot.removeEventListener('click', board.bet_chipRemove);
    element_chipPlayer.forEach(chip => chip.removeEventListener('click', board.bet_chipAdd));

    // Message
    board.board_message('');

    // Buttons
    button_deal.classList.add('disabled'); // Remove deal button

    // Cards
    deal_initial();
    // boardUpdate_initDeal();


    phaseSwitcher('MainDecisionPhase');


  }


  else if (phase === 'MainDecisionPhase') {
    console.log('Initialize: MainDecisionPhase');

    let playerTotal = check_cardTotal('player');
    let dealerTotal = check_cardTotal('dealer');

    // presents card totals on screen
    element_playerCardTotal.innerText = playerTotal;
    element_dealerCardTotal.innerText = dealerTotal;

    // check for blackjack
    if (playerTotal === 21) {
      phaseSwitcher('DealerPlayPhase');
      blackJack = true;
      return;
    }
    // presents action buttons on screen
    button_hit.classList.remove('disabled');
    button_stand.classList.remove('disabled');
    button_double.classList.remove('disabled');
    if (cards.position.player[0].name === cards.position.player[1].name) {
      button_split.classList.remove('disabled');
    }
    if (cards.position.dealer[1].name === 'a') {
      button_insure.classList.remove('disabled');
    }


  }


  else if (phase === 'DealerPlayPhase') {
    console.log('Initialize: DealerPlayPhase');
    // dealer bot will add cards until they reach 16 - 21 range

  }


  else if (phase === 'ScoringPhase') {
    console.log('Initialize: ScoringPhase');
    // scores are compaired and winner is chosen
    // winOrLose function is triggered and payout is given
    // message is presented
      //"Dealer Wins"
      //"Win $12"
      //"Push"

    //Blackjack wins 1.5x payout
  }


  else if (phase === 'NewRoundPhase') {
    console.log('Initialize: NewRoundPhase');
    // check if deck needs to be shuffled
    // add in previous bet amount
      // if can't cover, start with nothing
  }


  else if (phase === 'ShufflePhase') {
    console.log('Initialize: ShufflePhase');
    // if not enough cards in deck, shuffle full deck
  }
}