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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


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
    loadingGif()
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

    let artistNames = [randomArtistName, randomArtistName1, randomArtistName2, randomArtistName3];

    // Remove duplicates
    let uniqueArtistNames = [...new Set(artistNames)];

    const defaultArtistNames = ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet", "Salvador Dalí"];

    // Use default names if there are not enough unique names
    while (uniqueArtistNames.length < 4) {
        let defaultName = defaultArtistNames.shift(); // Take the first name from the default list
        if (!uniqueArtistNames.includes(defaultName)) {
            uniqueArtistNames.push(defaultName);
        }
    }

    // Shuffle the unique artist names
    let shuffledArtistNames = shuffleArray(uniqueArtistNames);


    //gets image from image database
    let response = `https://www.artic.edu/iiif/2/${randomImageId}/full/300,300/0/default.jpg`


   //sets painting title and background image to the painting
    randomArt.innerHTML = `<img src="${response}"/>`
    img.innerHTML = `<img class="backgroundImg" src="${response}"/>`


    title.innerText = `"${randomTitle}"`
    title.style.opacity = "1"
    choiceA.innerText = shuffledArtistNames[0]
    choiceB.innerText = shuffledArtistNames[1]
    choiceC.innerText = shuffledArtistNames[2]
    choiceD.innerText = shuffledArtistNames[3]



    function choice1 () {
        choiceA.style.backgroundColor = "rgb(213, 248, 236)"
        if (shuffledArtistNames[0] === randomArtistName) {
            rightAnswer = true;
        }
    }

    function choice2 () {
        choiceB.style.backgroundColor = "rgb(213, 248, 236)"
        if (shuffledArtistNames[1] === randomArtistName) {
            rightAnswer = true;
        } 
    }

    function choice3 () {
        choiceC.style.backgroundColor = "rgb(213, 248, 236)"
        if (shuffledArtistNames[2] === randomArtistName) {
            rightAnswer = true;
        } 
    }

    function choice4 () {
        choiceD.style.backgroundColor = "rgb(213, 248, 236)"
        if (shuffledArtistNames[3] === randomArtistName) {
            rightAnswer = true;
        } 
    }

    function checkAnswer () {
        playerChoice.style.opacity = "1"
        if (rightAnswer) {
            playerChoice.innerText = "That's correct!"
            if (pointsAvailable === 1) {
                points += 1;
                pointsAvailable = 0
            }
        } else {
            playerChoice.innerText = `Incorrect. The correct answer is ${randomArtistName}`;
        } 
    }

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

    rounds++
    if (rounds === 6) {
        returnScore(points)
    } else {
        pointsAvailable = 1
        console.log(`rounds: ${rounds}`)
        console.log(`points: ${points}`)
    }
}






