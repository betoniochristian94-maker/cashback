// ============================
// Firebase imports
// ============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
// Init Firebase
// ============================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ============================
// GLOBAL USER ID
// ============================
let CURRENT_UID = null;

// ============================
// AUTH STATE LISTENER (IMPORTANT)
// ============================
onAuthStateChanged(auth, async (user) => {
  if (user) {
    CURRENT_UID = user.uid;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        name: user.displayName,
        cashback: 0
      });
    }

    const data = (await getDoc(ref)).data();

    document.getElementById("user").innerText =
      "Welcome " + user.displayName;
    document.getElementById("cashback").innerText =
      data.cashback;

  }
});

// ============================
// LOGIN
// ============================
window.login = async function () {
  await signInWithPopup(auth, provider);
};

// ============================
// ADD CASHBACK
// ============================
window.addCashback = async function () {
  if (!CURRENT_UID) {
    alert("Please login first");
    return;
  }

  const ref = doc(db, "users", CURRENT_UID);
  const snap = await getDoc(ref);
  let current = snap.data().cashback || 0;

  current += 10;

  await setDoc(ref, { cashback: current }, { merge: true });
  document.getElementById("cashback").innerText = current;
};

// ============================
// WITHDRAW
// ============================
window.withdrawCashback = async function () {
  if (!CURRENT_UID) {
    alert("Please login first");
    return;
  }

  const ref = doc(db, "users", CURRENT_UID);
  const snap = await getDoc(ref);
  let current = snap.data().cashback || 0;

  if (current <= 0) {
    document.getElementById("withdrawMessage").innerText =
      "No cashback to withdraw!";
    return;
  }

  await setDoc(ref, { cashback: 0 }, { merge: true });
  document.getElementById("cashback").innerText = 0;
  document.getElementById("withdrawMessage").innerText =
    `You withdrew ₱${current}`;
};

// ============================
// CONVERT LINK
// ============================
window.convertLink = function () {
  const input = document.getElementById("linkInput").value;
  if (!input) {
    alert("Paste a link first");
    return;
  }

  document.getElementById("convertedLink").innerText =
    "Converted Link: https://s.shopee.ph/demo?ref=cashback";
};
