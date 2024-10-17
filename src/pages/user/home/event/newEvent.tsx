import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DatePicker } from "./DatePicker";

import { FormEvent, useState } from "react";
import { TimePicker } from "./TimePicker";
import { EventsType } from "@/types/EventsType";
import { api } from "@/utils/api";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { Separator } from "@/components/ui/separator";
import { ComboboxDemo } from "./ComboTypes";
import { SelectType } from "./Select";
import { SelectPublic } from "./SelectPublic";
import { EndTimePicker } from "./endTimePicker";
import Router from "next/router";
import React from "react";


  
export const NewEvent = () => {
    const [status, setStatus] = useState('')
    const [hasCreated, setHasCreated] = useState(false)
    const [hasPlace, setHasPlace] = useState(false)
    const [step, setStep] = useState(0)
    const [eventId, setEventId] = useState('')
    const [event, setEvent] = useState<EventsType>(
        {name: '',
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
            description:''
        }
    )

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        if(!hasCreated){
            console.log('false')
            api.post('/createNewEvent', { name:event.name, numberOfGuests:event.numberOfGuests, date:event.date, endTime:event.endTime, hour:event.hour }).then(res => {
                setStatus('')
                setEventId(res.data.id)
                setStep(()=>step+1)
                setHasCreated(true)
                return
            }).catch(err => {
                setStatus(err.response.data)
                console.log(err)
            })
            
        }
        if(hasCreated){
            switch (step){
                case 0: api.put('/editEvent', { event:{name:event.name, numberOfGuests:event.numberOfGuests, date:event.date, hour:event.hour, endTime:event.endTime, id: eventId}}).then(res => {
                    setStatus('');
                    setStep(() => step+1);
                    return;
                }).catch(err => {
                    setStatus(err.response.data);
                    console.log(err);
                })
                break;
                case 1: 
                    if(hasPlace){
                        api.put('/editEvent', { event:{place:{placeName:event.place.placeName,
                            cep:event.place.cep, street:event.place.street, city:event.place.city, state:event.place.state,
                            neighborhood:event.place.neighborhood, number:event.place.number, complement:event.place.complement},
                             id: eventId}}).then(res => {
                            setStatus('');
                            setStep(() => step+1);
                            
                            return;
                        }).catch(err => {
                            console.log(step);
                            setStatus(err.response.data);
                            console.log(err);
                            return;
                            
                        })
                    }else{
                        setStatus('');
                        setStep(() => step+1);
                        return;
                    };
                    break;
                case 2: 
                    if(event.description === '') return setStatus(''), setStep(() => step+1);
                    api.put('/editEvent', { event:{description:event.description, id: eventId}}).then(res => {
                        setStatus('');
                        setStep(() => step+1);
                        return;
                    }).catch(err => {
                        setStatus(err.response.data);
                        console.log(err);
                        return;
                    })
                    break;
                case 3: 
                    if(event.types[0] == '') return setStatus('Selecione os tipos de seu evento')
                    else if(event.types[0] != ''){
                        api.put('/editEvent', { event:{types:event.types, id: eventId}}).then(res => {
                            setStatus('');
                            setStep(() => step+1);
                            return;
                        }).catch(err => {
                            console.log(step);
                            setStatus(err.response.data);
                            console.log(err);
                            return;
                        })
                    }
                    break;
                    case 4: 
                    if(event.publicOfEvent[0] == '') return setStatus('Selecione o público de seu evento')
                    else if(event.publicOfEvent[0] != ''){
                        api.put('/editEvent', { event:{publicOfEvent:event.publicOfEvent, id: eventId}}).then(res => {
                            setStatus('');
                            Router.push(`/user/eventos/${eventId}`)

                            return;
                        }).catch(err => {
                            setStatus(err.response.data);
                            console.log(err);
                            return;
                        })
                    }
                    break;

                default: return;
            
            }
            }
            
            
        

    }

    const handleBackButton = () => {
        if(step>0){
            setStep(() => step-1)
            return
        }else{ return}
    }
    const handleSetHasPlace = (value:string) => {
        if (value === "true") setHasPlace(true)
        if (value === "false") setHasPlace(false)
        return
    }

    const checkCEP = () => {

        
    
        // Verifica se campo cep possui valor informado.
        if (event.place.cep !== '') {
          // Expressão regular para validar o CEP.
          const validacep = /^[0-9]{8}$/;
    
          // Valida o formato do CEP.
          if (validacep.test(event.place.cep)) {
            fetch(`https://viacep.com.br/ws/${event.place.cep}/json/`)
            .then(res => 
            res.json()).then(data => {
            setEvent({...event, place:{...event.place, state:data.uf, street:data.logradouro, neighborhood:data.bairro, city:data.localidade}})
            
          })
        }
        }}

        const handleClose = () => {
            if(!hasCreated) return;
            if(hasCreated){ 
                api.delete('/deleteEvent', {data:{eventId}}).then(()=>{
                    setStep(0)
                    setHasCreated(false)
                    setEvent({name: '',
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
                        description:''
                    })
                    setEventId('')
                    setHasPlace(false)
                    setStatus('')
                   }).catch(err => { console.log(err)})
               
            }
        }


    return(
        <>
            
            <Dialog onOpenChange={handleClose}>
            <DialogTrigger>Adicionar novo evento</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Criar novo evento</DialogTitle>
                <DialogDescription>
                    Informe as características de seu evento para que possamos lhe ajudar:
                </DialogDescription>
                </DialogHeader>
                {step == 0 && <form className="transition-all" onSubmit={(e) => handleSubmit(e)}>
                    <label className="text-sm text-gray-800 flex flex-col mb-3">
                        Nome do evento
                        <input type="text" 
                        placeholder="Insira o nome do evento aqui"
                        className="p-2 border border-gray-300 rounded-lg my-1"
                        value={event.name}
                        onChange={(e)=>setEvent({...event, name:e.target.value})}
                        />
                    </label>
                    <label className="text-sm text-gray-800 flex flex-col mb-3">
                        Quantos convidados planeja ter?
                        <input type="number"
                        placeholder="Insira quantos convidados deseja ter aqui"
                        className="p-2 border border-gray-300 rounded-lg my-1" 
                        value={event.numberOfGuests}
                        onChange={(e)=>setEvent({...event, numberOfGuests:parseInt(e.target.value)})}
                        />
                    </label>
                    <label className="text-sm text-gray-800 flex flex-col mb-3">
                        Quando vai ser o evento?
                        <DatePicker setEventDate={setEvent} event={event}/>
                    </label>
                    <label className="text-sm text-gray-800 flex flex-col">
                        Qual o horário de início?
                        <TimePicker setEventTime={setEvent} event={event}/>
                    </label>
                    <label className="text-sm text-gray-800 flex flex-col">
                        Qual o horário de término?
                        <EndTimePicker setEventTime={setEvent} event={event}/>
                    </label>
                    {status !== '' &&
                    <p className="text-sm text-principal-200">{status}</p>
                    
                    }
                    <div className="flex justify-end">
                        <button type="submit" 
                        className="h-8 bg-principal-200 rounded-lg text-white p-3 flex items-center justify-center
                        mt-3 w-36
                        "
                        >Próximo</button>
                    </div>
                    

                </form>}
                {step == 1 && 
                <form className="transition-all" onSubmit={(e) => handleSubmit(e)}>
                    <label className="text-sm text-gray-800 flex flex-col mb-3">
                        Você tem um local definido para o evento?
                        <Select onValueChange={handleSetHasPlace}>
                            <SelectTrigger className="p-2 border border-gray-300 rounded-lg my-1">
                                <SelectValue placeholder={hasPlace ? <p>Sim</p> : <p>Não</p>}/>
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="false">Não</SelectItem>
                                <SelectItem value="true">Sim</SelectItem>
                            </SelectContent>
                        </Select>
                    </label>
                    {hasPlace && 
                    <>
                        <label className="text-sm text-gray-800 flex flex-col mb-3">
                            Local
                            <input type="text"
                            placeholder="Ex: Buffet Alegria, Casa do Matheus, Mansão Eventos..."
                            className="p-2 border border-gray-300 rounded-lg my-1" 
                            value={event.place.placeName}
                            onChange={(e)=>setEvent({...event, place:{...event.place, placeName:e.target.value}})}
                            />
                        </label>
                        <div className="flex w-full">
                        <div className="w-4/12">
                        <label className="text-sm text-gray-800 flex flex-col mb-3">
                            CEP
                            <input type="text"
                            placeholder="Digite o CEP aqui"
                            className="p-2 border border-gray-300 rounded-lg my-1" 
                            value={event.place.cep}
                            onChange={(e)=>setEvent({...event, place:{...event.place, cep:e.target.value.replace('-','')}})}
                            onBlur={checkCEP}
                            />
                        </label>
                        <label className="text-sm text-gray-800 flex flex-col">
                            Número
                            <input type="text"
                            placeholder="Digite o número"
                            className="p-2 border border-gray-300 rounded-lg my-1" 
                            value={event.place.number}
                            onChange={(e)=>setEvent({...event, place:{...event.place, number:e.target.value}})}
                            />
                        </label>
                        
                        </div>
                        <Separator orientation="vertical" className="mx-3 mt-3 h-32 border border-gray-200"/>
                        <div className="flex flex-col gap-3 mt-3 ml-2 font-light w-full">
                            <label className="flex">Logradouro: <p className="font-normal text-sm flex w-fit mt-[3px] ml-1">{event.place.street}</p></label>
                            <label className="flex">Bairro: <p className="font-normal text-sm flex w-fit mt-[3px] ml-1">{event.place.neighborhood}</p></label>
                            <label className="flex">Cidade: <p className="font-normal text-sm flex w-fit mt-[3px] ml-1">{event.place.city}</p></label>
                            <label className="flex">Estado: <p className="font-normal text-sm flex w-fit mt-[3px] ml-1">{event.place.state}</p></label>
                        </div>
                        
                        </div>
                        <label className="text-sm text-gray-800 flex flex-col">
                            Complemento
                            <input type="text"
                            placeholder="Ex: Salão de festas, ap 93, buffet laranja..."
                            className="p-2 border border-gray-300 rounded-lg my-1" 
                            value={event.place.complement}
                            onChange={(e)=>setEvent({...event, place:{...event.place, complement:e.target.value}})}
                            />
                        </label>
                        
                    </>
                    }
                    
                    
                    {status !== '' &&
                    <p className="text-sm text-principal-200">{status}</p>
                    
                    }
                    <div className="flex flex-row-reverse justify-start">
                        
                        <button type="submit" 
                        className="h-8 bg-principal-200 rounded-lg text-white p-3 flex items-center justify-center
                        mt-3 w-36
                        "
                        >Próximo</button>
                        <button onClick={handleBackButton}
                        className="h-8 bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-center
                        mt-3 w-36 text-gray-900 mr-2
                        "
                        >Voltar</button>
                    </div>
                    
                    

                </form>}
                {step == 3 && 
                <form className="transition-all" onSubmit={(e) => handleSubmit(e)}>
                    <label className="text-sm text-gray-800 flex flex-col mb-3">
                        <div className="flex gap-2 my-2">Selecione o que mais se adequa ao seu evento:</div>
                        
                    </label>
                    <SelectType event={event} setEvent={setEvent}/>
                    
                    
                    {status !== '' &&
                    <p className="text-sm text-principal-200">{status}</p>
                    
                    }
                    <div className="flex flex-row-reverse justify-start">
                        
                        <button type="submit" 
                        className="h-8 bg-principal-200 rounded-lg text-white p-3 flex items-center justify-center
                        mt-3 w-36
                        "
                        >Próximo</button>
                        <button onClick={handleBackButton}
                        className="h-8 bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-center
                        mt-3 w-36 text-gray-900 mr-2
                        "
                        >Voltar</button>
                    </div>
                    
                    

                </form>}
                {step == 4 && 
                <form className="transition-all" onSubmit={(e) => handleSubmit(e)}>
                    <label className="text-sm text-gray-800 flex flex-col mb-3">
                        <div className="flex gap-2 my-2">Selecione o tipo de público do seu evento:</div>
                        
                    </label>
                    <SelectPublic event={event} setEvent={setEvent}/>
                    
                    
                    {status !== '' &&
                    <p className="text-sm text-principal-200">{status}</p>
                    
                    }
                    <div className="flex flex-row-reverse justify-start">
                        
                        <button type="submit" 
                        className="h-8 bg-principal-200 rounded-lg text-white p-3 flex items-center justify-center
                        mt-3 w-36
                        "
                        >Próximo</button>
                        <button onClick={handleBackButton}
                        className="h-8 bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-center
                        mt-3 w-36 text-gray-900 mr-2
                        "
                        >Voltar</button>
                    </div>
                    
                    

                </form>}
                {step == 2 && 
                <form className="transition-all" onSubmit={(e) => handleSubmit(e)}>
                    <label className="text-sm text-gray-800 flex flex-col mb-3">
                        <div className="flex gap-2">Faça uma breve descrição sobre o evento<p className="text-xs mt-[3px] text-gray-300">*opcional</p></div>
                        <textarea className="text-black p-1 mt-2 rounded-md border border-gray-300 resize-none h-24" 
                        placeholder="Faça uma descrição para o evento aqui, esta descrição será enviada para 
                        as empresas em que solicita o orçamento"
                        value={event.description}
                        onChange={(e)=>setEvent({...event, description:e.target.value})}
                        ></textarea>
                    </label>
                    
                    
                    {status !== '' &&
                    <p className="text-sm text-principal-200">{status}</p>
                    
                    }
                    <div className="flex flex-row-reverse justify-start">
                        
                        <button type="submit" 
                        className="h-8 bg-principal-200 rounded-lg text-white p-3 flex items-center justify-center
                        mt-3 w-36
                        "
                        >Próximo</button>
                        <button onClick={handleBackButton}
                        className="h-8 bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-center
                        mt-3 w-36 text-gray-900 mr-2
                        "
                        >Voltar</button>
                    </div>
                    
                    

                </form>}
                
                

            </DialogContent>
            </Dialog>
        </>
    );
}