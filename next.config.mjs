/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Die FAQ selbst ist eine fertige Seite in public/faq.html.
  // Die Startadresse zeigt direkt auf sie.
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/faq.html" }] };
  },
};
export default nextConfig;
