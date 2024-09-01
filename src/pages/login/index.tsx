import Link from "next/link";
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from "react";
import { setCookie } from "nookies";
import Router from "next/router";

import { About } from "@/components/firstPage/About";
import { LoginHeader } from "./components/LoginHeader";
import { FormLogin } from "@/types/FormLogin";
import { api } from "@/utils/api";
import { UserContext } from "@/contexts/UserContext";



function Page() {

    const { user, setUser } = useContext(UserContext)




    const { register, handleSubmit } = useForm<FormLogin>()
    
    const [status, setStatus] = useState<string | null>(null)

    async function handleSignIn (data: FormLogin){
        if(data.email == "" || data.password == ""){
            setStatus("Preencha os campos adequadamente!")
            return
        }

        await api.post('/login', {
                email: data.email,
                password: data.password
            }).then((response) => {
                const { token } = response.data
    
                setCookie(undefined, 'eventez.token', token, {
                    maxAge: 60 * 60 // 1 hour
                })
                console.log(response.data)

                api.defaults.headers['Authorization'] = `Bearer ${token}`

                setUser({
                    name:{
                        firstName: response.data.firstName,
                        lastName: response.data.lastName
                    },
                    id: response.data.id,
                    email: response.data.email,
                    url_avatar: response.data.url_avatar
                })
                Router.push("/user/home")
            }).catch((error) => {
                if(error.response.data){
                    setStatus(error.response.data)
                }else{
                    console.log(error)
                }
                
            })
        
    }


  return (
    <>
    <LoginHeader/>
    
        <div className="grid grid-cols-3">
            <div className="col-span-2 h-screen overflow-scroll">
                <About/>
            </div>
            <div className="flex flex-col text-center items-center col-span-1 mt-28">
                <h1 className="text-gray-700 text-2xl">Bem vindo de volta</h1>
                <p className="text-gray-400">Por favor, logue-se com a sua conta</p>
                <form className="flex flex-col items-center mt-10 w-full"
                onSubmit={handleSubmit(handleSignIn) }
                
                
                >
                    <input 
                    {...register('email')}
                    className="w-[calc(80%)] rounded-md shadow-md p-2 mb-3 text-black"
                     placeholder="E-mail" 
                     type="text"
                     
                     />
                    <input 
                    {...register('password')}
                    className="w-[calc(80%)] rounded-md shadow-md p-2 mb-3 text-black" 
                    placeholder="Senha" 
                    type="text"
                    
                    />
                    <div className="flex justify-between w-[calc(80%)]">
                        <label className="text-sm text-gray-600">
                            <input className="w-3 h-3 rounded-md mr-1" type="checkbox"/>
                            Lembrar de mim
                        </label>
                        <a className="text-sm text-gray-600">Esqueci minha senha</a>
                    </div>
                    {status &&
                        <div className="border-2 w-4/5 h-5 mt-3 p-4 rounded-full flex justify-center items-center">
                            <p className="text-principal-200 text-center">{status}</p>
                        </div>
                    }
                    
                    <input className="w-[calc(80%)] p-2 bg-principal-200 text-gray-50 rounded-full mt-8 hover:cursor-pointer hover:bg-principal-300 transition-all"
                     type="submit" value="Entrar"/>
                </form>
                <div className="w-full flex items-center justify-center">
                    <hr className="w-[calc(30%)] border-gray-500 "/>
                    <p className="text-gray-600 p-3">ou</p>
                    <hr className="w-[calc(30%)] border-gray-500 "/>
                </div>
                <Link href={"/registro"} className="w-[calc(80%)] p-2 bg-gray-600 text-gray-50 rounded-full mb-3">Não possuo uma conta, registrar-me</Link>
                <button className="w-[calc(80%)] p-2 bg-gray-600 text-gray-50 rounded-full mb-3 invisible"
                
                >Login com Google</button>
                <button className="w-[calc(80%)] p-2 bg-gray-600 text-gray-50 rounded-full invisible"
                
                >Login com Facebook</button>
            </div>
        </div>
    </>
  );
}

export default Page;