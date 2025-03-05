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
    <section className="relative w-full md:h-[600px] h-[400px] overflow-hidden  ovrbanner">
      <div className="relative w-full h-full">
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
          className="absolute inset-0 flex flex-col justify-between items-start text-left z-[2] container ">
          <ul className="flex items-center flex-wrap lg:pt-[160px] pt-[100px]">
            {breadcrumbs.map((breadcrumb, index) => (
              <li
                key={index}
                className="text-white/50  text-[16px] font-medium uppercase"
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
                    className={`text-white/50  font-medium uppercase`}
                    style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
                    {breadcrumb.label}
                  </a>
                ) : (
                  <span
                    style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
                    className={`font-[800] text-primary ${
                      index === breadcrumbs.length - 1 ? " " : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: breadcrumb.label }}
                  />
                )}
                {index < breadcrumbs.length - 1 && <span> / &nbsp;</span>}
              </li>
            ))}
          </ul>
          <motion.h1
            variants={textVariants}
            className="text-white text-xxl leading-none pb-6 lg:pb-[60px] font-black uppercase">
            <span
              className="sm:text-xxl text-[34px]"
              style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
              {title && title.split(" ")[0]}
            </span>{" "}
            <span
              className="font-light sm:text-xxl text-[34px]"
              style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
              {title && title.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroInner;
