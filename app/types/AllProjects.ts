import { Seo } from "@/public/types/Common";

export type AllProjects = {
data:{ 
    
      banner: string,
      bannerAlt: string,
      seo?: Seo,
      pageTitle: string,
      sector: string,
      location: string,
      categories: {
          name: string,
          seo?: Seo,
          slug: string,
          projects: {
              _id: string,
              banner: string,
              bannerAlt: string,
              pageTitle: string,
              description: string,
              title: string,
              slug: string,
              sector: string,
              location: string,
              employer: string,
              contractor: string,
              consultant: string,
              scope: string,
              steelTonnage: string,
              thumbnail: string,
              thumbnailAlt: string,
              metaTitle: string,
              metaDescription: string,
              ogTitle?: string,
              ogDescription?: string,
              ogType?: string,
              ogImage?: string,
              twitterTitle?: string,
              twitterDescription?: string,
              twitterImage?: string,
              schema?: string,
              images: [
                string
              ]
            }[]
        }[]
}
}