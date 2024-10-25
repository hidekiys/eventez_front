import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

import {   Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger, } from "@/components/ui/sheet";
import { api } from "@/utils/api";
import { KeyboardEvent, useEffect, useRef, useState } from "react";


type Props = {
    place: {
        placeName: string,
        cep: string,
        street: string,
        neighborhood: string,
        state: string,
        city: string,
        number: string,
        complement:string
    } ,
    id:string
}

type TypeAddress = {
    placeName: string,cep:string, state:string, street:string, city:string, neighborhood:string,number:string,complement:string
}






const Address = ({place, id}:Props) => {

    return(
        <>

                <div className="bg-white rounded-md  transition-all
                    h-20  mt-3 max-w-full p-6 min-w-60
                    flex flex-col items-start align-middle justify-center">
                        <p className="text-gray-600 text-lg">Endereço</p>
                        {place?.street != undefined && 
                        <>
                            <p className="text-gray-600 text-sm md">{place?.placeName}</p>
                            <p className="text-gray-600 text-sm md">{place?.street}, {place?.number}</p>
                            </>
                        }
                </div>
                
        </>

    );
}
export default Address;