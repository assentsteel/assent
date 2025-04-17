"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  title: string;
  image: string | StaticImageData;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}
const HeadingText: React.FC<PlatformsSectionProps> = ({data
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

  return (
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px]  overflow-hidden relative  ">
      <div className="container">
        <div className="grid grid-cols-12  left-spacing pr-[15px] md:pr-0">
          <div className="col-span-12 lg:col-span-12">
            <motion.div
              variants={textContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="overflow-hidden mb-[20px] ">
                <motion.h2 className="text-xl  text-primary font-[600] leading-[1.2] max-w-[33ch]">
                  Trusted Steel Erection Experts Delivering End-to-End Solutions
                </motion.h2>
              </div>
            </motion.div>
          </div>
          <div className="col-span-12 lg:col-span-12 ">
            <div>
              <div className="overflow-hidden max-w-[140ch]">
                <p className="text-sm font-normal  text-territory leading-[1.6] ">
                  Working with ASSENT STEEL INDUSTRIES means you get the support
                  of one of the leading expert Steel Erection Companies in the
                  UAE. We uphold a safety culture and ensure that our Steel
                  Erection practices in the UAE are standard-complaint and
                  failsafe. The steel fabrication process is long and complex.
                  Our company employs the best tools and equipment to deliver
                  the various steel erection services with precision and
                  authority. At ASSENT STEEL INDUSTRIES, we use our vast
                  knowledge base and steel expertise to help make your vision
                  come to life.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-5 lg:mt-[60px]">
  {data.map((item, index) => (
    <div key={index}>
      <div className="relative group">
        <figure className="overlayclr">
          <Image
            src={item.image}
            alt=""
            className="rounded-[15px]   w-full object-cover"
          />
        </figure>
        <div className="absolute bottom-0 px-5 pb-5">
          <p className="text-md text-white font-[600] pb-5 border-b-2 border-white transform transition-transform duration-500 group-hover:border-secondary tran">
            {item.title}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default HeadingText;
