"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { menuItems } from "./data";

import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";

// import { usePathname } from "next/navigation";

const Navbar = ({ categories }: { categories: { name: string; slug: string; }[] }) => {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  const pagesWithBackground = ["/"]; // Add required pages
  const hasBackground = pagesWithBackground.includes(pathname);
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowFixedNavbar(true);
      } else {
        setShowFixedNavbar(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
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
    const renderHeader = () => (
      <header
        className={`${
          hasBackground
            ? "bg-white backdrop-blur-[10px] text-black shadow-md"
            : "bg-transparent text-white tanspheader"
        } transition duration-300 ease-in-out w-full z-50`}
      >
        <Menu setActive={setActive}>
          {menuItems.map((menuItem, index) =>
            menuItem.title === "Projects" ? (
              <MenuItem
                key={index}
                setActive={setActive}
                active={active}
                url={menuItem.url}
                item={menuItem.title}
              >
                <div className="grid grid-cols-1 py-4">
                  {categories.map((item, i) => (
                    <HoveredLink href={`/projects-list/${item.slug}`} key={i}>
                      <div className="hover:bg-black/5 pl-3 pr-[80px] py-2 rounded-[8px] transition-transform duration-300 hover:text-secondary hover:scale-105 flex gap-2 items-center self-start spckbtn whts">
                        <Image
                          src={"/assets/img/icons/arrow.svg"}
                          alt=""
                          width={15}
                          height={15}
                        />
                        <p className="m-0 p-0 text-[16px] uppercase">{item.name}</p>
                      </div>
                    </HoveredLink>
                  ))}
                </div>
              </MenuItem>
            ) : menuItem.children ? (
              <MenuItem
                key={index}
                setActive={setActive}
                active={active}
                url={menuItem.url}
                item={menuItem.title}
              >
                <div className="grid grid-cols-1 py-4">
                  {menuItem.children.map((child, i) => (
                    <HoveredLink href={child.url} key={i}>
                      <div className="hover:bg-black/5 pl-3 pr-[80px] py-2 rounded-[8px] transition-transform duration-300 hover:text-secondary hover:scale-105 flex gap-2 items-center self-start spckbtn whts">
                        <Image
                          src={"/assets/img/icons/arrow.svg"}
                          alt=""
                          width={15}
                          height={15}
                        />
                        <p className="m-0 p-0 text-[16px] uppercase">{child.title}</p>
                      </div>
                    </HoveredLink>
                  ))}
                </div>
              </MenuItem>
            ) : (
              <MenuItem
                key={index}
                item={menuItem.title}
                url={menuItem.url}
                setActive={setActive}
                active={active}
                noMenu
              >
                <div className="p-4">
                  <Link href={menuItem.url}>{menuItem.title}</Link>
                </div>
              </MenuItem>
            )
          )}
        </Menu>
      </header>
    );
    
    return (
     <> 
     <div className=" relative z-[9999]  ">
     {renderHeader()} 
     </div>
     {showFixedNavbar&&(
     <div className="fixed top-0 left-0 w-full z-[999] bg-white text-black shadow-md transition-all duration-500">
     { renderHeader()}
     </div>
     )}
      </>
      
    );
  }
};

export default Navbar;
