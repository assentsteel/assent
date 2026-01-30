"use client";

import { usePathname } from "next/navigation";

export default function BreadcrumbSchema() {
  const pathname = usePathname();

  // Do not render on Home page
  if (!pathname || pathname === "/") return null;

  const baseUrl = "https://www.assentsteel.com";

  const segments = pathname.split("/").filter(Boolean);

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "WebSite",
        "@id": `${baseUrl}/`,
        name: "Home",
      },
    },
    ...segments.map((segment, index) => {
      const url = `${baseUrl}/${segments
        .slice(0, index + 1)
        .join("/")}`;

      const name = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return {
        "@type": "ListItem",
        position: index + 2,
        item: {
          "@type": "WebPage",
          "@id": url,
          name,
        },
      };
    }),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />
  );
}
