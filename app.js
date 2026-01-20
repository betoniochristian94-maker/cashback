// ============================
// CONFIGURATION
// ============================
const shopeeAffiliateID = "123456789"; // Shopee affiliate ID mo
const tiktokAffiliateID = "13316510024"; // TikTok affiliate ID mo
const commissionRate = 0.10; // 10% commission per item (demo)

// ============================
// STATE
// ============================
let cashback = 0;

// ============================
// ELEMENTS
// ============================
const cashbackEl = document.getElementById("cashback");
const withdrawMsg = document.getElementById("withdrawMessage");
const convertResult = document.getElementById("convertedLink");
const linkInput = document.getElementById("linkInput");
const userEl = document.getElementById("user");
const loginBtn = document.getElementById("loginBtn");

// ============================
// LOGIN (DEMO)
// ============================
function login() {
  userEl.textContent = "Welcome Christian Betonio";
  loginBtn.style.display = "none";
  alert("Login successful!");
}

// ============================
// ADD CASHBACK
// ============================
function addCashback() {
  cashback += 10;
  cashbackEl.textContent = cashback;
}

// ============================
// WITHDRAW CASHBACK
// ============================
function withdrawCashback() {
  if (cashback <= 0) {
    withdrawMsg.textContent = "No cashback to withdraw!";
    return;
  }

  alert("💸 Withdrawal request sent!");
  cashback = 0;
  cashbackEl.textContent = cashback;
  withdrawMsg.textContent = "";
}

// ============================
// CONVERT LINK WITH ESTIMATED COMMISSION
// ============================
function convertLink() {
  const input = linkInput.value.trim();

  if (!input) {
    alert("⚠️ Please paste a Shopee or TikTok link first.");
    return;
  }

  let converted = input;

  // Add affiliate IDs
  if (input.includes("shopee.ph")) {
    converted += input.includes("?") ? `&aff_id=${shopeeAffiliateID}` : `?aff_id=${shopeeAffiliateID}`;
  } else if (input.includes("vt.tiktok.com") || input.includes("www.tiktok.com")) {
    converted += input.includes("?") ? `&aff_id=${tiktokAffiliateID}` : `?aff_id=${tiktokAffiliateID}`;
  }

  // DEMO: Fixed item price for estimated commission calculation
  const itemPrice = 1000; // Change this to test with other prices
  const totalCommission = itemPrice * commissionRate;
  const userShare = totalCommission * 0.5; // 50% share

  convertResult.textContent =
    `Converted Link: ${converted}\nEstimated Commission: ₱${userShare.toFixed(2)}`;

  alert("✅ Link converted successfully!");
}

// ============================
// INIT
// ============================
cashbackEl.textContent = cashback;
