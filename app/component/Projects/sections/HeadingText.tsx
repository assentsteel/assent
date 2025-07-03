"use client";

import { useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Listbox } from "@headlessui/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
gsap.registerPlugin(ScrollTrigger);
import { useParams } from "next/navigation";

 import { Projectsw } from '@/public/types/Common';

 const HeadingText = ({ data, categoryslug,locationData,sectorData }: { data: Projectsw,categoryslug: string,locationData: { name: string; }[],sectorData: { name: string; }[] }) => { 
  console.log(data)
  const params = useParams();
  // const dropdowns = [
  //   {
  //     label: "Country",
  //     options: [
  //       { value: "", label: "All countries" },
  //       { value: "UAE", label: "UAE" },
  //       { value: "Kuwait", label: "Kuwait" },
  //       { value: "Qatar", label: "Qatar" },
  //       { value: "Kazakhstan", label: "Kazakhstan" },
  //     ],
  //   },
  //   {
  //     label: "Sector",
  //     options: [
  //       { value: "", label: "Sector" },
  //       { value: "airport", label: "Airport" },
  //       { value: "arena/Stadiums", label: "Arena/Stadiums" },
  //       { value: "education", label: "Education" },
  //       { value: "High Rise Tower", label: "High Rise Tower" },
  //       { value: "Leisure Centre", label: "Leisure Centre" },
  //       { value: "Metro Rail - Depots & Stabling Yard", label: "Metro Rail - Depots & Stabling Yard" },
  //       { value: "Metro Rail - Stations", label: "Metro Rail - Stations" },
  //       { value: "Museum/Cultural Centres", label: "Museum/Cultural Centres" },
  //       { value: "Retail/Residential Building", label: "Retail/Residential Building" },
  //       { value: "Shopping Mall", label: "Shopping Mall" },
  //     ],
  //   },
  // ]; 
 

const [selectedValues, setSelectedValues] = useState<{ value: string; label: string; }[]>([
  { value: "All countries", label: "All countries" },
  { value: "Sector", label: "Sector" },
  { value: "", label: "" },
]); 
interface ProjectItem {
  banner: string;
  bannerAlt: string;
  pageTitle: string;
  description: string;
  title: string;
  slug: string;
  sector: string;
  location: string;
  employer: string;
  contractor: string;
  consultant: string;
  scope: string;
  steelTonnage: string;
  thumbnailAlt: string;
  metaTitle: string;
  metaDescription: string;
  images: string[];
  _id: string;
  thumbnail: string;
}

const [search,setSearch] = useState<{ value: string; label: string }>({value:"",label:""})
const [filteredResults, setFilteredResults] = useState<ProjectItem[]>(data.data); 
const [visibleCount, setVisibleCount] = useState(8);
const handleLocationChange = (value: { value: string; label: string }) => {
  const updated = [
    value,
    selectedValues[1],
    search,
  ];
  console.log("updated",updated)
  setSelectedValues(updated);
  applyFilters(updated);
  // console.log(updated);
};

const handleSectorChange = (value: { value: string; label: string }) => {
  const updated = [
    selectedValues[0],
    value,
    search,
  ];
  console.log("updated",updated)
  setSelectedValues(updated);
  applyFilters(updated);
  // console.log(updated);
};

const handleSearchChange = (value: { value: string; label: string }) => {
  setSearch(value)
  const updated = [
    selectedValues[0],
    selectedValues[1],
    value,
  ];
  console.log("updated",updated)
  setSelectedValues(updated);
  applyFilters(updated);
  // console.log(updated);
};

const applyFilters = (filters: { value: string; label: string }[]) => {
  console.log(filters)
  const [country, sector,search] = filters;
  const filtered = data;

  const results = filtered.data.filter((item) => {
    const matchCountry = country.value != "All countries"
      ? item.location?.toLowerCase() === country.value.toLowerCase()
      : true;

    const matchSector = sector.value != "Sector"
      ? item.sector?.toLowerCase() === sector.value.toLowerCase()
      : true;

    const matchSearch = search.value
      ? item.title.toLowerCase().includes(search.value.toLowerCase())
      : true;

    return matchCountry && matchSector && matchSearch;
  });

   
  setFilteredResults(results);
  setVisibleCount(8);
};
const clearFilters = () => {
  setFilteredResults(data.data);
  setSelectedValues([
    { value: "All countries", label: "All countries" },
    { value: "Sector", label: "Sector" },
    { value: "", label: "" },
  ]);
  setSearch({value:"",label:""})
};
const visibleItems = filteredResults.slice(0, visibleCount);

const handleLoadMore = () => {
  setVisibleCount((prev) => prev + 8);
};




  return (
    <>
      <section className="relative">
          <div
            className="container"
          >
            <div className="lg:flex gap-20 mb-5 lg:mb-10 pb-5 lg:pb-10 border-b border-[#00000015]">
              <div className="md:flex w-full items-center uppercase text-md font-[500] gap-3 lg:gap-10 mb-5 lg:mb-0">
                <p>Filter</p>

                
                  <div className="relative w-full my-3 lg:my-0">
                    <Listbox
                      value={selectedValues[0].value}
                      onChange={(val) => handleLocationChange({value:val,label:val})}
                    >
                      <div className="relative">
                        <Listbox.Button className="uppercase w-full text-left text-xs text-primary bg-transparent border-0 border-b border-black py-2 pr-6 appearance-none focus:outline-none focus:ring-0 focus:border-black relative">
                          {selectedValues[0].value}
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                            <ChevronUpDownIcon className="h-4 w-4" />
                          </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-10 left-0 w-full bg-white border mt-1 shadow-lg rounded-md overflow-hidden">
                          {locationData.map((option) => (
                            <Listbox.Option
                              key={option.name}
                              value={option.name}
                              className={({ active, selected }) =>
                                `cursor-pointer select-none px-4 py-2 text-xs uppercase text-primary ${
                                  active ? "bg-secondary text-white" : ""
                                } ${selected ? "font-semibold" : ""}`
                              }
                            >
                              {({ selected }) => (
                                <span className="flex items-center justify-between">
                                  {option.name}
                                  {selected && <CheckIcon className="w-4 h-4 ml-2 text-white" />}
                                </span>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>


                  <div className="relative w-full my-3 lg:my-0">
                    <Listbox
                      value={selectedValues[1].value}
                      onChange={(val) => handleSectorChange({value:val,label:val})}
                    >
                      <div className="relative">
                        <Listbox.Button className="uppercase w-full text-left text-xs text-primary bg-transparent border-0 border-b border-black py-2 pr-6 appearance-none focus:outline-none focus:ring-0 focus:border-black relative">
                          {selectedValues[1].value}
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                            <ChevronUpDownIcon className="h-4 w-4" />
                          </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-10 left-0 w-full bg-white border mt-1 shadow-lg rounded-md overflow-hidden">
                          {sectorData.map((option) => (
                            <Listbox.Option
                              key={option.name}
                              value={option.name}
                              className={({ active, selected }) =>
                                `cursor-pointer select-none px-4 py-2 text-xs uppercase text-primary ${
                                  active ? "bg-secondary text-white" : ""
                                } ${selected ? "font-semibold" : ""}`
                              }
                            >
                              {({ selected }) => (
                                <span className="flex items-center justify-between">
                                  {option.name}
                                  {selected && <CheckIcon className="w-4 h-4 ml-2 text-white" />}
                                </span>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>


                <div className="relative w-full flex items-center mb-2 md:mb-0 mt-2 md:mt-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    className="absolute"
                  >
                    <path
                      d="M11.1235 20.0516C15.9379 20.0516 19.8407 16.1015 19.8407 11.2289C19.8407 6.35629 15.9379 2.40625 11.1235 2.40625C6.30909 2.40625 2.40625 6.35629 2.40625 11.2289C2.40625 16.1015 6.30909 20.0516 11.1235 20.0516Z"
                      stroke="#595959"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M17.4141 17.3203L23.6072 23.5884"
                      stroke="#595959"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search.value}
                    onChange={(e) => handleSearchChange({value:e.target.value,label:e.target.value})}
                    className="uppercase px-1 ps-8 appearance-none bg-transparent border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-black text-primary text-xs py-2 pr-6 w-full"
                  />
                </div>
              </div>

              <button onClick={clearFilters} className="border whitespace-nowrap font-[500] border-secondary text-xs text-territory uppercase rounded-full py-[8px] px-[20px]">
                Clear filter
              </button>
              <div className="hidden">{categoryslug}
                
              </div>
            </div>
          </div>
        </section>
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px]    relative  ">
      <div className="container">
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 "
        >
          {visibleItems.map((item, index) => (
    <div key={index}>

       <motion.div key={index}  >
       <motion.div
className="relative group"
whileHover={{ scale: 1.015 }}
transition={{ type: "spring", stiffness: 300 }}
> 

        <Link href={`/projects-details/${params.slug}/${item.slug}`}> 
        <figure className="overlayclr">
          <Image
            src={item.thumbnail}
            alt={item.thumbnailAlt}
            className="rounded-[15px]   w-full object-cover"
            priority
            width={600}
            height={400}
          />
        </figure>
        <div className="absolute top-5 right-5   text-white">
          <p className="text-xs font-[600]">{ item.sector}</p>
        </div>
        <div className="absolute bottom-0 px-5 pb-5 w-full">
          <p className="text-md text-white font-[600]  pr-0 lg:pr-6 ">
            {item.title}
          </p>
          <div className="flex gap-2 items-center transform opacity-0 group-hover:opacity-100  transition-all duration-500 h-0 group-hover:h-[30px] md:group-hover:h-[48px]">
          <div className="w-full border-b-2 border-white transition-all duration-500 group-hover:border-secondary"></div>
          <div className="min-w-[30px] min-h-[30px] lg:min-w-[48px] lg:min-h-[48px] bg-secondary rounded-full flex items-center justify-center translate-x-[-20px] group-hover:translate-x-0  transition-all duration-500">
            <svg
              stroke="#fff"
              fill="#fff"
              strokeWidth="0"
              viewBox="0 0 320 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
            </svg>
          </div>
        </div>

          </div>
        </Link>
      </motion.div>
    </motion.div>

    </div>
          ))}
        </motion.div>
        <div className="text-center">
        {visibleCount < filteredResults.length && (
  <button
    onClick={handleLoadMore}
    className="border whitespace-nowrap font-[500] border-secondary text-xs text-territory uppercase rounded-full py-[8px] px-[20px] mt-5 md:mt-[60px] w-fit"
  >
    Load More
  </button>
)}
       </div>
      </div>
    </section>
    </>
  );
};

export default HeadingText;
