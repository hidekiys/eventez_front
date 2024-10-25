
import { useState } from "react";
import  LoginHeader  from "./components/LoginHeader";
import { api } from "@/utils/api";
import { useSearchParams } from 'next/navigation'
import Router from "next/router";

function Page() {

    const [ code, setCode ] = useState('')
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    async function handleConfirm (){
        console.log(id)
        api.put('/confirmRegister', {
            id,
            validation: code
        }).then(()=>{
            Router.push(`/login`);
        }).catch(err => {
            console.log(err)
        })
    }

  return (
    <>
    <LoginHeader/>
    <div className="h-screen w-screen flex justify-center items-center text-center">
        <div>
            <h1 className="text-lg font-semibold">Cole o código de acesso aqui:</h1>
            <input type="text" className=" w-full h-10 border border-gray-400 rounded-md text-black p-3 text-lg font-bold"
            value={code}
            onChange={e => setCode(e.target.value)}
            />
            <button className="px-5 py-2 mt-3 hover:scale-105 transition-all bg-principal-100 rounded-md text-lg font-bold text-white"
            onClick={handleConfirm}
            >Confirmar</button>
        </div>


    </div>

    </>
  );
}

export default Page;