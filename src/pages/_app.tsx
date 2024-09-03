import "@/styles/globals.css";
import type { AppProps } from "next/app";

import UserProvider from "@/contexts/UserContext";
import PartnerProvider from "@/contexts/PartnerContext";


export default function App({ Component, pageProps }: AppProps) {
  


  return(
    <PartnerProvider>
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
    </PartnerProvider>

);
}
