const password = document.getElementById("password-el")
const passwordLengthEl = document.getElementById("password-length-el")
const passwordStrengthEl = document.getElementById("password-strength-el")
const copyButton = document.getElementById("copy-button-el")
const generateButton = document.getElementById('generate-button-el')
const slider = document.getElementById("slider-el")
let rawPasswordArr
const uppercase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const lowercase =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const numbers = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]


// setting state for password length element
let passwordLength = slider.value
passwordLengthEl.innerHTML = passwordLength

let passwordStrength = 'Medium'
passwordStrengthEl.innerHTML = passwordStrength



// changes the text content of password length html element
slider.addEventListener("input", function() {
    passwordLengthEl.textContent = this.value
    if (this.value < 14){
        passwordStrength = 'Easy'
    } else if (this.value > 13 && this.value < 18) {
        passwordStrength = 'Medium'
    } else {
        passwordStrength = 'Hard'
    }
    passwordStrengthEl.innerHTML = passwordStrength
})

generateButton.addEventListener("click", () => {
    rawPasswordArr = []

    // creates selected types array with values of checked radio buttons
    const selectedTypes = Array.from(document.querySelectorAll('input:checked')).map(input => input.value)

    // creates password array with desired character types
    randomUppercase()
    randomLowercase()
    randomNumbers()
    randomSymbols()

    // shuffles password array
    const shuffledPasswordArr = shuffleArray(rawPasswordArr)

    // extracting desired amount of characters from shuffled array
    const passwordArr = []
    passwordLength = slider.value
    for (i = 0; i < passwordLength; i++) {
        passwordArr.push(shuffledPasswordArr[i])
    }

    let passwordString = ""
    for (let element of passwordArr) {
        passwordString += element
    }

    password.innerHTML = passwordString
})

copyButton.addEventListener('click', () => {
    let textToCopy = password.innerHTML

    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('Text copied to clipboard')
    })
    .catch(err => {
      console.error('Error copying text: ', err)
    })
})



function randomUppercase() {
    for (let i = 0; i < 10; i++){
        let randomIndex = Math.floor(Math.random() * uppercase.length)
        rawPasswordArr.push(uppercase[randomIndex])
    }
}
function randomLowercase() {
    for (let i = 0; i < 10; i++){
        let randomIndex = Math.floor(Math.random() * lowercase.length)
        rawPasswordArr.push(lowercase[randomIndex])
    }
}
function randomNumbers() {
    for (let i = 0; i < 10; i++){
        let randomIndex = Math.floor(Math.random() * numbers.length)
        rawPasswordArr.push(numbers[randomIndex])
    }
}
function randomSymbols(){
    for (let i = 0; i < 10; i++){
        let randomIndex = Math.floor(Math.random() * symbols.length)
        rawPasswordArr.push(symbols[randomIndex])
    }
} 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}