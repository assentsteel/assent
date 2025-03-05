import Image from "next/image";
import GalleryCard from "./galleryCard";
import { IndiProjectType } from "@/app/types/IndiProjectType";
import parse from 'html-react-parser'

const Gallery = ({data}:{
  data:IndiProjectType
}) => {

  return (
    <section className="section-spacing mb-0">
      <div className="container">
        <div className="grid lg:grid-cols-2 xl:grid-cols-12">
          <div className="xl:col-span-5 xl:pr-[100px] lg:pr-[60px]  ">
            <div className="bg-[#F2F2F2] md:px-[60px] md:pt-[60px] md:pb-[30px] px-8 pt-8 pb-6 rounded-custom">
              {data?.data?.specifications.map((sector, index) => (
                <div
                  key={index}
                  className="grid lg:grid-cols-12 lg:gap-6 gap-2  lg:mb-[30px] mb-4 border-b border-[#1E1E1E]/30 lg:pb-[32px] pb-3 items-center ">
                  <div className="col-span-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src={sector.logo}
                        alt={sector.name}
                        width={20}
                        height={20}
                      />
                      <p className="text-primary text-[16px] font-[800] uppercase">
                        {sector.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <h4 className="xl:text-[22px] text-[20px] text-black/75 font-[400]">
                      {sector.value}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-7 text-black/60  text-[18px] lg-mb-0 lg:mt-0 mt-6 mb-6 leading-[25.2px] font-[400]">
            {/* <p className="text-black/60  text-[18px] lg-mb-0 lg:mt-0 mt-6 mb-6 leading-[25.2px] font-[400] ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit.
            </p> */}
            {parse(data?.data.description || "")}
            <h3 className="text-lg text-black font-bold mb-[40px] mt-[60px] uppercase">
              Gallery
            </h3>
            <GalleryCard data={data?.data.images}/>
            {/* <Image
              src="/assets/img/projects-details/gallery.jpg"
              alt=""
              width={500}
              height={500}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
