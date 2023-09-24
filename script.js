const elements = {
    randomArt: document.querySelector('#artImage'),
    button: document.querySelector('button'),
    title: document.querySelector('h4'),
    choices: Array.from(document.querySelectorAll('.choice')),
    playerChoice: document.getElementById("playerChoice"),
    img: document.querySelector(".backgroundImg"),
    h1: document.querySelector("h1"),
    h2: document.querySelector("h2"),
};

let points = 0;
let rounds = 0;
let currentArtist = "";

document.addEventListener("DOMContentLoaded", init);

function init() {
    resetGame();
    elements.button.addEventListener('click', startGame);
    addChoiceEventListeners();
}

function resetGame() {
    points = 0;
    rounds = 0;
    elements.choices.forEach(choice => choice.style.backgroundColor = "whitesmoke");
    elements.button.innerText = "Start quiz";
    elements.img.src = "https://img.theculturetrip.com/wp-content/uploads/2016/08/tct-aic-2.png";
    elements.h1.innerText = "Guess the Artist";
    elements.h2.innerText = "Can you guess the artist for each of these works of art?";
}

async function startGame() {
    if (rounds === 5) {
        returnScore(points);
        return;
    }
    
    rounds++;
    let randomPage = Math.floor(Math.random() * 100);
    let artWork = await axios.get(`https://api.artic.edu/api/v1/artworks/search?&query[match][artwork_type_title]=Painting&page=${randomPage}`);
    let artWorkData = artWork.data.data;
    let randomArtwork = artWorkData[Math.floor(Math.random() * 5)];
    currentArtist = randomArtwork.artist_title;

    // Display the artwork and choices
    let randomImageId = randomArtwork.image_id;
    elements.randomArt.src = `https://www.artic.edu/iiif/2/${randomImageId}/full/300,300/0/default.jpg`;
    elements.img.src = elements.randomArt.src;

    // Randomize the choices
    let artists = [currentArtist, ...getThreeRandomArtists(artWorkData)];
    shuffleArray(artists);
    elements.choices.forEach((choice, index) => {
        choice.innerText = artists[index];
    });
}

function addChoiceEventListeners() {
    elements.choices.forEach(choice => {
        choice.addEventListener('click', function() {
            checkChoice(choice);
        });
    });
}

function checkChoice(choice) {
    if (choice.innerText === currentArtist) {
        points++;
        elements.playerChoice.innerText = "That's correct!";
    } else {
        elements.playerChoice.innerText = `Incorrect. The correct answer is ${currentArtist}`;
    }
    startGame();
}

function returnScore(num) {
    let percentCorrect = (num / 5) * 100;
    elements.h1.innerText = "Great job!";
    elements.h2.innerText = `You got ${num} points! You got ${percentCorrect}% correct!`;
    // Additional logic to display the score and reset the game
}

function getThreeRandomArtists(artWorkData) {
    let artists = artWorkData.map(art => art.artist_title);
    let result = [];
    for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * artists.length);
        result.push(artists[randomIndex]);
        artists.splice(randomIndex, 1);
    }
    return result;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}