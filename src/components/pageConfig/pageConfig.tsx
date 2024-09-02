import  Content  from "./content"
import { Header } from "./header"

export const PageConfig = () => {
    return(
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