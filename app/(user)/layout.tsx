import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "../component/common/NavBars/Navbar";
import Footer from "../component/common/Footer";
import BreadcrumbSchema from "../component/home/BreadcrumbSchema";
import { SearchProvider } from "@/contexts/searchContext";
import parse from 'html-react-parser'


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

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const response = await fetch(`${process.env.BASE_URL}/api/admin/projects`, { next: { revalidate: 60 } });
  const data = await response.json();
  const categories = data.data.categories.map((item: { name: string; slug: string; }) => {
    return {
      name: item.name,
      slug: item.slug,
    }
  });

  const tagResponse = await fetch(`${process.env.BASE_URL}/api/admin/tags`);
  const tagData = await tagResponse.json();

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
      "name": "Assent Steel",
      "url": "https://www.assentsteel.com/",
      "logo": "https://www.assentsteel.com/assets/img/logo.svg",
      "description":
        "ASSENT STEEL INDUSTRIES L.L.C is a Dubai-based structural steel fabrication and engineering company, delivering high-quality steel structures and turnkey construction solutions for landmark projects across the Middle East, GCC, Africa, and Southeast Asia.",
      "sameAs": [
        "https://www.linkedin.com/company/assentsteel/",
        "https://www.facebook.com/assentsteel/",
        "https://www.instagram.com/assentsteel/?hl=en",
        "https://www.youtube.com/@assentsteel"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dubai Industrial City",
        "addressLocality": "Dubai",
        "addressCountry": "United Arab Emirates",
        "postalCode": "38436"
      },
      "telephone": "+971-4-2471200",
      "email": ["info@assentsteel.com", "contactus@assentsteel.com"],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 24.830749,
        "longitude": 55.082948
      },
      "hasMap":
        "https://www.google.com/maps?ll=24.830749,55.082948&z=17&t=m&hl=en&gl=IN&mapclient=embed&cid=4653444714486657600"
    }),
  }}
/>

        </head>}
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <BreadcrumbSchema />
      {tagData?.tag && <>{parse(tagData?.tag?.bodyScript || "")}</>}
      <SearchProvider>
     <Navbar categories={categories}/>
        {children}
        <Footer />
      </SearchProvider>
      </body>
    </html>
  );
}
