
import { Logo } from "@/components/pageConfig/logo";

const LoginHeader = () => {
    return (
        <>
        <nav className="w-full h-10 shadow-md shadow-gray-300 bg-white flex justify-between absolute" >
            <div className="pt-1.5 pl-2">
                <Logo/>
            </div>
            <div className="flex text-center justify-center items-center">
                <a className="text-lg text-gray-700 px-3 py-0">Parceria</a>
                <a className="text-lg text-gray-700 px-3 py-0">Suporte</a>
            </div>
        </nav>
        </>
        
    );
}

export default LoginHeader;