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
  withdrawBtn.disabled = cashback <= 0;
  withdrawMsg.textContent = cashback <= 0 ? "No cashback to withdraw!" : "";
}

// Add cashback
window.addCashback = function() {
  cashback += 10;
  updateUI();
}

// Convert link
window.convertLink = function() {
  const link = linkInput.value.trim();
  if (!link) { alert("Please paste a shopping link first."); return; }
  const converted = link + "?ref=cashbacker";
  convertResult.textContent = converted;
}

// Withdraw cashback
window.withdrawCashback = function() {
  if (cashback <= 0) { alert("No cashback to withdraw."); return; }
  alert(`You withdrew ₱${cashback}`);
  cashback = 0;
  updateUI();
}

// Init UI
updateUI();
