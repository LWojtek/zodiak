export const useOrder = () => {
  /* ----------------- CATEGORY ----------------- */
  const category = useState("order:product:filter", () => "all");
  const categories = useState("order:categories", () => []);

  /* ----------------- PRODUCTS ----------------- */
  const products = useState("order:products", () => []);

  const filteredProducts = computed(() => {
    if (category.value === "all") return products.value ?? [];

    const cat = (categories.value ?? []).find((c) => c.slug === category.value);
    if (!cat) return [];

    return (products.value ?? []).filter((p) => p.category_slug === cat.slug);
  });

  /* ----------------- CART ----------------- */
  /**
   * MODEL POZYCJI W KOSZYKU:
   * {
   *   key,
   *   productId,
   *   name,
   *   qty,
   *   basePrice,
   *   addons: [{ id, name, price }],
   *   addonsPrice,
   *   unitPrice,
   *   totalPrice
   * }
   */
  const cart = useState("order:cart", () => []);
  const delivery = useState("order:delivery", () => false);

  /* ----------------- HELPERS ----------------- */

  const normalizeAddons = (addons = []) =>
    (addons ?? [])
      .filter(Boolean)
      .map((a) => ({
        id: a.id,
        name: a.name,
        price: Number(a.price ?? 0),
      }))
      .sort((a, b) => String(a.id).localeCompare(String(b.id)));

  const buildCartKey = (product, addons = []) => {
    const ids = normalizeAddons(addons)
      .map((a) => a.id)
      .join(",");
    return `${product.id}:${ids}`;
  };

  const getCartItem = (keyOrProductId) =>
    cart.value.find((i) => i.key === keyOrProductId) ||
    cart.value.find((i) => i.productId === keyOrProductId);

  const getProductQty = (productId) =>
    cart.value
      .filter((i) => i.productId === productId)
      .reduce((sum, i) => sum + i.qty, 0);

  /* ----------------- ADD TO CART ----------------- */

  const addToCart = ({ product, addons = [] }) => {
    const normalizedAddons = normalizeAddons(addons);
    const key = buildCartKey(product, normalizedAddons);

    const existing = cart.value.find((i) => i.key === key);
    if (existing) {
      existing.qty += 1;
      existing.totalPrice = existing.unitPrice * existing.qty;
      return;
    }

    const basePrice = Number(product.price ?? 0);
    const addonsPrice = normalizedAddons.reduce((sum, a) => sum + a.price, 0);

    const unitPrice = basePrice + addonsPrice;

    cart.value.push({
      key,
      productId: product.id,
      name: product.name,
      qty: 1,

      basePrice,
      addons: normalizedAddons,
      addonsPrice,

      unitPrice,
      totalPrice: unitPrice,
    });
  };

  /* ----------------- REMOVE ----------------- */

  const removeOneProduct = (keyOrProductId) => {
    const index = cart.value.findIndex(
      (i) => i.key === keyOrProductId || i.productId === keyOrProductId,
    );
    if (index === -1) return;

    const item = cart.value[index];

    if (item.qty > 1) {
      item.qty -= 1;
      item.totalPrice = item.unitPrice * item.qty;
    } else {
      cart.value.splice(index, 1);
    }
  };

  /* ----------------- DELIVERY ----------------- */

  const handleDelivery = (add) => {
    delivery.value = add;

    const deliveryIndex = cart.value.findIndex((i) => i.key === "delivery");

    if (add && deliveryIndex === -1) {
      cart.value.push({
        key: "delivery",
        productId: 0,
        name: "Dostawa",
        qty: 1,
        basePrice: 30,
        addons: [],
        addonsPrice: 0,
        unitPrice: 30,
        totalPrice: 30,
      });
    }

    if (!add && deliveryIndex !== -1) {
      cart.value.splice(deliveryIndex, 1);
    }
  };

  /* ----------------- TOTAL ----------------- */

  const totalPrice = computed(() =>
    cart.value.reduce((sum, i) => sum + Number(i.totalPrice ?? 0), 0),
  );

  /* ----------------- FORMAT ----------------- */

  const priceFormatter = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatPrice = (value) => priceFormatter.format(Number(value ?? 0));

  /* ----------------- EXPORT ----------------- */

  return {
    // category
    category,
    categories,
    products,
    filteredProducts,

    // cart
    cart,
    addToCart,
    removeOneProduct,
    getProductQty,
    getCartItem,

    // delivery
    delivery,
    handleDelivery,

    // totals
    totalPrice,
    formatPrice,
  };
};
