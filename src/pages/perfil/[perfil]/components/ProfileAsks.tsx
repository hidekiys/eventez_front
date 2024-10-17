import { Separator } from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"
import React from "react"
import { useState } from "react"


type Props = {
    questions:{
        ask:string,
        response:string,
    }[]
}


export const ProfileAsks = ({questions}:Props) => {

    const [open, setOpen] = useState<boolean[]>([false])


    const handleSetOpen = (index:number) => {
        if(open) {
            let newOpen = open;
            newOpen[index] = !open[index]
            setOpen(newOpen)
            setOpen([...open])
        }
        
    }

    return(
        <>
        <div className="border rounded-xl flex flex-col h-fit w-full mt-3 mb-10">
            {questions.map((key,index)=>(
                <>
                    <div onClick={()=>handleSetOpen(index)} key={index} className={`transition-all duration-500 ease-in-out flex flex-col py-2
                    ${index == (questions.length - 1) ? "border-0":"border-b"}
                        ${open[index] == true ? "min-h-[20vh] max-h-[20vh] overflow-y-auto justify-start" : "min-h-[5vh]"}  hover:cursor-pointer
                        `}>
                        <div className="w-full flex justify-between px-3">
                            <h1 className="text-nowrap font-semibold">{key.ask}</h1>
                            <ChevronDown strokeWidth={1.5} className={`${open[index] && "rotate-180"} transition-all duration-300`}/>
                        </div>
                        
                        <p className={`pl-3 ${open[index] == true ? "visible opacity-100" : "hidden opacity-0"} transition-all duration-1000`}>{key.response}</p>

                    </div>
                </>
            ))}
        </div>
        </>

    )
}