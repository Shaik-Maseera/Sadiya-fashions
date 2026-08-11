/* ==========================================================================
   SADIYA FASHIONS — Product Database
   Centralized product data used across every page.
   Replace the `img()` calls with real photography paths (e.g. assets/images/..)
   whenever you have final product shoots — see README notes at the bottom.
   ========================================================================== */

/**
 * Builds a placeholder product image.
 * Swap this for real photography later: just change the `images` arrays
 * below to point at files inside /assets/images/.
 */
function img(bg, label, fg) {
  fg = fg || "F6F2E9";
  const text = encodeURIComponent(label);
  return `https://placehold.co/900x1200/${bg}/${fg}?text=${text}&font=raleway`;
}

const PALETTE_A = "29271F"; // charcoal
const PALETTE_B = "DCD2BC"; // stone
const PALETTE_C = "121110"; // ink
const PALETTE_D = "AE9860"; // gold

const products = [
  {
    id: 1,
    name: "Korean Oversized Black T-Shirt",
    brand: "Hanlim Atelier",
    category: "T-Shirts",
    price: 1299,
    oldPrice: 1599,
    discount: 19,
    rating: 4.8,
    reviews: 126,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    description: "A heavyweight 260gsm cotton tee cut with a dropped shoulder and boxy oversized silhouette, straight off the Seoul streetwear playbook. Garment-washed for a broken-in feel from day one.",
    // images: [img(PALETTE_C, "Hanlim+Atelier+01"), img(PALETTE_A, "Hanlim+Atelier+02")],
    images: ["assets/images/t-shirt.jpeg"],
    badge: "BESTSELLER",
    stock: 15,
    dateAdded: "2026-06-01"
  },
  {
    id: 2,
    name: "Minimal White Graphic T-Shirt",
    brand: "Blanc Seoul",
    category: "T-Shirts",
    price: 999,
    oldPrice: 1299,
    discount: 23,
    rating: 4.6,
    reviews: 84,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    description: "Clean off-white tee with a minimal chest print and reinforced collar. Cut for a relaxed regular fit that layers well under overshirts.",
    images: ["assets/images/t-shirt2.jpeg"],
    badge: "NEW",
    stock: 22,
    dateAdded: "2026-07-14"
  },
  {
    id: 3,
    name: "Seoul Streetwear Oversized Tee",
    brand: "Hanlim Atelier",
    category: "T-Shirts",
    price: 1199,
    oldPrice: 1499,
    discount: 20,
    rating: 4.7,
    reviews: 61,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Black"],
    description: "Drop-shoulder streetwear tee with a raw-edge hem and back placement print inspired by Seoul's Seongsu-dong studios. Runs true to an oversized fit.",
    images: ["assets/images/t-shirt3.jpeg"],
    badge: "",
    stock: 18,
    dateAdded: "2026-05-20"
  },
  {
    id: 4,
    name: "Premium Cream Boxy T-Shirt",
    brand: "Studio Mù",
    category: "T-Shirts",
    price: 1099,
    oldPrice: 0,
    discount: 0,
    rating: 4.5,
    reviews: 39,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream"],
    description: "A boxy, structured tee in premium combed cotton with a subtle ribbed collar. Understated and versatile — the everyday foundation piece.",
    images: ["assets/images/t-shirt4.jpeg"],
    badge: "",
    stock: 30,
    dateAdded: "2026-04-11"
  },
  {
    id: 5,
    name: "Chinese Street Style Graphic Tee",
    brand: "Lóng Wear",
    category: "T-Shirts",
    price: 1349,
    oldPrice: 1699,
    discount: 21,
    rating: 4.9,
    reviews: 152,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey"],
    description: "Bold front graphic inspired by Shanghai gallery poster art, printed on a heavyweight oversized tee. A statement piece for the front row of the drop.",
    // images: [img(PALETTE_C, "Long+Wear+01"), img(PALETTE_A, "Long+Wear+02")],
    images: ["assets/images/img-2.jpeg"],
    badge: "BESTSELLER",
    stock: 12,
    dateAdded: "2026-06-25"
  },
  {
    id: 6,
    name: "Washed Grey Oversized Tee",
    brand: "Blanc Seoul",
    category: "T-Shirts",
    price: 949,
    oldPrice: 1199,
    discount: 21,
    rating: 4.4,
    reviews: 47,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey"],
    description: "Pigment-washed for a faded, lived-in tone with a soft-hand finish. Dropped shoulders and a slightly cropped body length.",
    // images: [img(PALETTE_B, "Washed+Grey+Tee+01", "121110"), img(PALETTE_A, "Washed+Grey+Tee+02")],
    images: ["assets/images/t-shirt.jpeg"],
    badge: "",
    stock: 25,
    dateAdded: "2026-03-02"
  },
  {
    id: 7,
    name: "Korean Relaxed Oxford Shirt",
    brand: "Hanlim Atelier",
    category: "Shirts",
    price: 1899,
    oldPrice: 2399,
    discount: 21,
    rating: 4.7,
    reviews: 73,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Sky Blue"],
    description: "Relaxed-fit oxford shirt in a soft cotton weave with a slightly longer hem for that off-duty Seoul menswear look. Works buttoned up or layered open.",
    images: [img(PALETTE_B, "Oxford+Shirt+01", "121110"), img(PALETTE_D, "Oxford+Shirt+02", "121110")],
    badge: "",
    stock: 20,
    dateAdded: "2026-05-05"
  },
  {
    id: 8,
    name: "Mandarin Collar Casual Shirt",
    brand: "Lóng Wear",
    category: "Shirts",
    price: 1699,
    oldPrice: 0,
    discount: 0,
    rating: 4.6,
    reviews: 55,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Beige"],
    description: "Structured mandarin collar shirt with a clean placket and horn-style buttons — a modern nod to classic Chinese tailoring.",
    images: [img(PALETTE_C, "Mandarin+Collar+01"), img(PALETTE_A, "Mandarin+Collar+02")],
    badge: "NEW",
    stock: 16,
    dateAdded: "2026-07-20"
  },
  {
    id: 9,
    name: "Oversized Black Cuban Collar Shirt",
    brand: "Studio Mù",
    category: "Shirts",
    price: 1799,
    oldPrice: 2199,
    discount: 18,
    rating: 4.5,
    reviews: 33,
    sizes: ["M", "L", "XL"],
    colors: ["Black"],
    description: "Boxy Cuban collar shirt in a lightweight viscose blend. Open-necked resort styling built for an oversized, effortless drape.",
    images: [img(PALETTE_A, "Cuban+Collar+01"), img(PALETTE_C, "Cuban+Collar+02")],
    badge: "",
    stock: 9,
    dateAdded: "2026-02-14"
  },
  {
    id: 10,
    name: "Premium Linen Casual Shirt",
    brand: "Hanlim Atelier",
    category: "Shirts",
    price: 2099,
    oldPrice: 2599,
    discount: 19,
    rating: 4.8,
    reviews: 90,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "White"],
    description: "Breathable linen-cotton blend shirt with a relaxed camp collar. Built for warm days without giving up on tailoring.",
    images: ["assets/images/t-shirt.jpeg"],
    badge: "BESTSELLER",
    stock: 14,
    dateAdded: "2026-06-10"
  },
  {
    id: 11,
    name: "Korean Straight Fit Blue Jeans",
    brand: "Studio Mù",
    category: "Hoodies",
    price: 2299,
    oldPrice: 2799,
    discount: 18,
    rating: 4.6,
    reviews: 108,
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Blue"],
    description: "Mid-wash straight fit denim with a clean, tapered leg opening. Rigid selvedge-style construction that softens beautifully with wear.",
    images: [img(PALETTE_C, "Straight+Jeans+01"), img(PALETTE_A, "Straight+Jeans+02")],
    badge: "",
    stock: 21,
    dateAdded: "2026-04-28"
  },
  {
    id: 12,
    name: "Relaxed Black Denim",
    brand: "Lóng Wear",
    category: "Hoodies",
    price: 2199,
    oldPrice: 0,
    discount: 0,
    rating: 4.5,
    reviews: 44,
    sizes: ["30", "32", "34", "36"],
    colors: ["Black"],
    description: "Sulphur-black denim in a relaxed fit with minimal fading for a clean, monochrome look. A streetwear staple that pairs with everything.",
    images: [img(PALETTE_A, "Relaxed+Black+Denim+01"), img(PALETTE_C, "Relaxed+Black+Denim+02")],
    badge: "",
    stock: 19,
    dateAdded: "2026-03-19"
  },
  {
    id: 13,
    name: "Wide Leg Washed Jeans",
    brand: "Hanlim Atelier",
    category: "Hoodies",
    price: 2399,
    oldPrice: 2899,
    discount: 17,
    rating: 4.7,
    reviews: 66,
    sizes: ["30", "32", "34", "36"],
    colors: ["Washed Blue"],
    description: "Wide-leg silhouette in a vintage-washed denim with a dropped crotch for the exaggerated Korean streetwear drape.",
    images: [img(PALETTE_B, "Wide+Leg+Jeans+01", "121110"), img(PALETTE_D, "Wide+Leg+Jeans+02", "121110")],
    badge: "NEW",
    stock: 13,
    dateAdded: "2026-07-02"
  },
  {
    id: 14,
    name: "Vintage Grey Denim",
    brand: "Studio Mù",
    category: "Hoodies",
    price: 2099,
    oldPrice: 2499,
    discount: 16,
    rating: 4.3,
    reviews: 28,
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Grey"],
    description: "Stonewashed grey denim with a soft broken-in hand feel and a tapered straight leg. Understated and easy to style.",
    images: [img(PALETTE_A, "Vintage+Grey+Denim+01"), img(PALETTE_C, "Vintage+Grey+Denim+02")],
    badge: "",
    stock: 17,
    dateAdded: "2026-01-30"
  },
  // {
  //   id: 15,
  //   name: "Korean Wide Leg Trousers",
  //   brand: "Blanc Seoul",
  //   category: "Trousers",
  //   price: 1899,
  //   oldPrice: 2299,
  //   discount: 17,
  //   rating: 4.8,
  //   reviews: 97,
  //   sizes: ["S", "M", "L", "XL"],
  //   colors: ["Black", "Charcoal"],
  //   description: "Fluid wide-leg tailored trousers with a pressed centre crease. A cornerstone of the Korean minimalist wardrobe — smart or casual.",
  //   images: [img(PALETTE_C, "Wide+Trousers+01"), img(PALETTE_A, "Wide+Trousers+02")],
  //   badge: "BESTSELLER",
  //   stock: 24,
  //   dateAdded: "2026-05-15"
  // },
  // {
  //   id: 16,
  //   name: "Relaxed Beige Trousers",
  //   brand: "Studio Mù",
  //   category: "Trousers",
  //   price: 1799,
  //   oldPrice: 0,
  //   discount: 0,
  //   rating: 4.4,
  //   reviews: 31,
  //   sizes: ["S", "M", "L", "XL"],
  //   colors: ["Beige"],
  //   description: "Relaxed tapered trousers in soft cotton twill with an elasticated drawcord waist for all-day comfort.",
  //   images: [img(PALETTE_B, "Beige+Trousers+01", "121110"), img(PALETTE_D, "Beige+Trousers+02", "121110")],
  //   badge: "",
  //   stock: 20,
  //   dateAdded: "2026-02-27"
  // },
  // {
  //   id: 17,
  //   name: "Black Pleated Trousers",
  //   brand: "Hanlim Atelier",
  //   category: "Trousers",
  //   price: 2199,
  //   oldPrice: 2599,
  //   discount: 15,
  //   rating: 4.6,
  //   reviews: 52,
  //   sizes: ["S", "M", "L", "XL"],
  //   colors: ["Black"],
  //   description: "Double-pleated front trousers with a tailored drape, cut wide through the leg. Editorial-ready formalwear with a street edge.",
  //   images: [img(PALETTE_A, "Pleated+Trousers+01"), img(PALETTE_C, "Pleated+Trousers+02")],
  //   badge: "",
  //   stock: 11,
  //   dateAdded: "2026-06-18"
  // },
  // {
  //   id: 18,
  //   name: "Korean Cargo Trousers",
  //   brand: "Lóng Wear",
  //   category: "Cargo Pants",
  //   price: 2099,
  //   oldPrice: 2499,
  //   discount: 16,
  //   rating: 4.7,
  //   reviews: 118,
  //   sizes: ["S", "M", "L", "XL", "XXL"],
  //   colors: ["Olive", "Black"],
  //   description: "Multi-pocket cargo trousers with articulated knees and a tapered ankle. Utility detailing meets Seoul streetwear proportions.",
  //   images: [img(PALETTE_C, "Cargo+Trousers+01"), img(PALETTE_A, "Cargo+Trousers+02")],
  //   badge: "BESTSELLER",
  //   stock: 27,
  //   dateAdded: "2026-04-03"
  // },
  // {
  //   id: 19,
  //   name: "Oversized Black Hoodie",
  //   brand: "Studio Mù",
  //   category: "Hoodies",
  //   price: 1999,
  //   oldPrice: 2499,
  //   discount: 20,
  //   rating: 4.9,
  //   reviews: 203,
  //   sizes: ["S", "M", "L", "XL", "XXL"],
  //   colors: ["Black"],
  //   description: "Heavyweight 400gsm fleece hoodie with an oversized dropped shoulder and kangaroo pocket. The everyday layer built to last seasons.",
  //   images: [img(PALETTE_A, "Black+Hoodie+01"), img(PALETTE_C, "Black+Hoodie+02")],
  //   badge: "BESTSELLER",
  //   stock: 31,
  //   dateAdded: "2026-05-29"
  // },
  // {
  //   id: 20,
  //   name: "Cream Minimal Hoodie",
  //   brand: "Blanc Seoul",
  //   category: "Hoodies",
  //   price: 1899,
  //   oldPrice: 0,
  //   discount: 0,
  //   rating: 4.5,
  //   reviews: 58,
  //   sizes: ["S", "M", "L", "XL"],
  //   colors: ["Cream"],
  //   description: "Minimal cream hoodie in brushed-back fleece with a clean chest wordmark. Soft, warm and endlessly wearable.",
  //   images: [img(PALETTE_B, "Cream+Hoodie+01", "121110"), img(PALETTE_D, "Cream+Hoodie+02", "121110")],
  //   badge: "NEW",
  //   stock: 18,
  //   dateAdded: "2026-07-25"
  // },
  // {
  //   id: 21,
  //   name: "Korean Graphic Hoodie",
  //   brand: "Hanlim Atelier",
  //   category: "Hoodies",
  //   price: 2199,
  //   oldPrice: 2699,
  //   discount: 19,
  //   rating: 4.7,
  //   reviews: 76,
  //   sizes: ["S", "M", "L", "XL", "XXL"],
  //   colors: ["Charcoal"],
  //   description: "Statement back-print hoodie with dropped shoulders and ribbed cuffs, designed with Seongsu-dong studio artwork.",
  //   images: [img(PALETTE_A, "Graphic+Hoodie+01"), img(PALETTE_C, "Graphic+Hoodie+02")],
  //   badge: "",
  //   stock: 15,
  //   dateAdded: "2026-03-11"
  // },
  // {
  //   id: 22,
  //   name: "Premium Bomber Jacket",
  //   brand: "Lóng Wear",
  //   category: "Jackets",
  //   price: 3499,
  //   oldPrice: 4299,
  //   discount: 19,
  //   rating: 4.8,
  //   reviews: 64,
  //   sizes: ["S", "M", "L", "XL"],
  //   colors: ["Black", "Olive"],
  //   description: "Classic bomber silhouette in a technical shell fabric with ribbed collar, cuffs and hem. Lined for cold-weather layering.",
  //   images: [img(PALETTE_C, "Bomber+Jacket+01"), img(PALETTE_A, "Bomber+Jacket+02")],
  //   badge: "LIMITED",
  //   stock: 6,
  //   dateAdded: "2026-06-05"
  // },
  // {
  //   id: 23,
  //   name: "Korean Denim Jacket",
  //   brand: "Studio Mù",
  //   category: "Jackets",
  //   price: 2999,
  //   oldPrice: 3599,
  //   discount: 17,
  //   rating: 4.6,
  //   reviews: 41,
  //   sizes: ["S", "M", "L", "XL"],
  //   colors: ["Blue"],
  //   description: "Boxy trucker jacket in rigid mid-wash denim with a dropped shoulder seam for the oversized Korean fit.",
  //   images: [img(PALETTE_B, "Denim+Jacket+01", "121110"), img(PALETTE_D, "Denim+Jacket+02", "121110")],
  //   badge: "",
  //   stock: 10,
  //   dateAdded: "2026-02-08"
  // },
  // {
  //   id: 24,
  //   name: "Oversized Utility Jacket",
  //   brand: "Hanlim Atelier",
  //   category: "Jackets",
  //   price: 3199,
  //   oldPrice: 0,
  //   discount: 0,
  //   rating: 4.4,
  //   reviews: 22,
  //   sizes: ["S", "M", "L", "XL", "XXL"],
  //   colors: ["Olive", "Black"],
  //   description: "Multi-pocket utility jacket in a washed cotton canvas with an oversized fit and adjustable drawcord hem.",
  //   images: [img(PALETTE_A, "Utility+Jacket+01"), img(PALETTE_C, "Utility+Jacket+02")],
  //   badge: "NEW",
  //   stock: 12,
  //   dateAdded: "2026-07-30"
  // },
  // {
  //   id: 25,
  //   name: "Black Streetwear Co-ord",
  //   brand: "Lóng Wear",
  //   category: "Co-ords",
  //   price: 3299,
  //   oldPrice: 3899,
  //   discount: 15,
  //   rating: 4.8,
  //   reviews: 87,
  //   sizes: ["S", "M", "L", "XL"],
  //   colors: ["Black"],
  //   description: "Matching oversized tee and relaxed shorts co-ord set in heavyweight jersey. Sold as a set for an instant head-to-toe look.",
  //   images: [img(PALETTE_C, "Black+Coord+01"), img(PALETTE_A, "Black+Coord+02")],
  //   badge: "BESTSELLER",
  //   stock: 14,
  //   dateAdded: "2026-05-08"
  // },
  // {
  //   id: 26,
  //   name: "Beige Summer Co-ord",
  //   brand: "Blanc Seoul",
  //   category: "Co-ords",
  //   price: 2999,
  //   oldPrice: 0,
  //   discount: 0,
  //   rating: 4.5,
  //   reviews: 36,
  //   sizes: ["S", "M", "L", "XL"],
  //   colors: ["Beige"],
  //   description: "Lightweight shirt and shorts co-ord in a breathable cotton-linen blend, built for warm-weather layering.",
  //   images: [img(PALETTE_B, "Beige+Coord+01", "121110"), img(PALETTE_D, "Beige+Coord+02", "121110")],
  //   badge: "",
  //   stock: 16,
  //   dateAdded: "2026-04-19"
  // },
  // {
  //   id: 27,
  //   name: "Korean Relaxed Co-ord",
  //   brand: "Studio Mù",
  //   category: "Co-ords",
  //   price: 3099,
  //   oldPrice: 3599,
  //   discount: 14,
  //   rating: 4.6,
  //   reviews: 49,
  //   sizes: ["S", "M", "L", "XL"],
  //   colors: ["Charcoal"],
  //   description: "Relaxed overshirt and trouser co-ord in a soft brushed fabric — a full look designed to be worn together or separated.",
  //   images: [img(PALETTE_A, "Relaxed+Coord+01"), img(PALETTE_C, "Relaxed+Coord+02")],
  //   badge: "",
  //   stock: 9,
  //   dateAdded: "2026-03-25"
  // },
  // {
  //   id: 28,
  //   name: "Minimal Fashion Cap",
  //   brand: "Hanlim Atelier",
  //   category: "Accessories",
  //   price: 799,
  //   oldPrice: 999,
  //   discount: 20,
  //   rating: 4.5,
  //   reviews: 112,
  //   sizes: ["One Size"],
  //   colors: ["Black", "Beige"],
  //   description: "Six-panel cap in brushed cotton twill with a low profile crown and an embroidered eyelet vent — a quiet finishing piece.",
  //   images: [img(PALETTE_C, "Fashion+Cap+01"), img(PALETTE_A, "Fashion+Cap+02")],
  //   badge: "",
  //   stock: 40,
  //   dateAdded: "2026-01-12"
  // },
  // {
  //   id: 29,
  //   name: "Premium Casual Belt",
  //   brand: "Studio Mù",
  //   category: "Accessories",
  //   price: 899,
  //   oldPrice: 0,
  //   discount: 0,
  //   rating: 4.3,
  //   reviews: 27,
  //   sizes: ["S/M", "L/XL"],
  //   colors: ["Black", "Brown"],
  //   description: "Full-grain leather belt with a brushed matte gold buckle. A refined everyday accessory built to age well.",
  //   images: [img(PALETTE_B, "Casual+Belt+01", "121110"), img(PALETTE_D, "Casual+Belt+02", "121110")],
  //   badge: "",
  //   stock: 35,
  //   dateAdded: "2026-02-20"
  // },
  // {
  //   id: 30,
  //   name: "Korean Streetwear Crossbody Bag",
  //   brand: "Lóng Wear",
  //   category: "Accessories",
  //   price: 1599,
  //   oldPrice: 1999,
  //   discount: 20,
  //   rating: 4.7,
  //   reviews: 71,
  //   sizes: ["One Size"],
  //   colors: ["Black"],
  //   description: "Compact technical crossbody bag in water-resistant nylon with multiple zip compartments and an adjustable strap.",
  //   images: [img(PALETTE_C, "Crossbody+Bag+01"), img(PALETTE_A, "Crossbody+Bag+02")],
  //   badge: "NEW",
  //   stock: 23,
  //   dateAdded: "2026-07-08"
  // }
];

/* ---------------- Shared product helpers ---------------- */

function getAllProducts() {
  return products;
}

function getProductById(id) {
  const numId = Number(id);
  return products.find(p => p.id === numId) || null;
}

function getRelatedProducts(product, count) {
  count = count || 4;
  return products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, count)
    .concat(
      products.filter(p => p.id !== product.id && p.category !== product.category)
    )
    .slice(0, count);
}

function getCategories() {
  const set = new Set(products.map(p => p.category));
  return Array.from(set);
}

function getBrands() {
  const set = new Set(products.map(p => p.brand));
  return Array.from(set);
}

function getNewArrivals(count) {
  count = count || 8;
  return [...products]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, count);
}
