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
    boardUpdate_initDeal();


    // phaseSwitcher('MainDecisionPhase');


  }


  else if (phase === 'MainDecisionPhase') {
    console.log('Initialize: MainDecisionPhase');
    // presents card totals on screen
    // presents action buttons on screen
      // hit, stand, insure, double, split
    // logic for action buttons takes place here
    // if 21, blackjack!
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