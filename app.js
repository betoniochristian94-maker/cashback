// ============================
// CONFIGURATION
// ============================
const shopeeAffiliateID = "YOUR_SHOPEE_AFFILIATE_ID"; // Palitan ng sa'yo
const tiktokAffiliateID = "YOUR_TIKTOK_AFFILIATE_ID"; // Palitan ng sa'yo
const commissionRate = 0.05; // Example: 5% base commission
const userShareRate = 0.5; // 50% share sa user

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
// LOGIN DEMO
// ============================
function login() {
  userEl.textContent = "Welcome Christian Betonio"; // demo
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
// DEMO API: Shopee Item Price
// ============================
async function getShopeeItemPrice(itemLink) {
  // Demo: random price ₱100–₱2000
  return Math.floor(Math.random() * 1900) + 100;
}

// ============================
// DEMO API: TikTok Item Price
// ============================
async function getTikTokItemPrice(itemLink) {
  // Demo: random price ₱50–₱1000
  return Math.floor(Math.random() * 950) + 50;
}

// ============================
// CONVERT LINK
// ============================
async function convertLink() {
  const input = linkInput.value.trim();
  if (!input) {
    alert("⚠️ Please paste a Shopee or TikTok link first.");
    return;
  }

  let itemPrice = 0;
  let converted = input;

  if (input.includes("shopee.ph")) {
    converted += input.includes("?") ? `&aff_id=${shopeeAffiliateID}` : `?aff_id=${shopeeAffiliateID}`;
    itemPrice = await getShopeeItemPrice(input);
  } else if (input.includes("vt.tiktok.com") || input.includes("www.tiktok.com")) {
    converted += input.includes("?") ? `&aff_id=${tiktokAffiliateID}` : `?aff_id=${tiktokAffiliateID}`;
    itemPrice = await getTikTokItemPrice(input);
  } else {
    alert("⚠️ Only Shopee or TikTok links are supported.");
    return;
  }

  const totalCommission = itemPrice * commissionRate;
  const userShare = totalCommission * userShareRate;

  convertResult.textContent =
    `Converted Link: ${converted}\nItem Price: ₱${itemPrice}\nEstimated Commission: ₱${userShare.toFixed(2)}`;

  alert("✅ Link converted successfully!");
}

// ============================
// WITHDRAW
// ============================
function withdrawCashback() {
  if (cashback <= 0) {
    withdrawMsg.textContent = "No cashback to withdraw!";
    return;
  }

  alert(`💸 Withdrawal request sent! You withdrew ₱${cashback}`);
  cashback = 0;
  cashbackEl.textContent = cashback;
  withdrawMsg.textContent = "";
}

// ============================
// INIT
// ============================
function init() {
  cashbackEl.textContent = cashback;
  withdrawMsg.textContent = "";
  convertResult.textContent = "";
}

init();
