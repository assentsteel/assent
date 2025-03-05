"use client";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const mediaData = [
  {
    id: 1,
    title:
      "ASSENT STEEL is proud to be the Largest Steel Fabrication Facility in the GCC.",
    date: "17-12-2024",
    category: "News",
    image: "/assets/img/home/nws.jpg",
    featured: true,
  },
  {
    id: 2,
    title:
      "ASSENT STEEL continues its commitment to excellence in steel fabrication.",
    date: "15-12-2024",
    category: "News",
    featured: false,
  },
  {
    id: 3,
    title: "New advancements in steel technology at ASSENT STEEL.",
    date: "10-12-2024",
    category: "News",
    featured: false,
  },
];

const MediaSection = () => {
  const featuredMedia = mediaData.find((item) => item.featured);
  const otherMedia = mediaData.filter((item) => !item.featured);

  return (
    <section>
      <div className="container section-spacing">
        <motion.div
          className="flex overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-semibold leading-none text-primary mb-5 lg:mb-[60px] ">
            Media
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-[80px] overflow-hidden">
          {/* Featured Media on the left */}
          {featuredMedia && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
              className=" bg-primary text-white rounded-custom  overflow-hidden"
            >
              <div className="relative w-full h-[200px] lg:h-[300px] xxxl:h-[400px] ">
              {featuredMedia?.image && (
  <Image
    src={featuredMedia.image}
    alt={featuredMedia.title}
    layout="fill"
    objectFit="cover"
  />
)}
              </div>
              <div className="px-[30px] py-[30px] lg:px-[60px] lg:py-[40px]">
                <div className="flex justify-between mb-5 lg:mb-[35px]">
                  <span className="text-secondary text-xs uppercase">
                    {featuredMedia.category}
                  </span>
                  <span className="text-white text-xs uppercase">
                    {featuredMedia.date}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mt-0  mb-[30px] leading-normal">
                  {featuredMedia.title}
                </h3>
                <Link
                  href="#"
                  className="text-xs border-b border-[#5BA646] text-white uppercase group pb-[16px] inline-flex items-center gap-[18px]"
                >
                  Read More{" "}
                  <div className="w-[20px] h-[20px] text-secondary bg-white group-hover:bg-secondary group-hover:text-primary flex items-center text-[14px] justify-center transition duration-300 ease-in-out">
                    <FaChevronRight />
                  </div>
                </Link>
              </div>
            </motion.div>
          )}

          {/* News List on the right */}
          <div className="flex flex-col overflow-hidden">
            <motion.div initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay:  0.3 }}
                viewport={{ once: true, amount: 0.5 }}>
            {otherMedia.map((item, index) => (
              <div
                
                key={item.id}
                className={`border-b  ${
                  index === otherMedia.length - 1
                    ? "border-b-0 pb-[60px] mb-[0px]"
                    : "pb-[30px] mb-[25px] lg:pb-[60px] lg:mb-[50px]"
                }`}
              >
                <div className="flex justify-between mb-5 lg:mb-[35px]">
                  <span className="text-secondary text-xs uppercase">
                    {item.category}
                  </span>
                  <span className="text-territory text-xs uppercase">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-5  lg:mb-[35px] leading-tight">
                  {item.title}
                </h3>
                <Link
                  href="#"
                  className="text-xs border-b border-[#5BA646] uppercase group pb-[16px] inline-flex items-center gap-[18px] text-territory font-medium"
                >
                  About ASSENT{" "}
                  <div className="w-[20px] h-[20px] text-secondary bg-territory group-hover:bg-secondary group-hover:text-primary flex items-center text-[14px] justify-center transition duration-300 ease-in-out">
                    <FaChevronRight />
                  </div>
                </Link>
              </div>
            ))}
            <button className="mt-auto border border-secondary py-2 px-6 rounded-[5px] hover:bg-green-500 hover:text-white transition text-xs h-[40px] lg:h-[65px] text-territory w-[60%]">
              VIEW ALL
            </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
