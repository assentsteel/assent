"use client";
 ;
import Image from "next/image";
import { useEffect, useRef,useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface DetailedItem {
  icon: string;
  title: string;
  content: string;
}
interface PlatformsItem {
  id: number;
  title: string;
  tag: string;
  workingtitle: string;
  workingtime: string;
  workingdetails: string;
  details: DetailedItem[]
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}

const TextByImg: React.FC<PlatformsSectionProps> = ({data
}) => {

  const [activeTab, setActiveTab] = useState(data[0]?.tag);
  const containerRef = useRef(null);


  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        width: 100,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Starts when the top of the section is 85% in view
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative ">
      <div className="container">
        <div className="border-b border-[#00000015] mb-5 lg:mb-10 pb-5 lg:pb-10">
          <h2 className="text-xl  text-primary font-[600] leading-[1] mb-0">Find Us Here</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10  ">

          <div className=" ">
          <div className="bg-primary rounded-xl p-4 md:p-10 text-white">
      {/* Tab Headers */}
      <div className="md:flex gap-10 lg:gap-[100px] items-center border-b border-[#ffffff35] mb-4 lg:mb-[30px] w-fit">
        {data.map((item, index) => (
          <p
            key={index}
            onClick={() => setActiveTab(item.tag)}
            className={`text-lg md:text-sm xl:text-md xxl:text-lg leading-[2.18] cursor-pointer relative top-[1px] pb-1
              ${activeTab === item.tag ? 'border-b-2 border-secondary font-[600]' : 'border-b-2 border-transparent font-[400]'}`}
          >
            {item.title}
          </p>
        ))}
      </div>

      {data.map((item, index) =>
        activeTab === item.tag ? (
          <div key={index}  className="flex flex-col gap-7  ">

            {item.details.map((deta, index) =>
         <div key={index} className="flex gap-5 items-start">
            <Image src={deta.icon} alt="" />
            <div>
              <p className="text-[14px] uppercase mb-[10px] opacity-75 tracking-[2px]">{deta.title}</p>
              <p className="max-w-[25ch]">{deta.content}</p>
                </div>
              </div>
            )}
                  <div className="bg-[#ffffff05] rounded-[10px] p-5 md:p-7">
              <p className="text-[18px] xl:text-[22px]   mb-[10px] font-[600]  ">{item.workingtitle}</p>
              <p className="mb-[10px] opacity-85">{item.workingtime}</p>
              <p  className="  opacity-75">{item.workingdetails}</p>
                  </div>
          </div>

        ) : null

              )}


    </div>
          </div>


          <div className=" ">
          <div className="w-full h-[350px] lg:h-full rounded-xl overflow-hidden">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.968414724833!2d55.08037347604625!3d24.83075374644437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f0a6621c15b95%3A0x40945b5014e57240!2sASSENT%20STEEL!5e0!3m2!1sen!2sin!4v1744869087135!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TextByImg;
