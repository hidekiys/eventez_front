import { ChatType } from "@/types/Chat"
import { api } from "@/utils/api"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"




export const ChatContent = () =>{
    const router = useRouter()
    const [chat, setChat] = useState<ChatType>()
    useEffect(()=>{
        api.post('/postChat', {userBId:router.query.userB}).then((response)=>{
            setChat(response.data)
            
        }).catch((err)=>console.log(err))
    },[])



    return (
        <>
        {chat &&
        <div className="flex mt-5">
            <div className="flex h-[90vh] justify-between flex-col w-9/12">
                {chat.messages.map((key,index)=>(
                    <>
                    <div className="flex flex-col w-full">
                        {key.owner.identificator == router.query.userB &&
                            <div className="self-start ml-10 p-2 rounded-t-xl rounded-r-xl bg-white">
                                <h1 className="text-black" key={index}>{key.message}</h1>
                            </div>
                        }
                        {key.owner.identificator != router.query.userB &&
                            <div className="self-end mr-10 p-2 rounded-t-xl rounded-l-xl bg-principal-300  max-w-[20vw]">
                                <h1 className="text-white" key={index}>{key.message}</h1>
                            </div>
                        }
                    </div>
                    </>
                ))}
                <input type="text" placeholder="Escreva sua mensagem aqui..." className="w-11/12 rounded-xl p-2 mx-10"/>
            </div>
            <div className="w-3/12  mr-10">
                <h1 className="flex justify-center rounded-t-xl bg-white px-3 py-1">Conversas</h1>
                <div className=" bg-gray-200 rounded-b-xl min-h-[30vh]">

                </div>
            </div>
        </div>
        
        }
       
        
        
        </>
    )
}