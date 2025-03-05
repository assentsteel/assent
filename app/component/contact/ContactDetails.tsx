"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ContactDetails = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof locations>("Sharjah");

  const locations = {
    Sharjah: {
      address:
        "1st Floor, Faya Business Building, Al Majaz Northern Park St., Al Majaz 2, Sharjah – UAE",
      phone: "+971 4 3884598",
      email: "info@bestbcc.com",
      fax: "+971 4 3284399",
      addressCard: "34535",
    },
    Dubai: {
      address: "Al Quoz Industrial Area No. 4, Dubai – United Arab Emirates",
      phone: "+971 4 3884598",
      email: "info@bestbcc.com",
      fax: "+971 4 3284399",
      addressCard: "34535",
    },

    AbuDhabi: {
      address:
        "Office 1814, 18th Floor, Najda Street, Al Khazana Tower, Abu Dhabi, United Arab Emirates",
      phone: "+971 4 3884598",
      email: "info@bestbcc.com",
      fax: "+971 4 3284399",
      addressCard: "34535",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      viewport={{ once: true }}
      className="">
      <div className="flex mb-3 lg:mb-[20px] pb-[15px] border-b-[1px] border-[#1E1E1E] xl:gap-[40px] lg:gap-[20px] gap-3 h-[50px]">
        {Object.keys(locations).map((city) => (
          <button
            key={city}
            className={`flex items-center gap-2   font-[700] uppercase transition-all ease-in-out duration-300 ${
              activeTab === city
                ? "text-black xxl:text-[29px] xl:text-[26px] lg:text-[21px] text-[18px]"
                : "bg-transparent text-black/50 xxl:text-[28px] xl:text-[25px] lg:text-[20px] text-[18px]"
            }`}
            onClick={() => setActiveTab(city as keyof typeof locations)}>
            <div
              className={`w-[10px]  h-[10px] rounded-full ${
                activeTab === city ? "bg-primary" : "bg-black/30"
              }`}></div>
            {city}
          </button>
        ))}
      </div>
      <div className="grid  lg:grid-cols-2 gap-[40px]   items-center mt-5 lg:mt-[60px]">
        <div className="">
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/phone.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="md:text-[16px] text-[14px] text-black/50 font-[800] uppercase">
              Phone
            </span>
          </div>
          <p className="lg:text-[22px] text-[16px]  text-black font-[500] mt-[16px] xl:w-[80%]">
            {locations[activeTab].phone}
          </p>
        </div>
        <div className="">
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/fax.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="md:text-[16px] text-[14px] text-black/50 font-[800] uppercase">
              Fax
            </span>
          </div>
          <p className="lg:text-[22px] text-[16px] text-black font-[500] mt-[16px] ">
            {locations[activeTab].fax}
          </p>
        </div>
        <div className="lg:mb-[40px] ">
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/mail.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="md:text-[16px] text-[14px] text-black/50 font-[800] uppercase">
              Mail
            </span>
          </div>
          <p className="lg:text-[22px] text-[16px] text-black font-[500] mt-[16px] pr-3">
            {/* <a
              href={`mailto:${locations[activeTab].email}`}
              className="text-primary"> */}
            {locations[activeTab].email}
            {/* </a> */}
          </p>
        </div>
        <div className="mb-[40px]">
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/addresscard.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="md:text-[16px] text-[14px] text-black/50 font-[800] uppercase">
              Address Card
            </span>
          </div>
          <p className="lg:text-[22px] text-[16px] text-black font-[500] mt-[16px] xl:w-[75%] ">
            {locations[activeTab].addressCard}
          </p>
        </div>
      </div>
      <div className=" lg:mb-0 mb-9">
        <div className="flex gap-2">
          <Image
            src="/assets/img/contact/location.svg"
            alt=""
            width={15}
            height={15}
          />
          <span className="md:text-[16px] text-[14px] text-black/50 font-[800] uppercase">
            Address
          </span>
        </div>
        <p className="lg:text-[22px] text-[16px] text-black font-[500] mt-[16px] lg:w-[60%]">
          {locations[activeTab].address}
        </p>
      </div>
    </motion.div>
  );
};

export default ContactDetails;
