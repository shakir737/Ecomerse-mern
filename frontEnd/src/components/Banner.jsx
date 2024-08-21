import React, { useContext, useState, useEffect, lazy, Suspense } from "react";
import bannerImg from "/images/baner.webp";
import Image from "./Image";

const Banner = () => {
  const [open, setOpen] = useState(false);
  React.useEffect(async () => {
    const getData = await setTimeout(() => {
      setOpen(true);
    }, 2500)
}, [])
  return (
    <div className="w-full container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8">

        {/* img */}
        
         {
         
          open ? ( 
            <div className=" w-[350px] h-[250px] lg:w-[1400px] lg:h-[500px] md:w-[600px] md:h-[250px]">
            {/* <Image src={bannerImg} height="640" width="959" /> */}
            </div>
          ) : ( 
            <div className=" w-[350px] h-[250px] lg:w-[1400px] lg:h-[500px] md:w-[600px] md:h-[250px]">
            <p>Loading</p>
            </div>
          )
         
         }
          
        
       

        {/* texts */}
       
        
      </div>
    </div>
  );
};

export default Banner;
