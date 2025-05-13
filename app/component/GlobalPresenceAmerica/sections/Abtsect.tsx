"use client";
 ;
import  { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  title: string;
  designation: string;
  paragraphs: string[];
  image: string | StaticImageData;
}

interface PlatformsSectionProps {
  kmbtn?: boolean;
  data: PlatformsItem[];
}
const Abtsect: React.FC<PlatformsSectionProps> = ({data,kmbtn
}) => {

  const containerRef = useRef(null);
  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

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
    <section className="pt-[50px] md:pt-[70px] xl:pt-[100px] pts  overflow-hidden relative ">
      <div className="container">
  <div className="lg:flex items-stretch">
    {/* Text Section */}
    <div  className="w-full lg:w-2/3 xl:w-3/4 pr-0 lg:pr-[100px]"  >
      {data.map((item) => (
        <div className="mb-8 lg:mb-0" key={item.id}>
          <div className="mb-4 lg:mb-10">
          <motion.h2 className="text-xl text-primary font-[600] leading-[1.2] "
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariants}
            initial="hidden"
            whileInView="visible">
            {item.title}
          </motion.h2>
          <motion.h2 className="text-xl text-primary font-[600] leading-[1.2]  "
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariants}
            initial="hidden"
            whileInView="visible">
            {item.designation}
          </motion.h2>
          </div>
          <motion.div className="text-territory text-base font-[400] leading-[1.8] mb-6 lg:mb-10"
          initial="hidden"
          whileInView="visible"
          variants={imageVariants}
          viewport={{ once: true, amount: 0.2 }}>
            {item.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </motion.div>
          {kmbtn &&
            <button className="mt-auto border border-secondary py-2 px-6 rounded-full hover:bg-secondary hover:text-white transition text-xs h-[40px] lg:h-[48px] text-territory max-w-[315px] w-[315px] font-medium uppercase">
              view more
            </button>
          }
        </div>
      ))}
    </div>

    {/* Image Section */}
    <motion.div className="w-full lg:w-1/3 xl:w-1/4 pl-0 "
      initial="hidden"
      whileInView="visible"
      variants={imageVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      {data.map((item) => (
        <div key={item.id}>
          <div className="gbgs rounded-full p-1 h-[607px] flex items-center flex-row">
            <div className="rounded-full   h-[600px] flex items-center flex-row w-full lg:p-6 bg-white">
            <div className="  rounded-full bg-[red] h-full w-full  bg-no-repeat   " style={{
                background: `url(${typeof item.image === "string" ? item.image : item.image.src})`,
                backgroundSize: "cover",
                backgroundPosition:"center"
              }}>
              </div>
           </div>
          </div>

        </div>
      ))}
    </motion.div>
  </div>
</div>
    </section>
  );
};

export default Abtsect;
