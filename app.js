// ============================
// Firebase (AUTH ONLY)
// ============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCLJQckahuisNfW9qd-cqlYKiTHUtD8MHw",
  authDomain: "cashback-clean.firebaseapp.com",
  projectId: "cashback-clean",
  appId: "1:957439708934:web:48f146e1ecc791a1a55887"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ============================
// LOGIN
// ============================
window.login = async function () {
  const result = await signInWithPopup(auth, provider);
  localStorage.setItem("userName", result.user.displayName);
  localStorage.setItem("cashback", localStorage.getItem("cashback") || 0);
  render();
};

// ============================
// ADD CASHBACK (LOCAL ONLY)
// ============================
window.addCashback = function () {
  let current = parseInt(localStorage.getItem("cashback") || 0);
  current += 10;
  localStorage.setItem("cashback", current);
  document.getElementById("cashback").innerText = current;
};

// ============================
// WITHDRAW
// ============================
window.withdrawCashback = function () {
  let current = parseInt(localStorage.getItem("cashback") || 0);
  if (current <= 0) {
    document.getElementById("withdrawMessage").innerText = "No cashback to withdraw";
    return;
  }
  localStorage.setItem("cashback", 0);
  document.getElementById("cashback").innerText = 0;
  document.getElementById("withdrawMessage").innerText = `You withdrew ₱${current}`;
};

// ============================
// CONVERT LINK
// ============================
window.convertLink = function () {
  const input = document.getElementById("linkInput").value;
  if (!input) return alert("Paste a link first");
  document.getElementById("convertedLink").innerText =
    "Converted Link: https://s.shopee.ph/demo?ref=cashback";
};

// ============================
// RENDER
// ============================
function render() {
  const name = localStorage.getItem("userName");
  const cashback = localStorage.getItem("cashback") || 0;

  if (name) {
    document.getElementById("user").innerText = "Welcome " + name;
    document.getElementById("cashback").innerText = cashback;
  }
}

window.onload = render;
