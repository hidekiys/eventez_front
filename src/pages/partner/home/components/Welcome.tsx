import { PartnerContext } from "@/contexts/PartnerContext";
import { useContext, useEffect, useState } from "react";


export const Welcome = () => {
    const { partner } = useContext(PartnerContext);
    const [ name, setName ] = useState('')
    useEffect(() => {
        if (partner.name) {setName(partner?.name)} else { setName('')}
    }, [partner])

    return(
        <div className="text-2xl flex flex-row font-normal max-w52 mt-3">
            <h1 className="text-gray-500 pr-2 ml-10">Olá,</h1>
            <h1 className="text-principal-300 max-w-96">{name}</h1>
        </div>
    );


}