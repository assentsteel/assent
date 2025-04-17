"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { news} from "../data";
import { assets } from "@/public/assets/assets";
import MoreNews from "./MoreNews";
gsap.registerPlugin(ScrollTrigger);
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const images = [assets.ren1, assets.ren1];
const NewsDetails = ({ }) => {

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const containerRef = useRef(null);

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

  return (
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px] overflow-hidden relative ">
      <div className="container">

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 xxl:gap-[135px] ">
          <div className="lg:w-4/5">
            <div className=" ">

              <div className="relative w-full  ">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onInit={(swiper) => {
                if (typeof swiper.params.navigation === "object") {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              loop
              slidesPerView={1}
              spaceBetween={20}
              className="rounded-xl overflow-hidden"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-[300px] md:h-[400px] lg:h-[570px] object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="absolute bottom-4 right-4 flex gap-2 lg:gap-[30px] z-10">
              <button
                ref={prevRef}
                className="bg-white text-black px-3 py-1 rounded-full w-[48px] h-[48px] hover:bg-secondary group transition flex items-center justify-center"
              >
                <Image
                  src={assets.greenarrow}
                  alt=""
                  width={11}
                  height={18}
                  className="group-hover:brightness-0 group-hover:invert "
                />
              </button>
              <button
                ref={nextRef}
                className="bg-white text-black px-3 py-1 rounded-full w-[48px] h-[48px] hover:bg-secondary group transition flex items-center justify-center"
              >
                <Image
                  src={assets.greenarrow}
                  alt=""
                  width={11}
                  height={18}
                  className="group-hover:brightness-0 group-hover:invert rotate-180"
                />
              </button>
            </div>
          </div>
            </div>
            <div className="flex justify-between items-center mt-4 md:mt-5 mb-4 md:mb-5">
              <p className="text-sm font-[500] text-territory">Jan 19, 2024</p>
              <div className="flex gap-5 lg:gap-10">
                <Image src={assets.share} alt="" />
                <Image src={assets.linkedin} alt="" />
              </div>
            </div>
            <div>
              <h2 className="font-[600] text-lg leading-[1.65] text-primary mb-4 lg:mb-[30px]">Strengthening Bonds, Building Success:  ASSENT STEEL’s Team Outings and Our Commitment to Togetherness</h2>
            </div>
            <div className="mbp10">
            <p>At ASSENT STEEL, we believe that our greatest asset is our people. Our team outings are not just a break from the daily grind; they are a strategic investment in the heart and soul of our organization. These events are designed to reflect our dedication to creating a workplace where employees feel valued, supported, and inspired to reach their full potential. Each outing is thoughtfully planned to align with our mission of fostering a culture of collaboration, innovation, and mutual respect. Whether it’s a day of team-building exercises in the great outdoors, a visit to a local museum to spark creativity, or a hands-on workshop to develop new skills, every activity is chosen with the goal of strengthening the bonds between team members and enhancing their overall well-being.</p>
            <p>We recognize that the benefits of these outings extend far beyond the event itself. By stepping away from the office and engaging in shared experiences, employees gain fresh perspectives, build trust, and develop a deeper understanding of one another’s strengths and personalities. This, in turn, translates into improved teamwork, better problem-solving, and a more harmonious work environment.</p>
            <p>Moreover, our team outings are a celebration of the diverse talents and backgrounds that make ASSENT STEEL such a vibrant and innovative company. We encourage employees from all departments to come together, share ideas, and learn from one another. These interactions not only break down silos but also spark new ideas and approaches that drive our business forward.</p>

            <p>At ASSENT STEEL, we are committed to creating a workplace where employees feel a true sense of belonging. Our team outings are just one of the many ways we demonstrate our appreciation for the hard work and dedication of our team members. By investing in their personal and professional growth, we are not only enhancing their individual experiences but also strengthening the foundation of our organization.</p>
            <p>As we look to the future, we are excited to continue exploring new and innovative ways to bring our teams together. From volunteer initiatives that give back to the community to immersive experiences that challenge and inspire, we are dedicated to creating opportunities for our employees to grow, connect, and thrive.</p>

            <p>At ASSENT STEEL, we are more than just a company—we are a family. And through these shared experiences, we are building a legacy of unity, resilience, and excellence that will continue to drive our success for years to come. Together, we are not just building structures; we are building a brighter future for our employees, our customers, and our community.</p>
                        </div>
          </div>

          <div className="lg:w-1/5 ">
            <div className="flex justify-between mb-5 lg:mb-10">
              <div className="overflow-hidden ">
                <p className="text-md uppercase text-[#595959] font-medium border-b inline-flex border-secondary pb-2 lg:pb-[12px] leading-[1.46] ">
                More news
                </p>
              </div>
            </div>
            <MoreNews  data={news.data}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetails;
