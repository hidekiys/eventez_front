import { TypePartner } from "@/types/TypePartner";
import { api } from "@/utils/api";
import { parseCookies } from "nookies";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

type PartnerCtxType = {
    partner: TypePartner,
    setPartner: Dispatch<SetStateAction<TypePartner>>
}

const defaultState = {
    partner:{
        name: '',
        id: '',
        email: '',
        events: [''],
        url_avatar:''
    },
    setPartner: (Partner:TypePartner) => {}
} as PartnerCtxType


export const PartnerContext = createContext(defaultState);


type PartnerProviderProps = {
    children: ReactNode
}

export default function PartnerProvider({children} : PartnerProviderProps){
    const [partner, setPartner] = useState<TypePartner>({
        name: '',
        id: '',
        email: '',
        events:[''],
        url_avatar:''
    });


    useEffect(() => {
        const { 'eventez.partner.token': token } = parseCookies()
        
        if(token) {
            api.get('/getPartner').then(response => { 
                console.log(response)
                setPartner({
                name: response.data.name,
                id: response.data.id,
                email: response.data.email,
                events: response.data.events,
                url_avatar: response.data.url_avatar
            
            })
            console.log(response.data)
        })
        }
    }, [api])

    return(
        <PartnerContext.Provider value={{ partner, setPartner }}>
            {children}
        </PartnerContext.Provider>

    )
}