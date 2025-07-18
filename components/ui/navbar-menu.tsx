"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import arrow from "@/public/assets/img/home/arrow.svg";
import { FaChevronRight } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useSearchContext } from "@/contexts/searchContext";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  url,
  children,
  noMenu,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  url: string;
  children?: React.ReactNode;
  noMenu?: boolean;
}) => {

  return (
    <div
      onMouseEnter={() => (noMenu ? setActive(null) : setActive(item))}
      className="relative">
      <div className="flex gap-2 mb-0">
        <Link href={url}>
          <motion.p
            transition={{ duration: 0.3 }}
            className="cursor-pointer text-[#1F1F1F] font-medium hover:text-secondary dark:text-white text-xs uppercase transition-all duration-500 ease-in-out">
            <span className="flex gap-3 ">{item}</span>
          </motion.p>
        </Link>
        {!noMenu && <Image src={arrow} alt="arrow" className="arrowst" />}
      </div>
      {active !== null && !noMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}>
          {active === item && (
            <div className="">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white absolute  dark:bg-black backdrop-blur-sm mt-6 overflow-hidden rounded-[8px] dark:border-white/[0.2] shadow-xl">
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full px-3  ">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {

  const [searchActive, setSearchActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const {setSearchActive: globalSetSearchActive} = useSearchContext();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target)
      ) {
        setSearchActive(false);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [result, setResult] = useState<[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchQuery }),
      });

      const data = await res.json();

      if (data.success) {
        console.log(data)
        setResult(data.data);
        setSearchQuery("")
      }
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchActive) {
      const scrollY = window.scrollY;
      document.body.dataset.scrollY = String(scrollY);
      // document.body.style.position = 'fixed';
      document.body.style.overflow = 'hidden';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      globalSetSearchActive(true);
    } else {
      const scrollY = document.body.dataset.scrollY;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY ? parseInt(scrollY) : 0);
      globalSetSearchActive(false);
    }
  }, [searchActive]);

  return (
    <div className="relative">
      <nav
        onMouseLeave={() => setActive(null)} // resets the state
        className="relative bg-white z-50 dark:bg-black dark:border-white/[0.2] shadow-input flex justify-center items-center  h-full">
        <div className="left-spacing pr-[20px] xxl:pr-[20px] xxxl:pr-[50px] w-full flex items-center justify-between  py-[25px] border-r border-black/10">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/assets/img/logo.svg"
                alt="Crest Logo"
                width={80}
                height={50}
                className="h-[34px] w-auto"
              />
            </Link>
          </div>
          <div className="flex space-x-[25px] xxl:space-x-[20px] xxxl:space-x-[50px] items-center">
            <div className="flex space-x-[15px] xxl:space-x-[20px] xxxl:space-x-[30px] items-center group">
              {children}
            </div>
            <Link
              href="/contact-us"
              className="self-start text-white bg-secondary hover:bg-primary group rounded-full text-xs font-normal transition duration-300 ease-in-out uppercase flex items-center justify-center gap-[15px] py-[11px] px-[19px] h-48px">

              Contact <div className="rounded-full w-[20px] h-[20px] text-secondary bg-territory group-hover:bg-secondary group-hover:text-primary flex items-center text-[14px] justify-center transition duration-300 ease-in-out"><FaChevronRight /></div>
            </Link>
          </div>
        </div>
        <div className="px-[20px] xxl:px-[20px] xxxl:px-[50px]">
          <div className="cins w-[48px] h-[48px] flex items-center justify-center border border-[#1F1F1F] rounded-full text-center cursor-pointer" onClick={(e)=>{e.stopPropagation();setSearchActive((prev)=>!prev);setResult(null)}} ref={searchButtonRef}>
            {searchActive ? <IoClose className="text-sm text-secondary"/> : <IoSearchOutline className="text-sm text-secondary"/>}
          </div>
        </div>
      </nav>

        <>
        <div className={`absolute inset-0 bg-black/30 backdrop-blur-sm z-10 h-screen w-full duration-300 ${searchActive ? "translate-y-[0%]" : "translate-y-[-100%]"}`}></div>
        <div  ref={searchRef} className={`w-full bg-white z-10 h-[500px] shadow-xl absolute top-24 right-0 duration-300 flex flex-col ${searchActive ? "translate-y-[0%]" : "translate-y-[-100%]"}`}>
        <div className="container h-full">
          {/* <div className="absolute top-[20px] xxxl:right-[60px] right-[30px]" onClick={() => setSearchActive(!searchActive)}>
            <IoClose className="text-lg text-green-950 cursor-pointer" />
          </div> */}

          <form className="w-[95%] mt-3 px-2" onSubmit={handleSearch}>
            
            <div className="relative mt-10">

              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" id="" className="outline-none block w-full p-2  text-sm text-black bg-transparent  placeholder:text-green-950 border-b" placeholder="Search Website" required />
              <div className="absolute inset-y-0 end-0 flex items-center ps-3  cursor-pointer" onClick={handleSearch}>
                <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
            </div>
          </form>

          <div className="mt-5 px-4 flex flex-col gap-5 text-black h-3/4">
            {result && result.length>0 ? <div className="text-md font-semibold">Results</div> : null}
            {loading ? (<div className="flex justify-center items-center h-full"><div className="loader">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
            <div className="bar7"></div>
            <div className="bar8"></div>
            <div className="bar9"></div>
            <div className="bar10"></div>
            <div className="bar11"></div>
            <div className="bar12"></div>
        </div></div>) : (
            <div className="flex-1 overflow-hidden h-full"><ul className="grid grid-cols-2 list-disc gap-5 text-xs px-4 h-fit overflow-y-auto">
              {result && result.length>0 ? result.map((item: {type: string, project: {title: string, slug: string}, category: string, item: {mainTitle: string, slug: string, title: string}}, index: number) => {
                if(item.project){
                  return <Link href={`/projects-details/${item.category}/${item.project.slug}`} key={index} className="cursor-pointer" onClick={()=>{setSearchActive(false);setResult(null)}}><li>{item.project.title}</li></Link>
                }else if(item.type == "news"){
                  return <Link href={`/news-details/${item.item.slug}`} key={index} className="cursor-pointer" onClick={()=>{setSearchActive(false);setResult(null)}}><li>{item.item.mainTitle}</li></Link>
                }else if(item.type == "gallery"){
                  return <Link href={`/gallery-details/${item.item.slug}`} key={index} className="cursor-pointer" onClick={()=>{setSearchActive(false);setResult(null)}}><li>{item.item.title}</li></Link>
                }
              }) : (result?.length==0?<div>No Results</div>:null)}
            </ul></div>)}
          </div>

        </div></div>
        </>


    </div>

  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: LinkProps & { children: ReactNode }) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black">
      {children}
    </Link>
  );
};
