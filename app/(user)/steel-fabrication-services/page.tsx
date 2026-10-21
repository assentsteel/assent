import Index from "@/app/component/Fabrication";

import { Metadata } from "next";
import { getFabrication } from "@/lib/services/fabrication.service";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFabrication();

  const metadataTitle = data?.seo?.metaTitle || "Assent";
  const metadataDescription =
    data?.seo?.metaDescription || "Assent";
    const ogImage = data?.seo?.ogImage || ""
    const ogType = (data?.seo?.ogType || "website") as "website";

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: "https://www.assentsteel.com/steel-fabrication-services",
    },
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: "https://www.assentsteel.com/steel-fabrication-services",
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
  "@id": "https://www.assentsteel.com/steel-fabrication-services#webpage",
  url: "https://www.assentsteel.com/steel-fabrication-services",
  name: "Steel Fabrication Company Dubai | Steel Fabricators",
  description:
    "Assent Steel, is a premier steel fabrication company in Dubai, UAE. We provide reliable, global steel solutions across various sectors.",
  isPartOf: { "@id": "https://www.assentsteel.com/#website" },
  breadcrumb: {
    "@id": "https://www.assentsteel.com/steel-fabrication-services#breadcrumb",
  },
  mainEntity: {
    "@id": "https://www.assentsteel.com/steel-fabrication-services#service",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.assentsteel.com/steel-fabrication-services#service",
  name: "Steel Fabrication Services",
  serviceType: "Structural steel fabrication",
  description:
    "Assent Steel, is a premier steel fabrication company in Dubai, UAE. We provide reliable, global steel solutions across various sectors.",
  url: "https://www.assentsteel.com/steel-fabrication-services",
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
    name: "Steel Fabrication Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CNC Cutting and Drilling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laser Cutting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Welding and Assembly" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shop Drawings" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Quality Inspection" } },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.assentsteel.com/steel-fabrication-services#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is structural steel fabrication, and what does the process involve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Structural steel fabrication involves cutting, drilling, welding, and assembling steel components from approved shop drawings. At ASSENT STEEL, the process starts with material receipt and inspection, followed by cutting, drilling, fit-up, welding, and staged quality checks. Completed members are then prepared for handover to the relevant coating or Steel Erection Services stage.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer CNC and laser cutting services in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. ASSENT STEEL provides CNC and laser cutting services from its facility at Dubai Industrial City. CNC processing provides consistent dimensions and repeatability across structural steel components. This is particularly useful for projects involving large quantities of repetitive members, where accurate cutting supports efficient fabrication and consistent assembly.",
      },
    },
    {
      "@type": "Question",
      name: "Do you produce shop drawings, or does the client supply them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both options are supported. ASSENT STEEL has an in-house detailing team that can produce shop drawings using Tekla, while fabrication can also proceed from client-supplied drawings. This flexibility allows contractors and EPCs to use Steel Engineering Services where required or provide approved fabrication information directly for production.",
      },
    },
    {
      "@type": "Question",
      name: "How is quality controlled during fabrication?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ASSENT STEEL maintains quality control through ISO 9001-certified processes and staged inspections throughout fabrication. Checks cover incoming materials, welding activities, and dimensional accuracy at relevant production stages. Material traceability documentation and inspection records are maintained through the fabrication process. These records provide documented quality information for handover and project closeout.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide both fabrication and on-site installation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. ASSENT STEEL provides both structural steel fabrication and dedicated Steel Erection Services. This gives contractors and EPCs a single point of accountability from fabrication through site installation. Coordinating both stages under one provider can also simplify project communication, scheduling, and the transfer of technical information between fabrication and erection teams.",
      },
    },
    {
      "@type": "Question",
      name: "How much do steel fabrication services cost in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Steel fabrication costs depend on project tonnage, structural complexity, specifications, applicable standards, and finishing requirements such as coating or fireproofing. For an accurate quotation, buyers should provide approved drawings, project specifications, required standards, estimated tonnage, and delivery timeline. ASSENT STEEL can then assess the scope and provide a project-specific quotation.",
      },
    },
    {
      "@type": "Question",
      name: "What size and scale of projects can you handle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ASSENT STEEL has a stated fabrication capacity of 120,000 tonnes per year, supported by a 2.7 million sq. ft. facility, including 1.1 million sq. ft. of covered space. The facility includes 15 fabrication bays and a workforce of 500+ fabrication staff. This capacity allows the company to support large-volume structural steel fabrication requirements across complex projects.",
      },
    },
    {
      "@type": "Question",
      name: "What support is provided after the project is completed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ASSENT STEEL provides project documentation at handover, including material test certificates and inspection records, along with after-sales technical support. Where required, clients can also access related Steel Blasting, Painting & Fireproofing and Steel Erection Services. This provides continued technical support across relevant stages of the structural steel project lifecycle.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.assentsteel.com/steel-fabrication-services#breadcrumb",
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
      name: "Steel Fabrication Services",
      item: "https://www.assentsteel.com/steel-fabrication-services",
    },
  ],
};

export default async function Page() {
  const data = await getFabrication();
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
