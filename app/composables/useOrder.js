export const useOrder = () => {
  /* ----------------- CATEGORY ----------------- */
  const category = useState("order:product:filter", () => "all");
  const categories = useState("order:categories", () => []);

  /* ----------------- PRODUCTS ----------------- */
  const products = useState("order:products", () => []);

  const filteredProducts = computed(() => {
    if (category.value === "all") {
      return products.value ?? [];
    }

    const cat = (categories.value ?? []).find((c) => c.slug === category.value);
    if (!cat) return [];

    return (products.value ?? []).filter((p) => p.category_slug === cat.slug);
  });

  /* ----------------- CART ----------------- */
  const cart = useState("order:cart", () => []);
  const delivery = useState("order:delivery", () => false);
  const deliveryCost = computed(() => (delivery.value ? 30 : 0));

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

  const handleDelivery = (add) => {
    delivery.value = add;

    const deliveryIndex = cart.value.findIndex(
      (item) => item.name === "Dostawa",
    );

    if (add) {
      if (deliveryIndex === -1) {
        cart.value.push({
          productId: 0,
          name: "Dostawa",
          price: 30,
          qty: 1,
        });
      }
    } else {
      if (deliveryIndex !== -1) {
        cart.value.splice(deliveryIndex, 1);
      }
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

  const totalPrice = computed(
    () =>
      cart.value.reduce((sum, i) => sum + i.price * i.qty, 0) +
      deliveryCost.value,
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
    products,
    filteredProducts,
    handleDelivery,
    delivery,
    deliveryCost,
    cart,
    totalPrice,
    formatPrice,
    removeFromCart,
    addToCart,
    isInCart,
    getCartItem,
  };
};
