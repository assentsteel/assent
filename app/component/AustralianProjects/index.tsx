import React from "react";
import FirstSection from "./sections/FirstSection";
import IntroBold from "../common/IntroBold";
import GlobalReach from "../../component/GlobalPresence/sections/GlobalReach";
import HeadingText from "../../component/Services/sections/HeadingText";
import { singletextimg, reach  } from "./australianProjectsData";
import { GlobalReachtype } from "@/public/types/Common";

const Index = () => {
  const sectionData = singletextimg?.data?.[0];

  return (
    <>
      {sectionData && (
        <IntroBold
          data={{
            title: sectionData.title,
            description: sectionData.paragraphs.join(" "),
          }}
        />
      )}

      <FirstSection data={sectionData} />

      {/* ✅ Type safely overridden locally */}
      <GlobalReach
        bgcolor="bg-primary"
        data={
          {
            title: reach.heading,
            items: reach.data.map((item) => ({
              number: item.count,
              value: item.title,
              description: item.details,
            })),
          } as unknown as GlobalReachtype
        }
      />
       {/* <HeadingText /> */}

    </>
  );
};

export default Index;
