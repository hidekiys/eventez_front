import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { LucideX } from "lucide-react";
import { ComboboxPublic } from "./ComboPublic";
import { EventsType } from "@/types/EventsType";

type Props = {
    event: EventsType,
    setEvent:Dispatch<SetStateAction<EventsType>>
}
export const SelectPublic = ({event, setEvent}:Props) => {
    const [value, setValue] = useState<string[]>([])
    const [selected, setSelected] = useState<string[]>([])
    
    const handleBadgeClick = (myType:string) => {
        setSelected(oldValues => {
            return oldValues.filter(selected => selected !== myType)
          })
        
    }
    useEffect(() => {setEvent({...event, publicOfEvent:selected})},[selected])

    return(
        <>
        <div>
            <ComboboxPublic value={value} setValue={setSelected} selected={selected} setSelected={setSelected}/>
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