import greenCardsData from "./data/mythicCards/green/greenIndex.js"
import blueCardsData from "./data/mythicCards/blue/blueIndex.js"
import brownCardsData from "./data/mythicCards/brown/brownIndex.js"
import ancientsData from "./data/ancients.js"

const ancients = document.querySelector('.ancient-card')
const difficulty = document.querySelector('.difficulty')
const shuffleBtn = document.querySelector('.shuffle-button')
const deck = document.querySelector('.deck')
const lastCard = document.querySelector('.last-card')
const brownDot1 = document.querySelector('.brown1')
const blueDot1 = document.querySelector('.blue1')
const greenDot1 = document.querySelector('.green1')
const brownDot2 = document.querySelector('.brown2')
const blueDot2 = document.querySelector('.blue2')
const greenDot2 = document.querySelector('.green2')
const brownDot3 = document.querySelector('.brown3')
const blueDot3 = document.querySelector('.blue3')
const greenDot3 = document.querySelector('.green3')
const currState = document.querySelector('.current-state')
const startAgain = document.querySelector('.start-again')
const stageText1 = document.querySelector('.stage-text1')
const stageText2 = document.querySelector('.stage-text2')
const stageText3 = document.querySelector('.stage-text3')

const numbers = []
const greenCards = []
const brownCards = []
const blueCards = []
const stage1 = []
const stage2 = []
const stage3 = []

let colorOfCurrentCard = ''
let clicksNum = 0

startAgain.addEventListener('click',reload)
function reload() {
    window.location.reload()
}

ancients.addEventListener('click', startGame)

function startGame() {
    ancients.classList.add('active')
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
        currState.style.display = 'block';
        setScore()
    }
}
                    // Счётчик нажатий на колоду //

function deckClick() {
    deck.addEventListener('click', (event) => {
        clicksNum += 1;
        if (clicksNum > 0 && clicksNum < 5) {setDeckCard()}
        else if (clicksNum > 4 && clicksNum < 9) {setDeckCard()}
        else if (clicksNum > 8 && clicksNum < 16) {setDeckCard()
        if (clicksNum === 15) {
            startAgain.style.display = 'flex';
            difficulty.classList.add('hidden');
            ancients.classList.remove('active');}}
        else if (clicksNum > 15) {currState.style.display = 'none';deck.classList.add('hidden')}
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
    if (clicksNum > 0 && clicksNum < 5) {

            // Подсчитываем оставшиеся карты в стадиях //
        colorOfCurrentCard=stage1[stage1.length-1].color; 
        if (colorOfCurrentCard === 'brown') {
            brownDot1.textContent --
        } else if (colorOfCurrentCard === 'blue') {
            blueDot1.textContent --
        } else {
            greenDot1.textContent --
        }
        if (clicksNum === 4) {
            stageText1.classList.add('done');
        }
                                //
        img.src = stage1.pop().cardFace;}
    else if (clicksNum > 4 && clicksNum < 9) {

        // Подсчитываем оставшиеся карты в стадиях //
        colorOfCurrentCard=stage2[stage2.length-1].color;
        if (colorOfCurrentCard === 'brown') {
            brownDot2.textContent --
        } else if (colorOfCurrentCard === 'blue') {
            blueDot2.textContent --
        } else {
            greenDot2.textContent --
        }
        if (clicksNum === 8) {
            stageText2.classList.add('done');
        }
                            //
        img.src = stage2.pop().cardFace;}
    else if (clicksNum > 8 && clicksNum < 16) {

               // Подсчитываем оставшиеся карты в стадиях //
        colorOfCurrentCard=stage3[stage3.length-1].color;
        if (colorOfCurrentCard === 'brown') {
            brownDot3.textContent --
        } else if (colorOfCurrentCard === 'blue') {
            blueDot3.textContent --
        } else {
            greenDot3.textContent --
        }
        if (clicksNum === 15) {
            stageText3.classList.add('done');
        }
                            //
        img.src = stage3.pop().cardFace;}
   
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

                        // Создаём счётчик карт //
function setScore() {
    blueDot1.textContent = ancientsData[1].firstStage.blueCards;
    brownDot1.textContent = ancientsData[1].firstStage.brownCards;
    greenDot2.textContent = ancientsData[1].firstStage.greenCards;
    blueDot2.textContent = ancientsData[1].secondStage.blueCards;
    brownDot2.textContent = ancientsData[1].secondStage.brownCards;
    greenDot2.textContent = ancientsData[1].secondStage.greenCards;
    blueDot3.textContent = ancientsData[1].thirdStage.blueCards;
    brownDot3.textContent = ancientsData[1].thirdStage.brownCards;
    greenDot3.textContent = ancientsData[1].thirdStage.greenCards;
}


console.log('Реализовал выбор 1-го древнего, 1 уровень сложности, замешивание колоды согласно правилам игры, трекер текущего состояния колоды = 70 баллов');