import { usePathname } from "next/navigation";
import Link  from "next/link";

type Props = {
    local:string
    role:boolean
}

export const BtnNavigation = (props: Props) => {
    const pathName = usePathname() // Caminho da url
    let selected: string = ""; // definir CSS do botão
    let button: string = "/"; // definir caminho quando clicar no botão


    //definição dos caminhos dos botões
    if(!props.role){
        if(props.local == "Inicio"){button="/user/home"}
        if(props.local == "Perfil"){button="/user/perfil"}
        if(props.local == "Suporte"){button="/user/suporte"}



        if (pathName == "/user/home" && props.local == "Inicio" ||
            pathName == "/user/perfil" && props.local == "Perfil" ||
            pathName == "/user/suporte" && props.local == "Suporte"
        ){
            selected = "h-15 flex text-md justify-left flex-row p-5 bg-gray-300 text-gray-500";
            
        }else{
            selected = "h-15 flex text-md justify-left text-gray-500 flex-row bg-white p-5 hover:bg-gray-300 transition ease-in-out hover:cursor-pointer";
        }
    }else if(props.role){
        if(props.local == "Inicio"){button="/partner/home"}
        if(props.local == "Perfil"){button="/partner/perfil"}
        if(props.local == "Financeiro"){button="/partner/financeiro"}
        if(props.local == "Suporte"){button="/partner/suporte"}

        if (pathName == "/partner/home" && props.local == "Inicio" ||
            pathName == "/partner/perfil" && props.local == "Perfil" ||
            pathName == "/partner/financeiro" && props.local == "Financeiro" ||
            pathName == "/partner/suporte" && props.local == "Suporte"
        ){
            selected = "h-15 flex text-md justify-left flex-row p-5 bg-gray-300 text-gray-500";
            
        }else{
            selected = "h-15 flex text-md justify-left text-gray-500 flex-row bg-white p-5 hover:bg-gray-300 transition ease-in-out hover:cursor-pointer";
        }
    }



    //definição do CSS dos botões
    


    //Aplica CSS no botão
    let btn: JSX.Element = <>
        <div className={selected}>
            <img className="h-6 min-w-6 max-w-6  justify-self-center hover:justify-self-start" src={'/'+props.local+'.png'}/>
            <p className="w-20 pl-3 opacity-0 transition-opacity group-hover:opacity-100 invisible group-hover:visible ">{props.local}</p>
        </div>
    </>
    
    //Retorna o Link do botão
    return(
        <Link href={button}>{btn}</Link>    
    );


}