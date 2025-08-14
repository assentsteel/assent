"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

 
import { About } from '@/public/types/Common'; 

const Achievements = ({ data }: { data: About }) => { 
  const containerRef = useRef(null);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });


  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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

  function extractNumber(value: string): number {
    const cleaned = value.replace(/,/g, '');
    const match = cleaned.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  return (
    <section className="py-0 md:py-[70px] xl:py-[80px] xxl:py-[100px]  overflow-hidden relative ">

<div className="container" ref={ref}>
  <div className="border-t">
    <motion.div
      className="grid grid-cols-12 py-6 md:py-0"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {data.firstSection.items.map((item, index) => (
        <motion.div
          key={index}
          className="col-span-6 xl:col-span-3 py-3 md:py-10 group hrgr"
          variants={cardVariants}
        >
          <div className="border-l border-[#f6f6f6] px-3 py-2 md:px-10 md:py-4 group-hover:border-0">
            <div className="overflow-hidden">
              <motion.p
                className="text-primary font-[600] text-[20px] md:text-40 mb-[4px]"
                variants={cardVariants}
              >
                {inView ? <CountUp start={0} end={extractNumber(item.number)} duration={2} delay={0.3} decimals={extractNumber(item.number) % 1 !== 0 ? 1 : 0} /> : 0}<span>{item.number.includes("+") ? "+" : " " + item.number.split(" ")[1]}</span>
                {/* <span className="text-[17px] 2xl:text-[24px]">{stat.suffix}</span> */}
                {/* <span className="text-[15px] md:text-sm">{item.number}</span> */}
              </motion.p>
              <motion.p
                className="text-[15px] md:text-md text-territory leading-[1.6]"
                variants={cardVariants}
              >
                {item.value}
              </motion.p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</div>
    </section>
  );
};

export default Achievements;
