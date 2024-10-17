import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { useEffect, useState } from 'react';
import { api } from '@/utils/api';
import { ServicePageType } from '@/types/ServicePage';
import Link from 'next/link';


export const Famous = () => {

    const[famous, setFamous] = useState<ServicePageType[]>()
    useEffect(()=>{
        api.get('/getFamousServices').then((response)=>{
            setFamous(response.data)
        })

    },[])



    return (
        <>
        <div className="bg-white ml-16 rounded-lg px-5 py-2 flex flex-col w-[90%]">
            <div className='flex justify-between'>
                <h1 className="text-2xl">Famosos na EventEz</h1>
                <Link href={"/services"} className="text-principal-200 text-md hover:text-principal-300 transition-all hover:shadow-principal-300 hover:drop-shadow-md">ver serviços</Link>
            </div>
            <div className='w-full'>
            <Swiper
                        slidesPerView={2.5}
                        spaceBetween={30}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[]}
                        className="mySwiper"
                    >
                        {famous && famous.map((key,index)=>(
                            
                                <SwiperSlide className="group" key={index}>
                                    <Link href={`/perfil/${key.id}`} >
                                        <div className="bg-gradient-to-tr from-gray-600 to-principal-400 rounded-2xl group">
                                            <img src={key.images?.find((img)=>img!='')} className="relative z-0 rounded-2xl
                                            group-hover:cursor-pointer transition-all group-hover:mix-blend-luminosity
                                            "/>
                                        </div>
                                        <h1 className="fixed bottom-12 group-hover:-translate-y-20 transition-all
                                        group-hover:text-2xl text-xl
                                        left-5 z-50 text-white">{key.name}</h1>
                                        <p className="fixed bottom-6 group-hover:-translate-y-20 transition-all
                                        text-sm
                                        left-5 z-50 text-white">{key.local.city}, {key.local.state} | {key.local.neighborhood}</p>
                                    </Link>
                                </SwiperSlide>
                            ))}
            </Swiper>
            </div>
        </div>
        </>
    )
}
