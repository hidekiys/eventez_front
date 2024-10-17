import { Header } from "@/components/pageConfig/header";
import React, { useState } from "react";
import { ServicesContent } from "./Components/servicesContent";

function Page() {
  const[search, setSearch] = useState<string>('')
    return (
      <>
        <div className="h-screen">
            <div className="w-full z-20 sticky top-0">
                <Header search={search} setSearch={setSearch}/>
            </div>
            <ServicesContent search={search} setSearch={setSearch}/>
        </div>    

      </>
  
    );
  
}

export default Page;
