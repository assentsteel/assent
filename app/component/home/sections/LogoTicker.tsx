"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home } from "@/public/types/Common";

 

const LogoTicker = ({ data }: { data: Home }) => {
  return (
    <section className="py-[60px] overflow-hidden">
      <div className="container">
        {/* <h2 className="text-xl font-semibold mb-5 lg:mb-[50px] leading-none text-primary ">Our Clients</h2> */}
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
            {[...data.clientsSection.items, ...data.clientsSection.items].map((logo, index) => (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
              >
                <Image
                  src={logo.logo}
                  alt={logo.logoAlt}
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
