"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion

const Form = () => {
  return (
    <div className=" relative overflow-hidden">
      <div className="container p-0">
        {/* Section Header with Animation */}

        <div>
          <div className=" bg-black/5 text-black rounded-custom overflow-hidden text-left p-[25px] lg:p-[40px]">
            <motion.h2
              className="md:text-lg text-[18px] font-bold uppercase mb-3 lg:mb-[20px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }} // Animation resets on scroll
            >
              Get in Touch
            </motion.h2>
            <motion.p
              className="lg:text-[18px] text-[16px] text-black/75 mb-3 lg:mb-[40px] lg:w-[72%] leading-[25.2px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }} // Animation resets on scroll
            >
              Reach out to us to discuss your project needs and discover how
              Safe Tech can deliver the perfect solution
            </motion.p>
            <form className="flex flex-col gap-[32px]">
              <div className="grid grid-cols-1 gap-4">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  type="text"
                  placeholder="Name"
                  required
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  type="email"
                  placeholder="Email"
                  required
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
              </div>

              <div className="grid grid-cols-1 gap-4 ">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  placeholder="Subject"
                  required
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
              </div>
              <div className="grid grid-cols-1 gap-4 ">
                <motion.textarea
                  placeholder="Message"
                  rows={4}
                  required
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[150px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
              </div>
              <Link
                href="#"
                className="self-start text-white bg-primary rounded-lg text-sm font-medium transition uppercase spckbtn orng">
                <div>
                  <Image
                    src={"/assets/img/icons/arrow.svg"}
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>
                Send Message
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
