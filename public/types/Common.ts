 
 
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
        export type  Abtpurpose = {
          title: string;
          description: string;
          image: string;
          imageAlt: string;
      }
      export type textbyimg = {
        title: string,
        description: string,
        image1?: string,
        image2?: string,
        image1Alt?: string,
        image2Alt?: string

        image?: string,
        imageAlt?: string,  
        items?: [
          {
            number: string,
            value: string
          }
        ]

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
export type News =  
  {
    metaTitle: string,
    metaDescription: string,
    pageTitle: string,
    banner: string,
    bannerAlt: string,
    categories: [
      {
        name: string
      }
    ],
    news:
      {
        mainTitle: string,
        subTitle: string,
        slug: string,
        content: string,
        thumbnail: string,
        thumbnailAlt: string,
        images: string[],
        category: string,
        createdAt: string,
        metaTitle: string,
        metaDescription: string,
        _id: number,
        date: string
      }[]
  } 
  export type Newsdetails =  
  
    {
      data: 
        {
          category: string,
          content: string,
          createdAt: string, 
          date: string,
          images: string[],  
          mainTitle: string,
          metaDescription: string
          metaTitle: string,
          slug: string,
          subTitle: string,
          thumbnail: string,
          thumbnailAlt: string,
          _id: number,
        }
      
    }    
    export type Awards =  
    
    {
      banner: string,
      bannerAlt: string,
      pageTitle: string,
      metaTitle: string,
      metaDescription: string,
      awards: [
        {
          title: string,
          image: string,
          imageAlt: string
        }
      ]
    } 
    export type Career={
      banner: string,
      bannerAlt: string,
      metaTitle: string,
      metaDescription: string,
      pageTitle: string,
      firstSection: {
        title: string,
        description: string,
        items: [
          {
            title: string,
            description: string,
            image: string,
            imageAlt: string
          }
        ]
      },
      secondSection: {
        title: string,
        description: string,
        image: string,
        imageAlt: string,
        items: [
          {
            title: string,
            logo: string,
            logoAlt: string
          }
        ]
      },
      thirdSection: {
        title: string,
        items: [
          {
            title: string,
            location: string
          }
        ]
      }
    }
    export type Contact= {
      banner: string,
    bannerAlt: string,
    metaTitle: string,
    metaDescription: string,
    pageTitle: string,
    firstSection: {
      title: string,
      items: [
        {
          title: string,
          address: string,
          phone: string,
          email: string,
          fax: string,
          workingHours: string,
          map: string
        }
      ]
    }
    }
    export type Team={
      banner: string,
      bannerAlt: string,
      metaTitle: string,
      metaDescription: string,
      pageTitle: string,
      teamSection: {
        title: string,
        description: string,
        items: [
          {
            name: string,
            designation: string,
            image: string,
            imageAlt: string,
            linkedIn: string
          }
        ]
      }
    }

    export type Quality={
      metaTitle: string,
      metaDescription: string,
      pageTitle: string,
      firstSection: {
        mainTitle: string,
        subTitle: string,
        description: string,
        image: string,
        imageAlt: string
      },
      certificateSection: {
        title: string,
        items: [
          {
            image: string,
            imageAlt: string
          }
        ]
      },
      thirdSection: {
        title: string,
        description: string,
        image: string,
        imageAlt: string
      },
      fourthSection: {
        image: string,
        imageAlt: string,
        title: string,
        description: string
      },
      fifthSection: {
        title: string,
        items: [
          {
            logo: string,
            logoAlt: string,
            title: string,
            description: string
          }
        ]
      }
    }
    export type Hse={
      metaTitle: string,
      metaDescription: string,
      pageTitle: string,
      firstSection: {
        title: string,
        description: string,
        image: string,
        imageAlt: string
      },
      secondSection: {
        title: string,
        items: [
          {
            image: string,
            imageAlt: string,
            title: string,
            description: string,
            files: [
              {
                file: string,
                title: string,
                _id: string
              }
            ]
          }
        ]
      },
      thirdSection: {
        title: string,
        description: string,
        image: string,
        imageAlt: string
      },
      fourthSection: {
        image: string,
        imageAlt: string,
        title: string,
        description: string,
        items: [
          {
            number: string,
            value: string
          }
        ]
      }
    }
    export type Sustainability={
      metaTitle: string,
      metaDescription: string,
      pageTitle: string,
      banner: string,
      bannerAlt: string,
      firstSection: {
        title: string,
        description: string,
        items: [
          {
            image: string,
            imageAlt: string,
            title: string,
            logo: string,
            logoAlt: string
          }
        ]
      },
      secondSection: {
        firstTitle: string,
        secondTitle: string,
        thirdTitle: string,
        description: string,
        file: string,
        fileName: string,
        fileDescription: string
      },
      thirdSection: {
        title: string,
        description: string,
        items: [
          {
            image: string,
            imageAlt: string
          }
        ]
      },
      fourthSection: {
        title: string,
        items: [
          {
            image: string,
            imageAlt: string,
            title: string,
            description: string
          }
        ]
      },
      fifthSection: {
        title: string,
        items: [
          {
            image: string,
            imageAlt: string,
            title: string,
            description: string
          }
        ]
      },
      cardImages: [
        string
      ]
    }
export type NavTab = {
  title: string,
  items: [
    {
      image: string,
      imageAlt: string,
      title: string,
      description: string
    }
  ]
}
 export type introbold = {
      title: string,
      description: string,
      image?: string,
      imageAlt?: string
    } 
    export type Engineering = {
      metaTitle: string,
      metaDescription: string,
      pageTitle: string,
      firstSection: {
        title: string,
        description: string,
        image: string,
        imageAlt: string
      },
      secondSection: {
        title: string,
        description: string,
        items: [
          {
            image: string,
            imageAlt: string,
            title: string,
            description: string,
            logo: string,
            logoAlt: string
          }
        ]
      },
      thirdSection: {
        title: string,
        description: string,
        items: [
          {
            style:string,
            image: string,
            imageAlt: string,
            imageThumbnail: string,
            imageAltThumbnail: string,
            threeDFile: string,
            threeDFileAlt: string,
            threeDFileThumbnail: string,
            threeDFileAltThumbnail: string
          }
        ],
      },
      fourthSection: {
        title: string,
        description: string,
        image: string,
        imageAlt: string
      },
      fifthSection: {
        title: string,
        items: [
          {
            title: string,
            elements: [
              {
                logoAlt: string,
                logo: string,
                title: string,
                description: string
              }
            ]
          }
        ]
      },
      sixthSection: {
        title: string,
        description: string,
        items: [
          {
            logoAlt: string,
            logo: string,
            title: string,
            description: string
          }
        ]
      }
    }
   export type whychoose= {
      title: string,
      description: string,
      items: [
        {
          logoAlt: string,
          logo: string,
          title: string,
          description: string
        }
      ]
    }
    export type Fabrication = {
      metaTitle: string,
      metaDescription: string,
      pageTitle: string,
      firstSection: {
        title: string,
        description: string,
        image: string,
        imageAlt: string
      },
      secondSection: {
        title: string,
        description: string,
        items: [
          {
            imageAlt: string,
            image: string,
            title: string,
            description: string
          }
        ]
      },
      thirdSection: {
        title: string,
        description: string,
        items: [
          {
            logoAlt: string,
            logo: string,
            title: string
          }
        ]
      },
      fourthSection: {
        title: string,
        description: string,
        items: [{
          style:string,
          imageAlt: string,
          image: string,
          threeDFile:string,
          threeDFileAlt:string,
          threeDFileThumbnail:string,
          threeDFileAltThumbnail:string
        }
        ]
      },
      fifthSection: {
        title: string,
        items: [
          {
            title: string,
            description: string,
            logo: string,
            logoAlt: string,
            number: string,
            value: string
          }
        ]
      },
      sixthSection: {
        title: string,
        description: string,
        items: [
          {
            logoAlt: string,
            logo: string,
            title: string,
            description: string
          }
        ]
      }
    }
    export type Boxgd = {
      title: string,
      items: [
        {
          title: string,
          description: string,
          logo: string,
          logoAlt: string,
          number: string,
          value: string
        }
      ]
    }
    export type Blasting = {
      metaTitle: string,
      metaDescription: string,
      pageTitle: string,
      firstSection: {
        title: string,
        description: string,
        image: string,
        imageAlt: string
      },
      secondSection: {
        title: string,
        description: string,
        image: string,
        imageAlt: string
      },
      thirdSection: {
        title: string,
        description: string,
        image: string,
        imageAlt: string
      },
      fourthSection: {
        title: string,
        items: [
          {
            logoAlt: string,
            logo: string,
            title: string,
            description: string,
            number: string,
            value: string
          }
        ]
      },
      fifthSection: {
        title: string,
        description: string,
        items: [
          {
            logoAlt: string,
            logo: string,
            title: string,
            description: string
          }
        ]
      }
    }
    
    export type Services = {
      metaTitle: string,
      metaDescription: string,
      pageTitle: string,
      firstSection: {
        title: string,
        description: string,
        items: [
          {
            image: string,
            imageAlt: string
          }
        ]
      },
      secondSection: {
        title: string,
        description: string,
        image: string,
        imageAlt: string
      },
      thirdSection: {
        title: string,
        description: string,
        items: [
          {
            image: string,
            imageAlt: string,
            title: string
          }
        ]
      },
      fourthSection: {
        title: string,
        description: string,
        items: [
          {
            logo: string,
            logoAlt: string,
            title: string,
            description: string
          }
        ]
      }
    }
    export type GlobalPresence = {
      metaTitle: string,
      metaDescription: string,
      pageTitle: string,
      banner: string,
      bannerAlt: string,
      firstSection: {
        mainTitle: string,
        subTitle: string,
        description: string
      },
      secondSection: {
        title: string,
        items: [
          {
            number: string,
            value: string,
            description: string
          }
        ]
      },
      thirdSection: {
        title: string,
        countries: [
          {
            title: string,
            image: string,
            imageAlt: string,
            slug: string,
            sections: [
              string
            ]
          }
        ]
      }
    }
    export type GlobalReachtype =  {
      title: string,
      items: [
        {
          number: string,
          value: string,
          description: string
        }
      ]
    }
    
    export type GpAmerica = {
      data: {
        title: string,
        image: string,
        imageAlt: string,
        slug: string,
        sections: [
          {
            imageAlt: string,
            type: string,
            description: string,
            image: string,
            title: string
          },
          {
            title: string,
            type: string,
            items: [
              {
                description: string,
                number: string,
                value: string
              } 
            ]
          },
          {
            name: string,
            designation: string,
            imageAlt: string,
            type: string,
            description: string,
            image: string
          },
          {
            title: string,
            imageAlt: string,
            type: string,
            description: string,
            image: string
          },
          {
            type: string,
            items: [
              {
                title: string,
                address: string,
                phone: string,
                email: string,
                fax: string
              }
            ]
          }
        ],
        _id: string
      },
      message: string
    }
export type GpAbtsect = {
  name: string,
  designation: string,
  imageAlt: string,
  type: string,
  description: string,
  image: string
}
    export type GpEuReachdata =  {
      title: string,
      type: string,
      items: [
        {
          description: string,
          number: string,
          value: string
        } 
      ]
    }
          export type  Locationdata = { 
          type: string,
          items: [
            {
              title: string,
              address: string,
              phone: string,
              email: string,
              fax: string
            }
          ] 
      }
      
    export type GpAmericaSection = {
       
            imageAlt: string,
            type: string,
            description: string,
            image: string,
            title: string
         
    }
    export type Gpeurope = {
      data: {
        title: string,
        image: string,
        imageAlt: string,
        slug: string,
        sections: [
          {
            title: string,
            imageAlt: string,
            type: string,
            description: string,
            image: string
          },
          {
            title: string,
            type: string,
            items: [
              {
                description: string,
                number: string,
                value: string
              } 
            ]
          },
          {
            title: string,
            imageAlt: string,
            type: string,
            description: string,
            image: string
          },
          {
            type: string,
            items: [
              {
                title: string,
                address: string,
                phone: string,
                email: string,
                fax: string
              }
            ]
          }
        ],
        _id: string
      },
      message: string
    }
     export type GpEuReach = {
      title: string,
      type: string,
      items: [
        {
          description: string,
          number: string,
          value: string
        } 
      ]
    }  
            
     export type Gpafrica = {
      data: {
        title: string,
        image: string,
        imageAlt: string,
        slug: string,
        _id: string,
        sections: [
          {
            title: string,
            imageAlt: string,
            type: string,
            description: string,
            image: string
          },
          {
            type: string,
            items: [
              {
                description: string,
                number: string,
                value: string
              } 
            ]
          },
          {
            title: string,
            imageAlt: string,
            type: string,
            description: string,
            image: string
          },
          {
            title: string,
            type: string,
            items: [
              {
                title: string,
                project: string,
                clientLocation: string,
                quantity: string,
                image: string,
                imageAlt: string
              } 
            ]
          },
          {
            type: string,
            items: [
              {
                title: string,
                address: string,
                phone: string,
                email: string,
                fax: string
              } 
            ]
          }
        ]
      },
      message: string
    }
    export type Gpslide = {
      title: string,
      type: string,
      items: [
        {
          title: string,
          project: string,
          clientLocation: string,
          quantity: string,
          image: string,
          imageAlt: string
        } 
      ]
    }
      
    
    export type Globaltype = {
      type: string,
      items: [
        {
          description: string,
          number: string,
          value: string
        } 
      ]
    }
    export type Projectsw= 
    {
      data: [
        {
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
          thumbnailAlt: string,
          metaTitle: string,
          metaDescription: string,
          images: [
            string 
          ],
          _id: string,
          thumbnail: string
        }
      ]
    }
    export type Projectactaall =   
{
  data: [
    {
      name: string,
      metaTitle: string,
      metaDescription: string,
      projects: [
        {
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
          thumbnailAlt: string,
          metaTitle: string,
          metaDescription: string,
          images: [
            string 
          ],
          _id: string,
          thumbnail: string
        },
           
      ],
      _id: string,
      slug: string
    } 
  ],
  message: string,
  success: boolean
}
    export type Projectswfull =  
    {
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
    export type Home =   {
      metaTitle: string,
      metaDescription: string,
      banner: string,
      bannerAlt: string,
      pageTitle: string,
      bannerSection: {
        items: [
          {
            video: string,
            mainTitle: string,
            subTitle: string,
            poster: string,
            primaryColorText: string
          }
        ]
      },
      firstSection: {
        mainTitle: string,
        subTitle: string,
        buttonText: string,
        items: [
          {
            logo: string,
            logoAlt: string,
            number: string,
            value: string,
            suffix: string
          }
        ]
      },
      clientsSection: {
        items: [
          {
            logo: string,
            logoAlt: string
          }
        ]
      },
      servicesSection: {
        title: string,
        items: [
          {
            logo: string,
            logoAlt: string,
            title: string,
            description: string,
            image: string,
            imageAlt: string,
            slug: string
          }
        ]
      },
      sustainabilitySection: {
        title: string,
        video: string,
        poster: string,
        description: string,
        itemTitle: string,
        items: [
          {
            logo: string,
            logoAlt: string,
            title: string
          }
        ]
      }
    }
    
     
      