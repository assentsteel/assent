"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger); 
import { ainglelabel } from "@/public/types/Common";
import Link from "next/link";
const SingleImageText = ({
  data,
  textright,
  maxwidth,
}: {
  data: ainglelabel;
  textright?: boolean;
  maxwidth?: string;
}) => {
  const containerRef = useRef(null);
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
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
    <section className="pb100 cpt0  overflow-hidden relative cpt0">
      <div className="container">
     
          <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className={`rounded-[15px] pb-6 p-4 md:pb-4 lg:pt-[116px] lg:pb-[96px] lg:px-[100px] bg-cover relative ${
            textright
              ? `blueoverlayrt`
              : "blueoverlay bg-[position:right_center]"
          }`}
          style={{
            background: `url(${
             typeof data.image === "string" ? data.image: data.image.src 
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10 rounded-[15px] lg:hidden"></div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`flex flex-col justify-center relative z-10 h-full ${
              maxwidth ? maxwidth : ""
            } ${textright ? "lg:ml-auto" : ""}`}
          >
            <motion.h2
              variants={fadeUp}
              className="text-xl text-white font-[600] leading-[1.2] mb-3 lg:mb-[30px] max-w-[22ch]"
            >
              {data.title}
            </motion.h2>

            {data.description
              .split("\n")
              .map((paragraph: string, index: number) => (
                <motion.p
                  key={index}
                  variants={fadeUp}
                  className=" text-white text-sm font-[400] leading-[1.53] max-w-[84.5ch]"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              <Link href="/contact-us" className="border whitespace-nowrap font-[500] border-secondary text-[15px] text-white uppercase rounded-full py-[8px] px-[20px] 2xl:py-[12px] 2xl:px-[99px] mt-5 md:mt-[40px] w-fit">
                Contact us 
              </Link>
          </motion.div>
        </motion.div>
    
      </div>
    </section>
  );
};

export default SingleImageText;
