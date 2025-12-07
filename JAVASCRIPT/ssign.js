// Snow Animation
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


// Form Validation + Redirect
document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let pass = document.getElementById("password");
    let confirm = document.getElementById("confirmPassword");

    let valid = true;

    // Name
    if (name.value.trim() === "") {
        document.getElementById("nameError").classList.remove("d-none");
        valid = false;
    } else document.getElementById("nameError").classList.add("d-none");

    // Email
    if (!email.value.includes("@")) {
        document.getElementById("emailError").classList.remove("d-none");
        valid = false;
    } else document.getElementById("emailError").classList.add("d-none");

    // Password
    if (pass.value.length < 6) {
        document.getElementById("passError").classList.remove("d-none");
        valid = false;
    } else document.getElementById("passError").classList.add("d-none");

    // Confirm
    if (confirm.value !== pass.value) {
        document.getElementById("confirmError").classList.remove("d-none");
        valid = false;
    } else document.getElementById("confirmError").classList.add("d-none");

    // On Success
if (valid) {
    let username = email.value.split("@")[0];

    // Create user object
    let user = {
        name: name.value,
        email: email.value,
        password: pass.value
    };

    // Save in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    alert("Welcome " + username + "! Your account has been created.");

    window.location.href = "login.html";
}

});