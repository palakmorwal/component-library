//preloader animation start//
function startLoader() {
    let counterElement = document.querySelector(".count p");
    let currentValue = 0;

    function updateCounter() {
        if (currentValue < 100) {
            let increment = Math.floor(Math.random() * 10) + 1;
            currentValue = Math.min(currentValue + increment, 100);
            counterElement.textContent = currentValue;

            let delay = Math.floor(Math.random() * 200) + 25;
            setTimeout(updateCounter, delay);
        }
    }

    updateCounter();
}

startLoader();
gsap.to(".count", { opacity: 0, delay: 3.5, duration: 0.5 });

let textWrapper = document.querySelector(".ml16");
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: false })
    .add({
        targets: '.ml16 .letter',
        translateY: [-100, 0],
        easing: "easeOutExpo",
        duration: 1500,
        delay: (el, i) => 30 * i
    })
    .add({
        targets: '.ml16 .letter',
        translateY: [0, 100],
        easing: "easeOutExpo",
        duration: 3000,
        delay: (el, i) => 2000 + 30 * i
    });

gsap.to(".pre-loader", {
    scale: 0.5,
    ease: "power4.inOut",
    duration: 2,
    delay: 3
});

gsap.to(".loader", {
    height: "0",
    ease: "power4.inOut",
    duration: 1.5,
    delay: 3.75
});

gsap.to(".loader-bg", {
    height: "0",
    ease: "power4.inOut",
    duration: 1.5,
    delay: 4
});

gsap.to(".loader-2", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    ease: "power4.inOut",
    duration: 1.5,
    delay: 3.5
});

gsap.from(".intro .header h1", {
    y: 200,
    ease: "power4.inOut",
    duration: 1.5,
    delay: 3.75,
    stagger: 0.05
});

gsap.to(".intro .img", {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ease: "power4.inOut",
    duration: 1.5,
    delay: 4.5,
    stagger: 0.25
});


//preloader animation end//


// sticky cards scroll animation// 

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const cards = document.querySelectorAll(".sticky-cards .card");
    const totalCards = cards.length;
    const segmentSize = 1 / totalCards;

    const cardYOffset = 5;
    const cardScaleSetup = 0.075;

    cards.forEach((card, i) => {
        gsap.set (card, {
            xPercent: -50,
            yPercent: -50 + i * cardYOffset,
            scale: 1 - i * cardScaleSetup
        });
    });

    ScrollTrigger.create({
        trigger: ".sticky-cards",
        start: "top top",
        end: `+=${window.innerHeight * 8}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;

            const activeIndex = Math.min( Math.floor(progress / segmentSize), totalCards - 1,
            );
            const segProgress = (progress - activeIndex * segmentSize) / segmentSize;

            cards.forEach((card, i) => {
                if (i < activeIndex) {
                    gsap.set(card, {
                        yPercent: -250,
                        rotationX: 35,
                    });
                } else if (i === activeIndex) {
                    gsap.set(card, {
                        yPercent: gsap.utils.interpolate(-50, -200, segProgress),
                        rotationX: gsap.utils.interpolate(0, 35, segProgress),
                        scale: 1,
                    });
                } else {
                    const behindIndex = i - activeIndex;
                    const currentYOffset = (behindIndex - segProgress) * cardYOffset;
                    const currentScale = 1 - (behindIndex - segProgress) * cardScaleSetup;

                    gsap.set(card, {
                        yPercent: -50 + currentYOffset,
                        rotationX: 0,
                        scale: currentScale,
                    });
                }
            });
        },
    });
});

//stick card animation end//