"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

import { Gallerydata } from '@/public/types/Common';
import Link from "next/link";
import { useParams } from "next/navigation";


    const HeadingText = ({ data }: { data: Gallerydata }) => {
  const containerRef = useRef(null);

console.log(data);
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
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 30 },
  //   show: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5,
  //       ease: "easeOut",
  //     },
  //   },
  // };
    const [selectedImage, setSelectedImage] = useState<string | StaticImageData | null>(null);
    const {slug} = useParams();

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
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px]  overflow-hidden relative  ">
        <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className={`columns-2 md:columns-3 ${Array.isArray(data.data) || data?.data?.categories?.length > 0 ? "lg:columns-4" : "lg:columns-3"} gap-4`}>
          {Array.isArray(data.data) ? (data?.data?.map((image, index) => (
            <motion.div
              key={index}
              className="mb-4 break-inside-avoid rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={'demo'}
                className="w-full h-auto object-cover rounded-lg transform transition duration-300 group-hover:scale-105 group-hover:brightness-90"
              width={500}
              height={500}
              />
            </motion.div>
          ))) : data?.data?.images?.length > 0 ? data?.data?.images?.map((image, index)=>(
<motion.div
              key={index}
              className="mb-4 rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={'demo'}
                className="w-full h-auto object-cover rounded-lg transform transition duration-300 group-hover:scale-105 group-hover:brightness-90"
              width={1500}
              height={1500}
              />
            </motion.div>
          )) : data?.data?.categories?.map((item, index) => (
            <div key={index}  className="mb-5">
      <div
        className="relative group"

      >
        <Link href={`/gallery-details/${slug}/${item.slug}`}>
          <figure className="overlayclr lg:h-[500px] md:h-[400px] h-[300px]">
            <Image
              src={item.thumbnail}
              alt=""
              className="rounded-[15px] h-full w-full object-cover"
              priority
              width={500}
              height={500}
            />
          </figure>
          <div className="absolute bottom-0 px-5 pb-5 lg:px-[30px] lg:pb-[30px] w-full">
            <p className="text-md text-white font-[600] pr-0 lg:pr-6">
              {item.title}
            </p>
            <div className="flex gap-2 items-center transform opacity-0 group-hover:opacity-100 transition-all duration-500 h-0 group-hover:h-[30px] md:group-hover:h-[48px]">
              <div className="w-full border-b-2 border-white transition-all duration-500 group-hover:border-secondary"></div>
              <div className="min-w-[30px] min-h-[30px] lg:min-w-[48px] lg:min-h-[48px] bg-secondary rounded-full flex items-center justify-center translate-x-[-20px] group-hover:translate-x-0 transition-all duration-500">
                <svg
                  stroke="#fff"
                  fill="#fff"
                  strokeWidth="0"
                  viewBox="0 0 320 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 w-full h-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-full w-full flex justify-center items-center">
              <div className="relative w-3/4 h-auto">
              <button
                className="absolute top-2 right-2 text-white text-2xl z-10 flex justify-center items-center bg-primary rounded-full w-[25px] h-[25px]"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </button>
              <Image
                src={selectedImage}
                alt="popup"
                className="w-full h-auto rounded-lg"
                width={800}
                height={700}
              />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </section>
  );
};

export default HeadingText;
