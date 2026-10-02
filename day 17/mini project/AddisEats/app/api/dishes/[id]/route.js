import { dishes } from "../../../data/dishes";

export async function GET(request, { params }) {
  const { id } = await params;
  const dish = dishes.find((d) => String(d.id) === String(id));

  if (!dish) {
    return Response.json({ error: "Dish not found" }, { status: 404 });
  }

  return Response.json(dish);
}
