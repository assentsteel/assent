
import Index from "@/app/component/BlogList/Index";
import { Metadata } from "next";
import {blogData} from "@/app/component/BlogList/data";
export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/news`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle || "Assent";
  const metadataDescription =
    data?.data?.metaDescription || "Assent";
    const ogImage = data?.data?.ogImage
    const ogType = data?.data?.ogType || "website"

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: "https://www.assentsteel.com/blogs",
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

export default async function Page() {
  // const response = await fetch(`${process.env.BASE_URL}/api/admin/news`, { next: { revalidate: 60 } });
//   const data =    { 
//   "data": {
//     "_id": "684018be28559952a82c4851",
//     "metaTitle": "Steel Constructions Project Events & News | Assent Steel Industry",
//     "metaDescription": "Stay updated about all the latest news and activities happening at ASSENT. Get fresh insights into what new projects we have undertaken, our employee performance, and much more.",
//     "pageTitle": "News",
//     "categories": [
//       {
//         "name": "Project Update", 
//       },
//       {
//         "name": "PPE Exhibition", 
//       },
//       {
//         "name": "Team Building", 
//       },
//       {
//         "name": "News", 
//       }
//     ],
//     "news": [
//       {
//         "mainTitle": "xxxxPPE Exhibition",
//         "subTitle": "",
//         "slug": "ppe-exhibition",
//         "content": "<p>Just because something is good doesn't mean that it can’t be improved.</p><p>This statement rings true at ASSENT STEEL as we completed the comprehensive overview of the recent Personal Protective Equipment (PPE) exhibit that took place at our facility.</p><p>The primary objective of this initiative was to enhance our PPE selection process, ensuring that we procure the most effective and reliable protective gear for our valued workforce.</p><p>The event attracted participation from 11 reputable vendors specializing in various PPE solutions. This diverse representation allowed us to explore a wide range of products, innovations, and technologies available in the market.</p><p>The collaboration with these vendors offered us valuable insights into the latest advancements and best practices in the realm of occupational safety.</p><p>There is ZERO complacency at ASSENT STEEL. We keep going to improve!</p>",
//         "thumbnail": "https://dl.dropboxusercontent.com/scl/fi/xv9ukpxfabt2l904ndxhb/1749540565140ren2.jpg?rlkey=u3lm84ljbv0c78omvctzz4g6s&dl=0",
//         "thumbnailAlt": "PPE Exhibition",
//         "images": [],
//         "category": "PPE Exhibition",
//         "date": "2025-12-16T00:00:00.000Z",
//         "metaTitle": "PPE Exhibition Highlights",
//         "metaDescription": "Explore the PPE Exhibition, highlighting workplace safety, innovation, and team involvement.",
//         "_id": "6997e53160eeb71c05a003af",
//         "createdAt": "2026-02-20T04:38:09.598Z"
//       },
//       {
//         "mainTitle": "Project Update – Westfield ERF 100% Delivered",
//         "subTitle": "",
//         "slug": "project-update-westfield-erf-100-delivered",
//         "content": "<p>ASSENT STEEL is thrilled to showcase the successful completion of our latest project in collaboration with Hitachi Zosen Inova. This endeavor has been a testament to our commitment to excellence, innovation, and client satisfaction.</p><p>ASSENT STEEL's scope of works included engineering verification, procurement, fabrication, galvanization, fireproof application, and supply of 3,000 tons of materials to the Energy from Waste plant (EfW) in Scotland.</p><p>We are proud to report zero fabrication errors on project completion. All ASSENT STEEL fabricated materials were meticulously checked and erected without any issues, ensuring the project's overall success.</p><p>We extend our gratitude to Hitachi Zosen Inova for entrusting us with this significant project. The collaborative efforts between our teams have resulted in the successful realization of a sustainable and efficient Energy from Waste plant project.</p>",
//         "thumbnail": "https://dl.dropboxusercontent.com/scl/fi/7809hsev8ggb4kfjb3l0o/17502513986601706537171.jpg?rlkey=1b8e55w251wff06lf275i5k9r&dl=0",
//         "thumbnailAlt": "Dubai Hills Estate Mall",
//         "images": [],
//         "category": "Project Update",
//         "date": "2026-01-04T00:00:00.000Z",
//         "metaTitle": "Westfield ERF 100 Project Update",
//         "metaDescription": "Read Project Update Westfield ERF 100 Delivered, showcasing progress, teamwork, and successful project delivery.",
//         "_id": "6997e497fc2615dc4fb8f7bc",
//         "createdAt": "2026-02-20T04:35:35.454Z"
//       }
//     ], 
//   }
// };
  return (
    <>
      <Index data={blogData}/>
    </>
  );
}
