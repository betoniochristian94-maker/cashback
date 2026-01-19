import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";  
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";  

const firebaseConfig = {  
  apiKey: "AIzaSyCLJQckahuisNfW9qd-cqlYKiTHUtD8MHw",  
  authDomain: "cashback-clean.firebaseapp.com",  
  projectId: "cashback-clean",  
  appId: "1:957439708934:web:48f146e1ecc791a1a55887"  
};  

const app = initializeApp(firebaseConfig);  
const auth = getAuth(app);  
const provider = new GoogleAuthProvider();  

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

window.login = async function () {  
  try {  
    const result = await signInWithPopup(auth, provider);  
    const user = result.user;  

    localStorage.setItem("userName", user.displayName);  
    localStorage.setItem("cashback", localStorage.getItem("cashback") || 0);  

    document.getElementById("user").innerText = "Welcome " + user.displayName;  
    document.getElementById("cashback").innerText = localStorage.getItem("cashback");  

    updateUI();  
  } catch (error) {  
    alert(error.message);  
  }  
};  

window.addCashback = function () {  
  let current = parseInt(localStorage.getItem("cashback") || 0);  
  current += 10;  
  localStorage.setItem("cashback", current);  
  document.getElementById("cashback").innerText = current;  
};  

window.withdrawCashback = function () {  
  let current = parseInt(localStorage.getItem("cashback") || 0);  

  if (current <= 0) {  
    document.getElementById("withdrawMessage").innerText = "No cashback to withdraw!";  
    return;  
  }  

  localStorage.setItem("cashback", 0);  
  document.getElementById("cashback").innerText = 0;  
  document.getElementById("withdrawMessage").innerText = "You withdrew ₱" + current;  
};  

window.convertLink = function () {  
  const input = document.getElementById("linkInput").value;  
  if (!input) {  
    alert("Please paste a link first");  
    return;  
  }  

  const converted = "https://s.shopee.ph/demo?ref=cashback";  
  document.getElementById("convertedLink").innerText = "Converted Link: " + converted;  
};  

window.onload = function () {  
  const name = localStorage.getItem("userName");  
  const cashback = localStorage.getItem("cashback") || 0;  

  if (name) {  
    document.getElementById("user").innerText = "Welcome " + name;  
    document.getElementById("cashback").innerText = cashback;  
  }  

  updateUI();  
};
