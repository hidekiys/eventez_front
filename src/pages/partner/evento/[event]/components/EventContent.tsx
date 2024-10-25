
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { api } from "@/utils/api";
import EventName from "./EventName";
import  Address  from "./EventAddress";
import SumaryEvent  from "./Summary";
import { EventSummary } from "@/types/EventSummaryType";
import Link from "next/link";
import { PartnerContext } from "@/contexts/PartnerContext";
import React from "react";



type eventType = {
  name: string,
      types: [string],
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

const EventContent = () => {

  
  type partnerEvent = {

    value: number;
    eventId: string;
    services: string[];
    description: string;
}
type Services = {
  partnerName:string,
  partnerId:string
}[]
    const router = useRouter()
    const [notFound, setNotFound] = useState(false)
    const [event, setEvent] = useState<partnerEvent>();
    const [services, setServices] = useState<Services>();
    const partner = useContext(PartnerContext);



  
      const [summaryEvent, setSummaryEvent] = useState<EventSummary>()
  
  
  
      useEffect(()=>{
        if(router.isReady)

          {
          api.get('/getEventSummary', {headers:{eventid:router.query.event}}).then( (response)=>{
              setSummaryEvent(response.data)
  
          }
          )
          api.get('/getPartnerEvent',{headers:{eventId:router.query.event}}).then(response => {console.log(response.data);setEvent(response.data)})
          .catch(err => {console.log(err)
            if(err.response.status == 404){
            }
          })
          setTimeout(()=>{
            api.get(`/getEventServices/${router.query.event}`).then((response)=>{
              setServices(response.data)
            }).catch((err)=>{return})
          }, 1000)
          
        }
        
  
      },[router.isReady])


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
                <EventName setNotFound={setNotFound} eventName={summaryEvent?.name || ''} types={summaryEvent?.types || ['']}/>

            </div>

            <div className="flex justify-between h-5/6 mx-10 mt-4">

                <div className="w-[calc(48%)] flex flex-col">
                  <div className="bg-white rounded-xl h-3/6 py-1 px-3">
                    <h1 className="text-2xl">Solicitação</h1>
                    <p className="max-h-[80%] overflow-y-auto mt-2">{event.description}</p>

                  </div>
                  <div className="h-3/6">
                        
                  </div>
                  
                </div>
                <div className="w-1/2 flex flex-col">
                  <SumaryEvent numberOfGuests=      {summaryEvent?.numberOfGuests || 0} startTime={summaryEvent?.initialTime || ''} endTime={summaryEvent?.endTime || ''} date={summaryEvent?.date ||''}/>
                  <Address place={summaryEvent?.place || templatePlace} id={router.query.event as string}/>
                    <h1 className="text-2xl mt-2">Chats</h1>
                    <div className="max-w-full min-w-60 flex flex-col items-start align-middle 
                    justify-center overflow-y-auto max-h-72">
                      { <>
                        {services?.length == 1 && 
                          <div className="h-6 w-full rounded-xl mt-2 px-3 py-5 flex 
                          items-center">
                            Ainda não há outros colaboradores neste evento.
                          </div>
                        }
                        <Link href={{
                            pathname:`/partner/chat`, 
                            query:{ chat:summaryEvent?.ownerId, chatName:summaryEvent?.owner }

                            }} 
                          className="h-6 w-full rounded-xl mt-2 px-3 py-5 flex 
                          items-center bg-white transition-all hover:bg-gray-200">
                            Dono do evento: {summaryEvent?.owner}
                          </Link>
                        {services && services.map((key, index)=>(
                          key.partnerId != partner.partner.id &&
                          <Link href={{
                            pathname:`/partner/chat`, 
                            query:{ chat:key.partnerId, chatName:key.partnerName }

                            }} 
                          key={index} className="h-6 w-full rounded-xl mt-2 px-3 py-5 flex 
                          items-center bg-white transition-all hover:bg-gray-200">
                            {key.partnerName}
                          </Link>
                        ))}
                        </>
                      }
                      
                    </div>
                </div>

            </div>
        </div>
      
      
      </>
      
      }
      
      </>
  
    )
}


export default EventContent;