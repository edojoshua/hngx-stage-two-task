/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'www.themoviedb.org',
        ],
      },
      experimental: {
        appDir: true,
      },
}

module.exports = nextConfig
