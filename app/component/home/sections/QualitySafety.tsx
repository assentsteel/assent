"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const QualitySafety = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background Image with Infinite Movement */}
      <motion.figure
        className="absolute top-0 left-0 h-full w-full -z-[1]"
        initial={{ scale: 1.1 }}
        animate={{ scale: [1.1, 1.05, 1.1] }} // Scale Animation Loop
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} // Smooth Infinite Loop
      >
        <Image
          src="/assets/img/home/qsbg.jpg"
          className="absolute w-full h-full object-cover object-center"
          alt=""
          width={2500}
          height={1000}
        />
      </motion.figure>

      <div className="container">
        {/* Section Header Animation */}
        <motion.div
          className="flex items-center space-x-[24px] text-primary text-sm font-medium mb-5 lg:mb-[60px]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }} // Animation resets on scroll
        >
          <span className="w-[24px] h-[2px] bg-primary"></span>
          <span className="w-[420px] leading-none uppercase text-[16px]">
            Quality & Safety
          </span>
          <hr className="opacity-10 w-[100%]" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-[20px] items-start mt-6">
          {/* Title Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }} // Animation resets on scroll
          >
            <h2 className="text-lg font-bold text-white uppercase leading-none">
              Commitment to Quality & Safety
            </h2>
          </motion.div>

          {/* Content Box Animation */}
          <motion.div
            className="backdrop-blur-[10px] bg-white/10 text-white rounded-custom overflow-hidden text-left p-8 lg:p-[40px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }} // Animation resets on scroll
          >
            {/* Icon Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }} // Animation resets on scroll
            >
              <Image
                src="/assets/img/icons/quality.png"
                className="mb-6 mb-[32px]"
                alt=""
                width={50}
                height={50}
              />
            </motion.div>

            {/* Paragraph Animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }} // Animation resets on scroll
              className="text-white"
            >
              At Building Co. (BEST) L.L.C, we prioritize quality and safety at
              every stage of construction. Our projects comply with
              international standards, ensuring durability, reliability, and a
              safe work environment. With ISO 9001 (Quality Management), ISO
              14001 (Environmental Management), and ISO 45001 (Occupational
              Health & Safety Management) certifications, we guarantee
              excellence in every project we deliver.
            </motion.p>

            <hr className="mt-6 lg:mt-[32px] opacity-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QualitySafety;
