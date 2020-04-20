import Card from "./card.js";

export default class DeckOfCards  {

    deckTexture;
    suits;
    values;

    constructor(_deckTexture) {
        this.deckTexture = _deckTexture;
        this.suits = ["hearts", "diamonds", "clubs","spades" ];
        this.values =  ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    }

    getDeck() {
        var deck = new Array();
        var j = 0;
        for(var i = 0; i < this.suits.length; i++)
        {
            for(var x = 0; x < this.values.length; x++)
            {
                
                var card = new Card(j, this.suits[i], this.values[x],  this.deckTexture);
                deck.push(card);
                j++;
            }
        }

        return deck;
    }

    getDeckTexture() {
        return this.deckTexture;
    }

  

    setDeckTexture(_deck, _deckTexture) {
        this.deckTexture = _deckTexture;
        _deck.forEach( card => {

            card.deckTexture = _deckTexture;
            
        });
    }

    shuffle(_deck) {

        for (var i = 0; i < 1000; i++) 
        {
            var location1 = Math.floor((Math.random()*_deck.length));
            var location2 = Math.floor((Math.random()*_deck.length));
            var tmp = _deck[location1];

            _deck[location1] = _deck[location2];
            _deck[location2] = tmp;
        }

        return _deck;
    }
    
}