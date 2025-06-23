import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "../component/common/NavBars/Navbar";
import Footer from "../component/common/Footer";
import SmoothScroll from "../component/common/SmoothScroll";


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
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
      <SmoothScroll/>
     <Navbar categories={categories}/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
