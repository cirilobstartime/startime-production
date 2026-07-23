export interface Feature {
  id: number;
  documentId: string;
  featureTitle: string;
  featureDesc: string;
  locale: string;
  featureIcon: {
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
    };
  } | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FeaturesResponse {
  data: Feature[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}