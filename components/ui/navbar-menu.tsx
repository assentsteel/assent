"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import arrow from "@/public/assets/img/home/arrow.svg";
import { FaChevronRight } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  url,
  children,
  noMenu,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  url: string;
  children?: React.ReactNode;
  noMenu?: boolean;
}) => {
  return (
    <div
      onMouseEnter={() => (noMenu ? setActive(null) : setActive(item))}
      className="relative">
      <div className="flex gap-2 mb-0">
        <Link href={url}>
          <motion.p
            transition={{ duration: 0.3 }}
            className="cursor-pointer text-[#1F1F1F] font-medium hover:text-secondary dark:text-white text-xs uppercase transition-all duration-500 ease-in-out">
            <span className="flex gap-3 ">{item}</span>
          </motion.p>
        </Link>
        {!noMenu && <Image src={arrow} alt="arrow" className="arrowst" />}
      </div>
      {active !== null && !noMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}>
          {active === item && (
            <div className="">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white absolute dark:bg-black backdrop-blur-sm mt-6 overflow-hidden rounded-[8px] dark:border-white/[0.2] shadow-xl">
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full px-3  ">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative  dark:bg-black dark:border-white/[0.2] shadow-input flex justify-center items-center  h-full">
      <div className="left-spacing pr-[20px] xxl:pr-[20px] xxxl:pr-[50px] w-full flex items-center justify-between  py-[25px] border-r border-black/10">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/assets/img/logo.svg"
              alt="Crest Logo"
              width={80}
              height={50}
              className="h-[34px] w-auto"
            />
          </Link>
        </div>
        <div className="flex space-x-[25px] xxl:space-x-[20px] xxxl:space-x-[50px] items-center">
          <div className="flex space-x-[15px] xxl:space-x-[20px] xxxl:space-x-[30px] items-center group">
          {children}
          </div>
          <Link
            href="contact"
            className="self-start text-white bg-secondary hover:bg-primary group rounded-full text-xs font-normal transition duration-300 ease-in-out uppercase flex items-center justify-center gap-[15px] py-[11px] px-[19px] h-48px">
  
            Contact <div className="w-[18.5px] h-[20px] text-secondary bg-primary group-hover:bg-secondary group-hover:text-primary flex items-center text-[14px] justify-center transition duration-300 ease-in-out"><FaChevronRight /></div>
          </Link>
        </div>
      </div>
      <div className="px-[20px] xxl:px-[20px] xxxl:px-[50px]">
        <div className="cins w-[48px] h-[48px] flex items-center justify-center border border-[#1F1F1F] rounded-full text-center">
      <IoSearchOutline className="text-sm text-secondary" />
      </div>
      </div>
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: LinkProps & { children: ReactNode }) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black">
      {children}
    </Link>
  );
};
