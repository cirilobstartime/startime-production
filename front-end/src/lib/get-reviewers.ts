import { Reviewer, ReviewerResponse } from "@/types/reviewer";
import { getStrapiBaseUrl } from "@/lib/api";

export async function getReviewers(locale: string): Promise<Reviewer[]> {
  const STRAPI_URL = getStrapiBaseUrl();
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/reviewers?populate=*&locale=${locale}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch reviewers: ${res.statusText}`);
    }

    const json: ReviewerResponse = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching reviewers:", error);
    return [];
  }
}
