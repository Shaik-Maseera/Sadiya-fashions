
/* ==========================================================================
   SADIYA FASHIONS — Product Database
   Centralized product data used across every page.
   ========================================================================== */

const products = [
  // =====================================================
  // T-SHIRTS — FIRST 6 PRODUCTS
  // =====================================================

  {
    id: 1,
    name: "Korean Oversized Black T-Shirt",
    brand: "Hanlim Atelier",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 4.8,
    reviews: 126,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    description: "A heavyweight 260gsm cotton tee cut with a dropped shoulder and boxy oversized silhouette, straight off the Seoul streetwear playbook. Garment-washed for a broken-in feel from day one.",
    images: ["assets/images/T-shirt1.jpeg"],
    badge: "50% OFF",
    stock: 15,
    dateAdded: "2026-06-01"
  },
  {
    id: 2,
    name: "Minimal White Graphic T-Shirt",
    brand: "Blanc Seoul",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 4.6,
    reviews: 84,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    description: "Clean off-white tee with a minimal chest print and reinforced collar. Cut for a relaxed regular fit that layers well under overshirts.",
    images: ["assets/images/T-shirt2.jpeg"],
    badge: "50% OFF",
    stock: 22,
    dateAdded: "2026-07-14"
  },
  {
    id: 3,
    name: "Seoul Streetwear Oversized Tee",
    brand: "Hanlim Atelier",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 4.7,
    reviews: 61,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Black"],
    description: "Drop-shoulder streetwear tee with a raw-edge hem and back placement print inspired by Seoul's Seongsu-dong studios. Runs true to an oversized fit.",
    images: ["assets/images/T-shirt3.jpeg"],
    badge: "50% OFF",
    stock: 18,
    dateAdded: "2026-05-20"
  },
  {
    id: 4,
    name: "Premium Cream Boxy T-Shirt",
    brand: "Studio Mù",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 4.5,
    reviews: 39,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream"],
    description: "A boxy, structured tee in premium combed cotton with a subtle ribbed collar. Understated and versatile — the everyday foundation piece.",
    images: ["assets/images/T-shirt4.jpeg"],
    badge: "50% OFF",
    stock: 30,
    dateAdded: "2026-04-11"
  },
  {
    id: 5,
    name: "Chinese Street Style Graphic Tee",
    brand: "Lóng Wear",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 4.9,
    reviews: 152,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey"],
    description: "Bold front graphic inspired by Shanghai gallery poster art, printed on a heavyweight oversized tee. A statement piece for the front row of the drop.",
    images: ["assets/images/T-shirt5.jpeg"],
    badge: "50% OFF",
    stock: 12,
    dateAdded: "2026-06-25"
  },
  {
    id: 6,
    name: "Washed Grey Oversized Tee",
    brand: "Blanc Seoul",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 4.4,
    reviews: 47,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey"],
    description: "Pigment-washed for a faded, lived-in tone with a soft-hand finish. Dropped shoulders and a slightly cropped body length.",
    images: ["assets/images/T-shirt6.jpeg"],
    badge: "50% OFF",
    stock: 25,
    dateAdded: "2026-03-02"
  },

  // =====================================================
  // SHIRTS
  // =====================================================

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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
    badge: "BESTSELLER",
    stock: 14,
    dateAdded: "2026-06-10"
  },

  // =====================================================
  // JEANS / HOODIES CATEGORY
  // IMAGES LEFT EMPTY FOR NOW
  // =====================================================

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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
    badge: "",
    stock: 17,
    dateAdded: "2026-01-30"
  },

  // =====================================================
  // ADDITIONAL T-SHIRTS — UNIQUE PRODUCT NAMES
  // IMAGES 7 AND 9 TO 20
  // =====================================================

  {
    id: 15,
    name: "Urban Monochrome Graphic Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A modern graphic tee designed for a stylish everyday streetwear look.",
    images: ["assets/images/T-shirt7.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 16,
    name: "Contemporary Mandarin Collar Shirt",
    brand: "Sadiya Fashions",
    category: "Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A smart casual shirt offering a clean and contemporary look for everyday wear.",
    images: ["assets/images/T-shirt8.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 17,
    name: "Retro Street Graphic Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A retro-inspired graphic tee that brings personality to your casual wardrobe.",
    images: ["assets/images/T-shirt9.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 18,
    name: "Essential Everyday Cotton Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A comfortable everyday cotton tee with a versatile casual style.",
    images: ["assets/images/T-shirt10.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 19,
    name: "Urban Classic Printed Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A printed streetwear tee made for effortless everyday styling.",
    images: ["assets/images/T-shirt11.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 20,
    name: "Korean Minimal Streetwear Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A minimal Korean-inspired tee with a relaxed and contemporary feel.",
    images: ["assets/images/T-shirt12.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 21,
    name: "Bold Statement Graphic Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A bold graphic tee that adds a distinctive touch to your streetwear collection.",
    images: ["assets/images/T-shirt13.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 22,
    name: "Relaxed Fit Premium Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A relaxed-fit tee designed to deliver comfort with a modern casual silhouette.",
    images: ["assets/images/T-shirt14.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 23,
    name: "Contemporary Printed Street Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A contemporary printed tee for a fresh and expressive everyday look.",
    images: ["assets/images/T-shirt15.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 24,
    name: "Classic Oversized Graphic Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A classic oversized graphic tee made for relaxed street-inspired outfits.",
    images: ["assets/images/T-shirt16.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 25,
    name: "Modern Minimalist Cotton Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A minimalist cotton tee offering a clean look and easy everyday comfort.",
    images: ["assets/images/T-shirt17.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 26,
    name: "Premium Urban Style Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A premium-inspired streetwear tee for versatile everyday outfits.",
    images: ["assets/images/T-shirt18.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 27,
    name: "Everyday Street Fashion Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A versatile street fashion tee designed for comfortable daily styling.",
    images: ["assets/images/T-shirt19.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  },
  {
    id: 28,
    name: "Signature Graphic Streetwear Tee",
    brand: "Sadiya Fashions",
    category: "T-Shirts",
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: 0,
    reviews: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [],
    description: "A signature-inspired graphic tee to complete your modern streetwear look.",
    images: ["assets/images/T-shirt20.jpeg"],
    badge: "50% OFF",
    stock: 10,
    dateAdded: "2026-11-18"
  }
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
      products.filter(
        p => p.id !== product.id && p.category !== product.category
      )
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
