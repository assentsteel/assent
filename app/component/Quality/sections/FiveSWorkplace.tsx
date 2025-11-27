import React from "react";
import { Quality } from "@/public/types/Common";

const FiveSWorkplace = ({ data }: { data: Quality["thirdSection"] }) => {
  return (
    <section className="bg-primary mb-[50px] md:mb-[70px] xl:mb-[100px] w-full">
      <div className="container py-[50px] md:py-[70px] lg:py-[100px] flex flex-col lg:flex-row gap-5 lg:gap-12 overflow-hidden">
        <div className="w-full lg:max-w-[35%] flex items-start">
          <h2 className="text-xl text-white font-[600] leading-[1.18]">
            {data.secondTitle}
          </h2>
          <p></p>
        </div>
        <div className="w-full">
          <p className="text-white text-[19px] font-[400] leading-[1.57]">
            {data.secondDescription}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FiveSWorkplace;
