
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


export const MyEvents = () => {
    const [ events, setEvents ] = useState<Event>([{name: 'Evento temporario', date:'00/00/0000', _id:''}])

    useEffect(() => {
        api.get('/getEvents').then(response => {
            const resEvents = response.data
            const updateEvents = [...resEvents]
            setEvents(updateEvents as Event)
        })
    })
    return(
        <>
        <div className="ml-14 mt-5 flex flex-col">
            <div className="flex text-2xl text-gray-600">
                    Meus Eventos
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
                        <CarouselItem className="basis-4/13">
                            <NewEvent/> 
                        </CarouselItem>
                           
                </CarouselContent>
            </Carousel>
            </div>


           
            </div>

        </>
    );
}