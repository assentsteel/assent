export type MenuItem = {
  title: string;
  url: string;
  children?: { title: string; url: string }[]; // Make 'children' optional
};

export const menuItems: MenuItem[] = [
  {
    title: "About",
    url: "",
    children: [
      {
        title: "Overview",
        url: "/about",
      },
      {
        title: "Teams",
        url: "/our-team",
      },
      {
        title: "Global Presence",
        url: "/global-presence",
      },
      {
        title: "Award & Accreditations ",
        url: "/awards-and-accreditations",
      },
    ],
  },
  {
    title: "Services",
    url: "",
    children: [
      {
        title: "Engineering ",
        url: "/steel-engineering-services",
      },
      {
        title: "Fabrication",
        url: "/steel-fabrication-services",
      },
      {
        title: "Steel Blasting, Painting & Fire proofing",
        url: "/steel-blasting-painting-fire-proofing",
      },
      {
        title: "Steel Erection ",
        url: "/steel-erection-services",
      },
    ],
  },
  {
    title: "Projects",
    url: "",
    children: [
      {
        title: "Commercial Projects  ",
        url: `/projects/commercial`,
      },
      {
        title: "Industrial Oil & Gas Projects",
        url: `/projects/industrial-oil-gas`,
      },
      {
        title: "Data Centre Projects  ",
        url: `/projects/data-centres`,
      },
    ],
  },

{
    title: "Sustainability",
    url: "/sustainability",
  },
  {
    title: "How We Work",
    url: "",
    children: [
      {
        title: "Quality",
        url: "/quality",
      },
      {
        title: "HSE",
        url: "/hse",
      },
    ],
  },
   {
    title: "Media",
    url: "",
    children: [
      {
        title: "Blogs",
        url: "/blogs",
      },
      {
        title: "News",
        url: "/news",
      },
      {
        title: "Gallery",
        url: "/gallery",
      },
    ],
  },
];
