import { dishes } from "../../data/dishes";

export async function GET() {
  return Response.json(dishes);
}
