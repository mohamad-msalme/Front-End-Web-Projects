
// this object display message and print hit or miss on the page
var view = 
	{
		// this method takes a string message and displays it
		// in the message display area
		displayMessage : function(msg)
		{
			var messageArea = document.getElementById('messageArea');
			messageArea.innerHTML = msg;
		},

		// this methode takes a location of ship 
		// and displayed hit in the correct location 
		displayHit : function(location)
		{
			var cell = document.getElementById(location);
			cell.setAttribute("class", "hit");
		},

		// this methode takes a location of ship 
		// and displayed Miss in the correct location
		displayMiss : function(location)
		{
			var cell = document.getElementById(location);
			cell.setAttribute("class", "miss");

		}

	};

var model =
 {
	boardSize: 7,  // size of the grid used for the board 
	numShips: 3,   // numbers of ships in the game  
	shipsSunk: 0,  // number of ships that have been sunk 
	shipLength: 3, // number of locations in each ship 

	ships: [
			 { locations: [0, 0, 0], hits: ["", "", ""] },
			 { locations: [0, 0, 0], hits: ["", "", ""] },
			 { locations: [0, 0, 0], hits: ["", "", ""] }
			],
	fire: function(guess) 
	{
		for (var i = 0; i < this.numShips; i++) 
		{
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			if (index >= 0) 
			{
				if(ship.hits[index] !== "hit")
				{
					ship.hits[index] = "hit";
					view.displayHit(guess);
					view.displayMessage("HIT!");
				}
				else view.displayMessage("you hit the location before");

				if (this.isSunk(ship))
			 	{
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
			 	}
				return true;
		    }
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},

	isSunk: function(ship)
	 {
		for (var i = 0; i < this.shipLength; i++)
		 {
			if (ship.hits[i] !== "hit") return false;			
		 }
		return true;
	},

	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}

};

var controller = 
	{

		guesses: 0,	
		processGuess: function(guess) {
		var location = parseGuess(guess);
		if(location)
		{
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips)
			 {
				view.displayMessage("You sank all my battleships, in " +
									this.guesses + " guesses");
			 }
		}
	}
};

function init()
{
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;
	model.generateShipLocations();
	
}

function parseGuess(guess)
 {

	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
	if (guess === null || guess.length !== 2)
	 {
		alert("Oops, please enter a letter and a number on the board.");
	 } 
	else 
	{
		firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		if (isNaN(row) || isNaN(column)) 
		{
			alert("Oops, that isn't on the board.");
		} 
		else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize)
		 {
			alert("Oops, that's off the board!");
		 } 
		 else
		  {
			return row + column;
		  }
	}
	return null;
}	

function handleFireButton()
{
	// get the player's guess from the form
	// and get it to the controller.
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value; 
	controller.processGuess(guess);
	guessInput.value = "";
}

function handleKeyPress(e)
{
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode === 13) { // user press enter 
		fireButton.click();
		return false;
		}

}

window.onload = init;