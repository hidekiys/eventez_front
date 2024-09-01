import { Navegation } from "./navegation";
import { usePathname } from "next/navigation";


import { Home } from "@/pages/user/home/home";
import { Budgets } from "@/pages/user/orcamento/components/budgets";
import { Financial } from "@/pages/user/financeiro/components/financial";
import { Profile } from "@/pages/user/perfil/components/profile";
import { Support } from "@/pages/user/suporte/components/Support";
import { EventContent } from "@/pages/user/eventos/[event]/components/EventContent";




// Conteúdo da página
export const Content = () => {
    const pathName = usePathname(); // Caminho da url

    //Definir a pagina que está contida
    let content: JSX.Element;
    if (pathName == "/user/home"){
        content = <Home/>;
    }else if(pathName == "/user/perfil"){
        content = <Profile/>;
    }else if(pathName.startsWith("/user/suporte")){
        content = <Support/>;
    }else if(pathName.startsWith("/user/eventos")){
        content = <EventContent/>;
    }else{
        content = <div className="text-center text-lg">404 Página não encontrada</div>;
    }

    //Retorna a página
    return(
        <div className="h-full grid grid-cols-8">
            <div className="col-span-1 z-20 absolute h-[calc(100vh-2.5rem)]">
                <Navegation/>
            </div>
            <div className="col-span-8 ml-14 text-gray-700 z-0">
                {content}
            </div>    

        </div>
    );
}