
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import {   Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger, } from "@/components/ui/sheet";
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


import { useContext, useEffect, useState } from "react";
import { api } from "@/utils/api";
import { UserContext } from "@/contexts/UserContext";
import { FullName } from "@/types/FullName";


export const EditProfile = () => {
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState<FullName>({name:'', lastName:''});
    const { user, setUser } = useContext(UserContext);
    const [pass, setPass] = useState('');
    const [open, setOpen] = useState(false);
    

    useEffect(() => {
        if (user.name.lastName) {setFullName({name: user?.name.firstName, lastName:user?.name.lastName})} else { setFullName({...fullName})}
        
        
    }, [user.url_avatar])



    useEffect(() => {
        api.get('/getPhone').then((response) => {
            setPhone(response.data.phone)
        })
    }, [])

    
    const handleSave = () => {
        api.put('/putUserInfo', {
            ...user,
                name:{
                    firstName: fullName.name,
                    lastName: fullName.lastName
                },
                phone: phone,
                pass: pass
            
        }).then( () => {
            setUser({...user, name:{firstName:fullName.name, lastName:fullName.lastName}})
            toast.success("Alterações salvas com sucesso!")
            setPass("")
            setOpen(false)
            
        }
            
        ).catch((err) => {
            console.log(err)
            toast.error(err.response.data)
            
            
        })
    }
    
    
    return(
        <>
        <div className=" z-40">
            <Toaster richColors/>
        </div>
        
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className="bg-white rounded-md  transition-all
                    h-20 ml-14 mt-3
                    flex flex-col items-start justify-center max-w-fit p-5 min-w-60
                    hover:shadow-md hover:scale-105">
                    <p className="text-gray-600 text-sm">Editar Informações do</p>
                    <p className="text-gray-600 text-lg font-bold">{fullName.name+' '+fullName.lastName}</p>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle>Editar perfil</SheetTitle>
                    <SheetDescription>
                        Mude as informações de seu perfil aqui. Clique em salvar alterações quando estiver pronto.
                        <h1 className="text-lg mt-6">Nome</h1>
                        <div className="flex flex-col gap-2 mt">
                            <input type="text" value={fullName.name} 
                            onChange={e => setFullName({...fullName, name:e.target.value})}
                            placeholder="Primeiro nome"
                            className="h-10 w-80 shadow-md border-gray-200 rounded-md p-3"
                            />
                            <input type="text" value={fullName.lastName} 
                            onChange={e => setFullName({...fullName, lastName:e.target.value})}
                            placeholder="Sobrenome"
                            className="h-10 w-80 shadow-md rounded-md p-3"
                            />
                        </div>   
                        <div className="flex flex-col gap-2 mt-6">
                            <h1 className="text-lg flex items-center">Telefone</h1>
                            <input type="text" value={phone} 
                            onChange={e => setPhone(e.target.value)}
                            placeholder="11 99341-0536"
                            className="h-10 w-40 shadow-md border-gray-200 rounded-md p-3"
                            />
                            
                        </div>   
                        
                        <AlertDialog>
                        <AlertDialogTrigger className="text-center text-gray-100 bg-principal-100 h-8 w-full mt-6 rounded-lg hover:shadow-md hover:cursor-pointer">
                            Salvar alterações
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Insira sua senha para confirmar alterações:</AlertDialogTitle>
                            <AlertDialogDescription>
                                <input 
                                className="w-full rounded-md border p-2 mb-3 text-black" 
                                placeholder="Senha" 
                                value={pass} 
                                onChange={e => setPass(e.target.value)}
                                type="password"/>
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSave}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                    </SheetDescription>
                    </SheetHeader>

                </SheetContent>
            </Sheet>
        </>

    )
}
