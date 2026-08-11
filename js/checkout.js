/* ==========================================================================
   SADIYA FASHIONS — Checkout
   No backend: this collects delivery details, validates them, builds an
   order summary from localStorage, then hands the whole order to WhatsApp
   click-to-chat so the customer can send it straight to the store.
   ========================================================================== */

function generateOrderId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SDF-${y}${m}${d}-${rand}`;
}

const FIELD_VALIDATORS = {
  fullName: v => v.trim().length >= 2 || "Please enter your full name.",
  mobile: v => /^[6-9]\d{9}$/.test(v.trim()) || "Enter a valid 10-digit Indian mobile number.",
  email: v => v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
  address: v => v.trim().length >= 4 || "Please enter your house / flat / street.",
  area: v => v.trim().length >= 2 || "Please enter your area.",
  city: v => v.trim().length >= 2 || "Please enter your city.",
  state: v => v.trim().length >= 2 || "Please enter your state.",
  pincode: v => /^\d{6}$/.test(v.trim()) || "Enter a valid 6-digit PIN code."
};

function validateField(input) {
  const name = input.name;
  const validator = FIELD_VALIDATORS[name];
  const field = input.closest(".form-field");
  if (!validator) return true;

  const result = validator(input.value);
  if (result === true) {
    field.classList.remove("error");
    return true;
  } else {
    field.classList.add("error");
    field.querySelector(".field-error").textContent = result;
    return false;
  }
}

function validateCheckoutForm(form) {
  let valid = true;
  Object.keys(FIELD_VALIDATORS).forEach(name => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input && !validateField(input)) valid = false;
  });
  return valid;
}

function generateWhatsAppMessage(order) {
  const lines = [];
  lines.push("NEW ORDER — SADIYA FASHIONS");
  lines.push("");
  lines.push(`Order ID: ${order.orderId}`);
  lines.push("");
  lines.push("CUSTOMER");
  lines.push(`Name: ${order.customer.fullName}`);
  lines.push(`Phone: ${order.customer.mobile}`);
  if (order.customer.email) lines.push(`Email: ${order.customer.email}`);
  lines.push("");
  lines.push("DELIVERY ADDRESS");
  lines.push(`House: ${order.customer.address}`);
  lines.push(`Area: ${order.customer.area}`);
  lines.push(`City: ${order.customer.city}`);
  lines.push(`State: ${order.customer.state}`);
  lines.push(`PIN: ${order.customer.pincode}`);
  if (order.customer.landmark) lines.push(`Landmark: ${order.customer.landmark}`);
  if (order.customer.instructions) lines.push(`Delivery Notes: ${order.customer.instructions}`);
  lines.push("");
  lines.push("PRODUCTS");
  order.items.forEach((item, i) => {
    lines.push(`${i + 1}. ${item.name}`);
    lines.push(`   Brand: ${item.brand}`);
    if (item.size) lines.push(`   Size: ${item.size}`);
    if (item.color) lines.push(`   Colour: ${item.color}`);
    lines.push(`   Quantity: ${item.qty}`);
    lines.push(`   Price: ${formatPrice(item.price)} x ${item.qty} = ${formatPrice(item.price * item.qty)}`);
  });
  lines.push("");
  lines.push(`Subtotal: ${formatPrice(order.subtotal)}`);
  lines.push(`Shipping: ${order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}`);
  lines.push(`TOTAL: ${formatPrice(order.total)}`);

  return lines.join("\n");
}

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/* ---------- Order summary rendering ---------- */
function renderOrderReview() {
  const container = document.querySelector("[data-order-review]");
  if (!container) return null;

  const cart = getCart().filter(item => getProductById(item.productId));
  if (!cart.length) {
    return null;
  }

  container.innerHTML = cart.map(item => {
    const p = getProductById(item.productId);
    return `
    <div class="order-review-item">
      <img src="${p.images[0]}" alt="${escapeHTML(p.name)}" loading="lazy">
      <div>
        <div>${escapeHTML(p.name)}</div>
        <div class="meta">${escapeHTML(p.brand)} ${item.size ? "· " + escapeHTML(item.size) : ""} ${item.color ? "· " + escapeHTML(item.color) : ""} · Qty ${item.qty}</div>
      </div>
      <div style="margin-left:auto;font-weight:600;">${formatPrice(p.price * item.qty)}</div>
    </div>`;
  }).join("");

  const totals = calculateTotals(cart);
  document.querySelector("[data-co-subtotal]").textContent = formatPrice(totals.subtotal);
  document.querySelector("[data-co-shipping]").textContent = totals.shipping === 0 ? "FREE" : formatPrice(totals.shipping);
  document.querySelector("[data-co-total]").textContent = formatPrice(totals.total);

  return { cart, totals };
}

function showSuccessModal(order) {
  let overlay = document.querySelector(".success-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "modal-overlay success-overlay";
    overlay.innerHTML = `
    <div class="modal-box" style="grid-template-columns:1fr;">
      <button class="modal-close" data-close-success aria-label="Close">✕</button>
      <div class="success-box">
        <div class="success-check">✓</div>
        <div class="display-md">Order Details Ready</div>
        <p style="margin-top:10px;color:var(--charcoal);">Thank you for shopping with Sadiya Fashions.</p>
        <div class="order-id-tag" data-success-order-id></div>
        <p style="font-size:14px;">Total: <strong data-success-total></strong></p>
        <p style="margin-top:14px;">Your order details are ready to send through WhatsApp.</p>
        <button class="btn btn-block" style="margin-top:20px;" data-confirm-whatsapp>Confirm Order on WhatsApp</button>
        <p class="success-note">Please tap Send in WhatsApp to confirm your order. Sadiya Fashions will get back to you to finalise payment and delivery.</p>
      </div>
    </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", e => { if (e.target === overlay) overlay.classList.remove("show"); });
    overlay.querySelector("[data-close-success]").addEventListener("click", () => overlay.classList.remove("show"));
  }

  overlay.querySelector("[data-success-order-id]").textContent = order.orderId;
  overlay.querySelector("[data-success-total]").textContent = formatPrice(order.total);
  const waBtn = overlay.querySelector("[data-confirm-whatsapp]");
  waBtn.onclick = () => openWhatsApp(generateWhatsAppMessage(order));

  overlay.classList.add("show");
  document.body.style.overflow = "hidden";

  // Attempt to auto-open WhatsApp once for convenience.
  setTimeout(() => openWhatsApp(generateWhatsAppMessage(order)), 500);
}

function initCheckoutPage() {
  const form = document.querySelector("[data-checkout-form]");
  if (!form) return;

  const reviewData = renderOrderReview();
  const emptyNotice = document.querySelector("[data-checkout-empty]");
  if (!reviewData) {
    if (emptyNotice) emptyNotice.style.display = "block";
    form.style.display = "none";
    document.querySelectorAll("[data-checkout-summary]").forEach(el => el.style.display = "none");
    return;
  }

  form.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".form-field").classList.contains("error")) validateField(input);
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateCheckoutForm(form)) {
      showToast("Please fix the highlighted fields", "error");
      const firstError = form.querySelector(".form-field.error input, .form-field.error textarea");
      firstError && firstError.focus();
      return;
    }

    const cart = getCart().filter(item => getProductById(item.productId));
    if (!cart.length) {
      showToast("Your bag is empty", "error");
      return;
    }
    const totals = calculateTotals(cart);

    const order = {
      orderId: generateOrderId(),
      customer: {
        fullName: form.fullName.value.trim(),
        mobile: form.mobile.value.trim(),
        email: form.email.value.trim(),
        address: form.address.value.trim(),
        area: form.area.value.trim(),
        city: form.city.value.trim(),
        state: form.state.value.trim(),
        pincode: form.pincode.value.trim(),
        landmark: form.landmark.value.trim(),
        instructions: form.instructions.value.trim()
      },
      items: cart.map(item => {
        const p = getProductById(item.productId);
        return { name: p.name, brand: p.brand, size: item.size, color: item.color, qty: item.qty, price: p.price };
      }),
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total
    };

    safeSet("sadiya_last_order", order);
    showSuccessModal(order);
  });
}

document.addEventListener("DOMContentLoaded", initCheckoutPage);
