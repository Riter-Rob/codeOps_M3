"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { validate } from "../lib/validate";
import { orders } from "../data/orders";

export async function placeOrder(prevState, formData) {
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

  const cookieStore = await cookies();
  const sessionUser = cookieStore.get("session")?.value || cookieStore.get("user")?.value || data.name;

  const order = {
    id: String(Date.now()),
    ...data,
    owner: sessionUser,
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
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get("session")?.value || cookieStore.get("user")?.value;

  if (!sessionUser) {
    return { error: "Unauthorized: No active session" };
  }

  const order = orders.find((o) => String(o.id) === String(orderId));
  if (!order) {
    return { error: "Order not found" };
  }

  if (order.owner !== sessionUser && order.name !== sessionUser) {
    return { error: "Forbidden: Not the record owner" };
  }

  order.status = "cancelled";
  revalidatePath("/checkout");
  revalidatePath("/orders");
  return { success: true, order };
}
