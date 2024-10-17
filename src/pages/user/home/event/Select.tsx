import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ComboboxDemo } from "./ComboTypes";
import { Badge } from "@/components/ui/badge";
import { LucideX } from "lucide-react";
import { EventsType } from "@/types/EventsType";
import React from "react";

type Props = {
    event: EventsType,
    setEvent:Dispatch<SetStateAction<EventsType>>
}
export const SelectType = ({event, setEvent}:Props) => {
    const [value, setValue] = useState<string[]>([])
    const [selected, setSelected] = useState<string[]>([])
    
    const handleBadgeClick = (myType:string) => {
        setSelected(oldValues => {
            return oldValues.filter(selected => selected !== myType)
          })
        
    }

    useEffect(() => {setEvent({...event, types:selected})},[selected])
    return(
        <>
        <div>
            <ComboboxDemo value={value} setValue={setSelected} selected={selected} setSelected={setSelected}/>
            <div className="mt-3 min-h-10">
                
                {selected.map(myType => 
                    <Badge className="p-2 rounded-full bg-white border border-gray-200 text-gray-500
                    m-1 hover:text-white hover:cursor-pointer"
                    key={myType}
                    onClick={() => handleBadgeClick(myType)}
                    >
                        {myType} <LucideX className="h-3 w-3 ml-1 mt-[2px]"/></Badge>
                )
                }
                
            </div>
        </div>
        
        </>
    );

}