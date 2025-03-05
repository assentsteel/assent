'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const AboutUs = () => {
  return (
    <motion.section className="section-spacing overflow-hidden" 
    initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      >
      <div className="container">
        <motion.div 
        variants={fadeIn}
        className="flex items-center space-x-[24px] text-primary text-sm font-medium mb-5 lg:mb-[60px]">
      
          <span className="w-[24px] h-[2px] bg-primary"></span>
          <span className="w-[160px] leading-none uppercase text-[16px]">ABOUT US</span>
          <hr className="w-[100%]" />
        </motion.div>

        <div className="lg:grid lg:grid-cols-12 gap-[50px] lg:gap-[80px] flex flex-col items-center">
          <motion.div   variants={slideLeft} className="relative w-full h-[400px] md:h-[500px] col-span-4">
            <Image
              src="/assets/img/home/abt01.jpg"
              alt="About Us"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-lg"
            />

            <div className="absolute bottom-4 w-full flex justify-center">
              <motion.div  variants={fadeIn} className="flex gap-4 justify-center bg-white/10 backdrop-blur-[10px]  px-4 py-3 rounded-full">
                <Image
                  src="/assets/img/home/iso-9001.svg"
                  alt=""
                  width={89}
                  height={89}
                />
                <Image
                  src="/assets/img/home/iso-9001.svg"
                  alt=""
                  width={89}
                  height={89}
                />
                <Image
                  src="/assets/img/home/iso-9001.svg"
                  alt=""
                  width={89}
                  height={89}
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="col-span-8">
            <motion.div className="flex flex-col  gap-[20px] lg:gap-[60px] leading-none" variants={slideRight}>
            <h2 className="text-lg font-bold text-black">
              BUILDING CO. (BEST) L.L.C
            </h2>
            <p className="leading-relaxed text-black/75">
              Since 1975, BUILDING CO. (BEST) L.L.C metaphors to lead the
              phenomenal construction industry revolution, with its goal of
              excellence, the Company earned reputation of delivering an
              exceptional construction services in the UAE. Throughout its
              commitment towards greater endeavor, BUILDING CO. (BEST) L.L.C
              created an outstanding distinction from its PRIDE Core Foundation
              — Planning, Reliability, Innovation, Determination and Excellence.
            </p>
            <Link href="#" className="self-start text-white bg-primary rounded-lg text-sm font-medium transition spckbtn">
             <div><Image src={"/assets/img/icons/arrow.svg"} alt="" width={30} height={30}/></div> MORE ABOUT US
            </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;