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

type Props = {
    event:{
        value: number;
        eventId: string;
        services: string[];
        description: string;
    }
}


export const Event = ({event}:Props) => {
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
            

            
        <Dialog>
        <DialogTrigger>
            
        <div className="bg-white rounded-lg w-full 
                        grid grid-cols-8 p-1 items-center min-w-28 max-w-2xl hover:bg-gray-200 hover:transition-all">
                            <p className="col-span-1 text-xs">{`${summaryEvent.date?.slice(8, 10)}/${summaryEvent.date?.slice(5,7)}/${summaryEvent.date?.slice(0,4)}`}</p>
                            <p className="col-span-3 flex flex-col items-start">{summaryEvent.name}
                                <p className="text-xs">{summaryEvent.types?.join(' ')}</p>

                            </p>
                            <p className="col-span-3 flex flex-col items-start">{summaryEvent.owner}</p>
                            <p className="col-span-1 justify-self-end mr-7 text-xs">{summaryEvent.numberOfGuests}</p>
                        </div>
        </DialogTrigger>


       
            <DialogContent className="min-w-[50vw] min-h-fit">
            <DialogHeader>
            <DialogTitle>{summaryEvent.name}</DialogTitle>
            <DialogDescription>
                Aqui está um resumo do evento.
            </DialogDescription>
            </DialogHeader>

                    <div className="mt-0 h-full">


                        <div className="flex gap-3 w-full max-h-fit min-h-fit">
                            <div className="px-4 py-2 rounded-xl  bg-white text-sm w-2/5">
                                <h1 className="text-lg">{summaryEvent.name}</h1>
                                <p>Cliente: {summaryEvent.owner}</p>
                                <p>Convidados: {summaryEvent.numberOfGuests}</p>
                                <p>Público: {summaryEvent.publicOfEvent?.join(', ')}</p>
                                <p>Horário: {summaryEvent.initialTime?.substring(0,5)} - {summaryEvent.endTime?.substring(0,5)}</p>
                                <p>Data: {`${summaryEvent.date?.slice(8, 10)}/${summaryEvent.date?.slice(5,7)}/${summaryEvent.date?.slice(0,4)}`}</p>
                                <p>Local: {summaryEvent.place?.placeName}</p>
                                <p>Endereço: {summaryEvent.place?.street}, {summaryEvent.place?.number}</p>
                            </div>
                            <div className="flex flex-col gap-3 w-3/5 ">
                                <div className="p-2 rounded-xl bg-white w-full h-full flex flex-col text-lg">
                                    Serviços solicitados
                                    <p className="text-sm">{event.services.join(', ')}</p>
                                </div>
                                <div className="p-2 rounded-xl bg-white w-full">
                                    Termos e condições de contrato
                                </div>
                            </div>
                            
                        </div>
                        <div className="p-2 max-h-[40vh] overflow-auto flex rounded-md bg-white mt-3">
                            {event.description}
                        </div>


                        <div className="flex flex-col mt-3 h-full">
                            <div className="flex justify-end gap-3 mt-3">
                                <DialogClose asChild>

                                    <button
                                    className="px-3 py-1 rounded-lg border border-gray-200"
                                    >Fechar</button>

                                </DialogClose>
                            </div>
                        </div>
                    </div>
                    


                </DialogContent>
                
            
            </Dialog>
        }
        
        </>
    )
}