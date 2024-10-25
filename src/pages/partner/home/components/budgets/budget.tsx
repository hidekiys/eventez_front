import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { api } from "@/utils/api"
import { headers } from "next/headers"
import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"
import { EventSummary } from "@/types/EventSummaryType"
import {publicOfEvent} from "@/data/publicOfEvent"



type Props = {
        services: [string],
        value: number,
        event: string,
        budgetId:string,
        status:string,
        description:string
}



const Budget = ({event,services,status, budgetId ,description}:Props) => {


    const [summary, setSummary] = useState<EventSummary | undefined>();
    const [newValue, setValue] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        api.get("/getEventSummary", {headers:{eventid:event}}).then((response)=> {
            setSummary(response.data)
        })
    },[])


    const handleSendButton = () => {
        api.put('/createBudget', {
            eventId:event,
            budgetId:budgetId,
            description:newDescription,
            value:parseFloat(newValue)
        }).then( (res) =>{
            setOpen(false)
            toast.success("Orçamento enviado com sucesso!")
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
    <>
        <div className=" z-40">
            <Toaster richColors/>
        </div>
        <Dialog onOpenChange={() => setOpen(!open)} open={open}>
            <DialogTrigger>
                
            <div className="bg-white rounded-lg w-full 
                        grid grid-cols-8 p-1 items-center justify-items-start min-w-28 max-w-2xl hover:bg-gray-200 hover:transition-all">
                            <p className="col-span-1 text-xs">{`${summary?.date?.slice(8, 10)}/${summary?.date?.slice(5,7)}/${summary?.date?.slice(0,4)}`}</p>
                            <p className="col-span-3 flex flex-col items-start">{summary?.name}
                                <p className="text-xs">{summary?.types?.join(' ')}</p>

                            </p>
                            <p className="col-span-3">{summary?.owner}</p>
                            <p className="col-span-1 justify-self-end mr-7 text-xs">{summary?.numberOfGuests}</p>
                        </div>
            </DialogTrigger>


            {status == "request" && summary != undefined && summary.date != undefined &&
                <DialogContent className="min-w-[50vw] min-h-fit">
                <DialogHeader>
                <DialogTitle>Criar orçamento</DialogTitle>
                <DialogDescription>
                    após finalizar clique em enviar.
                </DialogDescription>
                </DialogHeader>
                <div className="mt-0 h-full">


                    <div className="flex gap-3 w-full max-h-fit min-h-fit">
                        <div className="px-4 py-2 rounded-xl  bg-white text-sm w-2/5 overflow-y-auto">
                            <h1 className="text-lg">{summary?.name}</h1>
                            <p>Cliente: {summary?.owner}</p>
                            <p>Convidados: {summary?.numberOfGuests}</p>
                            <p>Público: {summary?.publicOfEvent?.join(', ')}</p>
                            <p>Horário: {summary?.initialTime?.substring(0,5)} - {summary?.endTime?.substring(0,5)}</p>
                            <p>Data: {`${summary?.date?.slice(8, 10)}/${summary?.date?.slice(5,7)}/${summary?.date?.slice(0,4)}`}</p>
                            <p>Local: {summary?.place?.placeName}</p>
                            <p>Endereço: {summary?.place?.street}, {summary?.place?.number}</p>
                        </div>
                        <div className="px-4 py-2 rounded-xl overflow-y-auto bg-white text-md w-2/5">
                        Solicitação
                                <p className="text-sm">{description}</p>
                            </div>
                        <div className="flex flex-col gap-3 w-3/5 ">
                            <div className="p-2 rounded-xl bg-white w-full h-full flex flex-col text-lg">
                                Serviços solicitados
                                <p className="text-sm">{services?.join(', ')}</p>
                            </div>
                            <div className="p-2 rounded-xl bg-white w-full">
                                Termos e condições de contrato
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col mt-3 h-full">
                        <h1 className="text-lg">Descrição do serviço</h1>
                        <textarea name="" placeholder="Digite aqui a descrição de seu serviço..." id=""
                        className=" resize-y p-1 min-h-60 text-sm" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}
                        ></textarea>
                        <label className="mt-3 flex text-lg">
                            Total:
                            <input type="number" name="" placeholder="Digite o valor total do serviço..." id=""
                            className="p-2 rounded-lg ml-2 w-full text-sm" value={newValue} onChange={(e) => setValue(e.target.value)}/>
                        </label>
                        <div className="flex justify-end gap-3 mt-3">
                        <DialogClose asChild>

                            <button
                            className="px-3 py-1 rounded-lg border border-gray-200"
                            >Cancelar</button>

                        </DialogClose>
                            <Dialog>
                                <DialogTrigger>
                                    <button
                                    className="px-3 py-1 rounded-lg bg-principal-200 text-white"
                                    >Enviar</button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Você deseja confirmar o envio do orçamento?
                                        </DialogTitle>
                                        <DialogDescription>
                                            Ao confirmar você está aceitando os termos e condições de contrato.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex gap-2 justify-end">
                                        <DialogClose asChild>

                                            <button
                                            className="px-3 py-1 rounded-lg border border-gray-200"
                                            >Cancelar</button>

                                        </DialogClose>
                                    

                                    <button
                                    className="px-3 py-1 rounded-lg bg-principal-200 text-white"
                                    onClick={handleSendButton}
                                    >Confirmar</button>

                                    </div>
                                    

                                </DialogContent>
                            </Dialog>
                            
                        </div>
                    </div>
                </div>

            </DialogContent>
            
        }
            {status == "sended" &&
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {summary?.name}
                        </DialogTitle>
                        <DialogDescription>
                            Este orçamento está aguardando respostas do cliente.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-0 h-full">


                        <div className="flex gap-3 w-full max-h-fit min-h-fit">
                            <div className="px-4 py-2 rounded-xl  bg-white text-sm w-2/5">
                                <h1 className="text-lg">{summary?.name}</h1>
                                <p>Cliente: {summary?.owner}</p>
                                <p>Convidados: {summary?.numberOfGuests}</p>
                                <p>Público: {summary?.publicOfEvent?.join(', ')}</p>
                                <p>Horário: {summary?.initialTime?.substring(0,5)} - {summary?.endTime?.substring(0,5)}</p>
                                <p>Data: {`${summary?.date.slice(8, 10)}/${summary?.date.slice(5,7)}/${summary?.date.slice(0,4)}`}</p>
                                <p>Local: {summary?.place?.placeName}</p>
                                <p>Endereço: {summary?.place?.street}, {summary?.place?.number}</p>
                            </div>
                            <div className="flex flex-col gap-3 w-3/5 ">
                                <div className="p-2 rounded-xl bg-white w-full h-full flex flex-col text-lg">
                                    Serviços solicitados
                                    <p className="text-sm">{services.join(', ')}</p>
                                </div>
                                <div className="p-2 rounded-xl bg-white w-full">
                                    Termos e condições de contrato
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col mt-3 h-full">
                            <div className="flex justify-end gap-3 mt-3">
                                <DialogClose asChild>

                                    <button
                                    className="px-3 py-1 rounded-lg border border-gray-200"
                                    >Fechar</button>

                                </DialogClose>
                            </div>
                        </div>
                    </div>
                    


                </DialogContent>
                
            }
            
            </Dialog>
        
        </>
    )
}

export default Budget;