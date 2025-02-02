let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;
const startButton = document.getElementById("start-button");

const h2 = document.querySelector("h2");
const highScoreContainer = document.createElement("div");
highScoreContainer.id = "high-score-container";
highScoreContainer.innerHTML = `High Score: <span id="high-score">${highScore}</span>`;
document.body.appendChild(highScoreContainer);

// Start Game on Keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is Started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 100);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        updateHighScore();
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#1a1a2e";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

startButton.addEventListener("click", function () {
    if (!started) {
        console.log("Game is Started");
        started = true;
        startButton.style.display = "none"; // Hide the button
        levelUp();
    }
});

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startButton.style.display = "block";
}

function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        document.getElementById("high-score").innerText = highScore;
    }
}
