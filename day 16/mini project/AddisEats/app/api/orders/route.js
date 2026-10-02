import { validate } from "../../lib/validate";
import { orders } from "../../data/orders";

export async function GET() {
  return Response.json(orders);
}

export async function POST(request) {
  const body = await request.json();
  const fieldErrors = validate(body);

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json({ error: "Validation failed", fieldErrors }, { status: 422 });
  }

  const order = {
    id: String(Date.now()),
    ...body,
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  return Response.json(order, { status: 201 });
}
