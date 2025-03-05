"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ButtonWithIcon from "../common/Buttons/ButtonWithIcon";
import useSWR from "swr";
import { departments } from "@/app/(admin)/admin/(auth)/careers/departmentData";
import { CareerType } from "@/app/types/CareerType";

export default function OpenPositions() {
  const [open, setOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("Department");

  const handleSelect = (dept: string) => {
    setFilteredData(()=>(
      data?.data.filter((item:{department:string})=>(
        item.department.toLowerCase() == dept.toLowerCase()
      ))
    ))
    setSelectedDept(dept); // Update selected department
    setOpen(false); // Close dropdown
  };


  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }:{data:CareerType} = useSWR(`/api/admin/careers`, fetcher)
  const [filteredData,setFilteredData] = useState<{title:string;department:string;location:string;applyLink:string;type:string}[]>([])


  useEffect(()=>{
    setFilteredData(data?.data)
  },[data])


  return (
    <div>
      <section className="my-[100px]">
        <div className="container">
          <div className="flex justify-between items-center border-b-[1px] border-[#1E1E1E] pb-[12px] mb-[60px]">
            <div className="md:col-span-8">
              <h3 className="text-black lg:text-[32px] text-[27px] font-[700] uppercase">
                Open positions
              </h3>
            </div>
            <div className="md:col-span-4 relative">
              <div className="">
                <button
                  className="w-full flex justify-between items-center gap-2 px-4 py-2 uppercase "
                  onClick={() => setOpen(!open)}>
                  <span>{selectedDept}</span>
                  <ChevronDown className="h-5 w-5 text-gray-500 " />
                </button>

                {open && (
                  <ul className="absolute w-[230px] mt-2 bg-white border rounded-lg shadow-lg z-10 ">
                    {departments.map((dept,index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer uppercase"
                        onClick={() => handleSelect(dept.title)}>
                        {dept.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          {filteredData?.map((job:{title:string;department:string;type:string;location:string;applyLink:string}, index) => (
            <div key={index} className="w-full">
              <div className="grid lg:grid-cols-2 gap-x-6 items-center  w-full">
                <div className="grid lg:grid-cols-2 items-center   w-full">
                  <div className="designation ">
                    <h3 className="text-[22px] font-semibold ">{job.title}</h3>
                  </div>
                  <div className="departments lg:pl-[100px]">
                    <p className="text-[16px]  uppercase">{job.department}</p>
                  </div>
                </div>

                <div className="sm:flex items-right lg:mt-0 mt-7 w-full">
                  <div className="locations w-full flex lg:justify-end space-x-3">
                    <span className="text-[18px] text-black/60 font-[400] px-[16px] py-[4px] bg-black/5 rounded-custom">
                      {job.type}
                    </span>
                    <span className="text-[18px] text-black/60 font-[400] px-[16px] py-[4px] bg-black/5 rounded-custom">
                      {job.location}
                    </span>
                  </div>
                  <div className="applybtm w-full flex justify-end">
                    <ButtonWithIcon link={job.applyLink} buttonText="Apply Now" />
                  </div>
                </div>
              </div>

              {/* HR Line After Each Job */}

              <hr className="my-[32px] w-full border-t border-dashed border-gray-400" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
