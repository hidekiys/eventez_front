import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/utils/api"
import Link from "next/link"
import { useEffect, useState } from "react"


type Props = {
    service: {
        partnerId:string,
        description:string,
        services:[string],
        value:number,

      }
}


const EventService = ({service}:Props) => {
    const[partner, setPartner] = useState('')
    if(!service){
        return (
            <div className={"h-[6vh] min-h-fit py-2 duration-300 w-full bg-white rounded-xl flex flex-col hover:bg-gray-100 hover:cursor-pointer"}>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
        )
    }
    useEffect(()=>{
        api.get('/getPartnerSummary', {headers:{partnerid:service.partnerId}}).then((res)=>{
            setPartner(res.data.partnerName)
        })

    },[])

    return (
        <> 
        <Dialog>
            <DialogTrigger>
                <div className={"h-[6vh] min-h-fit py-2 duration-300 w-full bg-white rounded-xl flex flex-col hover:bg-gray-100 hover:cursor-pointer"}>
                    <div className="flex w-full">
                        <h1 className="ml-3 w-[calc(21%)] overflow-hidden font-semibold">{partner}</h1>
                        <p className="">{service.services.join(', ')}</p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="min-w-[50vw]">
                <DialogHeader>
                    <DialogTitle>
                        {partner}
                    </DialogTitle>
                    <DialogDescription>
                        
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col max-h-[70vh] gap-3 ">
                    <div className="flex items-center">
                            <h1 className="text-lg">Total:</h1>
                            <div className="p-1 w-full ml-3 bg-white rounded-lg"><h1>R$ {service.value}</h1></div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex flex-col w-6/12 bg-white rounded-lg py-1 px-2 font-bold ">
                                Descrição do Serviço
                                <p className="max-h-[50vh] overflow-auto text-sm font-normal">{service.description}</p>
                            </div>
                            <div className="w-6/12 flex flex-col justify-end gap-3 ">
                                <button className="w-full py-2 rounded-lg border hover:bg-gray-200 hover:transition-all">
                                    Termos de contrato
                                </button>
                                <Link href={{
                                    pathname:`/user/chat/`,
                                    query:{
                                        chat:service.partnerId,
                                        chatName:partner
                                    }


                                }}>
                                <button className="w-full py-2 rounded-lg bg-principal-200 text-white hover:bg-principal-300 hover:transition-all">
                                    Chat
                                </button>
                                </Link>
                            </div>
                        </div>
                        <DialogClose asChild>
                            <button className="w-full py-2 rounded-lg border hover:bg-gray-200 hover:transition-all">
                                Fechar
                            </button>
                        </DialogClose>
                    </div>
            </DialogContent>
        </Dialog>
            


        
        </>
    )
}

export default EventService;