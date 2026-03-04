"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(165deg,#eef4fb_0%,#f8fbff_48%,#ffffff_100%)] px-4 py-14 sm:px-6 sm:py-20">
      <motion.div
        className="pointer-events-none absolute -inset-16 rotate-[-12deg] opacity-[0.025]"
        animate={{ x: [0, 26, 0], y: [0, 18, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage: "url('/assets/img/logo.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "72px 34px",
          backgroundPosition: "0 0",
        }}
      />

      <motion.div
        className="absolute -top-28 -left-20 h-72 w-72 rounded-full bg-[#5BA6461f] blur-3xl"
        animate={{ x: [0, 22, 0], y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#18355f17] blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center justify-center text-center"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#5BA646]">
          Error 404
        </p>

        <h1 className="mb-2 flex items-end justify-center gap-1 sm:gap-2 text-[62px] font-bold leading-none sm:text-[110px] md:text-[150px] lg:text-[180px] xl:mb-5">
          {["4", "0", "4"].map((digit, idx) => (
            <motion.span
              key={`${digit}-${idx}`}
              className="inline-block bg-[linear-gradient(180deg,#18355F_0%,#29538a_100%)] bg-clip-text text-transparent"
              animate={{ scale: [1, 1.14, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 0.15,
                ease: "easeInOut",
                delay: idx * 0.22,
              }}
            >
              {digit}
            </motion.span>
          ))}
        </h1>

        <h1 className="mb-4 text-2xl font-semibold text-[#18355F] sm:text-4xl md:text-5xl xl:mb-8">
          Page not found
        </h1>
        <p className="mb-4 xl:mb-9 max-w-5xl text-base leading-relaxed text-[#4b5563] sm:text-lg">
          The page you are looking for might have been moved, renamed, or is
          temporarily unavailable.
        </p>

        <div className="flex w-full max-w-md flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto min-w-[165px] items-center justify-center rounded-md bg-[#18355F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#102544]"
          >
            Back to Home
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex w-full sm:w-auto min-w-[165px] items-center justify-center rounded-md border border-[#18355F] px-6 py-3 text-sm font-medium text-[#18355F] transition hover:bg-[#18355f0d]"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
