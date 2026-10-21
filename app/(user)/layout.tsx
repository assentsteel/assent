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
import Script from "next/script";


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
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.assentsteel.com/#organization",
  name: "Assent Steel",
  legalName: "ASSENT STEEL INDUSTRIES L.L.C",
  url: "https://www.assentsteel.com/",
  logo: "https://www.assentsteel.com/assets/img/logo.svg",
  description:
    "Dubai-based structural steel company providing steel engineering, fabrication, blasting, painting, fireproofing and erection services since 2008.",
  foundingDate: "2008",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Saih Shuaib 4, Dubai Industrial City",
    postOfficeBoxNumber: "38436",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  telephone: "+971-4-247-1200",
  email: "info@assentsteel.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+971-4-247-1200",
    email: "contactus@assentsteel.com",
  },
  sameAs: [
    "https://www.linkedin.com/company/assentsteel/",
    "https://www.facebook.com/assentsteel/",
    "https://www.instagram.com/assentsteel/",
    "https://www.youtube.com/@assentsteel",
  ],
};
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.assentsteel.com/#website",
    url: "https://www.assentsteel.com/",
    name: "Assent Steel",
    publisher: {
      "@id": "https://www.assentsteel.com/#organization",
    },
  };
  return (
    <html lang="en">
      <head><Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TG4NRJR');`}
      </Script></head>
      {/* {tagData?.tag && <head>

        {parse(tagData?.tag?.headerScript || "")}
       
        
      </head>} */}
      <body className={`${poppins.variable} font-poppins antialiased`}>
        {/* <BreadcrumbSchema /> */}
        {tagData?.tag && <>{parse(tagData?.tag?.bodyScript || "")}</>}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <SearchProvider>
          <Navbar categories={categories} />
          {children}
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
