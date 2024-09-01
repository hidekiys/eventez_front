import { BtnNavigation } from "./btnNavegation";


export const Navegation = () => {
    return(
        <div className="hover:w-[12vw] w-16 translate-x-0 left-0  top-0 duration-300 h-full 
        flex flex-col justify-between bg-white border-gray-300 border-r z-20 group">
            <div className="flex flex-col">
                <BtnNavigation local="Inicio"/>
                <BtnNavigation local="Perfil"/> 
            </div>
            <div>
                <BtnNavigation local="Suporte"/>
            </div>
        </div>
    );
}