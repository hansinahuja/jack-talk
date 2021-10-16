// Module containing all Poker Functions

// Command Dictionary
command = {
    'All-In'     : all_in,
    'Bet-X'      : raise,
    'Pot-Bet'    : pot_bet,
    'Min-Bet'    : min_bet,
    'Call'       : call,
    'Check'      : check,
    'Fold'       : fold,
    'My-Balance' : myBalance,
    'Table-Cards': readTableCards,
    'My-Cards'   : readMyCards,
    'My-Options' : read_all,
    'None'       : undefined
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
    if(document.getElementsByClassName('raise')[0] == undefined) {
        speak("That is not a valid action right now. Please try again.");
        return;
    }
    document.getElementsByClassName('raise')[0].click()
    if(amount == 'minimum') document.getElementsByClassName('default-bet-button')[0].click();
    else if(amount == 'half pot') document.getElementsByClassName('default-bet-button')[1].click();
    else if(amount == 'three-fourth pot') document.getElementsByClassName('default-bet-button')[2].click();
    else if(amount == 'pot') document.getElementsByClassName('default-bet-button')[3].click();
    else if(amount == 'all in') document.getElementsByClassName('default-bet-button')[4].click();
    else{

        if(isNaN(amount.replace(/,/g, ''))){
            document.getElementsByClassName('back')[0].click();
            speak("Please say that again, I couldn't catch a number in your bet");
            return;
        }

        let maximum = parseInt(document.getElementsByClassName('slider-control')[0].max);
        document.getElementsByClassName('default-bet-button')[0].click();
        let minimum = parseInt(document.getElementsByClassName('slider-control')[0].value);
        let to_bet = parseInt(amount.replace(/,/g, ''));
        if(to_bet < minimum || to_bet > maximum) {
            speak("Please keep your bet between " + minimum.toString() + " and " + maximum.toString());
            return;
        }

        var current = parseInt(document.getElementsByClassName('slider-control')[0].value);

        if(current >= to_bet){
            var button = document.getElementsByClassName("decrease")[0];
            while(current >= to_bet){
                button.click();
                current = parseInt(document.getElementsByClassName('slider-control')[0].value);
            }
        }
        else{
            var button = document.getElementsByClassName("increase")[0];
            while(current < to_bet){
                button.click();
                current = parseInt(document.getElementsByClassName('slider-control')[0].value);
            }
        }


        if(document.getElementsByClassName("invalid").length > 0){
            document.getElementsByClassName('back')[0].click();
            speak("Invalid betting amount");
            return
        }
    }
    document.getElementsByClassName("bet")[0].click();
    speak("Amount bet");
    return;
}

// Sub Functions for raise
function all_in() {
    raise('all in');
}

function pot_bet() {
    raise('pot');
}

function min_bet() {
    raise('minimum');
}

// Function to check your turn
function your_turn() {
    return (document.getElementsByClassName("action-signal")[0] != null)
}

// Function to fold
function fold() {
    if(!your_turn()) {
        speak("Its not your turn right now");
        return;
    }
    document.getElementsByClassName("fold")[0].click();
    var unnecessary_fold = (document.getElementsByClassName("alert-1-buttons")[0] != null);
    if (unnecessary_fold) {
        speak("Are you sure that you want do an unnecessary fold?");
        listen(response => {
            if (response.toLowerCase().includes("yes")) {
                document.getElementsByClassName("button-1 middle-gray")[0].click();
                speak("Folded");
            } else {
                document.getElementsByClassName("button-1 red")[0].click();
                speak("Fold cancelled");
            }
        }, err => {
            document.getElementsByClassName("button-1 red")[0].click();
            speak("Could not get that. Fold cancelled");
        });
        return;
    }
    speak("Folded");
    return;
}

// Function to call, it will handle the cases where "Bet x" is listed too! 
function call() {
    if(document.getElementsByClassName('call')[0] == undefined) {
        speak("That is not a valid action right now. Please try again.");
        return;
    }
    document.getElementsByClassName('call')[0].click()
    speak("Called successfully")
}

// Function to check
function check() {
    if(document.getElementsByClassName('check')[0] == undefined) {
        speak("That is not a valid action right now. Please try again.");
        return;
    }
    document.getElementsByClassName('check')[0].click()
    speak("Checked successfully")
}

// Function to get one's balance amount
function myBalance(){
    var youPlayer = document.getElementsByClassName('you-player')[0];
    var youStack = youPlayer.getElementsByClassName('table-player-infos-ctn')[0].getElementsByClassName('table-player-stack')[0]
    var value = youStack.getElementsByTagName('span')[1].innerHTML; 
    speak("Your current balance is " + value.toString());
    return value;
}

// Function to read all possible options {"Bet x" is call, Bet is raise}
function read_all() {
    var available = []
    if(document.getElementsByClassName('check')[0] != undefined){
        if(document.getElementsByClassName("button-1 with-tip check green ")[0].disabled != true){
            available.push(document.getElementsByClassName("button-1 with-tip check green ")[0].innerHTML);
        } 
    }
    
    if(document.getElementsByClassName('call')[0] != undefined) {
        if(document.getElementsByClassName('button-1 call with-tip call green ')[0].disabled != true){
            available.push(document.getElementsByClassName('button-1 call with-tip call green ')[0].innerHTML);
        }
    }

    if(document.getElementsByClassName('fold')[0] != undefined){
        if(document.getElementsByClassName('button-1 with-tip fold red ')[0].disabled != true){
            available.push(document.getElementsByClassName('button-1 with-tip fold red ')[0].innerHTML);
        }
    }

    if(document.getElementsByClassName('raise')[0] != undefined){
        if(document.getElementsByClassName('button-1 with-tip raise green')[0].disabled != true){
            available.push(document.getElementsByClassName('button-1 with-tip raise green')[0].innerHTML);
        }
    }

    if(available.length == 0) {
        speak("You don't have any available option at this moment.");
    } else {
        var x = "Your available options are " + available.join() + ".";
        speak(x);
    }
}
