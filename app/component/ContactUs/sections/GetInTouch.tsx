"use client";

import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

interface jobarray {
  jobtitle: string;
  place: string;
}
interface PlatformsItem {
  id: number;
  title: string;
  job: jobarray[];
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}

const GetInTouch: React.FC<PlatformsSectionProps> = () => {



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
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1, y: 0, transition: { duration: 0.5 }},
    };

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative ">
      <div className="container">
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
  >
    {/* Buttons Row */}
    <motion.div
      className="flex flex-col md:flex-row gap-2 pb-5 lg:pb-[40px] mb-5 lg:mb-[40px] border-b border-[#00000015]"
      variants={fadeUp}
    >
      {["General Enquires", "Request for quotation", "downloads"].map((text, i) => (
      <motion.div
        key={i}
        className={`border border-[#18355F] w-fit rounded-full min-w-[216px] text-center cursor-pointer transition-all duration-300 ${
        i === 0
          ? "bg-secondary border-secondary text-white"
          : "hover:bg-secondary hover:border-secondary hover:text-white text-territory"
        }`}
        whileHover={{ scale: 1.05 }}
        variants={fadeUp}
      >
        <p className="uppercase text-xs font-[500] py-[12px] px-[24px]">{text}</p>
      </motion.div>
      ))}
    </motion.div>

    {/* Heading */}
    <motion.h2
      className="text-xl text-primary font-[600] leading-[1.2] mb-3 lg:mb-[30px]"
      variants={fadeUp}
    >
      Get In Touch
    </motion.h2>

    {/* Description */}
    <motion.p
      className="text-[#404040] max-w-[90ch] mb-5 lg:mb-[40px]"
      variants={fadeUp}
    >
      With our expertise in steel projects, we are with you to help you realize your dreams. Every step of the way. Simply let us know how we can reach you.
    </motion.p>

    {/* Input Fields */}
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 lg:gap-x-6 xxl:gap-x-10 mb-5 lg:mb-[40px]"
      variants={containerVariants}
    >
      {["Name", "Email ID", "Contact Number"].map((placeholder, i) => (
        <motion.div
          key={i}
          className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0"
          variants={fadeUp}
        >
          <input
            type={placeholder === "Email ID" ? "email" : placeholder === "Contact Number" ? "number" : "text"}
            placeholder={placeholder}
            className="px-1 appearance-none bg-transparent border-0 border-b border-[#dcdcdc] focus:outline-none focus:ring-0 focus:border-black text-[#595959] text-xs py-2 pr-6 w-full placeholder:text-[#595959]"
          />
        </motion.div>
      ))}
    </motion.div>

    {/* Message */}
    <motion.div
      className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0"
      variants={fadeUp}
    >
      <textarea
        placeholder="Message"
        rows={6}
        className=" placeholder:text-[#595959] w-full px-1 py-2 pr-6 text-xs text-[#595959] bg-transparent border-0 border-b border-[#dcdcdc] focus:outline-none focus:ring-0 focus:border-black appearance-none"
      />
    </motion.div>

    {/* Submit Button */}
    <motion.div variants={fadeUp}>
      <motion.button
        className="mt-6 min-w-[173px] bg-[#0A2657] text-white text-[16px] font-[400] px-8 py-4 rounded-full shadow-md hover:bg-primary transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        SUBMIT
      </motion.button>
    </motion.div>
  </motion.div>
</div>
    </section>
  );
};

export default GetInTouch;
