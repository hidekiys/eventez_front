import { EventService } from "./EventService";


type Props = {
    services: [{
        partnerId:string,
        description:string,
        services:[string],
        value:number,

      }]
}

export const EventServices = ({services}:Props) => {


    return(
    <>
    <div className="flex flex-col">
        <div className="flex justify-between">
            <div className="flex ml-3"><p>Nome</p><p className="ml-20">serviço</p></div>
            <div className="text-lg text-principal-300 font-light">adicionar</div>
        </div>
        <div className="flex flex-col max-w-full overflow-auto gap-2">
            {services &&
            services.map((key, index)=>(
                <EventService key={index} service={key}/>
            ))}
            
        </div>

    </div>
    
    
    
    </>
    
);
}