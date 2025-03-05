'use client'
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Sustainability = () => {
   const containerRef = useRef(null);
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };
  
  const textItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const textItemVariants2 = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
    <section className="relative bg-cover bg-center text-white section-spacing bg-primary">
      <div className="w-full h-full absolute mx-auto top-0 left-0 right-0" ref={containerRef}>
      <video
        src="/assets/video/sustainable.mp4" // Correct public folder reference
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        autoPlay
        poster="/assets/img/home/sutainable.jpg" // Add poster image if needed
      />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#002C03]/30 via-[#001702]/80 to-[#000B03]/85"></div>
      <div className="relative container mx-auto grid md:grid-cols-2 gap-10 md:gap-8">
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}>
            <div className="overflow-hidden mb-[5px] md:mb-[55px]">
          <motion.h2 variants={textItemVariants}  className="text-xl font-semibold leading-none ">
            Sustainability at <br />
            ASSENT STEEL
          </motion.h2>
          </div>
          <div className="overflow-hidden mt-4 md:w-[80%]">
          <motion.p variants={textItemVariants} className="">
            ASSENT STEEL is committed to the highest standards of Corporate Social Responsibility and Sustainable
            Development which is an integral part of its business philosophy.
          </motion.p>
          </div>
        </motion.div>
        <motion.div variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}>
             <div className="overflow-hidden">
          <motion.h3 variants={textItemVariants} className="text-lg font-semibold mb-5 md:mb-[50px]">Core Areas of Focus</motion.h3>
          </div>
          <motion.ul className="grid grid-cols-1 md:grid-cols-2 text-md text-secondary leading-none border-t border-b border-secondary mb-[60px] xxl:mb-[140px]" variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}>
            <li className="overflow-hidden border-b border-secondary py-[10px] md:py-[25px]"><motion.span variants={textItemVariants2} className="flex items-center gap-[10px] md:gap-[30px]"><div className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]"><Image className="w-full h-full" src="/assets/img/icns/sus-01.svg" alt="Environmental"  width={38} height={38} /></div>Environmental</motion.span></li>
            <li className="overflow-hidden border-b border-secondary py-[10px] md:py-[25px]"><motion.span variants={textItemVariants2} className="flex items-center gap-[10px] md:gap-[30px]"><div className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]"><Image className="w-full h-full" src="/assets/img/icns/sus-02.svg" alt="Environmental" width={38} height={38} /></div> Health & Safety</motion.span></li>
            <li className="overflow-hidden border-b border-secondary py-[10px] md:py-[25px]"><motion.span variants={textItemVariants2} className="flex items-center gap-[10px] md:gap-[30px]"><div className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]"><Image className="w-full h-full" src="/assets/img/icns/sus-03.svg" alt="Environmental" width={38} height={38} /></div> Community</motion.span></li>
            <li className="overflow-hidden border-b border-secondary py-[10px] md:py-[25px]"><motion.span variants={textItemVariants2} className="flex items-center gap-[10px] md:gap-[30px]"><div className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]"><Image className="w-full h-full" src="/assets/img/icns/sus-04.svg" alt="Environmental" width={38} height={38} /></div> Diversity</motion.span></li>
            <li className="overflow-hidden  py-[10px] md:py-[25px]"><motion.span variants={textItemVariants2} className="flex items-center gap-[10px] md:gap-[30px]"><div className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]"><Image className="w-full h-full" src="/assets/img/icns/sus-05.svg" alt="Environmental" width={38} height={38} /></div> Ethics</motion.span></li>

          </motion.ul>
          <div className="overflow-hidden mt-[50px]">
          <motion.div  variants={textItemVariants}>
          <Link href="#" className="text-xs border-b border-[#5BA646] text-white uppercase group pb-[16px] inline-flex items-center gap-[18px]">Read More <div className="w-[20px] h-[20px] text-secondary bg-white group-hover:bg-secondary group-hover:text-primary flex items-center text-[14px] justify-center transition duration-300 ease-in-out"><FaChevronRight /></div></Link>
          </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sustainability;
