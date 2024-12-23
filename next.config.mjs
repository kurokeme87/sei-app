/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    INFURA_API_KEY: process.env.INFURA_API_KEY,
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    // config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "encoding");
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/stargate",
        destination: "https://www.stargatefinance.org/stargate",
      },
      { source: "/symbiosis", destination: "https://symbiosisfinances.com" },
      // { source: "/jumper", destination: "https://jumperfinances.com" },
    ];
  },
};

export default nextConfig;
