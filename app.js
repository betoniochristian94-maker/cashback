// ============================
// Firebase imports
// ============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ============================
// Firebase config
// ============================
const firebaseConfig = {
  apiKey: "AIzaSyCLJQckahuisNfW9qd-cqlYKiTHUtD8MHw",
  authDomain: "cashback-clean.firebaseapp.com",
  projectId: "cashback-clean",
  appId: "1:957439708934:web:48f146e1ecc791a1a55887"
};

// ============================
// Initialize Firebase
// ============================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ============================
// Buttons
// ============================
const addBtn = document.querySelector(".add");
const withdrawBtn = document.querySelector(".withdraw");

// Disable buttons by default
addBtn.disabled = true;
withdrawBtn.disabled = true;

// ============================
// Auth State Listener
// ============================
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Logged in as:", user.displayName);
    addBtn.disabled = false;
    withdrawBtn.disabled = false;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        name: user.displayName,
        cashback: 0,
        createdAt: new Date()
      });
    }

    const userData = (await getDoc(docRef)).data();

    localStorage.setItem('userName', user.displayName);
    localStorage.setItem('cashback', userData.cashback);

    document.getElementById("user").innerText = "Welcome " + user.displayName;
    document.getElementById("cashback").innerText = userData.cashback;

  } else {
    console.log("Not logged in");
    addBtn.disabled = true;
    withdrawBtn.disabled = true;
  }
});

// ============================
// Login function
// ============================
window.login = async function () {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// ============================
// Add Cashback function
// ============================
window.addCashback = async function () {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login first!");
    return;
  }

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  let current = docSnap.data().cashback || 0;
  current += 10;

  await setDoc(docRef, { cashback: current }, { merge: true });

  localStorage.setItem('cashback', current);
  document.getElementById("cashback").innerText = current;
};

// ============================
// Withdraw function
// ============================
window.withdrawCashback = async function () {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login first!");
    return;
  }

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  let current = docSnap.data().cashback || 0;
  if (current <= 0) {
    document.getElementById("withdrawMessage").innerText = "No cashback to withdraw!";
    return;
  }

  await setDoc(docRef, { cashback: 0 }, { merge: true });

  localStorage.setItem('cashback', 0);
  document.getElementById("cashback").innerText = 0;
  document.getElementById("withdrawMessage").innerText = `You withdrew ₱${current}`;
};

// ============================
// Convert Link function (demo placeholder)
// ============================
window.convertLink = function () {
  const input = document.getElementById("linkInput").value;
  if(!input) {
    alert("Please paste a link first!");
    return;
  }
  const converted = "https://s.shopee.ph/demo?ref=cashback"; // Placeholder
  document.getElementById("convertedLink").innerText = "Converted Link: " + converted;
};

// ============================
// Load info if already logged in (local storage fallback)
// ============================
window.onload = function () {
  const name = localStorage.getItem('userName');
  const cashback = localStorage.getItem('cashback');
  if (name) {
    document.getElementById("user").innerText = "Welcome " + name;
    document.getElementById("cashback").innerText = cashback;
  }
};
