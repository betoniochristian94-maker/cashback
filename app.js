// ===== OFFICIAL AFFILIATE LINKS =====
const SHOPEE_AFFILIATE_LINK = "https://s.shopee.ph/AABBJBucdn";
const TIKTOK_AFFILIATE_LINK = "https://vt.tiktok.com/PHLCCP7L9B/";

// ===== ELEMENTS =====
const linkInput = document.getElementById("linkInput");
const convertResult = document.getElementById("convertedLink");
const cashbackEl = document.getElementById("cashback");
const withdrawMsg = document.getElementById("withdrawMessage");
const userEl = document.getElementById("user");
const loginBtn = document.getElementById("loginBtn");

// ===== LOGIN (DEMO) =====
function login() {
  userEl.textContent = "Welcome Christian Betonio";
  loginBtn.style.display = "none";
  alert("Login successful!");
}

// ===== AUTO-DETECT & CONVERT =====
function convertLink() {
  const link = linkInput.value.trim().toLowerCase();

  if (!link) {
    alert("Paste a Shopee or TikTok link");
    return;
  }

  // SHOPEE
  if (link.includes("shopee")) {
    convertResult.innerHTML = `
      <a href="${SHOPEE_AFFILIATE_LINK}" target="_blank"
        style="display:block;font-weight:bold;word-break:break-all;">
        👉 Open Shopee (Affiliate Link)
      </a>
      <p class="small">
        Make sure to checkout after clicking this link to ensure commission tracking.
      </p>
    `;
    return;
  }

  // TIKTOK
  if (link.includes("tiktok")) {
    convertResult.innerHTML = `
      <a href="${TIKTOK_AFFILIATE_LINK}" target="_blank"
        style="display:block;font-weight:bold;word-break:break-all;">
        👉 Open TikTok Shop (Affiliate Link)
      </a>
      <p class="small">
        Purchases made after clicking this link will be tracked to the affiliate.
      </p>
    `;
    return;
  }

  // INVALID
  alert("Only Shopee or TikTok links are supported.");
}

// ===== DEMO CASHBACK =====
let cashback = 0;
function addCashback() {
  cashback += 10;
  cashbackEl.textContent = cashback;
}

// ===== WITHDRAW (ADMIN AUTH) =====
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
