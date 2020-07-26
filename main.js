console.log("JS IS CONNECTED")

const sound = new Audio()
const diceOptions = [1, 2, 3, 4, 5, 6]
let diceRollResult = []
let turnDiceSelection = []
let clickedItem = null
let selectedScore = null
let maxPlayers = 4
let bonusAmount = 35
let currentPlayer = 1
let rollCount = 3
let playerNumber = 1
let pressStart = null
let playerScoreKeeper = []
let bonusCheck = null

//Query for the dice
const dice = document.querySelectorAll('.dice')
//Query for Score Card
let scoreBoard = null
//Roll/Start to roll rice
const startAndRollButton = document.querySelector('.roll')
//Query for Take Score Button
const takeScore = document.querySelector('.take-score')

let gameInfoBar = document.querySelector('.game-info')

class Player {
    constructor(){
    this.ones = 0;
    this.twos = 0;
    this.threes = 0;
    this.fours = 0;
    this.fives = 0;
    this.sixes = 0;
    this.bonus = 0;
    this.threeOfKind = 0;
    this.fourOfKind = 0;
    this.fullHouse = 0;
    this.smallStraight = 0;
    this.largeStraight = 0;
    this.yahtzee = 0;
    this.chance = 0;
}
}

//Below waits for Start Button click.  Request number of players from user. 
startAndRollButton.addEventListener('click',evt =>{
    pressStart = evt.target
    if(evt.target.innerText === `Roll (${rollCount})`){
        if (rollCount > 0){
            rollCount = rollCount - 1;
            pressStart.innerText = `Roll (${rollCount})`;
            (rollDice()) 
        
        }
 
    } else if (evt.target.innerText === 'Start'){
        modal.style.display = "block";
        const form = document.querySelector('#numberOfPlayersForm')
        form.addEventListener('submit', evt =>{
            evt.preventDefault()
            playerNumber = evt.target.numberOfPlayers.value
            modal.style.display = "none";
            form.reset()
            pressStart.innerText = `Roll (${rollCount})`
            gameSetup(playerNumber)
        })   
    }  
})

//Dice Sound
function playAudio() {
    sound.src = './DiceRoll3.mp3'
    sound.volume = 0.3;
    sound.play().volume;
}

function gameSetup(playerNumber){
    let playerScores = document.querySelector('.playerScoreContainer')

    for (let i = maxPlayers - 1; i >= playerNumber; i--){
        playerScores.removeChild(playerScores.children[i])
    }
    let lower = document.querySelector('.lowerScoreSection')
    let upper = document.querySelector('.upperScoreSection')
    let grid = ''
    for (let i = maxPlayers; i > playerNumber; i--){
        lower.children[i].style.display = 'none'
        upper.children[i].style.display = 'none'
    }
    for (i = 0; i < playerNumber; i++){
        grid += 'auto '
    }
    upper.style.gridTemplateColumns = `35% ${grid}`;
    lower.style.gridTemplateColumns = `35% ${grid}`;
    
    //Creation of the array that holds all of the players created
    for (let i = 0; i < (playerNumber); i++) {
        playerScoreKeeper[i] = new Player()
    }
    currentPlayerMessage()
    highlight()
}

function currentPlayerMessage(){
    gameInfoBar.innerText = `Player ${currentPlayer}'s Turn!`
}

function highlight (){
    let highlightColumn = document.querySelectorAll(`.playerColumn${currentPlayer}`)
        highlightColumn.forEach(highlightColumn =>{
            highlightColumn.className = 'playerColumnHighlightCurrent'
        })

    let highlightPlayerScore = document.querySelector(`.playerScore${currentPlayer}`)
    highlightPlayerScore.className = 'currentPlayerHighlightScore'
}

function unhighlight (){
    let highlightColumn = document.querySelectorAll(`.playerColumnHighlightCurrent`)
        highlightColumn.forEach(highlightColumn =>{
            highlightColumn.className = `playerColumn${currentPlayer}`
        })

    let highlightPlayerScore = document.querySelector('.currentPlayerHighlightScore')
    highlightPlayerScore.className = `playerScore${currentPlayer}`
}

function rollDice(){  
    //Sound effect for dice roll
    playAudio() 
    
    //Select all .dice on document
    //For Each Loop to roll each individial die and change innerText
    dice.forEach((dice, i) => {
            if (turnDiceSelection[i] === undefined){
                diceRollResult[i] = turnDiceSelection[i]  
            }
            //Randomizer for die number
            if (!diceRollResult[i]) {
            let diceRoll = Math.ceil(Math.random() * diceOptions.length)
            //change innerText to display result
            dice.innerText = diceRoll
            //Create an array of what was rolled
            diceRollResult[i] = diceRoll
            }  
    // console.log(diceRollResult, turnDiceSelection)
    })

    sortDiceTally(diceRollResult) //Returns scoreOptons object
    
    scoreParse(scoreOptions) 
    
    scoreBoardListener(scoreCardTally)

    takeScore.addEventListener('click', evt =>{
        console.log(selectedScore >= 0)
        if (selectedScore === null){
            gameInfoBar.innerText = "Select A Score Option Above, Then Select 'Take Score'"
            return
        }
        let currentPlayClass = clickedItem.className
        playerScoreKeeper[currentPlayer - 1][currentPlayClass] = selectedScore
        console.log(playerScoreKeeper)
        clickedItem.innerText = selectedScore
        clickedItem.className = 'scored'
        bonusChecker()
        
        //Check for bonus BEFORE the unlight function and the score pull below
        unhighlight()
        let scorePull = Object.values(playerScoreKeeper[currentPlayer - 1])
        console.log(scorePull)
        let updatePlayerScore = scorePull.reduce(function( a , b){
        return a + b;
        }, 0);
        console.log(updatePlayerScore)
        document.getElementById(`player${currentPlayer}Score`).innerHTML = updatePlayerScore
        rollCount = 3
        pressStart.innerText = `Roll (${rollCount})`
        dice.forEach(dice  => { 
            dice.setAttribute('class','dice')
            turnDiceSelection = []
        })
        selectedScore = null
        if (currentPlayer < playerNumber){
            currentPlayer += 1
        } else {currentPlayer = 1}
        highlight()
        currentPlayerMessage()
        scoreBoard.forEach(scoreBoard =>{
            removeFocusAndBlur(scoreBoard)
        })
    })

}

function bonusChecker(){
    //Implemented solution from https://stackoverflow.com/questions/15748656/javascript-reduce-on-object
    let bonusCheck = playerScoreKeeper[currentPlayer - 1]
    const filteredBonus = ['1','2','3','4','5','6']
    let filtered = filteredBonus.reduce((obj,key)=> ({...obj, [key]: bonusCheck[key]}), {})
    let filteredAgain = Object.values(filtered)
    let bonusCheckSum = filteredAgain.filter(function(element){return element || 0 }).reduce(function(a,b) {return a+b},0)
    //Following code used a basis for above - see stackoverflow link above
    // const raw = {
    //     item1: { key: 'sdfd', value: 'sdfd' },
    //     item2: { key: 'sdfd', value: 'sdfd' },
    //     item3: { key: 'sdfd', value: 'sdfd' }
    //   };
      
    //   const filteredKeys = ['item1', 'item3'];
      
    //   const filtered = filteredKeys
    //     .reduce((obj, key) => ({ ...obj, [key]: raw[key] }), {});
      
    if (bonusCheckSum >= 63 && playerScoreKeeper[currentPlayer - 1][bonus] !== 0){
        playerScoreKeeper[currentPlayer - 1].bonus = bonusAmount
        document.querySelector('.playerColumnHighlightCurrent .bonus').innerText = bonusAmount
    }


}



dice.forEach((dice,i) => {
    dice.addEventListener('click', (evt) =>{
        if (diceRollResult[i] !== undefined ){
            if(turnDiceSelection[i] === undefined){
                //CHANGE CSS CLASS ON CLICK
                dice.setAttribute('class','dice-clicked')
                turnDiceSelection[i] = diceRollResult[i]
                
            } else {
                turnDiceSelection[i] = undefined
                //CHANGE CSS CLASS ON CLICK
                dice.setAttribute('class','dice')
                
            } 
        } 
    })
})


function removeFocusAndBlur(scoreBoard) {
    scoreBoard.removeEventListener('focus', focus, true)
    scoreBoard.removeEventListener('blur', blur, true)
}

function focus(evt){
    clickedItem = null
    clickedItem = evt.target
        if (evt.target !== undefined ){
        let clickedScoreBoardItem = evt.target.className
            if (!scoreCardTally[clickedScoreBoardItem]){
                evt.target.innerText = 0
                selectedScore = 0
            } else {
                evt.target.innerText = scoreCardTally[clickedScoreBoardItem]
                selectedScore = scoreCardTally[clickedScoreBoardItem]
                console.log(selectedScore)
                console.log(clickedItem)
            }      
                evt.target.addEventListener('blur', blur, true)
        }

}

function blur(evt) {
    evt.target.innerText = null 
    console.log(selectedScore)
    console.log(clickedItem)
} 


function scoreBoardListener(){
    
    scoreBoard = document.querySelectorAll('.playerColumnHighlightCurrent div:not(.bonus)')
    console.log(scoreBoard)
    console.log('enter')
    scoreBoard.forEach((scoreBoard) => {
        console.log(scoreBoard.innerText)

        if (scoreBoard.innerText === ''){
        scoreBoard.setAttribute('tabindex', '-1')
        scoreBoard.addEventListener('focus', focus, true)
        }  
    })
}

function sortDiceTally (arr){
    scoreOptions = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    }
    for (const number of arr) {
         scoreOptions[number] = scoreOptions[number] + 1
        }
    return scoreOptions
}
//End sortDiceTally function

//************************************************** */
//Function to evaluate all scoring options based on the current dice roll
function scoreParse (scoreOptions){
    let score = Object.values(scoreOptions)
    let straightCheck = 0
    let sum = diceRollResult.reduce(function(a, b){
        return a + b;
        }, 0);
     
    scoreCardTally = { }
    
    //FOR EACH loop to validate scoreing options.  for 3, 4, and 5 of a kinds.  Did not use if/else if since 
    //a 5 of a kind can also be a 3 or 4 of a kind, a 4 of a kind can also be a 3 of a kind.
    score.forEach((number,index) => {       
        scoreCardTally[index + 1] = score[index] * diceOptions[index]
        // console.log(`You can take ${score[index] * diceOptions[index]} on your ${diceOptions[index]}'s`)
        
        //Check for 5 of a Kind AKA Yahtzee
        if (number >= 5){
            scoreCardTally.yahtzee = 50
            console.log('YAHTZEE', ((index + 1) * number))
        } 
        //Check for 4 of a kind
        if (number >= 4){
            scoreCardTally.fourOfKind = sum
            console.log('You can take a 4 of Kind', sum)
        } 
        //Check for 3 of a kind
        if (number >= 3){
            scoreCardTally.threeOfKind = sum
            console.log('You can take a 3 of Kind', sum)
        }
    })
    //Full House Check
    //Filter out dice tallys less than 1 and greater than 4.  For example: if you have only 1 two or 4 fives.
    //This allows us to check for dice tallies of 3 (3 of a kind) and 2 aka Full House
    let fullHouse = score.filter(function (element){
        return (element > 1 && element < 4)
    }) 
    fullHouse = fullHouse.sort()
    if (fullHouse[0] === 2 && fullHouse[1] === 3){
        scoreCardTally.fullHouse = 25
        console.log('Full House Scores 25 points')}
     
    //Large and Small Straights Check
    for (let i = 0; i < score.length - 1; i++){
        if ( score[i+1] >= 1 && score[i] >= 1){
            straightCheck += 1
        } 
    }
    if(straightCheck >= 3){
        scoreCardTally.smallStraight = 30
        console.log("Small straight Scores 30 Points")
    }  
    if(straightCheck === 4){
        scoreCardTally.largeStraight = 40
        console.log("Large Straight Score 40 Points")
    }
    let chance = sum
        scoreCardTally.chance = chance    
    console.log(`You can take ${sum} on Chance`)

    console.log("Score Card Tally:", scoreCardTally)
    return scoreCardTally
}
///End Score Parse Function



// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}


