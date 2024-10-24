import { Navegation } from "./navegation";
import { usePathname } from "next/navigation";


import { Home } from "@/pages/user/home/home";
import { Profile } from "@/pages/user/perfil/components/profile";
import { Support } from "@/pages/user/suporte/components/Support";
import { PartnerHome } from "@/pages/partner/home/components/PartnerHome";
import { PartnerFinancial } from "@/pages/partner/financeiro/components/PartnerFinancial";
import { Profile as PartnerProfile } from "@/pages/partner/perfil/components/profile"; 
import { Associate } from "@/pages/associar/components/associate";




// Conteúdo da página
const Content = () => {
     // Caminho da url

    const contents = new Map<string, JSX.Element>(Object.entries({
        "/user/home": <Home/>,
        "/user/perfil": <Profile/>,
        "/user/suporte": <Support/>,
        "/partner/home":<PartnerHome/>,
        "/partner/financeiro":<PartnerFinancial/>,
        "/partner/perfil":<PartnerProfile/>,
        "/associar":<Associate/>,
      }));
      const pathName = usePathname();
      
      const content = contents.get(pathName) ?? null
    

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

export default Content;