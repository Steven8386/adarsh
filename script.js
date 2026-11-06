
// ==========================================
// ADARSH - CYBERSECURITY PORTFOLIO
// Interactive JavaScript
// ==========================================


// MOBILE NAVIGATION

const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {

    menuIcon.addEventListener("click", () => {

        const isOpen = navbar.classList.toggle("active");

        menuIcon.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

        menuIcon.setAttribute("aria-expanded", isOpen);

    });

}


// CLOSE MOBILE MENU AFTER CLICKING A LINK

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar?.classList.remove("active");

        if (menuIcon) {
            menuIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';
            menuIcon.setAttribute("aria-expanded", "false");
        }

    });

});


// SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("active");
    });

}


// ACTIVE NAVIGATION LINK

const pageSections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar a");

function updateActiveNavigation() {

    let currentSection = "home";

    pageSections.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );

    });

}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();


// CURRENT YEAR IN FOOTER

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


// PARTICLE BACKGROUND

const canvas = document.getElementById("particles");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let particles = [];

    let canvasWidth = 0;
    let canvasHeight = 0;

    let animationFrame;


    // RESIZE CANVAS

    function resizeCanvas() {

        const pixelRatio = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;

        canvas.width = canvasWidth * pixelRatio;
        canvas.height = canvasHeight * pixelRatio;

        ctx.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );

        createParticles();

    }


    // PARTICLE CLASS

    class Particle {

        constructor() {

            this.x = Math.random() * canvasWidth;
            this.y = Math.random() * canvasHeight;

            this.size = Math.random() * 1.8 + 0.5;

            this.speedX = (Math.random() - 0.5) * 0.35;
            this.speedY = (Math.random() - 0.5) * 0.35;

            this.opacity = Math.random() * 0.5 + 0.15;

        }


        update() {

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvasWidth) {
                this.speedX *= -1;
            }

            if (this.y < 0 || this.y > canvasHeight) {
                this.speedY *= -1;
            }

        }


        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(0, 229, 255, ${this.opacity})`;

            ctx.fill();

        }

    }


    // CREATE PARTICLES

    function createParticles() {

        const particleCount = Math.min(
            Math.floor((canvasWidth * canvasHeight) / 12000),
            100
        );

        particles = [];

        for (let i = 0; i < particleCount; i++) {

            particles.push(new Particle());

        }

    }


    // CONNECT NEARBY PARTICLES

    function connectParticles() {

        for (let i = 0; i < particles.length; i++) {

            for (let j = i + 1; j < particles.length; j++) {

                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (distance < 110) {

                    ctx.beginPath();

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );

                    ctx.strokeStyle =
                        `rgba(0, 229, 255, ${0.12 * (1 - distance / 110)})`;

                    ctx.lineWidth = 0.6;

                    ctx.stroke();

                }

            }

        }

    }


    // ANIMATION LOOP

    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            canvasWidth,
            canvasHeight
        );

        particles.forEach(particle => {

            particle.update();
            particle.draw();

        });

        connectParticles();

        animationFrame = requestAnimationFrame(animateParticles);

    }


    // INITIALIZE

    resizeCanvas();
    animateParticles();


    // HANDLE WINDOW RESIZE

    let resizeTimeout;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(resizeCanvas, 150);

    });


    // PAUSE ANIMATION WHEN TAB IS HIDDEN

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            cancelAnimationFrame(animationFrame);

        } else {

            animateParticles();

        }

    });

}


// EMAIL BUTTON

const emailAddress = "5011786.adarsh@gmail.com";

const emailLinks = document.querySelectorAll(
    'a[href^="mailto:"]'
);

emailLinks.forEach(link => {

    link.href = `mailto:${emailAddress}`;

});


// CONSOLE MESSAGE

console.log(
    "%c ADARSH | CYBERSECURITY PORTFOLIO ",
    "background:#00e5ff;color:#050711;padding:10px;font-weight:bold;font-size:14px;"
);

console.log(
    "Portfolio interface initialized successfully."
);
