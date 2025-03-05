"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import ButtonWithIcon from "../common/Buttons/ButtonWithIcon";

type ImageContentProps = {
  images: string[];
  title: string;
  description: string;
  date: Date;
  _id:string;
};

const ImageContentCard: React.FC<ImageContentProps> = ({
  images,
  title,
  description,
  date,
  _id
}) => {
  return (
    <div className="flex items-center gap-5 lg:gap-[32px]">
      {/* Image Section */}
      <motion.div
        className={`relative w-1/2  h-[215px] overflow-hidden rounded-custom shadow-lg group`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}>
        <div className="relative w-full h-full">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 rounded-custom"></div>
          <div className="absolute top-5 right-5 text-white uppercase p-[12px] backdrop-blur-[10px] bg-white/10 rounded-[8px]">
            <p className="text-[14px]">{date.toString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="w-full">
        <p className="text-[14px] text-black/80 uppercase">{description}</p>
        <h4 className="lg:text-[22px] text-[20px] font-semibold text-black lg:w-[90%] leading-[28.6px] py-[20px]">
          {title}
        </h4>
        <ButtonWithIcon link={`/news-details/${_id}`} buttonText="Read More" />
      </div>
    </div>
  );
};

export default ImageContentCard;
