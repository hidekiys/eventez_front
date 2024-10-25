import { Avatar } from "@mui/material";
import { SquarePen, Lock, AudioWaveform, ChevronRight } from "lucide-react";
import Link from "next/link";
import {Link as Scroller} from "react-scroll"

const About = () => {
    return (
        <>
        <div className="flex flex-col bg-amber-50 items-center">
            <div className="relative">
                <img src="./loginPage/backgroundLogin.png" alt="" className="absolute z-0" />
                <img src="/loginPage/title.svg" className="relative z-10 w-[70%] mt-20 mb-0 pb-0 m-auto object-cover"/>
                <p className="relative z-20 -top-16 left-12 w-[70%] m-auto text-xl mt-0">Solicite orçamentos, monte seus eventos ou venda seus 
                serviços através de uma plataforma confiável e intuitiva.</p>
                <Scroller to="eventez" smooth className="left-96 bg-ambar-50 border py-3 px-5 shadow-md hover:shadow-none
                transition-all hover:bg-principal-300 hover:text-white duration-200 rounded-xl relative
                font-thin w-fit flex items-center h-12
                "
                >Saiba mais sobre a EventEz <ChevronRight size={20} strokeWidth={0.75} 
                className="ml-2"
                /></Scroller>
            </div>
            <div className="flex justify-around mt-20 gap-5">
                <div className="h-16 flex items-center p-3 border rounded-lg w-52">
                    <SquarePen size={32} strokeWidth={0.75} />
                    <h1 className="font-bold pl-3">Amplitude de uso</h1>
                </div>
                <div className="h-16 flex items-center p-3 border rounded-lg w-52">
                    <Lock size={32} strokeWidth={0.75} />
                    <h1 className="font-bold pl-3">Confiabilidade e segurança</h1>
                </div>
                <div className="h-16 flex items-center p-3 border rounded-lg w-52">
                    <AudioWaveform size={32} strokeWidth={0.75} />
                    <h1 className="font-bold pl-3">Intuitividade e usabilidade</h1>
                </div>
            </div>
            <div className="w-full mt-[10vh] h-96 flex flex-col items-center">
                <img src="./loginPage/bgLogin2.png" alt="" className="absolute z-0 w-[68%] h-80" />
                <div className="relative z-10 flex flex-col items-center mt-16">
                    <h1 className="text-2xl text-white font-light">Intermédio e organização de eventos</h1>
                    <p className="max-w-[70%] text-lg mt-3 text-white font-thin">A nossa plataforma exerce a função de intermédio de serviços voltados para área de eventos. Isto é conectar o publico geral consumidor de eventos (Cliente) com os profissionais e empresas do setor de eventos (Associados). Além de trazer segurança nos pagamentos e conforto ao cliente de que seu evento será realizado.</p>
                </div>
            </div>
            <div className="m-auto mb-0">
                <img src="./loginPage/homePage.png" className="h-80 relative z-0 left-24 rounded-lg
                shadow-md
                " />
                <img src="./loginPage/servicePage.png" className="h-80 relative z-10 -top-20 right-24 rounded-lg
                shadow-md
                " />
            </div>
            <Link href={'/services'} className="bg-ambar-50 border py-3 px-5 shadow-md hover:shadow-none
                transition-all hover:bg-principal-300 hover:text-white duration-200 rounded-xl
                font-thin w-fit flex items-center h-12
                ">Ver serviços <ChevronRight size={20} strokeWidth={0.75} 
                className="ml-2"
                />
            </Link>
            <div className="w-full mt-[10vh] h-96 flex flex-col items-center" id="eventez">
                <img src="./loginPage/bgLogin2.png" alt="" className="absolute z-0 w-[68%] h-80" />
                <div className="relative z-10 flex flex-col items-center mt-16">
                    <h1 className="text-2xl text-white font-light" >O que é a EventEz</h1>
                    <p className="max-w-[70%] text-lg mt-3 text-white font-thin">A EventEz é uma startup de tecnologia nascida em São Paulo. Constituída por quatro sócios membros da área de tecnologia, a EventEz busca criar produtos ou serviços que desenvolvam a tecnologia em mercados poucos explorados, gerando assim agilidade, intuitividade e modernidade.</p>
                </div>
            </div>
            <div className="flex justify-around gap-5">
                <div className="w-48 h-80 rounded-xl shadow-md
                flex flex-col items-center
                ">
                    <Avatar className="mt-6"/>
                    <h1>Matheus Hideki</h1>
                    <p className="text-sm w-[80%] mt-3">
                        A plataforma é única e ajudou eu realizar meu casamento
                    </p>
                </div>
                <div className="w-48 h-80 rounded-xl shadow-md">

                </div>
                <div className="w-48 h-80 rounded-xl shadow-md">

                </div>
            </div>
        </div>
        </>

    );
}

export default About;