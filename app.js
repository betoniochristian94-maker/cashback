let cashback = 0;

// Elements
const cashbackEl = document.getElementById("cashback");
const withdrawMsg = document.getElementById("withdrawMessage");
const convertResult = document.getElementById("convertedLink");
const linkInput = document.getElementById("linkInput");

// Update UI
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

// Add cashback
function addCashback() {
  cashback += 10;
  alert("✅ ₱10 cashback added!");
  updateUI();
}

// Convert link
function convertLink() {
  const link = linkInput.value.trim();

  if (!link) {
    alert("⚠️ Please paste a shopping link first.");
    return;
  }

  const converted = link + "?ref=cashbacker";
  convertResult.textContent = converted;
  alert("✅ Link converted successfully!");
}

// Withdraw
function withdrawCashback() {
  if (cashback <= 0) {
    alert("❌ No cashback to withdraw.");
    return;
  }

  alert("💸 Withdrawal request sent!");
  cashback = 0;
  updateUI();
}

// Init
updateUI();
