import { getJobs } from "../../../lib/jobs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const location = searchParams.get("location") || "All";

  const list = await getJobs({ search, category, location });
  return Response.json(list);
}
