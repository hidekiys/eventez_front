import { parseCookies } from "nookies";
import { BtnNavigation } from "./btnNavegation";
import { useEffect, useState } from "react";


export const Navegation = () => {
    const { 'eventez.user.token': userToken } = parseCookies()
    const { 'eventez.partner.token': partnerToken } = parseCookies()
    const [role, setRole] = useState(false);

    useEffect(() => {
        console.log(role)
        if(userToken){
            setRole(false)
        }else if(partnerToken){
            setRole(true)}

    }, [])






    return(

    <>
            {!role && 
                <div className="hover:w-[12vw] w-16 translate-x-0 left-0  top-0 duration-300 h-full 
                flex flex-col justify-between bg-white border-gray-300 border-r z-20 group">
                    <div className="flex flex-col">
                        <BtnNavigation local="Inicio" role={role}/>
                        <BtnNavigation local="Perfil" role={role}/> 
                    </div>
                    <div>
                        <BtnNavigation local="Suporte" role={role}/>
                    </div>
                </div>


            }
            {role && 
                <div className="hover:w-[12vw] w-16 translate-x-0 left-0  top-0 duration-300 h-full 
                flex flex-col justify-between bg-white border-gray-300 border-r z-20 group">
                    <div className="flex flex-col">
                        <BtnNavigation local="Inicio" role={role}/>
                        <BtnNavigation local="Perfil" role={role}/> 
                        <BtnNavigation local="Financeiro" role={role}/> 
                    </div>
                    <div>
                        <BtnNavigation local="Suporte" role={role}/>
                    </div>
                </div>


            }


        
    </>
    )
}