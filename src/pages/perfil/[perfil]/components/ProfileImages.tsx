import { useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import React from 'react';

type Props = {
    images:string[]
}

const ProfileImages = ({images}:Props    ) => {
    useEffect(() => {
        const stylesheet = document.styleSheets[0];
        stylesheet.insertRule(".swiper-pagination-bullet-active { background: #f24f13 !important;}", 0);   
      }, []);
    return(
    <>
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
            dynamicBullets: true,
        }}
        modules={[Pagination]}
        >
            {
                images.map((key, index)=>(
                    key != '' &&
                    <SwiperSlide key={index}>
                        <img src={key} className='object-fill h-full w-full'/>
                    </SwiperSlide>
                ))
            }

        </Swiper>
    </>

    )
}

export default ProfileImages;