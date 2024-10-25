import PhotoArea from "./photoArea";
import Address from "./address"

import LoginAndSecurity from "./LoginAndSecurity";
import React from "react";
import Images from "./Images";
import Services from "./Services";
import SeeProfile from "./SeeProfile";
import Questions from "./Questions";
import LogOut from "./LogOut";
import AboutMe from "./AboutMe";
import Banner from "./Banner";

const PartnerProfile = () =>{


    return(
        <>

            <PhotoArea/>
            <hr className="w-[95%] h-1 rounded-md border-gray-400 m-auto mt-6"/>
            <div className="flex gap-3 mt-3">
            <div className="flex flex-col mr-14 flex-wrap">
                    <h1 className="text-xl ml-14">Perfil</h1>
                    <AboutMe/>
                    <Banner/>
                    <Images/>
                    <Services/>
                    <Questions/>
                    <SeeProfile/>
                    <LogOut/>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl ml-14">Informações restritas</h1>
                    <Address/>
                    <LoginAndSecurity/>

                    
                </div>
                
            </div>
        </>
    );
}

export default PartnerProfile;