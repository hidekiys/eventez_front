import { useRouter } from "next/router";
import  Content  from "./content"
import { Header } from "./header"
import { LoadingPage } from "./loading";

export const PageConfig = () => {
    const router = useRouter();





    if(router.isFallback) return <LoadingPage/>
    if(!router.isFallback) return(
        <>
        <div className="h-screen">
            <Header/>
            <div className="h-[calc(100vh-2.5rem)]">
                <Content/>
            </div>
        </div>
      </>
    );

}