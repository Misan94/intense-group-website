/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['nitex.com'],
    unoptimized: false,
  },
  // Enable static optimization for better SEO
  output: 'standalone',
  // Compress responses
  compress: true,
  // Generate sitemap
  generateBuildId: async () => {
    return 'nitex-recreation-build'
  }
}

module.exports = nextConfig
