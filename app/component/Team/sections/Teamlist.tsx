"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { slideInLeft, slideInTop, containerVariants, itemVariants } from "../../common/MotionAnimation"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/public/assets/assets";
gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  designation: string;
  image: string;
  imageAlt: string;
  linkedIn: string;
  description: string;
}

import { Team } from '@/public/types/Common';

const Teamlist = ({ data }: { data: Team }) => {
  const containerRef = useRef(null);

  console.log(data)

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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


  return (
    <section className="py-[50px] md:py-[70px] xl:py-[80px] xxl:py-[100px]     overflow-hidden relative  ">
      <div className="container">
        <div>
          <motion.h2
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="font-semibold text-primary text-xl mb-8"
          >
            {data.teamSection.title}
          </motion.h2>
          <motion.div
            variants={slideInTop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-sm max-w-[102ch] text-territory mb-10"
          >
            <p>{data.teamSection.description}</p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4  gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {data.teamSection.items.map((item, index) => (
            <motion.div key={index} variants={itemVariants} onClick={() => setSelectedMember(item)}>
              <div className="relative group rounded-[15px] overflow-hidden h-full group">
                <div className="bg-[#CACBCA] group-hover:bg-primary relative transition-all duration-500 ">
                  <figure className=" ">
                    <Image
                      src={item.image}
                      alt=""
                      width={500}
                      height={500}
                      className="grayscale-[1] group-hover:grayscale-0 transition-all duration-400 w-full object-cover"
                    />
                  </figure>
                </div>
                <div className="">
                  <div className="px-5 py-5 lg:px-10 lg:py-5 bg-[#F5F5F5] rounded-b-[15px]" >
                    <p className="text-md font-semibold text-territory ">{item.name}</p>
                    <p className="text-[#595959]">{item.designation} </p>
                  </div>
                </div>


              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedMember && (
            <motion.div
              className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 w-full h-full mx-auto my-auto"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
            >
              <div className="relative w-3/4 h-3/4 lg:w-2/3 lg:h-2/3">
                <button
                  className="absolute top-2 right-2 text-white text-2xl z-10 flex justify-center items-center bg-primary rounded-full w-[25px] h-[25px]"
                  onClick={() => setSelectedMember(null)}
                >
                  &times;
                </button>
                <div className="max-w-full bg-white rounded-lg shadow-md overflow-hidden flex h-full lg:flex-row flex-col">
                  <div className="lg:w-1/3 w-full h-[35%] lg:h-full md:h-1/2 bg-primary">
                    <Image
                      src={selectedMember.image}
                      alt="Profile"
                      className="w-full h-full object-contain lg:object-cover"
                      width={500}
                      height={500}
                    />

                  </div>

                  <div className="lg:w-2/3 w-full p-4 h-full flex flex-col justify-center">
                    <div className="pb-5">
                      <div className="flex items-center lg:gap-5 justify-center flex-col lg:flex-row lg:justify-start">
                        <h2 className="lg:text-xl text-sm font-semibold text-gray-800">
                          {selectedMember.name}

                        </h2>
                        {selectedMember.linkedIn && selectedMember.linkedIn !== "" && <Image
                          src={assets.lin}
                          alt=""
                          width={window.innerWidth < 768 ? 50 : 67}
                          height={window.innerWidth < 768 ? 50 : 67}
                          className="cursor-pointer lg:mt-2"
                        />
                        }
                      </div>
                      <p className="lg:text-sm text-xs text-gray-500 lg:mb-2 text-center lg:text-start">{selectedMember.designation}</p>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed pt-5 border-t max-sm:text-xs">
                      {selectedMember.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </section>
  );
};

export default Teamlist;
