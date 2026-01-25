export const useOrder = () => {
  /* ----------------- CATEGORY ----------------- */
  const category = useState("order:product:filter", () => "all");

  const categories = [
    { id: 0, slug: "all", name: "Wszystkie" },
    { id: 1, slug: "sets", name: "Zestawy" },
    { id: 2, slug: "appetizers", name: "Przystawki" },
    { id: 3, slug: "soups", name: "Zupy" },
    { id: 4, slug: "main", name: "Dania główne" },
  ];

  /* ----------------- PRODUCTS ----------------- */
  const products = [
    { id: 1, name: "Kotlet schabowy", price: 24.5, categoryId: 4 },
    { id: 2, name: "Rosół domowy", price: 18, categoryId: 3 },
    { id: 3, name: "Zestaw obiadowy", price: 39, categoryId: 1 },
  ];

  const filteredProducts = computed(() => {
    if (category.value === "all") return products;

    const cat = categories.find((c) => c.slug === category.value);
    if (!cat) return [];

    return products.filter((p) => p.categoryId === cat.id);
  });

  /* ----------------- CART ----------------- */
  const cart = useState("order:cart", () => []);

  const getCartItem = (id) => cart.value.find((item) => item.productId === id);

  const isInCart = (id) => !!getCartItem(id);

  const addToCart = (product) => {
    const item = getCartItem(product.id);

    if (item) {
      item.qty++;
    } else {
      cart.value.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
      });
    }
  };

  const removeFromCart = (id) => {
    const item = getCartItem(id);
    if (!item) return;

    if (item.qty === 1) {
      cart.value = cart.value.filter((i) => i.productId !== id);
    } else {
      item.qty--;
    }
  };

  const totalPrice = computed(() =>
    cart.value.reduce((sum, i) => sum + i.price * i.qty, 0),
  );

  const priceFormatter = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatPrice = (value) => priceFormatter.format(value);

  return {
    category,
    categories,
    filteredProducts,
    cart,
    totalPrice,
    formatPrice,
    removeFromCart,
    addToCart,
    isInCart,
    getCartItem,
  };
};
