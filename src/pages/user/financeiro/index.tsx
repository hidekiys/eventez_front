import { PageConfig } from "@/components/pageConfig/pageConfig";
import { GetServerSideProps } from "next/types";
import { parseCookies } from "nookies";

function Page() {
    return (
      <>
        <PageConfig/>
      </>
    );
  }
  