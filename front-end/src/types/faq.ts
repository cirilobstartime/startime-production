export interface FAQ {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FAQResponse {
  data: FAQ[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
