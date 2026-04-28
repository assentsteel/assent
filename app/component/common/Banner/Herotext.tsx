"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { slideInLeft, slideInTop } from "../../common/MotionAnimation";

interface HeroSectionProps {
    breadcrumbs: { label: string; href: string }[];
    title: string;
    blogPage?: boolean;
}

const Herotext: React.FC<HeroSectionProps> = ({ title, breadcrumbs, blogPage }) => {
    const pathName = usePathname();

    return (
        <section className={`overflow-hidden relative ${blogPage ? 'pt-[30px] md:pt-[70px] xl:pt-[80px] xxl:pt-[100px] pb-0     ' : 'py-[30px] md:py-[70px] xl:py-[80px] xxl:py-[100px]   '}`}>
            <div className="container">
                <div className=" ">
                    {pathName !== "/steel-blasting-painting-fire-proofing" && (
                        <motion.h1
                            variants={slideInLeft}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="text-xxl font-[600] text-territory mb-4 lg:mb-10 leading-[1.2]"
                        >
                            {title}
                        </motion.h1>
                    )}
                    <motion.ul
                        className="flex items-center flex-wrap gap-2 "
                        variants={slideInTop}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {breadcrumbs.map((breadcrumb, index) => (
                            <li
                                key={index}
                                className=" text-territory  text-xs font-medium uppercase flex items-center gap-2"
                                style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
                            >
                                {breadcrumb.href ? (
                                    <a
                                        href={breadcrumb.href}
                                        className={` font-[400] text-xs uppercase`}
                                        style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
                                    >
                                        {breadcrumb.label}
                                    </a>
                                ) : (
                                    <span
                                        style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
                                        className={`font-[600] text-xs  ${index === breadcrumbs.length - 1 ? " " : ""}`}
                                        dangerouslySetInnerHTML={{ __html: breadcrumb.label }}
                                    />
                                )}
                                {index < breadcrumbs.length - 1 && (
                                    <svg
                                        stroke="#5BA646"
                                        fill="#5BA646"
                                        strokeWidth="0"
                                        viewBox="0 0 320 512"
                                        height="12px"
                                        width="7px"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
                                    </svg>
                                )}
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </div>
        </section>
    );
};

export default Herotext;
