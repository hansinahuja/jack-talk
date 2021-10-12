function readTableCards() {
    var face = {'1': 'one', '2':'two', '3':'three', '4':'four', '5':'five', '6':'six', '7': 'seven', '8': 'eight', '9':'nine', '10':'ten', 'J':'Jack', 'Q':'Queen', 'K':'King'}
    var suit = {'d':'Diamonds', 'c':'Clubs', 's':'Spades', 'h':'Hearts'}
    
    var cards = [].slice.call(
        document.getElementsByClassName("table-cards")[0].getElementsByClassName("card")
    ).map(x => {
        return (isNaN(x.children[0].innerText)?'the ':'') + face[x.children[0].innerText] + ' of ' + suit[x.children[2].innerText];
    });

    var prefix = 'The cards present on the board are '
    if (cards.length > 1)
        return prefix + cards.slice(0,-1).join(', ') + ' and ' + cards.slice(-1);
    else if (cards.length == 1)
        return prefix + cards[0];
    else
        return "The board is currently empty"
}