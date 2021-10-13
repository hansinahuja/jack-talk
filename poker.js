// Module containing all Poker Functions

// Command Dictionary
command = {
    'read_table_cards': readTableCards,
    'read_my_cards'   : readMyCards
};

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

// Function to raise bet
function raise(amount) {
    document.getElementsByClassName('raise')[0].click()
    if(amount == 'minimum') document.getElementsByClassName('default-bet-button')[0].click();
    else if(amount == 'half pot') document.getElementsByClassName('default-bet-button')[1].click();
    else if(amount == 'three-fourth pot') document.getElementsByClassName('default-bet-button')[2].click();
    else if(amount == 'pot') document.getElementsByClassName('default-bet-button')[3].click();
    else if(amount == 'all in') document.getElementsByClassName('default-bet-button')[4].click();
    else{
        
        // Need to fix
        document.getElementsByClassName('slider-control')[0].setAttribute('value', amount);
        document.getElementsByClassName("raise-bet-value")[0].getElementsByClassName('value')[0].setAttribute('value', amount);
        document.getElementsByClassName('slider-control')[0].value = amount;
        document.getElementsByClassName("raise-bet-value")[0].getElementsByClassName('value')[0].value = amount;

        if(document.getElementsByClassName("invalid").length > 0) return "Invalid betting amount";
    }
    document.getElementsByClassName("bet")[0].click();
    return "Amount bet"
}

// Function to fold
function fold(alert_response = null) {
    if (alert_response == null) {
        document.getElementsByClassName("fold")[0].click();
        var unnecessary_fold = (document.getElementsByClassName("alert-1-buttons")[0] != null);
        if (unnecessary_fold) {
            return "Are you sure that you want do an unnecessary fold?"
        }
    } else if (alert_response == true) {
        document.getElementsByClassName("button-1 middle-gray")[0].click()
        return "Folded"
    } else if (alert_response == false) {
        document.getElementsByClassName("button-1 red")[0].click()
        return "Fold cancelled"
    }
}
