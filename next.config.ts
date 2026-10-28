import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  // CRITICAL: repo sandbox'ta nested (mini-services) çalışıyor — çoklu lockfile yüzünden
  // Turbopack workspace root'unu /home/z/my-project seçip tüm ağacı izliyor, bellek şişiyordu.
  turbopack: {
    root: path.resolve(__dirname, "."),
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // 4GB sandbox'ta 8 servis birlikte çalışıyor — Turbopack bellek tavanını
  // sabitle (gnc-erp next.config.ts ile aynı desen).
  experimental: {
    turbopackMemoryLimit: 512,
  },
};

export default nextConfig;
