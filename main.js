console.log("JS IS CONNECTED")
const diceOptions = [1, 2, 3, 4, 5, 6]
let diceRollResult = []
let turnDiceSelection = []
const dice = document.querySelectorAll('.dice')
//click to roll rice
const roll = document.querySelector('.roll')
//Start/Roll Button clicked will initalize game
//Below will rolls the dice 
roll.addEventListener('click',rollDice)
//Next will listen for dice selection


function rollDice(){  
//Select all .dice on document 
//For Each Loop to roll each individial die
    dice.forEach((dice, i) => {
            if (turnDiceSelection[i] === undefined){
                diceRollResult[i] = turnDiceSelection[i]  
            }
            //Randomizer for die number
            if (!diceRollResult[i]){
            let diceRoll = Math.ceil(Math.random() * diceOptions.length)
            //change innerText to display result
            dice.innerText = diceRoll
            //Create an array of what was rolled
            diceRollResult[i] = diceRoll
            }
    
    console.log(diceRollResult, turnDiceSelection)
    })
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
