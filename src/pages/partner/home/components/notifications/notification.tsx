
import { CheckCheck, CircleDollarSign, Mails, MessageCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"



type Props = {
    data:{
    event: string[],
    users: {
        sender: string,
        receiver: string,
    },
    notificationType: string,
    sender:string[],
    updatedAt:string
}
}

const Notification = ({data}: Props) => {

    if (!data){
        return (
            <div className="h-12 rounded-2xl bg-gray-100 w-[90%] hover:bg-gray-300 transition-all mt-3 items-center text-sm">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />

            </div>
        )
    }

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
                    {data.notificationType == "budget" &&
                        <Mails size={26} strokeWidth={0.75} className="ml-3"/>
                    }
                    <div className="flex flex-col justify-center ml-2">
                        <h1 className="text-sm">
                            {data.sender[1]}
                        </h1>
                        <p className="text-xs">
                            {data.event}
                        </p>
                    </div>
                    </div>

                        <p className="flex justify-center align-middle items-center">
                        Mandou uma mensagem
                    </p>
                    
                    
                    <p className="mr-3 flex justify-center align-middle items-center">
                        {data.updatedAt.slice(11,13)}:{data.updatedAt.slice(14,16)}
                    </p>


                </div>
                
                


            </div>
        
        
        
        
        </>


    )
}
export default Notification;