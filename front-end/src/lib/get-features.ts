import { Feature, FeaturesResponse } from "@/types/feature";
import { getStrapiBaseUrl } from "@/lib/api";

export async function getFeatures(locale: string): Promise<Feature[]> {
  const STRAPI_URL = getStrapiBaseUrl();
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/features?populate=*&locale=${locale}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch features: ${res.statusText}`);
    }
    const json: FeaturesResponse = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching features:", error);
    return [];
  }
}
