const randomArt = document.querySelector('#artImage')
const button = document.querySelector('button')
const title = document.querySelector('h4')
const choiceA = document.getElementById("A")
const choiceB = document.getElementById("B")
const choiceC = document.getElementById("C")
const choiceD = document.getElementById("D")
const scoreDiv = document.getElementById("scoreContainer")
const playerChoice = document.getElementById("playerChoice")

function sanitise(x) {
    if(isNaN(x)) {
        return NaN
    }
    return x
}


async function renderGame () {
    choiceA.style.backgroundColor = "transparent"
    choiceB.style.backgroundColor = "transparent"
    choiceC.style.backgroundColor = "transparent"
    choiceD.style.backgroundColor = "transparent"
    playerChoice.style.opacity = "0"
    let randomPage = Math.floor(Math.random() * 9975)
    let artWork = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${randomPage}&fields=id,artist_title,artist_titles,classification_title`)
    //console.log(artWork.data.data[0].id)
    let wrongIdList = [89058, 231277, 49752, 237634, 66831, 130544, 31620, 129062, 36441, 73707, 80007, 248858, 41928, 51350, 258416, 21945, 75877, 48502, 145546, 73686, 146109, 157851, 214659, 61780, 15291, 30291, 76723, 76439, 109011, 179722, 147956, 154277, 48591, 127955, 99239, 229879, 258961, 236673, 184009, 36546, 46147, 222588, 180536, 217083, 67612, 196034, 57992, 148206, 142956, 75637, 2008543, 135562, 150548, 63789, 117334, 131346, 90976, 44414, 233536, 143276, 219898, 235354, 184931, 64587, 91482, 9929, 130195, 26536, 16856, 193828, 248653, 242832, 228886, 11960, 127407, 236802, 121340, 259909, 65442, 159927, 8811, 196534, 15339, 92725, 69260, 93641, 91280, 235436, 10192, 124478, 43718, 230183, 9130, 241940, 78572, 188024, 40074, 75106, 213154, 250044, 31152, 159951, 23926, 130606, 50679, 18429, 187942, 61970, 210760, 93148, 6607, 96871, 135553, 222691, 516, 187035, 159945, 17576, 200972, 234686, 209436, 141293, 12711, 63771, 46369, 100083, 196656, 85541, 207719, 196746, 199888, 101965, 84794, 198386, 227841, 15045, 52965]
    let wrongArtistTitles = ["", null, "null", "Moche", "Ancient Roman", "Unknown", "Artist unknown", "Ancient Egyptian", "Chancay", "Wedgwood Manufactory", "Asante", "Unknown Maker", "Han-Chinese", "Blanc and Demilly", "United States. National Aeronautics & Space Administration", "Unknown artist", "Styria Studio (New York, N.Y.)", "Studio Blue", "Graphic Thought Facility", "Ancient Greek", "Kuna", "The Otolith Group", "Gur", "Ancient Mediterranean", "Knoll International, Inc.", "Paminggir"]
    let wrongClassificationTitles = ["coins"]
    let idList = [184763, 108844, 126834]
    for (let i=0; i<artWork.data.data.length; i++) {
        //console.log(artWork.data.data[i])
        if (wrongArtistTitles.includes(artWork.data.data[i].artist_title)) {
           continue
        } else if (wrongClassificationTitles.includes(artWork.data.data[i].classification_title)) {
            continue
        } else if (sanitise(artWork.data.data[i].id) === NaN) {
            continue
        } else if (artWork.data.data[i].id === "undefined") {
            continue
        } else if (artWork.data.data[i].id === "null") {
            continue
        } else if (wrongIdList.includes(artWork.data.data[i].id)) {
            continue
        } else if (artWork.data.data[i].artist_title === "undefined") {
            continue
        } else {
            idList.push(artWork.data.data[i].id)
        }
    }

    console.log(`wrongIdList: ${wrongIdList}`)
    console.log(`idList: ${idList}`)
    //console.log(wrongIdList)
    //console.log(artWork.data.data[0])

    let randomId = idList[Math.floor(Math.random()*idList.length)]

    

    let randomPage1 = Math.floor(Math.random() * 9975)
    let artWork1 = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${randomPage1}&fields=id,artist_title,artist_titles,classification_title`)
    //console.log(artWork1.data.data[0].id)
    let idList1 = [126834, 108844]
    for (let i=0; i<artWork1.data.data.length; i++) {
        if (wrongArtistTitles.includes(artWork1.data.data[i].artist_title)) {
                continue
            } else if (wrongClassificationTitles.includes(artWork1.data.data[i].classification_title)) {
                continue
            } else if (sanitise(artWork1.data.data[i].id) === NaN) {
                continue
            } else if (artWork1.data.data[i].id === "undefined") {
                continue
            } else if (wrongIdList.includes(artWork1.data.data[i].id)) {
                continue
            } else if (artWork1.data.data[i].id === null) {
                continue
            } else if (artWork1.data.data[i].artist_title === "undefined") {
                continue
            } else {
                idList1.push(artWork1.data.data[i].id)
            }
    }
    //console.log(idList1)
    console.log(`idList1: ${idList1}`)
    let randomId1 = idList1[Math.floor(Math.random()*idList1.length)]


    let randomPage2 = Math.floor(Math.random() * 9975)
    let artWork2 = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${randomPage2}&fields=id,artist_title,artist_titles,classification_title`)
    //console.log(artWork2.data.data[0].id)
    let idList2 = [126834, 108844]
    for (let i=0; i<artWork2.data.data.length; i++) {
        if (wrongArtistTitles.includes(artWork2.data.data[i].artist_title)) {
            continue
        } else if (wrongClassificationTitles.includes(artWork2.data.data[i].classification_title)) {
            continue
        } else if (sanitise(artWork2.data.data[i].id) === NaN) {
            continue
        } else if (artWork2.data.data[i].id === "undefined") {
            continue
        } else if (wrongIdList.includes(artWork2.data.data[i].id)) {
            continue
        } else if (artWork2.data.data[i].id === null) {
            continue
        } else if (artWork2.data.data[i].artist_title === "undefined") {
            continue
        } else {
            idList2.push(artWork2.data.data[i].id)
        }
    }
    //console.log(idList2)
    console.log(`idList2: ${idList2}`)
    let randomId2 = idList2[Math.floor(Math.random()*idList2.length)]


    let randomPage3 = Math.floor(Math.random() * 9975)
    let artWork3 = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${randomPage3}&fields=id,artist_title,artist_titles,classification_title`)
    //console.log(artWork3.data.data[0].id)
    let idList3 = [126834, 108844]
    for (let i=0; i<artWork3.data.data.length; i++) {
        if (wrongArtistTitles.includes(artWork3.data.data[i].artist_title)) {
            continue
        } else if (wrongClassificationTitles.includes(artWork3.data.data[i].classification_title)) {
            continue
        } else if (sanitise(artWork3.data.data[i].id) === NaN) {
            continue
        } else if (artWork3.data.data[i].id === "undefined") {
            continue
        } else if (wrongIdList.includes(artWork3.data.data[i].id)) {
            continue
        } else if (artWork3.data.data[i].id === null) {
            continue
        } else if (artWork3.data.data[i].artist_title === "undefined") {
            continue
        } else {
            idList3.push(artWork3.data.data[i].id)
        }
    }
    //console.log(idList3)
    console.log(`idList3: ${idList3}`)
    let randomId3 = idList3[Math.floor(Math.random()*idList3.length)]
    console.log(randomId)
    console.log(randomId1)
    console.log(randomId2)
    console.log(randomId3)

 
    let artId = randomId
    let wrongId1 = randomId1
    let wrongId2 = randomId2
    let wrongId3 = randomId3

    console.log(artId)
    console.log(wrongId1)
    console.log(wrongId2)
    console.log(wrongId3)


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
    //console.log(imageKey)
    console.log(individualArt.data.data)
    console.log(wrongArtist1.data.data)
    console.log(wrongArtist2.data.data)
    console.log(wrongArtist3.data.data)
    console.log(artistTitle)
    console.log(wrongTitle1)
    console.log(wrongTitle2)
    console.log(wrongTitle3)
    let response = `https://www.artic.edu/iiif/2/${imageKey}/full/250,/0/default.jpg`
    randomArt.innerHTML = `<img src="${response}"/>`
    let multipleChoice = [artistTitle, wrongTitle1, wrongTitle2, wrongTitle3]
    //console.log(multipleChoice)
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
    title.innerText = `"${artTitle}"`
    choiceA.innerText = `${firstChoice}`
    choiceB.innerText = `${secondChoice}`
    choiceC.innerText = `${thirdChoice}`
    choiceD.innerText = `${fourthChoice}`
    choiceA.addEventListener('click', () => {
        playerChoice.style.opacity = "1"
        choiceA.style.backgroundColor = "rgb(181, 232, 253)"
        if (firstChoice === artistTitle) {
        playerChoice.innerText = `You chose ${firstChoice}. That's correct!`
        } else {
            playerChoice.innerText = `You chose ${firstChoice}. The correct answer is ${artistTitle}.`
        }
    })

    choiceB.addEventListener('click', () => {
        playerChoice.style.opacity = "1"
        choiceB.style.backgroundColor = "lightyellow"
        if (secondChoice === artistTitle) {
            playerChoice.innerText = `You chose ${secondChoice}. That's correct!`
        } else {
                playerChoice.innerText = `You chose ${secondChoice}. The correct answer is ${artistTitle}.`
        }
    })

    choiceC.addEventListener('click', () => {
        playerChoice.style.opacity = "1"
        choiceC.style.backgroundColor = "peachpuff"
        if (thirdChoice === artistTitle) {
            playerChoice.innerText = `You chose ${thirdChoice}. That's correct!`
        } else {
                playerChoice.innerText = `You chose ${thirdChoice}. The correct answer is ${artistTitle}.`
        }
    })

    choiceD.addEventListener('click', () => {
        playerChoice.style.opacity = "1"
        choiceD.style.backgroundColor = "rgb(213, 248, 236)"
        if (fourthChoice === artistTitle) {
            playerChoice.innerText = `You chose ${fourthChoice}. That's correct!`
        } else {
                playerChoice.innerText = `You chose ${fourthChoice}. The correct answer is ${artistTitle}.`
        }
    })

}

renderGame()

button.addEventListener('click', renderGame)

