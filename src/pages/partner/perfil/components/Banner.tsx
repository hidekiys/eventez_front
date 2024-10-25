import React, { FormEvent, useEffect, useState } from "react"
    import {
        Drawer,
        DrawerClose,
        DrawerContent,
        DrawerDescription,
        DrawerFooter,
        DrawerHeader,
        DrawerTitle,
        DrawerTrigger,
      } from "@/components/ui/drawer"
import { api } from "@/utils/api"
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

const Banner = () => {
    const [banner, setBanner] = useState<string>()
    
    useEffect(() => {
        const stylesheet = document.styleSheets[0];
        stylesheet.insertRule(".swiper-pagination-bullet-active { background: #f24f13 !important;}", 0);   
      }, []);


      const handleUpload = (event:any) => {
        event.preventDefault();
        console.log(event)
        const file = event.target[0]?.files[0]
        if(!file) return;
        const formData = new FormData();
        formData.append('photo', file);
        api.put('/putPartnerBanner', formData).then(response => {
            setBanner(response.data)
            toast.success("Banner carregado com sucesso!")
        }).catch(err => {
            console.log(err);
            toast.error("Não foi possível carregar a imagem.")
        })

        
    }
    useEffect(()=>{
        api.get('/getPartnerBanner').then((response)=>{
            setBanner(response.data)
        })
    },[[], handleUpload])

    return (
        <>
        <div className="z-50">
            <Toaster richColors/>
        </div>
            <Drawer>
                <DrawerTrigger className="bg-white rounded-md  transition-all
                    h-14 ml-14 mt-3 max-w-fit p-5 min-w-60
                    flex flex-col items-start justify-center
                    hover:shadow-md hover:scale-105">
                        <p className="text-gray-600 text-sm">Banner</p>
                        <p className="text-gray-600 text-lg font-bold"></p>
                </DrawerTrigger>
                <DrawerContent className="h-[50%]">
                    <DrawerHeader>
                        <DrawerTitle>Banner</DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <div className="w-full flex justify-center gap-3">
                        <div className="w-1/3">
                        <img src={banner} className='h-2/3 relative z-0'/>
                        </div>
                        <Separator orientation="vertical"/>
                        <div>
                            <h1>Mudar banner</h1>
                            <form onSubmit={handleUpload} className="flex mt-6 flex-row justify-between items-center">
                                <div className="flex flex-col gap-3">
                                            <input type="file" 
                                            className="mt-2 w-full h-7 file:h-7 text-sm text-slate-500
                                            file:mr-4 file:px-4 file:rounded-md
                                            file:border-solid file:text-sm file:font-semibold
                                            file:bg-white file:text-principal-300
                                            hover:file:bg-principal-500 file:border-gray-100 hover:file:cursor-pointer"/>
                                        <input type="submit" className="text-center text-gray-100 bg-principal-100 h-7 w-60 rounded-lg hover:shadow-md
                                        hover:cursor-pointer" value="Enviar imagem"/>
                                </div>
                                    
                            </form>
                            </div>
                        </div>
                </DrawerContent>
            </Drawer>
        
        </>
    )
}

export default Banner;