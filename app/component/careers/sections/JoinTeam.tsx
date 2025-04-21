"use client";

import React, { useState } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
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

const JoinTeam: React.FC<PlatformsSectionProps> = () => {

  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

    if (!file) {
      alert("No file selected.");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC, and DOCX files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File must be smaller than 10MB.");
      e.target.value = "";
      return;
    }

    setFileName(file.name);
  };
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

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative ">
      <div className="container">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <motion.h2
      className="text-xl text-primary font-[600] leading-[1.2] mb-3 lg:mb-[30px]"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      Join Our Team
    </motion.h2>

    {/* Reusable animation wrapper for fields */}
    {[
      ["First Name", "Last Name"],
      ["Email", "Phone Number"],
      ["Date of Birth", "Nationality"],
      ["Current Location", "Work Experience"],
    ].map((pair, idx) => (
      <motion.div
        key={idx}
        className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-x-6 xxl:gap-x-10 mb-4 lg:mb-7"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * idx, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {pair.map((placeholder, i) => (
          <div key={i} className="relative w-full mt-2">
            <input
              type={placeholder.includes("Email") ? "email" : placeholder.includes("Phone") ? "number" : "text"}
              placeholder={placeholder}
              className="px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
            />
          </div>
        ))}
      </motion.div>
    ))}

    {/* Gender */}
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 mb-4 lg:mb-7"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="relative w-full flex gap-4 mt-2">
        <p className="text-[16px] text-[#595959]">Gender</p>
        <div className="flex gap-4">
          {["Male", "Female", "Others"].map((gender, i) => (
            <label key={i} className="inline-flex items-center cursor-pointer mr-3">
              <input
                type="radio"
                name="gender"
                value={gender.toLowerCase()}
                className="appearance-none w-5 h-5 border-2 border-green-500 rounded-full checked:bg-green-500 checked:border-green-500 transition duration-200"
              />
              <span className="ml-2 text-[#595959]">{gender}</span>
            </label>
          ))}
        </div>
      </div>
    </motion.div>

    {/* File Upload + Submit */}
    <motion.div
      className="w-full lg:w-1/2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-[#1E1E1E1A] p-6 rounded-2xl shadow-sm flex items-center space-x-4 w-full"
      >
        <div className="text-2xl text-gray-700">
          {/* Your SVG icon here */}
        </div>
        <div className="text-sm text-[gray-700]">
          <p>
            {fileName || (
              <span className="text-[1F1F1FB5] font-400 text-[16px]">
                Max. 10 MB. pdf, doc, docx
              </span>
            )}
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 min-w-[173px] bg-[#0A2657] text-white text-[16px] font-[400] px-8 py-4 rounded-full shadow-md hover:bg-primary transition duration-300"
      >
        SUBMIT
      </motion.button>
    </motion.div>
  </motion.div>
</div>
    </section>
  );
};

export default JoinTeam;
