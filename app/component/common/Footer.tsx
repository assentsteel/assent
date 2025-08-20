"use client"
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import ScrollToTop from "./ScrollToTop";



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
      className="bg-primary text-white pt-[60px] lg:pt-[110px]" >

      <ScrollToTop/>
      <div className="container">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[40px] xxl:gap-[50px] xxxl:gap-[100px] mb-[30px] md:mb-[70px]">
          {/* Contact Info */}
          <div className="md:col-span-4 lg:order-last overflow-hidden">
            <motion.div variants={fadeInLeft}>
              <Image src="/assets/img/logo-wh.svg" className="mb-5 lg:mb-[50px]" alt="Assent Steel" width={150} height={50} />
              <h3 className="text-sm font-semibold mt-4">Head Office</h3>
              <p>
                Dubai Industrial City, UAE.
                <br /> P.O.Box: 38438
              </p>
              <div className="flex flex-col  gap-2 2xl:gap-7 mt-[30px]">
                <p className="flex gap-2"> <span className="text-secondary">T:</span> +971 4 247 1200 </p>
                <p className="flex gap-2">
                  <span className="text-secondary">E:</span>
                  <span className="flex flex-col"> <span>info@assentsteel.com</span>
                  <span>contactus@assentsteel.com</span>
                 </span>
                  
                </p>
              </div>

              <motion.div variants={fadeIn} className="lg:col-span-8 xxl:col-span-4  justify-center mt-10 hidden xl:block xxl:hidden">
            <div className="flex gap-2 md:gap-6 border-t border-white/35 pt-5 xxl:pt-[70px] max-md:justify-center">
              {/* {[FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube].map((Icon, index) => (
                <motion.div key={index} variants={scaleUp}>
                  <Link href="#" className="text-md hover:text-secondary hover:scale-125 transition-all ease-in-out duration-500 h-[45px] xxxl:h-[58px] items-center flex">
                    <Icon />
                  </Link>
                </motion.div>
              ))} */}
              <motion.div variants={scaleUp}>
                  <Link target="_blank" href="https://www.linkedin.com/company/assentsteel/" className="text-md hover:text-secondary hover:scale-125 transition-all ease-in-out duration-500 h-[45px] xxxl:h-[58px] items-center flex">
                    <FaLinkedinIn />
                  </Link>
                </motion.div>
                <motion.div variants={scaleUp}>
                  <Link target="_blank" href="https://www.facebook.com/assentsteel/" className="text-md hover:text-secondary hover:scale-125 transition-all ease-in-out duration-500 h-[45px] xxxl:h-[58px] items-center flex">
                    <FaFacebookF />
                  </Link>
                </motion.div>
                <motion.div variants={scaleUp}>
                  <Link target="_blank" href="https://www.instagram.com/assentsteel/?hl=en" className="text-md hover:text-secondary hover:scale-125 transition-all ease-in-out duration-500 h-[45px] xxxl:h-[58px] items-center flex">
                    <FaInstagram />
                  </Link>
                </motion.div>
                <motion.div variants={scaleUp}>
                  <Link target="_blank" href="https://www.youtube.com/@assentsteel" className="text-md hover:text-secondary hover:scale-125 transition-all ease-in-out duration-500 h-[45px] xxxl:h-[58px] items-center flex">
                    <FaYoutube />
                  </Link>
                </motion.div>
            </div>
          </motion.div>


            </motion.div>
          </div>
          {/* Quick Links */}
          <motion.div variants={fadeIn} className="md:col-span-8 overflow-hidden">
            <motion.h3 variants={fadeInLeft} className="text-lg font-semibold mb-5 lg:mb-[50px]">Quick Links</motion.h3>
           <div className="space-y-2 grid md:grid-cols-3 lg:w-[75%] items-baseline">
           <ul className="space-y-2 grid lg:grid-cols-1 ">
              {[
                { label: "About", href: "/about" },
                { label: "Sustainability", href: "/sustainability" },
                { label: "Media", href: "/gallery" }, 
                { label: "Contact", href: "/contact-us" },
              ].map((link, index) => (
                <motion.li key={index} variants={fadeInLeft}>
                  <Link href={link.href} className="hover:text-secondary transition-all ease-in-out duration-500">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <ul className="space-y-2 grid lg:grid-cols-1 ">
              {[
                { label: "Engineering", href: "/engineering" },
                { label: "Fabrication", href: "/fabrication" },
                { label: "Blasting Painting", href: "/blasting" },
                { label: "Steel Erection", href: "/services" }, 
              ].map((link, index) => (
                <motion.li key={index} variants={fadeInLeft}>
                  <Link href={link.href} className="hover:text-secondary transition-all ease-in-out duration-500">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
           <ul className="space-y-2 grid lg:grid-cols-1 ">
              {[ 
                { label: "News", href: "/news" }, 
                { label: "Careers", href: "/careers" }, 
                // { label: "Vendor", href: "/" }, 
                { label: "RFQ", href: "/contact-us" },
              ].map((link, index) => (
                <motion.li key={index} variants={fadeInLeft}>
                  <Link href={link.label === "RFQ"
                  ? { pathname: "/contact-us", query: { type: "rfq" } }
                  : link.label === "if-wewant-to-activate-vendor-tab"
                  ? { pathname: "/contact-us", query: { type: "vendor" } }
                  : link.href} className="hover:text-secondary transition-all ease-in-out duration-500">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            
           
           </div>

          </motion.div>
          
        </motion.div>

        <div className="lg:grid grid-cols-1  xxl:grid-cols-12 gap-8 xxl:gap-[50px] xxxl:gap-[100px] items-center">
          {/* Buttons and Certifications */}
          <motion.div variants={fadeIn} className="md:col-span-8">
            <div className="flex md:flex-row flex-col gap-5 md:gap-[70px] justify-between border-t xl:border-t-0 xxl:border-t border-white/35 pt-8 xxl:pt-[70px] pb-5 lg:pb-0 items-center">
              <div className="flex items-center flex-col md:flex-row gap-4 justify-between w-full">
                <div className="flex md:flex-row flex-col gap-4 overflow-hidden pt-2 lg:pt-0 wst57 xl:border-t xl:pt-10 xxl:pt-0 border-t-0 xxl:border-t-0">
                {["DOWNLOAD BROCHURE", "PRE-QUALIFICATION"].map((btn, index) => (
                  <motion.button key={index} variants={scaleUp} className="border border-secondary py-2 px-4 rounded-full hover:bg-secondary hover:text-primary h-[40px] md:h-[58px] transition-all ease-in-out duration-500">
                    {btn}
                  </motion.button>
                ))}

                </div>
                <div className="flex gap-2 md:gap-1 items-center flex-col md:flex-row xl:border-t xl:pt-10 xxl:border-t-0 xxl:pt-0">
                  <Image src="/assets/img/icns/fcer1.png" alt="Certifications" width={156} height={58} className=" w-auto h-[36px] md:h-auto rounded-sm" />

                  <Image src="/assets/img/icns/fcer2.png" alt="Certifications" width={43} height={58} className=" w-auto h-[36px] md:h-auto rounded-sm" />

                  <Image src="/assets/img/icns/fcer3.png" alt="Certifications" width={183} height={58} className=" w-auto h-[36px] md:h-auto rounded-sm" />

                  <Image src="/assets/img/icns/fcer4.png" alt="Certifications" width={81} height={58} className=" w-auto h-[36px] md:h-auto rounded-sm" />


                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeIn} className="lg:col-span-8 xxl:col-span-4  block justify-center xl:hidden xxl:block">
            <div className="flex gap-2 md:gap-6 border-t border-white/35 pt-5 xxl:pt-[70px] max-md:justify-center">
              {/* {[FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube].map((Icon, index) => (
                <motion.div key={index} variants={scaleUp}>
                  <Link href="#" className="text-md hover:text-secondary hover:scale-125 transition-all ease-in-out duration-500 h-[45px] xxxl:h-[58px] items-center flex">
                    <Icon />
                  </Link>
                </motion.div>
              ))} */}
              <motion.div variants={scaleUp}>
                  <Link target="_blank" href="https://www.linkedin.com/company/assentsteel/" className="text-md hover:text-secondary hover:scale-125 transition-all ease-in-out duration-500 h-[45px] xxxl:h-[58px] items-center flex">
                    <FaLinkedinIn />
                  </Link>
                </motion.div>
                <motion.div variants={scaleUp}>
                  <Link target="_blank" href="https://www.facebook.com/assentsteel/" className="text-md hover:text-secondary hover:scale-125 transition-all ease-in-out duration-500 h-[45px] xxxl:h-[58px] items-center flex">
                    <FaFacebookF />
                  </Link>
                </motion.div>
                <motion.div variants={scaleUp}>
                  <Link target="_blank" href="https://www.instagram.com/assentsteel/?hl=en" className="text-md hover:text-secondary hover:scale-125 transition-all ease-in-out duration-500 h-[45px] xxxl:h-[58px] items-center flex">
                    <FaInstagram />
                  </Link>
                </motion.div>
                <motion.div variants={scaleUp}>
                  <Link target="_blank" href="https://www.youtube.com/@assentsteel" className="text-md hover:text-secondary hover:scale-125 transition-all ease-in-out duration-500 h-[45px] xxxl:h-[58px] items-center flex">
                    <FaYoutube />
                  </Link>
                </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div variants={fadeIn} className="text-center text-sm mt-5 md:mt-[70px] bg-[#0F2C56] py-[20px]">
        <div className="container text-left">
          <p className="text-xs text-white/50">&copy; 2025 ASSENT STEEL. All rights reserved.</p>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;