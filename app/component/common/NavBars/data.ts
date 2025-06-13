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
        url: "/team",
      },
      {
        title: "Global Presence",
        url: "/global-presence",
      },
      {
        title: "Award & Accreditations ",
        url: "/accreditations",
      },
    ],
  },
  {
    title: "Services",
    url: "",
    children: [
      {
        title: "Engineering ",
        url: "/engineering",
      },
      {
        title: "Fabrication",
        url: "/fabrication",
      },
      {
        title: "Blasting painting",
        url: "/blasting",
      },
      {
        title: "Steel Erection ",
        url: "/services",
      },
    ],
  },
  {
    title: "Projects",
    url: "",
    children: [
      {
        title: "Commercial Projects  ",
        url: `/projects-list/commercial-projects`,
      },
      {
        title: "Industrial Oil & Gas Projects",
        url: `/projects-list/industrial-oil-gas-projects`,
      },
      {
        title: "Data Centre Projects  ",
        url: `/projects-list/data-centre-projects`,
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
