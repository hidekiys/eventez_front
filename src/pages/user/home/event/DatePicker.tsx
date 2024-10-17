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
import dayjs from "dayjs"
import { DateCalendar } from "@mui/x-date-pickers"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
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
  const today = new Date()
  const [date, setDate] = useState<Date>(today)
  const handleSetDate = () => {
    if (date){
      let dateEvent = (date?.getFullYear() + "-" + adicionaZero((date?.getMonth() + 1))) + "-" + adicionaZero((date?.getDate() ))
      setEventDate({...event, date:`${dateEvent}`})
    }
    
  }
  const usaDate = format(date, "P")
  const brazilianDate = usaDate.slice(3,5)+'/'+usaDate.slice(0,2)+'/'+usaDate.slice(6,10)
  return (
    
    
    <Dialog>
      <DialogTrigger className="w-full">
        <Button
          variant={"outline"}
          className={cn(
            "p-2 border border-gray-300 rounded-lg my-1 justify-start text-left font-normal w-full",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? brazilianDate : <span>Selecione a data que planeja realizar o evento</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto p-5">
        {/* <DateCalendar defaultValue={dayjs(today)} 
        selected={date}
        onSelect={setDate}
        onDayBlur={handleSetDate}
        
        /> */}
        <Calendar
            mode="single"
            selected={date}
            onSelect={(e)=>setDate(e != undefined ? e : today)}
            onDayBlur={handleSetDate}
            disabled={false}
          />
      </DialogContent>
    </Dialog>
  )
}