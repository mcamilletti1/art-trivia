const randomArt = document.querySelector('#artImage')
const button = document.querySelector('button')
const title = document.querySelector('h4')
const choiceA = document.getElementById("A")
const choiceB = document.getElementById("B")
const choiceC = document.getElementById("C")
const choiceD = document.getElementById("D")
const scoreDiv = document.getElementById("scoreContainer")
const playerChoice = document.getElementById("playerChoice")
const choices = document.getElementById("choices")
const body = document.querySelector("body")
const content = document.getElementById("content")
const background = document.getElementById("background")
const oval = document.getElementById("oval")
const h1 = document.querySelector("h1")
const h2 = document.querySelector("h2")
const outerContent = document.getElementById("outerContent")
const img = document.querySelector(".background")
let points = 0
let rounds = 0
let apiList = []
let apiProcessed = false
let individualArt
let individualArt1
let individualArt2
let individualArt3




//brings you to the score page
function returnScore (num) {
    let percentCorrect = (num/5)*100
    h1.innerText = "Great job!"
    h2.innerText = `You got ${num} points! You got ${percentCorrect}% correct!`
    choices.style.visibility = "hidden"
    button.innerText = "Play again"
    img.innerHTML = `<img class="backgroundImg" src="https://img.theculturetrip.com/wp-content/uploads/2016/08/tct-aic-2.png"/>`
    randomArt.style.visibility = "hidden"
    randomArt.style.height = "1px"
    randomArt.style.width = "1px"
    background.style.backgroundImage = "url(https://img.theculturetrip.com/wp-content/uploads/2016/08/tct-aic-2.png)"
    button.addEventListener('click', restartGame)
    content.style.opacity = 0.55
    oval.style.paddingTop = "100px"
    oval.style.height = "600px"
    title.style.opacity = "0"
    outerContent.style.border = "solid 10px rgb(93, 72, 20)"
    points = 0
    rounds = 0
    rightAnswer = false
}

function restartGame() {
    location.reload()
}

document.addEventListener("DOMContentLoaded", function() {
//starts the title page on load
function init () {
    points = 0
    rounds = 0
    choices.style.visibility = "hidden"
    button.innerText = "Start quiz"
    img.innerHTML = `<img class="backgroundImg" src="https://img.theculturetrip.com/wp-content/uploads/2016/08/tct-aic-2.png"/>`
    randomArt.style.visibility = "hidden"
    randomArt.style.height = "1px"
    randomArt.style.width = "1px"
    background.style.backgroundImage = "url(https://img.theculturetrip.com/wp-content/uploads/2016/08/tct-aic-2.png)"
    button.addEventListener('click', renderGame)
    h1.innerText = "Guess the Artist"
    h2.innerText = "Can you guess the artist for each of these works of art?"
    content.style.opacity = 0.55
    oval.style.paddingTop = "100px"
    oval.style.height = "600px"
    addEventListeners()
}

})


function loadingGif() {
    img.innerHTML = `<img class="backgroundImg" src="https://cdn.booooooom.com/wp-content/uploads/2017/03/colin-macfadyen19.gif"/>`
    randomArt.innerHTML = `<img width="300px" height="300px" src="https://cdn.booooooom.com/wp-content/uploads/2017/03/colin-macfadyen19.gif"/>`
    randomArt.style.height = "300px"
    randomArt.style.width = "300px"
    randomArt.style.margin = "0 auto"
}

async function processApiResponses() {
    apiList = [individualArt, individualArt1, individualArt2, individualArt3]
    await Promise.all(apiList)
    apiProcessed = true
}


//loads the gameplay page
async function renderGame () {
    await processApiResponses()
    pointsAvailable = 1
    rightAnswer = false
    h1.innerText = "Guess the Artist"
    h2.innerText = "Can you guess the artist for each of these works of art?"
    choices.style.visibility = "visible"
    randomArt.style.visibility = "visible"
    randomArt.style.border = "solid 2px white"
    randomArt.style.width = "300px"
    randomArt.style.height = "300px"
    randomArt.style.margin = "0 auto"
    choiceA.style.backgroundColor = "whitesmoke"
    choiceB.style.backgroundColor = "whitesmoke"
    choiceC.style.backgroundColor = "whitesmoke"
    choiceD.style.backgroundColor = "whitesmoke"
    playerChoice.style.opacity = "0"
    oval.style.paddingTop = "0"
    oval.style.height = "700px"
    h2.style.padding = "0"
    content.style.backgroundColor = "whitesmoke"
    content.style.opacity = 1
    outerContent.style.border = "solid 2px black"
    h1.style.border = "none"
    h2.style.border = "none"
    button.innerText = "Next question"

    //gets random page of paintings

    let randomPage = Math.floor(Math.random() * 100)
    let artWork = await axios.get(`https://api.artic.edu/api/v1/artworks/search?&query[match][artwork_type_title]=Painting&page=${randomPage}`)
    

    //gets id for individual paintings from that page
    let artWorkData = artWork.data.data
    let randomArtwork = artWorkData[Math.floor(Math.random()*5)]
    let randomTitle = randomArtwork.title
    let randomArtworkId = randomArtwork.id
    let randomArtwork1Id = artWorkData[6].id
    let randomArtwork2Id = artWorkData[7].id
    let randomArtwork3Id = artWorkData[8].id


    //gets data for paintings chosen
    let individualArt = await axios.get(`https://api.artic.edu/api/v1/artworks/${randomArtworkId}`)
    let individualArt1 = await axios.get(`https://api.artic.edu/api/v1/artworks/${randomArtwork1Id}`)
    let individualArt2 = await axios.get(`https://api.artic.edu/api/v1/artworks/${randomArtwork2Id}`)
    let individualArt3 = await axios.get(`https://api.artic.edu/api/v1/artworks/${randomArtwork3Id}`)

    //gets names of artists for each painting and image for painting
    let randomArtistName = individualArt.data.data.artist_title
    console.log(`correct answer: ${randomArtistName}`)
    let randomImageId = individualArt.data.data.image_id
    let randomArtistName1 = individualArt1.data.data.artist_title
    let randomArtistName2 = individualArt2.data.data.artist_title
    let randomArtistName3 = individualArt3.data.data.artist_title




    //gets image from image database
   let response = `https://www.artic.edu/iiif/2/${randomImageId}/full/300,300/0/default.jpg`


   //sets painting title and background image to the painting
   randomArt.innerHTML = `<img src="${response}"/>`
   img.innerHTML = `<img class="backgroundImg" src="${response}"/>`

   //gets all API promises
   let apiList = [individualArt, individualArt1, individualArt2, individualArt3, response]
   Promise.all(apiList)

    //randomizes the multiple choice buttons
   let multipleChoice = [randomArtistName, randomArtistName1, randomArtistName2, randomArtistName3]
   let rndmIdx = Math.floor(Math.random()*multipleChoice.length)
   let firstChoice = multipleChoice[rndmIdx]
   let multipleChoiceClone1 = multipleChoice.slice(0)
   let multipleChoice1 = multipleChoiceClone1.splice(rndmIdx, 1)
   let rndmIdx1 = Math.floor(Math.random()*multipleChoiceClone1.length)
   let secondChoice = multipleChoiceClone1[rndmIdx1]
   let multipleChoiceClone2 = multipleChoiceClone1.slice(0)
   let multipleChoice2 = multipleChoiceClone2.splice(rndmIdx1, 1)
   let rndmIdx2 = Math.floor(Math.random()*multipleChoiceClone2.length)
   let thirdChoice = multipleChoiceClone2[rndmIdx2]
   let multipleChoiceClone3 = multipleChoiceClone2.slice(0)
   let multipleChoice3 = multipleChoiceClone3.splice(rndmIdx2, 1)
   let rndmIdx3 = Math.floor(Math.random()*multipleChoiceClone3.length)
   let fourthChoice = multipleChoiceClone3[rndmIdx3]

   title.innerText = `"${randomTitle}"`
   title.style.opacity = "1"
   choiceA.innerText = `${firstChoice}`
   choiceB.innerText = `${secondChoice}`
   choiceC.innerText = `${thirdChoice}`
   choiceD.innerText = `${fourthChoice}`



function choice1 () {
    console.log(`running choice1 ${firstChoice} ${randomArtistName}`)
    choiceA.style.backgroundColor = "rgb(213, 248, 236)"
    if (firstChoice === randomArtistName) {
        rightAnswer = true;
    }
}

function choice2 () {
    console.log(`running choice2 ${secondChoice} ${randomArtistName}`)
    choiceB.style.backgroundColor = "rgb(213, 248, 236)"
    if (secondChoice === randomArtistName) {
        rightAnswer = true;
    } 
}


function choice3 () {
    console.log(`running choice3 ${thirdChoice} ${randomArtistName}`)
    choiceC.style.backgroundColor = "rgb(213, 248, 236)"
    if (thirdChoice === randomArtistName) {
        rightAnswer = true;
    } 
}



function choice4 () {
    console.log(`running choice4 ${fourthChoice} ${randomArtistName}`)
    choiceD.style.backgroundColor = "rgb(213, 248, 236)"
    if (fourthChoice === randomArtistName) {
        rightAnswer = true;
    } 
}

//gives a point if answer is correct and displays the right answer

function checkAnswer () {
    console.log("checking answer")
    playerChoice.style.opacity = "1"
    if (rightAnswer === true) {
        playerChoice.innerText = "That's correct!"
        if (pointsAvailable === 1) {
            points += 1;
            console.log("adding one point");
            pointsAvailable = 0
        }
    } else {
        playerChoice.innerText = `Incorrect. The correct answer is ${randomArtistName}`;
    } 
}

//listens for which answer the player chooses

choiceA.addEventListener('click', () => {
    choice1()
    checkAnswer()
    removeEventListeners()
})
    
choiceB.addEventListener('click', () => {
    choice2()
    checkAnswer()
    removeEventListeners()
})
choiceC.addEventListener('click', () => {
    choice3()
    checkAnswer()
    removeEventListeners()
})
choiceD.addEventListener('click', () => {
    choice4()
    checkAnswer()
    removeEventListeners()
})

function removeEventListeners() {
    choiceA.removeEventListener('click', choice1)
    choiceB.removeEventListener('click', choice2);
    choiceC.removeEventListener('click', choice3);
    choiceD.removeEventListener('click', choice4);
}

    //checks to see if the game is complete
    rounds++
    if (rounds === 6) {
        returnScore(points)
    } else {
        pointsAvailable = 1
        console.log(`rounds: ${rounds}`)
        console.log(`points: ${points}`)
    }

}





