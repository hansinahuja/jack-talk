// Global dictionary for storing face value of cards
var face = {
    'A': 'Ace', '2':'Two', '3':'Three', '4':'Four', '5':'Five',
    '6': 'Six', '7': 'Seven', '8': 'Eight', '9':'Nine', '10':'Ten',
    'J':'Jack', 'Q':'Queen', 'K':'King'
}

// Global dictionary for storing suit
var suit = {'d':'Diamonds', 'c':'Clubs', 's':'Spades', 'h':'Hearts'}

function readTableCards() {
    var cards = [].slice.call(
        document.getElementsByClassName("table-cards")[0].getElementsByClassName("card")
    ).map(x => {
        return (isNaN(x.children[0].innerText)?'the ':'') + face[x.children[0].innerText] + ' of ' + suit[x.children[2].innerText];
    });

    if (cards.length > 1)
        return 'The cards present on the board are ' + cards.slice(0,-1).join(', ') + ' and ' + cards.slice(-1);
    else if (cards.length == 1)
        return 'The card present on the board is ' + cards[0];
    else
        return "The board is currently empty"
}

// Function to read cards in my hand
function readMyCards() {
    // Get my cards
    var cards = document.getElementsByClassName('you-player')[0];
    var card1 = cards.getElementsByClassName('card')[0],
        card2 = cards.getElementsByClassName('card')[1];

    // Convert each of my cards to string
    var card1String = face[card1.children[0].innerText] + ' of ' + suit[card1.children[1].innerText];
    var card2String = face[card2.children[0].innerText] + ' of ' + suit[card2.children[1].innerText];

    return 'Cards in hand are ' + card1String + ' and ' + card2String;
}