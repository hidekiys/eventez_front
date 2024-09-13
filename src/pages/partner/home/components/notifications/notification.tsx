
import { CheckCheck, CircleDollarSign, MessageCircle } from "lucide-react"




type Props = {
    event: string,
    sender: string,
    type: string,
    hour: string,
    description:string
}

export const Notification = ({event, sender, type, hour, description}: Props) => {

    

    return(
        <>
            <div className="h-12 rounded-2xl bg-gray-100 w-[90%] hover:bg-gray-300 transition-all mt-3 items-center text-sm">
                
                <div className="flex justify-between items-center h-full">
                        
                    <div className="flex items-center">
                    {type == "chat" &&
                        <MessageCircle size={26} strokeWidth={0.75} className="ml-3"/>
                    }
                    {type == "financial" &&
                        <CircleDollarSign size={26} strokeWidth={0.75} className="ml-3"/>
                    }
                    {type == "accept" &&
                        <CheckCheck size={26} strokeWidth={0.75} className="ml-3"/>
                    }
                    <div className="flex flex-col justify-center ml-2">
                        <h1 className="text-sm">
                            {sender}
                        </h1>
                        <p className="text-xs">
                            {event}
                        </p>
                    </div>
                    </div>

                        <p className="flex justify-center align-middle items-center">
                        {description}
                    </p>
                    
                    
                    <p className="mr-3 flex justify-center align-middle items-center">
                        {hour}
                    </p>


                </div>
                
                


            </div>
        
        
        
        
        </>


    )
}