/* ==========================================================================
   SADIYA FASHIONS — App Core
   Shared across every page: header behaviour, mobile nav, search overlay,
   toast notifications, product-card rendering, quick view modal, back-to-top.
   ========================================================================== */

/* ---------- Store-wide config ---------- */
// Replace with your WhatsApp number including country code.
// Example: 919876543210
// Do not include +, spaces or hyphens.
const WHATSAPP_NUMBER = "919999999999";

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 99;

/* ---------- Safe localStorage helpers ---------- */
function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed === null || parsed === undefined ? fallback : parsed;
  } catch (err) {
    console.warn("Storage read failed for", key, err);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn("Storage write failed for", key, err);
    showToast("We couldn't save that. Please check your browser storage settings.", "error");
    return false;
  }
}

/* ---------- Text sanitising ---------- */
function escapeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatPrice(n) {
  const num = Number(n) || 0;
  return "₹" + num.toLocaleString("en-IN");
}

function renderStars(rating) {
  const full = Math.round(rating);
  return "★★★★★☆☆☆☆☆".slice(5 - full, 10 - full);
}

/* ---------- Toast notifications ---------- */
function showToast(message, type) {
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "toast-wrap";
    document.body.appendChild(wrap);
  }
  const toast = document.createElement("div");
  toast.className = "toast" + (type ? " " + type : "");
  toast.textContent = message;
  wrap.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 320);
  }, 2600);
}

/* ---------- Header: scroll state, mobile nav, search overlay, cart/wishlist counts ---------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileClose = document.querySelector(".mobile-nav-close");
  const overlay = document.querySelector(".overlay");

  function openMobileNav() {
    mobileNav && mobileNav.classList.add("open");
    hamburger && hamburger.classList.add("open");
    overlay && overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeMobileNav() {
    mobileNav && mobileNav.classList.remove("open");
    hamburger && hamburger.classList.remove("open");
    overlay && overlay.classList.remove("show");
    document.body.style.overflow = "";
  }
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      mobileNav && mobileNav.classList.contains("open") ? closeMobileNav() : openMobileNav();
    });
  }
  mobileClose && mobileClose.addEventListener("click", closeMobileNav);
  overlay && overlay.addEventListener("click", () => {
    closeMobileNav();
    closeSearch();
    closeFiltersPanel();
  });
  document.querySelectorAll(".mobile-nav a").forEach(a => a.addEventListener("click", closeMobileNav));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeMobileNav();
      closeSearch();
      closeFiltersPanel();
    }
  });

  /* Search overlay */
  const searchTriggers = document.querySelectorAll("[data-open-search]");
  const searchOverlay = document.querySelector(".search-overlay");
  const searchInput = document.querySelector(".search-box input");
  const searchClose = document.querySelector(".search-close");
  const searchResults = document.querySelector(".search-results");

  searchTriggers.forEach(btn => {
    btn.addEventListener("click", () => {
      searchOverlay && searchOverlay.classList.add("show");
      setTimeout(() => searchInput && searchInput.focus(), 250);
      document.body.style.overflow = "hidden";
    });
  });
  searchClose && searchClose.addEventListener("click", closeSearch);
  searchOverlay && searchOverlay.addEventListener("click", e => {
    if (e.target === searchOverlay) closeSearch();
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!searchResults) return;
      if (!q) {
        searchResults.innerHTML = "";
        return;
      }
      const results = getAllProducts().filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      ).slice(0, 8);

      if (results.length === 0) {
        searchResults.innerHTML = `<p class="search-empty">No styles found for "${escapeHTML(searchInput.value)}".</p>`;
        return;
      }
      searchResults.innerHTML = results.map(p => `
        <a class="search-result-item" href="product.html?id=${p.id}">
          <img src="${p.images[0]}" alt="${escapeHTML(p.name)}" loading="lazy">
          <span>
            <span class="name">${escapeHTML(p.name)}</span><br>
            <span class="meta">${escapeHTML(p.brand)} · ${formatPrice(p.price)}</span>
          </span>
        </a>
      `).join("");
    });
  }

  updateHeaderCounts();
}

function closeSearch() {
  const searchOverlay = document.querySelector(".search-overlay");
  searchOverlay && searchOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

function closeFiltersPanel() {
  const panel = document.querySelector(".filters-panel");
  panel && panel.classList.remove("open");
}

function updateHeaderCounts() {
  const cart = safeGet("sadiya_cart", []);
  const wishlist = safeGet("sadiya_wishlist", []);
  const cartTotalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = cartTotalQty;
    el.style.display = cartTotalQty > 0 ? "flex" : "none";
  });
  document.querySelectorAll("[data-wishlist-count]").forEach(el => {
    el.textContent = wishlist.length;
    el.style.display = wishlist.length > 0 ? "flex" : "none";
  });
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".fade-up");
  if (!items.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
}

/* ---------- Product card rendering (shared everywhere) ---------- */
function badgeClass(badge) {
  if (!badge) return "";
  const b = badge.toUpperCase();
  if (b === "SALE") return "sale";
  if (b === "NEW") return "new";
  if (b === "LIMITED") return "limited";
  return "";
}

function productCardHTML(p) {
  const wishlist = safeGet("sadiya_wishlist", []);
  const isWishlisted = wishlist.includes(p.id);
  const secondImg = p.images[1] || p.images[0];
  const lowStock = p.stock > 0 && p.stock <= 5;

  return `
  <div class="product-card fade-up" data-product-id="${p.id}">
    <div class="product-media">
      <a href="product.html?id=${p.id}" aria-label="View ${escapeHTML(p.name)}">
        <img class="img-primary" src="${p.images[0]}" alt="${escapeHTML(p.name)}" loading="lazy" onerror="this.src='https://placehold.co/900x1200/29271F/F6F2E9?text=Sadiya+Fashions'">
        <img class="img-secondary" src="${secondImg}" alt="" loading="lazy" onerror="this.style.display='none'">
      </a>
      ${p.badge ? `<span class="product-badge ${badgeClass(p.badge)}">${escapeHTML(p.badge)}</span>` : ""}
      ${p.discount ? `<span class="product-badge sale" style="left:auto;right:12px;top:${p.badge ? "50px" : "12px"};">-${p.discount}%</span>` : ""}
      <button class="wishlist-heart ${isWishlisted ? "active" : ""}" data-toggle-wishlist="${p.id}" aria-label="Toggle wishlist">
        <svg viewBox="0 0 24 24" stroke-width="1.6"><path d="M12 21s-7.5-4.6-10-9.3C0.2 8 2 4 6 4c2.2 0 3.8 1.2 6 4 2.2-2.8 3.8-4 6-4 4 0 5.8 4 4 7.7C19.5 16.4 12 21 12 21z"/></svg>
      </button>
      ${lowStock ? `<span class="stock-flag">Only ${p.stock} left</span>` : ""}
      <div class="product-card-actions">
        <button class="btn btn-ghost" data-quickview="${p.id}">Quick View</button>
        <button class="btn btn-ghost" data-quickadd="${p.id}">Add to Cart</button>
      </div>
    </div>
    <a href="product.html?id=${p.id}" class="product-info">
      <div class="product-brand">${escapeHTML(p.brand)}</div>
      <div class="product-name">${escapeHTML(p.name)}</div>
      <div class="product-rating"><span class="stars">${renderStars(p.rating)}</span> ${p.rating} (${p.reviews})</div>
      <div class="product-price-row">
        <span class="price">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ""}
        ${p.discount ? `<span class="discount">${p.discount}% off</span>` : ""}
      </div>
    </a>
  </div>`;
}

function renderProductGrid(container, list) {
  if (!container) return;
  if (!list.length) {
    container.innerHTML = `
      <div class="no-results" style="grid-column:1/-1;">
        <div class="display-md">No Styles Found</div>
        <p>Try adjusting your filters or search terms.</p>
        <button class="btn" data-clear-search>Clear Search</button>
      </div>`;
    return;
  }
  container.innerHTML = list.map(productCardHTML).join("");
  initScrollReveal();
}

/* Delegate quick-add / wishlist / quick-view clicks anywhere on the page */
function initProductCardDelegation() {
  document.addEventListener("click", e => {
    const wishBtn = e.target.closest("[data-toggle-wishlist]");
    if (wishBtn) {
      e.preventDefault();
      const id = Number(wishBtn.dataset.toggleWishlist);
      toggleWishlist(id);
      return;
    }
    const quickAddBtn = e.target.closest("[data-quickadd]");
    if (quickAddBtn) {
      e.preventDefault();
      const id = Number(quickAddBtn.dataset.quickadd);
      const product = getProductById(id);
      if (!product) return;
      if (product.sizes.length > 1 || product.colors.length > 1) {
        openQuickView(id);
      } else {
        addToCart(id, product.sizes[0], product.colors[0], 1);
      }
      return;
    }
    const quickViewBtn = e.target.closest("[data-quickview]");
    if (quickViewBtn) {
      e.preventDefault();
      openQuickView(Number(quickViewBtn.dataset.quickview));
      return;
    }
    const clearSearchBtn = e.target.closest("[data-clear-search]");
    if (clearSearchBtn) {
      window.location.href = "shop.html";
    }
  });
}

/* ---------- Quick View modal ---------- */
function ensureQuickViewModal() {
  if (document.querySelector(".quickview-overlay")) return;
  const div = document.createElement("div");
  div.className = "modal-overlay quickview-overlay";
  div.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true" aria-label="Quick view">
      <button class="modal-close" data-close-quickview aria-label="Close quick view">✕</button>
      <div class="modal-media"><img id="qv-image" src="" alt=""></div>
      <div class="modal-info" id="qv-info"></div>
    </div>`;
  document.body.appendChild(div);

  div.addEventListener("click", e => {
    if (e.target === div) closeQuickView();
  });
  div.querySelector("[data-close-quickview]").addEventListener("click", closeQuickView);
}

let quickViewState = { product: null, size: null, color: null, qty: 1 };

function openQuickView(id) {
  const product = getProductById(id);
  if (!product) {
    showToast("This product is no longer available.", "error");
    return;
  }
  ensureQuickViewModal();
  quickViewState = { product, size: product.sizes[0] || null, color: product.colors[0] || null, qty: 1 };
  renderQuickView();
  document.querySelector(".quickview-overlay").classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  const overlay = document.querySelector(".quickview-overlay");
  overlay && overlay.classList.remove("show");
  document.body.style.overflow = "";
}

function renderQuickView() {
  const { product, size, color, qty } = quickViewState;
  document.getElementById("qv-image").src = product.images[0];
  document.getElementById("qv-image").alt = product.name;

  const info = document.getElementById("qv-info");
  info.innerHTML = `
    <div class="product-brand">${escapeHTML(product.brand)}</div>
    <h3 class="display-md" style="margin:8px 0 10px;">${escapeHTML(product.name)}</h3>
    <div class="product-rating"><span class="stars">${renderStars(product.rating)}</span> ${product.rating} (${product.reviews} reviews)</div>
    <div class="pdp-price-row">
      <span class="price">${formatPrice(product.price)}</span>
      ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ""}
    </div>
    <p style="color:var(--charcoal);font-size:13.5px;line-height:1.7;margin-bottom:20px;">${escapeHTML(product.description.slice(0, 130))}${product.description.length > 130 ? "…" : ""}</p>

    ${product.sizes.length ? `
    <div class="option-block">
      <h4>Size <span class="req">Required</span></h4>
      <div class="size-chip-row" id="qv-sizes">
        ${product.sizes.map(s => `<button type="button" class="size-chip ${s === size ? "selected" : ""}" data-qv-size="${s}">${escapeHTML(s)}</button>`).join("")}
      </div>
    </div>` : ""}

    ${product.colors.length > 1 ? `
    <div class="option-block">
      <h4>Colour</h4>
      <div class="size-chip-row" id="qv-colors">
        ${product.colors.map(c => `<button type="button" class="size-chip ${c === color ? "selected" : ""}" data-qv-color="${c}">${escapeHTML(c)}</button>`).join("")}
      </div>
    </div>` : ""}

    <div class="option-block">
      <h4>Quantity</h4>
      <div class="qty-selector">
        <button type="button" data-qv-qty="-1" aria-label="Decrease quantity">−</button>
        <span id="qv-qty-val">${qty}</span>
        <button type="button" data-qv-qty="1" aria-label="Increase quantity">+</button>
      </div>
    </div>

    <div class="pdp-actions">
      <button class="btn btn-block" id="qv-add-to-cart">Add to Cart</button>
      <a class="btn btn-outline btn-block" href="product.html?id=${product.id}">View Full Details</a>
    </div>
  `;

  info.querySelectorAll("[data-qv-size]").forEach(btn => {
    btn.addEventListener("click", () => {
      quickViewState.size = btn.dataset.qvSize;
      renderQuickView();
    });
  });
  info.querySelectorAll("[data-qv-color]").forEach(btn => {
    btn.addEventListener("click", () => {
      quickViewState.color = btn.dataset.qvColor;
      renderQuickView();
    });
  });
  const qtyEls = info.querySelectorAll("[data-qv-qty]");
  qtyEls.forEach(btn => {
    btn.addEventListener("click", () => {
      const delta = Number(btn.dataset.qvQty);
      quickViewState.qty = Math.max(1, Math.min(product.stock, quickViewState.qty + delta));
      renderQuickView();
    });
  });
  document.getElementById("qv-add-to-cart").addEventListener("click", () => {
    if (product.sizes.length && !quickViewState.size) {
      showToast("Please select a size", "error");
      return;
    }
    if (product.colors.length > 1 && !quickViewState.color) {
      showToast("Please select a colour", "error");
      return;
    }
    addToCart(product.id, quickViewState.size, quickViewState.color || product.colors[0], quickViewState.qty);
    closeQuickView();
  });
}

/* ---------- Nav active state ---------- */
function setActiveNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a, .mobile-nav a").forEach(a => {
    const href = a.getAttribute("href").split("?")[0];
    if (href === page) a.classList.add("active");
  });
}

/* ---------- Image error fallback (global) ---------- */
function initImageFallback() {
  document.addEventListener("error", e => {
    const el = e.target;
    if (el.tagName === "IMG" && !el.dataset.fallbackApplied) {
      el.dataset.fallbackApplied = "true";
      el.src = "https://placehold.co/900x1200/29271F/F6F2E9?text=Sadiya+Fashions";
    }
  }, true);
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initBackToTop();
  initScrollReveal();
  initProductCardDelegation();
  setActiveNav();
  initImageFallback();
});
