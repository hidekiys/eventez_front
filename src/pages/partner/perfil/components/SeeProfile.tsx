import React, { useContext } from "react"
import Link from "next/link";
import { PartnerContext } from "@/contexts/PartnerContext";






export const SeeProfile = () =>{
    const partner = useContext(PartnerContext);


    return (
        <>

                <Link className="bg-white rounded-md  transition-all
                    h-14 ml-14 mt-3 max-w-fit p-5 min-w-60
                    flex flex-col items-start justify-center
                    hover:shadow-md hover:scale-105" href={`/perfil/${partner.partner.id}`}>
                        <p className="text-gray-600 text-sm">Ver perfil</p>
                        <p className="text-gray-600 text-lg font-bold"></p>
                </Link>

        
        </>
    )
}