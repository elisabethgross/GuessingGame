$(document).ready(function() {

	// Generate the Winning Number
	var generateWinningNumber = function(){
		return Math.floor(Math.random() * (100 - 1 + 1)) + 1;	
	}
	var winningNumber = generateWinningNumber()	
	console.log(winningNumber)	
	var guesses = []

// Check if the Player's Guess is the winning number 

	function checkGuess(){
		for(var i = 0; i < guesses.length; i++) {
			// console.log(guesses[i])
			if (guesses[i] === winningNumber) {
				$('#message').text('You Won!')
			}
		}

		guessMessage()
		
	}

// CHECK IF THE PLAYER ALREADY GUESSED THE NUMBER	
 	
	function playersGuessSubmission(){
		var playersGuess = parseInt($('input').val())
		if (guesses.indexOf(playersGuess) > -1) {
			$('#message').text('You guessed that already! Try again')
		} else {
			$('#message').text('Try again')
			guesses.push(playersGuess)	
		}		
		// console.log(guesses)
		$('input').val("")
		return playersGuess
	}

	// Determine if the next guess should be a lower or higher number

	function lowerOrHigher(){
		if (winningNumber - guesses[guesses.length-1] > 0) {
			return 'Your guess was too low. '
		} else if (winningNumber - guesses[guesses.length-1] < 0) {
			return 'Your guess was too high. ' 
		}

	}

	function guessMessage() {
		var direction = lowerOrHigher()
		var distance = function() {
			var numero1 = Math.abs(winningNumber - guesses[guesses.length-1])
			var numero2 = Math.ceil(numero1 / 10) * 10
			return "You were within " + numero2 + " of the correct number"
		}
		return $('#more').text(direction + distance() )
	}

	function totalGuesses() {
		
		var numLeft = $('#guesses').text()
		console.log(numLeft)
		if (numLeft > 1) {
			$('#guesses').text(10 - guesses.length)
		} else {
			$('#guesses').text('You ran out of guesses!')
		} 		
	}

	// Create a provide hint button that provides additional clues to the "Player"

	function provideHint(){
		// add code here
	}

	// Allow the "Player" to Play Again

	function playAgain(){
		location.reload(true)
	}


	/* **** Event Listeners/Handlers ****  */
	// Fetch the Players Guess
	$('.user-guess').click(submit)
	$('.hint').click(giveHint)
	$('.playagain').click(playAgain)
	document.addEventListener("keypress", function(e) {
		if (e.which === 13) {
			submit()
		}
	})

	// FUNCTIONS TO PLAY ON SUBMIT YOUR GUESS CLICK
 	function submit() {
 		playersGuessSubmission()
 		checkGuess()
 		totalGuesses()

 	}
 	function giveHint() {
 		var hints = []
 		var guessesLeft = $('#guesses').text()
 		// console.log(guessesLeft)
 		if (guessesLeft > 4) {
 			var i = 0
 			while (i < 3) {
 				hints.push(Math.floor(Math.random() * 100))
 				i++
 			}
 			hints.push(winningNumber)
 		}
 		
 		$('#more').text("One of these numbers is the winning number: " + hints.join(", "))
 		console.log(hints)
 	}


})
