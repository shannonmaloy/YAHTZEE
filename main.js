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

    addMatches(diceRollResult)
    scoreParse(scoreOptions)
    
    
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

function addMatches (arr){
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
    console.log(scoreOptions)
    return scoreOptions
}

//Function to evaluate all scoring options based on the current dice roll
function scoreParse (obj){
    let score = Object.values(obj)
    //fullHouseCheck is used for alternative method currently commented out
    // let fullHouseCheck = 0
    
    //FOR EACH loop to check for 3, 4, and 5 of a kinds.  Did not use if/else if since 
    //a 5 of a kind can also be a 3 or 4 of a kind, a 4 of a kind can also be a 3 of a kind.
    score.forEach((val,index) => {
        //Check for 5 of a Kind AKA Yahtzee
        if (val >= 5){
            // console.log(index)
            // console.log(val)
            console.log('5 of a kind', ((index + 1) * val))
        } 
        //Check for 4 of a kind
        if (val >= 4){
            // console.log(index)
            // console.log(val)
            console.log('4 of a kind', ((index + 1) * val))
        } 
        //Check for 3 of a kind
        if (val >= 3){
            // console.log(index)
            // console.log(val)
            console.log('3 of a kind', ((index + 1) * val))
        }  
    })
    //Two methods for solving Full House Check
    // for (i = 0; i < score.length; i++){
    //     console.log("Inside Method 2", score[i])
        
    //     if (score[i] === 2 || score[i] === 3){
    //         fullHouseCheck += 1
    //         console.log(fullHouseCheck)
    //     }
    //     if (fullHouseCheck === 2){
    //         console.log("Full House Method 2")
    //     }
    // }
    let fullHouse = score.filter(function (element){
        return (element > 1 && element < 4)
    }) 
    fullHouse = fullHouse.sort()
    console.log(fullHouse,score)
    if (fullHouse[0] === 2 && fullHouse[1] === 3){
        console.log('full house!')}
    }

// console.log("help")

// //Straight Check
// let diceRollResultSorted = diceRollResult.sort()
// console.log(diceRollResultSorted)
// for (i = 0; i < diceRollResult.length, i++){
    
// }