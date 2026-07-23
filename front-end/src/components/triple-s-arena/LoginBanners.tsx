import React from "react";
import { fetchAPI } from "@/lib/api";
import LoginBannersContent from "./LoginBannersContent";

interface Props {
  locale: string;
}

export default async function LoginBanners({ locale }: Props) {
  const response = await fetchAPI<any>("sss-arina-fourth-banners", locale);
  const data = response?.data?.[0];

  const dynamicCards =
    data?.title?.map((item: any) => ({
      id: item.id,
      label: item.text_elment,
    })) || [];

  const loginLink = data?.login_link || "#";

  return (
    <LoginBannersContent
      cards={dynamicCards}
      loginLink={loginLink}
      locale={locale}
    />
  );
}
