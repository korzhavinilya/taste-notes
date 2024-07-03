/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tea-mail.by'
      }
    ]
  }
};

export default nextConfig;
