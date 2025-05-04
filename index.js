const buttons = document.querySelectorAll(".input-button");
let userScore = 0, computerScore = 0;
const userScoreNode = document.getElementById("user-score-value");
const computerScoreNode = document.getElementById("computer-score-value");
let restartButton = document.getElementById("restart");

restartButton.addEventListener("click", () => {
    userScore = 0;
    computerScore = 0;
    userScoreNode.textContent = userScore;
    computerScoreNode.textContent = computerScore;
    const userImageChoice = document.getElementById("user-choice").children[0];
    const computerImageChoice = document.getElementById("computer-choice").children[0];
    userImageChoice.src = "./images/default.png";
    userImageChoice.alt = "default";
    computerImageChoice.src = "./images/default.png";
    computerImageChoice.alt = "default";
})
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const input = button.getAttribute("id");
        if (input.trim() !== "") {
            play(input);
        }
    });
});

function play(userOption) {
    const computerOption = getComputerOption();
    const result = getGameResult(userOption, computerOption);
    updateGameDisplay(userOption, computerOption, result);
    endGame();
}

const options = ["rock", "paper", "scissors"];
function getComputerOption() {
    return options[Math.floor(Math.random() * options.length)];
}

function getGameResult(userOption, computerOption) {
    if (userOption === computerOption) {
        return 0;
    } else if (
        (userOption === "rock" && computerOption === "scissors") ||
        (userOption === "paper" && computerOption === "rock") ||
        (userOption === "scissors" && computerOption === "paper")
    ) {
        return 1;
    } else {
        return -1;
    }
}

function updateGameDisplay(userOption, computerOption, result) {
    const userImageChoice = document.getElementById("user-choice").children[0];
    const computerImageChoice = document.getElementById("computer-choice").children[0];
    userImageChoice.src = `./images/${userOption}.png`;
    userImageChoice.alt = userOption;
    computerImageChoice.src = `./images/${computerOption}.png`;
    computerImageChoice.alt = computerOption;
    const resultBanner = document.querySelector(".result-banner");
    if (result === 0) {
        resultBanner.textContent = "It's a tie!";
    } else if (result === 1) {
        resultBanner.textContent = "You win!";
        userScore++;
        userScoreNode.textContent = userScore;
    } else {
        resultBanner.textContent = "You lose!";
        computerScore++;
        computerScoreNode.textContent = computerScore;
    }
}

function endGame() {
    if (userScore >= 5 || computerScore >= 5) {
        const gameOverModal = document.getElementById("game-over-modal");
        const gameOverMessage = document.getElementById("game-over-message");
        if (userScore === 5) {
            gameOverMessage.textContent = "Congratulations, you won the game!";
        } else {
            gameOverMessage.textContent = "Sorry, you lost the game.";
        }
        gameOverModal.style.display = "block";
        userScore = 0;
        computerScore = 0;
        const playAgainButton = document.getElementById("play-again-button");
        playAgainButton.addEventListener("click", () => {
            gameOverModal.style.display = "none";

            userScoreNode.textContent = userScore;
            computerScoreNode.textContent = computerScore;
        });
    }
}