import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// PWA manifest. Icons come from the MenQ Design Platform icon set (MenQ-Standard CR-0008).
// Manifest colors must be literal values: #020617 is the brand neutral-950 navy tile.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    start_url: "/hy",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [
      { src: "/brand/menq-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/menq-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/menq-icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
