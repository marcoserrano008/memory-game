document.addEventListener('DOMContentLoaded', (event) => {
    renderButtons();
});

imgStack = [
    {
        src: "111",
        id: 1,
        text: "primero"
    },
    {
        src: "222",
        id: 2,
        text: "second"
    },
    {
        src: "333",
        id: 3,
        text: "third"
    },
    {
        src: "444",
        id: 4,
        text: "four"
    }
]

let clone = imgStack.slice(0);
let cards = imgStack.concat(clone);
let lastClicked = null;
let matches = 0;
let seconds = 0;
let interval = null;

shuffle(cards)

function renderButtons() {
    const container = document.getElementById('container');
    const button = document.createElement('button');
    cards.forEach(img => {
        let buttonClone = button.cloneNode(true);
        buttonClone.classList.add('btn');
        buttonClone.innerText = img.text;
        buttonClone.id = img.id;
        buttonClone.imgId = img.id;
        container.appendChild(buttonClone);
        buttonClone.addEventListener('click', handleButton)
    });

    interval = setInterval(updateTime, 1000);
}

function handleButton(event) {
    const button = event.target;
    button.disabled = true;

    if (button.imgId === lastClicked?.imgId) {
        console.log('Both are same')
        matches++;
        lastClicked.disabled = true;
        lastClicked = null;

        if (matches === imgStack.length) {
            console.log('congrats');
            clearInterval(interval);
        }
        return;
    }

    if (lastClicked !== null) {
        button.disabled = false;
        lastClicked.disabled = false;
        lastClicked = null;
        return;
    }

    lastClicked = button;
}

function updateTime() {
    seconds++;
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    document.getElementById('time').textContent =
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        let aux = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = aux;
    }
    return array;
}