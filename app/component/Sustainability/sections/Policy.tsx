"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { containersVariants, textItemsVariants } from "../../common/MotionAnimation";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsSectionProps {
  data: { id: number; heading: string; title: string; paragraphs: string[] };
}
const Policy: React.FC<PlatformsSectionProps> = ({ data }) => {
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
  const textVariants = {
    hidden: (direction = "x") => ({
      opacity: 0,
      [direction]: direction === "x" ? -30 : 20,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px] overflow-hidden relative  ">
        <div className="container">
          <div className="py-[50px] md:py-[70px] xl:py-[100px] border-t border-b">
          <div className="grid grid-cols-12  left-spacing pr-[15px] md:pr-0">
            <div className="col-span-12 lg:col-span-6 mb-6 lg:mb-0">
              <motion.div
                className="h-full"
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
  className="flex flex-col justify-between h-full"
  variants={containersVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  <motion.div
    className="overflow-hidden mb-[20px] lg:mb-[48px]"
    variants={textItemsVariants}
  >
    <motion.p
      variants={textItemsVariants}
      className="text-md uppercase text-[#595959] font-medium border-b inline-flex border-secondary pb-[10px] lg:pb-[25px] leading-none"
    >
      {data.title}
    </motion.p>
  </motion.div>

  <motion.div
    variants={textItemsVariants}
    className="bg-[#F2F6F6] p-4 md:px-[40px] md-py-[15px] rounded-[15px]"
  >
    <motion.h3
      className="text-md font-semibold text-territory mb-2"
      variants={textItemsVariants}
    >
      Committed to a Greener Future
    </motion.h3>

    <motion.p
      className="text-sm text-territory opacity-85 mb-3 lg:mb-8"
      variants={textItemsVariants}
    >
      Building responsibly for tomorrow through innovation and sustainable
      practices. Download our Sustainability Policy 2024 to learn more.
    </motion.p>

    <motion.button
      variants={textItemsVariants}
      className="group gap-4 flex justify-between items-center mt-auto border border-secondary py-2 px-6 rounded-full hover:bg-white hover:text-secondary text-territory transition text-xs h-[40px] lg:h-[48px] font-medium uppercase relative"
    >
      <span className="w-fit text-center">
        Sustainability Policy 2024
      </span>
      <div className="flex gap-3">
        {/* Your SVGs here */}
      </div>
    </motion.button>
  </motion.div>
</motion.div>
              </motion.div>
            </div>

            <motion.div className="col-span-12 lg:col-span-6 right-0 pl-[0px] lg:pl-[50px]">
              <div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className=""
                >
                  <div>
                    <motion.h2
                      className="text-xl text-primary font-[600] leading-[1.2] mb-4 lg:mb-6"
                      custom="x"
                      variants={textVariants}
                    >
                      {data.heading}
                    </motion.h2>

                    {data.paragraphs.map((text, index) => (
                        <motion.p
                        key={index}
                        className="last:mb-0 text-sm font-normal mb-3 lg:mb-6 text-territory leading-[1.6]"
                        custom="y"
                        variants={textVariants}
                        transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                      >
                        {text}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policy;
