import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { get } from 'http';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star } from 'lucide-react';
import { api } from '@/utils/api';
import { toast, Toaster } from "sonner"





type ReviewType = {
    reviewId:String,
    writer: {
        name:string,
        avatar:string
    }
    text:{
        title:string,
        description:string
    }
    rate:number,
    createdAt:string,
}

const ProfileAddReviews = () => {
    const [login, setLogin] = useState<boolean>(false);
    const router = useRouter();
    const [star0, setStar0] = useState(false)
    const [star1, setStar1] = useState(false)
    const [star2, setStar2] = useState(false)
    const [star3, setStar3] = useState(false)
    const [star4, setStar4] = useState(false)
    const [rate, setRate] = useState(0)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(()=>{
        const cookies = parseCookies()
        if(cookies.hasOwnProperty('eventez.user.token')){
            setLogin(true)
        }
        
    },[])
    useEffect(()=>{
        if(star1){setStar0(true)}
        if(star2){setStar1(true)}
        if(star3){setStar2(true)}
        if(star4){setStar3(true)}

    },[star0,star1,star2,star4,star3])
    const handleMouseLeave = () =>{
        switch (rate){
            case 0: 
                setStar0(false)
                setStar1(false)
                setStar2(false)
                setStar3(false)
                setStar4(false)
            case 1: 
                setStar1(false)
                setStar2(false)
                setStar3(false)
                setStar4(false)
                case 2: 
                setStar2(false)
                setStar3(false)
                setStar4(false)
            case 3: 
                setStar3(false)
                setStar4(false)
            case 4: 
                setStar4(false)
            break;
        }


    }
    const handleSetRate = (score:number) => {
        setRate(score)
        if(score==1){setStar0(true); setStar1(false); setStar2(false); setStar3(false); setStar4(false)}
        if(score==2){setStar1(true); setStar2(false); setStar3(false); setStar4(false)}
        if(score==3){setStar2(true); setStar3(false); setStar4(false)   }
        if(score==4){setStar3(true); setStar4(false)}
        if(score==5){setStar4(true)}
    }
    const handleSubmitReview = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        api.post('/postReview', {
            reviewBody:{
                partnerId:router.query.perfil,
                text:{
                    title:title,
                    description:description
                },
                rate:rate
            }
            
        }).then((response)=>{
            if(response.status == 200){
                toast.success('Avaliação realizada com sucesso!')
            }
        }).catch((err)=>{
            toast.error('Ocorreu um erro ao tentar realizar a avaliação.')
        })
    }

    if(!login){
        return(<></>)
    }

    return(
        <>
                <div className="z-50">
            <Toaster richColors>

            </Toaster>
        </div>
        <Dialog>
            <DialogTrigger className='flex'>
                <button onClick={()=>handleSetRate(1)}><Star size={16} className={`${star0 == false ? "stroke-black": "fill-principal-100 stroke-none"}`}strokeWidth={1} onMouseOver={()=>setStar0(true)} onMouseLeave={handleMouseLeave}/></button>
                <Star size={16} className={`${star1 == false ? "stroke-black": "fill-principal-100 stroke-none"}`}strokeWidth={1} onMouseOver={()=>setStar1(true)} onMouseLeave={handleMouseLeave} onClick={()=>handleSetRate(2)}/>
                <Star size={16} className={`${star2 == false ? "stroke-black": "fill-principal-100 stroke-none"}`}strokeWidth={1} onMouseOver={()=>setStar2(true)} onMouseLeave={handleMouseLeave} onClick={()=>handleSetRate(3)}/>
                <Star size={16} className={`${star3 == false ? "stroke-black": "fill-principal-100 stroke-none"}`}strokeWidth={1} onMouseOver={()=>setStar3(true)} onMouseLeave={handleMouseLeave} onClick={()=>handleSetRate(4)}/>
                <Star size={16} className={`${star4 == false ? "stroke-black": "fill-principal-100 stroke-none"}`}strokeWidth={1} onMouseOver={()=>setStar4(true)} onMouseLeave={handleMouseLeave} onClick={()=>handleSetRate(5)}/>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Avaliação
                </DialogTitle>
                <DialogDescription className='flex'>
                <button onClick={()=>handleSetRate(1)}><Star size={16} className={`${star0 == false ? "stroke-black": "fill-principal-100 stroke-none"}`}strokeWidth={1} onMouseOver={()=>setStar0(true)} onMouseLeave={handleMouseLeave}/></button>
                <button onClick={()=>handleSetRate(2)}><Star size={16} className={`${star1 == false ? "stroke-black": "fill-principal-100 stroke-none"}`}strokeWidth={1} onMouseOver={()=>setStar1(true)} onMouseLeave={handleMouseLeave}/></button>
                <button onClick={()=>handleSetRate(3)}><Star size={16} className={`${star2 == false ? "stroke-black": "fill-principal-100 stroke-none"}`}strokeWidth={1} onMouseOver={()=>setStar2(true)} onMouseLeave={handleMouseLeave}/></button>
                <button onClick={()=>handleSetRate(4)}><Star size={16} className={`${star3 == false ? "stroke-black": "fill-principal-100 stroke-none"}`}strokeWidth={1} onMouseOver={()=>setStar3(true)} onMouseLeave={handleMouseLeave}/></button>
                <button onClick={()=>handleSetRate(5)}><Star size={16} className={`${star4 == false ? "stroke-black": "fill-principal-100 stroke-none"}`}strokeWidth={1} onMouseOver={()=>setStar4(true)} onMouseLeave={handleMouseLeave}/></button>
                </DialogDescription>
                <form onSubmit={(e)=>handleSubmitReview(e)} className='flex flex-col gap-3'>
                    <label className='flex flex-col'>
                        Título:
                        <input type="text" placeholder='Escreva o título aqui...' className='px-2 py-1 border rounded-xl'
                        value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    </label>
                    <label className='flex flex-col'>
                        Descrição:
                        <textarea placeholder='Escreva a descrição aqui...' className='px-2 py-1 border rounded-xl resize-x-none min-h-36'
                        value={description} onChange={(e)=>setDescription(e.target.value)}
                        ></textarea>
                    </label>
                    <DialogClose><input type="submit" value="Enviar avaliação" className='px-3 py-1 rounded-xl bg-principal-200 text-white hover:bg-principal-400 transition-all hover:cursor-pointer font-light w-80 self-center mt-3'/></DialogClose>
                </form>
            </DialogContent>
        </Dialog>
        
        </>
    )
}

export default ProfileAddReviews;