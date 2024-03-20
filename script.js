//array of choices for the users
const choices = ["S", "P", "R"];

//initializing stats object to keep track and update later
const stats = {
  user: {
    win: 0,
    lose: 0,
    tie: 0,
  },
  computer: {
    win: 0,
    lose: 0,
    tie: 0,
  },
};

//tracking and updating the stats, based on the results
function updateStats(result) {
  if (result.includes("You Win")) {
    stats.user.win++;
  } else if (result.includes("You Lose")) {
    stats.computer.win++;
  } else {
    stats.user.tie++;
    stats.computer.tie++;
  }
}

// simply alerts the stats in the browser
function displayStats(player) {
  let output = "";
  output = `
  Here are your stats ${player}:

  ${player}:
  Win: ${stats.user.win}
  Lose: ${stats.user.lose}
  Tie: ${stats.user.tie}

  Computer:
  Win: ${stats.computer.win}
  Lose: ${stats.computer.lose}
  Tie: ${stats.computer.tie}

  Thank you for playing, Hope to see you soon!!
  `;

  alert(output);
}

//this function calculates the result and returns the results
function calculateResult(userInput, computerInput) {
  let result;

  switch (userInput) {
    case "R":
      result =
        computerInput === "P"
          ? "Paper beats Rock, You Lose \u{1F61E}"
          : computerInput === "S"
          ? "Rock beats Scissors, You Win \u{1F60A}"
          : "Its a tie  \u{1F91D}";
      break;
    case "P":
      result =
        computerInput === "R"
          ? "Paper beats Rock, You Win \u{1F60A}"
          : computerInput === "S"
          ? "Scissors beats Paper, You Lose \u{1F61E}"
          : "Its a tie \u{1F91D}";
      break;
    case "S":
      result =
        computerInput === "P"
          ? "Scissor beats Paper, You Win \u{1F60A}"
          : computerInput === "R"
          ? "Rock beats Scissors, You Lose \u{1F61E}"
          : "Its a tie \u{1F91D}";
      break;
    default:
      result = "Invalid input";
  }

  //this function keeps track of the state for both user and computer
  updateStats(result);

  //returning the result
  return result;
}

//this function generates random input using the choices array
function getComputerInput() {
  let randomIndex = Math.floor(Math.random() * choices.length);
  let randomChoice = choices[randomIndex];
  return randomChoice;
}

//simple function to display message in the DOM
function displayMessageToTheDOM(message) {
  const body = document.querySelector("body");
  const h1 = document.createElement("h1");
  h1.textContent = message;
  body.appendChild(h1);
}

function playRound(player) {
  let userInput;

  // we created a while loop in user fails to provide valid input
  while (true) {
    //asking for valid input from the user
    userInput = prompt(`Hey ${player}, Please Enter either "R","S" or "P"`);
    if (
      userInput !== null &&
      userInput !== "" &&
      userInput !== " " &&
      isNaN(userInput) &&
      choices.includes(userInput)
    ) {
      // if the user provides valid input, we create a random computer input
      let computerInput = getComputerInput();

      //we call this function we calculate the result
      let result = calculateResult(userInput.toUpperCase(), computerInput);

      // alerting bunch of messages for user interactions
      alert(
        `${player}, you choose ${userInput}, now lets see what computer picks \u{231B}`
      );

      alert(
        `The computer picks ${computerInput}, so the winner is.... \u{1F941}`
      );

      alert(`${result}`);

      //we break the loop after the winner is declared, and give the control to the if statement outside while loop
      break;
    } else {
      //if user provides invalid input, it goes back to the loop for a valid input ask
      alert(`Please enter a valid input, Try "R", "S" or "P"`);
      //keeps the loop running
      continue;
    }
  }

  //ask the user if they want to play again
  if (confirm("Wanna play again \u{1F609}")) {
    //if user says yes, we call the playround function again in loop until the user decides to exit
    playRound(player);
  } else {
    //if the user decides not to play again, we display the stats by calling displayStats function
    displayStats(player);
  }
}

// ---------------Starting the game here-----------------------------------
function startGame() {
  //initial welcome message, if user cancels we just display a message in DOM
  if (!confirm("Welcome to Paper,Scissor and Rock game, shall we start??")) {
    displayMessageToTheDOM("Sorry to see you go , Bye!! , Refresh to Play!");
  } else {
    //this block of code is executed if user decides to play
    let playerName;
    //asking for username
    playerName = prompt("Okay Lets go!! What is your good name??");
    //if simply exit the loop if there is no username, ot its null or its just a space
    if (playerName === null || playerName === "" || playerName === " ") {
      return;
    } else {
      //if we have an input
      playerName.trim(); // this trims the white spaces from the beginning and the end of the string
      playRound(playerName); // calling this function to play as a round basis along with the name
      //if the user doesnt wanna play again, it just shows a simple message in the DOM
      displayMessageToTheDOM(
        "Thank you for playing!! , Refresh the page to play again"
      );
    }
  }
}

//calling this function to create a loop like execution
startGame();
