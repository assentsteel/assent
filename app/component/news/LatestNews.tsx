"use client"

import ImageCard from "./ImageCard";
import Image from "next/image";
import SecHr from "../common/SecDivider/SecHr";
import ImageContentCard from "./ImageContentCard";
import ImageCol from "./ImageCol";
import useSWR from 'swr'
import { useEffect } from "react";
import { NewsType } from "@/app/types/NewsType";
import moment from "moment";

// const latestNewsData = [
//   {
//     date: "14 Nov 2024",
//     image: "/assets/img/news/n2.jpg",
//     title:
//       "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
//     subTitle: "Project Updates, Residential",
//   },
//   {
//     date: "14 Nov 2024",
//     image: "/assets/img/news/n3.jpg",
//     title:
//       "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
//     subTitle: "Project Updates, Residential",
//   },
// ];
// const prevNewsData = [
//   {
//     date: "14 Nov 2024",
//     image: "/assets/img/news/n4.jpg",
//     title:
//       "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
//     subTitle: "Project Updates, Residential",
//   },
//   {
//     date: "14 Nov 2024",
//     image: "/assets/img/news/n5.jpg",
//     title:
//       "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
//     subTitle: "Project Updates, Residential",
//   },
//   {
//     date: "14 Nov 2024",
//     image: "/assets/img/news/n-9.jpg",
//     title:
//       "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
//     subTitle: "Project Updates, Residential",
//   },
//   {
//     date: "14 Nov 2024",
//     image: "/assets/img/news/n6.jpg",
//     title:
//       "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
//     subTitle: "Project Updates, Residential",
//   },
//   {
//     date: "14 Nov 2024",
//     image: "/assets/img/news/n7.jpg",
//     title:
//       "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
//     subTitle: "Project Updates, Residential",
//   },
//   {
//     date: "14 Nov 2024",
//     image: "/assets/img/news/n8.jpg",
//     title:
//       "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
//     subTitle: "Project Updates, Residential",
//   },
// ];
const LatestNews = () => {

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }:{data:NewsType} = useSWR(`/api/admin/news`, fetcher)

  const latestNews = data && data.data.filter((item)=>item.type=="news").sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const prevNewsData = data && data.data.filter((item)=>item.type=="news").sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  useEffect(()=>{
    console.log(latestNews)
  },[latestNews])

  return (
    <>
      <section className="section-spacing">
        <div className="container">
          <div className="mb-5 lg:mb-[60px]">
            <SecHr title="Latest News" />
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-12 gap-[32px] items-center mt-5 lg:mt-[60px] ">
            <div className="xl:col-span-6 h-full">
              <ImageCard
                date={latestNews && moment(latestNews[0].date).format('D MMM YYYY')}
                image={latestNews && latestNews[0].images[0]}
                title={latestNews && latestNews[0].title}
                subTitle={latestNews && latestNews[0].tags}
                _id={latestNews && latestNews[0]._id}
              />
            </div>
            <div className="xl:col-span-6 h-full">
              <div className="flex flex-col gap-[40px]">
                {latestNews && latestNews.slice(1,3).map((latestnews, index) => {
                  return <ImageContentCard key={index} {...latestnews} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F2F2F2] py-[100px]">
        <div className="container">
          <div className="mb-5 lg:mb-[60px]">
            <SecHr title="Previous News" />
          </div>
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-[32px] items-center ">
            {prevNewsData && prevNewsData.slice(3).map((news, index) => (
              <ImageCol key={index} {...news} />
            ))}
          </div>
          <div className="border-b border-[#1E1E1E]/30 lg:pt-[80px]">
            <div className="flex items-center justify-center  pb-[20px] cursor-pointer ">
              <p className="text-[#1E1E1E] text-[22px] font-[500]">More News</p>
              <Image
                src="/assets/img/projects/down-arrow.svg"
                alt="Arrow Icon"
                width={18}
                height={18}
                className="ml-2 "
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LatestNews;
