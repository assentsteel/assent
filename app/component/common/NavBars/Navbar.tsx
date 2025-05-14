"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { menuItems } from "./data";

import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";

// import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  const pagesWithBackground = ["/"]; // Add required pages
  const hasBackground = pagesWithBackground.includes(pathname);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevents errors during SSR

    const handleScreenCheck = () => {
      if (window.innerWidth < 1139) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleScreenCheck(); // Set initial state

    window.addEventListener("resize", handleScreenCheck);

    return () => window.removeEventListener("resize", handleScreenCheck);
  }, []);

  if (isMobile) {
    return <MobileNav />;
  } else if (isMobile == null) {
    return null;
  } else {
    //  const pathname = usePathname(); // Get the current path

    //     const isHomePage = pathname === "/"; // Check if it's the home page

    return (
      <header
        className={`${
          hasBackground
            ? "bg-white backdrop-blur-[10px] text-black shadow-md"
            : "bg-transparent text-white tanspheader"
        } transition duration-300 ease-in-out w-full  top-0 z-50 relative`}>
        {/* <div className='flex items-center'>
   <div className="hidden md:flex space-x-6 text-gray-800 text-sm uppercase">
     <Link href="/about">
       <span className="text-sm">About Us</span>
     </Link>
     <div className="relative group">
       <span className="text-sm">Projects <FaChevronDown /></span>
       <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg p-2 mt-1 rounded-md">
         <Link href="/projects/residential">
           <span className="block px-4 py-2 hover:bg-gray-100">Residential</span>
         </Link>
         <Link href="/projects/commercial">
           <span className="block px-4 py-2 hover:bg-gray-100">Commercial</span>
         </Link>
       </div>
     </div>
     <Link href="/careers">
       <span className="text-sm">Careers</span>
     </Link>
     <Link href="/media">
       <span className="text-sm">Media</span>
     </Link>
     <div className="relative group">
       <span className="text-sm">How We Work <FaChevronDown /></span>
       <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg p-2 mt-1 rounded-md">
         <Link href="/how-we-work/approach">
           <span className="block px-4 py-2 hover:bg-gray-100">Our Approach</span>
         </Link>
         <Link href="/how-we-work/process">
           <span className="block px-4 py-2 hover:bg-gray-100">Process</span>
         </Link>
       </div>
     </div>
   </div>


   <Link href="/contact">
     <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
       Contact Us
     </button>
   </Link>
   </div> */}

        <Menu setActive={setActive}>
          {menuItems.map((menuItem, index) =>
            menuItem.children ? (
              <MenuItem
                setActive={setActive}
                active={active}
                url={menuItem.url}
                item={menuItem.title}
                key={index}>
                <div className="grid grid-cols-1 py-4  ">
                  {/* <ProductItem
                  title="Residential"
                  description=" "
                  href="#"
                  src={"/assets/images/gd-im1.jpg"}
                />
                <ProductItem
                  title="Commercial"
                  description=""
                  href="#"
                  src="/assets/images/gd-im2.jpg"
                /> */}
                  {menuItem.children.map((item, index) => (
                    <HoveredLink href={`${item.url}`} key={index}>
                      <div className=" hover:bg-black/5 pl-3 pr-[80px] py-2 rounded-[8px] transition-transform duration-300 hover:text-secondary hover:scale-105 flex gap-2 items-center self-start spckbtn whts">
                        <div >
                          <Image
                            src={"/assets/img/icons/arrow.svg"}
                            alt=""
                            width={15}
                            height={15}
                          />
                        </div>{" "}
                        <p className="m-0 p-0 text-[16px] uppercase ">
                          {item.title}
                        </p>
                      </div>
                    </HoveredLink>
                  ))}

                  {/* <HoveredLink href="#">
                  <div>Commercial</div>
                </HoveredLink> */}
                </div>
              </MenuItem>
            ) : (
              <MenuItem
                item={menuItem.title}
                url={menuItem.url}
                setActive={setActive}
                active={active}
                noMenu={true}
                key={index}>
                <div className="p-4">
                  <Link href="/">{menuItem.title}</Link>
                </div>
              </MenuItem>
            )
          )}

          {/* <MenuItem item="About Us" setActive={setActive} active={active}>
             <div className="p-4">
               <Link href="/">About Us</Link>
             </div>
           </MenuItem> */}

          {/* <MenuItem setActive={setActive} active={active} item="Projects">
             <div className="grid grid-cols-2 gap-4 p-4">
               <ProductItem
                 title="Residential"
                 description=" "
                 href="#"
                 src={"/assets/images/gd-im1.jpg"}
               />
               <ProductItem
                 title="Commercial"
                 description=""
                 href="#"
                 src="/assets/images/gd-im2.jpg"
               />
               <HoveredLink href="#">
                 <div>Residential</div>
               </HoveredLink>
               <HoveredLink href="#">
                 <div>Commercial</div>
               </HoveredLink>
             </div>
           </MenuItem>

           <MenuItem item="Careers" setActive={setActive} active={active} noMenu>
             <div className="p-4">
               <Link href="/">Careers</Link>
             </div>
           </MenuItem>

           <MenuItem item="Media" setActive={setActive} active={active}>
             <div className="p-4">
               <Link href="/">Media</Link>
             </div>
           </MenuItem>

           <MenuItem item="How we work" setActive={setActive} active={active}>
             <div className="p-4">
               <Link href="/">How we work</Link>
             </div>
           </MenuItem> */}
        </Menu>
      </header>
    );
  }
};

export default Navbar;
