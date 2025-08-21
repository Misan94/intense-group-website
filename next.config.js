/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['intensegroup.com'],
    unoptimized: false,
  },
  // Enable static optimization for better SEO
  output: 'standalone',
  // Compress responses
  compress: true,
  // Generate sitemap
  generateBuildId: async () => {
    return 'intense-group-build'
  }
}

module.exports = nextConfig
