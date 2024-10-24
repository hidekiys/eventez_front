import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { get } from 'http';
import { parseCookies } from 'nookies';



type Props = {
    getServices: string[],
    setGetServices: Dispatch<SetStateAction<string[]>>
    offerServices:{
        name:string,
        averagePrice:number,
        description:string
    }[]
}



export const ProfileServices = ({setGetServices, getServices, offerServices}:Props) => {
    const [login, setLogin] = useState<boolean>(false)

    const handleService = (service:string) => {
        getServices[0] == '' ? setGetServices([service]) : (!getServices.includes(service)) && setGetServices([...getServices, service]);
    }
    useEffect(()=>{
        const cookies = parseCookies()
        if(cookies.hasOwnProperty('eventez.user.token')){
            setLogin(true)
        }

    },[])

    return(
        <>
        <Swiper
        slidesPerView={5}
        spaceBetween={0}
        freeMode={true}
    
        modules={[FreeMode]}
      >
            {
                offerServices.map((key, index)=>(
                    <SwiperSlide>
                        <div className="h-72 w-40 rounded-xl bg-white" key={index}>
                            <div className='p-2 h-full flex flex-col justify-between gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col'>
                                        <h1 className=''>{key.name}</h1>
                                        <p className='text-xs'>custo médio: R${key.averagePrice}</p>
                                    </div>
                                    <div className='overflow-y-auto max-h-36'>
                                        <p className='text-xs'>{key.description}</p>
                                    </div>
                                    
                                </div>
                                {login &&
                                <button className='w-full py-2 rounded-xl hover:bg-principal-400 transition-all bg-principal-300 text-white text-xs'
                                onClick={()=>handleService(key.name)}
                                
                                >Adicionar ao orçamento</button>
                            

                                }
                                </div>
                                
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
        
        
        </>
    )
}