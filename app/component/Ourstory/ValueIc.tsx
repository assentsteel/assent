import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ValueIc = () => {
  const stats = {
    data: [
      { value: 50, label: "Planning", icon: "/assets/img/story/ico1.svg" },
      { value: 150, label: "Quality", icon: "/assets/img/story/ico2.svg" },
      { value: 100, label: "Integrity", icon: "/assets/img/story/ico3.svg" },
      { value: 100, label: "Excellence", icon: "/assets/img/story/ico4.svg" },
      { value: 100, label: "Commitment", icon: "/assets/img/story/ico5.svg" },
    ],
  };

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex justify-center items-center py-16 overflow-hidden relative section-spacing">
      {/* Background Image with Animation */}
      <motion.figure
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 h-full w-full -z-[1]">
        <Image
          src="/assets/img/story/storystar.jpg"
          className="absolute object-cover object-center h-full"
          alt=""
          width={1920}
          height={800}
        />
      </motion.figure>

      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6 xxl:gap-[60px] xl-gap-[40px] w-full">
          {stats.data.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-between items-center bg-primary text-white p-[20px] xxl:p-[32px] rounded-custom shadow-lg sm:h-[216px] h-[120px]">
              <div className="flex justify-between items-center w-full mb-[10px] lg:mb-[50px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}>
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    className="h-[30px] lg:h-[40px]"
                    width={50}
                    height={50}
                  />
                </motion.div>
              </div>
              <h4 className="text-left flex w-full text-white uppercase text-md font-bold">
                {stat.label}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ValueIc;
