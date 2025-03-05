'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Import motion

const ContactUs = () => {
  return (
    <div>
      <section className="section-spacing relative overflow-hidden">
        <figure className="absolute top-0 left-0 h-full w-full -z-[1]">
          <Image 
            src="/assets/img/home/CONTACT.jpg" 
            className="absolute object-cover object-center h-full" 
            alt="" 
            width={1920} 
            height={800}
          />
        </figure>
        <div className="container">
          {/* Section Header with Animation */}
          <motion.div
            className="flex items-center space-x-[24px] text-primary text-sm font-medium mb-5 lg:mb-[60px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }} // Animation resets on scroll
          >
            <span className="w-[24px] h-[2px] bg-primary"></span>
            <span className="w-[130px] leading-none uppercase text-[16px]">CONTACT</span>
            <hr className="w-[100%]" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-[10px] items-start mt-6">
            <div>
              {/* Title with Animation */}
              <motion.h2
                className="text-lg font-bold uppercase mb-3 lg:mb-[30px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }} // Animation resets on scroll
              >
                CONTACT US
              </motion.h2>
              <motion.p
                className='text-black/75 lg:w-[75%]'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false }} // Animation resets on scroll
              >
                Reach out to us to discuss your project needs and discover how Best can deliver the perfect solution.
              </motion.p>
            </div>
            <div>
              <div className="backdrop-blur-[10px] bg-black/50 text-white rounded-custom overflow-hidden text-left p-[25px] lg:p-[40px]">
              <motion.h2
                className="text-lg font-bold uppercase mb-3 lg:mb-[20px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }} // Animation resets on scroll
              >
              Get in Touch
              </motion.h2>
                <form className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.input
                      className='bg-transparent border-b-[1px] border-white/20 h-[50px] text-white placeholder:text-white/80 focus:outline-none'
                      type="text" 
                      placeholder="Name" 
                      required 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: false }} // Animation resets on scroll
                    />
                    <motion.input
                      className='bg-transparent border-b-[1px] border-white/20 h-[50px] text-white placeholder:text-white/80 focus:outline-none'
                      type="email" 
                      placeholder="Email" 
                      required 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: false }} // Animation resets on scroll
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <motion.input
                      className='bg-transparent border-b-[1px] border-white/20 h-[50px] text-white placeholder:text-white/80 focus:outline-none'
                      type="tel" 
                      placeholder="Phone" 
                      required 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: false }} // Animation resets on scroll
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <motion.textarea
                      placeholder="Message" 
                      rows={4} 
                      required 
                      className='bg-transparent border-b-[1px] border-white/20 h-[150px] text-white placeholder:text-white/80 focus:outline-none'
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }} // Animation resets on scroll
                    />
                  </div>
                  <Link href="#" className="self-start text-white bg-primary rounded-lg text-sm font-medium transition uppercase spckbtn whts">
                    <div>
                      <Image src={"/assets/img/icons/arrow.svg"} alt="" width={30} height={30} />
                    </div> 
                    Send Message
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
