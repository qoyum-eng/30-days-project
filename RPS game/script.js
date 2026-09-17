let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {

    const choices = ["rock", "paper", "scissors"];

    const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

    let result = "";

    if (playerChoice === computerChoice) {
        result = "It's a tie!";
    }
    else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You win!";
        playerScore++;
    }
    else {
        result = "Computer wins!";
        computerScore++;
    }

    document.getElementById("result").textContent =
        `You chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;

    document.getElementById("score").textContent =
        `You: ${playerScore} | Computer: ${computerScore}`;
}