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
import { useRouter } from "next/router";
import { useState } from "react"




const NewTodoItem = () => {
    const router = useRouter()
    const [description, setDescription] = useState('');


    const handleSave = () => {

        api.put('/createTodoItem', {event:{description, id:router.query.event}}).then( res => {
            toast.success("Item criado com sucesso")
        }
        )

    }

    return (
        <>
        <Toaster/>
        <AlertDialog>
        <AlertDialogTrigger className="text-md">
            adicionar
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Insira a descrição de seu item.</AlertDialogTitle>
            <AlertDialogDescription>
                <input 
                className="w-full rounded-md border p-2 mb-3 text-black" 
                placeholder="Descrição do novo item" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                type="text"/>
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
        </>

    )
}

export default NewTodoItem;