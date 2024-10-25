import { useEffect, useState } from "react"
import Budget from "./Budget"
import { BudgetsType } from "@/types/BudgetType"
import { api } from "@/utils/api"




const Budgets = () => {
    const [budgets, setBudgets] = useState<BudgetsType[]>()

    useEffect(()=>{
        setInterval(()=>{
            api.get('/getUserBudgets').then((response)=>{
                setBudgets(response.data)
            }).catch((err)=>{
                console.log(err)
            })
        }, 30000)
    },[])
    useEffect(()=>{
            api.get('/getUserBudgets').then((response)=>{
                console.log(response.data)
                setBudgets(response.data)
            }).catch((err)=>{
                console.log(err)
            })
    },[])
    return(
        <>
        <div className="flex flex-col">
            <h1 className="text-2xl">Orçamentos</h1>
            <div className="flex justify-between px-3">
                <p>Nome</p><p>Status</p>
            </div>
            <div className="flex flex-col gap-1">
        {budgets &&
            budgets.map((key, index)=> (
                <Budget key={index} budget={key}/>
            ))

        }

            </div>
        </div>
        
        </>
    )
}


export default Budgets;