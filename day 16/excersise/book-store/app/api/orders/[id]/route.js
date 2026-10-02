import { orders } from "../../../data/orders";

export async function GET(request, { params }) {
  const { id } = await params;
  const order = orders.find((o) => String(o.id) === String(id));

  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  return Response.json(order);
}
