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
    btnState('disable', btn_deal); // Remove deal button
    // button_deal.classList.add('disabled');

    // Cards
    deal_initial();


    phaseSwitcher('MainDecisionPhase');


  }


  else if (phase === 'MainDecisionPhase') {
    console.log('Initialize: MainDecisionPhase');

    let playerTotal = check_cardTotal('player');
    let dealerTotal = check_cardTotal('dealer');

    // presents card totals on screen
    board.board_cardTotal('player', playerTotal);
    board.board_cardTotal('dealer', dealerTotal);

    // check for blackjack
    if (playerTotal === 21) {
      phaseSwitcher('DealerPlayPhase');
      blackJack = true;
      return;
    }
    // presents action buttons on screen
    btnState('enable', btn_hit, btn_stand, btn_double);
    // btn_hit.classList.remove('disabled');
    // btn_stand.classList.remove('disabled');
    // btn_double.classList.remove('disabled');
    if (cards.position.player[0].name === cards.position.player[1].name) {
      btnState('enable', btn_split);
      // button_split.classList.remove('disabled');
    }
    if (cards.position.dealer[1].name === 'a') {
      btnState('enable', btn_insure);
      // button_insure.classList.remove('disabled');
    }


  }


  else if (phase === 'DealerPlayPhase') {
    console.log('Initialize: DealerPlayPhase');
    // Remove buttons
    btnState('disable', btn_hit, btn_stand, btn_double, btn_split, btn_insure);
    // btn_hit.classList.add('disabled');
    // btn_stand.classList.add('disabled');
    // btn_double.classList.add('disabled');
    // btn_split.classList.add('disabled');
    // btn_insure.classList.add('disabled');

    // Flip first card

    // dealer bot will add cards until they reach 16 - 21 range
    botDealer();
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