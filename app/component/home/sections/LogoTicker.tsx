"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  "/assets/img/clients/lgs-01.jpg",
  "/assets/img/clients/lgs-02.jpg",
  "/assets/img/clients/lgs-03.jpg",
  "/assets/img/clients/lgs-04.jpg",
  "/assets/img/clients/lgs-05.jpg",
  "/assets/img/clients/lgs-06.jpg",
  "/assets/img/clients/lgs-01.jpg",
  "/assets/img/clients/lgs-02.jpg",
  "/assets/img/clients/lgs-03.jpg",
  "/assets/img/clients/lgs-04.jpg",
  "/assets/img/clients/lgs-05.jpg",
  "/assets/img/clients/lgs-06.jpg",
  "/assets/img/clients/lgs-01.jpg",
  "/assets/img/clients/lgs-02.jpg",
  "/assets/img/clients/lgs-03.jpg",
  "/assets/img/clients/lgs-04.jpg",
  "/assets/img/clients/lgs-05.jpg",
  "/assets/img/clients/lgs-06.jpg",
  "/assets/img/clients/lgs-01.jpg",
  "/assets/img/clients/lgs-02.jpg",
  "/assets/img/clients/lgs-03.jpg",
  "/assets/img/clients/lgs-04.jpg",
  "/assets/img/clients/lgs-05.jpg",
  "/assets/img/clients/lgs-06.jpg",
 
];

const LogoTicker = () => {
  return (
    <section className="py-[60px] overflow-hidden">
      <div className="container">
        <h2 className="text-xl font-semibold mb-5 lg:mb-[50px] leading-none text-primary ">Our Clients</h2>
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-[50px] lg:gap-[150px] flex-none min-w-max"
            animate={{ x: "-50%" }}
            transition={{
              duration: 230,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
              >
                <Image
                  src={logo}
                  alt="client logo"
                  width={200}
                  height={100}
                  className="logo-ticker-image h-[70px] lg:h-[100px]"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
