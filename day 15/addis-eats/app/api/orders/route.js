import { validate } from "../../lib/validate";
import { orders } from "../../data/orders";
import { getSession } from "@/lib/auth";

export async function GET(request) {
  const session = await getSession(request);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role === "staff") {
    return Response.json(orders);
  }

  const userOrders = orders.filter((o) => o.sessionId === session.id || o.userId === session.id);
  return Response.json(userOrders);
}

export async function POST(request) {
  const session = await getSession(request);
  if (!session) {
    return Response.json({ error: "Unauthorized: Active session required" }, { status: 401 });
  }

  const body = await request.json();
  const fieldErrors = validate(body);

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json({ error: "Validation failed", fieldErrors }, { status: 422 });
  }

  const order = {
    id: String(Date.now()),
    ...body,
    sessionId: session.id,
    userId: session.id,
    owner: session.name,
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  return Response.json(order, { status: 201 });
}
