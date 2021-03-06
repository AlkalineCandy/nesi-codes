/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



document.addEventListener('DOMContentLoaded', function (event) {

    // 1.) INITIAL VARIABLES

    let cards = Array.from(document.getElementsByClassName('card'));
    let deck = document.querySelector('.deck');
    let openCards = [];
    let matchedCards = [];
    let counter = 0;

    let min = document.getElementById('min');
    let sec = document.getElementById('sec');
    let secCount = 0;
    let minCount = 0;


    // 2.) SETTING UP the cards for the game

    let shuffledCards = shuffle(cards);
    setCards();


    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };


    function setCards() {

        for (let i = 0; i < shuffledCards.length; i++) {
            deck.appendChild(shuffledCards[i]);
        }

    };



    // 3.) LET'S PLAY: this goes down upon clicking a card

    function playFunc(event) {

        if (openCards.length < 2) {
            showCard(event);
            addToOpenCards(event);
        }

        if (openCards.length === 2) {
            // if a card is clicked twice, this flips it back without timed delay
            if (openCards[0].isSameNode(openCards[1])) {
                openCards[0].classList.remove('open', 'show');
                removeFromArray(openCards, 2);

                // compares cards to see if they match 
            } else if (openCards[0].firstElementChild.isEqualNode(openCards[1].firstElementChild)) {
                lockMatch();
                removeFromArray(openCards, 2);
            } else {
                flipBack(event);
                removeFromArray(openCards, 2);
            }
        }
    }

    // 3.a.) playFunc FUNCTIONS (invoked upon clicking a card)


    function showCard(event) {
        return event.target.classList.add('open', 'show');
    };


    function addToOpenCards(event) {
        return openCards.push(event.target);
    };


    function lockMatch(event) {
        for (openCard of openCards) {
            debugger
            openCard.classList.add('match');
            openCard.removeEventListener('click', playFunc);
            matchedCards.push(openCard); 
        }
    };

    function flipBack(event) {

        // adds an invisible layer so that no further cards can be clicked while the timeout goes down
        document.body.classList.add('no-click');

        // sets the time after which incorrect cards will be flipped back
        window.setTimeout(function () {

            cards.forEach(card => {
                card.classList.remove('open', 'show');
                document.body.classList.remove('no-click');
            })
        }, 1000);
    };

    // removes given amount of items from an array
    function removeFromArray(arr, item) {
        for (let i = 0; i < item; i++) {
            arr.pop();
        }
    };

    function counterFunc(event) {
        counter += 1;
        return document.querySelector('.moves').innerHTML = counter;

    };

    // 3.b.) CLICK HANDLER: event listener that makes cards clickable 

    function clickEvent() {
        cards.forEach(card => {
            card.addEventListener('click', playFunc);
        })
    };

    clickEvent();

    // 4.) WIN SCENARIO 

   // 4.a.) Popup variables 

let popup = document.querySelector('.popupwrap');
let btn = document.getElementById('myBtn'); //delete
let close = document.querySelector('.popupclose');
let finalScore = document.querySelector('.score'); 
let eval = document.querySelector('.evaluation'); 

btn.onclick = function() {
    popup.style.display = "block";
  finalScore.innerHTML = 'Your final score is counter.';
  
}



// Close window by cicking on x
close.addEventListener('click,', function(event) {
    popup.style.display = "none";
}); 


// Close window by clicking outside of it 





    // 5.) TIMER 

    // adds zeroes to time display
    function addZero(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    };


    function timer() {
        window.setInterval(function () {
            secCount += 1;
            sec.innerHTML = addZero(secCount);
            if (secCount === 10) {
                minCount += 1;
                min.innerHTML = addZero(minCount);
                secCount = 0;
                sec.innerHTML = addZero(secCount);
            }

        }, 1000)
        window.removeEventListener('click', timer);
    };

    window.addEventListener('click', timer);


}); // closes the DOMContentLoaded event listener 



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */