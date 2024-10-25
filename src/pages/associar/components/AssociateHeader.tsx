
import { Logo } from "@/components/pageConfig/logo";
import Link from "next/link";

export default function AssociateHeader()  {
    return (
        <>
        <nav className="w-full h-10 shadow-md z-30 shadow-gray-300 bg-white flex justify-between sticky top-0" >
            <div className="pt-1.5 pl-2">
                <Link href={'/services'}>
                    <Logo/>
                </Link>
                
            </div>
            <div className="flex text-center justify-center items-center">
                <Link href={'/login'} className="text-lg font-light text-gray-700 px-3 py-0">Login</Link>
            </div>
        </nav>
        </>
        
    );
}