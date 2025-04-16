"use client";

import React, { useState } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
        <div>
          <h2 className="text-xl  text-primary font-[600] leading-[1.2] mb-3 lg:mb-[30px]">
            Join Our Team
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-x-6 xxl:gap-x-10 mb-4 lg:mb-7">
            <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
              <input
                type="text"
                placeholder="First Name"
                className=" px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
              />
            </div>
            <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
              <input
                type="text"
                placeholder="Last Name"
                className=" px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-x-6 xxl:gap-x-10 mb-4 lg:mb-7">
            <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
              <input
                type="email"
                placeholder="Email"
                className=" px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
              />
            </div>
            <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
              <input
                type="number"
                placeholder="Phone Number"
                className=" px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-x-6 xxl:gap-x-10 mb-4 lg:mb-7">
            <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0 flex gap-4">
            <p className="text-[16px] text-[#595959]">Gender</p>
              <div>
              <label className="inline-flex items-center cursor-pointer mr-3">
              <input
                type="radio"
                name="option"
                value="yes"
                className="appearance-none w-5 h-5 border-2 border-green-500 rounded-full checked:bg-green-500 checked:border-green-500 transition duration-200"
              />
              <span className="ml-2 text-[#595959]">Male</span>
              </label>
              <label className="inline-flex items-center cursor-pointer mr-3">
              <input
                type="radio"
                name="option"
                value="yes"
                className="appearance-none w-5 h-5 border-2 border-green-500 rounded-full checked:bg-green-500 checked:border-green-500 transition duration-200"
              />
              <span className="ml-2 text-[#595959]">Female</span>
              </label>
              <label className="inline-flex items-center cursor-pointer mr-3">
              <input
                type="radio"
                name="option"
                value="yes"
                className="appearance-none w-5 h-5 border-2 border-green-500 rounded-full checked:bg-green-500 checked:border-green-500 transition duration-200"
              />
              <span className="ml-2 text-[#595959]">Others</span>
            </label>
              </div>

            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-x-6 xxl:gap-x-10 mb-4 lg:mb-7">
            <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
              <input
                type="text"
                placeholder="Date of Birth"
                className=" px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
              />
            </div>
            <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
              <input
                type="text"
                placeholder="Nationality"
                className=" px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-x-6 xxl:gap-x-10 mb-4 lg:mb-7">
            <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
              <input
                type="text"
                placeholder="Current Location"
                className=" px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
              />
            </div>
            <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
              <input
                type="text"
                placeholder="Work Experience"
                className=" px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-[#1E1E1E1A] p-6 rounded-2xl shadow-sm flex items-center space-x-4 w-full"
      >
        <div className="text-2xl text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="28" viewBox="0 0 22 28" fill="none">
<path d="M13.8571 1V6.77778C13.8571 7.16087 14.0077 7.52827 14.2756 7.79915C14.5435 8.07004 14.9068 8.22222 15.2857 8.22222H21M13.8571 1H3.85714C3.09938 1 2.37266 1.30436 1.83684 1.84614C1.30102 2.38791 1 3.12271 1 3.88889V24.1111C1 24.8773 1.30102 25.6121 1.83684 26.1539C2.37266 26.6956 3.09938 27 3.85714 27H18.1429C18.9006 27 19.6273 26.6956 20.1632 26.1539C20.699 25.6121 21 24.8773 21 24.1111V8.22222M13.8571 1L21 8.22222M6.71429 9.66667H8.14286M6.71429 15.4444H15.2857M6.71429 21.2222H15.2857" stroke="#1F1F1F" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>
        <div className="text-sm text-[gray-700]">
          <p>
            {fileName || (
              <>
                  <span className="text-[1F1F1FB5] font-400 text-[16px]">Max. 10 MB.  pdf, doc, docx</span>
              </>
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

      <button className="mt-6 min-w-[173px] bg-[#0A2657] text-white text-[16px] font-[400] px-8 py-4 rounded-full shadow-md hover:bg-primary transition duration-300">
        SUBMIT
      </button>
    </div>

        </div>
      </div>
    </section>
  );
};

export default JoinTeam;
