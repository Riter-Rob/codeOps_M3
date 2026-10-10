import { orders } from "../../../data/orders";
import { getSession } from "@/lib/auth";

export async function GET(request, { params }) {
  const { id } = await params;
  const session = await getSession(request);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = orders.find((o) => String(o.id) === String(id));

  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.sessionId && order.sessionId !== session.id && session.role !== "staff") {
    return Response.json({ error: "Forbidden: Cannot access another account's order" }, { status: 403 });
  }

  return Response.json(order);
}
