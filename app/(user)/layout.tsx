import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "../component/common/NavBars/Navbar";
import Footer from "../component/common/Footer";
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
      {tagData?.tag && <head>{parse(tagData?.tag?.headerScript || "")}</head>}
      <body className={`${poppins.variable} font-poppins antialiased`}>
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
