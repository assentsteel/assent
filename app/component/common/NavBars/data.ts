export type MenuItem = {
  title: string;
  url: string;
  children?: { title: string; url: string }[]; // Make 'children' optional
};

export const menuItems: MenuItem[] = [
  {
    title: "About",
    url: "",
  },
  {
    title: "Services",
    url: "",
  },
/*   {
    title: "Projects",
    url: "",
    children: [
      {
        title: "Residential",
        url: "/projects/residential",
      },
      {
        title: "Commercial",
        url: "/projects/commercial",
      },
      {
        title: "Industrial",
        url: "/projects/industrial",
      },
      {
        title: "Hospitality",
        url: "/projects/hospitality",
      },
      {
        title: "Retail",
        url: "/projects/retail",
      },
    ],
  }, */
  {
    title: "Manufacturing",
    url: "",
  },

  {
    title: "Projects",
    url: "",
  },
  {
    title: "How We Work",
    url: "",
  },
  {
    title: "Sustainability",
    url: "",
  },
  {
    title: "Media",
    url: "",
  },
  {
    title: "Careers",
    url: "",
  },
];
