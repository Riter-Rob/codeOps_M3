import { getApplications } from "../../../lib/applications";

export async function GET() {
  const apps = await getApplications();
  return Response.json(apps);
}
