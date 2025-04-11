"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroSectionProps {
  imageSrc: string;
  title: string;
  breadcrumbs: { label: string; href: string }[];
}

const HeroInner: React.FC<HeroSectionProps> = ({
  imageSrc,
  title,
  breadcrumbs,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full md:h-[500px] h-[400px] overflow-hidden  ovrbanner">
      <div className="relative w-full h-full overlaybanner">
        <div className="overlay absolute bottom-0 w-full h-1/3   z-[1]"></div>

        <figure className=" relative w-full  h-full overflow-hidden  ">
          <Image
            className="w-full h-full"
            src={imageSrc}
            fill
            objectFit="cover"
            alt={title}
          />
        </figure>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="absolute inset-0 flex flex-col justify-end items-start text-left z-[2] container ">

          <motion.h1
            variants={textVariants}
            className="text-white text-xxl leading-none  font-600 mb-5 lg:mb-9">
            <span
             >
              {title && title}
            </span>
          </motion.h1>
          <ul className="flex items-center flex-wrap gap-2 mb-5 lg:mb-[70px]">
            {breadcrumbs.map((breadcrumb, index) => (
              <li
                key={index}
                className=" text-white  text-xs font-medium uppercase flex items-center gap-2"
                style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
                {/* <span
              className="font-[800] text-primary"
              style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
              {" "}
              {title}
               </span> */}
                {breadcrumb.href ? (
                  <a
                    href={breadcrumb.href}
                    className={` font-[400] uppercase`}
                    style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
                    {breadcrumb.label}
                  </a>
                ) : (
                  <span
                    style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
                    className={`font-[600]   ${
                      index === breadcrumbs.length - 1 ? " " : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: breadcrumb.label }}
                  />
                )}
                {index < breadcrumbs.length - 1 &&   <svg stroke="#5BA646" fill="#5BA646" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg> }
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroInner;
