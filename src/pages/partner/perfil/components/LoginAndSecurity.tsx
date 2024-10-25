
import {   Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger, } from "@/components/ui/sheet";
import { PartnerContext } from "@/contexts/PartnerContext";
import { api } from "@/utils/api";
import React from "react";
import { useContext, useEffect, useState } from "react";



const LoginAndSecurity = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const { partner, setPartner } = useContext(PartnerContext);
    const [showSwitch, setShowSwitch] = useState(false);

    useEffect(() => {
        console.log('usando o effect do email')
        setEmail(partner.email)
    }, [partner.url_avatar])


    const handleSave = () => {
        api.put('/putpartnerInfo', {
            ...partner,
                email: email
            
        }).then( () => {
            setEmail(email)
            setPartner({...partner, email:email})
        }
            
        ).catch((err) => {
            console.log(err)
        })
    }

    const handleSwitchPass = () =>{
        setShowSwitch(!showSwitch);
    }

    return (
        <>
            <Sheet>
                <SheetTrigger className="bg-white rounded-md  transition-all
                    h-20 ml-14 mt-3 max-w-fit p-5 min-w-60
                    flex flex-col items-start justify-center
                    hover:shadow-md hover:scale-105">
                        <p className="text-gray-600 text-sm">Login e segurança</p>
                        <p className="text-gray-600 text-lg font-bold">{email}</p>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle>Login e segurança</SheetTitle>
                    <SheetDescription>
                        Altere suas informações de segurança, clique em salvar alterações quando estiver pronto.
                        
                        
                        <div className="flex flex-col gap-2 mt-6">
                            <h1 className="text-lg">E-mail</h1>
                            <input type="text" value={email} 
                            onChange={e => setEmail(e.target.value)}
                            placeholder="email@email.com"
                            className="h-10 w-80 shadow-md border-gray-200 rounded-md p-3"
                        />
                        {!showSwitch && <p className="hover:cursor-pointer hover:text-principal-100"
                        onClick={handleSwitchPass}
                        >Mudar senha</p>}
                        {showSwitch &&
                        <h1 className="text-lg mt-3">Alterar senha</h1>
                        
                        }
                        {showSwitch && 
                        <input type="text" value={password} 
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        className="h-10 w-80 shadow-md border-gray-200 rounded-md p-3"
                        />
                        }
                        {showSwitch && 
                            <input type="text" value={newPassword} 
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder="Digite sua nova senha"
                            className="h-10 w-80 shadow-md border-gray-200 rounded-md p-3"
                            />
                        }
                        {showSwitch &&
                        <p className="hover:cursor-pointer hover:text-principal-100"
                        onClick={handleSwitchPass}
                        >Cancelar</p>
                        }
                        
                        





                        <input type="button" 
                            className="text-center text-gray-100 bg-principal-100 h-8 w-full mt-6 rounded-lg hover:shadow-md hover:cursor-pointer" 
                            value="Salvar alterações"
                            onClick={handleSave}
                        />
                        </div>
                    </SheetDescription>
                    </SheetHeader>

                </SheetContent>
            </Sheet>
        </>
    )
}

export default LoginAndSecurity;