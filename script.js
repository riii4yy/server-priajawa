/* LOADER */

window.addEventListener("load", () => {

const loader =
document.getElementById("loader");

setTimeout(() => {

    loader.style.opacity = "0";

    setTimeout(() => {

        loader.style.display = "none";

    }, 500);

}, 1000);

});

/* NAVBAR SCROLL */

window.addEventListener("scroll", () => {

const navbar =
document.getElementById("navbar");

if(window.scrollY > 50){

    navbar.classList.add("scrolled");

}else{

    navbar.classList.remove("scrolled");

}

});

/* MOBILE MENU */

const menuBtn =
document.getElementById("menuBtn");

const mobileMenu =
document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

mobileMenu.classList.toggle("active");

});

/* FAQ */

const faqQuestions =
document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

question.addEventListener("click", () => {

    const answer =
    question.nextElementSibling;

    if(answer.style.maxHeight){

        answer.style.maxHeight = null;

        answer.style.padding =
        "0 20px";

    }else{

        answer.style.maxHeight =
        answer.scrollHeight + "px";

        answer.style.padding =
        "20px";

    }

});

});

/* MUSIC */

const music =
document.getElementById("bgMusic");

const musicToggle =
document.getElementById("musicToggle");

let playing = false;

music.volume = 0.3;

musicToggle.addEventListener("click", () => {

if(!playing){

    music.play();

    musicToggle.innerHTML =
    "🔇 Musik OFF";

    playing = true;

}else{

    music.pause();

    musicToggle.innerHTML =
    "🎵 Musik ON";

    playing = false;

}

});

/* DISCORD STATS */

const members =
document.getElementById("members");

const online =
document.getElementById("online");

/*
Isi manual dulu.
Nanti bisa diganti API Discord.
*/

members.innerHTML = "100+";

online.innerHTML = "25+";

/* SCROLL ANIMATION */

const observer =
new IntersectionObserver(entries => {

entries.forEach(entry => {

    if(entry.isIntersecting){

        entry.target.classList.add("show");

    }

});

});

document
.querySelectorAll(
".section,.stat-card"
)
.forEach(el => {

el.classList.add("fade");

observer.observe(el);

});