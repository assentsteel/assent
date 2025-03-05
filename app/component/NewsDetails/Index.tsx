"use client"

import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import parse from 'html-react-parser'
import moment from 'moment';
import shareIcon from '../../../public/assets/img/news-details/share-icon.svg'
import { IndiNews } from '@/app/types/IndiNews';

const NewsDetails = () => {

  const { id } = useParams()

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }: { data: IndiNews } = useSWR(`/api/admin/news/byid?id=${id}`, fetcher)

  useEffect(() => {
    console.log(data?.data.description.split('</p><p>'))
  }, [data])

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };



  return (
    <div className='container flex flex-col gap-5'>
      <motion.p
        variants={textVariants}
        className="text-white/50 lg:pt-[160px] pt-[100px] text-[16px] font- uppercase"
        style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
        Home / News Details
        <span
          className="font-bold text-primary"
          style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
          {" "}

        </span>
      </motion.p>

      <section className='flex flex-col gap-10 mb-10'>

        <h1 className='text-[50px] font-[900]'>{data?.data.title}</h1>
        <div className='w-full h-96 relative'>
          <Image src={data?.data?.images[0]} alt='cover-image' className='object-cover w-full h-full absolute object-center' width={500} height={500} />
        </div>

        <div className='grid grid-cols-6 gap-20'>
          <div className='p-14 bg-[#F2F2F2] col-span-2 rounded-xl h-fit'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-6'>
                <label className='text-[#FE6601] uppercase font-[800]'>POSTED ON</label>
                <p>{moment(data?.data.date).format('D MMM YYYY')}</p>
                <div><hr></hr></div>
              </div>
              <div className='flex flex-col gap-6'>
                <label className='text-[#FE6601] uppercase font-[800]'>TAGS</label>
                <div className="flex gap-1">
                  {data?.data.tags.map((item, index) => (
                    <p key={index}>
                      {index === data?.data.tags.length - 1 ? item : item + ", "}
                    </p>
                  ))}
                </div>
                <div><hr></hr></div>
              </div>
              <div className='flex flex-col'>
                <div className='uppercase font-[800] text-[#FE6601] flex gap-2 items-center'><Image src={shareIcon} alt='share-icon'/> Share article</div>
              </div>
            </div>
          </div>

          <div className='col-span-4'>
            {/* {data?.data.description.split('</p>').slice(0, 2).map((para, index) => (
              <>
                <p key={index}>{para+"</p>"}</p><br />
              </>
            ))}
            <h4 className='text-[22px] font-[660]'>What Is Vocal Toning</h4><br />
            {data?.data.description.split('</p>').slice(2).map((para, index) => (
              <>
                {index == 2 ?

                  <><br /><Image src={paraImage} alt='para-image' key={index} /><br /><br /><p>{para}</p><br /></>

                  :

                  <><p key={index}>{para}</p><br /></>}

              </>
            ))} */}
            {parse(data?.data.description || "")}
          </div>

        </div>

      </section>

    </div>
  )
}


export default NewsDetails

