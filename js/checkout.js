
/* ==========================================================================
   SADIYA FASHIONS — Checkout
   Checkout form validation and WhatsApp order confirmation.
   ========================================================================== */

// Store WhatsApp number with country code.
// No + sign, spaces or dashes.
const CHECKOUT_WHATSAPP_NUMBER = "918555996095";


/* ---------- Generate Order ID ---------- */

function generateOrderId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);

  return `SDF-${y}${m}${d}-${rand}`;
}


/* ---------- Form Validation ---------- */

const FIELD_VALIDATORS = {
  fullName: v =>
    v.trim().length >= 2 ||
    "Please enter your full name.",

  mobile: v =>
    /^[6-9]\d{9}$/.test(v.trim()) ||
    "Enter a valid 10-digit Indian mobile number.",

  email: v =>
    v.trim() === "" ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ||
    "Enter a valid email address.",

  address: v =>
    v.trim().length >= 4 ||
    "Please enter your house / flat / street.",

  area: v =>
    v.trim().length >= 2 ||
    "Please enter your area.",

  city: v =>
    v.trim().length >= 2 ||
    "Please enter your city.",

  state: v =>
    v.trim().length >= 2 ||
    "Please enter your state.",

  pincode: v =>
    /^\d{6}$/.test(v.trim()) ||
    "Enter a valid 6-digit PIN code."
};


function validateField(input) {
  const name = input.name;
  const validator = FIELD_VALIDATORS[name];
  const field = input.closest(".form-field");

  if (!validator || !field) return true;

  const errorElement = field.querySelector(".field-error");
  const result = validator(input.value);

  if (result === true) {
    field.classList.remove("error");

    if (errorElement) {
      errorElement.textContent = "";
    }

    return true;
  }

  field.classList.add("error");

  if (errorElement) {
    errorElement.textContent = result;
  }

  return false;
}


function validateCheckoutForm(form) {
  let valid = true;

  Object.keys(FIELD_VALIDATORS).forEach(name => {
    const input = form.querySelector(`[name="${name}"]`);

    if (input && !validateField(input)) {
      valid = false;
    }
  });

  return valid;
}


/* ---------- Build WhatsApp Order Message ---------- */

function generateWhatsAppMessage(order) {
  const lines = [];

  lines.push("🛍️ NEW ORDER — SADIYA FASHIONS");
  lines.push("================================");
  lines.push("");
  lines.push(`Order ID: ${order.orderId}`);
  lines.push("");

  lines.push("👤 CUSTOMER DETAILS");
  lines.push(`Name: ${order.customer.fullName}`);
  lines.push(`Phone: ${order.customer.mobile}`);

  if (order.customer.email) {
    lines.push(`Email: ${order.customer.email}`);
  }

  lines.push("");

  lines.push("📍 DELIVERY ADDRESS");
  lines.push(`House / Street: ${order.customer.address}`);
  lines.push(`Area: ${order.customer.area}`);
  lines.push(`City: ${order.customer.city}`);
  lines.push(`State: ${order.customer.state}`);
  lines.push(`PIN Code: ${order.customer.pincode}`);

  if (order.customer.landmark) {
    lines.push(`Landmark: ${order.customer.landmark}`);
  }

  if (order.customer.instructions) {
    lines.push(`Delivery Instructions: ${order.customer.instructions}`);
  }

  lines.push("");
  lines.push("🛒 ORDER PRODUCTS");
  lines.push("--------------------------------");

  order.items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`Brand: ${item.brand}`);

    if (item.size) {
      lines.push(`Size: ${item.size}`);
    }

    if (item.color) {
      lines.push(`Colour: ${item.color}`);
    }

    lines.push(`Quantity: ${item.qty}`);
    lines.push(`Unit Price: ${formatPrice(item.price)}`);
    lines.push(`Product Total: ${formatPrice(item.price * item.qty)}`);
    lines.push("");
  });

  lines.push("================================");
  lines.push(`Subtotal: ${formatPrice(order.subtotal)}`);
  lines.push(
    `Shipping: ${
      order.shipping === 0 ? "FREE" : formatPrice(order.shipping)
    }`
  );
  lines.push("");
  lines.push(`💰 GRAND TOTAL: ${formatPrice(order.total)}`);
  lines.push("");
  lines.push("Thank you for choosing Sadiya Fashions!");

  return lines.join("\n");
}


/* ---------- Open WhatsApp ---------- */

function openWhatsApp(message) {
  const url =
    `https://wa.me/${CHECKOUT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}


/* ---------- Order Summary Rendering ---------- */

function renderOrderReview() {
  const container = document.querySelector("[data-order-review]");

  if (!container) return null;

  const cart = getCart().filter(item => getProductById(item.productId));

  if (!cart.length) {
    return null;
  }

  container.innerHTML = cart.map(item => {
    const p = getProductById(item.productId);

    const productImage = p.images && p.images.length
      ? p.images[0]
      : "";

    return `
      <div class="order-review-item">
        ${
          productImage
            ? `<img src="${escapeHTML(productImage)}" alt="${escapeHTML(p.name)}" loading="lazy">`
            : `<div class="order-review-placeholder"></div>`
        }

        <div>
          <div>${escapeHTML(p.name)}</div>

          <div class="meta">
            ${escapeHTML(p.brand)}
            ${item.size ? " · " + escapeHTML(item.size) : ""}
            ${item.color ? " · " + escapeHTML(item.color) : ""}
            · Qty ${item.qty}
          </div>
        </div>

        <div style="margin-left:auto;font-weight:600;">
          ${formatPrice(p.price * item.qty)}
        </div>
      </div>
    `;
  }).join("");

  const totals = calculateTotals(cart);

  document.querySelector("[data-co-subtotal]").textContent =
    formatPrice(totals.subtotal);

  document.querySelector("[data-co-shipping]").textContent =
    totals.shipping === 0 ? "FREE" : formatPrice(totals.shipping);

  document.querySelector("[data-co-total]").textContent =
    formatPrice(totals.total);

  return { cart, totals };
}


/* ---------- Success Modal ---------- */

function showSuccessModal(order) {
  let overlay = document.querySelector(".success-overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "modal-overlay success-overlay";

    overlay.innerHTML = `
      <div class="modal-box" style="grid-template-columns:1fr;">

        <button
          class="modal-close"
          data-close-success
          aria-label="Close"
        >✕</button>

        <div class="success-box">

          <div class="success-check">✓</div>

          <div class="display-md">
            Order Details Ready
          </div>

          <p style="margin-top:10px;color:var(--charcoal);">
            Thank you for shopping with Sadiya Fashions.
          </p>

          <div class="order-id-tag" data-success-order-id></div>

          <p style="font-size:14px;">
            Total:
            <strong data-success-total></strong>
          </p>

          <p style="margin-top:14px;">
            Your order details are ready to send through WhatsApp.
          </p>

          <button
            class="btn btn-block"
            style="margin-top:20px;"
            data-confirm-whatsapp
          >
            Confirm Order on WhatsApp
          </button>

          <p class="success-note">
            Please tap Send in WhatsApp to confirm your order.
            Sadiya Fashions will contact you to finalise payment and delivery.
          </p>

        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener("click", e => {
      if (e.target === overlay) {
        overlay.classList.remove("show");
        document.body.style.overflow = "";
      }
    });

    overlay.querySelector("[data-close-success]").addEventListener("click", () => {
      overlay.classList.remove("show");
      document.body.style.overflow = "";
    });
  }

  overlay.querySelector("[data-success-order-id]").textContent =
    order.orderId;

  overlay.querySelector("[data-success-total]").textContent =
    formatPrice(order.total);

  const waBtn = overlay.querySelector("[data-confirm-whatsapp]");

  waBtn.onclick = () => {
    openWhatsApp(generateWhatsAppMessage(order));
  };

  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}


/* ---------- Initialize Checkout Page ---------- */

function initCheckoutPage() {
  const form = document.querySelector("[data-checkout-form]");

  if (!form) return;

  const reviewData = renderOrderReview();

  const emptyNotice = document.querySelector("[data-checkout-empty]");

  if (!reviewData) {
    if (emptyNotice) {
      emptyNotice.style.display = "block";
    }

    form.style.display = "none";

    document.querySelectorAll("[data-checkout-summary]").forEach(el => {
      el.style.display = "none";
    });

    return;
  }


  /* Field validation events */

  form.querySelectorAll("input, textarea").forEach(input => {

    input.addEventListener("blur", () => {
      validateField(input);
    });

    input.addEventListener("input", () => {
      const field = input.closest(".form-field");

      if (field && field.classList.contains("error")) {
        validateField(input);
      }
    });

  });


  /* Place Order */

  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!validateCheckoutForm(form)) {
      showToast("Please fix the highlighted fields", "error");

      const firstError = form.querySelector(
        ".form-field.error input, .form-field.error textarea"
      );

      if (firstError) {
        firstError.focus();
      }

      return;
    }


    const cart = getCart().filter(item => getProductById(item.productId));

    if (!cart.length) {
      showToast("Your bag is empty", "error");
      return;
    }


    const totals = calculateTotals(cart);


    /* Create order */

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

        return {
          name: p.name,
          brand: p.brand,
          size: item.size,
          color: item.color,
          qty: item.qty,
          price: p.price
        };
      }),

      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total
    };


    /* Save order locally */

    safeSet("sadiya_last_order", order);


    /* Open WhatsApp immediately from the Place Order click */

    const whatsappMessage = generateWhatsAppMessage(order);

    openWhatsApp(whatsappMessage);


    /* Display order confirmation */

    showSuccessModal(order);

  });
}


/* ---------- Start Checkout ---------- */

document.addEventListener("DOMContentLoaded", initCheckoutPage);
