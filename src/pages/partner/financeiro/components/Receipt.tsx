import { EventSummary } from "@/types/EventSummaryType"
import { FinancialType } from "@/types/FinancialType"
import { api } from "@/utils/api"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"


type Props = {
    receipt: FinancialType
}

const Receipt = ({receipt}:Props) => {
    const [summary, setSummary] = useState<EventSummary | undefined>();
    useEffect(()=>{
        api.get("/getEventSummary", {headers:{eventid:receipt.event}}).then((response)=> {
            setSummary(response.data)
        })
    },[])


    return(
        <>
        
        <div className="w-full rounded-xl h-10 bg-white grid grid-cols-12 text-base text-nowrap text-start">
            { summary ?
            <>
                <div className="col-span-2 flex items-center ml-5">
                    {receipt.created != undefined && 
                    receipt.created.toString().slice(8,10)+'/'+receipt.created.toString().slice(5,7)+'/'+receipt.created.toString().slice(0,4)}
                </div>
                <div className="col-span-3 flex items-center">
                    {summary?.owner}
                </div>
                <div className="col-span-4 flex items-center">
                    {summary?.name}
                </div>
                <div className="col-span-2 flex items-center">
                    {receipt.value}
                </div>
                <div className="col-span-1 flex items-center">
                    {receipt.status.partner == "pending" ? "Pendente" : "Recebido"}
                </div>
            </>
            :
            <>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
            
            </>
            }
        </div>
        
        </>
    )
}

export default Receipt;