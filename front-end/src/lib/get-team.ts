import { TeamMember, TeamResponse } from "@/types/team";
import { getStrapiBaseUrl } from "@/lib/api";

export async function getTeam(locale: string): Promise<TeamMember[]> {
  const STRAPI_URL = getStrapiBaseUrl();

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/teams?populate=*&locale=${locale}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch team data: ${res.statusText}`);
    }

    const json: TeamResponse = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching team:", error);
    return [];
  }
}
