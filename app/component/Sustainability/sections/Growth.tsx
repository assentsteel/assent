import React from "react";
import Image from "next/image";

const Growth = () => {
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
            src={"/assets/img/sustainability/growth.jpg"}
            alt="growth"
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
            Integration of ESG and GHG performance metrics into business
            planning and procurement strategies. Commitment to Global Goals:
            Aligned with the United Nations Sustainable Development Goals (UN
            SDGs) and UAE Vision 2030, ASSENT STEEL is committed to creating
            long-term value for all stakeholders while minimizing environmental
            impact and maximizing positive social outcomes. Through innovation,
            responsible manufacturing, and strategic partnerships, we are
            building a future where steel stands for sustainability, resilience,
            and progress.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Growth;
