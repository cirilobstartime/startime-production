import { Case, StrapiResponse } from "@/types/case";
import { getStrapiBaseUrl } from "@/lib/api";

export async function getCases(locale: string = "en"): Promise<Case[]> {
  const url = `${getStrapiBaseUrl()}/api/cases?populate=*&locale=${locale}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Error fetching cases: ${res.statusText}`);
    }

    const resData: StrapiResponse<Case> = await res.json();

    return resData.data;
  } catch (error) {
    console.error("Failed to load cases:", error);
    return [];
  }
}
