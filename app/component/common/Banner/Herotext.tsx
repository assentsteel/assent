"use client";


interface HeroSectionProps {
  breadcrumbs: { label: string; href: string }[];
  title: string;
}

const Herotext: React.FC<HeroSectionProps> = ({
title,
  breadcrumbs,
}) => {


  return (
     <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative ">
         <div className="container">
           <div className=" ">
              <h1 className="text-xxl font-[600] text-territory mb-3 lg:mb-10 leading-[1]">{title}</h1>
              <ul className="flex items-center flex-wrap gap-2 ">
            {breadcrumbs.map((breadcrumb, index) => (
              <li
                key={index}
                className=" text-territory  text-xs font-medium uppercase flex items-center gap-2"
                style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>

                {breadcrumb.href ? (
                  <a
                    href={breadcrumb.href}
                    className={` font-[400] text-xs uppercase`}
                    style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
                    {breadcrumb.label}
                  </a>
                ) : (
                  <span
                    style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
                    className={`font-[600] text-xs  ${
                      index === breadcrumbs.length - 1 ? " " : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: breadcrumb.label }}
                  />
                )}
                {index < breadcrumbs.length - 1 &&   <svg stroke="#5BA646" fill="#5BA646" strokeWidth="0" viewBox="0 0 320 512" height="12px" width="7px" xmlns="http://www.w3.org/2000/svg"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg> }
              </li>
            ))}
          </ul>
           </div>
         </div>
       </section>
  );
};

export default Herotext;
