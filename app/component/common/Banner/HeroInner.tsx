// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { usePathname } from "next/navigation";

// interface HeroSectionProps {
//   imageSrc: string;
//   title: string;
//   breadcrumbs: { label: string; href: string }[];
// }

// const HeroInner: React.FC<HeroSectionProps> = ({
//   imageSrc,
//   title,
//   breadcrumbs,
// }) => {
//   const pathname = usePathname();

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.3 },
//     },
//   };

//   const textVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: "easeOut" },
//     },
//   };
//   const textVariantsleft = {
//     hidden: { opacity: 0, x: -20 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.8, ease: "easeOut" },
//     },
//   };

//   return (
//     <section
//       className={
//         pathname == "/our-team"
//           ? "relative w-full overflow-hidden ovrbanner"
//           : "relative w-full md:h-[500px] h-[400px] overflow-hidden  ovrbanner  xxl:h-[500px]"
//       }
//     >
//       <div className="relative w-full h-full">
//         <div className="overlay absolute bottom-0 w-full h-1/3   z-[1]"></div>
//         {pathname.startsWith("/sustainability") && (
//           <div className="absolute inset-0 bg-black/20 z-[1]"></div>
//         )}
//         {pathname == "/our-team" && (
//           <Image
//             className="w-full bottom-0"
//             src={imageSrc}
//             width={1500}
//             height={500}
//             objectFit={"contain"}
//             alt={title}
//             priority
//           />
//         )}
//         {pathname !== "/our-team" && (
//           <figure className=" relative w-screen  h-full overflow-hidden">
//             <Image
//               className="w-full h-full"
//               src={imageSrc}
//               fill
//               objectFit={"cover"}
//               alt={title}
//               priority
//             />
//           </figure>
//         )}

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           variants={containerVariants}
//           className="absolute inset-0 flex flex-col justify-end items-start text-left z-[2] container "
//         >
//           <motion.h1
//             variants={textVariants}
//             className="text-white text-xxl leading-none  font-[600] mb-5 lg:mb-9"
//           >
//             <span>
//               {pathname === "/about" ||
//               pathname === "/our-team" ||
//               pathname === "/awards-and-accreditations" ||
//               pathname.startsWith("/projects/")
//                 ? ""
//                 : title && title}
//             </span>
//           </motion.h1>
//           <motion.div variants={textVariantsleft}>
//             {pathname !== "/our-team" && (
//               <ul className="flex items-center flex-wrap gap-2 mb-5 lg:mb-[70px]">
//                 {breadcrumbs.map((breadcrumb, index) => (
//                   <li
//                     key={index}
//                     className=" text-white  text-xs font-medium uppercase flex items-center gap-2"
//                     style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
//                   >
//                     {/* <span
//               className="font-[800] text-primary"
//               style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
//               {" "}
//               {title}
//                </span> */}
//                     {breadcrumb.href ? (
//                       <a
//                         href={breadcrumb.href}
//                         className={` font-[400] uppercase`}
//                         style={{
//                           fontFamily: "var(--font-urbanist), sans-serif",
//                         }}
//                       >
//                         {breadcrumb.label}
//                       </a>
//                     ) : (
//                       <span
//                         style={{
//                           fontFamily: "var(--font-urbanist), sans-serif",
//                         }}
//                         className={`font-[600]   ${
//                           index === breadcrumbs.length - 1 ? " " : ""
//                         }`}
//                         dangerouslySetInnerHTML={{ __html: breadcrumb.label }}
//                       />
//                     )}
//                     {index < breadcrumbs.length - 1 && (
//                       <svg
//                         stroke="#5BA646"
//                         fill="#5BA646"
//                         strokeWidth="0"
//                         viewBox="0 0 320 512"
//                         height="1em"
//                         width="1em"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
//                       </svg>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroInner;

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeroSectionProps {
    imageSrc: string;
    title: string;
    breadcrumbs: { label: string; href: string }[];
}

const HeroInner: React.FC<HeroSectionProps> = ({ imageSrc, title, breadcrumbs }) => {
    console.log(breadcrumbs, "bred");
    const pathname = usePathname();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };
    const textVariantsleft = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section
            className={
                pathname == "/our-team"
                    ? "relative w-full ovrbanner"
                    : "relative w-full md:h-[500px] h-[400px] ovrbanner xxl:h-[500px]"
            }
        >
            {/* IMAGE AREA (keeps overflow-hidden) */}
            <div className="relative w-full h-full overflow-hidden z-0">
                <div className="overlay absolute bottom-0 w-full h-1/3 z-[1] pointer-events-none"></div>

                {pathname.startsWith("/sustainability") && (
                    <div className="absolute inset-0 bg-black/20 z-[1] pointer-events-none"></div>
                )}

                {pathname == "/our-team" && (
                    <Image
                        className="w-full bottom-0"
                        src={imageSrc}
                        width={1500}
                        height={500}
                        objectFit={"contain"}
                        alt={title}
                        priority
                    />
                )}

                {pathname !== "/our-team" && (
                    <figure className="relative w-screen h-full overflow-hidden">
                        <Image className="w-full h-full" src={imageSrc} fill objectFit={"cover"} alt={title} priority />
                    </figure>
                )}

                {/* TITLE OVER IMAGE (UNCHANGED) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                    className="absolute inset-0 flex flex-col justify-end items-start text-left z-[2] container"
                >
                    <motion.h1 variants={textVariants} className="text-white text-xxl leading-none font-[600] mb-5 lg:mb-9">
                        <span>
                            {pathname === "/about" ||
                            pathname === "/our-team" ||
                            pathname === "/awards-and-accreditations" ||
                            pathname.startsWith("/projects/")
                                ? ""
                                : title && title}
                        </span>
                    </motion.h1>
                </motion.div>
            </div>

            {/* ✅ BREADCRUMB BELOW IMAGE (10px GAP) */}
            {pathname !== "/our-team" && (
                <motion.div
                    variants={textVariantsleft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="container mt-[10px] relative z-[3]"
                >
                    <ul className="flex items-center flex-wrap gap-2 mb-5 lg:mb-[70px] text-gray-800">
                        {breadcrumbs.map((breadcrumb, index) => (
                            <li
                                key={index}
                                className="text-xs font-medium capitalize flex items-center gap-2"
                                style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
                            >
                                {breadcrumb.href ? (
                                    <Link
                                        href={breadcrumb.href}
                                        className="font-[400] capitalize cursor-pointer"
                                        style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
                                    >
                                        {breadcrumb.label}
                                    </Link>
                                ) : (
                                    <span
                                        style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
                                        className={index === breadcrumbs.length - 1 ? "font-[600]" : "font-[400]"}
                                        dangerouslySetInnerHTML={{ __html: breadcrumb.label }}
                                    />
                                )}

                                {index < breadcrumbs.length - 1 && (
                                    <svg
                                        stroke="#5BA646"
                                        fill="#5BA646"
                                        strokeWidth="0"
                                        viewBox="0 0 320 512"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
                                    </svg>
                                )}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </section>
    );
};

export default HeroInner;
