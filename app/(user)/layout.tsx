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
      <head>{parse(tagData.tag.headerScript)}</head>
      <body className={`${poppins.variable} font-poppins antialiased`}>
      {parse(tagData.tag.bodyScript)}
      <SearchProvider>
     <Navbar categories={categories}/>
        {children}
        <Footer />
      </SearchProvider>
      </body>
    </html>
  );
}
