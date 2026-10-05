import mongoose from "mongoose";

const hseSchema = new mongoose.Schema({
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
    secondDescription: {
      type: String,
    },
    secondImage: {
      type: String,
    },
    secondImageAlt: {
      type: String,
    },
  },
  secondSection: {
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
        files: [
          {
            file: {
              type: String,
            },
            title: {
              type: String,
            },
          },
        ],
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
    years: [
      {
        title: {
          type: String,
        },
        items: [
          {
            number: {
              type: String,
            },
            value: {
              type: String,
            },
          },
        ],
      },
    ],
  },
});

export default mongoose.models.HSE || mongoose.model("HSE", hseSchema);
