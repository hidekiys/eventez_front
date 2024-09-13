import { useEffect, useState } from "react"
import { Notification } from "./notification"
import { api } from "@/utils/api"

type Notifications = {
    type:string,
    date:string,
    hour:string,
    description:string,
    event:string,
    sender: string,
}[]

export const Notifications = () => {
    const [notifications, setNotifications] = useState<Notifications>()

    useEffect(() => {
        api.get('/getPartnerNotifications').then((response)=> {
            setNotifications(response.data)  
            console.log(response.data)
        })
    }, [])
    useEffect(() => {
        
        let timerId = setInterval(() => { 
            api.get('/getPartnerNotifications').then((response)=> {
                setNotifications(response.data)  
                console.log(response.data)
            })
            
          }, 30000);
        
          return () => clearTimeout(timerId);
    }, [])


    return (
        <>
        <div className="mt-14 mr-10 w-[calc(100vw/4+10rem)]">
            <div className="bg-white rounded-t-xl py-1 text-center text-2xl">
                Notificações
            </div>
            <div className="flex flex-col min-h-40 bg-gray-200 rounded-b-xl justify-center items-center py-3
            max-h-[calc(70vh)] overflow-auto">
                {notifications && notifications?.map((key, index)=> (
                    <Notification key={index} event={key.event} sender={key.sender} type={key.type} hour={key.hour} description={key.description}/>
                ))}
                
                


            </div>
        </div>
        
        
        </>


    )


}