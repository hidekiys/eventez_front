
import { Badge } from "@/components/ui/badge";
import { Dispatch, SetStateAction } from "react";
import React from "react";
type Props = {
    eventName:string,
    types: string[],
    setNotFound: Dispatch<SetStateAction<boolean>>
}



const EventName = ({eventName, types}:Props) => {

    return(
        <>
            { types && eventName &&
            <div className="text-2xl flex flex-col font-normal max-w-52 mt-0 ml-10">
            
            <h1 className="text-principal-300 max-w-96 text-left text-nowrap" >{eventName}</h1>
                <div className="flex max-w-72 overflow-hidden gap-1 mt-1">
                    {types.map(type => <Badge key={type} className="px-1 bg-transparent rounded-full text-principal-300 font-light text-xs border border-principal-300 hover:bg-transparent shadow-none">{type}</Badge>)}

                </div>
            </div>
            }
        </>
    );


}
export default EventName;