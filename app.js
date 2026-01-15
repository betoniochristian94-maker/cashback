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

// LOGIN
window.login = async function() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem('userName', user.displayName);
    localStorage.setItem('cashback', localStorage.getItem('cashback') || 0);
    document.getElementById("user").innerText = "Welcome " + user.displayName;
    document.getElementById("cashback").innerText = localStorage.getItem('cashback');
  } catch (error) { alert(error.message); console.error(error); }
};

// ADD CASHBACK
window.addCashback = function() {
  let current = parseInt(localStorage.getItem('cashback') || 0);
  current += 10;
  localStorage.setItem('cashback', current);
  document.getElementById("cashback").innerText = current;
};

// LINK CONVERTER + AUTO CASHBACK
window.convertLink = function() {
  const rawLink = document.getElementById("linkInput").value.trim();
  if(!rawLink) { alert("Please paste a link!"); return; }

  let converted = rawLink;
  if(rawLink.includes("shopee")) converted = rawLink + "?ref=cashback";
  else if(rawLink.includes("lazada")) converted = rawLink + "?ref=cashback";
  else if(rawLink.includes("tiktok")) converted = rawLink + "?ref=cashback";
  else { alert("Only Shopee, Lazada, TikTok links are supported!"); return; }

  document.getElementById("convertedLink").innerHTML =
    `Converted Link: <a href="${converted}" target="_blank">${converted}</a>`;

  let current = parseInt(localStorage.getItem('cashback') || 0);
  current += 5;
  localStorage.setItem('cashback', current);
  document.getElementById("cashback").innerText = current;
  document.getElementById("linkInput").value = "";
};

// WITHDRAW
window.withdrawCashback = function() {
  let current = parseInt(localStorage.getItem('cashback') || 0);
  if(current <= 0){ document.getElementById("withdrawMessage").innerText = "No cashback to withdraw!"; return; }
  localStorage.setItem('cashback', 0);
  document.getElementById("cashback").innerText = 0;
  document.getElementById("withdrawMessage").innerText = `You have withdrawn ₱${current}!`;
};

// LOAD INFO IF LOGGED IN
window.onload = function() {
  const name = localStorage.getItem('userName');
  const cashback = localStorage.getItem('cashback');
  if(name){
    document.getElementById("user").innerText = "Welcome " + name;
    document.getElementById("cashback").innerText = cashback;
  }
};
