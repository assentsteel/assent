"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import ButtonWithIcon from "../common/Buttons/ButtonWithIcon";

type ImageCardProps = {
  image: string;
  title: string;
  subTitle: string[];
  date: string;
  _id:string;
};

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  title,
  subTitle,
  date,
  _id
}) => {
  return (
    <motion.div
      className="relative h-[400px] lg:h-[470px] overflow-hidden rounded-custom shadow-lg group "
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}>
      {/* Image with gradient overlay */}
      <div className="relative w-full h-full">
        <Image src={image} alt={title} fill className="object-cover" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 rounded-custom"></div> */}
        <div className="absolute top-5 right-5 text-white uppercase  p-[12px] backdrop-blur-[10px] bg-white/10 rounded-[8px]">
          <p className="text-[14px] ">{date}</p>
        </div>
      </div>

      <motion.div
        className="absolute flex flex-col inset-x-[10px] xxl:inset-x-[20px] bottom-[10px] xxl:bottom-[20px] p-[10px] xxl:p-[20px] backdrop-blur-[10px] bg-white/10 text-white rounded-custom"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}>
        {/* Title and Icons Row */}
        <div className="w-full">
          <div className="flex">
          {subTitle && subTitle.map((item,index)=>(
            <p key={index} className="text-[14px] text-white/80 uppercase lg:mb-[20px] mb-2">
            {item}{index !== subTitle.length - 1 ? ',' : ''}
          </p>
          ))}
          </div>
          
          
          <h4 className="lg:text-[22px] text-[20px]  font-[600] text-white  lg:w-[90%] leading-[28.6px] mt-0 lg:mb-[32px] mb-[10px]">
            {title}
          </h4>
          <ButtonWithIcon link={`/news-details/${_id}`} buttonText="Read More" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImageCard;
