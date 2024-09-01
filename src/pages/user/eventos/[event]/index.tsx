import { PageConfig } from "@/components/pageConfig/pageConfig";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next/types";

function Page() {
    return (
      <>
        <PageConfig/>
      </>
  
    );
  
}

export default Page;
