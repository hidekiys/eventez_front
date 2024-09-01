import {Logo} from "@/components/pageConfig/logo"

export const Header = () => {
    return(
        <nav className="w-full h-10 shadow-md shadow-gray-300 bg-white" >
            <div className="pt-1.5 pl-2">
                <Logo/>
            </div>
            
        </nav>
);

}