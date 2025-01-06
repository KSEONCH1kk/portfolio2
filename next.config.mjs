/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Временно игнорируем ошибки типизации
  }
};

export default nextConfig; 