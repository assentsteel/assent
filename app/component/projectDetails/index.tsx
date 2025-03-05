"use client"

import React, { useEffect } from "react";
import HeroInner from "../common/Banner/HeroInner";
import Gallery from "./gallery";
import OtherProjects from "./otherProjects";
import { useSearchParams,useParams } from "next/navigation";
import useSWR from "swr";
import { IndiProjectType } from "@/app/types/IndiProjectType";


export default function Index() {

  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const {id} = useParams()

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }:{data:IndiProjectType} = useSWR(`/api/admin/projects/byid?id=${id}`, fetcher)


  useEffect(()=>{
    console.log(data)
  },[data])

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/" },
    { label: `${type} Projects`, href: "/" },
    { label: `${data?.data.name}`, href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];



  return (
    <>
      <HeroInner
        imageSrc="/assets/img/projects-details/banner2.jpg"
        title={data?.data.name}
        breadcrumbs={breadcrumb}
      />

      <Gallery data={data}/>
      <OtherProjects />
    </>
  );
}
