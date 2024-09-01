
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

type EventType = {
    name: string,
        type: string,
        place: {
            placeName: string,
            cep: string,
            street: string,
            neighborhood: string,
            state: string,
            city: string,
            number: string
        },
        date: string,
        hour: string,
        numberOfGuests: number,
        parcialValue: number,
        services: [string],

}

type EventCtxType = {
    event: EventType,
    setEvent: Dispatch<SetStateAction<EventType>>
}

const defaultState = {
    event:{
        name: '',
        type: '',
        place: {
            placeName: '',
            cep: '',
            street: '',
            neighborhood: '',
            state:'',
            city:'',
            number:''
        },
        date: '',
        hour:'',
        numberOfGuests: 0,
        parcialValue:0,
        services: [''],
    },
    setEvent: (event:EventType) => {}
} as EventCtxType


export const EventContext = createContext(defaultState);


type EventProviderProps = {
    children: ReactNode
}

export default function EventProvider({children} : EventProviderProps){
    const [event, setEvent] = useState<EventType>({
        name: '',
        type: '',
        place: {
            placeName: '',
            cep: '',
            street: '',
            neighborhood: '',
            state:'',
            city:'',
            number:''
        },
        date: '',
        hour:'',
        numberOfGuests: 0,
        parcialValue:0,
        services: [''],
    });



    return(
        <EventContext.Provider value={{ event, setEvent }}>
            {children}
        </EventContext.Provider>

    )
}