"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import { Boxgd } from "@/public/types/Common";
import CountUp from "react-countup";

const Boxgds = ({ data, maxchwidth, colnum }: { data: Boxgd; maxchwidth?: string; colnum?: number }) => {
    return (
        <section className="bg-primary   relative">
            <div className="container mx-auto  ">
                <div className="flex flex-col py-[50px]  lg:py-[100px]  ">
                    <div className="mb-5 lg:mb-[60px]">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                            variants={{
                                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 1, ease: "easeOut" },
                                }, // Slide up and fade in
                            }}
                        >
                            <h2
                                className="text-xl text-white font-[600] leading-[1.2] mb-0"
                                style={{ maxWidth: maxchwidth ? `${maxchwidth}ch` : undefined }}
                            >
                                {data.title}
                            </h2>
                        </motion.div>
                    </div>

                    <div>
                        <motion.div
                            className={`grid grid-cols-1    md:grid-cols-2 xl:grid-cols-3 xl:gap-0  ${
                                colnum ? `xxl:grid-cols-${colnum}` : "xxl:grid-cols-4"
                            } `}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                            variants={{
                                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 1, ease: "easeOut" },
                                }, // Slide up and fade in
                            }}
                        >
                            {/* Item 1 */}
                            {data.items.map((expertise, index) => (
                                <div key={index} className="custom-grid group">
                                    <div className="flex relative z-10 bg-primary bgd  flex-col justify-between  gap-8 md:gap-0  px-5 py-[50px] xl:py-[100px] group-hover:lg:py-[30px] transition-all duration-500 md:h-[400px] lg:h-[408px]   lg:p-10  ">
                                        {/* Image Wrapper */}
                                        <div className="align-center   flex h-[64px] w-[64px] rounded-[5px] justify-center   transition-colors duration-500    ">
                                            <Image
                                                src={expertise.logo}
                                                alt={expertise.logoAlt}
                                                className="fltrcls transition duration-500  "
                                                width={64}
                                                height={64}
                                            />
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <h3 className="text-xl font-semibold titlesp transition-colors duration-300 text-white group-hover:text-primary leading-[1.2]">
                                                {expertise.title}{" "}
                                                {(() => {
                                                    const raw = expertise.number; // e.g. "84,000 M²/Month"
                                                    const numberPart = raw.match(/[\d,.]+/)?.[0] || "0";
                                                    const suffix = raw.replace(numberPart, "").trim();

                                                    return (
                                                        <span className="flex items-baseline gap-2">
                                                            <CountUp
                                                                start={0}
                                                                end={Number(numberPart.replace(/,/g, ""))}
                                                                duration={2}
                                                                enableScrollSpy
                                                                scrollSpyOnce
                                                                preserveValue
                                                                separator=","
                                                            />
                                                            <span>{suffix}</span>
                                                        </span>
                                                    );
                                                })()}
                                            </h3>
                                            <p className="text-lg font-semibold cntsmd hided-content  overflow-hidden pt-2 text-white group-hover:text-primary  ">
                                                {expertise.value}
                                            </p>

                                            <div className="overflow-hidden">
                                                {/* {expertise.description && (
              <ul className="list-disc list-inside marker:mr-1 text-md font-normal cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white group-hover:text-primary opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100">
                {expertise.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )} */}
                                                {expertise.description && (
                                                    <div
                                                        className="insts pl-2 list-disc list-inside marker:mr-1 text-md font-normal cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white group-hover:text-primary opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100"
                                                        dangerouslySetInnerHTML={{ __html: expertise.description }}
                                                    ></div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Boxgds;
