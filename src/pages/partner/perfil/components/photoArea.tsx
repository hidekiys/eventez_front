import ProfilePhoto from "./profilePhoto";
import React, { useContext, useEffect, useState } from "react";
import { api } from "@/utils/api";
import { PartnerContext } from "@/contexts/PartnerContext";

const PhotoArea = () => {
    const [imgURL, setImageURL] = useState("");
    const partner = useContext(PartnerContext)
    useEffect(()=>{
        setImageURL(partner.partner.url_avatar)
    }, [partner.partner.url_avatar])

    const handleUpload = (event: any) => {
        event.preventDefault();
        console.log(event)
        const file = event.target[0]?.files[0]
        if(!file) return;
        const formData = new FormData();
        formData.append('photo', file);
        api.put('/putPartnerAvatar', formData).then(response => {
            console.log(response.data)
            setImageURL(response.data.url_avatar)
        }).catch(err => {
            console.log(err);
        })

        
    }
    
    

    return(
        
        <>
        <form onSubmit={handleUpload} className="flex mt-6 flex-row justify-between items-center">
            <div className="flex ml-14">
                <ProfilePhoto name="foto de perfil" url={imgURL}/>
                <div className="flex flex-col ml-6">
                    <h1 className="text-lg text-gray-700">Sua foto</h1>
                    <h2 className="text-sm text-gray-500">esta foto será exibida em seu perfil</h2>
                    <input type="file" 
                    className="mt-2 w-full h-7 file:h-7 text-sm text-slate-500
                    file:mr-4 file:px-4 file:rounded-md
                    file:border-solid file:text-sm file:font-semibold
                    file:bg-white file:text-principal-300
                    hover:file:bg-principal-500 file:border-gray-100 hover:file:cursor-pointer"/>

                </div>
            </div>
            <div className="mr-14">
                <input type="submit" className="text-center text-gray-100 bg-principal-100 h-7 w-60 rounded-lg hover:shadow-md hover:cursor-pointer" value="Salvar alterações"/>

            </div>
        </form>

        </>
    );
}

export default PhotoArea;