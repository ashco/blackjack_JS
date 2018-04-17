//INITIAL DECK CREATION
const cards = {
  info: [],
  position: {
    deck: [],
    player: [],
    dealer: []
  }
};

//generates card object attributess
function Card (id, value, name, suit, color) {
  this.id = id;
  this.value = value;
  this.name = name;
  this.suit = suit;
  this.color = color;
}

//generates card deck list
function createDeck () {
  this.names = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
  this.suits = ['hearts', 'diamonds', 'spades', 'clubs'];
  this.color = ['black', 'red'];
  for (let i = 0; i < 4; i++) {
    for (let s = 0; s < this.suits.length; s++) {
      for (let n = 0; n < this.names.length; n++) {
        if (s > 1) {
          cards.info.push(new Card(((i + 1) * (s + 1) * (n + 1) - 1), n + 1, this.names[n], this.suits[s], this.color[0]));
        }
        else {
          cards.info.push(new Card(((i + 1) * (s + 1) * (n + 1) - 1), n + 1, this.names[n], this.suits[s], this.color[1]));
        }
      }
    }
  }
  return cards;
}

//creates card order array
function shuffle () {
  const deckSize = 52 * 4;

  for (let i = 0; i < deckSize; i++) {
    const cardSelect = Math.floor(Math.random() * deckSize);
    cards.position.deck.includes(cardSelect) ? i -- : cards.position.deck.push(cardSelect);
  }

  console.log('Cards Shuffled');
}