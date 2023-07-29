import React ,{ useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar,Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';

import { State } from '../../controller/reducers'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ChatActions from '../../controller/actions-creators/chat.action-creators'
import * as ApiActions from '../../controller/actions-creators/api.actions-creators'

const Nav:React.FC = () => {

  const dispatch = useDispatch()
  const chatActions = bindActionCreators(ChatActions,dispatch)
  const apiActions = bindActionCreators(ApiActions,dispatch)
  const { room } = useSelector((state:State) => state.chat)
  const { rooms } = useSelector((state:State) => state.api)


  const handleActive = (room:string) =>{
    setTimeout(() => {
      const slides = document.querySelectorAll('.swiper-slide') as NodeListOf<HTMLDivElement>
      slides.forEach((s:HTMLDivElement) => {
        s.classList.remove('active')
        if(s.textContent === room){
          s.classList.add('active')
        }
      })
    }, 100);
  }

  useEffect(()=>{
    apiActions.getRooms()
  },[])

  useEffect(()=>{
    handleActive(room)
  },[room])

  return (
    <div className='chat__nav'>
      <Swiper
        modules={[Scrollbar,Pagination]}
        spaceBetween={10}
        slidesPerView={5}
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
      >
       {rooms.map((r:string,i:number) =>{
            return(
              <SwiperSlide key={r} onClick={()=>{
                chatActions.handleRoom(r)
              }}>{r}</SwiperSlide>
            )
        })}
    </Swiper>
       
    </div>
  )
}

export default Nav
