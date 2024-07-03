/** @type {import('next').NextConfig} */
const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS || 'http://localhost:8000';
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [imageDomains ,'localhost.blog.weone'],
  },
};

export default nextConfig;
