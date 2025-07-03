"use client";

import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import GeneralEnquiries from "./forms/GeneralEnquiries";
import RegistrationForm from "./forms/RegistrationForm";
gsap.registerPlugin(ScrollTrigger);

interface jobarray {
  jobtitle: string;
  place: string;
}
interface PlatformsItem {
  id: number;
  title: string;
  job: jobarray[];
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}

const GetInTouch: React.FC<PlatformsSectionProps> = () => {

const forms = [
  {
    id:1,
    title:"General Enquires",
    description:"With our expertise in steel projects, we are with you to help you realize your dreams. Every step of the way. Simply let us know how we can reach you.",
    component:<GeneralEnquiries/>
  },
  {
    id:2,
    title:"Request for quotation",
    description:"With our expertise in steel projects, we are with you to help you realize your dreams. Every step of the way. Simply let us know how we can reach you.",
    component:<RegistrationForm/>
  },
  {
    id:3,
    title:"Downloads",
    description:"With our expertise in steel projects, we are with you to help you realize your dreams. Every step of the way. Simply let us know how we can reach you.",
    component:<GeneralEnquiries/>
  }
]

const [activeForm, setActiveForm] = React.useState(1);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        width: 100,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Starts when the top of the section is 85% in view
          toggleActions: "play none none none",
        },
      });
    }
  }, []);
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };


  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1, y: 0, transition: { duration: 0.5 }},
    };

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative ">
      <div className="container">
  <div
  >
    {/* Buttons Row */}
    <motion.div
      className="flex flex-col md:flex-row gap-2 pb-5 lg:pb-[40px] mb-5 lg:mb-[40px] border-b border-[#00000015]"
      variants={fadeUp}
    >
      {forms.map((form, i) => (
      <motion.div
      onClick={() => setActiveForm(form.id)}
        key={i}
        className={`border border-[#18355F] w-fit rounded-full min-w-[216px] text-center cursor-pointer transition-all duration-300 ${
        i === 0
          ? "bg-secondary border-secondary text-white"
          : "hover:bg-secondary hover:border-secondary hover:text-white text-territory"
        }`}
        whileHover={{ scale: 1.05 }}
        variants={fadeUp}
      >
        <p className="uppercase text-xs font-[500] py-[12px] px-[24px]">{form.title}</p>
      </motion.div>
      ))}
    </motion.div>

    <motion.h2
          className="text-xl text-primary font-[600] leading-[1.2] mb-3 lg:mb-[30px]"
          variants={fadeUp}
        >
          {forms.find((form) => form.id === activeForm)?.title}
        </motion.h2>
    
        {/* Description */}
        <motion.p
          className="text-[#404040] max-w-[90ch] mb-5 lg:mb-[40px]"
          variants={fadeUp}
        >
          {forms.find((form) => form.id === activeForm)?.description}
        </motion.p>

    {forms.find((form) => form.id === activeForm)?.component}
    
  </div>
</div>
    </section>
  );
};

export default GetInTouch;
