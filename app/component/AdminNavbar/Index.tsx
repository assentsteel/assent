"use client"

import ClientSideLink from '@/app/(admin)/ASe25Nt@dmin/client-side-link';
import React, { useState } from 'react'
import {
    HomeIcon,
    NewspaperIcon,
    UserGroupIcon,
    EnvelopeIcon,
    BriefcaseIcon,
    GlobeAltIcon,
  } from "@heroicons/react/24/outline";
import { AwardIcon, GalleryThumbnails, HeartHandshake, LeafIcon, Settings, ThumbsUp, Workflow } from 'lucide-react';
import { useEffect } from 'react';



const AdminNavbar = () => {

    const [openLink, setOpenLink] = useState<string | null>(null);
    
    useEffect(() => {
      fetchCountries()
  },[])
  
  const [countries, setCountries] = useState([])
  const fetchCountries = async () => {
      const response = await fetch("/api/admin/global-presence");
      const data = await response.json();
      setCountries(data.data.thirdSection.countries)
  }

    const navItems = [
        { name: "Home", href: "/ASe25Nt@dmin/home", icon: HomeIcon },
        { name: "About", href: "/ASe25Nt@dmin/about", icon: UserGroupIcon },
        // { name: "Clients", href: "/ASe25Nt@dmin/clients", icon: PresentationChartBarIcon },
        { name: "Services", href: "#", icon: EnvelopeIcon,hasChild:true,children: [
            { name: "Engineering", href: "/ASe25Nt@dmin/services/engineering" },
            { name: "Fabrication", href: "/ASe25Nt@dmin/services/fabrication" },
            { name: "Blasting", href: "/ASe25Nt@dmin/services/blasting" },
            { name: "Steel Erection", href: "/ASe25Nt@dmin/services/steel-erection" },
          ] },
        // { name: "Industries", href: "/ASe25Nt@dmin/industries", icon: BriefcaseIcon },
        { name: "Global Presence", href: "##", icon: GlobeAltIcon , hasChild:true,children: [
          { name: "Main Page", href: "/ASe25Nt@dmin/global-presence" },
          ...countries.map((country: { _id: string,title:string }) => (
            { name: country.title, href: `/ASe25Nt@dmin/global-presence/${country._id}` }
          )),
        ] },
        { name: "Projects", href: "/ASe25Nt@dmin/projects", icon: Workflow },
        { name: "News", href: "/ASe25Nt@dmin/news", icon: NewspaperIcon },
        { name: "Gallery", href: "/ASe25Nt@dmin/gallery", icon: GalleryThumbnails },
        { name: "Awards", href: "/ASe25Nt@dmin/awards", icon:AwardIcon },
        { name: "Team", href: "/ASe25Nt@dmin/team", icon:UserGroupIcon },
        { name: "Careers", href: "####", icon:BriefcaseIcon,hasChild:true,children: [
          { name: "Main Page", href: "/ASe25Nt@dmin/careers" },
          {name:"Enquiries",href:"/ASe25Nt@dmin/careers/enquiries"}
        ] },
        { name: "Contact", href: "###", icon: EnvelopeIcon,hasChild:true,children: [
          { name: "Main Page", href: "/ASe25Nt@dmin/contact" },
          {name:"Enquiries",href:"/ASe25Nt@dmin/contact/enquiries"}
        ] },
        { name: "Quality", href: "/ASe25Nt@dmin/quality", icon: ThumbsUp },
        { name: "HSE", href: "/ASe25Nt@dmin/hse", icon: HeartHandshake },
        { name: "Sustainability", href: "/ASe25Nt@dmin/sustainability", icon: LeafIcon },
        { name: "Settings", href: "/ASe25Nt@dmin/settings", icon: Settings},
      ];

  return (
    navItems.map((item) => {
        const Icon = item.icon;
        return (
          <ClientSideLink
            key={item.href}
            href={item.href}
            name={item.name}
            icon={<Icon className="h-5 w-5" />}
            isOpen={openLink === item.href}
            setOpenLink={setOpenLink}
            hasChild={item.hasChild}
          >
            {item.children}
          </ClientSideLink>
        );
      })
  )
}

export default AdminNavbar