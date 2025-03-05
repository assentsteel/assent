"use client";

import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "../projectsLists/ProjectCard";

const ProjectList = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const projects = [
    {
      locationName: "Kalba,Sharjah.",
      title: "3000 Prayer Mosque",
      image: "/assets/img/projects-details/po1.jpg",
    },
    {
      locationName: "Kalba,Sharjah.",
      title: "22 Villas Al Khalidiya",
      image: "/assets/img/projects-details/po2.jpg",
    },
    {
      locationName: "Kalba,Sharjah.",
      title: "Gardenia Residence",
      image: "/assets/img/projects-details/po3.jpg",
    },
  ];

  const updateSlidesPerView = () => {
    if (window.innerWidth >= 1024) {
      setSlidesPerView(3);
    } else if (window.innerWidth >= 768) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth / slidesPerView;
      sliderRef.current.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
      setCurrentSlide(index);
    }
  };

  const handleNext = () => {
    const nextSlide =
      (currentSlide + 1) % (projects.length - slidesPerView + 1);
    scrollToSlide(nextSlide);
  };

  const handlePrev = () => {
    const prevSlide =
      (currentSlide - 1 + (projects.length - slidesPerView + 1)) %
      (projects.length - slidesPerView + 1);
    scrollToSlide(prevSlide);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, slidesPerView]);

  return (
    <section className="section-spacing">
      <div className="container">
        <h2 className="text-lg text-black uppercase font-bold leading-none">
          Other Commercial Projects
        </h2>

        <div className="mt-5 lg:mt-[60px] relative">
          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / slidesPerView}%` }}>
                <ProjectCard
                  locationName={project.locationName}
                  title={project.title}
                  image={project.image}
                  href="#"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/60 rounded-full p-2 shadow-md z-10 lg:hidden block"
            aria-label="Previous slide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/60 rounded-full p-2 shadow-md z-10 lg:hidden block"
            aria-label="Next slide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
