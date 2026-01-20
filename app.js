// ===== Affiliate IDs =====
const shopeeAffiliateID = "13316510024"; // Shopee Affiliate ID
const tiktokAffiliateID = "13316510024"; // TikTok Affiliate ID

// ===== Cashback & User =====
let cashback = 0;

// Elements
const cashbackEl = document.getElementById("cashback");
const withdrawMsg = document.getElementById("withdrawMessage");
const convertResult = document.getElementById("convertedLink");
const linkInput = document.getElementById("linkInput");
const userEl = document.getElementById("user");
const loginBtn = document.getElementById("loginBtn");

// ===== Login (demo) =====
function login() {
  userEl.textContent = "Welcome Christian Betonio";
  loginBtn.style.display = "none";
  alert("✅ Login successful!");
}

// ===== Add Cashback =====
function addCashback() {
  cashback += 10;
  cashbackEl.textContent = cashback;
  alert("✅ ₱10 cashback added!");
}

// ===== Withdraw Cashback =====
function withdrawCashback() {
  if (cashback <= 0) {
    withdrawMsg.textContent = "❌ No cashback to withdraw!";
    return;
  }

  alert(`💸 You withdrew ₱${cashback}!`);
  cashback = 0;
  cashbackEl.textContent = cashback;
  withdrawMsg.textContent = "";
}

// ===== Convert Link with Affiliate IDs =====
function convertLink() {
  const input = linkInput.value.trim();

  if (!input) {
    alert("⚠️ Please paste a Shopee or TikTok link first.");
    return;
  }

  let converted = input;

  // Shopee Link
  if (input.includes("shopee.ph")) {
    if (input.includes("?")) {
      converted += `&aff_id=${shopeeAffiliateID}`;
    } else {
      converted += `?aff_id=${shopeeAffiliateID}`;
    }
  }

  // TikTok Link
  else if (input.includes("vt.tiktok.com") || input.includes("www.tiktok.com")) {
    if (input.includes("?")) {
      converted += `&aff_id=${tiktokAffiliateID}`;
    } else {
      converted += `?aff_id=${tiktokAffiliateID}`;
    }
  }

  convertResult.textContent = "Converted Link: " + converted;
  alert("✅ Link converted successfully!");
}

// ===== Initialize UI =====
function updateUI() {
  cashbackEl.textContent = cashback;
  withdrawMsg.textContent = "";
  convertResult.textContent = "";

  // Enable buttons only after login
  document.querySelector(".add").disabled = loginBtn.style.display !== "none";
  document.querySelector(".withdraw").disabled = loginBtn.style.display !== "none";
  document.querySelector(".convert").disabled = loginBtn.style.display !== "none";
}

// Run at start
updateUI();
