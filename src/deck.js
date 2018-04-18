const cards = (function() {

  const cardObj = {
    info: [],
    position: {
      deck: [],
      player: [],
      dealer: []
    }
  };

  let targetCards = [];

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

      console.log(cardObj.info[cardObj.position.deck.shift()]);
      // console.log(cardObj.position.deck.shift());

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
      targetCards = cards.check_targetCards(target);
      let totalValue = targetCards.reduce((total, current) => total + current.value, 0);

      if (totalValue > 21) {
        console.log('Potential Bust: Checking for Ace');
        targetCards.forEach(card => {
          if (card.name === 'a') {
            console.log('ACE OF BASE');
            console.log(card);
          }
        });
      }
      return totalValue;
    },






      // Game Phase Function
      phaseSwitcher: function (phase) {
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
        btn.state('disable', btn_deal); // Remove deal button
        // button_deal.classList.add('disabled');

        // Cards
        cards.deal_initial();


        cards.phaseSwitcher('MainDecisionPhase');


      }


      else if (phase === 'MainDecisionPhase') {
        console.log('Initialize: MainDecisionPhase');

        let playerTotal = cards.check_cardTotal('player');
        let dealerTotal = cards.check_cardTotal('dealer');

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
        btn.state('enable', btn_hit, btn_stand, btn_double);
        // btn_hit.classList.remove('disabled');
        // btn_stand.classList.remove('disabled');
        // btn_double.classList.remove('disabled');
        if (cardObj.position.player[0].name === cardObj.position.player[1].name) {
          btn.state('enable', btn_split);
          // button_split.classList.remove('disabled');
        }
        if (cardObj.position.dealer[1].name === 'a') {
          btn.state('enable', btn_insure);
          // button_insure.classList.remove('disabled');
        }
      }


      else if (phase === 'DealerPlayPhase') {
        console.log('Initialize: DealerPlayPhase');
        // Remove buttons
        btn.state('disable', btn_hit, btn_stand, btn_double, btn_split, btn_insure);
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
  });
})();
