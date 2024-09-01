import { Alerts } from "./alert/alerts";
import { MyEvents } from "./event/myEvents";
import { Famous } from "./famous/Famous";
import { Welcome } from "./welcome";


export const Home = () =>{
    return(
        <>
        <Welcome/>
        <div className="flex fixed w-full">
                <div className="w-[70rem]">
                    <MyEvents/>
                    <Alerts/>
                </div>
                <Famous/>
        </div>
            
            
        
        </>
    );
}