import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "@react-hook/media-query";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"



// import Swiper core and required modules
import SwiperCore, {
  Keyboard,Pagination,Navigation
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Keyboard,Pagination,Navigation]);


export default function InfoCards({posts}) {
    const isSmallScreen = useMediaQuery("(max-width: 36rem)");
  
  
  
  return (
      <div className="grid grid-cols-2 px-3 w-full">
    <div className="h-[255px] w-[295px] col-start-1">
  {posts.map((post)=>( 
    <Swiper  slidesPerView={1} spaceBetween={100} keyboard={{
        "enabled": true
    }} pagination={{    
        "clickable": true
    }} navigation={isSmallScreen ?false:true} >
      <div>

      <div className="flex mx-auto z-10">
      <SwiperSlide className="justify-center">
          <img className="h-[255px] w-[295px]" src={post.image[0].image} alt="" />
      </SwiperSlide>
      <SwiperSlide className="justify-center">
          <img className="h-[255px] w-[295px]" src={post.image[1].image} alt="" />
      </SwiperSlide>
      <SwiperSlide className="justify-center">
          <img className="h-[255px] w-[295px]" src={post.image[2].image} alt="" />
      </SwiperSlide>
      <SwiperSlide className="justify-center">
          <img className="h-[255px] w-[295px]" src={post.image[3].image} alt="" />
      </SwiperSlide>
      <SwiperSlide className="justify-center">
          <img className="h-[255px] w-[295px]" src={post.image[4].image} alt="" />
      </SwiperSlide>
      <SwiperSlide className="justify-center">
          <img className="h-[255px] w-[295px]" src={post.image[5].image} alt="" />
      </SwiperSlide>
    </div>
      <p>{post.title}</p>

      </div>
  </Swiper>
))}
    </div>
</div>
  )
}   