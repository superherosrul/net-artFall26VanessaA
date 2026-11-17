const canvas = document.getElementById('Confetti');
const contex = canvas.getContext('2d');
const celebrate = document.getElementById('celebrate');

let particles = [];
const colors = ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#1dd1a1','#ffffff'];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize',resize);
resize();

class Confetti {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 14;
        this.speedY = Math.random() * -12 - 4;
        this.gravity = 0.35;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.opacity = 1;
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.opacity -= 0.008;
    }

    draw() {
        contex.save();
        contex.globalAlpha = Math.max(this.opacity, 0);
        contex.translate(this.x, this.y);
        contex.rotate((this.rotation * Math.PI) / 180);
        contex.fillStyle = this.color;
        contex.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
        contex.restore();
    }
}

function createBurst(x, y, count = 80) {
    for (let i = 0; i < count; i++) {
        particles.push(new Confetti(x, y));
    }
}

function animateConfetti() {
    contex.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter((p) => p.opacity > 0 && p.y < canvas.height + 20);

    for (const p of particles) {
        p.update();
        p.draw();
    }
    requestAnimationFrame(animateConfetti);
}

function spawnBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = Math.random() * 95 + 'vw';
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDuration = Math.random() * 4 + 6 + 's';
    document.body.appendChild(balloon);

    setTimeout(() => {
        balloon.remove();
    }, 10000);
}

window.addEventListener('load', () => {
    createBurst(window.innerWidth / 2, window.innerHeight / 2, 120);
    setInterval(spawnBalloon, 900);
});

celebrate.addEventListener('click', (e) => {
    e.stopPropagation();
    createBurst(window.innerWidth / 2, window.innerHeight / 2, 100);
});

document.body.addEventListener('click', (e) => {
  createBurst(e.clientX, e.clientY, 60);
});

animateConfetti();