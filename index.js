import greenCardsData from "./data/mythicCards/green/greenIndex.js"
import blueCardsData from "./data/mythicCards/blue/blueIndex.js"
import brownCardsData from "./data/mythicCards/brown/brownIndex.js"

const ancients = document.querySelector('.ancient-card')
const difficulty = document.querySelector('.difficulty')
const shuffleBtn = document.querySelector('.shuffle-button')
const deck = document.querySelector('.deck')
const lastCard = document.querySelector('.last-card')
const brownDot = document.querySelector('.brown')
const blueDot = document.querySelector('.blue')
const currState = document.querySelector('.current-state')
const startAgain = document.querySelector('.start-again')

const numbers = []
const greenCards = []
const brownCards = []
const blueCards = []
const stage1 = []
const stage2 = []
const stage3 = []

let clicksNum = 0

startAgain.addEventListener('click',reload)
function reload() {
    window.location.reload()
}

ancients.addEventListener('click', startGame)

function startGame() {
    ancients.classList.add('active')
    currState.style.display = 'block'
    numbers.length = 0;
    if (ancients.classList.contains('active')) {
    difficulty.classList.remove('hidden')
    difficulty.addEventListener('click', activeDiffic)
    } else {difficulty.classList.add('hidden')}
}

function activeDiffic() {
    if (difficulty.classList.contains('active')) {
        shuffleBtn.classList.remove('hidden')
        shuffleBtn.addEventListener('click',activeShuffle)
    } else { shuffleBtn.classList.add('hidden') }
}

function activeShuffle() {
    deck.classList.remove('hidden')
    deckClick()
}

shuffleBtn.addEventListener('click', hiddenBtn)

function hiddenBtn() {
    if (shuffleBtn.classList != 'hidden') {
        shuffleBtn.classList.add('hidden')
    }
}
                    // Счётчик нажатий на колоду //

function deckClick() {
    deck.addEventListener('click', (event) => {
        clicksNum += 1;
        if (clicksNum > 0 && clicksNum < 5) {setDeckCard()}
        else if (clicksNum > 4 && clicksNum < 9) {setDeckCard()}
        else if (clicksNum > 8 && clicksNum < 16) {setDeckCard()}
        else if (clicksNum > 15) {startAgain.style.display = 'block';currState.style.display = 'none';deck.classList.add('hidden'), difficulty.classList.add('hidden'), ancients.classList.remove('active')}
    })
}
                // Отбираем рандомно нужное количество карт по цветам //

for (let i=1; i<5; i++) {
    greenCards.push(greenCardsData[getRandomNum(1,18)] ) 
}
for (let i=1; i<10; i++) {
    brownCards.push(brownCardsData[getRandomNum(1,21)]);
}
for (let i=1; i<3; i++) {
    blueCards.push(blueCardsData[getRandomNum(1,12)]);
}
        // Формируем колоды на каждую стадию //
                // Первая стадия //
for (let i=1; i<3; i++) {
    stage1.push(blueCards.pop(),brownCards.pop())
}
                // Вторая стадия //
for (let i=1; i<2; i++) {
    stage2.push(greenCards.pop(), brownCards.pop())
}
for (let i=1; i<3; i++) {
    stage2.push(brownCards.pop())
}
                // Третья стадия //
for (let i=1; i<4; i++) {
    stage3.push(greenCards.pop(), brownCards.pop())
}
for (let i=1; i<2; i++) {
    stage3.push(brownCards.pop())
}

                    // Достаём карту из колоды по стадиям //
function setDeckCard() {
    randomShuffle(stage1)
    randomShuffle(stage2)
    randomShuffle(stage3)
    const img = new Image();
    if (clicksNum > 0 && clicksNum < 5) {img.src = stage1.pop().cardFace;}
    else if (clicksNum > 4 && clicksNum < 9) {img.src = stage2.pop().cardFace;}
    else if (clicksNum > 8 && clicksNum < 16) {img.src = stage3.pop().cardFace;}
   
    console.log(img.src);
        img.onload = () => {
        lastCard.style.backgroundImage = `url(${img.src})`;
        }
}
                        // Выбираем рандомное число без повтора //
function getRandomNum(min, max) {
  const number = Math.floor(min + Math.random() * (max - min))
  if (numbers.includes(number)) return getRandomNum(min, max)
  else {
        numbers.push(number)
    return number
  }
}

                        // Функция перемешивания колод стадий //
function randomShuffle(arr) {
    return arr.map(i=>[Math.random(),i]).sort().map(i=>i[1]);
}

console.log('карты 1 стадии: ',stage1);
console.log('перемешанные карты 1 стадии: ',randomShuffle(stage1));
console.log('карты 2 стадии: ',stage2);
console.log('перемешанные карты 2 стадии: ',randomShuffle(stage2));
console.log('карты 3 стадии: ',stage3);
console.log('перемешанные карты 3 стадии: ',randomShuffle(stage3));
 // if (clicksNum > 0 && clicksNum < 3) {firstDeckBrown()}
        // else if (clicksNum > 2 && clicksNum < 5) {firstDeckBlue()}
        // else if (clicksNum > 4 && clicksNum < 6) {secondDeckGreen()}
        // else if (clicksNum > 5 && clicksNum < 9) {secondDeckBrown()}
        // else if (clicksNum > 8 && clicksNum < 12) {thirdDeckGreen()}
        // else if (clicksNum > 11 && clicksNum < 16) {thirdDeckBrown()}

// function firstDeckCard() {
//     const img = new Image();
//     img.src = `./assets/MythicCards/brown/brown${brownCardsNum[clicksNum-1]}.png`;
//     img.onload = () => {
//     lastCard.style.backgroundImage = `url(${img.src})`;
//     }
// }

// function firstDeckBrown() {
//     const img = new Image();
//         img.src = `./assets/MythicCards/brown/brown${brownCardsNum[clicksNum-1]}.png`;
//     img.onload = () => {
//         lastCard.style.backgroundImage = `url(${img.src})`;
//     }
//     console.log("brownCard: ",brownCardsNum[clicksNum-1]);
// }
// function firstDeckBlue() {
//     const img = new Image();
//         img.src = `./assets/MythicCards/blue/blue${blueCardsNum[clicksNum-3]}.png`;
//         img.onload = () => {
//             lastCard.style.backgroundImage = `url(${img.src})`;
//         }
//         console.log("bluenCard: ",blueCardsNum[clicksNum-3]);
// }

// function secondDeckGreen() {
//     const img = new Image();
//         img.src = `./assets/MythicCards/green/green${greenCardsNum[clicksNum-5]}.png`;
//         img.onload = () => {
//             lastCard.style.backgroundImage = `url(${img.src})`;
//         }
//         console.log("greenCard: ",greenCardsNum[clicksNum-5]);
// }

// function secondDeckBrown() {
//     const img = new Image();
//         img.src = `./assets/MythicCards/brown/brown${brownCardsNum[clicksNum-4]}.png`;
//         img.onload = () => {
//             lastCard.style.backgroundImage = `url(${img.src})`;
//         }
//         console.log("brownCard: ",brownCardsNum[clicksNum-4]);
// }

// function thirdDeckGreen() {
//     const img = new Image();
//         img.src = `./assets/MythicCards/green/green${greenCardsNum[clicksNum-8]}.png`;
//         img.onload = () => {
//             lastCard.style.backgroundImage = `url(${img.src})`;
//         }
//         console.log("greenCard: ",greenCardsNum[clicksNum-8]);
// }

// function thirdDeckBrown() {
//     const img = new Image();
//         img.src = `./assets/MythicCards/brown/brown${brownCardsNum[clicksNum-8]}.png`;
//         img.onload = () => {
//             lastCard.style.backgroundImage = `url(${img.src})`;
//         }
//         console.log("brownCard: ",brownCardsNum[clicksNum-8]);
// }


                // Создаём колоды определённых цветов с рандомно выбранными картами //

// let greenCardsNum = [];
// let brownCardsNum = [];
// let blueCardsNum = [];
//     for (let i=1; i<5; i++) {
//         let greenNum = getRandomNum(1,18).toString();
//         greenCardsNum.push(greenNum);
//     }
//     for (let i=1; i<10; i++) {
//         let brownNum = getRandomNum(1,21).toString();
//         brownCardsNum.push(brownNum);
//     }
//     for (let i=1; i<3; i++) {
//         let bluenNum = getRandomNum(1,12).toString();
//         blueCardsNum.push(bluenNum);
//     }




