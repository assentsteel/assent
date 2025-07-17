"use client";

import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import GeneralEnquiry from "./forms/GeneralEnquiry";
import RegistrationForm from "./forms/RegistrationForm";
import Downloads from "./forms/Downloads";
import { useSearchParams } from "next/navigation";

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

  const containerRef = useRef(null);
  const [formIndex, setFormIndex] = React.useState(1);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

useEffect(()=>{
  if(type){
    setFormIndex(2)
  }
},[type])

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

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1, y: 0, transition: { duration: 0.5 }},
    };


    const forms = [
      {
        id:1,
        buttonText:"Get In Touch",
        title: "Get In Touch",
        description:"With our expertise in steel projects, we are with you to help you realize your dreams. Every step of the way. Simply let us know how we can reach you.",
        component: <GeneralEnquiry/>
      },
      {
        id:2,
        buttonText:"Request for quotation",
        title: "Registrations Form",
        description:"Partner with ASSENT STEEL by registering as a vendor. Fill out the form below to submit your details, and our procurement team will review your application.",
        component: <RegistrationForm/>
      },
      {
        id:3,
        buttonText:"Downloads",
        title: "Download Form",
        description:"Get access to essential documents by submitting the form below. Select your request type, provide your details, and download the required information.",
        component: <Downloads/>
      },
    ]

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
      onClick={() => {
        setFormIndex(form.id)
      }}
        key={i}
        className={`border border-[#18355F] w-fit rounded-full min-w-[216px] text-center cursor-pointer transition-all duration-300 ${
        form.id === formIndex
          ? "bg-secondary border-secondary text-white"
          : "hover:bg-secondary hover:border-secondary hover:text-white text-territory"
        }`}
        whileHover={{ scale: 1.05 }}
        variants={fadeUp}
      >
        <p className="uppercase text-xs font-[500] py-[12px] px-[24px]">{form.buttonText}</p>
      </motion.div>
      ))}
    </motion.div>

    <motion.h2
      className="text-xl text-primary font-[600] leading-[1.2] mb-3 lg:mb-[30px]"
      variants={fadeUp}
    >
      {forms.find((form) => form.id === formIndex)?.title}
    </motion.h2>

    {/* Description */}
    <motion.p
      className="text-[#404040] max-w-[90ch] mb-5 lg:mb-[40px]"
      variants={fadeUp}
    >
      {forms.find((form) => form.id === formIndex)?.description}
    </motion.p>

    {/* Input Fields */}
    {forms.find((form) => form.id === formIndex)?.component}
  </div>
</div>
    </section>
  );
};

export default GetInTouch;
