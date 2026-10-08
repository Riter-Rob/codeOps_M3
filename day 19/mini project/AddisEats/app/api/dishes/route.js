import { dishes } from "../../data/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = (searchParams.get("search") || searchParams.get("q") || "").trim().toLowerCase();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "3", 10);

  let results = dishes;
  if (search) {
    results = results.filter((d) => d.name.toLowerCase().includes(search));
  }

  const total = results.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  return Response.json({
    dishes: paginated,
    total,
    totalPages,
    page
  });
}
