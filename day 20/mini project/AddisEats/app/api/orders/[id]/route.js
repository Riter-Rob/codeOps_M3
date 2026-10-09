import { orders } from "../../../data/orders";
import { getSession } from "@/lib/auth";

export async function GET(request, { params }) {
  const { id } = await params;
  const session = await getSession(request);

  const order = orders.find((o) => String(o.id) === String(id));

  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  // Public live status tracking for demo Order #1 (or unassigned demo tickets)
  if (String(id) === "1" || !order.sessionId) {
    return Response.json(order);
  }

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (order.sessionId && order.sessionId !== session.id && session.role !== "staff") {
    return Response.json({ error: "Forbidden: Cannot access another account's order" }, { status: 403 });
  }

  return Response.json(order);
}
