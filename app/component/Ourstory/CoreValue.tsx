"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SecHr from "../common/SecDivider/SecHr";

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

const CoreValue = () => {
  return (
    <motion.section
      className="section-spacing overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}>
      <div className="container">
        <div className="mb-4 md:mb-[60px]">
          <SecHr title="Core Values & Expertise" />
        </div>

        <div className="lg:grid lg:grid-cols-12 gap-[50px] lg:gap-[80px] flex flex-col items-center">
          <div className="col-span-8">
            <motion.div
              className="flex flex-col  gap-[20px] lg:gap-[60px] leading-none"
              variants={slideRight}>
              <h2 className="text-lg font-bold text-black">
                BUILDING CO. (BEST) L.L.C
              </h2>
              <p className="leading-relaxed text-black/75">
                At BUILDING CO. (BEST) L.L.C, we uphold the highest standards in
                every project, driven by our core values of Planning, Quality,
                Integrity, Excellence, and Commitment. Our success is built on
                the expertise of our skilled professionals, meticulous attention
                to detail, and an unwavering dedication to client satisfaction.
                We don’t just construct buildings—we create lasting legacies
                that reflect our passion for quality and our pursuit of
                perfection
              </p>

              <div className="  w-full flex ">
                <motion.div
                  variants={fadeIn}
                  className="flex gap-2 lg:gap-[12px] justify-center bg-black/10 backdrop-blur-[10px]  px-4 py-3 rounded-full">
                  <Image
                    src="/assets/img/story/im-01.png"
                    alt=""
                    width={80}
                    height={80}
                  />
                  <Image
                    src="/assets/img/story/im-02.png"
                    alt=""
                    width={80}
                    height={80}
                  />
                  <Image
                    src="/assets/img/story/im-03.png"
                    alt=""
                    width={80}
                    height={80}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={slideLeft}
            className="relative w-full h-[300px] md:h-[500px] col-span-4">
            <Image
              src="/assets/img/home/abt01.jpg"
              alt="About Us"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CoreValue;
