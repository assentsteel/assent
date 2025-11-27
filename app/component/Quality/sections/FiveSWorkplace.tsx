import React from "react";

const FiveSWorkplace = () => {
  return (
    <section className="bg-primary mb-[50px] md:mb-[70px] xl:mb-[100px] w-full">
      <div className="container py-[50px] md:py-[70px] lg:py-[100px] flex flex-col lg:flex-row gap-5 lg:gap-12 overflow-hidden">
        <div className="w-full lg:max-w-[35%] flex items-start">
          <h2 className="text-xl text-white font-[600] leading-[1.18]">
            5S Workplace Organization
          </h2>
          <p></p>
        </div>
        <div className="w-full">
          <p className="text-white text-[19px] font-[400] leading-[1.57]">
            As part of our Lean Management continual journey, the
            5S methodology was initiated in August 2023 to build a foundation of
            discipline, efficiency, and continuous improvement across all
            operations. Through the five pillars — Sort, Set in Order, Shine,
            Standardize, and Sustain — we have strengthened workplace
            organization, improved productivity, enhanced safety, and minimized
            waste. The implementation of 5S ensures that every process,
            workstation, and material flow supports operational excellence and
            reflects our commitment to quality, reliability, and performance. 
          </p>
        </div>
      </div>
    </section>
  );
};

export default FiveSWorkplace;
