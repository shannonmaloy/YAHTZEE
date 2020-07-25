console.log("JS IS CONNECTED")

const sound = new Audio()
const diceOptions = [1, 2, 3, 4, 5, 6]
let diceRollResult = []
let turnDiceSelection = []
let clickedItem = null



// let rotate360 = [
//         {transform: 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)'},
//   ]

//Query for the dice
const dice = document.querySelectorAll('.dice')
//Query for Score Card
const scoreBoard = document.querySelectorAll('.playerColumn div')
//Roll/Start to roll rice
const roll = document.querySelector('.roll')
//Query for Take Score Button
const takeScore = document.querySelector('.take-score')
//Start/Roll Button clicked will initalize game

    

//Below will rolls the dice 
roll.addEventListener('click',evt =>{
    let pressStart = evt.target
    if (evt.target.innerText === 'Start'){
        modal.style.display = "block";
        const form = document.querySelector('#numberOfPlayersForm')
        form.addEventListener('submit', evt =>{
        console.log(evt)
        evt.preventDefault()
        const playerNumber = evt.target.numberOfPlayers.value
        console.log(playerNumber)
        modal.style.display = "none";
        form.reset()
        pressStart.innerText = 'Roll'
    })    

        
        
    } else if(evt.target.innerText === 'Roll'){
        (rollDice())
    }  
})
//Below will listen for dice selection
function playAudio() {
    sound.src = './DiceRoll3.mp3'
    sound.volume = 0.3;
    sound.play().volume;
}




function rollDice(){  
    
    playAudio() //Sound effect for dice roll
    

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
    
    let shannon = scoreBoardListener(scoreCardTally)
    console.log(shannon)
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



function scoreBoardListener(item){

    scoreBoard.forEach((scoreBoard) => {
        scoreBoard.setAttribute('tabindex', '-1')
        scoreBoard.addEventListener('focus', (evt) =>{
            if (scoreBoard !== undefined ){
                let clickedScoreBoardItem = scoreBoard.className
                if (!item[clickedScoreBoardItem]){
                    scoreBoard.innerText = 0
                } else {
                scoreBoard.innerText = item[clickedScoreBoardItem]
                let selectedScore = item[clickedScoreBoardItem]
                }   
                    if (takeScore.addEventListener('click',evt=>{
                        console.log('test')
                        
                    })){
                        console.log('test 2')
                    } else
                    {
                        evt.target.addEventListener('blur', (evt) => {
                        scoreBoard.innerText = null
                        },true)
                    }  
            }
        }, true)
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
     
    scoreCardTally = {

    }
    
    //FOR EACH loop to validate scoreing options.  for 3, 4, and 5 of a kinds.  Did not use if/else if since 
    //a 5 of a kind can also be a 3 or 4 of a kind, a 4 of a kind can also be a 3 of a kind.
    score.forEach((number,index) => {       
        scoreCardTally[index + 1] = score[index] * diceOptions[index]
        // console.log(`You can take ${score[index] * diceOptions[index]} on your ${diceOptions[index]}'s`)
        
        //Check for 5 of a Kind AKA Yahtzee
        if (number >= 5){
            // console.log(index)
            // console.log(number)
            scoreCardTally.yahtzee = 50
            console.log('YAHTZEE', ((index + 1) * number))
        } 
        //Check for 4 of a kind
        if (number >= 4){
            // console.log(index)
            // console.log(number)
            scoreCardTally.fourOfKind = sum
            console.log('You can take a 4 of Kind', sum)
        } 
        //Check for 3 of a kind
        if (number >= 3){
            // console.log(index)
            // console.log(number)
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
    if(straightCheck === 3){
        scoreCardTally.smallStraight = 30
        console.log("Small straight Scores 30 Points")
    } else if (straightCheck === 4){
        scoreCardTally.largeStraight = 40
        console.log("Large Straight Score 40 Points")
    }
    let chance = sum
        scoreCardTally.chance = sum    
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


