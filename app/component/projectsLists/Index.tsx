"use client"

import React, { useEffect } from "react";

import ProjectList from "./ProjectList";
import HeroSection from "../common/Banner/Hero";
import Sectors from "./Sectors";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { ProjectType } from "@/app/types/ProjectType";

export default function Index() {
  
  const {type} = useParams()

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data:projectData }:{data:ProjectType} = useSWR(`/api/admin/projects`, fetcher)

  const filteredData = projectData?.data.filter((item)=>(item.type==type))

  useEffect(()=>{
    console.log(filteredData)
  },[filteredData])

  return (
    <>
      <HeroSection
        imageSrc="/assets/img/projects/banner.jpg"
        title={`${type} Projects`}
        breadcrumb="Projects /"
      />

      {filteredData && <ProjectList data={filteredData} type={type ?? ""}/>}
      <Sectors />
    </>
  );
}
