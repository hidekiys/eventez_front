import { UserContext } from "@/contexts/UserContext"
import { api } from "@/utils/api"
import { Send } from "lucide-react"
import { useRouter } from "next/router"
import { useContext, useEffect, useRef, useState } from "react"
const io = require("socket.io-client");


type Contact = 
    {
        id:string,
        name:string
    }

type Contacts = Contact[]
type Message = {
    fromSelf:boolean,
    message:string
}
type Messages = Message[]
type Props = {
    chat:string | string[] | undefined
    chatName:string | string[] | undefined
    userid:string
}
const host = 'https://api.eventez.com.br'
const socket = io(host);

export const ChatContent = ({chat,chatName, userid}:Props) =>{

    const router = useRouter()

    

    const [currentChat, setCurrentChat] = useState<Contact>({id:'',name:''});
    const [messages, setMessages] = useState<Messages>();
    const [arrivalMessage, setArrivalMessage] = useState<Message>();
    const [sender, setSender] = useState('');
    const [contacts, setContact] = useState<Contacts>()

    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const downScroll = () =>{
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
        }
    }
    useEffect(()=>{
        if(router.isReady && typeof(chat) == 'string' && typeof(chatName)=='string'){
            setCurrentChat({id:chat, name:chatName})
   
        }

    },[router.isReady])

    useEffect(()=>{
        api.get('/getAllChats').then((response)=>{
            console.log(response.data)
            setContact(response.data)
        })
        if(currentChat.id != '' && userid != ''){
            api.get(`/getAllMessages/${currentChat.id}`).then((response)=>{
                setMessages(response.data)
            })

            socket.emit("add-user", userid);

        }
    },[currentChat.id, userid])

    const sendMessage = () =>{

        if(socket){
            socket.emit("send-msg", {
                to:currentChat.id,
                from:userid,
                message:sender
            })
            
            
            if(messages){
                const msgs = [...messages];
                msgs.push({fromSelf:true, message:sender})
                setMessages(msgs)
            }

        api.put('/sendMsg',{
            to:currentChat.id,
            message:sender
        }).then((response)=>{
            setSender('')
        })

    }
       
    }
    useEffect(()=>{

        if(socket){
            socket.on("msg-recieve", (msg:string)=>{
                setArrivalMessage({fromSelf:false, message:msg})
                
            })
        }
    },[])
    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>prev && [...prev, arrivalMessage])
    },[arrivalMessage])

    useEffect(()=>{
        downScroll()
    }, [messages])

    const enterMessage = (e:string) => {
          if (e === 'Enter') {
            sendMessage()
        }
    }



    return (
        <>
        
        <div className="flex mt-5">
        
            <div className="flex h-[90vh] justify-between flex-col w-9/12">
            {messages &&
                <div className="flex flex-col max-w-8/12 overflow-y-auto overflow-x-hidden scroll-smooth gap-2 py-2 mr-10" ref={messagesEndRef}>
                    {messages && messages.map((key,index)=>(
                        <>
                        
                            {!key.fromSelf &&
                            <div key={index} className="flex self-start ml-10 items-center gap-2 text-sm">
                                
                                <div className="p-2 rounded-t-xl rounded-r-xl bg-white max-w-[20vw]">
                                    <h1 className="text-black text-wrap">{key.message}</h1>
                                </div>
                                <h1 className="text-gray-200">00</h1>
                            </div>
                            }
                            {key.fromSelf &&
                            <div key={index} className="flex self-end mr-3 items-center gap-2 text-sm">
                                <h1 className="text-gray-200">00</h1>
                                <div className="p-2 rounded-t-xl rounded-l-xl bg-principal-300 max-w-[20vw]">
                                    <h1 className="text-white text-wrap" >{key.message}</h1>
                                </div>
                            </div>
                            }
                        
                        </>
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>
            }
                <label className="items-center relative justify-self-end">
                    <input type="text" placeholder="Escreva sua mensagem aqui..." 
                    className="w-11/12 rounded-xl p-2 mx-10 z-0"
                    value={sender} onChange={(e)=>setSender(e.target.value)}
                    onKeyDown={(e)=>enterMessage(e.key)}
                    /> <button className="absolute bottom-[0.35rem] left-[92%] z-10"
                    onClick={sendMessage}
                    ><Send size={28} strokeWidth={0.75} /></button> 
                </label>
            </div>
            <div className="w-3/12  mr-10">
                <h1 className="flex justify-center rounded-t-xl bg-white px-3 py-1">Conversas</h1>
                <div className=" bg-gray-200 rounded-b-xl min-h-[30vh] ">
                    {contacts && contacts.map((key,index)=>(
                        key != null &&
                        <div className="flex flex-col items-center">
                        {currentChat.id == key.id &&
                        <div className="w-[95%] h-9 flex items-center mt-2 px-3 rounded-xl bg-gray-300 " key={index}>
                            {key.name}
                            
                        </div>}
                        {currentChat.id != key.id &&
                            <div className="w-[95%] h-9 px-3 flex mt-2 items-center rounded-xl bg-gray-50 hover:bg-principal-300 hover:text-white transition-all" key={index}>
                                <button onClick={()=>setCurrentChat({name:key.name, id:key.id})}>{key.name}</button>
                                
                            </div>}
                                
                            </div>
                    ))}
                    
                </div>
            </div>
        </div>
        
        
       
        
        
        </>
    )
}