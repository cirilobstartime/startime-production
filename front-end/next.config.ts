import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "startime.sa",
        pathname: "/uploads/**",
      },
      /*{
        protocol: "http" as const,
        hostname: "35.157.147.173",
        port: "1340",
        pathname: "/uploads/**",
      },*/
      {
        protocol: "https" as const,
        hostname: "cms.startime.sa",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
