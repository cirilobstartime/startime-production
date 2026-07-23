import React from "react";
import { fetchAPI } from "@/lib/api";
import ArenaFooterContent from "./ArenaFooterContent";

interface Props {
  locale: string;
}

export default async function ArenaFooter({ locale }: Props) {
  try {
    const response = await fetchAPI<any>("sss-arina-fifth-banners", locale);
    const data = response?.data?.[0];

    const policyData =
      data?.policy
        ?.map((block: any) =>
          block.children?.map((child: any) => child.text).join(" "),
        )
        .filter(Boolean) || [];

    return <ArenaFooterContent policyLines={policyData} locale={locale} />;
  } catch (error) {
    console.error("Error fetching policy:", error);
    return <ArenaFooterContent policyLines={[]} locale={locale} />;
  }
}
