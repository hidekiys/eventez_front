import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { EventSummary } from "@/types/EventSummaryType";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Link from "next/link";

type Props = {
    event:{
        value: number;
        eventId: string;
        services: string[];
        description: string;
    }
}


const Event = ({event}:Props) => {
    const [summaryEvent, setSummaryEvent] = useState<EventSummary>()



    useEffect(()=>{
        api.get('/getEventSummary', {headers:{eventid:event.eventId}}).then( (response)=>{
            setSummaryEvent(response.data)

        }
        )


    },[])

    return (
        <>
        {summaryEvent &&
            

            <Link href={`/partner/evento/${event.eventId}`}><div className="bg-white rounded-lg w-full 
            grid grid-cols-8 p-1 items-center min-w-28 max-w-2xl hover:bg-gray-200 hover:transition-all">
                <p className="col-span-1 text-xs">{`${summaryEvent.date?.slice(8, 10)}/${summaryEvent.date?.slice(5,7)}/${summaryEvent.date?.slice(0,4)}`}</p>
                <p className="col-span-3 flex flex-col items-start">{summaryEvent.name}
                    <p className="text-xs">{summaryEvent.types?.join(' ')}</p>

                </p>
                <p className="col-span-3 flex flex-col items-start">{summaryEvent.owner}</p>
                <p className="col-span-1 justify-self-end mr-7 text-xs">{summaryEvent.numberOfGuests}</p>
            </div></Link>
        
        }
        
        </>
    )
}

export default Event;