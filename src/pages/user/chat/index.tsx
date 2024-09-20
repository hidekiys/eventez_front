import { Header } from "@/components/pageConfig/header";
import { Navegation } from "@/components/pageConfig/navegation";
import { PageConfig } from "@/components/pageConfig/pageConfig";
import { ChatContent } from "@/components/Chat";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

function Page() {
    const { user } = useContext(UserContext);
    const router = useRouter()
    const { chat, chatName } = router.query
    return (
      <div className="h-screen">
            <Header/>
            <div className="h-[calc(100vh-2.5rem)]">
            <div className="h-full grid grid-cols-8">
            <div className="col-span-1 z-20 absolute h-[calc(100vh-2.5rem)]">
                <Navegation/>
            </div>
            <div className="col-span-8 ml-14 text-gray-700 z-0">
            <ChatContent chat={chat} chatName={chatName} userid={user.id}/>
            </div>    

        </div>
                
            </div>
        </div>
    );
  }
  
  export default Page;

