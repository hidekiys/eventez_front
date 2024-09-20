import { Header } from "@/components/pageConfig/header";
import { Navegation } from "@/components/pageConfig/navegation";
import { ChatContent } from "@/components/Chat";
import { useRouter } from "next/router";
import { PartnerContext } from "@/contexts/PartnerContext";
import { useContext } from "react";


function Page() {
    const router = useRouter()
    const { chat, chatName } = router.query
    const { partner } = useContext(PartnerContext);
    return (
      <div className="h-screen">
            <Header/>
            <div className="h-[calc(100vh-2.5rem)]">
            <div className="h-full grid grid-cols-8">
            <div className="col-span-1 z-20 absolute h-[calc(100vh-2.5rem)]">
                <Navegation/>
            </div>
            <div className="col-span-8 ml-14 text-gray-700 z-0">
            <ChatContent chat={chat} chatName={chatName} userid={partner.id}/>
            </div>    

        </div>
                
            </div>
        </div>
    );
  }
  
  export default Page;

