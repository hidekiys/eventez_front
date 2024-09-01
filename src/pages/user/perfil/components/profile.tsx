import { PhotoArea } from "./photoArea";
import {Address} from "./address"

import { EditProfile } from "../EditProfile";
import { LoginAndSecurity } from "./LoginAndSecurity";

export const Profile = () =>{


    return(
        <>

            <PhotoArea/>
            <hr className="w-[95%] h-1 rounded-md border-gray-400 m-auto mt-6"/>
            <div className="flex flex-col">
                <EditProfile/>
                <Address/>
                <LoginAndSecurity/>
            </div>
        </>
    );
}