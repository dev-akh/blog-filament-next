/** @type {import('next').NextConfig} */
const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS || 'localhost';
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [imageDomains ,'localhost'],
  },
};

export default nextConfig;
