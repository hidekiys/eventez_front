
import { EventCard } from "./eventCard";
import React, { useEffect, useState } from 'react';
import { NewEvent } from './newEvent';
import {
    Carousel,
    CarouselContent,
    CarouselItem,

  } from "@/components/ui/carousel"
import { api } from "@/utils/api";
import { Event } from "@/types/Event";
import { any } from "zod";
import { useRouter } from "next/router";


export const MyEvents = () => {
    const router = useRouter()
    const [ events, setEvents ] = useState<Event>([{name: 'Carregando eventos', date:'00/00/0000', _id:''}])

    useEffect(() => {
        setInterval(()=>{
            api.get('/getEvents').then(response => {
                const resEvents = response.data
                const updateEvents = [...resEvents]
                setEvents(updateEvents as Event)
            }).catch((err)=>{
                console.log(err)
            })
        }, 3000)
        
    }, [])
    useEffect(()=>{
        if(router.isReady){
            api.get('/getEvents').then(response => {
                const resEvents = response.data
                const updateEvents = [...resEvents]
                setEvents(updateEvents as Event)
            }).catch((err)=>{
                console.log(err)
            })
        }
        
    },[router.isReady])
    return(
        <>
        <div className="mx-14 mt-5 flex flex-col w-1/2">
            <div className="flex text-2xl text-gray-600 justify-between">
                    Meus Eventos
                    <div className="text-base text-principal-200 hover:text-principal-300 transition-all hover:shadow-principal-300 hover:drop-shadow-md pt-2">
                        <NewEvent/> 
                    </div>
                    
            </div>
            
            <div className="ml-3 mt-5 w-full overflow-hidden flex flex-row align-middle justify-start">
            <Carousel className='h-60 w-full max-w-screen'>
                <CarouselContent>
                {events.map(myEvents =>
                            <CarouselItem className="basis-4/13" key={myEvents.name}>
                                <EventCard
                                id={myEvents._id}
                                    name={myEvents.name}
                                    image={myEvents.image && '/imgevent.jpg'}
                                    date={myEvents.date}
                                />
                            </CarouselItem>
                            
                        )}
                           
                </CarouselContent>
            </Carousel>
            </div>


           
            </div>

        </>
    );
}