/** @type {import('next').NextConfig} */
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const nextConfig = {
  images: {
    domains: [
      "erasedproject.com",
      "images.unsplash.com",
      "highcompanybr.com",
      "orangebrand.com.br",
      "www.beyondmedals.com",
      "res.cloudinary.com",
    ],
  },
  webpack(config, { isServer }) {
    config.cache = {
      type: "filesystem",
      buildDependencies: {
        config: [__filename],
      },
    };

    if (process.env.ANALYZE === "true") {
      config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
  },
};

module.exports = nextConfig;
