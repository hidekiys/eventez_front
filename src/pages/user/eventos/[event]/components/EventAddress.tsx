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


type Props = {
    place: {
        placeName: string,
        cep: string,
        street: string,
        neighborhood: string,
        state: string,
        city: string,
        number: string,
        complement:string
    } ,
    id:string
}

type Address = {
    placeName: string,cep:string, state:string, street:string, city:string, neighborhood:string,number:string,complement:string
}






const Address = ({place, id}:Props) => {
    const [address, setAddress] = useState<Address>({placeName: '',cep:'', state:'', street:'', city:'', neighborhood:'',number:'',complement:''});
    const [pass, setPass] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setAddress(place)
    }, [place])

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
        console.log(address)
        api.put('/editEvent', {
            event:{
                place:{
                    placeName: address.placeName,
                    cep: address.cep,
                    street: address.street,
                    number: address.number,
                    neighborhood: address.neighborhood,
                    state: address.state,
                    city: address.city,
                    complement: address.complement
                },
                id:id
            }
            
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
                    h-20  mt-3 max-w-full p-6 min-w-60
                    flex flex-col items-start justify-center
                    hover:shadow-md hover:scale-105">
                        <p className="text-gray-600 text-lg">Endereço</p>
                        {address?.street != undefined && 
                        <>
                            <p className="text-gray-600 text-sm md">{address?.placeName}</p>
                            <p className="text-gray-600 text-sm md">{address?.street}, {address?.number}</p>
                            </>
                        }
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle>Editar Endereço</SheetTitle>
                    <SheetDescription>
                        Mude o seu endereço aqui. Clique em salvar alterações quando estiver pronto.
                        
                    <h1 className="text-lg flex mt-6">Endereço</h1>
                    <div className="flex flex-col gap-4 mt-3">
                    <input type="input" placeholder="Nome do local ex:Casa de fulano" value={address?.placeName} onChange={e => {setAddress({...address, placeName:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3"
                    />
                    <input type="input" placeholder="CEP" value={address?.cep} onChange={e => {setAddress({...address, cep:e.target.value})}}
                    onBlur={checkCEP} onKeyDown={handleEnterDown}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3"
                    />
                    <input type="input" placeholder="Estado" value={address?.state} onChange={e => {setAddress({...address, state:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3 bg-gray-200"
                    disabled
                    />
                    <input type="input" placeholder="Cidade" value={address?.city} onChange={e => {setAddress({...address, city:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3 bg-gray-200"
                    disabled
                    />
                    <input type="input" placeholder="Bairro" value={address?.neighborhood} onChange={e => {setAddress({...address, neighborhood:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3 bg-gray-200"
                    disabled
                    />
                    <input type="input" placeholder="Rua" value={address?.street} onChange={e => {setAddress({...address, street:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3 bg-gray-200" 
                    disabled
                    />
                    <input type="input" placeholder="Número" value={address?.number} onChange={e => {setAddress({...address, number:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3"
                    ref={numberRef}
                    />
                    <input type="input" placeholder="Complemento" value={address?.complement} onChange={e => {setAddress({...address, complement:e.target.value})}}
                    className="h-10 w-72 ml-5 shadow-md border-gray-200 rounded-md p-3"
                    />
                    <button onClick={handleSave} className="text-center text-gray-100 bg-principal-100 h-8 w-full mt-6 rounded-lg hover:shadow-md hover:cursor-pointer">Salvar alterações</button>
            
                </div>
                    </SheetDescription>
                    </SheetHeader>

                </SheetContent>
            </Sheet>
        </>

    );
}

export default Address;