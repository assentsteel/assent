"use client";
 ;
import Image from "next/image";
import { useEffect, useRef,useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

interface DetailedItem {
  icon: string;
  title: string;
  content: string;
}
interface PlatformsItem {
  id: number;
  title: string;
  tag: string;
  workingtitle: string;
  workingtime: string;
  workingdetails: string;
  details: DetailedItem[]
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}

const TextByImg: React.FC<PlatformsSectionProps> = ({data
}) => {

  const [activeTab, setActiveTab] = useState(data[0]?.tag);
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
  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -30, transition: { duration: 0.4 } },
  };
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="pt-[50px] md:pt-[70px] xl:pt-[100px] pb-0 md:pb-[70px] xl:pb-[100px]   overflow-hidden relative ">
      <div className="container">
        <div className="border-b border-[#00000015] mb-5 lg:mb-10 pb-5 lg:pb-10">
          <motion.h2
             variants={slideInLeft}
             initial="hidden"
             animate="visible"
            exit="exit"
            className="text-xl  text-primary font-[600] leading-[1] mb-0">Find Us Here</motion.h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
  {/* Left Side - Tabs */}
  <motion.div
    className=""
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={containerVariants}
  >
    <motion.div
      className="bg-primary rounded-xl p-4 md:p-10 text-white"
      variants={itemVariants}
    >
      {/* Tab Headers */}
      <motion.div
        className="md:flex gap-10 lg:gap-[100px] items-center border-b border-[#ffffff35] mb-4 lg:mb-[30px] w-fit"
        variants={itemVariants}
      >
        {data.map((item, index) => (
          <motion.p
            key={index}
            onClick={() => setActiveTab(item.tag)}
            className={`text-lg md:text-sm xl:text-md xxl:text-lg leading-[2.18] cursor-pointer relative top-[1px] pb-1
              ${
                activeTab === item.tag
                  ? "border-b-2 border-secondary font-[600]"
                  : "border-b-2 border-transparent font-[400]"
              }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {item.title}
          </motion.p>
        ))}
      </motion.div>

      {data.map((item, index) =>
        activeTab === item.tag ? (
          <motion.div
            key={index}
            className="flex flex-col gap-7"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {item.details.map((deta, index) => (
              <motion.div
                key={index}
                className="flex gap-5 items-start"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Image src={deta.icon} alt="" />
                <div>
                  <p className="text-[14px] uppercase mb-[10px] opacity-75 tracking-[2px]">
                    {deta.title}
                  </p>
                  <p className="max-w-[25ch]">{deta.content}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="bg-[#ffffff05] rounded-[10px] p-5 md:p-7"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-[18px] xl:text-[22px] mb-[10px] font-[600]">
                {item.workingtitle}
              </p>
              <p className="mb-[10px] opacity-85">{item.workingtime}</p>
              <p className="opacity-75">{item.workingdetails}</p>
            </motion.div>
          </motion.div>
        ) : null
      )}
    </motion.div>
  </motion.div>

  {/* Right Side - Map */}
  <motion.div
    className=""
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true }}
  >
    <div className="w-full h-[350px] lg:h-full rounded-xl overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.968414724833!2d55.08037347604625!3d24.83075374644437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f0a6621c15b95%3A0x40945b5014e57240!2sASSENT%20STEEL!5e0!3m2!1sen!2sin!4v1744869087135!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </motion.div>
</div>
      </div>
    </section>
  );
};

export default TextByImg;
