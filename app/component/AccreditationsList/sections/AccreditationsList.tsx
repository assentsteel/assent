"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { Awards } from "@/public/types/Common";

const AccreditationsList = ({ data }: { data: Awards }) => { 
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  useEffect(() => {
    if (selectedPdf) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPdf]);
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[80px] xxl:py-[100px] overflow-hidden relative">
      <div className="container">
        {/* Grid of Awards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
        >
          {data.awards.map((item, index) => (
            <motion.div key={index}>
              <div
                className="relative group overlbl h-full cursor-pointer"
                onClick={() => setSelectedPdf(item.file)} // open PDF
              >
                <figure className="overlayclr">
                  <Image
                    src={item.image}
                    alt=""
                    className="rounded-[15px] w-full object-cover"
                    width={800}
                    height={800}
                  />
                </figure>

                <div className="absolute bottom-0 px-5 pb-5 w-full">
                  <p className="text-md text-white font-[600]">
                    {item.title}
                  </p>
                  <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-full border-b-2 border-white group-hover:border-secondary"></div>
                    <div className="min-w-[30px] min-h-[30px] lg:min-w-[48px] lg:min-h-[48px] bg-secondary rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" fill="none">
                        <path
                          d="M13.8 17.7H3.8v-3.3h10V4.3h3.3v10h10v3.3h-10v10h-3.3v-10Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* PDF Modal */}
       
<AnimatePresence>
          {selectedPdf && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              onClick={() => setSelectedPdf(null)}
            >
              <div
                className="relative w-[90%] md:w-[70%] xl:w-[60%] h-[80%] bg-white rounded-lg shadow-lg overflow-hidden" 
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-4 text-black hover:text-red-600 text-2xl font-bold z-10"
                  onClick={() => setSelectedPdf(null)}
                >
                  &times;
                </button>

                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js" >
                  <Viewer fileUrl={selectedPdf} />
                </Worker>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default AccreditationsList;
