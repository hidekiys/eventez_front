import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import typesOfServices from "../../../data/typesOfServices"
import { api } from "@/utils/api"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from "next/link";
import { ServicePageType } from "@/types/ServicePage";
import ServiceComponent from "./serviceComponent";


type Props = {
    search:string,
    setSearch:Dispatch<SetStateAction<string>>
}


const ServicesContent = ({search,setSearch}:Props) => {

    const[places, setPlaces] = useState<ServicePageType[]>()
    const[famous, setFamous] = useState<ServicePageType[]>()
    const[services, setServices] = useState<ServicePageType[]>()
    const[searchServices, setSearchServices] = useState<ServicePageType[]>()
    
    useEffect(()=>{
        if(search != ''){
            api.get(`/searchServices/${search}`).then((response)=>{
                setSearchServices(response.data)
            })
        }
        
    }, [search])
    useEffect(()=>{
        api.get('/getFamousServices').then((response)=>{
            setFamous(response.data)
        })
        api.get('/getPlaces').then((response)=>{
            setPlaces(response.data)
        })
        api.get('/getServicesPagination/1').then((response)=>{
            setServices(response.data)
        })
    },[])

    const handleSetSearchType = (name:string) => {
        setSearch(name)
    }

    if(search == ''){ return(
        <>
            <div className="ml-10">
                <div className="flex gap-8 relative mt-5">
                    {typesOfServices.map((key, index)=>(
                        <button key={index} className="flex flex-col justify-start items-center group"
                        onClick={()=>handleSetSearchType(key.name)}
                        >
                            <div className="w-16 h-16 items-center rounded-xl shadow-md flex justify-center
                            group-hover:scale-105 transition-all
                            ">{key.image}</div>
                            <p className="max-w-16 text-center text-sm">{key.name}</p>
                        </button>
                    ))}
                </div>
                <div className="max-h-[40%] w-full">
                    <h1 className="text-2xl mt-2 mb-1">Espaços</h1>
                    <Swiper
                        slidesPerView={2.5}
                        spaceBetween={30}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[]}
                        className="mySwiper"
                    >
                        {places && places.map((key,index)=>(
                            
                                <SwiperSlide className="group" key={index}>
                                    <Link href={`/perfil/${key.id}`} >
                                        <div className="bg-gradient-to-tr from-gray-600 to-principal-400 rounded-2xl group">
                                            <img src={key.avatar} className="relative z-0 rounded-2xl
                                            group-hover:cursor-pointer transition-all group-hover:mix-blend-luminosity
                                            "/>
                                        </div>
                                        <h1 className="fixed bottom-12 group-hover:-translate-y-20 transition-all
                                        group-hover:text-2xl text-xl text-white drop-shadow-2xl group-hover:text-principal-100 
                                        stroke-black group-hover:font-bold
                                        left-5 z-50">{key.name}</h1>
                                        <p className="fixed bottom-6 group-hover:-translate-y-20 transition-all
                                        text-sm
                                        left-5 z-50 text-white drop-shadow-2xl group-hover:text-principal-100 stroke-black
                                        group-hover:font-bold shadow-white
                                        ">{key.local.city}, {key.local.state} | {key.local.neighborhood}</p>
                                    </Link>
                                </SwiperSlide>
                            
                        ))}
                    </Swiper>
                </div>
                <div>
                    <h1 className="text-2xl my-5">Famosos na EventEz</h1>
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
                            <SwiperSlide>
                                <ServiceComponent service={key}/>
                            </SwiperSlide>
                        ))}


                    </Swiper>
                </div>
                <div>
                    <h1 className="text-2xl my-5">Serviços</h1>
                    <div className="flex flex-wrap mr-10 justify-between gap-y-3">
                        {services && services.map((key,index)=>(
                            <ServiceComponent service={key}/>
                        ))
                            
                        }
                    </div>
                    
                
                </div>
            </div>
            
        
        
        </>
    )}else{return (
        <>
            <div className="flex ml-10 flex-col">
                {searchServices && searchServices.length > 0 ?
                    <>
                        <h1 className="text-2xl">Pesquisa</h1>
                        <div className="flex mr-10 flex-wrap gap-2 mt-3">
                            {searchServices && searchServices.map((key, index)=> (
                                <ServiceComponent service={key}/>
                            ))}
                        </div>
                    </>:
                    <>
                        <h1 className="text-2xl">Nenhum resultado foi encontrado...</h1>
                    
                    </>

                }
                
            </div>
        </>
    )}
}
export default ServicesContent;