"use client"
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";



const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-primary text-white pt-[60px] lg:pt-[110px]"
    >
      <div className="container">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[40px] xxl:gap-[50px] xxxl:gap-[100px] mb-[30px] md:mb-[70px]">
          {/* Contact Info */}
          <div  className="md:col-span-4 md:order-last overflow-hidden">
            <motion.div variants={fadeInLeft}>
            <Image src="/assets/img/logo-wh.svg" className="mb-5 lg:mb-[50px]" alt="Assent Steel" width={150} height={50} />
            <h3 className="text-sm font-semibold mt-4">Head Office</h3>
            <p>
              Dubai Industrial City, UAE.
              <br /> P.O.Box: 38438
            </p>
            <div className="flex flex-col lg:flex-row gap-2 md:gap-7 mt-[30px]">
              <p className="flex gap-2">
                <span className="text-secondary">T:</span> +971 4 247 1200
              </p>
              <p className="flex gap-2">
                <span className="text-secondary">E:</span> info@assentsteel.com
              </p>
            </div>
            </motion.div>
          </div>
          {/* Quick Links */}
          <motion.div variants={fadeIn} className="md:col-span-8 overflow-hidden">
            <motion.h3 variants={fadeInLeft}  className="text-lg font-semibold mb-5 lg:mb-[50px]">Quick Links</motion.h3>
           <ul className="space-y-2 grid lg:grid-cols-2 lg:w-[75%]">
  {[
    { label: "Leadership Team", href: "/team" },
    { label: "Global Presence", href: "/global-presence" },
    { label: "Awards & Accreditations", href: "/accreditations" },
    { label: "Careers", href: "/careers" },
    { label: "News", href: "/news" },
    { label: "Request for Quotation", href: "/rfq" },
    { label: "Vendor Registration", href: "/vendor" },
  ].map((link, index) => (
    <motion.li key={index} variants={fadeInLeft}>
      <Link href={link.href} className="hover:text-secondary transition-all ease-in-out duration-500">
        {link.label}
      </Link>
    </motion.li>
  ))}
</ul>

          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[10px] xxl:gap-[50px] xxxl:gap-[100px] items-start">
          {/* Buttons and Certifications */}
          <motion.div variants={fadeIn} className="md:col-span-8">
            <div className="flex md:flex-row flex-col gap-5 md:gap-[70px] justify-between border-t border-white/35 pt-[30px] md:pt-[70px]">
              <div className="flex md:flex-row flex-col gap-4 overflow-hidden">
                {["DOWNLOAD BROCHURE", "PRE-QUALIFICATION"].map((btn, index) => (
                  <motion.button key={index} variants={scaleUp} className="border border-secondary py-2 px-4 rounded-full hover:bg-secondary hover:text-primary h-[40px] md:h-[58px] transition-all ease-in-out duration-500">
                    {btn}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeIn} className="md:col-span-4 hidden md:block">
            <div className="flex gap-6 border-t border-white/35 pt-[70px]">
              {[FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube].map((Icon, index) => (
                <motion.div key={index} variants={scaleUp}>
                  <Link href="#" className="text-md hover:text-secondary hover:scale-125 transition-all ease-in-out duration-500 h-[45px] xxxl:h-[58px] items-center flex">
                    <Icon />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div variants={fadeIn} className="text-center text-sm mt-[40px] md:mt-[70px] bg-[#0F2C56] py-[20px]">
        <div className="container text-left">
          <p className="text-xs text-white/50">&copy; 2025 ASSENT STEEL. All rights reserved.</p>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;