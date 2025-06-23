"use client"; 
import Image  from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);
 
import { textbyimg } from '@/public/types/Common'; 



const TextByImg = ({ data,kmbtn }: { data: textbyimg, kmbtn?: boolean }) => {   
  

  const containerRef = useRef(null);
  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px] pts  overflow-hidden relative ">
      <div className="container">
  <div className="lg:flex items-center">
    {/* Text Section */}
    <div
      className="w-full lg:w-1/2 pr-0 lg:pr-[44px]"



    > 
        <div className="mb-8 lg:mb-0" >
          <motion.h2 className="text-xl text-primary font-[600] leading-[1.2] mb-4 lg:mb-10"
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariants}
            initial="hidden"
            whileInView="visible">
            {data.title}
          </motion.h2>

          <motion.div className="text-territory text-base font-[400] leading-[1.8] mb-6 lg:mb-10"
          initial="hidden"
          whileInView="visible"
          variants={imageVariants}
          viewport={{ once: true, amount: 0.2 }} dangerouslySetInnerHTML={{__html: data.description}}> 
           
          
          </motion.div>
          {kmbtn &&
            <motion.button
             initial="hidden"
          whileInView="visible"
          variants={imageVariants}
              viewport={{ once: true, amount: 0.2 }}
              className="mt-auto m-auto h-[40px] lg:h-[48px] text-territory max-w-[315px] w-[315px] md:m-left border border-secondary py-2 px-6 rounded-full hover:bg-secondary hover:text-white transition text-xs  font-medium uppercase">
              view more
            </motion.button>
          }
        </div>
   
    </div>

    {/* Image Section */}
    <motion.div
      className="w-full lg:w-1/2 pl-0 lg:pl-[44px]"
      initial="hidden"
      whileInView="visible"
      variants={imageVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      
        <div >
          <figure className="image-wrapper">
            {data.image2 && (
              <Image
                src={data.image2}
                alt={data.image2Alt || ""}
                className="rounded-[15px]"
                width={4860}
                height={1725}
              />
            )}
            {data.image && (
              <Image
                src={data.image}
                alt={data.imageAlt || ""}
                className="rounded-[15px]"
                width={4860}
                height={1725}
              />
            )}
          </figure>
        </div>
   
    </motion.div>
  </div>
</div>
    </section>
  );
};

export default TextByImg;
