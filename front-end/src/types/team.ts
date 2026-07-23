export interface TeamMember {
  id: number;
  documentId: string;
  teamName: string;
  teamRole: string;
  locale: string;
  teamImage: {
    url: string;
    formats?: {
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
}

export interface TeamResponse {
  data: TeamMember[];
  meta: {
    pagination: {
      total: number;
    };
  };
}
