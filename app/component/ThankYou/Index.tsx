"use client";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

export default function ThankYou() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[80px] xxl:py-[150px] overflow-hidden relative">
      <div className="text-center">

        {/* Tick Icon — delay 100ms */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-7 transition-all duration-500 ${
            animate ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          style={{ backgroundColor: "#5ba646", transitionDelay: "100ms" }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 18.5L15 25.5L28 11"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 36,
                strokeDashoffset: animate ? 0 : 36,
                transition: "stroke-dashoffset 0.5s ease 0.5s",
              }}
            />
          </svg>
        </div>

        {/* Heading — delay 400ms */}
        <h1
          className={`text-xxl font-[600] text-primary mb-4  leading-[1] ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          Thank You!
        </h1>

        {/* Subtext — delay 550ms */}
        <p
          className={`  mb-8 transition-all duration-500 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          Your response has been submitted.
        </p>

        {/* Button — delay 700ms */}
       <div
  className={`flex justify-center transition-all duration-500 ${
    animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
  }`}
  style={{ transitionDelay: "700ms" }}
>
          <button
  onClick={() => (window.location.href = "/")}
  className="px-8 py-3 text-white text-sm font-semibold transition-colors duration-200 rounded-full flex items-center gap-3"
  style={{ backgroundColor: "#5ba646" }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#18355fe6")}
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5ba646")}
>
  <span>Back to Home</span>

  <span className="rounded-full w-[20px] h-[20px] text-secondary bg-white flex items-center justify-center text-[14px] transition duration-300 ease-in-out">
    <FaChevronRight />
  </span>
</button>
        </div>

      </div>
    </section>
  );
}