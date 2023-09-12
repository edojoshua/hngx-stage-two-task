/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'www.themoviedb.org',
          'image.tmdb.org',
        ],
      },
      experimental: {
        appDir: true,
      },
}

module.exports = nextConfig
