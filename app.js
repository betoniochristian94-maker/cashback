// ================================
// Firebase Imports
// ================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// ================================
// Firebase Config (SA IYO NA ITO)
// ================================
const firebaseConfig = {
  apiKey: "AIzaSyAxSyj6mPU4oWVmRdH_bUTky7j7j7A8TMWQw",
  authDomain: "cashbacker-52a60.firebaseapp.com",
  projectId: "cashbacker-52a60",
  storageBucket: "cashbacker-52a60.firebasestorage.app",
  messagingSenderId: "971010772824",
  appId: "1:971010772824:web:27b1a47eaf460d2f94df2d"
};

// ================================
// Initialize Firebase
// ================================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ================================
// App State
// ================================
let cashback = 0;

// ================================
// Elements
// ================================
const cashbackEl = document.getElementById("cashback");
const withdrawMsg = document.getElementById("withdrawMessage");
const convertResult = document.getElementById("convertedLink");
const linkInput = document.getElementById("linkInput");
const userEl = document.getElementById("user");
const loginBtn = document.getElementById("loginBtn");

// ================================
// Google Login
// ================================
window.login = function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      userEl.textContent = `Welcome ${user.displayName}`;
      loginBtn.style.display = "none";
      alert("✅ Login successful!");
    })
    .catch((error) => {
      console.error(error);
      alert("❌ Login failed");
    });
};

// ================================
// Auth State Listener
// ================================
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEl.textContent = `Welcome ${user.displayName}`;
    loginBtn.style.display = "none";
  } else {
    userEl.textContent = "";
    loginBtn.style.display = "block";
  }
});

// ================================
// Cashback Functions
// ================================
window.addCashback = function () {
  cashback += 10;
  cashbackEl.textContent = cashback;
};

window.convertLink = function () {
  const link = linkInput.value.trim();
  if (!link) {
    alert("⚠️ Paste a link first");
    return;
  }

  const converted = link + "?ref=cashbacker";
  convertResult.textContent = converted;
};

window.withdrawCashback = function () {
  if (cashback <= 0) {
    withdrawMsg.textContent = "No cashback to withdraw!";
    return;
  }

  alert("💸 Withdrawal request sent!");
  cashback = 0;
  cashbackEl.textContent = cashback;
  withdrawMsg.textContent = "";
};
