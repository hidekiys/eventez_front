import React, { useEffect, useState } from "react"
import {   Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger, 
} from "@/components/ui/sheet";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { api } from "@/utils/api";





const AboutMe = () =>{
    const [about, setAbout] = useState<string>()




    const handleEditPartnerAbout = () => {
        api.put('/putPartnerAbout', {about:about}).then(()=>{
            toast.success('Sobre da empresa editado com sucesso!');
        }).catch(()=>{
            toast.error('Ocorreu um erro ao tentar editar o sobre da empresa.')
        })
    }
    useEffect(()=>{
        api.get('/getPartnerAbout').then((response)=>{
            setAbout(response.data)
        })
    },[])


    return (
        <>
        <div className="z-50">
            <Toaster richColors></Toaster>
        </div>
            <Sheet>
                <SheetTrigger className="bg-white rounded-md  transition-all
                    h-14 ml-14 mt-3 max-w-fit p-5 min-w-60
                    flex flex-col items-start justify-center
                    hover:shadow-md hover:scale-105">
                        <p className="text-gray-600 text-sm">Sobre a empresa</p>
                        <p className="text-gray-600 text-lg font-bold"></p>
                </SheetTrigger>
                <SheetContent>
                    <SheetTitle>
                        Sobre a empresa
                    </SheetTitle>
                    <SheetDescription className="mb-6">
                        Após as alterações clique em salvar.
                    </SheetDescription>
                    <label className="font-semibold">
                        Editar sobre a empresa
                        <textarea className="w-full rounded-xl resize-y min-h-[40%] px-2 mt-2 max-h-[80%] text-sm
                        font-normal
                        "
                         value={about} onChange={(e)=>setAbout(e.target.value)}></textarea>
                    </label>
                    <SheetClose className="w-full py-1 bg-principal-200 text-white rounded-xl hover:bg-principal-300
                    transition-all mt-3
                    " onClick={handleEditPartnerAbout}>Salvar</SheetClose>
                </SheetContent>
            </Sheet>
        
        </>
    )
}

export default AboutMe;