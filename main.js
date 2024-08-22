const tiles = Array.from(document.querySelectorAll("#tile"))
const nextPlayerIndicator = document.getElementById("next-player-indicator")
const winnerAnnouncer = document.getElementById("announce-winner")

let board = ["", "", "", "", "", "", "", "", ""]
let isGameActive = true
let currentPlayer = "X"
const PLAYER_X = "X"
const PLAYER_O = "O"
let winningCoordinates = []

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const trackGameBoard = index => {
    board[index] = currentPlayer
}

function handleGame() {
    let isRoundWon = false
    for (let i = 0; i <= winningConditions.length; i++) {
        const subArr = winningConditions[i]
        const x = board[subArr[0]]
        const y = board[subArr[1]]
        const z = board[subArr[2]]

        if (x === "" || y === "" || z === "") continue
        if (x === y && y === z) {
            isRoundWon = true
            winningCoordinates.push(subArr)
            break
        }
    }

    if (!!isRoundWon) {
        isGameActive = false
        winnerAnnouncer.innerHTML = `Player ${currentPlayer} won`

        //highlight winning tiles
        tiles.forEach((tile, idx) => {
            const hasWonConditions = winningCoordinates.flat()
            if (hasWonConditions.includes(idx)) {
                tile.classList.add("hasWon")
            }
        })
    }
    if (!board.includes("") && !isRoundWon) {
        alert("TIE")
        isGameActive = false
        winnerAnnouncer.innerHTML = `HMMM!!! It's a TIE`
    }
}

function isTilesValid(index) {
    if (board[index] === "X" || board[index] === "O") {
        return false
    }
    return true
}

const switchToNextPlayer = tile => {
    //remove previous class
    tile.classList.remove(`player${currentPlayer}`)
    nextPlayerIndicator.classList.remove(`playerO`)
    nextPlayerIndicator.classList.remove(`playerX`)

    currentPlayer = currentPlayer === "X" ? "O" : "X"
    if (currentPlayer === "X") {
        nextPlayerIndicator.innerHTML = "O"
        nextPlayerIndicator.classList.add(`playerO`)
    }
    else {
        nextPlayerIndicator.innerHTML = "X"
        nextPlayerIndicator.classList.add(`playerX`)
    }
    tile.innerHTML = currentPlayer
    //add current class
    tile.classList.add(`player${currentPlayer}`)
}

const userAction = (tile, index) => {
    if (isGameActive && isTilesValid(index)) {
        tile.innerHTML = currentPlayer
        tile.classList.add(`player${currentPlayer}`)
        switchToNextPlayer(tile)
        trackGameBoard(index)
        handleGame()
    }
}

document.getElementById("reset_game").addEventListener("click", resetGame)

function resetGame() {
    winningCoordinates = []
    winnerAnnouncer.innerHTML = ""
    board = Array(9).fill("")
    isGameActive = true
    tiles.forEach(tile => {
        tile.innerHTML = ""
        tile.classList.remove("hasWon")
    })
}

tiles.forEach((tile, idx) => tile.addEventListener("click", () => userAction(tile, idx)))