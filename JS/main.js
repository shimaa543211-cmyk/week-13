// --- Sign Up Function ---
function signUp() {
  let name = document.getElementById("signupName").value.trim();
  let email = document.getElementById("signupEmail").value.trim();
  let password = document.getElementById("signupPassword").value.trim();
  let msg = document.getElementById("signupMsg");

  if (name === "" || email === "" || password === "") {
    msg.innerText = "All fields are required!";
    return;
  }

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    msg.innerText = "Invalid email format!";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let exist = users.find(u => u.email === email);

  if (exist) {
    msg.innerText = "Email already exists!";
    return;
  }

  let newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  msg.style.color = "lightgreen";
  msg.innerText = "Registration successful! Redirecting...";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}

// --- Login Function ---
function login() {
  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();
  let msg = document.getElementById("loginMsg");

  if (email === "" || password === "") {
    msg.innerText = "All fields are required!";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email);

  if (!user) {
    msg.innerText = "User not found!";
    return;
  }

  if (user.password !== password) {
    msg.innerText = "Incorrect password!";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "home.html";
}

// --- Home Page ---
window.onload = function() {
  if (document.getElementById("welcomeMsg")) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      window.location.href = "login.html";
    } else {
      document.getElementById("welcomeMsg").innerText = "Welcome, " + currentUser.name;
    }
  }
}

// --- Logout Function ---
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
