document.addEventListener("DOMContentLoaded", () => {

  // 🛒 Affiliate links
  const SHOPEE_AFFILIATE_LINK = "https://s.shopee.ph/AABBJBucdn";
  const TIKTOK_AFFILIATE_LINK = "https://vt.tiktok.com/PHLCCP7L9B/";

  // 🔑 Firebase config (replace placeholders with your actual project values)
  const firebaseConfig = {
    apiKey: "AIzaSyAxSyj6mPU4oWVmRdH_bUTky7j7A8TMWQw",
    authDomain: "cashbacker-52a60.firebaseapp.com",
    projectId: "cashbacker-52a60",
    storageBucket: "cashbacker-52a60.appspot.com",
    messagingSenderId: "971010772824",
    appId: "1:971010772824:web:27b1a47eaf460d2f94df2d"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  // DOM Elements
  const loginBtn = document.getElementById("loginBtn");
  const linkInput = document.getElementById("linkInput");
  const convertBtn = document.getElementById("convertBtn");
  const convertResult = document.getElementById("convertedLink");
  const cashbackEl = document.getElementById("cashback");
  const withdrawBtn = document.getElementById("withdrawBtn");
  const withdrawMsg = document.getElementById("withdrawMessage");
  const userEl = document.getElementById("user");
  const clicksEl = document.getElementById("clicks");

  let currentUser = null;

  // 🔹 Update Dashboard
  function updateDashboard() {
    cashbackEl.textContent = currentUser ? currentUser.balance : 0;
    clicksEl.textContent = currentUser ? currentUser.clicks : 0;
  }

  // 🔹 Persistent login
  auth.onAuthStateChanged(user => {
    if(user) {
      const uid = user.uid;
      currentUser = { id: uid, name: user.displayName, balance:0, clicks:0 };
      userEl.textContent = `Welcome ${user.displayName}`;
      loginBtn.style.display = "none";

      db.collection("users").doc(uid).get().then(doc => {
        if(doc.exists) currentUser = doc.data();
        updateDashboard();
      });
    } else {
      loginBtn.style.display = "block";
      currentUser = null;
      updateDashboard();
    }
  });

  // 🔹 Google login
  loginBtn.addEventListener("click", () => {
    auth.signInWithPopup(provider)
      .catch(err => {
        console.error(err);
        alert("Login failed");
      });
  });

  // 🔹 Convert affiliate link
  convertBtn.addEventListener("click", () => {
    if(!currentUser){ alert("Please login first"); return; }

    const link = linkInput.value.trim().toLowerCase();
    if(!link){ alert("Paste a Shopee or TikTok link"); return; }

    let converted = "";
    if(link.includes("shopee")) converted = SHOPEE_AFFILIATE_LINK;
    else if(link.includes("tiktok")) converted = TIKTOK_AFFILIATE_LINK;
    else { alert("Only Shopee or TikTok links supported"); return; }

    currentUser.clicks += 1;
    currentUser.balance += 10; // demo points, change per logic
    updateDashboard();

    // Save to Firebase
    db.collection("users").doc(currentUser.id).set(currentUser)
      .then(() => console.log("Click recorded in Firebase"))
      .catch(err => console.error(err));

    // Show converted link
    convertResult.innerHTML = `
      <a href="${converted}" target="_blank" style="display:block;font-weight:bold;word-break:break-all;">
        👉 Open Affiliate Link
      </a>
      <p class="small">
        Make sure to checkout after clicking this link to track commission.
      </p>
    `;
  });

  // 🔹 Withdraw request (demo)
  withdrawBtn.addEventListener("click", () => {
    if(!currentUser){ alert("Please login first"); return; }
    if(currentUser.balance <= 0){ withdrawMsg.textContent = "No balance"; return; }

    const code = prompt("Enter admin code:");
    if(code !== "1234"){ alert("Authorization failed"); return; }

    alert("Withdraw approved (demo)");
    currentUser.balance = 0;
    updateDashboard();
    withdrawMsg.textContent = "Withdraw approved";

    db.collection("users").doc(currentUser.id).set(currentUser);
  });

  updateDashboard();

});
