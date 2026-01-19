import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";  
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";  

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCLJQckahuisNfW9qd-cqlYKiTHUtD8MHw",
  authDomain: "cashback-clean.firebaseapp.com",
  projectId: "cashback-clean",
  appId: "1:957439708934:web:48f146e1ecc791a1a55887"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Helpers
function isLoggedIn() {
  return !!localStorage.getItem("userName");
}

function updateUI() {
  const logged = isLoggedIn();
  document.querySelector(".add").disabled = !logged;
  document.querySelector(".withdraw").disabled = !logged;
  document.querySelector(".convert").disabled = !logged;
  document.getElementById("loginBtn").style.display = logged ? "none" : "block";
}

// Login
window.login = async function() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("userName", user.displayName);
    localStorage.setItem("cashback", localStorage.getItem("cashback") || 0);
    document.getElementById("user").innerText = "Welcome " + user.displayName;
    document.getElementById("cashback").innerText = localStorage.getItem("cashback");
    updateUI();
  } catch (err) {
    alert(err.message);
  }
}

// Add Cashback
window.addCashback = function() {
  if (!isLoggedIn()) return alert("Please login first");
  let current = parseInt(localStorage.getItem("cashback") || 0);
  current += 10;
  localStorage.setItem("cashback", current);
  document.getElementById("cashback").innerText = current;
}

// Withdraw
window.withdrawCashback = function() {
  if (!isLoggedIn()) return alert("Please login first");
  let current = parseInt(localStorage.getItem("cashback") || 0);
  if (current <= 0) {
    document.getElementById("withdrawMessage").innerText = "No cashback to withdraw!";
    return;
  }
  localStorage.setItem("cashback", 0);
  document.getElementById("cashback").innerText = 0;
  document.getElementById("withdrawMessage").innerText = "You withdrew ₱" + current;
}

// Convert Link (demo)
window.convertLink = function() {
  if (!isLoggedIn()) return alert("Please login first");
  const input = document.getElementById("linkInput").value;
  if (!input) return alert("Please paste a link first");
  const converted = "https://s.shopee.ph/demo?ref=cashback";
  document.getElementById("convertedLink").innerText = "Converted Link: " + converted;
}

// On load
window.onload = function() {
  const name = localStorage.getItem("userName");
  const cashback = localStorage.getItem("cashback") || 0;
  if (name) {
    document.getElementById("user").innerText = "Welcome " + name;
    document.getElementById("cashback").innerText = cashback;
  }
  updateUI();
}
