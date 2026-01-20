let cashback = 0;

// Elements
const cashbackEl = document.getElementById("cashback");
const withdrawMsg = document.getElementById("withdrawMessage");
const convertResult = document.getElementById("convertedLink");
const linkInput = document.getElementById("linkInput");
const userEl = document.getElementById("user");

// =======================
// LOGIN (DEMO LOGIN)
// =======================
window.login = function () {
  userEl.textContent = "Welcome Christian Betonio";
  alert("✅ Login successful!");
};

// =======================
// UPDATE UI
// =======================
function updateUI() {
  cashbackEl.textContent = cashback;

  const withdrawBtn = document.querySelector(".withdraw");
  if (cashback <= 0) {
    withdrawBtn.disabled = true;
    withdrawMsg.textContent = "No cashback to withdraw!";
  } else {
    withdrawBtn.disabled = false;
    withdrawMsg.textContent = "";
  }
}

// =======================
// ADD CASHBACK
// =======================
window.addCashback = function () {
  cashback += 10;
  alert("✅ ₱10 cashback added!");
  updateUI();
};

// =======================
// CONVERT LINK
// =======================
window.convertLink = function () {
  const link = linkInput.value.trim();

  if (!link) {
    alert("⚠️ Please paste a shopping link first.");
    return;
  }

  const converted = link + "?ref=cashbacker";
  convertResult.textContent = converted;
  alert("✅ Link converted!");
};

// =======================
// WITHDRAW
// =======================
window.withdrawCashback = function () {
  if (cashback <= 0) {
    alert("❌ No cashback to withdraw.");
    return;
  }

  alert("💸 Withdrawal request sent!");
  cashback = 0;
  updateUI();
};

// Init
updateUI();
