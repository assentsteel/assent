import mongoose from "mongoose";

const qualitySchema = new mongoose.Schema({
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
  firstSection: {
    mainTitle: {
      type: String,
    },
    subTitle: {
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
  },
  certificateSection: {
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
        file: {
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
    image: {
      type: String,
    },
    imageAlt: {
      type: String,
    },
    secondTitle: {
      type: String,
    },
    secondDescription: {
      type: String,
    },
  },
  fourthSection: {
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
  fifthSection: {
    title: {
      type: String,
    },
    items: [
      {
        logo: {
          type: String,
        },
        logoAlt: {
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
});

export default mongoose.models.Quality ||
  mongoose.model("Quality", qualitySchema);
