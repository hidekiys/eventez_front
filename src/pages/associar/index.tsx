import React, { useState } from "react";
import { AssociateHeader } from "./components/AssociateHeader";
import { Associate } from "./components/associate";


function Page() {
  const[search, setSearch] = useState<string>('')
    return (
      <>
        <div className="h-screen">
            <div className="w-full z-20 sticky top-0">
                <AssociateHeader />
            </div>
            <Associate/>
        </div>    

      </>
  
    );
  
}

export default Page;
