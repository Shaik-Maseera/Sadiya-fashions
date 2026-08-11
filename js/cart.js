/* ==========================================================================
   SADIYA FASHIONS — Cart
   Cart items are stored as { productId, size, color, qty } in localStorage
   under "sadiya_cart". Product details are always looked up live from
   products.js so nothing gets duplicated or goes stale.
   ========================================================================== */

const CART_KEY = "sadiya_cart";

function getCart() {
  return safeGet(CART_KEY, []);
}

function saveCart(cart) {
  safeSet(CART_KEY, cart);
  updateHeaderCounts();
}

function cartLineKey(productId, size, color) {
  return `${productId}__${size || "-"}__${color || "-"}`;
}

function addToCart(productId, size, color, qty) {
  const product = getProductById(productId);
  if (!product) {
    showToast("Sorry, that product could not be found.", "error");
    return;
  }
  if (product.sizes.length && !size) {
    showToast("Please select a size", "error");
    return;
  }
  if (product.colors.length > 1 && !color) {
    showToast("Please select a colour", "error");
    return;
  }
  qty = Math.max(1, Number(qty) || 1);

  const cart = getCart();
  const key = cartLineKey(productId, size, color || (product.colors[0] || ""));
  const existing = cart.find(item => cartLineKey(item.productId, item.size, item.color) === key);

  if (existing) {
    existing.qty = Math.min(product.stock, existing.qty + qty);
  } else {
    cart.push({ productId, size: size || null, color: color || product.colors[0] || null, qty: Math.min(qty, product.stock) });
  }
  saveCart(cart);
  showToast("Added to your bag", "success");
}

function removeFromCart(productId, size, color) {
  let cart = getCart();
  const key = cartLineKey(productId, size, color);
  cart = cart.filter(item => cartLineKey(item.productId, item.size, item.color) !== key);
  saveCart(cart);
  showToast("Removed from your bag");
  if (document.querySelector(".cart-layout")) renderCartPage();
}

function updateCartQty(productId, size, color, newQty) {
  const cart = getCart();
  const key = cartLineKey(productId, size, color);
  const item = cart.find(i => cartLineKey(i.productId, i.size, i.color) === key);
  if (!item) return;
  const product = getProductById(productId);
  const max = product ? product.stock : 99;
  item.qty = Math.max(1, Math.min(max, newQty));
  saveCart(cart);
  if (document.querySelector(".cart-layout")) renderCartPage();
}

function clearCart() {
  saveCart([]);
  showToast("Bag cleared");
  if (document.querySelector(".cart-layout")) renderCartPage();
}

function buyNow(productId, size, color, qty) {
  const product = getProductById(productId);
  if (!product) return;
  if (product.sizes.length && !size) {
    showToast("Please select a size", "error");
    return;
  }
  if (product.colors.length > 1 && !color) {
    showToast("Please select a colour", "error");
    return;
  }
  addToCart(productId, size, color, qty);
  window.location.href = "checkout.html";
}

function calculateTotals(cart) {
  let subtotal = 0;
  cart.forEach(item => {
    const product = getProductById(item.productId);
    if (product) subtotal += product.price * item.qty;
  });
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
}

/* ---------- Cart page rendering ---------- */
function renderCartPage() {
  const listEl = document.querySelector("[data-cart-list]");
  const emptyEl = document.querySelector("[data-cart-empty]");
  const summaryEl = document.querySelector("[data-cart-summary]");
  if (!listEl) return;

  const cart = getCart().filter(item => getProductById(item.productId));

  if (!cart.length) {
    listEl.innerHTML = "";
    if (summaryEl) summaryEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "block";
    return;
  }
  if (emptyEl) emptyEl.style.display = "none";
  if (summaryEl) summaryEl.style.display = "block";

  listEl.innerHTML = cart.map(item => {
    const p = getProductById(item.productId);
    const lineTotal = p.price * item.qty;
    return `
    <div class="cart-item" data-line="${cartLineKey(item.productId, item.size, item.color)}">
      <a href="product.html?id=${p.id}"><img src="${p.images[0]}" alt="${escapeHTML(p.name)}" loading="lazy"></a>
      <div>
        <div class="cart-item-name"><a href="product.html?id=${p.id}">${escapeHTML(p.name)}</a></div>
        <div class="cart-item-meta">${escapeHTML(p.brand)} ${item.size ? "· Size " + escapeHTML(item.size) : ""} ${item.color ? "· " + escapeHTML(item.color) : ""}</div>
        <div class="cart-item-controls">
          <div class="qty-selector">
            <button type="button" data-cart-qty-dec aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button type="button" data-cart-qty-inc aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-link" data-cart-remove>Remove</button>
        </div>
      </div>
      <div class="cart-item-price">${formatPrice(lineTotal)}</div>
    </div>`;
  }).join("");

  listEl.querySelectorAll(".cart-item").forEach(row => {
    const [productId, size, color] = row.dataset.line.split("__");
    const pid = Number(productId);
    const sz = size === "-" ? null : size;
    const col = color === "-" ? null : color;

    row.querySelector("[data-cart-qty-inc]").addEventListener("click", () => {
      const current = getCart().find(i => cartLineKey(i.productId, i.size, i.color) === row.dataset.line);
      updateCartQty(pid, sz, col, (current ? current.qty : 1) + 1);
    });
    row.querySelector("[data-cart-qty-dec]").addEventListener("click", () => {
      const current = getCart().find(i => cartLineKey(i.productId, i.size, i.color) === row.dataset.line);
      const nextQty = (current ? current.qty : 1) - 1;
      if (nextQty <= 0) {
        removeFromCart(pid, sz, col);
      } else {
        updateCartQty(pid, sz, col, nextQty);
      }
    });
    row.querySelector("[data-cart-remove]").addEventListener("click", () => removeFromCart(pid, sz, col));
  });

  const totals = calculateTotals(cart);
  if (summaryEl) {
    summaryEl.querySelector("[data-subtotal]").textContent = formatPrice(totals.subtotal);
    summaryEl.querySelector("[data-shipping]").textContent = totals.shipping === 0 ? "FREE" : formatPrice(totals.shipping);
    summaryEl.querySelector("[data-total]").textContent = formatPrice(totals.total);
    const note = summaryEl.querySelector("[data-free-ship-note]");
    if (note) {
      const remaining = FREE_SHIPPING_THRESHOLD - totals.subtotal;
      note.textContent = remaining > 0 ? `Add ${formatPrice(remaining)} more for FREE shipping` : "You've unlocked free shipping!";
    }
  }
}

function initCartPage() {
  if (!document.querySelector(".cart-layout")) return;
  renderCartPage();
  const clearBtn = document.querySelector("[data-clear-cart]");
  clearBtn && clearBtn.addEventListener("click", () => {
    if (confirm("Remove all items from your bag?")) clearCart();
  });
}

document.addEventListener("DOMContentLoaded", initCartPage);
