export interface Industry {
  id: number;
  documentId: string;
  title: string;
  heading: string;
  description: string;
  locale: string;
  industryServices: string;
  industryVideo?: {
    url: string;
    mime: string;
  } | null;
  industryImage?: {
    url: string;
    formats?: {
      medium?: { url: string };
    };
  } | null;
}

export interface IndustryResponse {
  data: Industry[];
  meta: {
    pagination: {
      total: number;
    };
  };
}
