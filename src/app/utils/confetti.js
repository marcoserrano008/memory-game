const canvas = document.querySelector('#confetti');
const context = canvas.getContext("2d");
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

const maxConfettis = 50;
const particles = [];
const colors = [
    "DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue",
    "Gold", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"
];

let animationFrameId;

function getRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H - H;
        this.radius = getRandomNumber(11, 33);
        this.density = Math.random() * maxConfettis + 11;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.tilt = getRandomNumber(-11, 22);
        this.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;
    }

    draw() {
        context.beginPath();
        context.lineWidth = this.radius / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.radius / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.radius / 5);
        context.stroke();
    }
}

export function drawConfetti() {
    context.clearRect(0, 0, W, H);
    particles.forEach(particle => {
        particle.draw();
    });

    particles.forEach(particle => {
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.y += (Math.cos(particle.density) + 3 + particle.radius / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;

        if (particle.y > H) {
            particle.x = Math.random() * W;
            particle.y = -30;
            particle.tilt = getRandomNumber(-20, 10);
        }
    });

    animationFrameId = requestAnimationFrame(drawConfetti);
}

export function clearConfetti() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    context.clearRect(0, 0, W, H);
}

function resizeCanvas() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
}

window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < maxConfettis; i++) {
    particles.push(new ConfettiParticle());
}
