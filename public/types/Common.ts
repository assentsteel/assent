 
  export type About = 
        {
          banner: string,
          bannerAlt: string,
          metaTitle: string,
          metaDescription: string,
          pageTitle: string,
          firstSection: {
            mainTitle: string,
            subTitle: string,
            description: string,
            items: [
              {
                number: string,
                value: string
              }
            ]
          },
          secondSection: {
            title: string,
            description: string,
            image1: string,
            image2: string,
            image1Alt: string,
            image2Alt: string
          },
          historySection: {
            title: string,
            items: [
              {
                year: string,
                title: string,
                description: string,
                image: string,
                imageAlt: string
              }
            ]
          },
          purposeSection: {
            title: string,
            description: string,
            image: string,
            imageAlt: string
          },
          coreValues: {
            title: string,
            items: [
              {
                title: string,
                description: string,
                image: string,
                imageAlt: string
              }
            ]
          }
        }
export type Gallery = [{
  title: string,
  thumbnail: string,
  thumbnailAlt: string,
  slug: string,
  images: string[]
}]
export type Gallerydata = 
{
  message: string;
  success: boolean;
  data: string[]
}
 