import { StaticImageData } from "next/image";

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: string;
};

export type About = {
  banner: string;
  bannerAlt: string;
  seo?: Seo;
  pageTitle: string;
  firstSection: {
    mainTitle: string;
    subTitle: string;
    description: string;
    items: [
      {
        number: string;
        value: string;
      }
    ];
  };
  secondSection: {
    title: string;
    description: string;
    image1: string;
    image2: string;
    image1Alt: string;
    image2Alt: string;
  };
  historySection: {
    title: string;
    items: [
      {
        _id: string;
        year: string;
        title: string;
        description: string;
        image: string;
        imageAlt: string;
      }
    ];
  };
  purposeSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  coreValues: {
    title: string;
    items: [
      {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
      }
    ];
  };
};
export type Abtpurpose = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};
export type ainglelabel = {
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
};
export type textbyimg = {
  title: string;
  description: string;
  image1?: string;
  image2?: string;
  image1Alt?: string;
  image2Alt?: string;

  image?: string;
  imageAlt?: string;
  items?: [
    {
      number: string;
      value: string;
    }
  ];
};
export type Gallery = {
    _id: string;
    title: string;
    thumbnail: string;
    thumbnailAlt: string;
    slug: string;
    images: string[];
    categories: categories[];
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    schema?: string;
    index?: number;
  }[];
export type Gallerydata = {
  message?: string;
  success?: boolean;
  data:
  | {
    categories?: categories[];
    images?: string[];
  }
  | [];
};

export type categories = {
  _id?: string;
  title: string;
  thumbnail: string;
  thumbnailAlt?: string;
  altText?: string;
  slug: string;
  images: string[];
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: string;
};

export type GalleryMeta = {
  metaTitle?: string;
  metaDescription?: string;
  pageTitle: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: string;
};

export type News = {
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: string;
  pageTitle: string;
  banner: string;
  bannerAlt: string;
  categories: [
    {
      name: string;
    }
  ];
  news: {
    mainTitle: string;
    subTitle: string;
    slug: string;
    content: string;
    thumbnail: string;
    thumbnailAlt: string;
    images: string[];
    category: string;
    createdAt: string;
    metaTitle: string;
    metaDescription: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    schema?: string;
    link?: string;
    _id: number;
    date: string;
  }[];
};
export type Bogs = {
  mainTitle: string;
  subTitle: string;
  slug: string;
  content: string;
  thumbnail: string;
  thumbnailAlt: string;
  images: string[];
  category: string;
  date: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  _id: number;
  createdAt: string;
  seoSchema?: string;
}
export type Blogs = {
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: string;
  pageTitle: string;
  banner: string;
  bannerAlt: string;
  categories: [
    {
      name: string;
    }
  ];
  blogs: {
    mainTitle: string;
    subTitle: string;
    slug: string;
    content: string;
    thumbnail: string;
    thumbnailAlt: string;
    images: string[];
    category: string;
    createdAt: string;
    metaTitle: string;
    metaDescription: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    seoSchema?: string;
    _id: number;
    date: string;
  }[];
}
export type Newsdetails = {
  data: {
    category: string;
    content: string;
    createdAt: string;
    date: string;
    images: string[];
    mainTitle: string;
    metaDescription: string;
    metaTitle: string;
    slug: string;
    subTitle: string;
    thumbnail: string;
    thumbnailAlt: string;
    link?: string;
    _id: number;
  };
};

export type Blogdetails = {
  data: {
    category: string;
    content: string;
    createdAt: string;
    date: string;
    images: string[];
    mainTitle: string;
    metaDescription: string;
    metaTitle: string;
    slug: string;
    subTitle: string;
    thumbnail: string;
    thumbnailAlt: string;
    seoSchema?: string;
    _id: number;
  };
};
export type Awards = {
  banner: string;
  bannerAlt: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: string;
  awards: [
    {
      file: string;
      title: string;
      image: string;
      imageAlt: string;
    }
  ];
};
export type Career = {
  banner: string;
  bannerAlt: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: string;
  pageTitle: string;
  firstSection: {
    title: string;
    description: string;
    items: [
      {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
      }
    ];
  };
  secondSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    items: [
      {
        title: string;
        logo: string;
        logoAlt: string;
      }
    ];
  };
  thirdSection: {
    title: string;
    items: [
      {
        title: string;
        location: string;
      }
    ];
  };
};
export type Contact = {
  banner: string;
  bannerAlt: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: string;
  pageTitle: string;
  firstSection: {
    title: string;
    items: [
      {
        title: string;
        address: string;
        phone: string;
        email: string;
        fax: string;
        workingHours: string;
        map: string;
      }
    ];
  };
};
export type Team = {
  banner: string;
  bannerAlt: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: string;
  pageTitle: string;
  teamSection: {
    title: string;
    description: string;
    items: [
      {
        name: string;
        designation: string;
        image: string;
        imageAlt: string;
        linkedIn: string;
        description: string;
      }
    ];
  };
};

export type Quality = {
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: string;
  pageTitle: string;
  firstSection: {
    mainTitle: string;
    subTitle: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  certificateSection: {
    title: string;
    items: [
      {
        image: string;
        imageAlt: string;
      }
    ];
  };
  thirdSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    secondTitle: string;
    secondDescription: string;
  };
  fourthSection: {
    image: string;
    imageAlt: string;
    title: string;
    description: string;
  };
  fifthSection: {
    title: string;
    items: [
      {
        logo: string;
        logoAlt: string;
        title: string;
        description: string;
      }
    ];
  };
};
export type Hse = {
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: string;
  pageTitle: string;
  firstSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  secondSection: {
    title: string;
    items: [
      {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
        files: [
          {
            file: string;
            title: string;
            _id: string;
          }
        ];
      }
    ];
  };
  thirdSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  fourthSection: {
    image: string;
    imageAlt: string;
    title: string;
    description: string;
    years: [
      {
        title: string;
        items: [
          {
            number: string;
            value: string;
          }
        ];
      }
    ];
  };
};
export type Sustainability = {
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: string;
  pageTitle: string;
  banner: string;
  bannerAlt: string;
  firstSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    imageDescription: string;
    items: [
      {
        image: string;
        imageAlt: string;
        title: string;
        logo: string;
        logoAlt: string;
      }
    ];
    secondTitle: string;
    secondDescription: string;
  };
  secondSection: {
    firstTitle: string;
    secondTitle: string;
    thirdTitle: string;
    description: string;
    fileDescription: string;
    files: [
      {
        file: string;
        fileName: string;
      }
    ];
  };
  thirdSection: {
    title: string;
    description: string;
    items: [
      {
        image: string;
        imageAlt: string;
      }
    ];
  };
  fourthSection: {
    title: string;
    items: [
      {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
      }
    ];
  };
  fifthSection: {
    title: string;
    items: [
      {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
      }
    ];
  };
  cardImages: [string];
};
export type HowWework = {
  title: string;
  items: {
    image: StaticImageData;
    imageAlt: string;
    title: string;
    description: string;
  }[];
};
export type typefaq = {
  title: string;
  items: {
    title: string;
    description: string;
  }[];
};
export type whyus = {
  title: string;
  description: string;
  items: {
    image: StaticImageData;
    imageAlt: string;
    title: string;
    description: string;
  }[];
};

export type whyustre = {
  title: string;
  description: string;
  items: {
    image: StaticImageData;
    imageAlt: string;
    title: string;
    description: string;
  }[];
};
export type keycap = {
  title: string;
  desc: string;
  items:
  {
    image: StaticImageData;
    imageAlt: string;
    title: string;
    description: string;
  }[];
};

export type keycaptur = {
  title: string;
  desc: string;
  items:
  {
    image: StaticImageData;
    imageAlt: string;
    title: string;
    description: string;
  }[];
};
export type Accaus = {
  title: string;
  description: string;
  items:
  {

    title: string;
    description: string;
  }[];
};
export type NavTab = {
  title: string;
  items: [
    {
      image: string;
      imageAlt: string;
      title: string;
      description: string;
    }
  ];
};
export type introboldold = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  titlecase?: boolean;
  maxwidth?: number;
};
export type introbold = {
  data: {
    id: number;
    title: string;
    paragraphs: string;
    image: StaticImageData;
  }[];
  titlecase?: boolean;
  maxwidth?: number;
};
export type gridbox = {
  title: string;
  description: string;
  items:
  {
    title: string;
    description: string;
    logo: string;
    logoAlt: string;
  }[]
  footerdata?: string;
};
export type SecondIntro = {
  secondTitle: string;
  secondDescription: string;
};
export type Engineering = {
  seo?: Seo;
  pageTitle: string;
  firstSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  secondSection: {
    title: string;
    description: string;
    items: [
      {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
        logo: string;
        logoAlt: string;
      }
    ];
  };
  thirdSection: {
    title: string;
    description: string;
    items: [
      {
        style: string;
        image: string;
        imageAlt: string;
        imageThumbnail: string;
        imageAltThumbnail: string;
        threeDFile: string;
        threeDFileAlt: string;
        threeDFileThumbnail: string;
        threeDFileAltThumbnail: string;
      }
    ];
  };
  fourthSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  fifthSection: {
    title: string;
    items: [
      {
        title: string;
        elements: [
          {
            logoAlt: string;
            logo: string;
            title: string;
            description: string;
          }
        ];
      }
    ];
  };
  sixthSection: {
    title: string;
    description: string;
    items: [
      {
        logoAlt: string;
        logo: string;
        title: string;
        description: string;
      }
    ];
  };
};
export type whychoose = {
  title: string;
  description: string;
  items: [
    {
      logoAlt: string;
      logo: string;
      title: string;
      description: string;
    }
  ];
};
export type Fabrication = {
  seo?: Seo;
  pageTitle: string;
  firstSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  secondSection: {
    title: string;
    description: string;
    items: [
      {
        imageAlt: string;
        image: string;
        title: string;
        description: string;
      }
    ];
  };
  thirdSection: {
    title: string;
    description: string;
    items: [
      {
        logoAlt: string;
        logo: string;
        title: string;
      }
    ];
  };
  fourthSection: {
    title: string;
    description: string;
    items: [
      {
        style: string;
        imageAlt: string;
        image: string;
        threeDFile: string;
        threeDFileAlt: string;
        threeDFileThumbnail: string;
        threeDFileAltThumbnail: string;
      }
    ];
  };
  fifthSection: {
    title: string;
    items: [
      {
        title: string;
        description: string;
        logo: string;
        logoAlt: string;
        number: string;
        value: string;
      }
    ];
  };
  sixthSection: {
    title: string;
    description: string;
    items: [
      {
        logoAlt: string;
        logo: string;
        title: string;
        description: string;
      }
    ];
  };
};
export type Boxgd = {
  title: string;
  items: [
    {
      title: string;
      description: string;
      logo: string;
      logoAlt: string;
      number: string;
      value: string;
    }
  ];
};
export type Blasting = {
  seo?: Seo;
  pageTitle: string;
  firstSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  secondSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  thirdSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  fourthSection: {
    title: string;
    items: [
      {
        logoAlt: string;
        logo: string;
        title: string;
        description: string;
        number: string;
        value: string;
      }
    ];
  };
  fifthSection: {
    title: string;
    description: string;
    items: [
      {
        logoAlt: string;
        logo: string;
        title: string;
        description: string;
      }
    ];
  };
};

export type Services = {
  seo?: Seo;
  pageTitle: string;
  firstSection: {
    title: string;
    description: string;
    items: [
      {
        image: string;
        imageAlt: string;
      }
    ];
  };
  secondSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  thirdSection: {
    title: string;
    description: string;
    items: [
      {
        image: string;
        imageAlt: string;
        title: string;
      }
    ];
  };
  fourthSection: {
    title: string;
    description: string;
    items: [
      {
        logo: string;
        logoAlt: string;
        title: string;
        description: string;
      }
    ];
  };
};
export type Sectwotp = {
  title: string;
  description: string;
  innertitle: string;
  items: {
    image: StaticImageData;
    imageAlt: string;
    title: string;
    description: string;
  }[];
};

export type Partnerst = {
  title: string;
  description: string;
  innertitle: string;
  items: {
    title: string;
    description: string;
  }[];
};




export type GlobalPresence = {
  seo?: Seo;
  pageTitle: string;
  banner: string;
  bannerAlt: string;
  firstSection: {
    mainTitle: string;
    subTitle: string;
    description: string;
  };
  secondSection: {
    title: string;
    items: [
      {
        number: string;
        value: string;
        description: string;
      }
    ];
  };
  thirdSection: {
    title: string;
    countries: {
        title: string;
        image: string;
        imageAlt: string;
        slug: string;
        sections: [string];
      }[];
  };
};
export type GlobalReachtype = {
  title: string;
  items: [
    {
      number: string;
      value: string;
      description: string;
    }
  ];
};
export type GlobalRtps = {
  heading: string;
  data: {
    count: string;
    title: string;
    details: string;
  }[];
};
export type FirstSectionProps = {
  data?: {
    id: number;
    title: string;
    paragraphs: string[];
    image: StaticImageData;
  };
};
export type GpAmerica = {
  data: {
    title: string;
    image: string;
    imageAlt: string;
    slug: string;
    sections: [
      {
        imageAlt: string;
        type: string;
        description: string;
        image: string;
        title: string;
      },
      {
        title: string;
        type: string;
        items: [
          {
            description: string;
            number: string;
            value: string;
          }
        ];
      },
      {
        name: string;
        designation: string;
        imageAlt: string;
        type: string;
        description: string;
        image: string;
      },
      {
        title: string;
        imageAlt: string;
        type: string;
        description: string;
        image: string;
      },
      {
        type: string;
        items: [
          {
            title: string;
            address: string;
            phone: string;
            email: string;
            fax: string;
          }
        ];
      },
      {
        title: string;
        type: string;
        items: [
          {
            title: string;
            project: string;
            clientLocation: string;
            quantity: string;
            image: string;
            imageAlt: string;
          }
        ];
      }
    ];
    _id: string;
  };
  message: string;
};
export type GpAbtsect = {
  name: string;
  designation: string;
  imageAlt: string;
  type: string;
  description: string;
  image: string;
};
export type GpEuReachdata = {
  title: string;
  type: string;
  items: [
    {
      description: string;
      number: string;
      value: string;
    }
  ];
};
export type Locationdata = {
  type: string;
  items: [
    {
      title: string;
      address: string;
      phone: string;
      email: string;
      fax: string;
    }
  ];
};

export type GpAmericaSection = {
  imageAlt: string;
  type: string;
  description: string;
  image: string;
  title: string;
};
export type Gpeurope = {
  data: {
    title: string;
    image: string;
    imageAlt: string;
    slug: string;
    sections: [
      {
        title: string;
        imageAlt: string;
        type: string;
        description: string;
        image: string;
      },
      {
        title: string;
        type: string;
        items: [
          {
            description: string;
            number: string;
            value: string;
          }
        ];
      },
      {
        title: string;
        imageAlt: string;
        type: string;
        description: string;
        image: string;
      },
      {
        type: string;
        items: [
          {
            title: string;
            address: string;
            phone: string;
            email: string;
            fax: string;
          }
        ];
      }
    ];
    _id: string;
  };
  message: string;
};
export type GpEuReach = {
  title: string;
  type: string;
  items: [
    {
      description: string;
      number: string;
      value: string;
    }
  ];
};

export type Gpafrica = {
  data: {
    title: string;
    image: string;
    imageAlt: string;
    slug: string;
    _id: string;
    sections: [
      {
        title: string;
        imageAlt: string;
        type: string;
        description: string;
        image: string;
      },
      {
        type: string;
        items: [
          {
            description: string;
            number: string;
            value: string;
          }
        ];
      },
      {
        title: string;
        imageAlt: string;
        type: string;
        description: string;
        image: string;
      },
      {
        title: string;
        type: string;
        items: [
          {
            title: string;
            project: string;
            clientLocation: string;
            quantity: string;
            image: string;
            imageAlt: string;
          }
        ];
      },
      {
        type: string;
        items: [
          {
            title: string;
            address: string;
            phone: string;
            email: string;
            fax: string;
          }
        ];
      }
    ];
  };
  message: string;
};
export type Gpslide = {
  title: string;
  type: string;
  items: [
    {
      title: string;
      project: string;
      clientLocation: string;
      quantity: string;
      image: string;
      imageAlt: string;
    }
  ];
};

export type Globaltype = {
  type: string;
  items: [
    {
      description: string;
      number: string;
      value: string;
    }
  ];
};
export type Projectsw = {
  data: {
      banner: string;
      bannerAlt: string;
      pageTitle: string;
      description: string;
      title: string;
      slug: string;
      sector: string;
      location: string;
      employer: string;
      contractor: string;
      consultant: string;
      scope: string;
      steelTonnage: string;
      thumbnailAlt: string;
      metaTitle: string;
      metaDescription: string;
      images: [string];
      _id: string;
      thumbnail: string;
    }[];
};
export type Projectactaall = {
  data: [
    {
      name: string;
      metaTitle: string;
      metaDescription: string;
      projects: [
        {
          banner: string;
          bannerAlt: string;
          pageTitle: string;
          description: string;
          title: string;
          slug: string;
          sector: string;
          location: string;
          employer: string;
          contractor: string;
          consultant: string;
          scope: string;
          steelTonnage: string;
          thumbnailAlt: string;
          metaTitle: string;
          metaDescription: string;
          images: [string];
          _id: string;
          thumbnail: string;
        }
      ];
      _id: string;
      slug: string;
    }
  ];
  message: string;
  success: boolean;
};
export type Projectswfull = {
  banner: string;
  bannerAlt: string;
  seo?: Seo;
  pageTitle: string;
  sector: string;
  location: string;
  categories: {
      name: string;
      seo?: Seo;
      slug: string;
      projects: {
          _id: string;
          banner: string;
          bannerAlt: string;
          pageTitle: string;
          description: string;
          title: string;
          slug: string;
          sector: string;
          location: string;
          employer: string;
          contractor: string;
          consultant: string;
          scope: string;
          steelTonnage: string;
          thumbnail: string;
          thumbnailAlt: string;
          metaTitle: string;
          metaDescription: string;
          ogTitle?: string;
          ogDescription?: string;
          ogType?: string;
          ogImage?: string;
          twitterTitle?: string;
          twitterDescription?: string;
          twitterImage?: string;
          schema?: string;
          images: [string];
        }[];
    }[];
};
export type Home = {
  seo?: Seo;
  banner: string;
  bannerAlt: string;
  pageTitle: string;
  bannerSection: {
    items: [
      {
        video: string;
        mainTitle: string;
        subTitle: string;
        poster: string;
        primaryColorText: string;
      }
    ];
  };
  firstSection: {
    mainTitle: string;
    subTitle: string;
    buttonText: string;
    items: [
      {
        logo: string;
        logoAlt: string;
        number: string;
        value: string;
        suffix: string;
      }
    ];
  };
  clientsSection: {
    items: [
      {
        logo: string;
        logoAlt: string;
      }
    ];
  };
  servicesSection: {
    title: string;
    items: [
      {
        logo: string;
        logoAlt: string;
        title: string;
        description: string;
        image: string;
        imageAlt: string;
        slug: string;
      }
    ];
  };
  sustainabilitySection: {
    title: string;
    video: string;
    poster: string;
    description: string;
    itemTitle: string;
    items: [
      {
        logo: string;
        logoAlt: string;
        title: string;
      }
    ];
  };
};
