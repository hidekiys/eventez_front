import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { UserContext } from "@/contexts/UserContext";
import { api } from "@/utils/api";
import { PopoverContent } from "@radix-ui/react-popover";
import { ChevronsUpDown } from "lucide-react";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Event } from "@/types/Event";
import { SelectedType } from "@/types/SelectedEventType";
import { Skeleton } from "@/components/ui/skeleton";


type Props = {
    setSelectedEvent: React.Dispatch<React.SetStateAction<SelectedType>>,
    selectedEvent: SelectedType
}


const ComboEvents = ({setSelectedEvent, selectedEvent}:Props) => {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false)


    const [ events, setEvents ] = useState<Event>([{name: 'Evento temporario', date:'00/00/0000', _id:'', status:''}])

    useEffect(() => {
        api.get('/getEvents').then(response => {
            const resEvents = response.data
            const updateEvents = [...resEvents]
            setEvents(updateEvents as Event)
        })
    })
    if(!selectedEvent){
      return (
        <>
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </>
      )
    }

    return(
        <>
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
            {
                selectedEvent.name == '' &&
                <p>Selecione o evento...</p>
            }
            {
                selectedEvent.name != '' &&
                <p>{selectedEvent.name}</p>
            }
          
          <ChevronsUpDown className="h-4 w-16 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
        <PopoverContent>
        <Command>
          <CommandList>
            <CommandEmpty>Não foi achado os tipos de evento</CommandEmpty>
            <CommandGroup>
              {events && events.map((key, index) => (
                <CommandItem
                  key={index}
                  value={key._id}
                  onSelect={()=>setSelectedEvent({name:key.name, value:key._id})}
                >
                    {key.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        </PopoverContent>

        </Popover>
        
        
        </>
    )
}
export default ComboEvents;