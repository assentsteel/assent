"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



type PlatformsSectionProps = {
  // existing props
  data: {
    title: string;
    desc: string;
  };
};

const ContentText: React.FC<PlatformsSectionProps> = ({data
}) => {
  const containerRef = useRef(null);

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
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
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const slideIntop = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="section-spacing    relative  ">
      <div className="container">
        <div className="grid grid-cols-12  left-spacing pr-[15px] md:pr-0">
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              variants={textContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className=" mb-[20px] ">
              <motion.h2
                className="text-xl text-primary font-[600] leading-[1.2]"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {data.title}
              </motion.h2>
              </div>
            </motion.div>
          </div>
          <div className="col-span-12 lg:col-span-7 right-0 pl-[0px] lg:pl-[50px]">
            <div>
              <div className="  ">
                <motion.div
                  variants={slideIntop}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <p className="text-sm font-normal  text-territory leading-[1.6]">
                  {data.desc}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentText;
