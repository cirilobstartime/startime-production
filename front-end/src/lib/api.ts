const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export function getStrapiBaseUrl(): string {
  const isClient = typeof window !== "undefined";
  if (isClient && window.location.protocol === "https:") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "";
}

export async function fetchAPI<T>(
  endpoint: string,
  locale: string,
): Promise<T | null> {
  // On the client side over HTTPS, use a relative path so the browser sends
  // the request to the same origin (nginx then proxies /api/ → Strapi).
  // On the server side, use the direct internal URL from the env var.
  const isClient = typeof window !== "undefined";
  const baseUrl =
    isClient && window.location.protocol === "https:"
      ? `${window.location.origin}/api`
      : API_URL;

  const url = `${baseUrl}/${endpoint}?populate=*&locale=${locale}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return null;
  }
}
