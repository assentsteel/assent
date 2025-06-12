"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);
 

import { Awards } from '@/public/types/Common';  

const AccreditationsList = ({ data }: { data: Awards }) => {   
    const [selectedImage, setSelectedImage] = useState<string | StaticImageData | null>(null);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px] overflow-hidden relative">
      <div className="container">
        <div className="pb-10">
          <p>
            At Assent Steel, excellence is more than a standard — it&apos;s our foundation. Our commitment to quality, safety, and innovation has earned us industry-wide recognition. Each award and accreditation reflects our unwavering pursuit of engineering perfection. We take pride in these achievements as they inspire us to keep raising the bar.
          </p>
        </div>
       <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {data.awards.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <div className="relative group overlbl h-full cursor-pointer" onClick={() => setSelectedImage(item.image)} >
              <figure className="overlayclr">
                <Image src={item.image} alt="" className="rounded-[15px] w-full object-cover" width={800} height={800} />
              </figure>

              <div className="absolute bottom-0 px-5 pb-5 w-full">
                <p className="text-md text-white font-[600] pr-0 lg:pr-6">
                  {item.title}
                </p>
                <div className="flex gap-2 items-center transform opacity-0 group-hover:opacity-100 transition-all duration-300 h-0 group-hover:h-[30px] md:group-hover:h-[48px]">
                  <div className="w-full border-b-2 border-white transition-all duration-500 group-hover:border-secondary"></div>
                  <div className="min-w-[30px] min-h-[30px] lg:min-w-[48px] lg:min-h-[48px] bg-secondary rounded-full flex items-center justify-center translate-x-[-20px] group-hover:translate-x-0 transition-all duration-500">
                    {/* SVG Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none">
                      <path d="M13.8291 17.6665H3.81445V14.3282H13.8291V4.3136H17.1673V14.3282H27.1819V17.6665H17.1673V27.6811H13.8291V17.6665Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-2xl w-full">
              <button
                className="absolute top-2 right-2 text-white text-2xl z-10 flex justify-center items-center bg-primary rounded-full w-[25px] h-[25px]"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </button>
              <Image
                src={selectedImage}
                alt="popup"
                className="w-full h-auto rounded-lg"
                width={800}
                height={800}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="text-center mt-5 md:mt-[60px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <button className="border flex gap-3 items-center justify-center m-auto whitespace-nowrap font-[500] border-secondary text-xs text-territory uppercase rounded-full py-[8px] px-[20px] w-fit">
          Load More
          <svg
            stroke="#000"
            fill="#000"
            strokeWidth="0"
            viewBox="0 0 320 512"
            height="10px"
            width="8px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M310.6 233.4c12.5 12.5..." />
          </svg>
        </button>
      </motion.div>
      </div>
    </section>
  );
};

export default AccreditationsList;
