"use client";

import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import GeneralEnquiry from "./forms/GeneralEnquiry";
import RegistrationForm from "./forms/RegistrationForm";
import Downloads from "./forms/Downloads";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { generalEnquirySchema } from "@/app/schemas/generalEnquiry";
import { registrationFormSchema } from "@/app/schemas/registrationForm";
import { downloadFormSchema } from "@/app/schemas/downloadForm";

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
type FormSchemaType =
  | z.infer<typeof generalEnquirySchema>
  | z.infer<typeof registrationFormSchema>
  | z.infer<typeof downloadFormSchema>;

const GetInTouch: React.FC<PlatformsSectionProps> = () => {


  const containerRef = useRef(null);
  const [formIndex, setFormIndex] = React.useState(1);

  const [tradelicenseFile, setTradelicenseFile] = React.useState<File | null>(null);
  const [vatregistrationFile, setVatregistrationFile] = React.useState<File | null>(null);

  const {reset} = useForm<FormSchemaType>({
    resolver:zodResolver(formIndex === 1 ? generalEnquirySchema : formIndex === 2 ? registrationFormSchema : downloadFormSchema)
  })



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

    const onSubmit = async (data: FormSchemaType) => {
      console.log(data)
      try {
        switch (data.type) {
          case "generalEnquiry":
            const response = await fetch("/api/admin/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            if (response.ok) {
              const data = await response.json();
              alert(data.message);
            }else{
              alert("Something went wrong, try again")
            }
            break;
          case "registrationForm":
            console.log(data)
            if(tradelicenseFile){
              const formData = new FormData();
              formData.append("file", tradelicenseFile as File);
              formData.append("fileType", "file");
              const tradeLicenseResponse = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
              });
              if (tradeLicenseResponse.status !== 200) {
                alert("Something went wrong, try again")
                return;
              }
              if(vatregistrationFile){
                const formData = new FormData();
                formData.append("file", vatregistrationFile as File);
                formData.append("fileType", "file");
                const vatRegistrationResponse = await fetch("/api/admin/upload", {
                  method: "POST",
                  body: formData,
                });
                if (vatRegistrationResponse.status !== 200) {
                  alert("Something went wrong, try again")
                  return;
                }
                const vatRegistrationData = await vatRegistrationResponse.json();
                const tradeLicenseData = await tradeLicenseResponse.json();
                if(tradeLicenseData.url && vatRegistrationData.url){
                  const formResponse = await fetch("/api/admin/contact", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({...data,tradelicense:tradeLicenseData.url,vatregistration:vatRegistrationData.url}),
                  });
                  if (formResponse.ok) {
                    const data = await formResponse.json();
                    alert(data.message);
                  }else{
                    alert("Something went wrong, try again")
                  }
                }
              }
            }
            break;
          case "downloadForm":
            const response3 = await fetch("/api/admin/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            if (response3.ok) {
              const data = await response3.json();
              alert(data.message);
            }else{
              alert("Something went wrong, try again")
            }
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      console.log(formIndex)
      reset({type:formIndex === 1 ? "generalEnquiry" : formIndex === 2 ? "registrationForm" : "downloadForm"})
    }, [formIndex]);

    const forms = [
      {
        id:1,
        buttonText:"Get In Touch",
        title: "Get In Touch",
        description:"With our expertise in steel projects, we are with you to help you realize your dreams. Every step of the way. Simply let us know how we can reach you.",
        component: <GeneralEnquiry onSubmit={onSubmit}/>
      },
      {
        id:2,
        buttonText:"Request for quotation",
        title: "Registrations Form",
        description:"Partner with ASSENT STEEL by registering as a vendor. Fill out the form below to submit your details, and our procurement team will review your application.",
        component: <RegistrationForm onSubmit={onSubmit} setTradeLicenseFile={setTradelicenseFile} setVatRegistrationFile={setVatregistrationFile}/>
      },
      {
        id:3,
        buttonText:"Downloads",
        title: "Download Form",
        description:"Get access to essential documents by submitting the form below. Select your request type, provide your details, and download the required information.",
        component: <Downloads onSubmit={onSubmit}/>
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

    {/* Heading */}
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
