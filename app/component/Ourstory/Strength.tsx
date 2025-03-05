"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SecHr from "../common/SecDivider/SecHr";

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const Strength = () => {
  return (
    <motion.section
      className="pt-[60px] md:pt-[80px] lg:pt-[100px] overflow-hidden  "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}>
      <div className="container">
        <div className="mb-4 md:mb-[60px]">
          <SecHr title="Strength & Vision" />
        </div>

        <div className="lg:grid lg:grid-cols-12 gap-[50px] lg:gap-[80px] flex flex-col items-center">
          <motion.div
            variants={slideLeft}
            className="relative w-full h-[300px] md:h-[500px] col-span-4">
            <Image
              src="/assets/img/story/strength.jpg"
              alt="About Us"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-lg"
            />
          </motion.div>
          <div className="col-span-8">
            <motion.div
              className="flex flex-col  gap-[20px] lg:gap-[60px] leading-none"
              variants={slideRight}>
              <ul className=" liststs">
                <li className="flex before:content-['']   before:h-5 before:min-w-5 before:rounded-[100%] before:bg-secondary before:mr-4 before:mt-1 text-sm leading-[1.4] text-black/75 mb-3">
                  BUILDING CO. (BEST) L.L.C specializes in delivering
                  high-quality construction projects across residential,
                  commercial, governmental, healthcare, hospitality, and
                  industrial sectors. Our expertise ensures precision,
                  durability, and excellence in every build.
                </li>
                <li className="flex before:content-[''] before:h-5 before:min-w-5 before:rounded-[100%] before:bg-secondary before:mr-4 before:mt-1 text-sm leading-[1.4] text-black/75 mb-3">
                  Utilizing the latest construction technologies and engineering
                  innovations, we guarantee structurally sound, aesthetically
                  outstanding, and efficiently executed projects that meet the
                  highest industry standards.
                </li>
                <li className="flex before:content-[''] before:h-5 before:min-w-5 before:rounded-[100%] before:bg-secondary before:mr-4 before:mt-1 text-sm leading-[1.4] text-black/75 mb-3">
                  Our company fosters a collaborative and dynamic work
                  environment, integrating creativity and technical expertise to
                  develop solutions that exceed client expectations.
                </li>
                <li className="flex before:content-[''] before:h-5 before:min-w-5 before:rounded-[100%] before:bg-secondary before:mr-4 before:mt-1 text-sm leading-[1.4] text-black/75 mb-3">
                  Every member of BUILDING CO. (BEST) L.L.C is dedicated to
                  upholding our values of Planning, Quality, Integrity,
                  Excellence, and Commitment—working together as a unified force
                  to achieve outstanding results. With an unwavering vision for
                  growth and continuous improvement, we push boundaries in
                  construction excellence, ensuring our projects contribute to
                  the UAE’s evolving skyline and long-term development.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Strength;
