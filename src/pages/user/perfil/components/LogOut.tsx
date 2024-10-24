import Link from "next/link";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

import { deleteCookie } from 'cookies-next';




export const LogOut = () =>{
    const router = useRouter()
    const handleLogOut = () => {
        destroyCookie(undefined, 'eventez.user.token');
        deleteCookie('eventez.user.token', undefined);
        setTimeout(()=>router.push('/login'), 1000)
    }
    return (
        <>

                <a className="bg-white rounded-md  transition-all
                    h-14 ml-14 mt-3 max-w-fit p-5 min-w-60
                    flex flex-col items-start justify-center
                    hover:shadow-md hover:scale-105"
                    onClick={handleLogOut}
                    >
                        <p className="text-gray-600 text-sm">LogOut</p>
                        <p className="text-gray-600 text-lg font-bold"></p>
                </a>

        
        </>
    )
}