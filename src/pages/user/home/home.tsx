import React from "react";
import { Alerts } from "./alert/alerts";
import { MyEvents } from "./event/myEvents";
import { Famous } from "./famous/Famous";
import { Welcome } from "./welcome";
import { Notifications } from "@/components/notifications/notifications";


export const Home = () =>{
    return(
        <>
        <Welcome/>
        <div className="flex flex-col fixed w-full">
        
                <div className="w-full flex">
                    <MyEvents/>
                    <Notifications/>
                    
                    
                </div>
                <Famous/>
                
        </div>
            
            
        
        </>
    );
}