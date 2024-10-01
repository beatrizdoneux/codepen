// Pages
const startPage = document.getElementById("start-page");
const gamePage = document.getElementById("game-page");

// Start page text and icons
const titleIcons = Array.from(document.querySelectorAll("#start-page i"));
const fireTitle = document.getElementById("fire-title");
const waterTitle = document.getElementById("water-title");
const grassTitle = document.getElementById("grass-title");

// Start page buttons
const startBtn = document.getElementById("start");
const playBtn = document.getElementById("play");

// Start button event listener -> changes text and shows the play button
startBtn.addEventListener("click", () => {

    fireTitle.innerText = "FIRE"
    waterTitle.innerText = "WATER"
    grassTitle.innerText = "GRASS"
    titleIcons.forEach((icon) => {
        icon.classList.toggle("hide-icon")
    })

	toggleHideClass(startBtn);
	toggleHideClass(playBtn);
});

// Play button event listener -> hides start page and shows the game page
playBtn.addEventListener("click", () => {
    toggleHideClass(startPage);
    toggleHideClass(gamePage);
})

// Game page elements
const buttons = Array.from(document.querySelectorAll("#player button"));
const computerDisplay = document.getElementById("computer");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");

// Game logic function calls

let userScore = 0;
let computerScore = 0;

buttons.forEach((button) => {

	button.addEventListener("click", () => {

        buttons.forEach((btn) => {
            btn.classList.remove("active");
        })

		const userOption = button.getAttribute("id");
		const computerOption = getComputerOption();

		const userWins = checkIfUserWins(userOption, computerOption);

		updateScores(userOption, computerOption, userWins);
		updateDisplay(userOption, computerOption, userWins);

        button.classList.toggle("active")
	});
});

//Function definitions

function toggleHideClass(page) {
	page.classList.toggle("hide");
}

function getComputerOption() {
	const randomIndex = getRandomInt(buttons.length);
	const computerOption = buttons[randomIndex].getAttribute("id");
	computerDisplay.innerHTML = buttons[randomIndex].innerHTML;
    computerDisplay.className = "";
    computerDisplay.classList.add("option", "element");
    computerDisplay.classList.add(computerOption);
	return computerOption;
}

function updateScores(userOption, computerOption, userWins) {
	if (userOption === computerOption) {
		// It's a draw, no score update
		return;
	}
	userWins ? userScore++ : computerScore++;
}

function updateDisplay(userOption, computerOption, userWins) {
	result.innerText = `You: ${userScore} vs Computer: ${computerScore}`;

	let message =
		userOption === computerOption
			? "It's a draw!"
			: userWins
			? "You win!"
			: "Computer wins this one...";

	resultTitle.innerText = message;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function checkIfUserWins(user, computer) {
	const winConditions = {
		fire: "grass",
		water: "fire",
		grass: "water"
	};
	return winConditions[user] === computer;
}
