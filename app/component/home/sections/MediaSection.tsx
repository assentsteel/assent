"use client";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { motion } from "framer-motion";

 

import { News } from '@/public/types/Common';
const MediaSection = ({data}: {data: News}) => { 
  const latestNews = data.news.sort((a, b) => new Date(b.date ? b.date : b.createdAt).getTime() - new Date(a.date ? a.date : a.createdAt).getTime())[0];
  const lastTwoItems =  data.news.sort((a, b) => new Date(b.date ? b.date : b.createdAt).getTime() - new Date(a.date ? a.date : a.createdAt).getTime()).slice(1, 3);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");     
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
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
          {/* {featuredMedia && ( */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
              className=" bg-primary text-white rounded-custom  overflow-hidden"
            >
              <div className="relative w-full h-[200px] lg:h-[300px] xxxl:h-[400px] ">
              
              <figure className="relative w-full h-full">
                <Image
                  src={latestNews.thumbnail}
                  alt={latestNews.thumbnailAlt}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                />
              </figure>
              </div>
              <div className="px-[30px] py-[30px] lg:px-[60px] lg:py-[40px]">
                <div className="flex justify-between mb-5 lg:mb-[35px]">
                  <span className="text-secondary text-xs uppercase">
                    News
                  </span>
                  <span className="text-white text-xs uppercase"> 
           {formatDate(latestNews.date ? latestNews.date : latestNews.createdAt)} 
                  </span>
                </div>
                <h3 className="text-lg font-semibold mt-0  mb-[30px] leading-normal">
                  {latestNews.mainTitle}
                </h3>
                <Link
                  href={`/news-details/${latestNews.slug}`}
                  className="text-xs border-b border-secondary text-white uppercase group pb-[16px] inline-flex items-center gap-[18px]"
                >
                  Read More{" "}
                  <div className="w-[20px] h-[20px] rounded-full text-secondary bg-white group-hover:bg-secondary group-hover:text-primary flex items-center text-[14px] justify-center transition duration-300 ease-in-out">
                    <FaChevronRight />
                  </div>
                </Link>
              </div>
            </motion.div>
          {/* )} */}

          {/* News List on the right */}
          <div className="flex flex-col overflow-hidden">
            <motion.div className="flex flex-col h-full" initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay:  0.3 }}
                viewport={{ once: true, amount: 0.5 }}>
            {lastTwoItems.map((item, index) => (
              <div

                key={index}
                className={`border-b  ${
                  index === lastTwoItems.length - 1
                    ? "border-b-0 pb-[60px] mb-[0px]"
                    : "pb-[30px] mb-[25px] lg:pb-[60px] lg:mb-[50px]"
                }`}
              >
                <div className="flex justify-between mb-5 lg:mb-[35px]">
                  <span className="text-secondary text-xs uppercase">
                    News
                  </span>
                  <span className="text-territory text-xs uppercase">
                    {formatDate(item.date ? item.date : item.createdAt)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-5  lg:mb-[35px] leading-tight">
                  {item.mainTitle}
                </h3>
                <Link
                  href={`/news-details/${item.slug}`}
                  className="text-xs border-b border-secondary uppercase group pb-[16px] inline-flex items-center gap-[18px] text-territory font-medium"
                >
                  Read More{" "}
                  <div className="w-[20px] h-[20px] rounded-full text-secondary bg-territory group-hover:bg-secondary group-hover:text-primary flex items-center text-[14px] justify-center transition duration-300 ease-in-out">
                    <FaChevronRight />
                  </div>
                </Link>
              </div>
            ))}
              <Link href='/news'>
               <button className="mt-auto border border-secondary py-2 px-6 rounded-full hover:bg-secondary hover:text-white transition text-xs h-[40px] lg:h-[65px] text-territory w-[60%]">
              VIEW ALL
            </button></Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
