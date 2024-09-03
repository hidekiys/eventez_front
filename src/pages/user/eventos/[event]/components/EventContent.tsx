
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


export const EventContent = () => {
    const router = useRouter()
    const [notFound, setNotFound] = useState(false)
    const [event, setEvent] = useState({name: '',
      types: [''],
      publicOfEvent: [''],
      place: {
          placeName: '',
          cep: '',
          street: '',
          neighborhood: '',
          state: '',
          city: '',
          number: '',
          complement:''
      },
      hour: '',
      endTime: '',
      date:'',
      numberOfGuests: 0,
      parcialValue: 0,
      services: [''],
      description:'',
      todoList:[{todoItem:0,todoStatus:false, todoDescription:''}]
  });

    
    useEffect(() => {
      api.get('getEventInfo',{headers:{eventId:router.query.event}}).then(response => {setEvent(response.data)
        
      })
      .catch(err => {console.log(err)
        if(err.response.status == 404){
        }
      })
    })


    return (
      <>
      {notFound &&
      <div className="w-full flex justify-center mt-[30vh] text-2xl font-bold">

        <h1 className="">404 Página do evento não foi encontrada</h1>
      </div>
      
      
      }
      {!notFound && <>
        <div className="h-[calc(100vh-3.5rem)] flex flex-col">
            
            <div className="mt-3 flex justify-between">
                <EventName setNotFound={setNotFound} eventName={event.name} types={event.types}/>

            </div>

            <div className="flex justify-between h-5/6 mx-10 mt-4">

                <div className="w-[calc(48%)] flex flex-col">
                <h1 className="text-2xl">Serviços</h1>
                <div className="flex flex-col h-full justify-between">
                  <div className="h-3/5">
                  <EventServices/>
                  
                  </div>
                  <div className="h-2/5">
                    <Budgets/>
                  </div>
                  </div>
                </div>
              <div className="w-1/2 flex flex-col mt-4">
                  <SumaryEvent numberOfGuests={event.numberOfGuests} startTime={event.hour} endTime={event.endTime} date={event.date}/>
                    <Address place={event.place} id={router.query.event as string}/>
                    <EventFinancial/>
                    <EventTodoList todoList={event.todoList}/>

                  </div>

            </div>
        </div>
      
      
      </>
      
      }
      
      </>
  
    );
  
}
