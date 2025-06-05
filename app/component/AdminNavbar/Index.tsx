"use client"

import ClientSideLink from '@/app/(admin)/admin/client-side-link';
import React, { useState } from 'react'
import {
    HomeIcon,
    NewspaperIcon,
    UserGroupIcon,
    EnvelopeIcon,
    CheckBadgeIcon,
    PresentationChartBarIcon,
    BriefcaseIcon,
  } from "@heroicons/react/24/outline";
import { CodeIcon } from 'lucide-react';

const AdminNavbar = () => {

    const [openLink, setOpenLink] = useState<string | null>(null);

    const navItems = [
        { name: "Home", href: "/admin/home", icon: HomeIcon },
        { name: "About", href: "/admin/about", icon: UserGroupIcon },
        { name: "Clients", href: "/admin/clients", icon: PresentationChartBarIcon },
        { name: "Services", href: "/admin/services", icon: EnvelopeIcon },
        // { name: "Industries", href: "/admin/industries", icon: BriefcaseIcon },
        { name: "Projects", href: "/admin/projects", icon: CheckBadgeIcon },
        { name: "News", href: "/admin/news", icon: CheckBadgeIcon },
        { name: "Gallery", href: "/admin/gallery", icon: CheckBadgeIcon },
        { name: "Awards", href: "/admin/awards", icon:NewspaperIcon },
        { name: "Team", href: "/admin/team", icon:UserGroupIcon },
        { name: "Careers", href: "/admin/careers", icon:BriefcaseIcon },
        { name: "Contact", href: "/admin/contact", icon: EnvelopeIcon },
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
          />
        );
      })
  )
}

export default AdminNavbar