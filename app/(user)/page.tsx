import { getHome } from "@/lib/services/home.service";
import Index from "../component/home/Index";
import { Metadata } from "next";
import { getAllNews } from "@/lib/services/news.service";
import { getAllProjects } from "@/lib/services/project.service";
 

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHome();

  const metadataTitle = data?.seo?.metaTitle || "Assent";
  const metadataDescription =
    data?.seo?.metaDescription || "Assent";
    const ogImage = data?.seo?.ogImage || ""
    const ogType = (data?.seo?.ogType || "website") as "website";

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
    canonical: process.env.BASE_URL,
  },
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: process.env.BASE_URL,
      siteName: "Assent",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metadataTitle,
        },
      ],
      type: ogType,
    },
  };
}

export default async function Home() {
    const home = await getHome()
    const newsData = await getAllNews();
    const projData = await getAllProjects();
  return (
    <>
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
     <Index data={home} newsData={newsData}  projData={projData}/>
    </>
  );
}
 