/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self';
    script-src 'self' http://18.231.220.81:3001;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    connect-src 'self' http://18.231.220.81:3001;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

const nextConfig = {
  reactStrictMode: true,
  async headers() {
      return [
          {
              // matching all API routes
              source: "/api/:path*",
              headers: [
                {
                    key: 'Content-Security-Policy',
                    value: cspHeader.replace(/\n/g, ''),
                  },
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                  { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
          }
      ]
  }
}


export default nextConfig;
