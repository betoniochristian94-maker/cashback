// ===== OFFICIAL AFFILIATE LINKS =====
const SHOPEE_AFFILIATE_LINK = "https://s.shopee.ph/AABBJBucdn";

// ===== ELEMENTS =====
const linkInput = document.getElementById("linkInput");
const convertResult = document.getElementById("convertedLink");
const cashbackEl = document.getElementById("cashback");
const withdrawMsg = document.getElementById("withdrawMessage");
const userEl = document.getElementById("user");
const loginBtn = document.getElementById("loginBtn");

// ===== DEMO LOGIN =====
function login() {
  userEl.textContent = "Welcome Christian Betonio";
  loginBtn.style.display = "none";
  alert("Login successful!");
}

// ===== CONVERT LINK (REAL AFFILIATE REDIRECT) =====
function convertLink() {
  const link = linkInput.value.trim();

  if (!link) {
    alert("Paste a Shopee product link");
    return;
  }

  if (!link.includes("shopee")) {
    alert("Shopee links only for now");
    return;
  }

  convertResult.innerHTML = `
    <a href="${SHOPEE_AFFILIATE_LINK}" 
       target="_blank" 
       style="word-break: break-all; font-weight: bold;">
       👉 Open Shopee via Affiliate Link
    </a>
    <p class="small">
      Purchases made after clicking this link will be tracked in the Shopee Affiliate Dashboard.
    </p>
  `;
}

// ===== DEMO CASHBACK (MANUAL) =====
let cashback = 0;

function addCashback() {
  cashback += 10;
  cashbackEl.textContent = cashback;
}

// ===== WITHDRAW (ADMIN AUTHORIZATION) =====
function withdrawCashback() {
  if (cashback <= 0) {
    withdrawMsg.textContent = "No cashback to withdraw.";
    return;
  }

  const code = prompt("Enter authorization code:");
  if (code !== "1234") {
    alert("Authorization failed");
    return;
  }

  alert("Withdraw request approved (demo)");
  cashback = 0;
  cashbackEl.textContent = cashback;
  withdrawMsg.textContent = "Withdraw approved.";
}
