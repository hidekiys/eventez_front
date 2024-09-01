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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['eventez.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }else{
    return {
      redirect: {
        destination: '/user/home',
        permanent: false,
      }
    }
  }


  return {
    props: {}
  }
}
