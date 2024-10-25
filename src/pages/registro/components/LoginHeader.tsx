
import { Logo } from "@/components/pageConfig/logo";

const LoginHeader = () => {
    return (
        <>
        <nav className="w-full h-10 shadow-md z-30 shadow-gray-300 bg-white flex justify-between sticky top-0" >
            <div className="pt-1.5 pl-2">
                <Logo/>
            </div>
            <div className="flex text-center justify-center items-center">
                <a className="text-lg font-light text-gray-700 px-3 py-0">Parceria</a>
            </div>
        </nav>
        </>
        
    );
}

export default LoginHeader;