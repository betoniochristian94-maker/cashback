// CONFIG
const SHOPEE_AFF_ID = "13316510024"; // Shopee affiliate ID

// STATE
let cashback = 0;

// ELEMENTS
const cashbackEl = document.getElementById("cashback");
const withdrawMsg = document.getElementById("withdrawMessage");
const convertResult = document.getElementById("convertedLink");
const linkInput = document.getElementById("linkInput");
const priceInput = document.getElementById("priceInput");
const userEl = document.getElementById("user");
const loginBtn = document.getElementById("loginBtn");

// LOGIN (DEMO)
function login() {
  userEl.textContent = "Welcome Christian Betonio";
  loginBtn.style.display = "none";
  alert("Login successful!");
}

// UPDATE UI
function updateUI() {
  cashbackEl.textContent = cashback.toFixed(2);
  const withdrawBtn = document.querySelector(".withdraw");
  if (cashback <= 0) {
    withdrawBtn.disabled = true;
    withdrawMsg.textContent = "No cashback to withdraw!";
  } else {
    withdrawBtn.disabled = false;
    withdrawMsg.textContent = "";
  }
}

// ADD CASHBACK (DEMO)
function addCashback() {
  cashback += 10;
  updateUI();
}

// CONVERT LINK
function convertLink() {
  const link = linkInput.value.trim();
  if (!link) {
    alert("Please paste a shopping link first.");
    return;
  }

  let convertedLink = link;

  // Shopee → add affiliate ID
  if (link.includes("shopee")) {
    if (link.includes("?")) convertedLink = link + `&aff_id=${SHOPEE_AFF_ID}`;
    else convertedLink = link + `?aff_id=${SHOPEE_AFF_ID}`;
  }

  // TikTok → do not modify
  if (link.includes("tiktok")) convertedLink = link;

  convertResult.value = convertedLink;
  alert("Link converted! Ready to buy (demo).");
}

// COPY LINK
function copyLink() {
  convertResult.select();
  convertResult.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Copied to clipboard!");
}

// SIMULATE ORDER
function simulateOrder() {
  const price = parseFloat(priceInput.value);
  if (!price || price <= 0) {
    alert("Enter a valid product price for demo.");
    return;
  }

  const commission = price * 0.5; // 50% share
  cashback += commission;
  updateUI();
  alert(`Order completed! Commission ₱${commission.toFixed(2)} added to your cashback.`);
}

// WITHDRAW (DEMO, NEED AUTH)
function withdrawCashback() {
  if (cashback <= 0) {
    alert("No cashback to withdraw.");
    return;
  }

  const confirmAuth = prompt("Enter authorization code to approve withdraw:");
  if (confirmAuth !== "1234") { // replace with your secret code
    alert("Authorization failed! Withdraw not processed.");
    return;
  }

  alert(`Withdraw approved! Amount: ₱${cashback.toFixed(2)}`);
  cashback = 0;
  updateUI();
}

// INIT
updateUI();// INIT
// ======================
updateUI();
