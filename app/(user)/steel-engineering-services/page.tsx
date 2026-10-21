import Index from "@/app/component/Engineering";

import { Metadata } from "next";
import { getEngineering } from "@/lib/services/engineering.service";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getEngineering();

  const metadataTitle = data?.seo?.metaTitle || "Assent";
  const metadataDescription =
    data?.seo?.metaDescription || "Assent";
    const ogImage = data?.seo?.ogImage || ""
    const ogType = (data?.seo?.ogType || "website") as "website";

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: "https://www.assentsteel.com/steel-engineering-services",
    },
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: "https://www.assentsteel.com/steel-engineering-services",
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
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.assentsteel.com/steel-engineering-services#webpage",
  url: "https://www.assentsteel.com/steel-engineering-services",
  name: "Steel Engineering Company Dubai | Steel Engineering Services",
  description:
    "Looking for reliable steel engineering services? We offer structural design & engineering support for industrial & commercial projects across the GCC & beyond.",
  isPartOf: { "@id": "https://www.assentsteel.com/#website" },
  breadcrumb: {
    "@id": "https://www.assentsteel.com/steel-engineering-services#breadcrumb",
  },
  mainEntity: {
    "@id": "https://www.assentsteel.com/steel-engineering-services#service",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.assentsteel.com/steel-engineering-services#service",
  name: "Steel Engineering Services",
  serviceType: "Structural steel engineering and detailing",
  description:
    "Looking for reliable steel engineering services? We offer structural design & engineering support for industrial & commercial projects across the GCC & beyond.",
  url: "https://www.assentsteel.com/steel-engineering-services",
  provider: { "@id": "https://www.assentsteel.com/#organization" },
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Oman" },
    { "@type": "Country", name: "Bahrain" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Steel Engineering Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Design of Statical Systems" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Connection Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Modelling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Material Take-off" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Preparation of Drawings" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Coordination with Other Trades" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Value Engineering & Design Proposals" } },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.assentsteel.com/steel-engineering-services#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "What software does ASSENT STEEL use for steel engineering and detailing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ASSENT STEEL uses industry-standard software including STAAD.Pro, ETABS, SAP, IDEA StatiCa, LIMCON, Tekla, and AutoCAD. These platforms support structural analysis, connection design, 3D modelling, detailing, and drawing production. Using the appropriate software for each engineering task helps the team coordinate design information accurately across complex structural steel projects.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide Tekla 3D modelling and BIM coordination services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. ASSENT STEEL provides Tekla 3D modelling and BIM coordination services, including detailed structural modelling, clash detection, and live model access where required. These capabilities help project teams identify coordination issues before fabrication and installation, improving communication between structural, architectural, MEP, and other trades throughout the project lifecycle.",
      },
    },
    {
      "@type": "Question",
      name: "How long does steel detailing take for a typical project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Detailing timelines depend on project tonnage, structural complexity, and how many trades need coordination. A straightforward warehouse structure moves faster than a high-rise with dense MEP coordination requirements. ASSENT STEEL provides a stage-by-stage detailing schedule at project kick-off, rather than a single estimate, so contractors can plan fabrication and erection dates around realistic milestones instead of guesswork.",
      },
    },
    {
      "@type": "Question",
      name: "How do you handle design changes and revisions mid-project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Design changes are logged, reviewed against the current structural model, and updated directly in the 3D model and shop drawings by the same in-house engineering team that produced the original design. Because engineering, fabrication, and erection sit under one roof at ASSENT STEEL, revisions are communicated to the fabrication team immediately, reducing the delay and miscommunication that typically occurs when changes pass through a separate design consultant.",
      },
    },
    {
      "@type": "Question",
      name: "What deliverables do we receive at the end of the engineering stage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At the end of the engineering stage, you receive the full structural design package: connection design details, 3D structural models, fabrication-ready shop drawings, and a material take-off confirming tonnage and section sizes. These deliverables are handed directly to the fabrication team internally at ASSENT STEEL, keeping the transition from design to production accurate and fully documented.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.assentsteel.com/steel-engineering-services#breadcrumb",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.assentsteel.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Steel Engineering Services",
      item: "https://www.assentsteel.com/steel-engineering-services",
    },
  ],
};
export default async function Page() {
  const data = await getEngineering();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Index data={data}/>
    </>
  );
}

