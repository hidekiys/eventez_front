import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { get } from 'http';
import { parseCookies } from 'nookies';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import { Star } from 'lucide-react';





type ReviewType = {
    reviewId:String,
    writer: {
        name:string,
        avatar:string
    }
    text:{
        title:string,
        description:string
    }
    rate:number,
    createdAt:string,
}

const ProfileReviews = () => {
    const [reviews, setReviews] = useState<ReviewType[]>();
    const router = useRouter();


    useEffect(()=>{
        if(router.isReady){
            api.get(`/getReviews/${router.query.perfil}`).then((response)=>{
                setReviews(response.data)
                console.log(response.data)
            })
        }
    },[router.isReady])
    if(!reviews){
        return (
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
        )
    }
    if(reviews.length<=0){
        return(
            <>
                <h1>
                    Este serviço ainda não foi avaliado!
                </h1>
            </>
        )
    }
    return(
        <>
        <Swiper
        slidesPerView={5}
        spaceBetween={0}
        freeMode={true}
    
        modules={[FreeMode]}
      >
            {
                reviews.map((key, index)=>(
                    <SwiperSlide>
                        <div className="max-h-72 pb-3 w-40 rounded-xl bg-white" key={index}>
                            <div className='p-2 h-full flex flex-col justify-between gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col items-center'>
                                        <img src={key.writer.avatar} className='rounded-full w-10 h-10'/>
                                        <h1 className=''>{key.writer.name}</h1>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-xs'>{key.rate}</p>
                                            <p>•</p>
                                            <div className='flex'>
                                                <Star size={12} className={`${key.rate>0 ? "fill-principal-200 stroke-none":"stroke-black"}`}/>
                                                <Star size={12} className={`${key.rate>1 ? "fill-principal-200 stroke-none":"stroke-black"}`}/>
                                                <Star size={12} className={`${key.rate>2 ? "fill-principal-200 stroke-none":"stroke-black"}`}/>
                                                <Star size={12} className={`${key.rate>3 ? "fill-principal-200 stroke-none":"stroke-black"}`}/>
                                                <Star size={12} className={`${key.rate>4 ? "fill-principal-200 stroke-none":"stroke-black"}`}/>
                                            </div>
                                            
                                        </div>
                                        <h1 className='leading-4'>{key.text.title}</h1>
                                    </div>
                                    <div className='overflow-y-auto max-h-36'>
                                        <p className='text-xs'>{key.text.description}</p>
                                    </div>
                                    
                                </div>
                                </div>
                                
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
        
        
        </>
    )
}

export default ProfileReviews;