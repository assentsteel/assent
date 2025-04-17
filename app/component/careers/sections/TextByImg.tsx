"use client";
 ;
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef,useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  title: string;
  paragraphs: string[];
  image: string | StaticImageData;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}

const TextByImg: React.FC<PlatformsSectionProps> = ({data
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
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
    <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative ">
      <div className="container">
        <div><h2 className="text-xl  text-primary font-[600] leading-[1.2] mb-4 lg:mb-7">Build Your Future with Assent Steel</h2>
        <div className="mb-4 lg:mb-[60px]"><p>Join ASSENT STEEL and take your career to new heights. We are committed to fostering talent, innovation, and excellence in the
steel industry. Whether you&apos;re an experienced professional or just starting out, we offer opportunities for growth, learning,
and success in a dynamic work environment. Build your future with us and be part of something strong.</p></div></div>
        <div className="lg:flex lg:items-center xxl:items-start">

        <div className="w-full lg:w-[51%] pr-0 lg:pr-[35px]">

          {data.map((item) => (
            <div className=" " key={item.id}>
              <figure className="image-wrapper h-full ">
                <Image src={item.image} alt="A beautiful view" className="rounded-[15px] w-full object-cover" />
              </figure>
            </div>
          ))}
          </div>


          <div className="w-full lg:w-[49%] pl-0 lg:pl-[35px] mt-6 lg:mt-0">
  {[
    'Sustainability & Ethics',
    'Strong Core Values',
    'Focus on Employee Well-being',
    'Opportunities for Professional Development',
    'Innovation & Growth-Driven Culture',
  ].map((title, index) => (
    <div
      key={index}
      className="group border-b first:border-t border-[#00000015] py-5  lg:py-[20px] xxl:py-[30px] group transition-all duration-300 "
      onMouseEnter={() => setActiveIndex(index)}
    >
      <h3 className="font-[600] text-md text-primary group-hover:text-secondary transition-all duration-300 cursor-pointer leading-[1] ">
        {title}
      </h3>
      <div className=" transition-all duration-500 ">
        <p   className={`transition-all duration-500 overflow-hidden ${
          activeIndex === index
            ? 'max-h-[200px] opacity-100 mt-5'
            : 'max-h-0 opacity-0 mt-0 '
        }`}>
        Assent Steel is dedicated to integrating environmental and social considerations into its operations. The company aligns its practices with the UN&apos;s Sustainable Development Goals.
      </p>
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
    </section>
  );
};

export default TextByImg;
