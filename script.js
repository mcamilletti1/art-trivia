const randomArt = document.querySelector('#artImage')
const button = document.querySelector('button')
const title = document.querySelector('h4')
const choiceA = document.getElementById("A")
const choiceB = document.getElementById("B")
const choiceC = document.getElementById("C")
const choiceD = document.getElementById("D")
const scoreDiv = document.getElementById("scoreContainer")
const playerChoice = document.getElementById("playerChoice")




async function renderGame () {
    let randomPage = Math.floor(Math.random() * 9975)
    let artWork = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${randomPage}&fields=id`)
    console.log(artWork.data.data[0].id)
    let idList = []
    for (let i=0; i<artWork.data.data.length; i++) {
        console.log(artWork.data.data[i].id)
        idList.push(artWork.data.data[i].id)
    }
    console.log(idList)
    let randomId = idList[Math.floor(Math.random()*idList.length)]



    let randomPage1 = Math.floor(Math.random() * 9975)
    let artWork1 = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${randomPage1}&fields=id`)
    console.log(artWork1.data.data[0].id)
    let idList1 = []
    for (let i=0; i<artWork1.data.data.length; i++) {
        console.log(artWork1.data.data[i].id)
        idList1.push(artWork1.data.data[i].id)
    }
    console.log(idList1)
    let randomId1 = idList1[Math.floor(Math.random()*idList1.length)]


    let randomPage2 = Math.floor(Math.random() * 9975)
    let artWork2 = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${randomPage2}&fields=id`)
    console.log(artWork2.data.data[0].id)
    let idList2 = []
    for (let i=0; i<artWork2.data.data.length; i++) {
        console.log(artWork2.data.data[i].id)
        idList2.push(artWork2.data.data[i].id)
    }
    console.log(idList2)
    let randomId2 = idList2[Math.floor(Math.random()*idList2.length)]


    let randomPage3 = Math.floor(Math.random() * 9975)
    let artWork3 = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${randomPage3}&fields=id`)
    console.log(artWork3.data.data[0].id)
    let idList3 = []
    for (let i=0; i<artWork3.data.data.length; i++) {
        console.log(artWork3.data.data[i].id)
        idList3.push(artWork3.data.data[i].id)
    }
    console.log(idList3)
    let randomId3 = idList3[Math.floor(Math.random()*idList3.length)]


    let artId = randomId
    let wrongId1 = randomId1
    let wrongId2 = randomId2
    let wrongId3 = randomId3

    console.log(artId)


    let individualArt = await axios.get(`https://api.artic.edu/api/v1/artworks/${artId}`)
    let wrongArtist1 = await axios.get(`https://api.artic.edu/api/v1/artworks/${wrongId1}`)
    let wrongArtist2 = await axios.get(`https://api.artic.edu/api/v1/artworks/${wrongId2}`)
    let wrongArtist3 = await axios.get(`https://api.artic.edu/api/v1/artworks/${wrongId3}`)

    let artTitle = individualArt.data.data.title
    let imageKey = individualArt.data.data.image_id
    let artistTitle = individualArt.data.data.artist_title
    let wrongTitle1 = wrongArtist1.data.data.artist_title
    let wrongTitle2 = wrongArtist2.data.data.artist_title
    let wrongTitle3 = wrongArtist3.data.data.artist_title
    console.log(imageKey)
    console.log(artistTitle)
    let response = `https://www.artic.edu/iiif/2/${imageKey}/full/250,/0/default.jpg`
    randomArt.innerHTML = `<img src="${response}"/>`
    let multipleChoice = [artistTitle, wrongTitle1, wrongTitle2, wrongTitle3]
    console.log(multipleChoice)
    let rndmIdx = Math.floor(Math.random()*multipleChoice.length)
    let firstChoice = multipleChoice[rndmIdx]
    let multipleChoiceClone1 = multipleChoice.slice(0)
    let multipleChoice1 = multipleChoiceClone1.splice(rndmIdx, 1)
    let rndmIdx1 = Math.floor(Math.random()*multipleChoiceClone1.length-1)
    let secondChoice = multipleChoiceClone1[rndmIdx1]
    let multipleChoiceClone2 = multipleChoiceClone1.slice(0)
    let multipleChoice2 = multipleChoiceClone2.splice(rndmIdx1, 1)
    let rndmIdx2 = Math.floor(Math.random()*multipleChoiceClone2.length)
    let thirdChoice = multipleChoiceClone2[rndmIdx2]
    let multipleChoiceClone3 = multipleChoiceClone2.slice(0)
    let multipleChoice3 = multipleChoiceClone3.splice(rndmIdx2, 1)
    let fourthChoice = multipleChoiceClone3[0]
    title.innerText = `"${artTitle}"`
    choiceA.innerText = `${firstChoice}`
    choiceB.innerText = `${secondChoice}`
    choiceC.innerText = `${thirdChoice}`
    choiceD.innerText = `${fourthChoice}`
    choiceA.addEventListener('click', () => {
        choiceA.style.backgroundColor = "rgb(181, 232, 253)"
        if (firstChoice === artistTitle) {
        playerChoice.innerText = `You chose ${firstChoice}. That's correct!`
        } else {
            playerChoice.innerText = `You chose ${firstChoice}. The correct answer is ${artistTitle}.`
        }
    })

    choiceB.addEventListener('click', () => {
        choiceB.style.backgroundColor = "lightyellow"
        if (secondChoice === artistTitle) {
            playerChoice.innerText = `You chose ${secondChoice}. That's correct!`
        } else {
                playerChoice.innerText = `You chose ${secondChoice}. The correct answer is ${artistTitle}.`
        }
    })

    choiceC.addEventListener('click', () => {
        choiceC.style.backgroundColor = "peachpuff"
        if (thirdChoice === artistTitle) {
            playerChoice.innerText = `You chose ${thirdChoice}. That's correct!`
        } else {
                playerChoice.innerText = `You chose ${thirdChoice}. The correct answer is ${artistTitle}.`
        }
    })

    choiceD.addEventListener('click', () => {
        choiceD.style.backgroundColor = "rgb(213, 248, 236)"
        if (fourthChoice === artistTitle) {
            playerChoice.innerText = `You chose ${fourthChoice}. That's correct!`
        } else {
                playerChoice.innerText = `You chose ${fourthChoice}. The correct answer is ${artistTitle}.`
        }
    })

}

renderGame()
