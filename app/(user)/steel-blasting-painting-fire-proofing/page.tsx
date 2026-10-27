import Index from "@/app/component/Blasting";

import { Metadata } from "next";
import { getBlasting } from "@/lib/services/blasting.service";

const parseSeoSchema = (schema?: string) => {
  if (!schema) return null;

  try {
    const trimmedSchema = schema.trim();

    if (!trimmedSchema) return null;

    const scriptMatch = trimmedSchema.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
    );

    const schemaContent = scriptMatch?.[1]?.trim() || trimmedSchema;
    return JSON.parse(schemaContent);
  } catch (error) {
    console.error("Invalid blasting seoSchema JSON-LD", error);
    return null;
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getBlasting();

  const metadataTitle = data?.seo?.metaTitle || "Assent";
  const metadataDescription =
    data?.seo?.metaDescription || "Assent";
    const ogImage = data?.seo?.ogImage || ""
    const ogType = (data?.seo?.ogType || "website") as "website";

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: "https://www.assentsteel.com/steel-blasting-painting-fire-proofing",
    },
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: "https://www.assentsteel.com/steel-blasting-painting-fire-proofing",
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
// const webPageSchema = {
//   "@context": "https://schema.org",
//   "@type": "WebPage",
//   "@id": "https://www.assentsteel.com/steel-blasting-painting-fire-proofing#webpage",
//   url: "https://www.assentsteel.com/steel-blasting-painting-fire-proofing",
//   name: "Steel Blasting, Painting & Fireproofing Services | Assent Steel",
//   description:
//     "Assent provides professional steel blasting, paint coating, & fireproofing services. Designed to improve durability, corrosion protection, & fire safety performance.",
//   isPartOf: { "@id": "https://www.assentsteel.com/#website" },
//   breadcrumb: {
//     "@id": "https://www.assentsteel.com/steel-blasting-painting-fire-proofing#breadcrumb",
//   },
//   mainEntity: {
//     "@id": "https://www.assentsteel.com/steel-blasting-painting-fire-proofing#service",
//   },
// };

// const serviceSchema = {
//   "@context": "https://schema.org",
//   "@type": "Service",
//   "@id": "https://www.assentsteel.com/steel-blasting-painting-fire-proofing#service",
//   name: "Steel Blasting, Painting & Fireproofing Services",
//   serviceType: "Steel surface preparation and protective coating",
//   description:
//     "Assent provides professional steel blasting, paint coating, & fireproofing services. Designed to improve durability, corrosion protection, & fire safety performance.",
//   url: "https://www.assentsteel.com/steel-blasting-painting-fire-proofing",
//   provider: { "@id": "https://www.assentsteel.com/#organization" },
//   areaServed: [
//     { "@type": "Country", name: "United Arab Emirates" },
//     { "@type": "Country", name: "Saudi Arabia" },
//     { "@type": "Country", name: "Qatar" },
//     { "@type": "Country", name: "Kuwait" },
//     { "@type": "Country", name: "Oman" },
//     { "@type": "Country", name: "Bahrain" },
//   ],
//   hasOfferCatalog: {
//     "@type": "OfferCatalog",
//     name: "Steel Blasting, Painting & Fireproofing Services",
//     itemListElement: [
//       { "@type": "Offer", itemOffered: { "@type": "Service", name: "Steel Blasting" } },
//       { "@type": "Offer", itemOffered: { "@type": "Service", name: "Protective Painting" } },
//       { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fireproofing" } },
//     ],
//   },
// };

// const faqSchema = {
//   "@context": "https://schema.org",
//   "@type": "FAQPage",
//   "@id": "https://www.assentsteel.com/steel-blasting-painting-fire-proofing#faq",
//   mainEntity: [
//     {
//       "@type": "Question",
//       name: "What is steel blasting, and why is it done before painting?",
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: "Steel blasting is the surface preparation process that removes rust, mill scale, and contaminants from steel, creating the surface profile required for paint to bond properly. It is carried out to the surface cleanliness standard specified for each project. Skipping or under-specifying this step is the most common cause of early coating failure, since paint applied over an unprepared surface cannot achieve proper adhesion.",
//       },
//     },
//     {
//       "@type": "Question",
//       name: "How long does a protective coating on structural steel last?",
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: "Coating life depends on the system specified. Standard multi-coat systems perform well in moderate environments, while high-durability, marine-grade systems are specified for higher-exposure conditions and offer a longer service life. Gulf coastal conditions, with higher humidity and salt exposure, place greater demand on coating performance than inland, temperate environments, which is why system selection should be matched to the site's exposure category.",
//       },
//     },
//     {
//       "@type": "Question",
//       name: "Can blasting, painting and fireproofing be done in the shop rather than on site?",
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: "Yes, blasting, painting, and fireproofing are all carried out in-house at our facility, which includes a 30,000 square metre blasting and painting area with a painting capacity of 84,000 square metres per month. Shop-applied coating and fireproofing offer tighter quality control than site application, since environmental conditions such as humidity, dust, and temperature can be controlled inside the facility rather than depending on site weather.",
//       },
//     },
//     {
//       "@type": "Question",
//       name: "How much does steel blasting and painting cost per square metre?",
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: "There is no fixed rate per square metre, since cost depends on the coating system specification, total surface area, the corrosion or environmental category of the project, and whether fireproofing is also required alongside blasting and painting. Request a quote with your project scope and specification to receive pricing specific to your requirements.",
//       },
//     },
//     {
//       "@type": "Question",
//       name: "How do coastal and high-humidity Gulf conditions affect coating selection?",
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: "Gulf coastal conditions increase chloride exposure and humidity, both of which accelerate corrosion on unprotected or under-specified steel. This drives selection toward higher-durability, multi-coat systems, such as epoxy primers paired with polyurethane topcoats, rather than standard inland specifications. Coating selection for a UAE coastal project should always account for this exposure category, since a system suited to a dry inland site will underperform in a coastal one.",
//       },
//     },
//     {
//       "@type": "Question",
//       name: "What is the maximum size and weight of steel you can blast and paint?",
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: "Capacity is tied to our 30,000 square metre blasting and painting facility, which handles a painting throughput of 84,000 square metres per month. This scale supports large single-contract packages, including high-tonnage structural steel programmes and oversized members, without needing to subcontract surface treatment to a separate facility or an external vendor.",
//       },
//     },
//     {
//       "@type": "Question",
//       name: "How long does the blasting and painting process take for a typical project?",
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: "Duration depends on total tonnage or surface area and the coating system specified, since each coat requires a defined cure time before the next can be applied. A single-coat system moves through the process faster than a multi-coat, high-durability specification, where cure time between coats extends the overall schedule. Your fabricator can provide a stage-by-stage timeline once the coating specification and quantity are confirmed.",
//       },
//     },
//     {
//       "@type": "Question",
//       name: "What type of fireproofing do you offer?",
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: "ASSENT STEELS provides intumescent and cementitious fireproofing systems for structural steel, based on the project's required fire rating and application requirements. The appropriate system is selected according to the substrate, specified fire rating, environmental exposure, and project requirements. This approach allows contractors, EPCs, and consultants to specify a fireproofing system suited to the structural and performance requirements of each project.",
//       },
//     },
//   ],
// };

// const breadcrumbSchema = {
//   "@context": "https://schema.org",
//   "@type": "BreadcrumbList",
//   "@id": "https://www.assentsteel.com/steel-blasting-painting-fire-proofing#breadcrumb",
//   itemListElement: [
//     {
//       "@type": "ListItem",
//       position: 1,
//       name: "Home",
//       item: "https://www.assentsteel.com/",
//     },
//     {
//       "@type": "ListItem",
//       position: 2,
//       name: "Steel Blasting, Painting & Fireproofing Services",
//       item: "https://www.assentsteel.com/steel-blasting-painting-fire-proofing",
//     },
//   ],
// };
export default async function Page() {
  const data = await getBlasting();
  const customSchema = parseSeoSchema(data?.seo?.schema);
  return (
    <>
      {customSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
        />
      )}
      <Index data={data}/>
    </>
  );
}

