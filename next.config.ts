import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dvz5kmwqx/image/upload/**/blog/**",
      },
    ],
  },
};

export default nextConfig;
