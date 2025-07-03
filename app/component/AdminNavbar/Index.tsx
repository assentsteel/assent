"use client"

import ClientSideLink from '@/app/(admin)/admin/client-side-link';
import React, { useState } from 'react'
import {
    HomeIcon,
    NewspaperIcon,
    UserGroupIcon,
    EnvelopeIcon,
    BriefcaseIcon,
    GlobeAltIcon,
  } from "@heroicons/react/24/outline";
import { AwardIcon, CodeIcon, GalleryThumbnails, HeartHandshake, LeafIcon, ThumbsUp, Workflow } from 'lucide-react';
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
        { name: "Home", href: "/admin/home", icon: HomeIcon },
        { name: "About", href: "/admin/about", icon: UserGroupIcon },
        // { name: "Clients", href: "/admin/clients", icon: PresentationChartBarIcon },
        { name: "Services", href: "#", icon: EnvelopeIcon,hasChild:true,children: [
            { name: "Engineering", href: "/admin/services/engineering" },
            { name: "Fabrication", href: "/admin/services/fabrication" },
            { name: "Blasting", href: "/admin/services/blasting" },
            { name: "Steel Erection", href: "/admin/services/steel-erection" },
          ] },
        // { name: "Industries", href: "/admin/industries", icon: BriefcaseIcon },
        { name: "Global Presence", href: "##", icon: GlobeAltIcon , hasChild:true,children: [
          { name: "Main Page", href: "/admin/global-presence" },
          ...countries.map((country: { _id: string,title:string }) => (
            { name: country.title, href: `/admin/global-presence/${country._id}` }
          )),
        ] },
        { name: "Projects", href: "/admin/projects", icon: Workflow },
        { name: "News", href: "/admin/news", icon: NewspaperIcon },
        { name: "Gallery", href: "/admin/gallery", icon: GalleryThumbnails },
        { name: "Awards", href: "/admin/awards", icon:AwardIcon },
        { name: "Team", href: "/admin/team", icon:UserGroupIcon },
        { name: "Careers", href: "####", icon:BriefcaseIcon,hasChild:true,children: [
          { name: "Main Page", href: "/admin/careers" },
          {name:"Enquiries",href:"/admin/careers/enquiries"}
        ] },
        { name: "Contact", href: "###", icon: EnvelopeIcon,hasChild:true,children: [
          { name: "Main Page", href: "/admin/contact" },
          {name:"Enquiries",href:"/admin/contact/enquiries"}
        ] },
        { name: "Quality", href: "/admin/quality", icon: ThumbsUp },
        { name: "HSE", href: "/admin/hse", icon: HeartHandshake },
        { name: "Sustainability", href: "/admin/sustainability", icon: LeafIcon },
        { name: "Tag Codes", href: "/admin/codes", icon: CodeIcon},
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