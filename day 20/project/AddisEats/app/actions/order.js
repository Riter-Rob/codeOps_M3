"use server";

import { revalidatePath } from "next/cache";
import { validate } from "../lib/validate";
import { resolveCartItems, getCartTotals } from "../lib/cart";
import { dishes } from "../data/dishes";
import { orders } from "../data/orders";
import { getSession } from "@/lib/auth";

export async function placeOrder(prevState, formData) {
  const session = await getSession();

  if (!session) {
    return {
      fieldErrors: { auth: "Unauthorized: Active session required" },
      data: {},
      success: false
    };
  }

  const data = {
    name: formData.get("name") || "",
    phone: formData.get("phone") || "",
    area: formData.get("area") || "",
    notes: formData.get("notes") || ""
  };

  const fieldErrors = validate(data);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      fieldErrors,
      data,
      success: false
    };
  }

  // Never trust browser-supplied names or prices: rebuild the cart from the catalog.
  let lineItems;
  try {
    const parsed = JSON.parse(formData.get("selection") || "[]");
    lineItems = resolveCartItems(parsed, dishes);
  } catch (error) {
    return {
      fieldErrors: { cart: error.message || "Your cart could not be verified. Please review it and try again." },
      data,
      success: false
    };
  }

  const totals = getCartTotals(lineItems);

  const order = {
    id: String(Date.now()),
    ...data,
    lineItems: lineItems.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
    subtotal: totals.subtotal,
    deliveryFee: totals.deliveryFee,
    total: totals.total,
    userId: session.id,
    sessionId: session.id,
    owner: session.name,
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  revalidatePath("/checkout");
  revalidatePath("/orders");

  return {
    success: true,
    order,
    fieldErrors: {}
  };
}

export const createOrder = placeOrder;

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    return { error: "Unauthorized: Active session required" };
  }

  const order = orders.find((o) => String(o.id) === String(orderId));
  if (!order) {
    return { error: "Order not found" };
  }

  if (order.sessionId !== session.id && session.role !== "staff") {
    return { error: "Forbidden: Not the record owner" };
  }

  order.status = "cancelled";
  revalidatePath("/checkout");
  revalidatePath("/orders");
  return { success: true, order };
}
