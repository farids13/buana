module.exports = {
  reactStrictMode: false,
  transpilePackages: ["ui"],
  output: "standalone",
  images: {
    domains: [],
    formats: [],
  },
  webpack(config) {
    // Konfigurasi webpack Anda
    return config;
  },
  experimental: {
    serverActions: true,
  },
};
