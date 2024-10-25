import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ServicePageType } from "@/types/ServicePage"
import Link from "next/link"

type Props = {
    service:ServicePageType
}


const ServiceComponent = ({service}:Props) => {

    if(!service){
        return (
            <div className="flex w-[32%] bg-white rounded-xl hover:scale-95 transition-all hover:cursor-pointer">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
        )
    }

    return (
        <>
        <Link href={`/perfil/${service.id}`} className="w-[32%]">
            <div className="flex w-full bg-white rounded-xl hover:scale-95 transition-all hover:cursor-pointer">
                <img src={service.avatar} className="w-24 h-24 rounded-l-xl"/>
                <div className="flex flex-col ml-2 mt-3">
                    <div className="flex gap-2">
                        <h1 className="text-xl">{service.name}</h1>
                        {service.types.map((key, index)=>(
                            <Badge key={index}
                            className="flex align-center w-fit px-1 bg-transparent rounded-full text-principal-300 
                            font-light text-xs border border-principal-300 hover:bg-transparent shadow-none max-h-5 mt-[0.3rem]"
                            
                            >{key}</Badge>
                        ))}
                    </div>
                    
                    <p>{service.local.city}, {service.local.state}</p>
                    
                </div>
            </div>
        </Link>
        
        </>
    )
}

export default ServiceComponent;