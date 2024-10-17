import React, { useEffect, useState } from "react"
import {   Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger, 
} from "@/components/ui/sheet";


import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { api } from "@/utils/api";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";

type OfferServiceType = {
    name:string,
    description:string,
    averagePrice:number
}


export const Services = () =>{
    const [offerServices, setOfferServices] = useState<OfferServiceType[]>()
    const [editService, setEditSevice] = useState<OfferServiceType>({name:'',description:'',averagePrice:0})



    const handleUpdateService = (index:number) =>{
        api.put('/putOfferService', {
            index,
            name:editService.name,
            description:editService.description,
            averagePrice:editService.averagePrice
        }).then(()=>{
            toast.success('Seriço editado com sucesso!')
        }).catch(()=>{
            toast.error('Ocorreu um erro ao tentar editar o serviço.')
        })
    }
    const handleCreateService = () =>{
        api.post('/postOfferService', {
            service:{
                name:editService.name,
                description:editService.description,
                averagePrice:editService.averagePrice
            }
        }).then(()=>{
            toast.success('Serviço criado com sucesso!')
        }).catch(()=>{
            toast.error('Ocorreu um erro ao tentar criar o serviço.')
        })
    }
    const handleDeleteService = (index:number) =>{
        api.delete(`/deletePartnerService/${index}`).then(()=>{
            toast.success('Serviço deletado com sucesso!')
        }).catch(()=>{
            toast.error('Ocorreu um erro ao tentar deletar o serviço.')
        })
    }

    useEffect(()=>{
        api.get('/getPartnerOfferServices').then((response)=>{
            setOfferServices(response.data)
        })
    }, [[], handleUpdateService, handleCreateService, handleDeleteService])


    return (
        <>
        <div className="z-50">
            <Toaster richColors/>
        </div>
            <Sheet>
                <SheetTrigger className="bg-white rounded-md  transition-all
                    h-14 ml-14 mt-3 max-w-fit p-5 min-w-60
                    flex flex-col items-start justify-center
                    hover:shadow-md hover:scale-105">
                        <p className="text-gray-600 text-sm">Serviços</p>
                        <p className="text-gray-600 text-lg font-bold"></p>
                </SheetTrigger>
                <SheetContent>
                    <SheetTitle>
                        Editar serviços
                    </SheetTitle>
                    <SheetDescription>
                        Após alterar os serviços clique em salvar alterções.
                    </SheetDescription>
                    {
                        offerServices && 
                        <div className="max-h-[90%] overflow-y-auto">
                            {
                                <>
                                {
                                offerServices.map((key, index)=> (
                                    <Dialog key={index} onOpenChange={()=>setEditSevice({name:'',description:'',averagePrice:0})}>
                                        <DialogTrigger className="w-full py-1 border rounded-xl flex justify-center items-center
                                        mt-3
                                        ">
                                            {key.name}
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle className="flex items-center gap-2">
                                                {key.name} <Dialog>
                                                    <DialogTrigger><Trash2 size={20} color="#de3f3f" strokeWidth={1.50} /></DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle>Tem certeza que deseja excluir {key.name}?</DialogTitle>
                                                        <div className="flex justify-end gap-3">
                                                            <DialogClose className="py-1 w-36 border rounded-xl flex items-center
                                                            justify-center hover:bg-gray-300 transition-all
                                                            ">
                                                                Cancelar
                                                            </DialogClose>
                                                            <DialogClose className="py-1 w-36 bg-red-500 text-white rounded-xl flex items-center
                                                            justify-center hover:bg-red-400 transition-all
                                                            " onClick={()=>handleDeleteService(index)}>Excluir</DialogClose>
                                                        </div>
                                                    </DialogContent>
                                                
                                                </Dialog>
                                                
                                            </DialogTitle>
                                            <DialogDescription>
                                                    Editar serviço oferecido, após alterações clique em salvar. <br/>
                                                    Caso não queira editar algum campo, deixe em branco.
                                            </DialogDescription>
                                            <label>
                                                Nome do serviço:
                                                <input type="text" placeholder="Insira o nome do serviço aqui..." 
                                                className="w-full border rounded-xl p-1" value={editService?.name}
                                                onChange={(e)=>setEditSevice({...editService, name:e.target.value})}
                                                />
                                            </label>
                                            <label>
                                                Preço médio do serviço:
                                                <input type="number" placeholder="Insira o nome do preço médio aqui..." 
                                                className="w-full border rounded-xl p-1" value={editService?.averagePrice}
                                                onChange={(e)=>parseFloat(e.target.value) >= 0 ? setEditSevice( {...editService, averagePrice:parseFloat(e.target.value)}) : setEditSevice( {...editService, averagePrice:0})}
                                                />
                                            </label>
                                            <label>
                                                Descrição do serviço:
                                                <textarea placeholder="Insira o descrição do serviço aqui..." 
                                                className="w-full border rounded-xl p-1 resize-y" value={editService?.description}
                                                onChange={(e)=>setEditSevice({...editService, description:e.target.value})}
                                                />
                                            </label>
                                            <div className="flex justify-end gap-3">
                                                <DialogClose className="py-1 w-36 border rounded-xl flex items-center
                                                justify-center hover:bg-gray-300 transition-all
                                                ">
                                                    Cancelar
                                                </DialogClose>
                                            <DialogClose className="py-1 w-36 bg-principal-200 text-white rounded-xl flex items-center
                                            justify-center hover:bg-principal-300 transition-all
                                            " onClick={()=>{handleUpdateService(index)}}>Salvar</DialogClose>
                                            </div>
                                            
                                        </DialogContent>
                                    </Dialog>
                                ))}
                                <Dialog onOpenChange={()=>setEditSevice({name:'',description:'',averagePrice:0})}>
                                        <DialogTrigger className="w-full py-1 border rounded-xl flex justify-center items-center
                                        mt-3
                                        ">
                                            <Plus size={20} color="#555555" strokeWidth={1.25} />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle className="flex items-center gap-2">
                                                Adicionar novo serviço oferecido
                                            </DialogTitle>
                                            <label>
                                                Nome do serviço:
                                                <input type="text" placeholder="Insira o nome do serviço aqui..." 
                                                className="w-full border rounded-xl p-1" value={editService?.name}
                                                onChange={(e)=>setEditSevice({...editService, name:e.target.value})}
                                                />
                                            </label>
                                            <label>
                                                Preço médio do serviço:
                                                <input type="text" placeholder="Insira o nome do preço médio aqui..." 
                                                className="w-full border rounded-xl p-1" value={editService?.averagePrice}
                                                onChange={(e)=>parseFloat(e.target.value) >= 0 ? setEditSevice( {...editService, averagePrice:parseFloat(e.target.value)}) : setEditSevice( {...editService, averagePrice:0})}
                                                />
                                            </label>
                                            <label>
                                                Descrição do serviço:
                                                <textarea placeholder="Insira o descrição do serviço aqui..." 
                                                className="w-full border rounded-xl p-1 resize-y" value={editService?.description}
                                                onChange={(e)=>setEditSevice({...editService, description:e.target.value})}
                                                />
                                            </label>
                                            <div className="flex justify-end gap-3">
                                                <DialogClose className="py-1 w-36 border rounded-xl flex items-center
                                                justify-center hover:bg-gray-300 transition-all
                                                ">
                                                    Cancelar
                                                </DialogClose>
                                            <DialogClose className="py-1 w-36 bg-principal-200 text-white rounded-xl flex items-center
                                            justify-center hover:bg-principal-300 transition-all
                                            " onClick={handleCreateService}>Salvar</DialogClose>
                                            </div>
                                            
                                        </DialogContent>
                                    </Dialog>
                                </>
                            }
                            
                        </div>
                    }
                    
                </SheetContent>
                
            </Sheet>
        
        </>
    )
}