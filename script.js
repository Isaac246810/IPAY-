document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("loginScreen");
  const signUpScreen = document.getElementById("signUpScreen");
  const appScreen = document.getElementById("appScreen");
  const goToSignUpLink = document.getElementById("goToSignUp");
  const goToLoginLink = document.getElementById("goToLogin");
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");
  const loginMessage = document.getElementById("loginMessage");
  const signUpMessage = document.getElementById("signUpMessage");
  const loginPhoneInput = document.getElementById("loginPhone");
  const loginPassword = document.getElementById("loginPassword");
  const signUpPhone = document.getElementById("signUpPhone");
  const signUpPassword = document.getElementById("signUpPassword");
  const toggleLoginPassword = document.getElementById("toggleLoginPassword");
  const toggleSignUpPassword = document.getElementById("toggleSignUpPassword");
  const rememberMe = document.getElementById("rememberMe");
  const navButtons = document.querySelectorAll(".nav-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const amountInput = document.getElementById("amountInput");
  const addFundsBtn = document.getElementById("addFundsBtn");
  const transactionsList = document.getElementById("transactions");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const irisChat = document.getElementById("irisChat");

  let balance = 0;
  const users = {}; // In-memory user storage

  // Remember Me
  if (localStorage.getItem("rememberedPhone")) {
    loginPhoneInput.value = localStorage.getItem("rememberedPhone");
    rememberMe.checked = true;
  }

  // Switch screens
  goToSignUpLink.addEventListener("click", () => {
    loginScreen.style.display = "none";
    signUpScreen.style.display = "block";
    loginMessage.innerText = "";
  });

  goToLoginLink.addEventListener("click", () => {
    signUpScreen.style.display = "none";
    loginScreen.style.display = "block";
    signUpMessage.innerText = "";
  });

  // Toggle password visibility
  toggleLoginPassword.addEventListener("click", () => {
    loginPassword.type = loginPassword.type === "password" ? "text" : "password";
    toggleLoginPassword.textContent = toggleLoginPassword.textContent === "Show" ? "Hide" : "Show";
  });
  toggleSignUpPassword.addEventListener("click", () => {
    signUpPassword.type = signUpPassword.type === "password" ? "text" : "password";
    toggleSignUpPassword.textContent = toggleSignUpPassword.textContent === "Show" ? "Hide" : "Show";
  });

  // Sign-Up button
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const phone = signUpPhone.value.trim();
    const password = signUpPassword.value.trim();

    if (!phone || !password) {
      signUpMessage.innerText = "Please enter phone and password.";
      return;
    }
    if (users[phone]) {
      signUpMessage.innerText = "Phone already exists.";
      return;
    }
    users[phone] = { password };
    signUpMessage.innerText = "Account created! You can login.";
    signUpPhone.value = "";
    signUpPassword.value = "";
  });

  // Login button
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const phone = loginPhoneInput.value.trim();
    const password = loginPassword.value.trim();

    if (!phone || !password) {
      loginMessage.innerText = "Enter phone and password.";
      return;
    }

    if (users[phone] && users[phone].password === password) {
      loginMessage.innerText = "Login successful!";
      loginScreen.style.display = "none";
      signUpScreen.style.display = "none";
      appScreen.style.display = "block";

      if (rememberMe.checked) localStorage.setItem("rememberedPhone", phone);
      else localStorage.removeItem("rememberedPhone");
    } else {
      loginMessage.innerText = "Invalid phone or password.";
    }
  });


// Navigation buttons
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      tabContents.forEach((tab) => tab.classList.remove("active"));
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // Wallet add funds
  addFundsBtn.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    if (!amount || amount <= 0) {
      alert("Enter a valid amount.");
      return;
    }
    balance += amount;
    transactionsList.innerHTML += <li>Added ₦${amount.toFixed(2)}</li>;
    amountInput.value = "";
  });

  // IRIS Assistant chat
  chatSend.addEventListener("click", () => {
    const msg = chatInput.value.trim();
    if (!msg) return;
    irisChat.innerHTML += <div class="chat-message chat-user">You: ${msg}</div>;
    chatInput.value = "";
    setTimeout(() => {
      let reply = "IRIS Assistant: I'm here to help you!";
      if (msg.toLowerCase().includes("balance"))
        reply = IRIS Assistant: Your balance is ₦${balance.toFixed(2)};
      irisChat.innerHTML += <div class="chat-message chat-bot">${reply}</div>;
      irisChat.scrollTop = irisChat.scrollHeight;
    }, 500);
  });
});
