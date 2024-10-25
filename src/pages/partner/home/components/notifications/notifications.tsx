import { useEffect, useState } from "react"
import { Notification } from "@/components/notifications/notification"
import { api } from "@/utils/api"
import { EventsType } from "@/types/EventsType"

type Notifications = {
    
        event: [string, EventsType],
        users: {
            sender: string,
            receiver: string,
        },
        notificationType: string,
        sender:string[],
        updatedAt:string
    
}[];


const Notifications = () => {
    const [notifications, setNotifications] = useState<Notifications>()

    useEffect(() => {
        api.get('/getNotifications').then((response)=> {
            setNotifications(response.data)  
            console.log(response.data)
        })
    }, [])
    useEffect(() => {
        
        let timerId = setInterval(() => { 
            api.get('/getNotifications').then((response)=> {
                setNotifications(response.data)  
                console.log(response.data)
            })
            
          }, 30000);
        
          return () => clearTimeout(timerId);
    }, [])


    return (
        <>
        <div className="mt-14 mr-10 w-[calc(100vw/4+10rem)] h-full">
            <div className="bg-white rounded-t-xl py-1 text-center text-2xl">
                Notificações
            </div>
            <div className="flex flex-col-reverse min-h-40 bg-gray-200 rounded-b-xl justify-start items-center
            max-h-[calc(70vh)] overflow-y-scroll pb-3">
                {notifications && notifications?.map((key, index)=> (
                    <Notification key={index} data={key}/>
                ))}
                
                


            </div>
        </div>
        
        
        </>


    )


}

export default Notifications;