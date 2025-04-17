import React from "react";
import Herotext from "../common/Banner/Herotext";
import NewsDetails from "./sections/NewsDetails";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "News", href: "" },
    { label: "Team Outings", href: "" },

    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Team Outings"} />
      <NewsDetails />


    </>
  );
}
