import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "../component/common/NavBars/Navbar";
import Footer from "../component/common/Footer";
import BreadcrumbSchema from "../component/home/BreadcrumbSchema";
import { SearchProvider } from "@/contexts/searchContext";
import parse from 'html-react-parser'
import { getAllProjects } from "@/lib/services/project.service";
import { getTag } from "@/lib/services/tags.service";


const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASSENT",
  description: "",

  openGraph: {
    type: "website",
  },

  other: {
    "business:contact_data:street_address": "Dubai Industrial City",
    "business:contact_data:locality": "Dubai",
    "business:contact_data:region": "Dubai",
    "business:contact_data:postal_code": "38436",
    "business:contact_data:country_name": "United Arab Emirates (the)",
  },
};

// export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {



  const projectData = await getAllProjects();
  const categories = projectData.categories.map((item: { name: string; slug: string; }) => {
    return {
      name: item.name,
      slug: item.slug,
    }
  });

  const tagData = { tag: await getTag() };

  return (
    <html lang="en">

      {tagData?.tag && <head>

        {parse(tagData?.tag?.headerScript || "")}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.assentsteel.com/#localbusiness",
              "name": "Assent Steel",
              "url": "https://www.assentsteel.com/",
              "image": "https://www.assentsteel.com/assets/img/logo.svg",
              "telephone": "+971-4-247-1200",
              "email": "info@assentsteel.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Saih Shuaib 4, Dubai Industrial City",
                "postOfficeBoxNumber": "38436",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 24.830749,
                "longitude": 55.082948
              },
              "hasMap": "https://www.google.com/maps?cid=4653444714486657600",
              "parentOrganization": {
                "@id": "https://www.assentsteel.com/#organization"
              }
            }),
          }}
        />

      </head>}
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <BreadcrumbSchema />
        {tagData?.tag && <>{parse(tagData?.tag?.bodyScript || "")}</>}
        <SearchProvider>
          <Navbar categories={categories} />
          {children}
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
