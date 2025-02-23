let score = 0;
let timer = 60;
let ramHitNum = 0;
let myInterval;

// Generate bubbles with random numbers
function makeBubbles() {
    let clutter = '';
    for (let i = 1; i <= 75; i++) {
        let rm = Math.floor(Math.random() * 10); // Random number 0-9
        clutter += `<div class="bubble">${rm}</div>`;
    }
    document.querySelector('#pannelBottom').innerHTML = clutter;
}

// Start countdown timer
function runTimer() {
    clearInterval(myInterval);
    myInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.querySelector('#innerTime').textContent = timer;
        } else {
            clearInterval(myInterval);
            gameOver(); // End game when time is up
        }
    }, 1000);
}

// Generate new target number
function getNewHit() {
    ramHitNum = Math.floor(Math.random() * 10);
    document.querySelector('#myHit').textContent = ramHitNum;
}

// Increase score by 10
function increaseScore() {
    score += 10;
    document.querySelector('#myScore').textContent = score;
}

// Show game over message
function gameOver() {
    document.querySelector('#pannelBottom').innerHTML = `
        <div id="gameOver">
            <h1>Game Over! Your Score: ${score}</h1>
            <button id="restartBtn">Restart Game</button>
        </div>
    `;
    document.querySelector('#restartBtn').addEventListener('click', restartGame);
}

// Restart game
function restartGame() {
    score = 0;
    timer = 60;
    document.querySelector('#myScore').textContent = score;
    document.querySelector('#innerTime').textContent = timer;
    getNewHit();
    makeBubbles();
    runTimer();
}

// Handle bubble click
document.querySelector('#pannelBottom').addEventListener('click', function (event) {
    if (event.target.classList.contains('bubble')) {
        let clickedNumber = Number(event.target.textContent);
        if (clickedNumber === ramHitNum) {
            increaseScore(); // Update score if correct bubble clicked
            makeBubbles();
            getNewHit();
        }
    }
});

// Start game on page load
function startGame() {
    score = 0;
    timer = 60;
    document.querySelector('#myScore').textContent = score;
    document.querySelector('#innerTime').textContent = timer;
    getNewHit();
    makeBubbles();
    runTimer();
}

startGame(); // Initialize game
