import React from "react"

type Props = {
    img:string
}


export const ProfileBanner = ({img}:Props) => {
    return(
        <>
        <img src={img} className="w-full max-h-[calc(100vh/3)] object-cover"/>
        
        </>
    )
}