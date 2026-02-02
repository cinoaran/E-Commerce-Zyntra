import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "r9q9iiavth.ufs.sh",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "newbalance.ch",
        port: "",
        pathname: "/cdn/shop/files/**",
      },
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
