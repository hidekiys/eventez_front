import { useState } from "react"





export const EventService = () => {

    const [open, setOpen] = useState(false)

    return (
        <> 
            <div className={(!open ? "h-[6vh]" : "h-[20vh]") + " pt-2 duration-300 w-full bg-white rounded-xl flex hover:bg-gray-100 hover:cursor-pointer"}
             onClick={() => setOpen(!open)}>
            <h1 className="ml-3 w-[calc(21%)] overflow-hidden font-semibold">Buffet Alegria</h1>
            <p className="">Churrasqueiro e dois garçons</p>
            </div>


        
        </>
    )
}