
import { CalendarDays, CheckCheck, CircleDollarSign, MessageCircle, Send } from "lucide-react"
import { EventsType } from "@/types/EventsType"
import Link from "next/link"



type Props = {
    data:{
    event: [string, EventsType],
    users: {
        sender: string,
        receiver: string,
    },
    notificationType: string,
    sender:string[],
    updatedAt:string
}
}

export const Notification = ({data}: Props) => {

    

    return(
        <>
            <div className="h-12 rounded-2xl bg-gray-100 w-[90%] hover:bg-gray-300 transition-all mt-3 items-center text-sm">
                
                <div className="flex justify-between items-center h-full">
                        
                    <div className="flex items-center">
                    {data.notificationType == "chat" &&
                        <MessageCircle size={26} strokeWidth={0.75} className="ml-3"/>
                    }
                    {data.notificationType == "financial" &&
                        <CircleDollarSign size={26} strokeWidth={0.75} className="ml-3"/>
                    }
                    {data.notificationType == "contract" &&
                        <CheckCheck size={26} strokeWidth={0.75} className="ml-3"/>
                    }
                    {data.notificationType == "eventDay" &&
                        <CalendarDays size={26} strokeWidth={0.75} className="ml-3"/>
                    }
                    {data.notificationType == "budget" &&
                        <Send size={26} strokeWidth={0.75} className="ml-3"/>
                    }
                    <div className="flex flex-col justify-center ml-2">
                        <h1 className="text-sm">
                            {data.sender[1]}
                        </h1>
                        <p className="text-xs">
                            {data.event[1] != undefined && data.event[1].name}
                        </p>
                    </div>
                    </div>

                        <p className="flex justify-center align-middle items-center">
                        {data.notificationType == "chat" &&
                        "Mandou uma mensagem"
                    }
                    {data.notificationType == "financial" &&
                        "Financeiro"
                    }
                    {data.notificationType == "contract" &&
                        "Fechou um contrato"
                    }
                    {data.notificationType == "eventDay" &&
                        "Chegou o dia do seu evento!"
                    }
                    {data.notificationType == "budget" &&
                        "Chegou uma solicitação!"
                    }
                    </p>
                    
                    
                    <p className="mr-3 flex justify-center align-middle items-center">
                        {data.updatedAt.slice(11,13)}:{data.updatedAt.slice(14,16)}
                    </p>


                </div>
                
                


            </div>
        
        
        
        
        </>


    )
}