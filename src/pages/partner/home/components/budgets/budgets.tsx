import { api } from "@/utils/api";
import { useEffect, useState } from "react"
import { Budget } from "./budget";
import { BudgetsType } from "@/types/BudgetType";




export const Budgets = () => {


    const [checked, setChecked] = useState('all')
    const [budget, setBudget] = useState<BudgetsType[]>()
    const [newRequest, setNewRequest] = useState<BudgetsType[] | null>()
    const [sendedBudgets, setSendedBudgets] = useState<BudgetsType[] | null>()


    useEffect(() => {
            api.get('/getPartnerBudgets').then((response)=> {
                console.log(response.data)
                setBudget(response.data)
                const newRequest: BudgetsType[] | null= response.data?.filter((budget: BudgetsType) => budget.status.partner == "request") || null
                const sendedBudget: BudgetsType[] | null= response.data?.filter((budget: BudgetsType) => budget.status.partner == "sended") || null
                setNewRequest(newRequest)
                setSendedBudgets(sendedBudget)
            })
            

    }, [])

    
    useEffect(() => {
        setInterval(() => {
            api.get('/getPartnerBudgets').then((response)=> {
                setBudget(response.data)
                const newRequest: BudgetsType[] | null= response.data?.filter((budget: BudgetsType) => budget.status.partner == "request") || null
                const sendedBudget: BudgetsType[] | null= response.data?.filter((budget: BudgetsType) => budget.status.partner == "sended") || null
                setNewRequest(newRequest)
                setSendedBudgets(sendedBudget)
            })
            
          }, 30000);
    }, [])





    return(
        <>
        <div className="flex mt-5 gap-3 w-[calc(100vw/2)] justify-between">
            <h1 className="text-2xl ml-10 text-gray-800 ">Orçamentos</h1>
            <div className="flex h-7 rounded-full bg-white items-center mt-1">
                <label className={`px-3 h-full rounded-l-full hover:bg-gray-100 transition-all ${checked == "all" ? "bg-gray-300" : "bg-white"}`}>
                <input className="opacity-0 h-0 w-0" type="radio" name="budgetType" value="all" onClick={(e) => setChecked("all")}/>
                Todos
                </label>
                <label className={`px-3 h-full hover:bg-gray-100 transition-all  ${checked == "new" ? "bg-gray-300" : "bg-white"}`}>
                <input className="opacity-0 h-0 w-0" type="radio" name="budgetType" value="new" onClick={(e) => setChecked("new")}/>
                Novas solicitações
                </label>
                <label className={`px-3 h-full rounded-r-full hover:bg-gray-100 transition-all  ${checked == "sended" ? "bg-gray-300" : "bg-white"}`}>
                <input className=" opacity-0 h-0 w-0" type="radio" name="budgetType" value="sended" onClick={(e) => setChecked("sended")}/>
                Orçamentos enviados
                </label>
            </div>
        </div>
        <div className="ml-10 w-full min-h-[50%] mt-5 h-[50vh-20rem]">
            <div className="grid grid-cols-8 min-w-28 max-w-2xl">
                    <p className="col-span-1">Data</p>
                    <p className="col-span-3">Evento</p>
                    <p className="col-span-3">Cliente</p>
                    <p className="col-span-1 justify-self-start">Convidados</p>
            </div>
            {budget &&
            <div className="max-h-52 overflow-auto flex flex-col w-full gap-1">
                
                {checked == "all" &&
                    budget?.map((key:BudgetsType, index)=>(
                        <Budget key={index} event={key.event} value={key.value} services={key.service.services} status={key.status.partner} budgetId={key._id} description={key.service.description}/>
                    ))
                
                
                }
                {checked == "new" &&
                    newRequest?.map((key, index)=>(
                        <Budget key={index} event={key.event} value={key.value} services={key.service.services} status={key.status.partner} budgetId={key._id} description={key.service.description}/>
                    ))
                
                
                }
                {checked == "sended" &&
                    sendedBudgets?.map((key, index)=>(
                        <Budget key={index} event={key.event} value={key.value} services={key.service.services} status={key.status.partner} budgetId={key._id} description={key.service.description}/>
                    ))
                
                
                }
                
                
                
            </div>
}
            </div>
        
        
        
        </>



    )
}