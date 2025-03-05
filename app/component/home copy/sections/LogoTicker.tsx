'use client'
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const logos = [
  "/assets/img/clients/cl-01.png",
  "/assets/img/clients/cl-02.png",
  "/assets/img/clients/cl-03.png",
  "/assets/img/clients/cl-04.png",
  "/assets/img/clients/cl-05.png",
  "/assets/img/clients/cl-06.png",
  "/assets/img/clients/cl-07.png",
  "/assets/img/clients/cl-08.png"
];

const LogoTicker = () => {
  return (
    <section className="section-spacing overflow-hidden">
      <div className="container-fluid">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-5 lg:gap-14 flex-none min-w-max"
            animate={{
              x: "-50%",
            }}
            transition={{
              duration: 25, // Adjust duration for smoothness
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <Image key={index} src={logo} alt="client logo" width={150} height={80} className="logo-ticker-image" />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
