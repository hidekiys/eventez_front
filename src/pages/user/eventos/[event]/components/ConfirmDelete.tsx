import React, { Dispatch, SetStateAction } from 'react';
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

  import {api} from '@/utils/api'
import { useRouter } from 'next/router';
import Router from 'next/router'


type Props = {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    setNotFound: Dispatch<SetStateAction<boolean>>
}

const ConfirmDelete = ({open, setOpen,setNotFound}:Props) => {
  const router = useRouter();

  const handleConfirmDelete = () => {
    setNotFound(true)
       api.delete('/deleteEvent', {data:{eventId:router.query.event}}).then(()=>{
        
        Router.push('/user/home')
       }).catch(err => {})
   }

  return (
    <AlertDialog open={open}>
    <AlertDialogTrigger onClick={()=>setOpen(true)} className='border py-1 hover:bg-red-400 hover:transition-all hover:border-none rounded-lg border-gray-500'>Deletar</AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza que quer deletar esse evento?</AlertDialogTitle>
        <AlertDialogDescription>
            Para deletar o evento, você não pode ter contratado nenhum serviço.
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel onClick={()=>setOpen(false)}>Cancelar</AlertDialogCancel>
        <AlertDialogAction className='bg-principal-200 hover:bg-principal-300'
        onClick={handleConfirmDelete}
        
        >Confirmar</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  );
};
export default ConfirmDelete;


































//<-- 69 kakakakaka slk mlk sabe q te considero pra krl tmjt sempre vlw por tudo, silvio santos 