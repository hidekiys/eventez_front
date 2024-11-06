import { Separator } from "@/components/ui/separator"
import ProfileBanner from "./ProfileBanner"
import ProfileImages from "./ProfileImages"
import GetBudget from "./GetBudget"
import ProfileServices from "./ProfileServices"
import { useEffect, useState } from "react"
import { api } from "@/utils/api"
import { useRouter } from "next/router"
import ProfileAsks from "./ProfileAsks"
import React from "react"
import ProfileMaps from "./Map"
import ProfileAddReviews from "./ProfileAddReview"
import ProfileReviews from "./ProfileReviews"
import { Star } from "lucide-react"

type PartnerPageType = {
    name:string,
    offerServices:{
        name:string,
        averagePrice:number,
        description:string
    }[],
    local:{
        cep:string,
        street:string,
        neighborhood:string,
        state:string,
        city:string,
        complement:string,
        number:number
    },
    url_avatar:string,
    type:string,
    about:string,
    questions:{
        ask:string,
        response:string,
    }[],
    images?:string[],
    rate?:number,
    reviews?:{
        user:string,
        title:string,
        score:number,
        description:string,
        images:string[],
    }[],
    banner?:string,
}
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

const ProfileContent = () =>{
    const router = useRouter()
    const [getServices, setGetServices] = useState<string[]>([''])
    const [reviews, setReviews] = useState<ReviewType[]>();
    const [partnerPage, setPartnerPage] = useState<PartnerPageType>({name:'Nome',
        offerServices:[{
            name:'serviço',
            description:'descrição',
            averagePrice:0
        }],
        local:{
            cep:'00000-000',
            street:'rua',
            neighborhood:'bairro',
            state:'estado',
            city:'cidade',
            complement:'complemento',
            number:0
        },
        url_avatar:'/perfilEz.png',
        type:'tipo',
        about:'Descrição',
        questions:[{
            ask:'pergunta',
            response:'resposta',
        }],
    })

    useEffect(()=>{
        if(router.isReady){
            api.get(`/getPartnerPage/${router.query.perfil}`).then((response)=>{
                setPartnerPage(response.data)
                console.log(response.data)
            })

        }
    },[router.isReady])

    useEffect(()=>{
        if(router.isReady){
            api.get(`/getReviews/${router.query.perfil}`).then((response)=>{
                setReviews(response.data)

            })
        }
    },[router.isReady])





    return(
        <>
        <div className="flex flex-col">
            <div className="relative w-full">
                <ProfileBanner img={partnerPage.banner || 'https://img.freepik.com/fotos-gratis/design-de-layout-de-fundo-laranja-suave-abstrato-studioroom-web-template-business-report-com-c-suave_1258-108604.jpg'}/>
                <div className="flex gap-14">
                <img src={partnerPage.url_avatar}
                className="z-10 bottom-14 left-10 rounded-full h-32 w-32 relative"
                />
                <div className="flex flex-col z-10">
                    <div className="flex items-center align-middle gap-2">
                        <h1 className="text-2xl">{partnerPage.name}</h1>
                        <div className="flex items-center gap-1">
                            {reviews && reviews.length > 0 && <div className="mt-1 flex">
                                <Star size={12} className={`${partnerPage.rate && partnerPage.rate <=0 ? "stroke-black" : "fill-principal-200 stroke-none"}`}/>
                                <Star size={12} className={`${partnerPage.rate && partnerPage.rate >= 2 ? "fill-principal-200 stroke-none":"stroke-black"}`}/>
                                <Star size={12} className={`${partnerPage.rate && partnerPage.rate >= 3 ? "fill-principal-200 stroke-none":"stroke-black"}`}/>
                                <Star size={12} className={`${partnerPage.rate && partnerPage.rate >= 4 ? "fill-principal-200 stroke-none":"stroke-black"}`}/>
                                <Star size={12} className={`${partnerPage.rate && partnerPage.rate >= 5 ? "fill-principal-200 stroke-none":"stroke-black"}`}/>
                            </div>}
                            
                            <p className={`text-sm mt-1 ${!reviews || reviews && reviews.length <= 0 && "text-principal-200"}`}>{reviews && reviews.length>0 ? `• ${reviews.length} ${reviews.length>1 ? "avaliações" : "avaliação"}` : "Novo na plataforma"}</p>
                        </div>
                    </div>
                    <p className="text-xs">{`${partnerPage.local.city}, ${partnerPage.local.state}`}</p>
                    
                </div>
                </div>
                
            </div>
            <div className="flex">
                
                <div className="flex flex-col gap-3 px-20 w-[70%]">
                    <div className="flex flex-col">
                        <h1 className="text-2xl">Sobre</h1>
                        <p>
                            {partnerPage.about}
                        </p>
                        
                    </div>
                    
                    
                    <div>
                        <ProfileImages images={partnerPage.images || ['']}/>
                    </div>
                    <Separator/>
                    <div>
                        <h1 className="text-2xl mb-2">Serviços</h1>
                        <ProfileServices getServices={getServices} setGetServices={setGetServices} offerServices={partnerPage.offerServices}/>
                    </div>
                    <Separator/>
                    <div>
                        <div className="flex gap-2 items-center">
                            <h1 className="text-2xl">Avaliações</h1>
                            <ProfileAddReviews/>
                        </div>
                        <ProfileReviews/>

                    </div>
                    <Separator/>
                    <div>
                        {partnerPage.local && partnerPage.local.street != undefined ?
                        <>
                            <h1 className="text-2xl">Mapa</h1>
                            <ProfileMaps/>
                        </> : <></>
                        
                        }
                        
                    </div>
                    <Separator/>
                    <div>
                        <h1 className="text-2xl">Perguntas frequentes</h1>
                        <ProfileAsks questions={partnerPage.questions}/>
                    </div>
                    
                </div>
                    <GetBudget setGetServices={setGetServices} getServices={getServices}/>
                
            </div>
        </div>
        
    </>

    )
}

export default ProfileContent;