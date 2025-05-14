"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);


const dropdowns = [
  {
    label: "Country",
    options: [
      { value: "", label: "All countries" },
      { value: "1", label: "Option One" },
      { value: "2", label: "Option Two" },
    ],
  },
  {
    label: "Category",
    options: [
      { value: "", label: "Category" },
      { value: "a", label: "Commercial Projects" },
      { value: "b", label: "Industrial Oil & Gas Projects" },
      { value: "b", label: "Data Centre Projects" },
    ],
  },
  {
    label: "Sector",
    options: [
      { value: "", label: "Sector" },
      { value: "active", label: "Active" },
      { value: "archived", label: "Archived" },
    ],
  },
];
const Fillters = ({ }) => {
   const [selectedValues, setSelectedValues] = useState(
    dropdowns.map((d) => d.options[0])
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const selectOption = (dropdownIndex: number, option: { value: string; label: string; }) => {
    const updated = [...selectedValues];
    updated[dropdownIndex] = option;
    setSelectedValues(updated);
    setOpenIndex(null);
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
  const slideInTop = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.4 } },
  };
  return (
    <section className="  relative ">
      <motion.div  variants={slideInTop}
    initial="hidden"
    animate="visible"
    exit="exit"className="container">
        <div className="lg:flex gap-20 mb-5 lg:mb-10 pb-5 lg:pb-10 border-b border-#00000015">
        <div className="md:flex w-full items-center uppercase text-md font-[500] gap-3 lg:gap-10 mb-5 lg:mb-0 ">
          <p>Filter</p>

      {dropdowns.map((dropdown, index) => (
        <div key={index} className="relative w-full">
          <button
            onClick={() => toggleDropdown(index)}
            className="uppercase w-full text-left text-xs text-primary bg-transparent border-0 border-b border-black py-2 pr-6 appearance-none focus:outline-none focus:ring-0 focus:border-black relative"
          >
            {selectedValues[index].label}
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {openIndex === index && (
            <ul className="absolute z-10 left-0 w-full bg-white border   mt-1 shadow-lg rounded-md overflow-hidden">
              {dropdown.options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => selectOption(index, option)}
                  className="px-4 py-2 text-xs uppercase text-primary hover:bg-secondary hover:text-white cursor-pointer transition duration-300"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

          <div className="relative w-full flex items-center mb-2 md:mb-0 mt-2 md:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" className="absolute">
            <path d="M11.1235 20.0516C15.9379 20.0516 19.8407 16.1015 19.8407 11.2289C19.8407 6.35629 15.9379 2.40625 11.1235 2.40625C6.30909 2.40625 2.40625 6.35629 2.40625 11.2289C2.40625 16.1015 6.30909 20.0516 11.1235 20.0516Z" stroke="#595959" strokeWidth="1.5" strokeMiterlimit="10"/>
            <path d="M17.4141 17.3203L23.6072 23.5884" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          <input
            type="text"
            placeholder="Search..."
            className="uppercase px-1 ps-8 appearance-none bg-transparent border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-black text-primary text-xs py-2 pr-6 w-full"
          />

          </div>
          </div>
          <button className="border whitespace-nowrap font-[500] border-secondary text-xs text-territory uppercase rounded-full py-[8px] px-[20px]">Clear filter</button>
        </div>
      </motion.div>
    </section>
  );
};

export default Fillters;
