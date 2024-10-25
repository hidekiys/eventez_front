import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
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
import {   Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger, } from "@/components/ui/sheet";
import {TypeAddress} from "@/types/TypeAddress"
import { api } from "@/utils/api";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import React from "react";

const Address = () => {
    const [address, setAddress] = useState<TypeAddress>({cep:'', state:'', street:'', city:'', neighborhood:'',number:'', complement:''});
    const [pass, setPass] = useState('');
    const [open, setOpen] = useState(false);


    useEffect(() => {
        api.get('/getPartnerAddress').then((response) => {
            setAddress({...address, cep:response.data.cep, 
                number:response.data.number, 
                street:response.data.street,
                state:response.data.state,
                city: response.data.city,
                neighborhood: response.data.neighborhood,
                complement: response.data.complement
            
            
            })
        }
        )
        
    }, [])

    const numberRef =  useRef<HTMLInputElement>(null);
    const handleEnterDown = (e: KeyboardEvent) => {
        if(e.key === 'Enter'){
            numberRef.current?.focus();
            checkCEP();
        }
    }
    const checkCEP = () => {

        
    
        // Verifica se campo cep possui valor informado.
        if (address.cep !== '') {
          // Expressão regular para validar o CEP.
          const validacep = /^[0-9]{8}$/;
    
          // Valida o formato do CEP.
          if (validacep.test(address.cep)) {
            fetch(`https://viacep.com.br/ws/${address.cep}/json/`)
            .then(res => 
            res.json()).then(data => {
            setAddress({...address, state:data.uf, street:data.logradouro, neighborhood:data.bairro, city:data.localidade})
            
          })
        }
        }
    
    }
    const handleSave = () => {
        api.put('/putPartnerAddress', {
                local:{
                    cep: address.cep,
                    street: address.street,
                    number: address.number,
                    neighborhood: address.neighborhood,
                    state: address.state,
                    city: address.city,
                    complement: address.complement
                },
                pass: pass
            
        }).then( (response) => {
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
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className="bg-white rounded-md  transition-all
                    h-20 ml-14 mt-3 max-w-fit p-5 min-w-60
                    flex flex-col items-start justify-center
                    hover:shadow-md hover:scale-105">
                        <p className="text-gray-600 text-sm">Editar Endereço</p>
                        {address.street && 
                            <p className="text-gray-600 text-lg font-bold">{address.street}, {address.number}</p>
                        }
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle>Editar Endereço</SheetTitle>
                    <SheetDescription>
                        Mude o seu endereço aqui. Clique em salvar alterações quando estiver pronto.
                        
                    <h1 className="text-lg flex mt-6">Endereço</h1>
                    <div className="flex flex-col gap-4 mt-3">
                    <input type="input" placeholder="CEP" value={address.cep} onChange={e => {setAddress({...address, cep:e.target.value})}}
                    onBlur={checkCEP} onKeyDown={handleEnterDown}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3"
                    />
                    <input type="input" placeholder="Estado" value={address.state} onChange={e => {setAddress({...address, state:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3 bg-gray-200"
                    disabled
                    />
                    <input type="input" placeholder="Cidade" value={address.city} onChange={e => {setAddress({...address, city:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3 bg-gray-200"
                    disabled
                    />
                    <input type="input" placeholder="Bairro" value={address.neighborhood} onChange={e => {setAddress({...address, neighborhood:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3 bg-gray-200"
                    disabled
                    />
                    <input type="input" placeholder="Rua" value={address.street} onChange={e => {setAddress({...address, street:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3 bg-gray-200" 
                    disabled
                    />
                    <input type="input" placeholder="Número" value={address.number} onChange={e => {setAddress({...address, number:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3"
                    ref={numberRef}
                    />
                    <input type="input" placeholder="Complemento" value={address.complement} onChange={e => {setAddress({...address, complement:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3"
                    ref={numberRef}
                    />
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
                </div>
                    </SheetDescription>
                    </SheetHeader>

                </SheetContent>
            </Sheet>
        </>

    );
}

export default Address;