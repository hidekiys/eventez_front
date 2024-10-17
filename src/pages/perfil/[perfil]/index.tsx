import { PageConfig } from "@/components/pageConfig/pageConfig";
import { Header } from "@/components/pageConfig/header";
import { Navegation } from "@/components/pageConfig/navegation";
import { ProfileContent } from "./components/ProfileContent";
import React from "react";

function Page() {
    return (
      <>
        <div className="h-screen">
            <div className="w-full fixed z-20">
                <Header/>
            </div>

            <ProfileContent/>
        </div>    

      </>
  
    );
  
}

export default Page;
