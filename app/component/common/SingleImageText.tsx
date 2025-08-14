"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);




import { Abtpurpose  } from '@/public/types/Common';
  const SingleImageText = ({ data , textright,maxwidth }: { data: Abtpurpose    , textright?: boolean;  maxwidth?: string }) => {
  const containerRef = useRef(null);
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
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
    <section className="py-[50px] md:py-[70px] xl:py-[80px] xxl:py-[100px] cpt0  overflow-hidden relative cpt0">
      <div className="container">
               <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className={`rounded-[15px] p-4 lg:pt-[116px] lg:pb-[96px] lg:px-[100px] bg-cover relative ${textright ? `blueoverlayrt` : 'blueoverlay bg-[position:right_center]'}`}
          style={{
            background: `url(${typeof data.image === 'string' ? data.image : data.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`flex flex-col justify-center relative z-10 h-full ${maxwidth ? maxwidth : ''} ${textright ? 'lg:ml-auto' : ''}`}
          >

                <motion.h2
                  variants={fadeUp}
                  className="text-xl text-white font-[600] leading-[1.2] mb-3 lg:mb-[30px]"
                >
                  {data.title}
                </motion.h2>

                {data.description.split("\n").map((paragraph: string, index: number) => (
                  <motion.p
                    key={index}
                    variants={fadeUp}
                    className="mb-4 last:mb-0 text-white text-base font-[400] leading-[1.8]"
                    dangerouslySetInnerHTML={{__html: paragraph}}
                  />
                ))}

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default SingleImageText;
