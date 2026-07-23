export interface Service {
  id: number;
  documentId: string;
  title: string;
  quote: string;
  description: string;
  locale: string;
  serviceMedia_video?: {
    url: string;
    mime?: string;
  } | null;
  serviceMedia_image?: {
    url: string;
    formats?: {
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  } | null;
}

export interface ServiceResponse {
  data: Service[];
  meta: {
    pagination: {
      total: number;
    };
  };
}