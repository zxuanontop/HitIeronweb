
// Snow Effect
const canvas = document.querySelector(".snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flakes = [];

function SnowFlake() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.speed = Math.random() * 1 + 0.5;
}

function updateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flakes.forEach(flake => {
        flake.y += flake.speed;
        if (flake.y > canvas.height) flake.y = -5;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    });
    requestAnimationFrame(updateSnow);
}

function initSnow() {
    flakes = [];
    for (let i = 0; i < 150; i++) flakes.push(new SnowFlake());
    updateSnow();
}
initSnow();


// Form Validation
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email");
    let pass = document.getElementById("password");

    let emailError = document.getElementById("emailError");
    let passError = document.getElementById("passError");

    let valid = true;

    if (!email.value.includes("@")) {
        emailError.classList.remove("d-none");
        valid = false;
    } else emailError.classList.add("d-none");

    if (pass.value.length < 6) {
        passError.classList.remove("d-none");
        valid = false;
    } else passError.classList.add("d-none");


if (valid) {

    // Read user from localStorage
    let savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        alert("No account found. Please sign up first.");
        window.location.href = "signup.html";
        return;
    }

    // Check email + password
    if (email.value === savedUser.email && pass.value === savedUser.password) {

        let username = email.value.split("@")[0];

        alert("Hello " + username + "! Login successful.");

        // Save session
        localStorage.setItem("loggedUser", username);

        window.location.href = "../HTML/home.html";

    } else {
        alert("Incorrect email or password.");
    }
}
});

