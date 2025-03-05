"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ClientSideLinkProps {
  href: string;
  name: string;
  icon: React.ReactNode;
  className?: string;
}

// Client component for handling active states
export default function ClientSideLink({ href, name, icon, className }: ClientSideLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
        "hover:bg-gray-50 hover:text-primary",
        isActive ? "bg-gray-50 text-primary" : "text-gray-700",
        className
      )}
    >
      <span className="mr-3">{icon}</span>
      {name}
    </Link>
  );
}
