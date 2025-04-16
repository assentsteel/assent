import React from "react";
import { news} from "./data";
import Herotext from "../common/Banner/Herotext";
import Fillters from "./sections/Fillters";
import RecentNews from "./sections/RecentNews";
import NewsList from "./sections/NewsList";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "News", href: "" },

    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"News"} />
      <RecentNews />
      <Fillters />
      <NewsList data={news.data} />


    </>
  );
}
