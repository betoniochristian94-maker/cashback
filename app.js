// ======================
// CONFIG
// ======================
const SHOPEE_AFF_ID = "13316510024"; // Shopee Affiliate ID mo

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
function login() {
  userEl.textContent = "Welcome Christian Betonio";
  loginBtn.style.display = "none";
  alert("Login successful!");
}

// ======================
// UPDATE UI
// ======================
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

// ======================
// ADD CASHBACK (DEMO)
// ======================
function addCashback() {
  cashback += 10;
  updateUI();
}

// ======================
// CONVERT LINK
// ======================
function convertLink() {
  const link = linkInput.value.trim();
  if (!link) {
    alert("Please paste a shopping link first.");
    return;
  }

  let convertedLink = link;

  // SHOPEE → add affiliate ID
  if (link.includes("shopee")) {
    if (link.includes("?")) {
      convertedLink = link + `&aff_id=${SHOPEE_AFF_ID}`;
    } else {
      convertedLink = link + `?aff_id=${SHOPEE_AFF_ID}`;
    }
  }

  // TIKTOK → DO NOT MODIFY (auto tracked)
  if (link.includes("tiktok")) {
    convertedLink = link;
  }

  convertResult.textContent = convertedLink;
  alert("Link converted successfully!");
}

// ======================
// WITHDRAW (DEMO)
// ======================
function withdrawCashback() {
  if (cashback <= 0) {
    alert("No cashback to withdraw.");
    return;
  }

  alert("Withdrawal request sent (demo only).");
  cashback = 0;
  updateUI();
}

// ======================
// INIT
// ======================
updateUI();
