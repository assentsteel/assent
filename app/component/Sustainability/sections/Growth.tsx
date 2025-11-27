import React from "react";
import Image from "next/image";
import { Sustainability } from "@/public/types/Common";

const Growth = ({ data }: { data: Sustainability["firstSection"] }) => {
  return (
    <section className="container rounded-[15px]">
      {/* Wrapper with conditional background */}
      <div
        className="
        relative inset-0 rounded-[15px] overflow-hidden h-[550px] sm:h-[350px] lg:h-[510px] 
        bg-primary lg:bg-transparent
      "
      >
        {/* Image only visible on LG+ */}
        <div className="hidden lg:block absolute inset-0">
          <Image
            src={data.image}
            alt={data.imageAlt}
            fill
            className="object-cover"
          />
        </div>

        {/* Gradient ONLY visible on LG+ */}
        <div
          className="
            hidden lg:block absolute inset-0 rounded-[15px] overflow-hidden
          "
          style={{
            background:
              "linear-gradient(-90deg, #092348 35.64%, rgba(16, 43, 82, 0.915745) 57.36%, rgba(24, 53, 95, 0.8) 68.55%, rgba(24, 53, 95, 0) 100%)",
          }}
        />

        {/* TEXT */}
        <div className="absolute inset-0 z-10 flex justify-end items-center lg:pr-[30px] py-10">
          <p
            className="
      text-white lg:w-[60%] block
      text-[17px] lg:text-[19px] leading-[1.52]
      px-4 md:px-6
    "
          >
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Growth;
