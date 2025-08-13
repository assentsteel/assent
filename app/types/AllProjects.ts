export type AllProjects = {
data:{ 
    
      banner: string,
      bannerAlt: string,
      metaTitle: string,
      metaDescription: string,
      pageTitle: string,
      sector: string,
      location: string,
      categories: [
        {
          name: string,
          metaTitle: string,
          metaDescription: string,
          slug: string,
          projects: [
            {
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
              images: [
                string
              ]
            }
          ]
        }
      ]
}
}