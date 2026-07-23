export interface Reviewer {
  id: number;
  documentId: string;
  clientQuote: string;
  clientName: string;
  clientPosition: string;
  companyName: string;
  locale: string;
  clientAvatar: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
    };
  };
}

export interface ReviewerResponse {
  data: Reviewer[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
