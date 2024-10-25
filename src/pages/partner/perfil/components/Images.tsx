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

const Images = () => {
    const [images, setImages] = useState<string[]>()
    const [imgURL, setImageURL] = useState("");
    
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
        api.put('/putPartnerImage', formData).then(response => {
            setImageURL(response.data.image)
            toast.success("Imagem carregada com sucesso!")
        }).catch(err => {
            console.log(err);
            toast.error("Não foi possível carregar a imagem.")
        })

        
    }
    const handleDeleteImage = (index:number) => {
        api.delete(`/deletePartnerImage/${index}`).then((response)=>{
            toast.success(response.data)
        }).catch((err)=>{
            toast.error(err.data)

        })
    }
    useEffect(()=>{
        api.get('/getPartnerImages').then((response)=>{
            setImages(response.data)
        })
    },[[], handleUpload, handleDeleteImage])

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
                        <p className="text-gray-600 text-sm">Imagens</p>
                        <p className="text-gray-600 text-lg font-bold"></p>
                </DrawerTrigger>
                <DrawerContent className="h-[80%]">
                    <DrawerHeader>
                        <DrawerTitle>Imagens</DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <div className="w-full flex justify-center gap-3">
                        <div className="w-1/3">
                            <Swiper
                                spaceBetween={0}
                                centeredSlides={true}
                                autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                                }}
                                pagination={{
                                    dynamicBullets: true,
                                }}
                                modules={[Pagination]}
                                >
                                    {
                                        images && images.map((key, index)=>(
                                            key != '' &&
                                            <SwiperSlide key={index}>
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <div className="min-w-full min-h-[98%] absolute z-10 bg-red-500 hover:opacity-35 opacity-0 transition-all
                                                        flex items-center justify-center
                                                        ">
                                                            <Trash2 size={96} color="#ffffff" strokeWidth={1.5} />
                                                        </div>
                                                        <img src={key} className='h-2/3 relative z-0'/>
                                                        
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                        <DialogTitle>Excluir imagem</DialogTitle>
                                                        <DialogDescription>
                                                            Você tem certeza que deseja excluir está imagem?
                                                        </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogClose>
                                                            Cancelar
                                                        </DialogClose>
                                                        <DrawerClose onClick={()=>handleDeleteImage(index)}>
                                                            Excluir
                                                        </DrawerClose>
                                                    </DialogContent>
                                                    </Dialog>
                                            </SwiperSlide>
                                        ))
                                    }

                            </Swiper>
                        </div>
                        <Separator orientation="vertical"/>
                        <div>
                            <h1>Adicionar imagem</h1>
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

export default Images;