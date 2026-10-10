export const DELIVERY_FEE = 50;
export const MAX_QUANTITY = 20;

// Never use a browser-supplied name or price when accepting a selection.
export function resolveCartItems(selection, catalog) {
  if (!Array.isArray(selection) || selection.length === 0 || selection.length > catalog.length) {
    throw new Error("Choose at least one dish before checking out.");
  }
  const seen = new Set();
  return selection.map((item) => {
    const dish = catalog.find((entry) => String(entry.id) === String(item?.id));
    if (!dish || seen.has(dish.id) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_QUANTITY) {
      throw new Error(`Please review your cart. Quantities must be between 1 and ${MAX_QUANTITY}.`);
    }
    seen.add(dish.id);
    return { id: dish.id, name: dish.name, price: dish.price, image: dish.image, quantity: item.quantity };
  });
}

export function getCartTotals(items) {
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = itemCount > 0 ? DELIVERY_FEE : 0;
  return { itemCount, subtotal, deliveryFee, total: subtotal + deliveryFee };
}

export function filterDishes(catalog, category = "all", search = "") {
  const normalizedCategory = category.toLowerCase();
  const term = search.trim().toLowerCase();
  return catalog.filter((dish) =>
    (normalizedCategory === "all" || dish.category.toLowerCase() === normalizedCategory) &&
    (!term || `${dish.name} ${dish.summary} ${dish.ingredients}`.toLowerCase().includes(term))
  );
}
