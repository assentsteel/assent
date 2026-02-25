"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

import { GPTenthSection } from "../types";
const AccordionAus = ({ data }: { data: GPTenthSection }) => {
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
    <section className="pb100 cpt0  overflow-hidden relative ">
      <div className="container">
        <div className="2xl:min-h-[365px] xl:grid  xl:grid-cols-[auto_60%]  2xl:grid-cols-[auto_60%]  xxxl:grid-cols-[auto_964px] lg:items-start xxl:items-start lg:gap-7 xl:gap-7 xxxl:gap-[106px]">
          <div className=" ">
            <motion.h2
              viewport={{ once: true, amount: 0.2 }}
              variants={slideInLeft}
              initial="hidden"
              exit="exit"
              whileInView="visible"
              className="text-lg  text-primary font-[600] leading-[1.2] mb-4 lg:mb-7 2xl:max-w-[10ch]"
            >
              {data.title}
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
              variants={{
                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: "easeOut" },
                }, // Slide up and fade in
              }}
            >
              <p className="text-tertiary text-sm font-[400] leading-[1.5] 2xl:max-w-[47ch]">
                {data.description}
              </p>
            </motion.div>
          </div>

          <div className="mt-6 lg:mt-7 xl:mt-0">
            {data.items.map((da, index) => (
              <motion.div
                key={index}
                className="group border-b first:border-t border-[#00000015] last:border-b-0 py-5 lg:py-[20px] xxl:py-[34px] last:!pb-0 transition-all duration-300"
                onMouseEnter={() => {
                  if (activeIndex !== index) {
                    setActiveIndex(-1); // trigger exit first
                    setTimeout(() => setActiveIndex(index), 250); // match exit height delay + duration = 0.15 + 0.25 = 400ms ≈ 350ms safe
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.2 }} // triggers only once when 20% is in view
              >
                <div className="flex items-start gap-5 md:gap-10 lg:gap-[50px] xl:gap-[100px]">
                  {/* NUMBER instead of LOGO */}
                  <p className="text-[#1F1F1F80] text-lg lg:text-[30px] font-[400] leading-[1.33]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="pt-[4px]">
                    <h3
                      className={`text-[22px] md:text-[24px] group-hover:text-secondary transition-all duration-300 leading-[120%] ${
                        activeIndex === index
                          ? "text-secondary font-[600]"
                          : "text-[#1F1F1F] font-[500]"
                      }`}
                    >
                      {da.title}
                    </h3>

                    <AnimatePresence initial={false}>
                      {activeIndex === index && (
                        <motion.div
                          key={`content-${index}`}
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            marginTop: "9px",
                            transition: {
                              height: {
                                duration: 0.35,
                                ease: [0.25, 0.46, 0.45, 0.94],
                              },
                              opacity: { duration: 0.25, delay: 0.05 },
                              marginTop: {
                                duration: 0.35,
                                ease: [0.25, 0.46, 0.45, 0.94],
                              },
                            },
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            marginTop: 0,
                            transition: {
                              opacity: { duration: 0.2, ease: "easeIn" },
                              height: {
                                duration: 0.25,
                                ease: [0.25, 0.46, 0.45, 0.94],
                                delay: 0.15,
                              },
                              marginTop: {
                                duration: 0.25,
                                ease: [0.25, 0.46, 0.45, 0.94],
                                delay: 0.15,
                              },
                            },
                          }}
                          className="text-territory/80 text-[17px] lg:text-[19px] font-[500] leading-[1.6] overflow-hidden"
                        >
                          <div>{da.description}</div>
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

export default AccordionAus;
