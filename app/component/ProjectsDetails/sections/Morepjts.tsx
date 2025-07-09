"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import useSWR from "swr";
import { Projectswfull } from '@/public/types/Common'; 
import Link from "next/link";


interface PlatformsSectionProps {
  sector: string;
  projectId: string;
}

type ProjectWithCategory = Projectswfull['categories'][number]['projects'][number] & {
  categorySlug: string;
};

const Morepjts: React.FC<PlatformsSectionProps> = ({sector,projectId }) => {
  const containerRef = useRef(null);

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data:fullProjects } = useSWR(`/api/admin/projects`, fetcher)
  const [filteredProjects,setFilteredProjects] = useState<ProjectWithCategory[]>([])

  
  useEffect(() => {
    if (fullProjects) {
      const allProjects = fullProjects.data.categories.flatMap(
        (category: Projectswfull['categories'][number]) =>
          category.projects.map((project) => ({
            ...project,
            categorySlug: category.slug,
          }))
      );
  
      const filtered = allProjects.filter(
        (project: ProjectWithCategory) => project.sector === sector
      );
  
      setFilteredProjects(filtered);
    }
  }, [fullProjects, sector]);

  useEffect(()=>{
    console.log(filteredProjects)
  },[filteredProjects])


  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        width: 100,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Starts when the top of the section is 85% in view
          toggleActions: "play none none none",
        },
      });
    }
  }, []);
  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -30, transition: { duration: 0.4 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };
  return (
    filteredProjects.length > 0 && (<section className="pb-[50px] md:pb-[70px] xl:pb-[100px]    relative  ">
      <div className="container">
        <div className="flex justify-between mb-[20px] lg:mb-10">
          <div className="  ">
          <motion.p
             variants={slideInLeft}
             initial="hidden"
                 whileInView="visible"
             exit="exit"
            className="text-md uppercase text-[#595959] font-medium border-b inline-flex border-secondary pb-[10px] lg:pb-[25px] leading-none "
          >
            More projects
          </motion.p>
        </div>
          <motion.div className="text-center"
             variants={slideInLeft}
             initial="hidden"
                 whileInView="visible"
             exit="exit"
           >
          <Link href={`/projects-list/${filteredProjects[0].categorySlug}`}><button className="border whitespace-nowrap font-[500] border-secondary text-xs text-territory uppercase rounded-full py-[8px] px-[20px]  w-fit">
            View All
          </button></Link>
          </motion.div></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {filteredProjects.slice(0, 4).filter((item: { _id: string; }) => item._id !== projectId).map((item, index) => (
    <Link href={`/projects-details/${item.categorySlug}/${item.slug}`} key={index}>
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative group h-[510px]">
        <figure className="overlayclr">
          <Image
            src={item.thumbnail}
            alt=""
            className="rounded-[15px] w-full object-cover h-full absolute"
            width={500}
            height={500}
          />
        </figure>

        <div className="absolute top-5 right-5 text-white">
          <p className="text-xs font-[600]">{item.sector}</p>
        </div>

        <div className="absolute bottom-0 px-5 pb-5 w-full">
          <p className="text-md text-white font-[600] pr-0 lg:pr-6">
            {item.title}
          </p>

          <div className="flex gap-2 items-center transform opacity-0 group-hover:opacity-100 transition-all duration-500 h-0 group-hover:h-[30px] md:group-hover:h-[48px]">
            <div className="w-full border-b-2 border-white transition-all duration-500 group-hover:border-secondary"></div>

            <div className="min-w-[30px] min-h-[30px] lg:min-w-[48px] lg:min-h-[48px] bg-secondary rounded-full flex items-center justify-center translate-x-[-20px] group-hover:translate-x-0 transition-all duration-500">
              <svg
                stroke="#fff"
                fill="#fff"
                strokeWidth="0"
                viewBox="0 0 320 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  ))}
</div>
      </div>
    </section>)
  );
};

export default Morepjts;
