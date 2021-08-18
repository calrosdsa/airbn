import React from 'react'
import { Swiper,SwiperSlide} from 'swiper/react'
import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css"
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, {
    EffectCube,Pagination
  } from 'swiper/core';
  
  // install Swiper modules
  SwiperCore.use([EffectCube,Pagination]);
function InfoCards({posts}) {
    return (
        <div className="w-64 h-64 mx-auto ">
        <Swiper effect={'cube'} grabCursor={true} cubeEffect={{
      "shadow": true,
      "slideShadows": true,
      "shadowOffset": 20,
      "shadowScale": 0.94
    }} pagination={true} className="mySwiper">
      <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></SwiperSlide><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></SwiperSlide><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></SwiperSlide><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></SwiperSlide>
      </Swiper>
        </div>
    )
}

export default InfoCards
