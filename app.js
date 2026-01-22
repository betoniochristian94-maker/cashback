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
  alert("✅ ₱10 cashback added!");
}

// Convert link (Shopee/TikTok demo)
function convertLink() {
  const link = linkInput.value.trim();
  if (!link) {
    alert("⚠️ Paste a link first");
    return;
  }

  // Demo affiliate conversion
  const affiliateShopee = "yourShopeeID";
  const affiliateTikTok = "yourTikTokID";

  let converted = link;
  if (link.includes("shopee")) converted += `?aff_id=${affiliateShopee}`;
  else if (link.includes("tiktok")) converted += `?aff_id=${affiliateTikTok}`;

  convertResult.textContent = converted;
  alert("✅ Link converted successfully!");
}

// Withdraw
function withdrawCashback() {
  if (cashback <= 0) {
    withdrawMsg.textContent = "No cashback to withdraw!";
    return;
  }
  alert(`💸 Withdrawal request sent! Amount: ₱${cashback}`);
  cashback = 0;
  cashbackEl.textContent = cashback;
  withdrawMsg.textContent = "";
}

// Init UI
updateUI();
function updateUI() {
  cashbackEl.textContent = cashback;
}}

init();
