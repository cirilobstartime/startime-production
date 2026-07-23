import { Industry, IndustryResponse } from "@/types/industry";
import { getStrapiBaseUrl } from "@/lib/api";

export async function getIndustries(locale: string): Promise<Industry[]> {
  const STRAPI_URL = getStrapiBaseUrl();

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/industries?populate=*&locale=${locale}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch industries: ${res.statusText}`);
    }

    const json: IndustryResponse = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching industries:", error);
    return [];
  }
}
