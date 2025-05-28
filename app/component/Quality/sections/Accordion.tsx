"use client";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion"
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  icon: string | StaticImageData;
  title: string;
  paragraphs: string[];
  image: string | StaticImageData;
}
interface PlatformsSectionProps {
  data: PlatformsItem[];
  heading: string;
}

const Accordion: React.FC<PlatformsSectionProps> = ({
  data,
  heading,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
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
  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -30, transition: { duration: 0.4 } },
  };
  return (
    <section className="pt-[50px] md:pt-[70px] xl:pt-[100px] pb-[50px] md:pb-[70px] xl:pb-[100px] cpt0  overflow-hidden relative ">
      <div className="container">

        <div className="lg:flex lg:items-center xxl:items-start">
          <div className="w-full lg:w-[40%] pr-0 lg:pr-[35px]">
            <motion.h2 viewport={{ once: true, amount: 0.2 }} variants={slideInLeft} initial="hidden" exit="exit" whileInView="visible" className="text-xl  text-primary font-[600] leading-[1.2] mb-4 lg:mb-7" >
              {heading}
            </motion.h2>
          </div>

          <div className="w-full lg:w-[60%] pl-0 lg:pl-[35px] mt-6 lg:mt-0">
            {data.map((da, index) => (
              <motion.div
                key={index}
                className="group border-b first:border-t border-[#00000015] py-5 lg:py-[20px] xxl:py-[30px] transition-all duration-300"
                onMouseEnter={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.2 }} // triggers only once when 20% is in view
              >
                <div className="flex items-start gap-5 md:gap-10 lg:gap-[50px] xl:gap-[100]">
                  {/* <p className="text-[#1F1F1F80] text-md leading-[1]">
                    {String(da.id).padStart(2, '0')}
                  </p> */}
                  <Image src={da.icon} alt={da.title} width={40} height={40} />
                  <div>
                    <h3 className={`  text-md   group-hover:text-secondary transition-all duration-300 cursor-pointer leading-[1] ${activeIndex === index ? 'text-secondary font-[600]' : 'text-primary font-[400] '} `}> {da.title}</h3>
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <motion.div key="content" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto", marginTop: "20px" }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.4 }} className="text-territory text-sm font-[400] leading-[1.7]" >
                          <p>{da.paragraphs}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accordion;
