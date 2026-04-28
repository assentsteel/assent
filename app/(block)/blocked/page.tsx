"use client";

import React from "react";
import Link from "next/link";
import { MdOutlineArrowBack, MdOutlineBlock } from "react-icons/md";

const BlockedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <MdOutlineBlock className="text-[70px] text-[#E63E31]" />
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[42px] font-bold uppercase mb-4">
          Access Restricted
        </h1>

        {/* Subtitle */}
        <p className="text-[#909496] text-[16px] md:text-[18px] mb-8 leading-relaxed">
          Sorry, this content is not available in your region.
          <br />
          If you believe this is a mistake, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default BlockedPage;