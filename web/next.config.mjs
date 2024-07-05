/** @type {import('next').NextConfig} */
const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS || 'localhost';
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [imageDomains ,'localhost:8080'],
  },
};

export default nextConfig;
