import { FinancialType } from "@/types/FinancialType"
import { api } from "@/utils/api"
import { useEffect, useState } from "react"
import Receipt from "./Receipt"
import { useRouter } from "next/router"


const Financial = () => {
    const [checked, setChecked] = useState('all')
    const [receipts, setReceipts] = useState<FinancialType[]>()
    const [pendings, setPendings] = useState<FinancialType[]>()
    const [paid, setPaid] = useState<FinancialType[]>()
    const [totalPaid, setTotalPaid] = useState(0)
    const router = useRouter()
    useEffect(()=>{
        if(router.isReady){        
            api.get(`/getEventFinancial/${router.query.event}`).then((response)=>{
            setReceipts(response.data)
            setPendings(response.data.filter((filter:FinancialType)=>filter.status.user == "pending"))
            setPaid(response.data.filter((filter:FinancialType)=>filter.status.user == "paid"))
        }).catch((err)=>{
            console.log(err)
        })
    }


    },[router.isReady])
    useEffect(()=>{
        const initialValue = 0
          setTotalPaid(paid?.reduce(
            (accumulator:any, currentValue:any) => accumulator + currentValue.value,
            initialValue,
          ))


    },[pendings,paid])

    return(
        <>
            <div className="text-2xl flex flex-col font-normal mt-5 mx-10">
                <h1 className="text-principal-300 max-w-96 text-left text-nowrap" >Financeiro</h1>
                <div className="flex justify-between w-full mr-20">
                    <div className="flex h-7 rounded-full bg-white items-center mt-5 text-sm">
                        <label className={`px-3 h-full rounded-l-full items-center flex hover:bg-gray-100 transition-all ${checked == "all" ? "bg-gray-300" : "bg-white"}`}>
                        <input className="opacity-0 h-0 w-0" type="radio" name="budgetType" value="all" onClick={(e) => setChecked("all")}/>
                        Todos
                        </label>
                        <label className={`px-3 h-full hover:bg-gray-100 transition-all items-center flex ${checked == "paid" ? "bg-gray-300" : "bg-white"}`}>
                        <input className="opacity-0 h-0 w-0" type="radio" name="budgetType" value="new" onClick={(e) => setChecked("paid")}/>
                        Pagos
                        </label>
                        <label className={`px-3 h-full rounded-r-full hover:bg-gray-100 transition-all items-center flex ${checked == "pending" ? "bg-gray-300" : "bg-white"}`}>
                        <input className=" opacity-0 h-0 w-0" type="radio" name="budgetType" value="sended" onClick={(e) => setChecked("pending")}/>
                        Pendentes
                        </label>
                    </div>
                    <div className="text-sm p-2 rounded-xl bg-white">
                        <p>Total fechado: R${totalPaid}</p>
                        <p>Total recebido: R$</p>
                    </div>
                    
                </div>
                    <div className="flex flex-col w-full">
                    <div className="w-full  grid grid-cols-12 text-base text-nowrap text-start mb-3">
                        <div className="col-span-2 flex items-center ml-5">
                            Data
                        </div>
                        <div className="col-span-3 flex items-center">
                            Empresa
                        </div>
                        <div className="col-span-4 flex items-center">
                            Serviço
                        </div>
                        <div className="col-span-2 flex items-center">
                            Valor
                        </div>
                        <div className="col-span-1 flex items-center">
                            Status
                        </div>
                    </div>
                        {receipts != undefined && checked == "all" &&
                            receipts.map((key, index)=>(
                                key.status.partner != "waiting" &&
                                <Receipt receipt={key}/>
                            ))
                        
                        }
                        {paid != undefined && checked == "paid" &&
                            paid.map((key, index)=>(
                                key.status.partner != "waiting" &&
                                <Receipt receipt={key}/>
                            ))
                        
                        }
                        {pendings != undefined && checked == "pending" &&
                            pendings.map((key, index)=>(
                                key.status.partner != "waiting" &&
                                <Receipt receipt={key}/>
                            ))
                        
                        }
                    </div>
                
            </div>
        </>


    )
}

export default Financial;