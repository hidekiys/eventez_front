
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { api } from "@/utils/api";
import { EventName } from "./EventName";
import { Address } from "./EventAddress";
import { EventTodoList } from "./EventTodoList";
import { EventServices } from "./EventServices";
import { SumaryEvent } from "./Summary";
import { EventFinancial } from "./EventFinancial";
import { Budgets } from "./Budgets";
import { publicOfEvent } from "@/pages/user/home/event/publicOfEvent";



type eventType = {
  name: string,
      types: [string],
      status:string,
      publicOfEvent: [string],
      place: {
          placeName: string,
          cep: string,
          street: string,
          neighborhood: string,
          state: string,
          city: string,
          number: string,
          complement:string
      },
      hour: string,
      endTime: string,
      date:string,
      numberOfGuests: number,
      parcialValue: number,
      services: [{
        partnerId:string,
        description:string,
        services:[string],
        value:number,

      }],
      description:string,
      todoList:[{todoItem:number,todoStatus:boolean, todoDescription:string}],
      budgets:[{
        budgetItem:number,
        date:string,
        description:string,
        partnerId:string,
        services:[string],
        status:string,
        value:number,
      }]
}

const templateBudgets = [{
  budgetItem:0,
  date:'',
  description:'',
  partnerId:'',
  services:[''],
  status:'',
  value:0,
}]

const templatePlace = {
  placeName: '',
          cep: '',
          street: '',
          neighborhood: '',
          state: '',
          city: '',
          number: '',
          complement:''
}

const templateTodoList = [{todoItem:0,todoStatus:false, todoDescription:''}]

export const EventContent = () => {
    const router = useRouter()
    const [notFound, setNotFound] = useState(false)
    const [event, setEvent] = useState<eventType>();

    
    useEffect(() => {
      api.get('getEventInfo',{headers:{eventId:router.query.event}}).then(response => {setEvent(response.data)
        
      })
      .catch(err => {console.log(err)
        if(err.response.status == 404){
        }
      })
    }, [[], api])


    return (
      <>
      {notFound &&
      <div className="w-full flex justify-center mt-[30vh] text-2xl font-bold">

        <h1 className="">404 Página do evento não foi encontrada</h1>
      </div>
      
      
      }
      {!notFound && event &&
       <>
        <div className="h-[calc(100vh-3.5rem)] flex flex-col">
            
            <div className="mt-3 flex justify-between">
                <EventName setNotFound={setNotFound} eventName={event?.name || ''} types={event?.types || ['']}/>

            </div>

            <div className="flex justify-between h-5/6 mx-10 mt-4">

                <div className="w-[calc(48%)] flex flex-col">
                <h1 className="text-2xl">Serviços</h1>
                <div className="flex flex-col h-full justify-between">
                  <div className="h-3/6">
                  <EventServices services={event?.services}/>
                  
                  </div>
                  <div className="h-3/6">
                    <Budgets budgets={event?.budgets}/>
                  </div>
                  </div>
                </div>
              <div className="w-1/2 flex flex-col mt-4">
                  <SumaryEvent numberOfGuests={event?.numberOfGuests || 0} startTime={event?.hour || ''} endTime={event?.endTime || ''} date={event?.date ||''}/>
                    <Address place={event?.place || templatePlace} id={router.query.event as string}/>
                    <EventFinancial/>
                    <EventTodoList todoList={event?.todoList || templateTodoList}/>

                  </div>

            </div>
        </div>
      
      
      </>
      
      }
      
      </>
  
    );
  
}
