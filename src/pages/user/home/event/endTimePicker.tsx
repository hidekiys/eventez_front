import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EventsType } from "@/types/EventsType";
import { Dispatch, SetStateAction } from "react";


type Props = {
  setEventTime: Dispatch<SetStateAction<EventsType>>;
  event:EventsType;
} 


const EndTimePicker = ({setEventTime, event}:Props) => {

  const handleSetValues = (value: string) => {
    setEventTime({...event, endTime:`${value}:00`})
  }
 return <Select onValueChange={handleSetValues} >
  <SelectTrigger className="p-2 border border-gray-300 rounded-lg my-1">
    <SelectValue placeholder="Selecione o horário" />
  </SelectTrigger>
  <SelectContent >
    <SelectItem value="00:00">00:00</SelectItem>
    <SelectItem value="00:30">00:30</SelectItem>
    <SelectItem value="01:00">01:00</SelectItem>
    <SelectItem value="01:30">01:30</SelectItem>
    <SelectItem value="02:00">02:00</SelectItem>
    <SelectItem value="02:30">02:30</SelectItem>
    <SelectItem value="03:00">03:00</SelectItem>
    <SelectItem value="03:30">03:30</SelectItem>
    <SelectItem value="04:00">04:00</SelectItem>
    <SelectItem value="04:30">04:30</SelectItem>
    <SelectItem value="05:00">05:00</SelectItem>
    <SelectItem value="05:30">05:30</SelectItem>
    <SelectItem value="06:00">06:00</SelectItem>
    <SelectItem value="06:30">06:30</SelectItem>
    <SelectItem value="07:00">07:00</SelectItem>
    <SelectItem value="07:30">07:30</SelectItem>
    <SelectItem value="08:00">08:00</SelectItem>
    <SelectItem value="08:30">08:30</SelectItem>
    <SelectItem value="09:00">09:00</SelectItem>
    <SelectItem value="09:30">09:30</SelectItem>
    <SelectItem value="10:00">10:00</SelectItem>
    <SelectItem value="10:30">10:30</SelectItem>
    <SelectItem value="11:00">11:00</SelectItem>
    <SelectItem value="11:30">11:30</SelectItem>
    <SelectItem value="12:00">12:00</SelectItem>
    <SelectItem value="12:30">12:30</SelectItem>
    <SelectItem value="13:00">13:00</SelectItem>
    <SelectItem value="13:30">13:30</SelectItem>
    <SelectItem value="14:00">14:00</SelectItem>
    <SelectItem value="14:30">14:30</SelectItem>
    <SelectItem value="15:00">15:00</SelectItem>
    <SelectItem value="15:30">15:30</SelectItem>
    <SelectItem value="16:00">16:00</SelectItem>
    <SelectItem value="16:30">16:30</SelectItem>
    <SelectItem value="17:00">17:00</SelectItem>
    <SelectItem value="17:30">17:30</SelectItem>
    <SelectItem value="18:00">18:00</SelectItem>
    <SelectItem value="18:30">18:30</SelectItem>
    <SelectItem value="19:00">19:00</SelectItem>
    <SelectItem value="19:30">19:30</SelectItem>
    <SelectItem value="20:00">20:00</SelectItem>
    <SelectItem value="20:30">20:30</SelectItem>
    <SelectItem value="21:00">21:00</SelectItem>
    <SelectItem value="21:30">21:30</SelectItem>
    <SelectItem value="22:00">22:00</SelectItem>
    <SelectItem value="22:30">22:30</SelectItem>
    <SelectItem value="23:00">23:00</SelectItem>
    <SelectItem value="23:30">23:30</SelectItem>
  </SelectContent>
</Select>
}
export default EndTimePicker;