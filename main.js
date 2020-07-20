console.log("JS IS CONNECTED")
const diceOptions = [1, 2, 3, 4, 5, 6]



//click to roll rice
const roll = document.querySelector('.roll')
roll.addEventListener('click',rollDice)

function rollDice(){
const dice = document.querySelectorAll('.dice')
console.log(dice)
dice.forEach((die) => {
        console.log(dice)
        let diceRoll = Math.ceil(Math.random() * diceOptions.length)
        console.log(diceRoll)
        die.innerText = diceRoll
        console.log(diceRoll)
    // })
})
}

