"use client"

import React from 'react'
import SecHr from '../common/SecDivider/SecHr'



const WhoWeare = () => {


    return (
        <>
            <section className='wwebanner'>
          <div className='container'>
            <div className='py-12 md:py-15 lg:py-[150px]'>

                <SecHr title="WHO WE ARE" />
              <div className="grid grid-cols-[100%] lg:grid-cols-[34%_66%] gap-0 md:gap-4 pt-3 md:pt-10">
                <div className=""></div>
                <div><p className='text-md lg:text-lg text-secondary/60 leading-[1.4] font-medium'>Since 1975, BUILDING CO. (BEST) L.L.C has been a key player in the UAE construction industry, consistently delivering high-quality projects across various sectors. With a strong commitment to excellence, innovation, and precision, we have earned a reputation for reliability and superior craftsmanship. Our dedication to delivering outstanding construction services has made us a trusted name, shaping skylines and setting new benchmarks in the industry.</p></div>
              </div>

            </div>
          </div>

            </section>

        </>
    )
}

export default WhoWeare