"use client";
import { useEffect, useRef,useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);
// const dropdowns = [
//   {
//     label: "Category",
//     options: [
//       { value: "", label: "Category" },
//       { value: "a", label: "Commercial Projects" },
//       { value: "b", label: "Industrial Oil & Gas Projects" },
//       { value: "b", label: "Data Centre Projects" },
//     ],
//   },
// ];
const Fillters = ({ data,setUpdated,clearFilters,search,setSearch }: { data: {name:string}[] ,setUpdated:React.Dispatch<React.SetStateAction<{ value: string; label: string; }[]>>,clearFilters: () => void,search:string,setSearch:React.Dispatch<React.SetStateAction<string>>}) => {
  const [selectedValues, setSelectedValues] = useState<{ value: string; label: string; }[]>([
    { value: "Category", label: "Category" }, // category
    { value: "Date", label: "Date" } ,
    { value: "", label: "" } // date
  ]);
  
  const [date, setDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setHasValue(!!newDate);
    setDate(newDate);
  
    const updatedValues = [
      selectedValues[0], // keep the existing category
      { value: newDate, label: newDate },
      selectedValues[2],// update the date
    ];
  
    setSelectedValues(updatedValues);
    setUpdated(updatedValues);
  };
  
  const selectOption = (option: { value: string; label: string; }) => {
    setIsOpen(false)
  
    const updatedValues = [
      option, // update the category
      selectedValues[1],
      selectedValues[2], // keep the existing date
    ];
  
    setSelectedValues(updatedValues);
    setUpdated(updatedValues);
  };

  const handleSearch = (value:string) => {
    const updatedValues = [
      selectedValues[0], // keep the existing category
      selectedValues[1],
      { value: value, label: value } // update the search
    ];
    setSearch(value);
    setUpdated(updatedValues);
    setSelectedValues(updatedValues);
  }


  const inputRef = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handlePickerToggle = () => {
    if (isPickerOpen) {
      inputRef.current?.blur(); // Closes the picker
      setIsPickerOpen(false);
    } else {
      inputRef.current?.showPicker(); // Opens the picker
      setIsPickerOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


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
  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -30, transition: { duration: 0.4 } },
  };
  return (
    <section className=" pt-[50px] md:pt-[70px] xl:pt-[100px]     relative ">
      <motion.div  variants={slideInLeft}
    initial="hidden"
    whileInView="visible"
    exit="exit"className="container">
        <div className="lg:flex gap-20 mb-5 lg:mb-10 pb-5 lg:pb-10 border-b border-#00000015">
        <div className="md:flex w-full items-center uppercase text-md font-[500] gap-3 lg:gap-10 mb-5 lg:mb-0 ">
          <p>Filter</p>

          <div
      className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0"
      onClick={handlePickerToggle}
    >
      <input
        ref={inputRef}
        type="date"
        onBlur={() => setIsPickerOpen(false)}
        onChange={(e) => handleDateChange(e)}
        className={`uppercase px-1 appearance-none bg-transparent border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-black text-primary text-xs py-2 pr-6 w-full cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden ${!hasValue ? 'text-gray-400' : ''}`}
        value={date || ""}
        placeholder="Choose date"
      />
      {!hasValue && (
        <div className="absolute left-1 top-1/2 -translate-y-1/2 text-primary bg-white w-[300px] pointer-events-none text-xs">
          Date
        </div>
      )}
      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

        <div  className="relative w-full my-3 lg:my-0 " ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="uppercase w-full text-left text-xs text-primary bg-transparent border-0 border-b border-black py-2 pr-6 appearance-none focus:outline-none focus:ring-0 focus:border-black relative"
          >
            {selectedValues[0].label}
            {/* {selectedValues[index].label} */}
            <div className="pointer-events-none absolute  right-2 top-1/2 -translate-y-1/2 text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
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

          {isOpen && (
            <ul className="absolute z-10 left-0 w-full bg-white border   mt-1 shadow-lg rounded-md overflow-hidden">
              {data.map((option,index) => (
                <li
                  key={index}
                  onClick={() => selectOption({value:option.name,label:option.name})}
                  className="px-4 py-2 text-xs uppercase text-primary hover:bg-secondary hover:text-white cursor-pointer transition duration-300"
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        </div>

          <div className="relative w-full flex items-center mb-2 md:mb-0 mt-2 md:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" className="absolute">
            <path d="M11.1235 20.0516C15.9379 20.0516 19.8407 16.1015 19.8407 11.2289C19.8407 6.35629 15.9379 2.40625 11.1235 2.40625C6.30909 2.40625 2.40625 6.35629 2.40625 11.2289C2.40625 16.1015 6.30909 20.0516 11.1235 20.0516Z" stroke="#595959" strokeWidth="1.5" strokeMiterlimit="10"/>
            <path d="M17.4141 17.3203L23.6072 23.5884" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          <input
            type="text"
            placeholder="Search..."
            className="px-1 ps-8 appearance-none bg-transparent border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-black text-primary text-xs py-2 pr-6 w-full"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          </div>
          </div>
          <button onClick={()=>{clearFilters();setHasValue(false);setDate(null);setIsOpen(false);setSearch("");setSelectedValues([ {value:"Category",label:"Category"},{value:"Date",label:"Date"},{value:"",label:""}])}} className="border whitespace-nowrap font-[500] border-secondary text-xs text-territory uppercase rounded-full py-[8px] px-[20px]">Clear filter</button>
        </div>
      </motion.div>
    </section>
  );
};

export default Fillters;
