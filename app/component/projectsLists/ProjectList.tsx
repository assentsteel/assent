import React from "react";
import Image from "next/image";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ data,type }: {
  data: {
    description: string;
    images: string[];
    location: string;
    name: string;
    specifications: {
      name: string;
      value: string;
      _id: string;
    }[];
    type: string;
    _id: string;
  }[];
  type:string | string[];
}) => {
  return (
    <>
      <section className="section-spacing">
        <div className="container">
          <div className="grid md:grid-cols-2 xl:grid-cols-12 gap-[32px] items-center">
            {data?.map((item, index) => (
              index == 0 || index == 6 ? (<div className="xl:col-span-8" key={index}>
                <ProjectCard
                  locationName={item.location}
                  title={item.name}
                  image={item.images[0]}
                  href={`/project-details/${item._id}?type=${type}`}
                />
              </div>) : (<div className="xl:col-span-4" key={index}>
                <ProjectCard
                  locationName={item.location}
                  title={item.name}
                  image={item.images[0]}
                  href={`/project-details/${item._id}?type=${type}`}
                />
              </div>)
            ))}


            {/* <div className="xl:col-span-4">
              <ProjectCard
                locationName="Kalba,Sharjah."
                title={"Al Ansari Residential Building – Noor Tower"}
                image="/assets/img/projects/p-3.jpg"
              />
            </div>
            <div className="xl:col-span-4">
              <ProjectCard
                locationName="Kalba,Sharjah."
                title={"Scientific Research Building – Sharjah University"}
                image="/assets/img/projects/p-4.jpg"
              />
            </div>
            <div className="xl:col-span-4">
              <ProjectCard
                locationName="Kalba,Sharjah."
                title={"Al Zahra Hospital Dubai"}
                image="/assets/img/projects/p-5.jpg"
              />
            </div>
            <div className="xl:col-span-4">
              <ProjectCard
                locationName="Kalba,Sharjah."
                title={"Gardenia Residence"}
                image="/assets/img/projects/p-6.jpg"
              />
            </div>
            <div className="xl:col-span-8">
              <ProjectCard
                locationName="Kalba,Sharjah."
                title={"3000 Prayer Mosque"}
                image="/assets/img/projects/p-7.jpg"
              />
            </div> */}
          </div>
          <div className="border-b border-[#1E1E1E]/30 pt-[80px]">
            <div className="flex items-center justify-center  pb-[20px] cursor-pointer ">
              <p className="text-[#1E1E1E] text-[22px] font-[500]">
                More Projects
              </p>
              <Image
                src="/assets/img/projects/down-arrow.svg"
                alt="Arrow Icon"
                width={18}
                height={18}
                className="ml-2 "
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectList;
