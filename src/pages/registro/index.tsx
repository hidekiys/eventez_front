import { About } from "@/components/firstPage/About";
import { LoginHeader } from "./components/LoginHeader";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { api } from "@/utils/api";
import Router from "next/router";
import { useState } from "react";

type UserRegister = {
    firstName:string, email:string, password:string
}

function Page() {
    const {register, handleSubmit} = useForm<UserRegister>();
    const [status, setStatus] = useState();

    const handleRegister = async (data: UserRegister) => {
        await api.post('/registro', {
            name: {firstName: data.firstName},
            email: data.email,
            password: data.password
        }).then((response) => {
            const id = response.data.id
            Router.push(`/confirmarEmail?id=${id}`);
        }).catch((error) => {
            return console.log(error)
            setStatus(error.response.data)
        })


    }




  return (
    <>
    <LoginHeader/>
    
        <div className="grid grid-cols-3">
            <div className="col-span-2 h-screen overflow-scroll">
                <About/>
            </div>
            <div className="flex flex-col text-center items-center col-span-1 mt-20">
                <h1 className="text-gray-700 text-2xl">Seja bem vindo</h1>
                <p className="text-gray-400">Por favor, registre sua conta</p>
                <form 
                    className="flex flex-col items-center mt-10 w-full"
                    onSubmit={handleSubmit(handleRegister)}
                    >
                    <input 
                    {...register('firstName')}
                    className="w-[calc(80%)] rounded-md shadow-md p-2 mb-3 text-black" 
                    placeholder="Nome" 
                    type="text"
                    
                    
                    />
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
                            Eu li e concordo com os <a className="text-blue-500 hover:cursor-pointer">termos de uso</a>
                        </label>
                    </div>
                    {status &&
                        <div className="border-2 w-4/5 h-5 mt-3 py-7 px-2 rounded-full flex justify-center items-center">
                            <p className="text-principal-200 text-center">{status}</p>
                        </div>
                    }
                    
                    <input className="w-[calc(80%)] p-2 bg-principal-200 text-gray-50 rounded-full mt-8 hover:cursor-pointer hover:bg-principal-300 transition-all"
                     type="submit" value="Registrar-se"/>
                </form>
                <div className="w-full flex items-center justify-center">
                    <hr className="w-[calc(30%)] border-gray-500 "/>
                    <p className="text-gray-600 p-3">ou</p>
                    <hr className="w-[calc(30%)] border-gray-500 "/>
                </div>
                <Link href={"/login"} className="w-[calc(80%)] p-2 bg-gray-600 text-gray-50 rounded-full mb-3">Já possuo uma conta</Link>
                <button className="w-[calc(80%)] p-2 bg-gray-600 text-gray-50 rounded-md mb-3 invisible"
                
                >Login com Google</button>
                <button className="w-[calc(80%)] p-2 bg-gray-600 text-gray-50 rounded-md invisible"
                
                >Login com Facebook</button>
            </div>
        </div>
    </>
  );
}

export default Page;