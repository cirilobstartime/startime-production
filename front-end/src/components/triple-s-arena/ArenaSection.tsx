import React from "react";
import { fetchAPI } from "@/lib/api";
import ArenaSectionContent from "./ArenaSectionContent";

interface Props {
  locale: string;
}

export default async function ArenaSection({ locale }: Props) {
  const response = await fetchAPI<any>("sss-arina-third-banners", locale);
  const data = response?.data?.[0];

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

  // Dynamic Background Image from API
  const bgImage = data?.background?.url
    ? `${STRAPI_URL}${data.background.url}`
    : null;

  const description = data?.description || "";

  return <ArenaSectionContent bgImage={bgImage} description={description} />;
}
