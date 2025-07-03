"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";



import { Home } from "@/public/types/Common";



const StatsSection = ({ data }: { data: Home }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="flex justify-center items-center overflow-hidden relative bg-primary "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 w-full frscfes px-3 ">
        {data.firstSection.items.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="flex items-center  text-white  py-[40px] px-[20px]  lg:py-[70px] lg:px-[10px]  gap-5 border-b border-white/20 border-solid"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Image src={stat.logo} alt={stat.logoAlt} width={50} height={50} className="h-[45px] lg:h-[35px] xl:h-[60px] w-[45px] lg:w-[35px] xl:w-[60px]" />
            </motion.div>
            <div>
              <span className="text-[20px] lg:text-[15px] xl:text-[20px]  2xl:text-[40px] font-bold leading-none flex items-center gap-1">
                 {inView ? <CountUp start={0} end={Number(stat.number)} duration={2} delay={0.3} decimals={Number(stat.number) % 1 !== 0 ? 1 : 0} /> : 0}
                {/* <span className="text-[17px] 2xl:text-[24px]">{stat.suffix}</span> */}
               {(() => {
            const [before, after] = stat.suffix.split('/');
            return (
              <>
                <span className="text-[20px] lg:text-[15px] xl:text-[20px]  2xl:text-[40px]">{before}</span>
                {after && (
                  <>
                    <span className="mx-1 text-[17px] 2xl:text-[24px]">/</span>
                    <span className="text-[17px] 2xl:text-[24px]">{after}</span>
                  </>
                )}
              </>
            );
          })()}

              </span>
              <p className="text-md lg:text-[14px] xl:text-[18px] 2xl:text-md text-white/70">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsSection;
