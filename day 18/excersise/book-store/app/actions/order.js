"use server";

import { revalidatePath } from "next/cache";
import { validate } from "../lib/validate";
import { orders } from "../data/orders";
import { getSession } from "@/lib/auth";

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

  const session = await getSession();
  const sessionUser = session?.name || data.name;
  const sessionId = session?.id || "guest";

  const order = {
    id: String(Date.now()),
    ...data,
    userId: sessionId,
    sessionId: sessionId,
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
  const session = await getSession();

  if (!session) {
    return { error: "Unauthorized: No active session" };
  }

  const order = orders.find((o) => String(o.id) === String(orderId));
  if (!order) {
    return { error: "Order not found" };
  }

  if (order.sessionId !== session.id && order.owner !== session.name && session.role !== "staff") {
    return { error: "Forbidden: Not the record owner" };
  }

  order.status = "cancelled";
  revalidatePath("/checkout");
  revalidatePath("/orders");
  return { success: true, order };
}
