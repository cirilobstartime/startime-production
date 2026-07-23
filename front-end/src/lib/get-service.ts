import { Service, ServiceResponse } from "@/types/service";
import { getStrapiBaseUrl } from "@/lib/api";

export async function getServices(locale: string): Promise<Service[]> {
  const STRAPI_URL = getStrapiBaseUrl();

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/services?populate=*&locale=${locale}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch services: ${res.statusText}`);
    }

    const json: ServiceResponse = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}
