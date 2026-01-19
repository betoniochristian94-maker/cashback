// ============================
// Simulated Cashback App JS
// ============================

// Initial cashback
let cashback = parseInt(localStorage.getItem("cashback") || 0);

// Elements
const cashbackEl = document.getElementById("cashback");
const withdrawMsg = document.getElementById("withdrawMessage");
const convertResult = document.getElementById("convertedLink");
const linkInput = document.getElementById("linkInput");
const userEl = document.getElementById("user");
const loginBtn = document.getElementById("loginBtn");

// ============================
// Helper: Update UI
// ============================
function updateUI() {
  cashbackEl.textContent = cashback;
  
  // Disable withdraw button if cashback <= 0
  const withdrawBtn = document.querySelector(".withdraw");
  withdrawBtn.disabled = cashback <= 0;

  // Clear withdraw message if cashback > 0
  if (cashback > 0) withdrawMsg.textContent = "";

  // Hide login button if user logged in
  if (isLoggedIn()) loginBtn.style.display = "none";
  else loginBtn.style.display = "block";
}

// ============================
// Helper: Check login
// ============================
function isLoggedIn() {
  return !!localStorage.getItem("userName");
}

// ============================
// Global functions
// ============================

// Login (simulated Google login for demo)
window.login = function () {
  const name = prompt("Enter your name to login:", "Christian Betonio");
  if (!name) return;

  localStorage.setItem("userName", name);
  localStorage.setItem("cashback", cashback);

  userEl.textContent = "Welcome " + name;
  updateUI();
};

// Add cashback
window.addCashback = function () {
  if (!isLoggedIn()) {
    alert("⚠️ Please login first.");
    return;
  }

  cashback += 10;
  localStorage.setItem("cashback", cashback);
  cashbackEl.textContent = cashback;

  alert("✅ ₱10 cashback added!");
  updateUI();
};

// Withdraw cashback
window.withdrawCashback = function () {
  if (!isLoggedIn()) {
    alert("⚠️ Please login first.");
    return;
  }

  if (cashback <= 0) {
    withdrawMsg.textContent = "No cashback to withdraw!";
    return;
  }

  alert(`💸 You withdrew ₱${cashback}!`);
  cashback = 0;
  localStorage.setItem("cashback", cashback);
  updateUI();
};

// Convert link
window.convertLink = function () {
  if (!isLoggedIn()) {
    alert("⚠️ Please login first.");
    return;
  }

  const link = linkInput.value.trim();
  if (!link) {
    alert("⚠️ Please paste a shopping link first.");
    return;
  }

  const converted = link + "?ref=cashbacker";
  convertResult.textContent = "Converted Link: " + converted;

  alert("✅ Link converted successfully!");
};

// ============================
// On load
// ============================
window.onload = function () {
  // Load user name if already logged in
  const name = localStorage.getItem("userName");
  if (name) {
    userEl.textContent = "Welcome " + name;
  }

  // Load cashback
  cashback = parseInt(localStorage.getItem("cashback") || 0);
  updateUI();
};
