"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  title: string;
  subtitle: string;
  smalltext?: string;
}

interface PlatformsSectionProps {
  AreaExpertise: PlatformsItem[];
}

const Achievements: React.FC<PlatformsSectionProps> = ({AreaExpertise
}) => {
  const containerRef = useRef(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
    <section className="py-0 md:py-[70px] xl:py-[100px]   overflow-hidden relative ">

<div className="container">
  <div className="border-t">
    <motion.div
      className="grid grid-cols-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {AreaExpertise.map((item) => (
        <motion.div
          key={item.id}
          className="col-span-12 md:col-span-6 xl:col-span-3 py-7 md:py-10 group hrgr"
          variants={cardVariants}
        >
          <div className="sepses px-4 py-2 md:px-10 md:py-4 group-hover:border-0">
            <div className="overflow-hidden">
              <motion.p
                className="text-primary font-[600] text-40 mb-[4px]"
                variants={cardVariants}
              >
                {item.title}
                <span className="text-sm">{item.smalltext}</span>
              </motion.p>
              <motion.p
                className="text-md text-territory leading-[1.6]"
                variants={cardVariants}
              >
                {item.subtitle}
              </motion.p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</div>
    </section>
  );
};

export default Achievements;
