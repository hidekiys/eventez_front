import { EventSummary } from "@/types/EventSummaryType"
import { FinancialType } from "@/types/FinancialType"
import { api } from "@/utils/api"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"



type Props = {
    receipt: FinancialType
}

export const Receipt = ({receipt}:Props) => {
    const [summary, setSummary] = useState<EventSummary | undefined>();
    const [partnerName, setPartnerName] = useState('')
    const router = useRouter()
    useEffect(()=>{
        if(router.isReady)
        {
            api.get(`/getEventSummary/`, {headers:{eventid:receipt.event}}).then((response)=> {
                setSummary(response.data)
            })
            api.get(`/getPartnerSummary/`, {headers:{partnerid:receipt.users.partner}}).then((response)=> {
                setPartnerName(response.data.partnerName)
            })
        }
        
    },[router.isReady])


    return(
        <>
        <div className="w-full rounded-xl h-10 bg-white grid grid-cols-12 text-base text-nowrap text-start">
            <div className="col-span-2 flex items-center ml-5">
                {receipt.created != undefined && 
                receipt.created.toString().slice(8,10)+'/'+receipt.created.toString().slice(5,7)+'/'+receipt.created.toString().slice(0,4)}
            </div>
            <div className="col-span-3 flex items-center">
                {partnerName}
            </div>
            <div className="col-span-4 flex items-center">
                {receipt.service.service}
            </div>
            <div className="col-span-2 flex items-center">
                {receipt.value}
            </div>
            <div className="col-span-1 flex items-center">
                {receipt.status.user == "paid" ? "Pago" : receipt.status.user == "pending" ? "Pendente" : "Vencido"}
            </div>
        </div>
        
        </>
    )
}