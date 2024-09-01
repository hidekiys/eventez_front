import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { EventsType } from "@/types/EventsType"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dispatch, SetStateAction, useState } from "react"
type Props = {
  setEventDate: Dispatch<SetStateAction<EventsType>>;
  event:EventsType;
} 




export function DatePicker({setEventDate, event}:Props) {
  function adicionaZero(numero:number){
    if (numero <= 9) 
        return "0" + numero;
    else
        return numero; 
}
  const [date, setDate] = useState<Date>()
  const handleSetDate = () => {
    if (date){
      let dateEvent = (date?.getFullYear() + "-" + adicionaZero((date?.getMonth() + 1))) + "-" + adicionaZero((date?.getDate() ))
      setEventDate({...event, date:`${dateEvent}`})
    }
    
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "p-2 border border-gray-300 rounded-lg my-1 justify-start text-left font-normal justi",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "P") : <span>Selecione a data que planeja realizar o evento</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          onDayBlur={handleSetDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}