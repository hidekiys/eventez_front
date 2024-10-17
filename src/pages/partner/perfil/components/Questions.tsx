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


type Question = {
    ask:string,
    response:string
}


export const Questions = () =>{
    const [questions, setQuestions] = useState<Question[]>();
    const [editQuestion, setEditQuestion] = useState<Question>({ask:'',response:''});

    const handleCreateQuestion = () => {
        api.post('/postPartnerQuestion', {question:{
            ask:editQuestion.ask,
            response:editQuestion.response
        }}).then(()=>{
            toast.success('Pergunta criada com sucesso!')
        }).catch(()=>{
            toast.error('Ocorreu um erro ao tentar criar a pergunta.')
        })
    }
    const handleDeleteAsk = (index:number) => {
        api.delete(`/deletePartnerQuestion/${index}`).then(()=>{
            toast.success('Pergunta deletada com sucesso!')
        }).catch(()=>{
            toast.error('Ocorreu um erro ao tentar deletar a pergunta.')
        })
    }
    const handleUpdateQuestion = (index:number) => {
        api.put('/putPartnerQuestion', {index,
            ask:editQuestion.ask,
            response:editQuestion.response
        }).then(()=>{
            toast.success('Pergunta modificada com sucesso!')
        }).catch(()=>{
            toast.error('Ocorreu um erro ao tentar modificar a pergunta.')
        })
    }
    useEffect(()=>{
        api.get('/getPartnerQuestions').then((response)=>{
            setQuestions(response.data)
        })


    },[[], handleDeleteAsk, handleCreateQuestion, handleUpdateQuestion])

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
                        <p className="text-gray-600 text-sm">Perguntas frequentes</p>
                        <p className="text-gray-600 text-lg font-bold"></p>
                </SheetTrigger>
                <SheetContent>
                    <SheetTitle>
                        Editar perguntas frequentes
                    </SheetTitle>
                    <SheetDescription>
                        Após alterar as perguntas frequentes clique em salvar alterções.
                    </SheetDescription>
                    {
                        questions && 
                        <div className="max-h-[90%] overflow-y-auto">
                            {
                                <>
                                {
                                questions.map((key, index)=> (
                                    <Dialog key={index} onOpenChange={()=>setEditQuestion({ask:'',response:''})}>
                                        <DialogTrigger className="w-full py-1 border rounded-xl flex justify-center items-center
                                        mt-3
                                        ">
                                            {key.ask}
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle className="flex items-center gap-2">
                                                Editar pergunta frequente <Dialog>
                                                    <DialogTrigger><Trash2 size={20} color="#de3f3f" strokeWidth={1.50} /></DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle>Tem certeza que deseja excluir a pergunta?</DialogTitle>
                                                        <div className="flex justify-end gap-3">
                                                            <DialogClose className="py-1 w-36 border rounded-xl flex items-center
                                                            justify-center hover:bg-gray-300 transition-all
                                                            ">
                                                                Cancelar
                                                            </DialogClose>
                                                            <DialogClose className="py-1 w-36 bg-red-500 text-white rounded-xl flex items-center
                                                            justify-center hover:bg-red-400 transition-all
                                                            " onClick={()=>handleDeleteAsk(index)}>Excluir</DialogClose>
                                                        </div>
                                                    </DialogContent>
                                                
                                                </Dialog>
                                                
                                            </DialogTitle>
                                            <DialogDescription>
                                                    Editar pergunta frequente, após alterações clique em salvar. <br/>
                                            </DialogDescription>
                                            <label>
                                                Pergunta:
                                                <input type="text" placeholder="Insira a pergunta aqui..." 
                                                className="w-full border rounded-xl p-1" value={editQuestion?.ask}
                                                onChange={(e)=>setEditQuestion({...editQuestion, ask:e.target.value})}
                                                />
                                            </label>
                                            <label>
                                                Resposta:
                                                <input type="text" placeholder="Insira a resposta aqui..." 
                                                className="w-full border rounded-xl p-1" value={editQuestion?.response}
                                                onChange={(e)=>setEditQuestion( {...editQuestion, response:e.target.value})}
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
                                            " onClick={()=>{handleUpdateQuestion(index)}}>Salvar</DialogClose>
                                            </div>
                                            
                                        </DialogContent>
                                    </Dialog>
                                ))}
                                <Dialog onOpenChange={()=>setEditQuestion({ask:'',response:''})}>
                                        <DialogTrigger className="w-full py-1 border rounded-xl flex justify-center items-center
                                        mt-3
                                        ">
                                            <Plus size={20} color="#555555" strokeWidth={1.25} />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle className="flex items-center gap-2">
                                                Adicionar nova pergunta frequente
                                            </DialogTitle>
                                            <label>
                                                Pergunta:
                                                <input type="text" placeholder="Insira a pergunta aqui..." 
                                                className="w-full border rounded-xl p-1"value={editQuestion?.ask}
                                                onChange={(e)=>setEditQuestion({...editQuestion, ask:e.target.value})}
                                                />
                                            </label>
                                            <label>
                                                Resposta:
                                                <input type="text" placeholder="Insira a resposta aqui..." 
                                                className="w-full border rounded-xl p-1" value={editQuestion?.response}
                                                onChange={(e)=>setEditQuestion( {...editQuestion, response:e.target.value})}
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
                                            " onClick={handleCreateQuestion}>Salvar</DialogClose>
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