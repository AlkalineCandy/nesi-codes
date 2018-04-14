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
    let scoreStars = document.querySelector(".stars");

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
    }


    function setCards() {
        for (let i = 0; i < shuffledCards.length; i++) {
            deck.appendChild(shuffledCards[i]);
        }
    }

    // 3.) LET'S PLAY: this goes down upon clicking a card

    function playFunc(event) {

        if (openCards.length < 2) {
            showCard(event);
            addToOpenCards(event);
        }

        if (openCards.length === 2) {

            // if a card is clicked twice, this flips it back without timed delay
            if (event.currentTarget.isSameNode(openCards[0])) {
                openCards[0].classList.remove('open');
                removeFromArray(openCards, 2);
                counter -= 2;

                // compares cards to see if they match 
            } else if (openCards[0].firstElementChild.isEqualNode(openCards[1].firstElementChild)) {
                lockMatch();
                removeFromArray(openCards, 2);

                // non-matching cards
            } else {
                openCards[0].classList.add("no-match");
                openCards[1].classList.add("no-match");
                flipBack(event);
                removeFromArray(openCards, 2);
            }
        }

        moveCounter(event);
        starCounter();
    }

    // 3.a.) playFunc FUNCTIONS (invoked upon clicking a card)

    function showCard(event) {
        return event.target.classList.add('open');
    }

    function addToOpenCards(event) {
        return openCards.push(event.target);
    }

    function lockMatch(event) {
        for (let openCard of openCards) {
            openCard.classList.add('match');
            openCard.removeEventListener('click', playFunc);
            matchedCards.push(openCard);
        }
    }

    function flipBack(event) {
        // adds an invisible layer so that no further cards can be clicked while the timeout goes down
        document.body.classList.add('no-click');

        // sets the time after which incorrect cards will be flipped back
        window.setTimeout(function () {

            cards.forEach(card => {
                card.classList.remove('open', 'no-match');
                document.body.classList.remove('no-click');
            });
        }, 1000);
    }

    // removes given amount of items from an array
    function removeFromArray(arr, item) {
        for (let i = 0; i < item; i++) {
            arr.pop();
        }
    }

    function moveCounter(event) {
        counter += 1;
        document.querySelector('.moves').innerHTML = counter;
    }

    // 3.b.) CLICK HANDLER: event listener that makes cards clickable 

    function clickEvent() {
        cards.forEach(card => {
            card.addEventListener('click', playFunc);
        });
    }

    clickEvent();

    // 3.c.) SCORE PANEL STARS behavior

    function starCounter() {
        if (counter % 5 === 0) {
            scoreStars.firstElementChild.remove();
        } else {
            return false;
        }
    }

    // 4.) TIMER + invoking winScenario() 

    // adds zeroes to time display
    function addZero(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function timer() {
        let intervalID = window.setInterval(function () {

            if (matchedCards.length === 16) {
                winScenario(); // game ends here 
                window.clearInterval(intervalID);
                return event.stopPropagation();
            }

            secCount += 1;
            sec.innerHTML = addZero(secCount);
            if (secCount === 10) {
                minCount += 1;
                min.innerHTML = addZero(minCount);
                secCount = 0;
                sec.innerHTML = addZero(secCount);
            }
        }, 1000);
        window.removeEventListener('click', timer);
    }

    window.addEventListener('click', timer);

    // 5.) WIN SCENARIO - invoked in the timer()! 

    // Source of the (now altered) code: https://www.w3schools.com/howto/howto_css_modals.asp 

    let popup = document.querySelector('.popupwrap');
    let closebtn = document.querySelector('.popupclose');
    let finalScore = document.querySelector('.score');
    let evaluation = document.querySelector('.evaluation');

    function winScenario() {
        popup.style.display = "block";
        finalScore.innerHTML = `Your final score is ${counter}. 
        <br> Time spent playing: ${minCount} minutes, ${secCount} seconds.`;

        if (counter >= 18) {
            evaluation.innerHTML = "That's neat! Wanna try again?";
        } else if (counter < 18 && counter >= 10) {
            evaluation.innerHTML = "Good job! Wanna improve your score?";
        } else if (counter < 10) {
            evaluation.innerHTML = "Excellent work!";
        } else {
            evaluation.innerHTML = "Thanks for playing!";
        }
    }

    // Close window by cicking on x
    closebtn.addEventListener("click", function (event) {
        popup.style.display = "none";
    });

    // Close window by clicking outside of it 
    window.addEventListener("click", function (event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    });

    // Close window by pressing Esc 
    window.addEventListener("keyup", function (event) {
        if (event.key === "Escape") {
            popup.style.display = "none";
        }
    });

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