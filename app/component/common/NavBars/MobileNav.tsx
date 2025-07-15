import React, { useEffect, useRef, useState } from "react";
import { menuItems } from "./data";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { useSearchContext } from "@/contexts/searchContext";

const MobileNav = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility
  const [searchActive, setSearchActive] = useState(false);
  const searchButtonRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {setSearchActive: globalSetSearchActive } = useSearchContext();

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
          if(data.data.length>0){
            setSearchQuery("")
          }
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
          document.body.style.position = 'fixed';
          document.body.style.top = `-${scrollY}px`;
          document.body.style.left = '0';
          document.body.style.right = '0';
          globalSetSearchActive(true);
        } else {
          const scrollY = document.body.style.top;
          document.body.style.position = '';
          document.body.style.top = '';
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
          globalSetSearchActive(false);
          setResult([]);
        }
      }, [searchActive]);


        useEffect(() => {

          function handleClickOutside(event: MouseEvent) {
            if (
              searchRef.current &&
              event.target instanceof Node &&
              !searchRef.current.contains(event.target)
            ) {
              setSearchActive(false); // close the dropdown
            }
          }
      
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-white text-white tanspheader py-4  top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/assets/img/logo.svg"
                alt="Assent"
                width={80}
                height={40}
                className="h-[40px] w-auto"
              />
            </Link>
          </div>
          {/* Search Button */}
          <div className="flex items-center">
          <div className="px-[14px]">
                    <div className="cins w-[32px] h-[32px] flex items-center justify-center border border-[#1F1F1F] rounded-full text-center cursor-pointer" ref={searchButtonRef} onClick={()=>setSearchActive(!searchActive)}>
                      {searchActive ? <IoClose className="text-sm text-secondary"/> : <IoSearchOutline className="text-sm text-secondary"/>}
                    </div>
                  </div>


                  <>
        <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-10 h-screen w-full duration-300 ${searchActive ? "translate-y-[0%]" : "translate-y-[-100%]"}`}></div>
        <div  ref={searchRef} className={`w-full bg-white z-10 h-[75vh] shadow-xl absolute top-0 right-0 duration-300 flex flex-col ${searchActive ? "translate-y-[0%]" : "translate-y-[-100%]"}`}>
        <div className="container h-full">
          {/* <div className="absolute top-[20px] xxxl:right-[60px] right-[30px]" onClick={() => setSearchActive(!searchActive)}>
            <IoClose className="text-lg text-green-950 cursor-pointer" />
          </div> */}
          <div className="absolute top-3 right-5">
          <button
            className="text-[16px] text-primary font-[600]"
            onClick={() => setSearchActive(false)}>
            ✕
          </button>
          </div>
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
            {result.length>0 ? <div className="text-md font-semibold">Results</div> : null}
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
            <div className="flex-1 overflow-hidden h-full"><ul className="grid grid-cols-2 list-disc gap-5 text-xs px-4 h-full overflow-y-auto">
              {result.map((item: {type: string, project: {title: string, slug: string}, category: string, item: {mainTitle: string, slug: string, title: string}}, index: number) => {
                if(item.project){
                  return <Link href={`/projects-details/${item.category}/${item.project.slug}`} key={index} className="cursor-pointer" onClick={()=>setSearchActive(false)}><li>{item.project.title}</li></Link>
                }else if(item.type == "news"){
                  return <Link href={`/news-details/${item.item.slug}`} key={index} className="cursor-pointer" onClick={()=>setSearchActive(false)}><li>{item.item.mainTitle}</li></Link>
                }else if(item.type == "gallery"){
                  return <Link href={`/gallery-details/${item.item.slug}`} key={index} className="cursor-pointer" onClick={()=>setSearchActive(false)}><li>{item.item.title}</li></Link>
                }
              })}
            </ul></div>)}
          </div>

        </div></div>
        </>

          {/* //Hamburger Icon */}
          <div
            className="cursor-pointer px-3 py-6"
            onClick={() => setMenuOpen(!menuOpen)}>
            <div
              className={`relative block h-[2px] w-7 bg-primary transition-all
                before:absolute before:top-[-0.35rem] before:block before:h-full before:w-full before:bg-primary before:transition-all
                after:absolute after:bottom-[-0.35rem] after:block after:h-full after:w-full after:bg-primary after:transition-all
                ${
                  menuOpen
                    ? "bg-transparent before:rotate-45 before:top-0 after:-rotate-45 after:bottom-0"
                    : ""
                }`}></div>
          </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)} // Clicking outside closes menu
        ></div>
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] bg-white shadow-2xl transform transition-transform duration-500
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="min-h-full px-6 pt-[30px] pb-[40px] flex flex-col relative">
          {/* Close Button */}
          <button
            className="absolute top-8 right-4 text-[25px] text-primary font-[600]"
            onClick={() => setMenuOpen(false)}>
            ✕
          </button>

          {/* Logo */}
          <div className="text-left mb-[50px]">
            <Link href="/">
              <Image
                src="/assets/img/logo.svg"
                alt="Assent"
                width={80}
                height={50}
                className="h-[30px] w-auto"
              />
            </Link>
          </div>

          {/* Navigation Items */}
          <ul className="flex flex-col gap-4">
            {menuItems.map((item, index) =>
              item.children ? (
                <li key={index}>
                  <div
                    className="pb-2 flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      setActiveDropdown(activeDropdown === index ? null : index)
                    }>
                    <span className="font-semibold">{item.title}</span>
                    <ChevronDown
                      className={`transition-transform duration-300 ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {/* Dropdown */}
                  {activeDropdown === index && (
                    <ul className="">
                      {item.children.map((childItem, childIndex) => (
                        <li key={childIndex} className="py-1">
                          <Link
                            href={childItem.url}
                            onClick={() => setMenuOpen(false)}>
                            {childItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={index} className="pb-2">
                  <Link
                    href={item.url}
                    onClick={() => setMenuOpen(false)}
                    className="font-semibold">
                    {item.title}
                  </Link>
                </li>
              )
            )}

            {/* Contact Link */}
            <li>
              <Link
                href="/contact-us"
                onClick={() => setMenuOpen(false)}
                className="font-semibold">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="mt-auto">
            <hr />
            <div className="flex space-x-4 mt-4">
              <FaFacebookF className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-500" />
              <FaLinkedinIn className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-500" />
              <FaInstagram className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-500" />
              <FaYoutube className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
