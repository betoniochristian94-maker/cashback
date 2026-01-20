let cashback = 0;

// Elements
const cashbackEl = document.getElementById("cashback");
const withdrawMsg = document.getElementById("withdrawMessage");
const convertResult = document.getElementById("convertedLink");
const linkInput = document.getElementById("linkInput");
const userEl = document.getElementById("user");
const loginBtn = document.getElementById("loginBtn");

// Login (demo)
function login() {
  userEl.textContent = "Welcome Christian Betonio";
  loginBtn.style.display = "none";
  alert("Login successful!");
}

// Add cashback
function addCashback() {
  cashback += 10;
  cashbackEl.textContent = cashback;
}

// Convert link
function convertLink() {
  const link = linkInput.value.trim();
  if (!link) {
    alert("Paste a link first");
    return;
  }
  convertResult.textContent = link + "?ref=cashbacker";
}

// Withdraw
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
