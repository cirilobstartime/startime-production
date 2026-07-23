import { FAQ, FAQResponse } from "@/types/faq";
import { getStrapiBaseUrl } from "@/lib/api";

export async function getFaqs(locale: string): Promise<FAQ[]> {
  const STRAPI_URL = getStrapiBaseUrl();

  try {
    const res = await fetch(`${STRAPI_URL}/api/faqs?locale=${locale}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch FAQs: ${res.statusText}`);
    }

    const json: FAQResponse = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}
