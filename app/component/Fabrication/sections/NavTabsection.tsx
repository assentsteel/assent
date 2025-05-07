"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "@/public/assets/assets";
gsap.registerPlugin(ScrollTrigger);
interface PlatformsItem {
  id: number;
  title: string;
  tab: string;
  paragraphs: string[];
  image: string | StaticImageData;
}
interface PlatformsItemmn {
  title: string;
  data: PlatformsItem[];
}
interface PlatformsSectionProps {
  navigation?: boolean;
  data: PlatformsItemmn;
}
const NavTabsection: React.FC<PlatformsSectionProps> = ({
  data,
  navigation,
}) => {
  const [activeTab, setActiveTab] = useState(0); // default first tab

  const tabs = data.data.map((item) => item.tab);
  const activeContent = data.data[activeTab];
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>(
    {}
  );
  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -30, transition: { duration: 0.4 } },
  };
  const slideInbottom = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -30, transition: { duration: 0.4 } },
  };
  const tabsPerPage = 6;
  const [currentTabSet, setCurrentTabSet] = useState(0);
  const paginatedTabs = tabs.slice(
    currentTabSet * tabsPerPage,
    (currentTabSet + 1) * tabsPerPage
  );
  return (
    <section className="pt-0 md:pt-[70px] xl:pt-[100px] pb-[50px] md:pb-[70px] xl:pb-[100px]   overflow-hidden relative ">
      <div className="container">
        <div className="mb-5 lg:mb-[70px] flex justify-between">
          <motion.h2
            className="text-xl  text-primary font-[600] leading-[1.2] "
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {data.title}
          </motion.h2>
          {!isMobile && navigation && (
            <div className="flex justify-end items-center gap-4 mb-6">
              {/* Prev Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}

                onClick={() => {
                  const newTabSet = Math.max(currentTabSet - 1, 0);
                  setCurrentTabSet(newTabSet);
                  setActiveTab(newTabSet * tabsPerPage); // First item in the new set
                }}
                disabled={currentTabSet === 0}
                className={`bg-white text-black border px-3 py-1 rounded-full w-[48px] h-[48px] hover:border-white hover:bg-secondary group transition flex items-center justify-center ${
                  currentTabSet === 0
                    ? "opacity-50 cursor-not-allowed hover:bg-[#dddddd]"
                    : ""
                }`}
              >
                <Image
                  src={assets.greenarrow}
                  alt=""
                  width={11}
                  height={18}
                  className="group-hover:brightness-0 group-hover:invert  "
                />
              </motion.button>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}

                onClick={() => {
                  const newTabSet = Math.min(currentTabSet + 1, Math.ceil(tabs.length / tabsPerPage) - 1);
                  setCurrentTabSet(newTabSet);
                  setActiveTab(newTabSet * tabsPerPage); // First item in the new set
                }}
                disabled={(currentTabSet + 1) * tabsPerPage >= tabs.length}
                className={`bg-white text-black border px-3 py-1 rounded-full w-[48px] h-[48px] hover:border-white hover:bg-secondary group transition flex items-center justify-center ${
                  (currentTabSet + 1) * tabsPerPage >= tabs.length
                    ? "opacity-50 cursor-not-allowed hover:bg-[#dddddd]"
                    : ""
                }`}
              >
                <Image
                  src={assets.greenarrow}
                  alt=""
                  width={11}
                  height={18}
                  className="group-hover:brightness-0 group-hover:invert rotate-180"
                />
              </motion.button>
            </div>
          )}
        </div>
        <div>
          {!isMobile && (
            <motion.div
              className="flex border-t border-b border-[#00000025] justify-between flex-wrap tabmns mb-4"
              variants={slideInbottom}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {paginatedTabs.map((tab, index) => {
                const actualIndex = currentTabSet * tabsPerPage + index;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => setActiveTab(actualIndex)}
                    className={`py-[13px] text-sm font-[400] relative top-[-1.9px] ${
                      activeTab === actualIndex
                        ? "font-[700] border-t-2 border-secondary"
                        : "text-black"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </motion.div>
          )}
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {!isMobile && (
              <motion.div
                key={activeTab} // triggers reanimation on tab switch
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="lg:flex items-center"
              >
                <div className="w-full lg:w-2/5 pr-0 lg:pr-[44px]">
                  <div className="mb-8 lg:mb-0">
                    <h2 className="text-lg text-black font-[600] leading-[1.2] mb-3 lg:mb-[24px]">
                      {activeContent.title}
                    </h2>
                    <div className="text-territory text-sm font-[400] leading-[1.8] mb-6 lg:mb-10">
                      {activeContent.paragraphs.map((p, i) => (
                        <p key={i} className="mb-4">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-3/5 pl-0 lg:pl-[44px]">
                  <motion.figure
                    className="image-wrapper"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                  >
                    <Image
                      src={activeContent.image}
                      alt={activeContent.title}
                      className="rounded-[15px] object-cover"
                    />
                  </motion.figure>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {isMobile &&
            data.data.map((content, index) => (
              <div
                key={index}
                className="mb-6 border border-[#00000020] rounded-[10px] overflow-hidden"
              >
                <button
                  className="w-full text-left p-4 bg-[#f9f9f9] font-[600] text-black"
                  onClick={() => toggleAccordion(index)}
                >
                  {tabs[index]}
                </button>

                <AnimatePresence initial={false}>
                  {openAccordions[index] && (
                    <motion.div
                      key={`accordion-${index}`}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="p-4"
                    >
                      <h2 className="text-base font-[600] mb-3">
                        {content.title}
                      </h2>
                      <div className="text-sm font-[400] leading-[1.8] text-territory mb-4">
                        {content.paragraphs.map((p, i) => (
                          <p key={i} className="mb-4">
                            {p}
                          </p>
                        ))}
                      </div>
                      <Image
                        src={content.image}
                        alt={content.title}
                        className="rounded-[15px] object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default NavTabsection;
