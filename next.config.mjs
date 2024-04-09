/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "openweathermap.org",
        pathname: "/img/w/*",
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
