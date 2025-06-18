"use client";
import Image  from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { motion } from "framer-motion";



      import { GpAmericaSection} from '@/public/types/Common';
import { imageVariants } from "../../common/MotionAnimation";

     const SingleImageGp = ({ data }: { data: GpAmericaSection }) => {
  const containerRef = useRef(null);


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
    <section className=" overflow-hidden relative">
    <div className="container">
      <div>
        <motion.figure
          className="image-wrapper h-[200px] md:h-auto w-full"
          initial="hidden"
          whileInView="visible"
          variants={imageVariants}
            viewport={{ once: true, amount: 0.2 }}

        >
          <Image
            src={data.image}
            alt={data.imageAlt}
            width={1600}
            height={569}
            className="rounded-[15px] object-cover w-full h-full"
          />
        </motion.figure>
      </div>
    </div>
  </section>
  );
};

export default SingleImageGp;
