import mongoose from "mongoose";

const SustainabilitySchema = new mongoose.Schema({
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  ogTitle: {
    type: String,
  },
  ogDescription: {
    type: String,
  },
  ogType: {
    type: String,
  },
  ogImage: {
    type: String,
  },
  twitterTitle: {
    type: String,
  },
  twitterDescription: {
    type: String,
  },
  twitterImage: {
    type: String,
  },
  schema: {
    type: String,
  },
  pageTitle: {
    type: String,
  },
  banner: {
    type: String,
  },
  bannerAlt: {
    type: String,
  },
  firstSection: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    imageAlt: {
      type: String,
    },
    imageDescription: {
      type: String,
    },
    items: [
      {
        image: {
          type: String,
        },
        imageAlt: {
          type: String,
        },
        title: {
          type: String,
        },
        logo: {
          type: String,
        },
        logoAlt: {
          type: String,
        },
      },
    ],
    secondTitle: {
      type: String,
    },
    secondDescription: {
      type: String,
    },
  },
  secondSection: {
    firstTitle: {
      type: String,
    },
    secondTitle: {
      type: String,
    },
    thirdTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    fileDescription: {
      type: String,
    },
    files: [
      {
        file: {
          type: String,
        },
        fileName: {
          type: String,
        },
      },
    ],
  },

  thirdSection: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    items: [
      {
        image: {
          type: String,
        },
        imageAlt: {
          type: String,
        },
      },
    ],
  },
  fourthSection: {
    title: {
      type: String,
    },
    items: [
      {
        image: {
          type: String,
        },
        imageAlt: {
          type: String,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  fifthSection: {
    title: {
      type: String,
    },
    items: [
      {
        image: {
          type: String,
        },
        imageAlt: {
          type: String,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  cardImages: [
    {
      type: String,
    },
  ],
});

export default mongoose.models.Sustainability ||
  mongoose.model("Sustainability", SustainabilitySchema);
