import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import React from "react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ComboEvents from "./ComboEvents"
import { SelectedType } from "@/types/SelectedEventType"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { api } from "@/utils/api"
import { toast, Toaster } from "sonner"

type Props = {
    getServices: string[],
    setGetServices: Dispatch<SetStateAction<string[]>>
}


const GetBudget = ({getServices, setGetServices}:Props) =>{
    const [selectedEvent, setSelectedEvent] = useState<SelectedType>({name:'',value:''})
    const [login, setLogin] = useState<boolean>(false)
    const router = useRouter()
    const [budgetText, setBudgetText] = useState("")
    const [pathname, setPathname] = useState<string | string[] | undefined>()

    const [disabledBudget, setDisabledBudget] = useState<boolean>(true)
    useEffect(()=>{
        if(router.isReady){
            setPathname(router.query.perfil)
        }
    },[router.isReady])

    useEffect(()=>{
        const cookies = parseCookies()
        if(cookies.hasOwnProperty('eventez.user.token')){
            setLogin(true)
        }

    },[])

    useEffect(()=>{
        if(getServices[0] == '' && selectedEvent.name == ''){
            setDisabledBudget(true)
        }else if(getServices[0] != '' && selectedEvent.name != ''){
            setDisabledBudget(false)
        }
    },[getServices, selectedEvent])


    const handleRemoveBadge = (service:string) =>{
        const newServices = getServices.filter((filter)=>(
            filter !== service
        ))
        if(newServices.length == 0){ setGetServices(['']); setDisabledBudget(true)}else{setGetServices(newServices);}
        
    
    }
    const handleRequestBudget = () => {
        api.put('/requestBudget',{
            eventId:selectedEvent.value,
            services:getServices,
            description:budgetText,
            partnerId:pathname
        }).then(()=>{
            toast.success('Orçamento solicitado com sucesso!')
        }).catch((err)=>{
            if(err.status == 423){
                toast.error('Este parceiro já trabalha neste evento')
            }else{
                toast.error('Ocorreu um erro ao tentar solicitar o orçamento')
            }
            
        })
    }


    return (
        <>
        <div className="z-50">
            <Toaster richColors>

            </Toaster>
        </div>
        <div className="flex flex-col p-5 gap-3 sticky h-fit w-[30%] right-10 bottom-28 bg-white rounded-xl shadow-md top-20">
        {login &&
        <>
            <h1>Pedir orçamento</h1>
                        <ComboEvents  selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}/>
                        <textarea className="w-full rounded-xl border resize-y resize-x-none px-3 py-1 min-h-56" 
                        placeholder="Digite o que deseja no orçamento..."
                        value={budgetText}
                        onChange={(e)=>setBudgetText(e.target.value)}
                        >

                        </textarea>
                        <div className="h-32 w-full rounded-xl bg-gray-100 px-3 py-1 flex gap-1">
                            {
                                getServices.length == 0 || getServices[0] == "" &&
                                <p className="text-black">Adicione os serviços ou pacotes</p>
                            }
                            {
                                getServices[0] != '' &&
                                getServices.map((key, index)=>(
                                    <Badge key={index}
                                    className="flex align-center w-fit px-1 bg-transparent rounded-full text-principal-300 
                                    font-light text-xs border border-principal-300 hover:bg-transparent shadow-none max-h-6
                                    hover:cursor-pointer hover:bg-red-200 hover:border-white transition-all
                                    "
                                    onClick={()=>handleRemoveBadge(key)}
                                    >{key}<X size={12} strokeWidth={1} /></Badge>

                                ))

                            }
                        </div>
                        <Dialog>
                            <DialogTrigger className="w-full p-1 bg-principal-300 text-white rounded-xl disabled:bg-slate-100 disabled:text-black"
                            disabled={disabledBudget}
                            >
                                Pedir orçamento
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>
                                    Tem certeza que deseja solicitar orçamento?
                                </DialogTitle>
                                <DialogDescription>
                                    Após a confirmação você enviará a solicitação à empresa e não poderá enviar outra para este evento enquanto a solicitação estiver em aberto.
                                </DialogDescription>
                                <div className="flex justify-end gap-3">
                                    <DialogClose className="w-48 py-1 border rounded-xl hover:bg-gray-200 transition-all">
                                        Cancelar
                                    </DialogClose>
                                    <DialogClose className="w-48 py-1 bg-principal-200 rounded-xl hover:bg-principal-300 transition-all
                                    text-white
                                    " onClick={handleRequestBudget}>
                                        Solicitar Orçamento
                                    </DialogClose>
                                </div>
                            </DialogContent>
                        </Dialog>
                              
        
        </>
        
        }
        {
            !login &&
            <>
            <div className="flex flex-col items-center align-middle text-center justify-center">
                <h1 className="text-center items-center flex justify-center text-lg">Fazer login para solicitar o orçamento</h1>
                <Link className="w-[75%] rounded-xl py-1 bg-principal-300 text-white mt-3" href={{
                    pathname:'/login',
                    query:{perfil:`${pathname}`}
                }}>
                <button>Login</button>
                </Link>
                <p>ou</p>
                <Link className="w-[75%] rounded-xl py-1 bg-gray-300 text-black" href='/registro'>
                <button>Registrar-se</button>
                </Link>
                
            </div>
            </>

        }
                    </div>
        </>
    )
}

export default GetBudget;