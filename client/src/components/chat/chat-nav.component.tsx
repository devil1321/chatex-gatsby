import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar,Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';

const Nav:React.FC<{rooms:string[]}> = ({rooms}) => {
  return (
    <div className='chat__nav'>
      <Swiper
        modules={[Scrollbar,Pagination]}
        spaceBetween={10}
        slidesPerView={5}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
      >
       {rooms.map((r,i) =>{
            return(
              <SwiperSlide key={i} onClick={()=>{}}>{r}</SwiperSlide>
            )
        })}
    </Swiper>
       
    </div>
  )
}

export default Nav
