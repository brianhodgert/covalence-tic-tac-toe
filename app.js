let gameFinished = false
let gameCount = 0
const playsX = { created: false }
const playsO = {}
const gameBoard = document.querySelector('.board')
const squares = document.querySelectorAll('.row > div')
const banner = document.querySelector('#banner h1')
const submit = document.querySelectorAll('.submit-name')
const newGame = document.querySelector("#btnNewGame")

submit.forEach((el) => {
	el.addEventListener('click', (e) => {
		assignPlayer(e.target.id)
	})
})



// Create player after submit is pressed. First one to click submit is X second to click submit is O
const assignPlayer = (pl) => {
	const selected = document.querySelector(`[pl=${pl}] input`)
	if (selected.value.length === 0) {
		banner.innerText = "you must enter a name in the input box"
	} else {
		if (!playsX.created) {
			playsX.playerName = selected.value
			playsX.created = true
			playsX.turn = true
			banner.innerText = 'Waiting for other player to submit'
			document.querySelector(`#${pl}`).style.display = "none"
		} else {
			playsO.playerName = selected.value
			banner.innerText = `${playsX.playerName} goes first`
			document.querySelector(`#${pl}`).style.display = "none"
			startGame()
		}
	}
}
// Banner texts
const bannerNextPlayer = () => { if (playsX.turn) { banner.innerText = `${playsX.playerName}'s turn`} else { banner.innerText = `${playsO.playerName}'s turn` }}
const loserPlaysFirst = () => { if (playsX.turn) { banner.innerText = `Loser plays first. ${playsX.playerName}'s turn`} else { banner.innerText = `Loser plays first. ${playsO.playerName}'s turn` }}
const winner = () => { if (playsX.turn) { banner.innerText = `${playsX.playerName} Wins!`} else { banner.innerText = `${playsO.playerName} Wins` }}

// add eventlisteners to all the squares on the board and make the board visible to begin play
const startGame = () => {
	gameFinished = false
	gameCount = 0
	resetSquares()
	gameBoard.style.visibility = 'visible'
}

const resetSquares = ()  => {
	squares.forEach((square) => {
		square.addEventListener('click', squareClick)
		square.setAttribute('status', 'empty')
		square.innerText = '' 
	})
}

// Determine who's turn it is and add either and X or an O
const squareClick = (e) => {
	e.target.removeEventListener('click', squareClick)
	if (playsX.turn) {
		e.target.innerText = 'X'
		e.target.setAttribute('status', 'X')
	} else {
		e.target.innerText = 'O'
		e.target.setAttribute('status', 'O')
	}
	gameCount++
	checkBoard()
	checkDraw()
	playsX.turn = ! playsX.turn
	if (!gameFinished) {
		updateBanner(bannerNextPlayer) 
	} 
}

//Update the banner to show who's turn it is.
const updateBanner = (banner) => {
	banner()
}

// check for winner and set game over if it is. display reset button if game over
const lines = ['.row1','.row2','.row3','.col1','.col2','.col3','.cross1','.cross2']
const checkBoard = () => {
	lines.forEach((line) => {
		let boxes = getLineArray(line)
		if (boxes.length === 3){
			checkWinner(boxes)
		}
	})
}

// checks for any empty boxes in the line and returns false
const getLineArray = (line) => {
	var lineArray = []
	boxes = document.querySelectorAll(line)
	boxes.forEach((box) => {
		if (box.getAttribute('status')==='empty'){
			return lineArray
		} else {
			lineArray.push(box.getAttribute('status'))
		}
	})
	return lineArray
}

const checkWinner = (boxes) =>{
	if ((boxes[0] === boxes[1]) && (boxes[0] === boxes[2])){
		updateBanner(winner)
		gameOver()
	} 
}

const checkDraw = () => {
	if (gameCount === 9) {
		banner.innerText = "It's a draw"
		gameOver()
	} 
}

const gameOver = () => {
	gameFinished = true
	squares.forEach((square) => {
		square.removeEventListener('click', squareClick)
	})
	console.log('Game Over')
	console.log(banner.innerText)
	newGame.style.visibility = "visible"
}


newGame.addEventListener("click", startGame)