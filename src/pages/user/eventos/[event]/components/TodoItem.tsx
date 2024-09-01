import { Checkbox } from "@/components/ui/checkbox"

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
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { api } from "@/utils/api"



type Props = {
        todoItem: number,
        todoStatus: boolean,
        todoDescription: string,
}



export const TodoItem = ({todoItem, todoDescription,todoStatus}:Props) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const [checked, setChecked] = useState<boolean>()

    const handleConfirmDelete = () => {
        api.put('/deleteTodoItem', {event:{id:router.query.event, itemId:`${todoItem}`}}).then(res => {console.log(res)
            setOpen(false)

        }
    
    ).catch(err => console.log(err))

    }



    const handleCheck = () => {
        api.put('/checkTodoItem', {event:{id:router.query.event, itemId:`${todoItem}`}}).then(res => {
            setChecked(!checked)
        }
    
    )
    }
    useEffect(() => {
        console.log(todoStatus)
        setChecked(todoStatus)

    
    

    },[])


    return(
        <>
        <label htmlFor={`${todoItem}`} className="w-11/12 rounded-xl bg-gray-100 h-10 flex justify-between items-center mt-2   hover:cursor-pointer hover:bg-gray-300 hover:transition-all">
                <div className="flex">
                <Checkbox id={`${todoItem}`} checked={checked} onCheckedChange={handleCheck} className="bg-white border-none ml-3 data-[state=checked]:bg-principal-200"/>
                <p className=" ml-3 max-w-[calc(11/12)] text-sm overflow-hidden text-nowrap">{todoDescription}</p>
                </div>
                <AlertDialog open={open}>
                    <AlertDialogTrigger onClick={()=>setOpen(true)} className='mr-3 hover:text-principal-200'>deletar</AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza que quer deletar esse item?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel onClick={()=>setOpen(false)}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className='bg-principal-200 hover:bg-principal-300'
                        onClick={handleConfirmDelete}
                        
                        >Confirmar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
        </label>
        
        </>
    )
}