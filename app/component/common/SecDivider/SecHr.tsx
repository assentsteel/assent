"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";

interface SecHrProps {
  title: string;
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const SecHr: FC<SecHrProps> = ({ title }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="flex items-center   text-primary text-sm font-medium ">
      <span className="w-[24px] h-[2px] bg-primary"></span>
      <span className="w-fit whitespace-nowrap leading-none uppercase text-[16px] mx-6">
        {title}
      </span>
      <div className="w-full border-t-[1.5px]  border-black/5 "  ></div>
    </motion.div>
  );
};

export default SecHr;
