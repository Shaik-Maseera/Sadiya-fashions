/* ==========================================================================
   SADIYA FASHIONS — Wishlist
   Wishlist is stored as an array of product IDs under "sadiya_wishlist".
   ========================================================================== */

const WISHLIST_KEY = "sadiya_wishlist";

function getWishlist() {
  return safeGet(WISHLIST_KEY, []);
}

function saveWishlist(list) {
  safeSet(WISHLIST_KEY, list);
  updateHeaderCounts();
}

function isWishlisted(productId) {
  return getWishlist().includes(Number(productId));
}

function toggleWishlist(productId) {
  productId = Number(productId);
  let list = getWishlist();
  const wasSaved = list.includes(productId);

  if (wasSaved) {
    list = list.filter(id => id !== productId);
    showToast("Removed from wishlist");
  } else {
    list.push(productId);
    showToast("Added to wishlist", "success");
  }
  saveWishlist(list);

  document.querySelectorAll(`[data-toggle-wishlist="${productId}"]`).forEach(btn => {
    btn.classList.toggle("active", !wasSaved);
  });
  document.querySelectorAll(`[data-pdp-wishlist="${productId}"]`).forEach(btn => {
    btn.classList.toggle("active", !wasSaved);
    btn.textContent = !wasSaved ? "♥ Saved to Wishlist" : "♡ Add to Wishlist";
  });

  if (document.querySelector("[data-wishlist-list]")) renderWishlistPage();
}

/* ---------- Wishlist page rendering ---------- */
function renderWishlistPage() {
  const listEl = document.querySelector("[data-wishlist-list]");
  const emptyEl = document.querySelector("[data-wishlist-empty]");
  if (!listEl) return;

  const ids = getWishlist();
  const items = ids.map(id => getProductById(id)).filter(Boolean);

  if (!items.length) {
    listEl.innerHTML = "";
    listEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "block";
    return;
  }
  listEl.style.display = "grid";
  if (emptyEl) emptyEl.style.display = "none";

  listEl.innerHTML = items.map(p => productCardHTML(p)).join("");
  initScrollReveal();
}

function initWishlistPage() {
  if (!document.querySelector("[data-wishlist-list]")) return;
  renderWishlistPage();
}

document.addEventListener("DOMContentLoaded", initWishlistPage);
