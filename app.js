// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAxSyj6mPU4oWVmRdH_bUTky7j7A8TMWQw",
  authDomain: "cashbacker-52a60.firebaseapp.com",
  projectId: "cashbacker-52a60",
  storageBucket: "cashbacker-52a60.firebasestorage.app",
  messagingSenderId: "971010772824",
  appId: "1:971010772824:web:27b1a47eaf460d2f94df2d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// App state
let cashback = 0;

// Elements
const cashbackEl = document.getElementById("cashback");
const withdrawMsg = document.getElementById("withdrawMessage");
const convertResult = document.getElementById("convertedLink");
const linkInput = document.getElementById("linkInput");
const userEl = document.getElementById("user");
const loginBtn = document.getElementById("loginBtn");

// LOGIN WITH GOOGLE
function login() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      userEl.textContent = "Welcome " + user.displayName;
      loginBtn.style.display = "none";
      alert("Login successful!");
    })
    .catch((error) => {
      alert(error.message);
      console.error(error);
    });
}

// Add cashback (demo)
function addCashback() {
  cashback += 10;
  cashbackEl.textContent = cashback;
}

// Convert affiliate link (demo)
function convertLink() {
  const link = linkInput.value.trim();
  if (!link) {
    alert("Paste a link first");
    return;
  }
  convertResult.textContent = link + "?ref=cashbacker";
}

// Withdraw (demo)
function withdrawCashback() {
  if (cashback <= 0) {
    withdrawMsg.textContent = "No cashback to withdraw!";
    return;
  }
  alert("Withdrawal requested!");
  cashback = 0;
  cashbackEl.textContent = cashback;
  withdrawMsg.textContent = "";
}
