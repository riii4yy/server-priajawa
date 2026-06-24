// =========================
// SERVER PRIA JAWA
// =========================

const SERVER_ID = "1455762620907913409";

// Loader
window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.opacity = "0";

        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 500);

    }, 1500);

});

// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

// =========================
// NAVBAR SCROLL
// =========================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }

});

// =========================
// FAQ ACCORDION
// =========================

const faqQuestions =
document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const answer =
        question.nextElementSibling;

        if(answer.style.maxHeight){

            answer.style.maxHeight = null;
            answer.style.padding = "0 10px";

        }else{

            answer.style.maxHeight =
            answer.scrollHeight + "px";

            answer.style.padding =
            "20px";

        }

    });

});

// =========================
// MUSIC
// =========================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");

let playing = false;

musicBtn.addEventListener("click", () => {

    if(!playing){

        music.play();

        musicBtn.innerHTML =
            "🔊 Musik ON";

        playing = true;

    }else{

        music.pause();

        musicBtn.innerHTML =
            "🔇 Musik OFF";

        playing = false;

    }

});

// =========================
// FADE ANIMATION
// =========================

const fadeElements = document.querySelectorAll(
    ".rule-card, .staff-card, .stat-card"
);

fadeElements.forEach(el => {
    el.classList.add("fade");
});

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

fadeElements.forEach(el => observer.observe(el));

// =========================
// DISCORD STATS
// =========================

async function loadDiscordStats(){

    try{

        const response = await fetch(
            `https://discord.com/api/guilds/${SERVER_ID}/widget.json`
        );

        const data = await response.json();

        document.getElementById("online").innerText =
            data.presence_count || "--";

        document.getElementById("members").innerText =
            data.members?.length || "--";

    }catch(error){

        document.getElementById("online").innerText = "--";
        document.getElementById("members").innerText = "--";

    }

}

loadDiscordStats();
