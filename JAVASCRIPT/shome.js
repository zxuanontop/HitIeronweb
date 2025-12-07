
const audio = document.getElementById("bgAudio");
const player = document.getElementById("player");
const rotImg = document.getElementById("rotimg");

// Try autoplay
audio.play().catch(() => {});

// Toggle on click
player.addEventListener("click", () => {
    if (audio.paused) {
        // PLAY
        audio.play();
        rotimg.classList.remove("paused");
    } else {
        // PAUSE
        audio.pause();
        rotimg.classList.add("paused");
    }
});

let username = localStorage.getItem("loggedUser");

if (username) {
    document.getElementById("welcomeText").innerText =
        "Bienvenue " + username + " !";
} else {
    document.getElementById("welcomeText").innerText =
        "Bienvenue !";
}

