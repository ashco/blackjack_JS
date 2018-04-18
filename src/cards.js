const cards = (function() {

  let cardObj = {
    info: [],
    position: {
      deck: [],
      player: [],
      dealer: []
    }
  };

  let targetCards = [];
  let playerTotal = 0;
  let dealerTotal = 0;

  return ({
    // Deck Creation
    Card: function (id, value, name, suit, color) {
      this.id = id;
      this.value = value;
      this.name = name;
      this.suit = suit;
      this.color = color;
    },


    createDeck: function () {
      this.names = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
      this.suits = ['hearts', 'diamonds', 'spades', 'clubs'];
      this.color = ['black', 'red'];
      for (let i = 0; i < 4; i++) {
        for (let s = 0; s < this.suits.length; s++) {
          for (let n = 0; n < this.names.length; n++) {
            if (s > 1) {
              cardObj.info.push(new cards.Card((i * 52) + (s * 13) + n, n + 1, this.names[n], this.suits[s], this.color[0]));
            }
            else {
              cardObj.info.push(new cards.Card((i * 52) + (s * 13) + n, n + 1, this.names[n], this.suits[s], this.color[1]));
            }
          }
        }
      }
    },


    blackJackizer: function () {
      cardObj.info.forEach(card => {
        if (card.name === 'a') {
          card.value = 11;
        }
        else if (card.name === 'j' || card.name === 'q' || card.name === 'k') {
          card.value = 10;
        }
      });
    },


    shuffle: function () {
      const deckSize = 52 * 4;

      for (let i = 0; i < deckSize; i++) {
        const cardSelect = Math.floor(Math.random() * deckSize);
        cardObj.position.deck.includes(cardSelect) ? i -- : cardObj.position.deck.push(cardSelect);
      }

      console.log('Cards Shuffled');
    },


    // Gameplay Functions
    check_targetCards: function (target) {
      return target === 'player' ? cardObj.position.player : cardObj.position.dealer;
    },


    deal_card: function (target) {
      targetCards = cards.check_targetCards(target);

      targetCards.unshift(cardObj.info[cardObj.position.deck.shift()]);

      addCardImg(target, targetCards[0]);
    },


    deal_initial: function () {
      for (let i = 0; i < 2; i++) {
        cards.deal_card('player');
        cards.deal_card('dealer');
      }
    },


    check_cardTotal: function (target) {
      let totalValue;

      targetCards = cards.check_targetCards(target);
      totalValue = targetCards.reduce((total, current) => total + current.value, 0);

      // Logic to knock ace down from 11 to 1
      if (totalValue > 21) {
        console.log('Potential Bust: Checking for Ace');
        // Determine if Ace with value of 11 is present...
        const aceIndex = targetCards.findIndex(card => card.name === 'a' && card.value === 11);
        // If it is..
        if (aceIndex >= 0) {
          // Set Ace value to 1
          targetCards[aceIndex].value = 1;
          // Recalculate new total value
          totalValue = targetCards.reduce((total, current) => total + current.value, 0);
        }
      }
      return totalValue;
    },


    botDealer: function() {
      playerTotal = cards.check_cardTotal('player');
      dealerTotal = cards.check_cardTotal('dealer');

      if (playerTotal > 21) {
        cards.phaseSwitcher('ScoringPhase');
        return;
      }
      while (dealerTotal < 16) {
        cards.deal_card('dealer');
        dealerTotal = cards.check_cardTotal('dealer');
        board.board_cardTotal('dealer', dealerTotal);
      }
      cards.phaseSwitcher('ScoringPhase');
    },


    // Game Phase Function
    phaseSwitcher: function (phase) {
      if (phase === 'PlaceYourBetsPhase'){
        console.log('Initialize: PlaceYourBetsPhase');
        // console.log(playerTotal);
        // console.log(dealerTotal);

        // Chip Event Listeners
        element_chipPot.addEventListener('click', board.bet_chipRemove);
        element_chipPlayer.forEach(chip => chip.addEventListener('click', board.bet_chipAdd));

        // Message
        board.board_message('Place Your Bets');
        // board.boardUpdate_all(); // Place bets, interact with chips in board

      }


      else if (phase === 'DealPhase') {
        console.log('Initialize: DealPhase');

        // Chip Event Listeners
        element_chipPot.removeEventListener('click', board.bet_chipRemove);
        element_chipPlayer.forEach(chip => chip.removeEventListener('click', board.bet_chipAdd));

        // Message
        board.board_message('');

        // Buttons
        btn.state('disable', btn_deal); // Remove deal button

        // Deal Cards
        cards.deal_initial();

        // Next Phase
        cards.phaseSwitcher('MainDecisionPhase');
      }


      else if (phase === 'MainDecisionPhase') {
        console.log('Initialize: MainDecisionPhase');

        // Calculate and present card totals
        playerTotal = cards.check_cardTotal('player');
        dealerTotal = cards.check_cardTotal('dealer');
        board.board_cardTotal('player', playerTotal);
        board.board_cardTotal('dealer', dealerTotal);

        // Check for player blackjack
        if (playerTotal === 21) {
          cards.phaseSwitcher('DealerPlayPhase');
          return;
        }

        // presents action buttons on screen
        btn.state('enable', btn_hit, btn_stand, btn_double);
        if (cardObj.position.player[0].name === cardObj.position.player[1].name) {
          btn.state('enable', btn_split);
        }
        if (cardObj.position.dealer[1].name === 'a') {
          btn.state('enable', btn_insure);
        }
      }


      else if (phase === 'DealerPlayPhase') {
        console.log('Initialize: DealerPlayPhase');

        // Remove buttons
        btn.state('disable', btn_hit, btn_stand, btn_double, btn_split, btn_insure);

        // Flip first card

        // Recalculate revealed dealer total

        // Dealer bot will add cards until 16 <=
        cards.botDealer();
      }


      else if (phase === 'ScoringPhase') {
        console.log('Initialize: ScoringPhase');
        // scores are compaired and winner is chosen
        playerTotal = cards.check_cardTotal('player');

        console.log(playerTotal);
        console.log(dealerTotal);

        if (playerTotal === 21 && cardObj.position.player.length === 2 && playerTotal > dealerTotal) {
          const winValue = board.winOrLose(2.5);
          board.board_message(`Blackjack! Win $${winValue}`);
        }
        // Player Lose
        else if (
          playerTotal > 21 ||
          dealerTotal <= 21 && playerTotal <= 21 && playerTotal < dealerTotal
        ) {
          board.board_message('Dealer Wins!');
          board.winOrLose(0);
        }
        // Player Draw
        else if (playerTotal === dealerTotal) {
          board.board_message('Draw!');
          board.winOrLose(1);
        }
        // Player Win
        else if (
          dealerTotal > 21 ||
          dealerTotal <= 21 && playerTotal <= 21 && playerTotal > dealerTotal
        ) {
          const winValue = board.winOrLose(2);
          board.board_message(`Win $${winValue}`);
        }

        board.boardUpdate_all();
        cards.phaseSwitcher('NewRoundPhase');
      }


      else if (phase === 'NewRoundPhase') {
        console.log('Initialize: NewRoundPhase');

        // Remove previous cards and scores
        playerTotal = 0;
        dealerTotal = 0;
        cardObj.position.player = [];
        cardObj.position.dealer = [];
        element_playerCards.innerHTML = '';
        element_dealerCards.innerHTML = '';
        element_playerCardTotal.innerHTML = '';
        element_dealerCardTotal.innerHTML = '';


        // check if deck needs to be shuffled
        if (cardObj.position.deck.length < 180) {
          board.board_message(`Shuffling..`);
          cards.phaseSwitcher('PlaceYourBetsPhase');
          return;
        }

        const [playerScore, playerBetTotal] = board.bet_info();
        console.log(playerScore, playerBetTotal);
        // Remove previous bet if can't cover
        if (playerBetTotal > playerScore) {
          board.bet_clear();
        }
          // if can't cover, start with nothing
        cards.phaseSwitcher('PlaceYourBetsPhase');

      }


      else if (phase === 'ShufflePhase') {
        console.log('Initialize: ShufflePhase');
        // if not enough cards in deck, shuffle full deck
        cardObj = {};
        cards.createDeck();
        cards.blackJackizer();
        cards.shuffle();
        cards.phaseSwitcher('NewRoundPhase');
      }
    }
  });
})();
