import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const name = process.env.NEXT_PUBLIC_MANIFEST_NAME ?? "Arshad Arshadli CV";
  const shortName = process.env.NEXT_PUBLIC_MANIFEST_SHORT_NAME ?? "AA CV";
  const themeColor = process.env.NEXT_PUBLIC_THEME_COLOR ?? "#17161b";
  const display =
    (process.env.NEXT_PUBLIC_MANIFEST_DISPLAY as
      | "standalone"
      | "fullscreen"
      | "minimal-ui"
      | "browser") ?? "standalone";

  return {
    name,
    short_name: shortName,
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: themeColor,
    background_color: themeColor,
    display,
  };
}
