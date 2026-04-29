// 1. Setup Data (Prioritizes questionBank from questions.js)
let deck = [...questionBank]; // Creates a copy of your 100 questions
let currentIndex = 0;
let hardQueue = [];

// 2. DOM Elements
const container = document.getElementById('cardContainer');
const qDisplay = document.getElementById('questionDisplay');
const aDisplay = document.getElementById('answerDisplay');
const progress = document.getElementById('progress');

// 3. Shuffle cards on load
function shuffleDeck(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
deck = shuffleDeck(deck);

// 4. Flip Card Event
container.addEventListener('click', () => {
    container.classList.toggle('is-flipped');
});

// 5. Update UI
function updateDisplay() {
    if (currentIndex < deck.length) {
        // Start on question side
        container.classList.remove('is-flipped');
        
        // Short timeout allows flip animation to finish before text changes
        setTimeout(() => {
            qDisplay.innerText = deck[currentIndex].q;
            aDisplay.innerText = deck[currentIndex].a;
            progress.innerText = `Card ${currentIndex + 1} / ${deck.length}`;
        }, 200);
    } else {
        handleEnd();
    }
}

// 6. Handle Buttons
window.nextCard = function(isHard) {
    if (isHard) {
        hardQueue.push(deck[currentIndex]);
    }
    currentIndex++;
    updateDisplay();
}

// 7. Re-queue Hard Cards
function handleEnd() {
    if (hardQueue.length > 0) {
        alert(`Session complete! Let's review the ${hardQueue.length} cards you're still learning.`);
        deck = [...hardQueue];
        hardQueue = [];
        currentIndex = 0;
        updateDisplay();
    } else {
        alert("Success! You've cleared the entire deck.");
        location.reload(); // Restarts the full deck
    }
}

// Start the app
updateDisplay();