import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";



    type Props = {
        numberOfGuests: number,
        startTime: string,
        endTime: string,
        date: string
    }


const SummaryEvent = ({numberOfGuests, startTime, endTime, date}: Props) => {
    if(!numberOfGuests || !startTime || !endTime || !date) {
        return (
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
        )
    }
    const[dateHour, setDateHour] = useState({startTime:`${startTime.slice(0,5)}`, endTime:`${endTime.slice(0,5)}`, date:`${date.slice(8, 10)}/${date.slice(5,7)}/${date.slice(0,4)}`});
    useEffect(() => {
        setDateHour(({startTime:`${startTime.slice(0,5)}`, endTime:`${endTime.slice(0,5)}`, date:`${date.slice(8, 10)}/${date.slice(5,7)}/${date.slice(0,4)}`}))
    }, [date])
    return(
        <>
        <div className="bg-white rounded-md  transition-all
                    h-20  mt-3 max-w-full p-5 py-11  min-w-60
                    flex flex-col items-start justify-center
                    hover:shadow-md hover:scale-105">
            <p className="text-gray-600 text-lg">Resumo</p>
                            <p className="text-gray-600 text-sm md">Convidados: {numberOfGuests}</p>
                            <p className="text-gray-600 text-sm md">Data: {dateHour.date}</p>
                            <p className="text-gray-600 text-sm md">Horário: {dateHour.startTime} - {dateHour.endTime}</p>
                            

        </div>
        
        </>

    );
}

export default SummaryEvent;