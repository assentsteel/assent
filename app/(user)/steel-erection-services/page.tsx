import Index from "@/app/component/Services";

import { Metadata } from "next";
import { getSteelErection } from "@/lib/services/steel-erection.service";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSteelErection();

  const metadataTitle = data?.seo?.metaTitle || "Assent";
  const metadataDescription =
    data?.seo?.metaDescription || "Assent";
    const ogImage = data?.seo?.ogImage || ""
    const ogType = (data?.seo?.ogType || "website") as "website";

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: "https://www.assentsteel.com/steel-erection-services",
    },
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: "https://www.assentsteel.com/steel-erection-services",
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
  "@id": "https://www.assentsteel.com/steel-erection-services#webpage",
  url: "https://www.assentsteel.com/steel-erection-services",
  name: "Steel Structure Erection Company UAE | Steel Installation",
  description:
    "Assent Steel delivers expert steel erection services for commercial & industrial projects. Trusted for safe execution & on-site efficiency worldwide.",
  isPartOf: { "@id": "https://www.assentsteel.com/#website" },
  breadcrumb: {
    "@id": "https://www.assentsteel.com/steel-erection-services#breadcrumb",
  },
  mainEntity: {
    "@id": "https://www.assentsteel.com/steel-erection-services#service",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.assentsteel.com/steel-erection-services#service",
  name: "Steel Erection Services",
  serviceType: "Structural steel erection",
  description:
    "Assent Steel delivers expert steel erection services for commercial & industrial projects. Trusted for safe execution & on-site efficiency worldwide.",
  url: "https://www.assentsteel.com/steel-erection-services",
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
    name: "Steel Erection Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Structural Steel Erection" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Steel Structure Installation" } },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.assentsteel.com/steel-erection-services#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is structural steel erection, and what does the process involve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Structural steel erection is the process of lifting, positioning, and permanently connecting fabricated steel members on site to form the completed structure. The process moves through site mobilisation, sequenced lifting and placement, bolted or welded connections, alignment and level verification, and final structural sign-off before the frame is handed over for subsequent trades to build upon.",
      },
    },
    {
      "@type": "Question",
      name: "What safety standards apply to steel erection, and how is site safety managed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Site safety on erection projects is managed through an ISO 45001 certified safety management system, supported by certified riggers and erectors, documented method statements, and project-specific risk assessments completed before work begins. Every lift follows a formal lift plan covering load, equipment, and site conditions, ensuring each stage of the erection sequence is planned and reviewed rather than carried out ad hoc.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide erection across the GCC and internationally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Direct erection services are provided across the UAE and GCC, including Qatar, Kuwait, and Iraq, with dedicated crews and equipment deployed on site. In the USA, UK, Europe, Africa, and Australia, erection is delivered on a support basis rather than as a direct service. This structure lets contractors managing GCC-based programmes work with one direct erection partner, while still receiving coordinated support on international projects.",
      },
    },
    {
      "@type": "Question",
      name: "How do you erect steel on a restricted or city-centre site?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erection on restricted or city-centre sites is planned around staged, sequenced lifting rather than a single continuous lift programme, using smaller or mobile cranes where tower crane access or laydown space is limited. Logistics and delivery timing are coordinated with other site trades and local traffic management requirements, so steel arrives in erection sequence rather than requiring on-site storage in an already constrained space.",
      },
    },
    {
      "@type": "Question",
      name: "What insurance and pre-qualification documentation do you carry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pre-qualification documentation includes ISO 9001, ISO 14001, and ISO 45001 certification, covering quality, environmental, and safety management respectively. Standard project insurances, including Contractor's All Risk and third-party liability cover, are maintained for erection works. Full policy documentation and coverage levels are provided to contractors and EPCs as part of the pre-qualification process for each project.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between erection and installation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erection refers specifically to the lifting, positioning, and structural connection of the primary steel frame on site. Installation, as used elsewhere on this site, generally refers to fitting secondary components or fixtures once the primary structure is in place. Keeping these terms distinct helps contractors scope work packages accurately when structural steel and secondary fit-out are handled separately.",
      },
    },
    {
      "@type": "Question",
      name: "How much steel can you erect per month?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erection capacity runs up to 4,000 tonnes per month, supported by dedicated crews, lifting equipment, and project supervision allocated specifically to erection work. This capacity allows large single-contract programmes to be erected on a defined schedule, without needing to split the scope across multiple erection subcontractors to meet tonnage targets.",
      },
    },
    {
      "@type": "Question",
      name: "What does steel erection cost per tonne in the UAE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no fixed rate per tonne, since erection cost depends on structural complexity, site access and crane requirements, lift sequencing, and project location within the UAE. Restricted or city-centre sites typically cost more to erect than open sites with straightforward crane access. Request a quote with your structural drawings and site details for pricing specific to your project.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.assentsteel.com/steel-erection-services#breadcrumb",
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
      name: "Steel Erection Services",
      item: "https://www.assentsteel.com/steel-erection-services",
    },
  ],
};
export default async function Page() {
  const data = await getSteelErection();
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
