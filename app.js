// ======================
// STATE
// ======================
let cashback = 0;

// ======================
// ELEMENTS
// ======================
const cashbackEl = document.getElementById("cashback");
const withdrawMsg = document.getElementById("withdrawMessage");
const convertResult = document.getElementById("convertedLink");
const linkInput = document.getElementById("linkInput");
const userEl = document.getElementById("user");
const loginBtn = document.getElementById("loginBtn");

// ======================
// LOGIN (DEMO)
// ======================
window.login = function () {
  userEl.textContent = "Welcome Christian Betonio";
  loginBtn.style.display = "none";
  alert("Login successful!");
};

// ======================
// ADD CASHBACK
// ======================
window.addCashback = function () {
  cashback += 10;
  cashbackEl.textContent = cashback;
};

// ======================
// CONVERT LINK
// ======================
window.convertLink = function () {
  const link = linkInput.value.trim();

  if (!link) {
    alert("Paste a link first");
    return;
  }

  const converted = link + "?ref=affiliate_demo";

  convertResult.innerHTML = `
    <a href="${converted}" target="_blank">${converted}</a>
  `;

  alert("Link converted!");
};

// ======================
// WITHDRAW
// ======================
window.withdrawCashback = function () {
  if (cashback <= 0) {
    withdrawMsg.textContent = "No cashback to withdraw!";
    return;
  }

  const auth = prompt("Enter authorization code:");
  if (auth !== "1234") {
    alert("Authorization failed");
    return;
  }

  alert("Withdraw approved!");
  cashback = 0;
  cashbackEl.textContent = cashback;
  withdrawMsg.textContent = "";
};
