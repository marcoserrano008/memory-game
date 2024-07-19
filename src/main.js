import {drawConfetti} from "./app/utils/confetti.js";

document.addEventListener("DOMContentLoaded", () => {
    sidebarEventListener();
    renderCards();
});

const imgStack = [
    {
        src: "./assets/images/image1.png",
        id: 1,
    },
    {
        src: "./assets/images/image2.png",
        id: 2,
    },
    {
        src: "./assets/images/image3.png",
        id: 3,
    },
    {
        src: "./assets/images/image4.png",
        id: 4,
    },
];

const cards = [...imgStack, ...imgStack.slice(0)];
let lastClickedCard = null;
let matches = 0;
let seconds = 0;
let intervalId = null;
let isTimerStarted = false;
let isProcessing = false;
let auxCard = null;
const minCompletedTime = localStorage.getItem("min-time");

shuffle(cards);

function renderCards() {
    const container = document.getElementById("cardsGrid");
    container.innerHTML = '';

    for (let i = 0; i < cards.length; i++) {
        const item = cards[i];
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.imgId = item.id;

        cardElement.innerHTML = `
            <a class="card-link"></a>
            <div class="card__content">
                <div class="card__content__front"></div>
                <div class="card__content__back">
                    <img
                        class="card__image"
                        src="${item.src}"
                        alt=""
                    />
                </div>
            </div>
        `;

        cardElement.addEventListener('click', handleCard);
        container.appendChild(cardElement);
    }
}

function handleCard(event) {
    initTimer();

    const card = event.target.parentNode;

    if (card.classList.contains("card--flipped")) {
        return;
    }
    card.classList.add("card--flipped");

    if (lastClickedCard) {
        if (card.imgId === lastClickedCard.imgId && !isProcessing) {
            console.log("match");
            cardMatch();
            return;
        }
        cardDoesNotMatch(card);
        return;
    }
    lastClickedCard = card;
}

function cardMatch() {
    matches++;
    lastClickedCard.classList.add("card--flipped");
    lastClickedCard = null;

    if (matches === imgStack.length) {
        endGame();
    }
}

function endGame() {
    if (seconds < minCompletedTime || !minCompletedTime) {
        drawConfetti();
        localStorage.setItem("min-time", seconds);
    }
    clearInterval(intervalId);
}

function cardDoesNotMatch(card) {
    if (!isProcessing) {
        isProcessing = true;
        auxCard = card;
        setTimeout(() => {
            if (isProcessing) {
                auxCard.classList.remove("card--flipped");
                lastClickedCard.classList.remove("card--flipped");
                lastClickedCard = null;
                isProcessing = false;
            }
        }, 1000);
        return;
    }
    auxCard.classList.remove("card--flipped");
    lastClickedCard.classList.remove("card--flipped");
    lastClickedCard = card;
    isProcessing = false;
}

function initTimer() {
    if (!isTimerStarted) {
        intervalId = setInterval(updateTime, 1000);
        isTimerStarted = true;
    }
}

function updateTime() {
    seconds++;
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    document.getElementById("time").textContent = `${String(mins).padStart(
        2,
        "0"
    )}:${String(secs).padStart(2, "0")}`;

    //time in 1/100 secs
    // const secs = Math.floor((seconds % 6000) / 100);
    //   const centSecs = seconds % 100;

    //   document.getElementById("time").textContent = `${String(secs).padStart(
    //     2,
    //     "0"
    //   )}:${String(centSecs).padStart(2, "0")}`;
}

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

function sidebarEventListener() {
    const sidebarMenuButton = document.getElementById("sidebarMenuButton");
    sidebarMenuButton.addEventListener('click', () => {
        console.log('click')
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("active");

        const container = document.getElementById("container");
        container.classList.toggle("sidebar-visible");
        container.classList.toggle("sidebar-hidden");
    })
}
