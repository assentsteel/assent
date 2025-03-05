"use client";
import { useLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      console.log("Lenis is ready!");
    }
  }, [lenis]);

  return <>{children}</>;
}
