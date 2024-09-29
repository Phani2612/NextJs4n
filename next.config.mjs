// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;



export default {
  reactStrictMode: true,
  async rewrites() {
      return [
          {
              source: '/teeevologin',
              destination: `https://testing-mocha-eight.vercel.app/login`, // Redirect to teeevo content
          },

          {
            source: '/url',
            destination: `https://testing-z13w.vercel.app/`, // Redirect to teeevo content
        },

      ];
  },
};
