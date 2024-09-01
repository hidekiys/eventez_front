import { Alert } from "./alert";
import { alerts } from "@/data/alerts";


export const Alerts = () => {
   
    return(
        <>
        <div className="ml-14 mt-2 h-full w-[95%] flex flex-col">
            <div className="flex justify-center p-2 rounded-t-xl text-2xl text-gray-600 bg-white">
                    Notificações
            </div>
            
            <div className="flex flex-col align-middle w-full h-[calc(100vh-32rem)] overflow-y-auto rounded-b-lg
            bg-[#F3F1F1]
            
            ">
                {alerts.map(myAlerts => 
                    <div key={myAlerts.name}>
                        <Alert
                            name={myAlerts.name}
                            description={myAlerts.description}
                        />
                    </div>
                )
                }
            </div>
        </div>
        
        </>
    );
}