let playerText = document.getElementById('playerText')
let restartButton = document.getElementById('restartButton')
let boxes = Array.from( document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = 'O'
const X_TEXT = 'X'
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)    /*takes up spaces in box with values to prevent overwritten */

const startGame = () => 
{
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id; /* id from html div classes */

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.textContent = `${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();

            console.log('Winning Blocks: ', winning_blocks);
            
            winning_blocks.forEach(index => {
                boxes[index].style.backgroundColor = winnerIndicator;
            });

            // No need to switch players if there's a winner
            return;
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;

        // Now, after checking for a winner, we switch players
        // If there's a winner, the player won't switch, and the game will end
    }
}


const winningCombos = 
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


function playerHasWon()
{
    for (const condition of winningCombos) 
    {
        let [a, b, c] = condition    

        if(spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c])
        {
            return condition
        }
    }
    return false
}

restartButton.addEventListener('click', restart)

function restart()
{
    spaces.fill(null)

    boxes.forEach( box => 
        {
            box.innerText = ''
            box.style.backgroundColor=''
        })


        playerText = 'Tic Tac Toe'

        currentPlayer = X_TEXT
}

startGame()

