import { PageConfig } from "@/components/pageConfig/pageConfig";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next/types";
import { Button, ConfigProvider, Space } from 'antd';

function Page() {

    return (
      <>
        <PageConfig/>
      </>
  
    );
  
}

export default Page;

