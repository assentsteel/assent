"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import SecHr from "../common/SecDivider/SecHr";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Historysec = () => {
  const historyData = [
    {
      year: "1975",
      content: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      ],
      image: "/assets/img/story/history.jpg",
    },
    {
      year: "1980",
      content: [
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ],
      image: "/assets/img/story/history.jpg",
    },
    {
      year: "1999",
      content: [
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      ],
      image: "/assets/img/story/history.jpg",
    },
    {
      year: "2010",
      content: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      ],
      image: "/assets/img/story/history.jpg",
    },
    {
      year: "2014",
      content: [
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        "Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      ],
      image: "/assets/img/story/history.jpg",
    },
    {
      year: "2017",
      content: [
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
        "Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      ],
      image: "/assets/img/story/history.jpg",
    },
    {
      year: "2020",
      content: [
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      ],
      image: "/assets/img/story/history.jpg",
    },
    {
      year: "2024",
      content: [
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
        "Deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      ],
      image: "/assets/img/story/history.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(3); // 2010 is default active (index 3)
  const [visibleRange, setVisibleRange] = useState({
    start: 0,
    end: historyData.length - 1,
  });
  const timelineRef = useRef<HTMLDivElement>(null);

  // Handle responsive visible range
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Small screens - show 2 items: active + 1 next to it (if possible)
        const start = Math.max(0, activeIndex - 1);
        const end = Math.min(historyData.length - 1, activeIndex);
        setVisibleRange({ start, end });
      } else if (window.innerWidth < 1024) {
        // Medium screens - show 5 items
        const start = Math.max(0, activeIndex - 2);
        const end = Math.min(historyData.length - 1, activeIndex + 1);
        setVisibleRange({ start, end });
      } else {
        // Large screens - show all
        setVisibleRange({ start: 0, end: historyData.length - 1 });
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex, historyData.length]);

  // Mobile-only scroll to ensure active item is visible
  useEffect(() => {
    if (timelineRef.current && activeIndex >= 0) {
      const timelineItems =
        timelineRef.current.querySelectorAll(".timeline-item");

      if (timelineItems[activeIndex]) {
        const container = timelineRef.current;
        const item = timelineItems[activeIndex];

        // Get the center of the container
        const containerCenter = container.offsetWidth / 2;
        // Get the center of the item relative to the container
        const itemCenter =
          (item as HTMLElement).offsetLeft +
          (item as HTMLElement).offsetWidth / 2;
        // Scroll to center the active item
        const scrollPosition = itemCenter - containerCenter;

        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  const handleYearClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleScrollLeft = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (activeIndex < historyData.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <section className="section-spacing bg-black/20">
        <div className="container">
          <div className="">
            <div className="mb-4 md:mb-[60px]">
              <SecHr title="Our History" />
            </div>
            <div className="lg:grid lg:grid-cols-12 md:gap-[50px] gap-[20px] lg:gap-[80px] flex flex-col items-center">
              <motion.div
                className="relative w-full h-[300px] col-span-4"
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                <Image
                  src={historyData[activeIndex].image}
                  alt={`history-${historyData[activeIndex].year}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
              <div className="col-span-8">
                <motion.div
                  className="flex flex-col gap-[12px] lg:gap-[32px] leading-none"
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}>
                  <h2 className="text-xxl font-black">
                    {historyData[activeIndex].year}
                  </h2>
                  {historyData[activeIndex].content.map((paragraph, i) => (
                    <p
                      key={i}
                      className="font-sm leading-[25.3px] text-secondary/75">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Timeline Navigation */}
            <div className="w-full pt-2 md:pt-[30px] lg:pt-[120px] relative">
              {/* Mobile Navigation Arrows */}

              <div className="flex justify-between md:hidden">
                <button
                  onClick={handleScrollLeft}
                  className={`p-2 rounded-full bg-black/30 text-white absolute top-1/2 left-2 transform -translate-y-1/2 z-10  ${
                    activeIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={activeIndex === 0}>
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={handleScrollRight}
                  className={`p-2 rounded-full bg-black/30 text-white absolute top-1/2 right-2 transform -translate-y-1/2 z-10  ${
                    activeIndex === historyData.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={activeIndex === historyData.length - 1}>
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Timeline Container - Scrollable on mobile only */}
              <div
                ref={timelineRef}
                className="relative w-full overflow-x-auto md:overflow-x-visible overflow-y-hidden pt-4 md:py-[10px] px-4 flex flex-row no-scrollbar"
                style={{
                  scrollBehavior: "smooth",
                }}>
                <div className="flex flex-row items-center min-w-max mx-auto md:mx-0 md:w-full justify-between">
                  {historyData.map((item, index) => (
                    <div
                      key={index}
                      className={`timeline-item relative flex flex-col items-center gap-3 md:gap-5 cursor-pointer mx-4 md:mx-0 transition-all duration-300 ${
                        index < visibleRange.start || index > visibleRange.end
                          ? "hidden md:flex"
                          : "flex"
                      }`}
                      onClick={() => handleYearClick(index)}>
                      <span
                        className={`${
                          activeIndex === index
                            ? "bg-primary scale-110"
                            : "bg-black/30"
                        } text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap`}>
                        {item.year}
                      </span>
                      <div
                        className={`w-6 h-6 ${
                          activeIndex === index
                            ? "bg-primary rounded-full"
                            : "bg-[#cccccc]"
                        } flex justify-center items-center transition-all duration-300`}>
                        <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Base Line */}
              <div className="border-t-2 w-full absolute border-black/30 bottom-3 z-[-1] h-2 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Historysec;
