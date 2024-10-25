import { api } from "@/utils/api"
import { useEffect, useState } from "react"
import  Event  from "./Event";

type EventsType = {
    value: number,
    eventId: string,
    ownerName: string,
    eventName: string,
    services: string[],
    description: string,
}[]




const Events = () => {
    const [filter, setFilter] = useState<string>('')
    const [events, setEvents] = useState<EventsType>()
    const [showEvents, setShowEvents] = useState<EventsType>()

    useEffect(()=> {
        api.get('/getPartnerEvents').then((response)=>{
            setEvents(response.data)
            console.log(response.data)
        })
    }, [])

    useEffect(()=>{
        filter == '' ? setShowEvents(events) :
         setShowEvents(events?.filter((event)=>
            event.ownerName != undefined && event.ownerName.toUpperCase().includes(filter.toUpperCase())|| event.eventName != undefined && event.eventName.toUpperCase().includes(filter.toUpperCase())
    ))
    }, [[],filter])

    return(
        <>
            <div className="flex mt-5 gap-3 w-[calc(100vw/2)] justify-between">
                <h1 className="text-2xl ml-10 text-gray-800 ">Serviços</h1>
                <input type="text" className="h-7 rounded-full bg-white items-center mt-1 w-96 text-black p-2"
                placeholder="Filtrar..." value={filter} onChange={(e)=> setFilter(e.target.value)}
                />
            </div>
            <div className="max-h-52 overflow-auto flex flex-col w-full gap-1 ml-10 mt-3">
                {showEvents && 
                showEvents.map((key, index)=> (
                    <Event key={index} event={key}/>
                ))
                
                
                }


            </div>
        
        </>
    )
}

export default Events;