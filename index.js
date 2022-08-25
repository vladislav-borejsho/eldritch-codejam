const ancients = document.querySelector('.ancient-card')
const difficulty = document.querySelector('.difficulty')
const shuffleBtn = document.querySelector('.shuffle-button')
const deck = document.querySelector('.deck')
const lastCard = document.querySelector('.last-card')

ancients.addEventListener('click', activeCard)

function activeCard() {
    ancients.classList.toggle('active')
    difficulty.classList.toggle('hidden')
    difficulty.addEventListener('click', activeDiffic)
}

function activeDiffic() {
    shuffleBtn.classList.toggle('hidden')
    shuffleBtn.addEventListener('click',activeShuffle)
}

function activeShuffle() {
    deck.classList.toggle('hidden')
    deckClick()
}

shuffleBtn.addEventListener('click', hiddenBtn)

function hiddenBtn() {
    if (shuffleBtn.classList != 'hidden') {
        shuffleBtn.classList.add('hidden')
    }
}

                    // Счётчик нажатий на колоду //
let clicksNum = 0;
function deckClick() {
    deck.addEventListener('click', (event) => {
        clicksNum += 1;
        if (clicksNum > 0 && clicksNum < 3) {firstDeckBrown()}
        else if (clicksNum > 2 && clicksNum < 5) {firstDeckBlue()}
        else if (clicksNum > 4 && clicksNum < 6) {secondDeckGreen()}
        else if (clicksNum > 5 && clicksNum < 9) {secondDeckBrown()}
        else if (clicksNum > 8 && clicksNum < 12) {thirdDeckGreen()}
        else if (clicksNum > 11 && clicksNum < 16) {thirdDeckBrown()}
        else if (clicksNum > 15) {lastCard.style.display = 'none', deck.style.display = 'none', difficulty.style.display = 'none', ancients.classList.remove('active')}
        
    })
}

function firstDeckCard() {
    const img = new Image();
    img.src = `./assets/MythicCards/brown/brown${brownCardsNum[clicksNum-1]}.png`;
    img.onload = () => {
    lastCard.style.backgroundImage = `url(${img.src})`;
    }
}

function firstDeckBrown() {
    const img = new Image();
        img.src = `./assets/MythicCards/brown/brown${brownCardsNum[clicksNum-1]}.png`;
    img.onload = () => {
        lastCard.style.backgroundImage = `url(${img.src})`;
    }
    console.log("brownCard: ",brownCardsNum[clicksNum-1]);
}
function firstDeckBlue() {
    const img = new Image();
        img.src = `./assets/MythicCards/blue/blue${blueCardsNum[clicksNum-3]}.png`;
        img.onload = () => {
            lastCard.style.backgroundImage = `url(${img.src})`;
        }
        console.log("bluenCard: ",blueCardsNum[clicksNum-3]);
}

function secondDeckGreen() {
    const img = new Image();
        img.src = `./assets/MythicCards/green/green${greenCardsNum[clicksNum-5]}.png`;
        img.onload = () => {
            lastCard.style.backgroundImage = `url(${img.src})`;
        }
        console.log("greenCard: ",greenCardsNum[clicksNum-5]);
}

function secondDeckBrown() {
    const img = new Image();
        img.src = `./assets/MythicCards/brown/brown${brownCardsNum[clicksNum-4]}.png`;
        img.onload = () => {
            lastCard.style.backgroundImage = `url(${img.src})`;
        }
        console.log("brownCard: ",brownCardsNum[clicksNum-4]);
}

function thirdDeckGreen() {
    const img = new Image();
        img.src = `./assets/MythicCards/green/green${greenCardsNum[clicksNum-8]}.png`;
        img.onload = () => {
            lastCard.style.backgroundImage = `url(${img.src})`;
        }
        console.log("greenCard: ",greenCardsNum[clicksNum-8]);
}

function thirdDeckBrown() {
    const img = new Image();
        img.src = `./assets/MythicCards/brown/brown${brownCardsNum[clicksNum-8]}.png`;
        img.onload = () => {
            lastCard.style.backgroundImage = `url(${img.src})`;
        }
        console.log("brownCard: ",brownCardsNum[clicksNum-8]);
}


                        // Выбираем рандомное число *с повтором //

function getRandomColor(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

                        // Выбираем рандомное число без повтора //
const numbers = []
function getRandomNum(min, max) {
  const number = Math.floor(min + Math.random() * (max - min))
  if (numbers.includes(number)) return getRandomNum(min, max)
  else {
    numbers.push(number)
    return number
  }
}

                // Создаём колоды определённых цветов с рандомно выбранными картами //

let greenCardsNum = [];
let brownCardsNum = [];
let blueCardsNum = [];
    for (let i=1; i<5; i++) {
        let greenNum = getRandomNum(1,18).toString();
        greenCardsNum.push(greenNum);
    }
    for (let i=1; i<10; i++) {
        let brownNum = getRandomNum(1,21).toString();
        brownCardsNum.push(brownNum);
    }
    for (let i=1; i<3; i++) {
        let bluenNum = getRandomNum(1,12).toString();
        blueCardsNum.push(bluenNum);
    }
