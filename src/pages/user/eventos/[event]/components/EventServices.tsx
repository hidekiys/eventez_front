import { EventService } from "./EventService";




export const EventServices = () => {


    return(
    <>
    <div className="flex flex-col">
        <div className="flex justify-between">
            <div className="flex ml-3"><p>Nome</p><p className="ml-20">serviço</p></div>
            <div className="text-lg text-principal-300 font-light">adicionar</div>
        </div>
        <div className="flex flex-col max-w-full overflow-hidden">
            <EventService/>
        </div>

    </div>
    
    
    
    </>
    
);
}