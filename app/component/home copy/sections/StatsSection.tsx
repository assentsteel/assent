"use client";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const stats = [
  { value: 50, label: "Years of Experience", icon: "/assets/img/icons/experience.svg" },
  { value: 150, label: "Projects Completed", icon: "/assets/img/icons/project-completed.svg" },
  { value: 100, label: "Clients Who Trust Us", icon: "/assets/img/icons/clients-who.svg" },
];

const StatsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex justify-center items-center py-16 overflow-hidden relative section-spacing"
    >
      {/* Background Image with Animation */}
      <motion.figure
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 h-full w-full -z-[1]"
      >
        <Image
          src="/assets/img/home/stastsc.jpg"
          className="absolute object-cover object-center h-full"
          alt=""
          width={1920}
          height={800}
        />
      </motion.figure>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-[64px] w-full">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center bg-primary text-white p-[20px] lg:p-[32px] rounded-custom shadow-lg"
            >
              <div className="flex justify-between items-center w-full mb-[10px] lg:mb-[50px]">
                <span className="text-xl leading-none font-bold">
                  {inView ? <CountUp start={0} end={stat.value} duration={2} delay={0.3} /> : 0}+
                </span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Image src={stat.icon} alt="" className="w-[30px] lg:w-[50px]" width={50} height={50} />
                </motion.div>
              </div>
              <span className="text-sm mt-1 text-left flex w-full text-white/80">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;
