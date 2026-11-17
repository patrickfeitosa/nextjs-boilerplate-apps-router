/** @type {import('next').NextConfig} */
const config = {
  // Proxy /api to the backend. Set BACKEND_URL (e.g. http://localhost:8080) to enable.
  async rewrites() {
    const backend = process.env.BACKEND_URL;

    return backend ? [{ destination: `${backend}/:path*`, source: '/api/:path*' }] : [];
  },
};

module.exports = config;
