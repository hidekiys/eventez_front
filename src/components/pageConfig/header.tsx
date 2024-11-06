import {Logo} from "@/components/pageConfig/logo"
import { PartnerContext } from "@/contexts/PartnerContext"
import { UserContext } from "@/contexts/UserContext"
import { Avatar } from "@mui/material"
import { Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"


type Props ={
    search?:string,
    setSearch?:Dispatch<SetStateAction<string>>
}




export const Header = ({search,setSearch}:Props) => {
    const [login, setLogin] = useState<boolean>(false)
    const [isService, setIsService] = useState<boolean>(false)
    const router = useRouter()
    const pathname = usePathname()
    const user = useContext(UserContext)
    const partner = useContext(PartnerContext)

    useEffect(()=>{
        if(router.isReady){
            pathname == "/services" && setIsService(true)
        }

    },[router.isReady])

    useEffect(()=>{
        const cookies = parseCookies()
        if(cookies.hasOwnProperty('eventez.user.token') || cookies.hasOwnProperty('eventez.partner.token')){
            setLogin(true)
        }

    },[])
    return(
        <nav className="w-full h-10 shadow-md shadow-gray-300 bg-white sticky top-0 flex items-center" >
            <div className="flex items-center w-full h-full">
                <div className="pl-2 pb-1">
                    <Link href={"/services"}>
                        <Logo/>
                    </Link>
                </div>
                {isService && setSearch &&
                    <div className="w-full relative h-[70%] flex items-center">
                    <Search size={20} color="#4f4f4f" strokeWidth={1} className="absolute left-4 opacity-50"/>
                        <input type="text" className="rounded-full h-full w-[30%] ml-3
                        text-black px-2 pl-6 text-sm bg-gray-100 outline-gray-300
                        " placeholder="Busque por serviço ou empresa..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        
                        />
                    </div>  
                
                }
            </div>
            <div>
                {!login &&
                    <Link href={"/login"} className="text-principal-100 hover:text-principal-300 mr-2
                      flex justify-center items-center transition-all
                    ">
                        Login

                    </Link>
                }
                {login && user.user.url_avatar != '' && user.user.url_avatar != undefined ?
                    <Link href={"/user/home"}>
                        <img src={user.user.url_avatar} className="h-8 w-8 rounded-full mr-2"/>
                    </Link>:
                    login && partner.partner.url_avatar != '' && partner.partner.url_avatar != undefined ?
                    <Link href={"/partner/home"}>
                        <img src={partner.partner.url_avatar} className="h-8 w-8 rounded-full mr-2"/>
                    </Link>
                    : login && user.user.url_avatar == undefined ?
                    <Link href={"/user/home"}>
                        <Avatar className="h-8 w-8 rounded-full mr-2"/>
                    </Link>
                    : login && partner.partner.url_avatar == undefined &&
                    <Link href={"/partner/home"}>
                        <Avatar className="h-8 w-8 rounded-full mr-2"/>
                    </Link>
                }
            </div>
            


            
        </nav>
);

}