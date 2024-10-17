import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import UserProvider from "@/contexts/UserContext";
import PartnerProvider from "@/contexts/PartnerContext";


export default function App({ Component, pageProps }: AppProps) {
  


  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <PartnerProvider>
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
    </PartnerProvider>
    </LocalizationProvider>

);
}
